import datetime
import json
import pathlib
import subprocess
import time
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent
REPO = ROOT.parent
QUEUE = ROOT / 'queue'
OUTPUT = REPO / '.social-output' / 'prestige-local'
BOT_ENDPOINT = 'https://api-v2.appdeploy.ai/app/money-machine-bot-hub-uvnwsq/api/social-package'


def fetch_bot_package(today, attempts=3):
    last_error = None
    for attempt in range(1, attempts + 1):
        try:
            req = urllib.request.Request(BOT_ENDPOINT, headers={'User-Agent': 'Prestige-GitHub-Publisher/2.1', 'Accept': 'application/json'})
            with urllib.request.urlopen(req, timeout=90) as response:
                raw = response.read().decode()
                if not raw.strip():
                    raise ValueError(f'Bot API returned empty body with HTTP {response.status}')
                data = json.loads(raw)
            required = ['campaign', 'hook', 'body', 'voiceover', 'visual_plan', 'captions', 'cta', 'quality', 'media']
            if any(not data.get(k) for k in required):
                raise ValueError('Bot package is incomplete')
            captions = data.get('captions') or {}
            for channel in ['facebook', 'instagram', 'youtube-shorts', 'tiktok']:
                if not captions.get(channel):
                    raise ValueError(f'Bot package missing {channel} caption')
            quality = data.get('quality') or {}
            media = data.get('media') or {}
            media_quality = media.get('quality') or {}
            media_urls = media.get('urls') or []
            if not quality.get('passed') or float(quality.get('score', 0)) < 90:
                raise ValueError(f'Content quality gate failed: {quality}')
            if not media_quality.get('passed') or float(media_quality.get('score', 0)) < 90:
                raise ValueError(f'Visual quality gate failed: {media_quality}')
            if len(media_urls) != 3 or any(not str(url).startswith('https://') for url in media_urls):
                raise ValueError('Exactly three signed premium media URLs are required')
            data['generated_for'] = today.isoformat()
            data['source'] = 'money-machine-social-bot'
            return data
        except Exception as exc:
            last_error = exc
            print(f'Bot package attempt {attempt}/{attempts} failed: {exc}')
            if attempt < attempts:
                time.sleep(5 * attempt)
    raise RuntimeError(f'Premium Bot Hub package unavailable after {attempts} attempts: {last_error}')


def download(url, path):
    req = urllib.request.Request(url, headers={'User-Agent': 'Prestige-GitHub-Publisher/2.1'})
    with urllib.request.urlopen(req, timeout=45) as response:
        data = response.read()
    if len(data) < 10000:
        raise RuntimeError(f'Visual download was unexpectedly small: {url}')
    path.write_bytes(data)


def safe_caption(value, max_chars=90):
    return ' '.join(str(value or '').split())[:max_chars]


def write_srt(package, path):
    on_screen = list((package.get('visual_plan') or {}).get('on_screen_text') or [])
    while len(on_screen) < 3:
        on_screen.append(package['hook'] if not on_screen else package['cta'])
    entries = [
        ('00:00:00,000', '00:00:04,700', safe_caption(package['hook'], 110)),
        ('00:00:04,700', '00:00:09,500', safe_caption(on_screen[0], 90)),
        ('00:00:09,500', '00:00:14,200', safe_caption(on_screen[1], 90)),
        ('00:00:14,200', '00:00:18,000', safe_caption(package['cta'], 100)),
    ]
    blocks = []
    for i, (start, end, text) in enumerate(entries, 1):
        blocks.append(f'{i}\n{start} --> {end}\n{text}\n')
    path.write_text('\n'.join(blocks))


def create_voiceover(package, out_path, attempts=3):
    voiceover = ' '.join(str(package.get('voiceover') or '').split())
    if not voiceover:
        raise RuntimeError('Premium package is missing voiceover copy')
    last_error = None
    for attempt in range(1, attempts + 1):
        if out_path.exists():
            out_path.unlink()
        try:
            result = subprocess.run([
                'edge-tts', '--voice', 'en-US-GuyNeural', '--rate', '+3%', '--text', voiceover,
                '--write-media', str(out_path)
            ], text=True, capture_output=True, timeout=45)
            if result.returncode == 0 and out_path.exists() and out_path.stat().st_size >= 10000:
                return
            last_error = RuntimeError(result.stderr or result.stdout or 'voiceover output missing')
        except subprocess.TimeoutExpired:
            last_error = RuntimeError('neural voiceover provider timed out after 45 seconds')
        print(f'Voiceover attempt {attempt}/{attempts} failed: {last_error}')
        if attempt < attempts:
            time.sleep(5 * attempt)
    raise RuntimeError(f'Voiceover generation failed after {attempts} attempts: {last_error}')


