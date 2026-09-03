import datetime, html, json, pathlib, subprocess, textwrap, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent
REPO = ROOT.parent
QUEUE = ROOT / 'queue'
OUTPUT = REPO / '.social-output' / 'prestige-local'
BOT_ENDPOINT = 'https://money-machine-bot-hub-uvnwsq.v2.appdeploy.ai/api/social-package'

FALLBACK = [
    {'campaign':'Scope Before You Start','hook':'The cheapest remodeling quote can become the most expensive job.','body':'A clear remodeling scope should account for setup, protection, delivery, disposal, hidden conditions, labor, and finish work—not just the obvious materials.'},
    {'campaign':'Bathroom Water Protection','hook':'Tile is not the waterproofing in a shower.','body':'The waterproofing system behind the finished surface protects the wall assembly. Ask how seams, penetrations, and tub or shower transitions are handled.'},
    {'campaign':'Roof Leak Reality','hook':'A roof leak does not always start directly above the stain.','body':'Water can travel along decking, framing, fasteners, flashing, and insulation before it becomes visible inside. Diagnosis should trace the water path before repair.'},
    {'campaign':'Siding Water Management','hook':'Siding is part of a water-management system—not just the outside color of the house.','body':'Flashing, housewrap, openings, penetrations, and transitions control where water goes. New siding should not simply cover a bad detail.'},
    {'campaign':'Contractor Quality','hook':'The work you cannot see often matters more than the finish you can.','body':'Fasteners, flashing, waterproofing, framing connections, prep, substrate condition, and air or water sealing determine whether a remodel keeps performing.'},
]

def fetch_bot_package(today):
    try:
        req = urllib.request.Request(BOT_ENDPOINT, headers={'User-Agent':'Prestige-GitHub-Publisher/1.0'})
        with urllib.request.urlopen(req, timeout=45) as response:
            data = json.loads(response.read().decode())
        required = ['campaign','hook','body','captions','cta']
        if any(not data.get(k) for k in required):
            raise ValueError('Bot package is incomplete')
        captions = data.get('captions') or {}
        for channel in ['facebook','instagram','youtube-shorts','tiktok']:
            if not captions.get(channel):
                raise ValueError(f'Bot package missing {channel} caption')
        data['generated_for'] = today.isoformat()
        data['source'] = 'money-machine-social-bot'
        return data
    except Exception as exc:
        post = FALLBACK[today.toordinal() % len(FALLBACK)]
        cta = 'Need an estimate for your project? Prestige Remodeling serves Manitowoc and the Wisconsin lakeshore. PrestigeRemodelingWI.com | 920-242-0969'
        return {
            'generated_for': today.isoformat(),
            'campaign': post['campaign'],
            'hook': post['hook'],
            'body': post['body'],
            'cta': cta,
            'captions': {
                'facebook': f"{post['hook']}\n\n{post['body']}\n\n{cta}",
                'instagram': f"{post['hook']}\n\n{post['body']}\n\nPrestigeRemodelingWI.com | 920-242-0969\n\n#Manitowoc #Wisconsin #Remodeling #Contractor #HomeImprovement",
                'youtube-shorts': f"{post['hook']} {post['body']} PrestigeRemodelingWI.com | 920-242-0969 #Shorts #Remodeling #Manitowoc",
                'tiktok': f"{post['hook']} {post['body']} PrestigeRemodelingWI.com | 920-242-0969 #remodeling #contractor #wisconsin",
            },
            'source': 'local-fallback',
            'fallback_reason': str(exc),
        }

def svg_text(lines, start_y, size, gap, fill='#ffffff', weight='700'):
    return '\n'.join(
        f'<text x="540" y="{start_y+i*gap}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="{size}" font-weight="{weight}" fill="{fill}">{html.escape(line)}</text>'
        for i, line in enumerate(lines)
    )

def render_video(package, outdir):
    outdir.mkdir(parents=True, exist_ok=True)
    hook_lines = textwrap.wrap(package['hook'], width=27)[:7]
    body_lines = textwrap.wrap(package['body'], width=38)[:6]
    svg = outdir / 'prestige-short.svg'
    png = outdir / 'prestige-short.png'
    mp4 = outdir / 'prestige-short.mp4'
    svg.write_text(f'''<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#07182f"/><stop offset="1" stop-color="#101820"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#bg)"/><rect x="64" y="72" width="952" height="10" rx="5" fill="#d5a947"/><text x="540" y="185" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="52" font-weight="800" fill="#d5a947">PRESTIGE REMODELING</text><text x="540" y="252" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="30" fill="#c2cede">MANITOWOC - WISCONSIN LAKESHORE</text>{svg_text(hook_lines,560,70,92)}<rect x="100" y="1240" width="880" height="4" fill="#d5a947" opacity="0.75"/>{svg_text(body_lines,1330,34,54,'#dce6f2','500')}<rect x="120" y="1710" width="840" height="112" rx="18" fill="#d5a947"/><text x="540" y="1780" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="40" font-weight="800" fill="#07182f">REQUEST AN ESTIMATE</text><text x="540" y="1870" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="29" fill="#dce6f2">PrestigeRemodelingWI.com - 920-242-0969</text></svg>''')
    subprocess.run(['rsvg-convert','-w','1080','-h','1920','-o',str(png),str(svg)], check=True)
    subprocess.run(['ffmpeg','-y','-loop','1','-i',str(png),'-f','lavfi','-i','anullsrc=channel_layout=stereo:sample_rate=44100','-t','12','-r','30','-vf','format=yuv420p','-c:v','libx264','-preset','veryfast','-c:a','aac','-b:a','96k','-shortest','-movflags','+faststart',str(mp4)], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return mp4

def main():
    today = datetime.date.today()
    package = fetch_bot_package(today)
    outdir = OUTPUT / today.isoformat()
    video = render_video(package, outdir)
    package['video_path'] = str(video.relative_to(REPO))
    package['video_specs'] = {'width':1080,'height':1920,'duration_seconds':12}
    package['publishing_status'] = 'GENERATED_PENDING_PROVIDER_DELIVERY'
    (outdir / 'package.json').write_text(json.dumps(package, indent=2))
    item = {
        'status': 'generated',
        'campaign': package['campaign'],
        'targets': ['facebook','instagram','tiktok','youtube-shorts'],
        'media_type': 'video',
        'media_path': package['video_path'],
        'captions': package['captions'],
        'source': package.get('source','money-machine-social-bot'),
        'generated_for': today.isoformat(),
        'multi_channel_package': str((outdir/'package.json').relative_to(REPO)),
    }
    QUEUE.mkdir(parents=True, exist_ok=True)
    path = QUEUE / f'daily-{today.isoformat()}-multichannel.json'
    path.write_text(json.dumps(item, indent=2))
    print('Content source:', package.get('source'))
    print('Created Prestige multi-channel queue item:', path)
    print('Generated multi-channel package:', outdir/'package.json')
    print('Generated vertical video:', video)

if __name__ == '__main__':
    main()
