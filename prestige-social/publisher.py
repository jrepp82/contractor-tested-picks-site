import datetime, json, os, pathlib, subprocess, time, urllib.parse, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent
REPO = ROOT.parent
OUTPUT = REPO / '.social-output' / 'prestige-local'
GRAPH_VERSION = os.environ.get('META_GRAPH_VERSION', 'v24.0')
DRY_RUN = os.environ.get('PRESTIGE_DRY_RUN', 'false').lower() == 'true'
REPO_SLUG = os.environ.get('GITHUB_REPOSITORY', 'jrepp82/contractor-tested-picks-site')
BRANCH = os.environ.get('GITHUB_REF_NAME', 'main')
SITE = 'https://PrestigeRemodelingWI.com'

def env(name):
    return os.environ.get(name, '').strip()

def missing(names):
    return [name for name in names if not env(name)]

def skipped(platform, names, reason='missing_credentials'):
    return {'ok': True, 'platform': platform, 'status': 'SKIPPED', 'reason': reason, 'missing': names}

def request_json(url, data=None, headers=None, method='POST', timeout=90):
    headers = dict(headers or {})
    body = None
    if data is not None:
        if isinstance(data, dict):
            body = urllib.parse.urlencode(data).encode()
            headers.setdefault('Content-Type', 'application/x-www-form-urlencoded')
        elif isinstance(data, str):
            body = data.encode()
        else:
            body = data
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as response:
            raw = response.read().decode()
            return json.loads(raw) if raw else {}
    except Exception as exc:
        details = ''
        if hasattr(exc, 'read'):
            try:
                details = exc.read().decode()
            except Exception:
                pass
        raise RuntimeError(f'{method} {url} failed: {exc} {details}'.strip()) from exc

def package_for_today():
    today = datetime.date.today().isoformat()
    exact = OUTPUT / today / 'package.json'
    if exact.exists():
        path = exact
    else:
        candidates = sorted(OUTPUT.glob('*/package.json'), reverse=True)
        if not candidates:
            raise RuntimeError('No generated Prestige social package exists')
        path = candidates[0]
    package = json.loads(path.read_text())
    video = REPO / package['video_path']
    if not video.exists():
        raise RuntimeError(f"Generated video not found: {video}")
    public_video = f"https://raw.githubusercontent.com/{REPO_SLUG}/{BRANCH}/{urllib.parse.quote(package['video_path'])}"
    return path, package, video, public_video

def publish_facebook(package, public_video):
    token_name = 'META_PAGE_ACCESS_TOKEN' if env('META_PAGE_ACCESS_TOKEN') else 'META_ACCESS_TOKEN'
    miss = missing(['META_PAGE_ID', token_name])
    if miss:
        return skipped('facebook', miss)
    if DRY_RUN:
        return {'ok': True, 'platform': 'facebook', 'status': 'READY', 'mode': 'page-video', 'video_url': public_video}
    payload = {'description': package['captions']['facebook'], 'file_url': public_video, 'access_token': env(token_name)}
    result = request_json(f"https://graph.facebook.com/{GRAPH_VERSION}/{urllib.parse.quote(env('META_PAGE_ID'))}/videos", payload)
    if not result.get('id'):
        raise RuntimeError(f'Facebook video publish did not return an id: {result}')
    return {'ok': True, 'platform': 'facebook', 'status': 'PUBLISHED', 'video_id': result['id']}

def instagram_container_status(container_id):
    params = urllib.parse.urlencode({'fields': 'status_code,status', 'access_token': env('META_ACCESS_TOKEN')})
    return request_json(f"https://graph.facebook.com/{GRAPH_VERSION}/{container_id}?{params}", method='GET')

def publish_instagram(package, public_video):
    miss = missing(['META_IG_USER_ID', 'META_ACCESS_TOKEN'])
    if miss:
        return skipped('instagram', miss)
    if DRY_RUN:
        return {'ok': True, 'platform': 'instagram', 'status': 'READY', 'mode': 'reel', 'video_url': public_video}
    create_payload = {'media_type': 'REELS', 'video_url': public_video, 'caption': package['captions']['instagram'], 'share_to_feed': 'true', 'access_token': env('META_ACCESS_TOKEN')}
    container = None
    for attempt in range(4):
        try:
            container = request_json(f"https://graph.facebook.com/{GRAPH_VERSION}/{urllib.parse.quote(env('META_IG_USER_ID'))}/media", create_payload)
            break
        except Exception:
            if attempt == 3:
                raise
            time.sleep(5)
    container_id = (container or {}).get('id')
    if not container_id:
        raise RuntimeError(f'Instagram container did not return an id: {container}')
    status = {}
    for _ in range(12):
        time.sleep(5)
        status = instagram_container_status(container_id)
        code = status.get('status_code')
        if code == 'FINISHED':
            break
        if code in ('ERROR', 'EXPIRED'):
            raise RuntimeError(f'Instagram reel processing failed: {status}')
    else:
        raise RuntimeError(f'Instagram reel did not finish processing: {status}')
    published = request_json(f"https://graph.facebook.com/{GRAPH_VERSION}/{urllib.parse.quote(env('META_IG_USER_ID'))}/media_publish", {'creation_id': container_id, 'access_token': env('META_ACCESS_TOKEN')})
    if not published.get('id'):
        raise RuntimeError(f'Instagram media_publish did not return an id: {published}')
    return {'ok': True, 'platform': 'instagram', 'status': 'PUBLISHED', 'media_id': published['id'], 'container_id': container_id}