def render_video(package, outdir):
    outdir.mkdir(parents=True, exist_ok=True)
    media_urls = package['media']['urls']
    shots = [outdir / f'shot-{i + 1}.png' for i in range(3)]
    for url, shot in zip(media_urls, shots):
        download(url, shot)
    captions = outdir / 'captions.srt'
    voice = outdir / 'voiceover.mp3'
    video = outdir / 'prestige-short.mp4'
    write_srt(package, captions)
    create_voiceover(package, voice)
    filters = (
        "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
        "zoompan=z='min(zoom+0.00065,1.07)':d=192:s=1080x1920:fps=30,setsar=1[v0];"
        "[1:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
        "zoompan=z='if(lte(zoom,1.0),1.07,max(1.0,zoom-0.00065))':d=192:s=1080x1920:fps=30,setsar=1[v1];"
        "[2:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
        "zoompan=z='min(zoom+0.00055,1.06)':d=192:s=1080x1920:fps=30,setsar=1[v2];"
        "[v0][v1]xfade=transition=fade:duration=0.6:offset=5.8[x1];"
        "[x1][v2]xfade=transition=fade:duration=0.6:offset=11.6,"
        "subtitles=captions.srt:force_style='FontName=DejaVu Sans,FontSize=17,PrimaryColour=&H00FFFFFF,"
        "OutlineColour=&H00000000,BackColour=&H64000000,BorderStyle=3,Outline=2,Shadow=0,Alignment=2,MarginV=115'[v];"
        "[3:a]apad=pad_dur=18[a]"
    )
    cmd = [
        'ffmpeg', '-y',
        '-loop', '1', '-t', '6.4', '-i', shots[0].name,
        '-loop', '1', '-t', '6.4', '-i', shots[1].name,
        '-loop', '1', '-t', '6.4', '-i', shots[2].name,
        '-i', voice.name,
        '-filter_complex', filters,
        '-map', '[v]', '-map', '[a]', '-t', '18', '-r', '30',
        '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p',
        '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', video.name
    ]
    try:
        result = subprocess.run(cmd, cwd=outdir, text=True, capture_output=True, timeout=120)
    except subprocess.TimeoutExpired as exc:
        raise RuntimeError('Premium video render exceeded 120-second safety timeout') from exc
    if result.returncode != 0:
        raise RuntimeError(f'Premium video render failed: {result.stderr[-5000:]}')
    if not video.exists() or video.stat().st_size < 300000:
        raise RuntimeError('Premium rendered video is missing or unexpectedly small')
    probe = subprocess.run([
        'ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries',
        'stream=width,height', '-of', 'json', str(video)
    ], text=True, capture_output=True, check=True, timeout=20)
    stream = (json.loads(probe.stdout).get('streams') or [{}])[0]
    if stream.get('width') != 1080 or stream.get('height') != 1920:
        raise RuntimeError(f'Video QA failed resolution check: {stream}')
    return video


def main():
    today = datetime.date.today()
    package = fetch_bot_package(today)
    outdir = OUTPUT / today.isoformat()
    video = render_video(package, outdir)
    package['video_path'] = str(video.relative_to(REPO))
    package['video_specs'] = {'width': 1080, 'height': 1920, 'duration_seconds': 18, 'fps': 30}
    package['media_mode'] = 'premium-ai-visual-motion-reel'
    package['publishing_status'] = 'PREMIUM_MEDIA_READY_PENDING_PROVIDER_DELIVERY'
    (outdir / 'package.json').write_text(json.dumps(package, indent=2))
    item = {
        'status': 'premium_media_ready',
        'campaign': package['campaign'],
        'targets': ['facebook', 'instagram', 'tiktok', 'youtube-shorts'],
        'media_type': 'vertical-video',
        'media_mode': package['media_mode'],
        'media_path': package['video_path'],
        'captions': package['captions'],
        'content_quality': package['quality'],
        'visual_quality': package['media']['quality'],
        'source': package.get('source', 'money-machine-social-bot'),
        'generated_for': today.isoformat(),
        'multi_channel_package': str((outdir / 'package.json').relative_to(REPO)),
    }
    QUEUE.mkdir(parents=True, exist_ok=True)
    path = QUEUE / f'daily-{today.isoformat()}-multichannel.json'
    path.write_text(json.dumps(item, indent=2))
    print('Content source:', package.get('source'))
    print('Content quality:', package['quality'])
    print('Visual quality:', package['media']['quality'])
    print('Media mode:', package['media_mode'])
    print('Generated premium vertical video:', video)


if __name__ == '__main__':
    main()
