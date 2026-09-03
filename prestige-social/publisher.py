import json, os, pathlib, urllib.request
API='https://api.buffer.com'
KEY=os.environ.get('BUFFER_API_KEY','').strip()
ROOT=pathlib.Path(__file__).resolve().parent
QUEUE=ROOT/'queue'
PLACEHOLDER_MARKERS=('PENDING_','PLACEHOLDER','TODO','TBD','YOUR_')

def gql(query):
    if not KEY: raise RuntimeError('BUFFER_API_KEY is missing')
    req=urllib.request.Request(API,data=json.dumps({'query':query}).encode(),headers={'Content-Type':'application/json','Authorization':'Bearer '+KEY},method='POST')
    with urllib.request.urlopen(req,timeout=60) as r:
        body=json.loads(r.read().decode())
    if body.get('errors'): raise RuntimeError(str(body['errors']))
    return body.get('data',{})

def buffer_channels():
    a=gql('query { account { organizations { id name } } }')
    orgs=a['account']['organizations']
    if not orgs: raise RuntimeError('No Buffer organization found')
    oid=orgs[0]['id']
    q='query { channels(input:{organizationId:"'+oid+'",filter:{isLocked:false}}){id name displayName service isQueuePaused} }'
    return gql(q)['channels']

def esc(s): return json.dumps(str(s))[1:-1]

def post(channel_id,text,media_url,media_type):
    assets=''
    if media_url:
        kind='video' if media_type=='video' else 'image'
        assets=', assets:[{'+kind+':{url:"'+esc(media_url)+'"}}]'
    q='mutation { createPost(input:{text:"'+esc(text)+'",channelId:"'+channel_id+'",schedulingType:automatic,mode:addToQueue'+assets+'}){... on PostActionSuccess{post{id text dueAt status}} ... on MutationError{message}} }'
    return gql(q)['createPost']

def validate_queue_item(d, filename):
    targets=d.get('targets') or []
    if not targets:
        raise RuntimeError(f'{filename}: no target channels configured')
    media_url=str(d.get('media_url','') or '').strip()
    if media_url and any(marker in media_url.upper() for marker in PLACEHOLDER_MARKERS):
        raise RuntimeError(f'{filename}: placeholder media_url is not publishable: {media_url}')
    captions=d.get('captions') or {}
    for target in targets:
        text=str(captions.get(target) or d.get('text') or '').strip()
        if not text:
            raise RuntimeError(f'{filename}: missing caption/text for target {target}')
        if any(marker in text.upper() for marker in PLACEHOLDER_MARKERS):
            raise RuntimeError(f'{filename}: placeholder text detected for target {target}')

def result_succeeded(result):
    if not isinstance(result, dict): return False
    if result.get('message'): return False
    post_obj=result.get('post')
    return isinstance(post_obj, dict) and bool(post_obj.get('id'))

def main():
    channels=buffer_channels()
    print('Connected channels:',[(c['service'],c['displayName'] or c['name']) for c in channels])
    available={c['service']:c for c in channels}
    failures=[]
    for f in sorted(QUEUE.glob('*.json')):
        d=json.loads(f.read_text())
        if d.get('status')=='sent': continue
        try:
            validate_queue_item(d,f.name)
            targets=d.get('targets') or list(available)
            missing_targets=[t for t in targets if t not in available]
            if missing_targets:
                raise RuntimeError(f'{f.name}: required Buffer channels not connected: {missing_targets}')
            results=[]
            for target in targets:
                c=available[target]
                if c.get('isQueuePaused'):
                    raise RuntimeError(f'{f.name}: Buffer queue is paused for {target}')
                text=(d.get('captions',{}).get(target) or d.get('text') or '').strip()
                r=post(c['id'],text,d.get('media_url',''),d.get('media_type','video'))
                results.append({'service':target,'channel':c['displayName'] or c['name'],'result':r})
                if not result_succeeded(r):
                    raise RuntimeError(f'{f.name}: Buffer publish failed for {target}: {r}')
            d['status']='sent'
            d['buffer_results']=results
            d.pop('last_error',None)
            f.write_text(json.dumps(d,indent=2))
            print(f.name,'sent')
        except Exception as exc:
            d['status']='failed'
            d['last_error']=str(exc)
            f.write_text(json.dumps(d,indent=2))
            failures.append(str(exc))
            print(f.name,'failed:',exc)
    if failures:
        raise RuntimeError('Prestige social publishing failures: '+' | '.join(failures))

if __name__=='__main__': main()
