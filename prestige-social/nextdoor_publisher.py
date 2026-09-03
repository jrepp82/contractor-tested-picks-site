import datetime
import json
import os
import pathlib
import urllib.error
import urllib.request

REPO = pathlib.Path(__file__).resolve().parent.parent
API = 'https://nextdoor.com/external/api/partner/v1/post/create/'
RAW = 'https://raw.githubusercontent.com/jrepp82/contractor-tested-picks-site/main/'


def write_result(root, result):
    root.mkdir(parents=True, exist_ok=True)
    (root / 'nextdoor-delivery.json').write_text(json.dumps(result, indent=2))
    print(json.dumps(result))
    return 0


def main():
    today = datetime.date.today().isoformat()
    root = REPO / '.social-output' / 'prestige-local' / today
    token = os.environ.get('NEXTDOOR_ACCESS_TOKEN', '').strip()
    profile = os.environ.get('NEXTDOOR_SECURE_PROFILE_ID', '').strip()
    if not token or not profile:
        missing = [name for name, value in [('NEXTDOOR_ACCESS_TOKEN', token), ('NEXTDOOR_SECURE_PROFILE_ID', profile)] if not value]
        return write_result(root, {'platform': 'nextdoor', 'status': 'SKIPPED_MISSING_CREDENTIALS', 'published': False, 'missing': missing, 'requires_publish_api_approval': True})

    package_path = root / 'package.json'
    if not package_path.exists():
        raise RuntimeError('Current-day premium package is missing')
    package = json.loads(package_path.read_text())
    quality = package.get('quality') or {}
    visual = (package.get('media') or {}).get('quality') or {}
    if not quality.get('passed') or float(quality.get('score', 0)) < 90 or not visual.get('passed') or float(visual.get('score', 0)) < 90:
        raise RuntimeError('Nextdoor publish blocked by premium quality gate')

    body = f"{package.get('body', '').strip()}\n\n{package.get('cta', '').strip()}".strip()
    if not body or len(body.encode('utf-8')) > 8192:
        raise RuntimeError('Nextdoor post body is empty or exceeds 8,192 bytes')

    media_path = f'.social-output/prestige-local/{today}/shot-3.png'
    payload = {
        'body_text': body,
        'hashtag': 'ManitowocWI',
        'media_attachments': [RAW + media_path],
        'smartlink_url': 'https://PrestigeRemodelingWI.com',
        'secure_profile_id': profile,
    }
    req = urllib.request.Request(
        API,
        data=json.dumps(payload).encode('utf-8'),
        method='POST',
        headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json', 'Accept': 'application/json', 'User-Agent': 'Prestige-Social-Publisher/1.0'},
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as response:
            raw = response.read().decode('utf-8')
            data = json.loads(raw) if raw.strip() else {}
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode('utf-8', errors='replace')
        result = {'platform': 'nextdoor', 'status': 'ERROR', 'published': False, 'detail': f'HTTP {exc.code}: {detail[:1200]}'}
        write_result(root, result)
        raise RuntimeError(result['detail']) from exc

    share_link = data.get('share_link') or data.get('url')
    post_id = data.get('post_share_id') or data.get('id')
    result = {'platform': 'nextdoor', 'status': 'PUBLISHED', 'published': True, 'providerId': post_id, 'share_link': share_link}
    return write_result(root, result)


if __name__ == '__main__':
    raise SystemExit(main())