def tiktok_json(url, payload, token):
    return request_json(url, json.dumps(payload), headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json; charset=UTF-8'})

def publish_tiktok(package, video_path):
    miss = missing(['TIKTOK_ACCESS_TOKEN'])
    if miss:
        return skipped('tiktok', miss)
    if DRY_RUN:
        return {'ok': True, 'platform': 'tiktok', 'status': 'READY', 'video_path': str(video_path)}
    token = env('TIKTOK_ACCESS_TOKEN')
    creator = tiktok_json('https://open.tiktokapis.com/v2/post/publish/creator_info/query/', {}, token)
    options = ((creator.get('data') or {}).get('privacy_level_options') or [])
    requested = env('TIKTOK_PRIVACY_LEVEL') or 'PUBLIC_TO_EVERYONE'
    privacy = requested if requested in options else (options[0] if options else 'SELF_ONLY')
    size = video_path.stat().st_size
    title = package['captions']['tiktok'][:2100]
    init_payload = {'post_info': {'title': title, 'privacy_level': privacy, 'disable_duet': False, 'disable_comment': False, 'disable_stitch': False, 'brand_content_toggle': False, 'brand_organic_toggle': True, 'is_aigc': True}, 'source_info': {'source': 'FILE_UPLOAD', 'video_size': size, 'chunk_size': size, 'total_chunk_count': 1}}
    init = tiktok_json('https://open.tiktokapis.com/v2/post/publish/video/init/', init_payload, token)
    data = init.get('data') or {}
    upload_url, publish_id = data.get('upload_url'), data.get('publish_id')
    if not upload_url or not publish_id:
        raise RuntimeError(f'TikTok init missing upload_url/publish_id: {init}')
    video = video_path.read_bytes()
    req = urllib.request.Request(upload_url, data=video, headers={'Content-Type': 'video/mp4', 'Content-Length': str(len(video)), 'Content-Range': f'bytes 0-{len(video)-1}/{len(video)}'}, method='PUT')
    with urllib.request.urlopen(req, timeout=180) as response:
        response.read()
    status = {}
    for _ in range(8):
        time.sleep(4)
        status = tiktok_json('https://open.tiktokapis.com/v2/post/publish/status/fetch/', {'publish_id': publish_id}, token)
        provider = ((status.get('data') or {}).get('status'))
        if provider not in ('PROCESSING_UPLOAD', 'PROCESSING_DOWNLOAD', 'SENDING_TO_USER_INBOX'):
            break
    return {'ok': True, 'platform': 'tiktok', 'status': 'SUBMITTED', 'publish_id': publish_id, 'privacy_level': privacy, 'provider_status': (status.get('data') or {}).get('status')}

def publish_youtube(package, video_path, outdir):
    miss = missing(['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'YOUTUBE_REFRESH_TOKEN'])
    if miss and not DRY_RUN:
        return skipped('youtube-shorts', miss)
    manifest = {'video_path': str(video_path), 'title': (package['hook'] + ' #Shorts')[:100], 'description': package['body'] + f"\n\nPrestige Remodeling: {SITE}", 'tags': ['remodeling', 'contractor', 'Manitowoc', 'Wisconsin', 'Prestige', 'Shorts'], 'category_id': '26', 'privacy_status': env('YOUTUBE_PRIVACY_STATUS') or 'public', 'made_for_kids': False, 'notify_subscribers': False}
    manifest_path = outdir / 'youtube-manifest.json'
    manifest_path.write_text(json.dumps(manifest, indent=2))
    args = ['node', 'youtube-shorts-publisher.js', str(manifest_path)]
    if DRY_RUN:
        args.append('--dry-run')
    run = subprocess.run(args, cwd=REPO, text=True, capture_output=True)
    if run.returncode != 0:
        raise RuntimeError(f'YouTube publisher failed: {run.stderr or run.stdout}')
    return {'ok': True, 'platform': 'youtube-shorts', 'status': 'READY' if DRY_RUN else 'PUBLISHED', 'provider_output': (run.stdout or '').strip()[-4000:]}

def main():
    package_path, package, video_path, public_video = package_for_today()
    outdir = package_path.parent
    results, errors = [], []
    for name, fn in [('facebook', lambda: publish_facebook(package, public_video)), ('instagram', lambda: publish_instagram(package, public_video)), ('tiktok', lambda: publish_tiktok(package, video_path)), ('youtube-shorts', lambda: publish_youtube(package, video_path, outdir))]:
        try:
            results.append(fn())
        except Exception as exc:
            results.append({'ok': False, 'platform': name, 'status': 'ERROR', 'error': str(exc)})
            errors.append(f'{name}: {exc}')
    delivered = [r for r in results if r.get('status') in ('PUBLISHED', 'SUBMITTED')]
    report = {'ok': not errors and (DRY_RUN or bool(delivered)), 'dry_run': DRY_RUN, 'generated_for': package.get('generated_for'), 'campaign': package.get('campaign'), 'public_video_url': public_video, 'results': results}
    result_path = outdir / 'delivery-result.json'
    result_path.write_text(json.dumps(report, indent=2))
    print(json.dumps(report, indent=2))
    if errors:
        raise RuntimeError('Prestige channel errors: ' + ' | '.join(errors))
    if not DRY_RUN and not delivered:
        raise RuntimeError('No Prestige channel published; all configured paths were skipped')

if __name__ == '__main__':
    main()
