import json, os, pathlib, urllib.request
API='https://api.buffer.com'
KEY=os.environ.get('BUFFER_API_KEY','').strip()
ROOT=pathlib.Path(__file__).resolve().parent
QUEUE=ROOT/'queue'

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

def main():
    channels=buffer_channels()
    print('Connected channels:',[(c['service'],c['displayName'] or c['name']) for c in channels])
    for f in sorted(QUEUE.glob('*.json')):
        d=json.loads(f.read_text())
        if d.get('status')=='sent': continue
        targets=d.get('targets') or [c['service'] for c in channels]
        results=[]
        for c in channels:
            if c['service'] not in targets: continue
            text=(d.get('captions',{}).get(c['service']) or d.get('text') or '').strip()
            r=post(c['id'],text,d.get('media_url',''),d.get('media_type','video'))
            results.append({'service':c['service'],'channel':c['displayName'] or c['name'],'result':r})
        d['status']='sent' if results else 'no_matching_channels'
        d['buffer_results']=results
        f.write_text(json.dumps(d,indent=2))
        print(f.name,d['status'])
if __name__=='__main__': main()
