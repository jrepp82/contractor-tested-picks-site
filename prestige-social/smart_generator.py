import datetime
import json
import generator as g
import deterministic_fallback as fallback


def persist_package(today, package):
    outdir = g.OUTPUT / today.isoformat()
    video = g.render_video(package, outdir)
    package['video_path'] = str(video.relative_to(g.REPO))
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
        'multi_channel_package': str((outdir / 'package.json').relative_to(g.REPO)),
    }
    g.QUEUE.mkdir(parents=True, exist_ok=True)
    path = g.QUEUE / f'daily-{today.isoformat()}-multichannel.json'
    path.write_text(json.dumps(item, indent=2))
    print('Content source:', package.get('source'))
    print('Content quality:', package['quality'])
    print('Visual quality:', package['media']['quality'])
    print('Media mode:', package['media_mode'])
    print('Generated premium vertical video:', video)


def main():
    today = datetime.date.today()
    try:
        package = g.fetch_bot_package(today)
        print('STORED_PREMIUM_PACKAGE_REUSED: current 90+ Bot Hub package found; no AI generation needed.')
        persist_package(today, package)
        return
    except Exception as stored_error:
        print('No reusable current premium package:', stored_error)

    try:
        g.prepare_staged_package()
        package = g.fetch_bot_package(today)
        persist_package(today, package)
    except Exception as exc:
        if 'ai_daily_token_budget_exceeded' in str(exc):
            print('AI_DAILY_BUDGET_EXHAUSTED: switching to deterministic zero-token fallback.')
            fallback.main()
            return
        raise


if __name__ == '__main__':
    main()
