import datetime, html, json, pathlib, subprocess, textwrap

ROOT = pathlib.Path(__file__).resolve().parent
QUEUE = ROOT / 'queue'
OUTPUT = ROOT.parent / '.social-output' / 'prestige-local'

POSTS = [
    {'campaign':'Scope Before You Start','hook':'The cheapest remodeling quote can become the most expensive job.','body':'A solid estimate should account for the whole project—not just the obvious materials. Setup, protection, delivery, disposal, hidden damage, labor, and finish work all matter. A clear scope up front helps prevent expensive surprises later.'},
    {'campaign':'Bathroom Water Protection','hook':'Tile is not the waterproofing in a shower.','body':'The waterproofing system behind the finished surface is what protects the wall assembly. Homeowners should ask what system is being used, how seams and penetrations are treated, and how the transition at the tub or shower base is handled.'},
    {'campaign':'Roof Leak Reality','hook':'A roof leak does not always start directly above the stain.','body':'Water can travel along decking, framing, fasteners, flashing, and insulation before it becomes visible inside. Proper diagnosis means tracing the water path instead of simply patching the first spot that looks suspicious.'},
    {'campaign':'Deck Structure First','hook':'A good-looking deck can still have a bad structure underneath it.','body':'Ledger attachment, flashing, beam support, post connections, joist spacing, stair geometry, and guard details matter long before the finish boards go down. Structure first. Appearance second.'},
    {'campaign':'Siding Water Management','hook':'Siding is part of a water-management system—not just the outside color of the house.','body':'Flashing, housewrap, window and door transitions, penetrations, and kick-out details help control where water goes. Covering a bad detail with new siding does not make the underlying problem disappear.'},
    {'campaign':'Change Orders Protect Everyone','hook':'If the scope changes, the price and schedule may need to change too.','body':'Unexpected damage or homeowner-requested upgrades should be documented before the extra work is performed. Clear change orders protect the homeowner and the contractor by keeping scope, cost, and expectations aligned.'},
    {'campaign':'Foundation Insulation Detail','hook':'Exterior foundation insulation fails fast when the exposed edge is ignored.','body':'Below-grade and exposed foundation insulation need the correct protection and finish for the location. Moisture exposure, UV, impact, grade level, and the transition into siding all need to be considered as one detail.'},
    {'campaign':'Window Leak Diagnosis','hook':'Replacing caulk is not the same thing as fixing a leaking window.','body':'Water can enter through failed flashing, trim details, siding transitions, deteriorated framing, or the window unit itself. The repair should address the actual entry path, not just cover the symptom.'},
    {'campaign':'Homeowner Planning','hook':'One of the best ways to control remodeling cost is to make decisions before demolition starts.','body':'Selections, access, disposal, material lead times, hidden-condition allowances, and sequencing all affect the job. Better planning means fewer mid-project surprises and fewer avoidable delays.'},
    {'campaign':'Contractor Quality','hook':'The work you cannot see often matters more than the finish you can.','body':'Fasteners, flashing, waterproofing, framing connections, prep work, substrate condition, and air or water sealing are the details that determine whether a remodel keeps performing after the photos are taken.'},
    {'campaign':'Roof Flashing','hook':'Most roof problems are detail problems.','body':'Chimneys, sidewalls, valleys, skylights, penetrations, and roof-to-wall transitions deserve as much attention as the shingles or panels themselves. Good flashing details are a major part of keeping water out.'},
    {'campaign':'Remodeling Estimate','hook':'A useful remodeling estimate should tell you what is actually included.','body':'Homeowners should be able to understand the major scope, materials or allowances, exclusions, payment structure, and what happens if hidden conditions are discovered. A single number without scope leaves too much room for confusion.'},
    {'campaign':'Exterior Repair','hook':'Small exterior damage is easier to fix before water turns it into structural damage.','body':'Loose flashing, damaged trim, open joints, deteriorated sealant, exposed sheathing, and failed siding details can let moisture travel farther than expected. Early repair can prevent a much larger project.'},
    {'campaign':'Local Contractor CTA','hook':'Planning a remodeling or exterior project around Manitowoc?','body':'Prestige Remodeling handles residential remodeling, repairs, roofing, siding, decks, bathrooms, and other home-improvement work with the scope worked out before the job starts.'}
]

def svg_text(lines, start_y, size, gap, fill='#ffffff', weight='700'):
    out=[]
    for i,line in enumerate(lines):
        out.append(f'<text x="540" y="{start_y+i*gap}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="{size}" font-weight="{weight}" fill="{fill}">{html.escape(line)}</text>')
    return '\n'.join(out)

def render_video(post, outdir):
    outdir.mkdir(parents=True, exist_ok=True)
    hook_lines=textwrap.wrap(post['hook'], width=27)[:7]
    body_lines=textwrap.wrap(post['body'], width=38)[:6]
    svg=outdir/'prestige-short.svg'
    png=outdir/'prestige-short.png'
    mp4=outdir/'prestige-short.mp4'
    svg.write_text(f'''<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#07182f"/><stop offset="1" stop-color="#101820"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#bg)"/><rect x="64" y="72" width="952" height="10" rx="5" fill="#d5a947"/><text x="540" y="185" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="52" font-weight="800" fill="#d5a947">PRESTIGE REMODELING</text><text x="540" y="252" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="30" fill="#c2cede">MANITOWOC • WISCONSIN LAKESHORE</text>{svg_text(hook_lines,560,70,92)}<rect x="100" y="1240" width="880" height="4" fill="#d5a947" opacity="0.75"/>{svg_text(body_lines,1330,34,54,'#dce6f2','500')}<rect x="120" y="1710" width="840" height="112" rx="18" fill="#d5a947"/><text x="540" y="1780" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="40" font-weight="800" fill="#07182f">REQUEST AN ESTIMATE</text><text x="540" y="1870" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="29" fill="#dce6f2">PrestigeRemodelingWI.com • 920-242-0969</text></svg>''')
    subprocess.run(['rsvg-convert','-w','1080','-h','1920','-o',str(png),str(svg)],check=True)
    subprocess.run(['ffmpeg','-y','-loop','1','-i',str(png),'-f','lavfi','-i','anullsrc=channel_layout=stereo:sample_rate=44100','-t','12','-r','30','-vf','format=yuv420p','-c:v','libx264','-preset','veryfast','-c:a','aac','-b:a','96k','-shortest','-movflags','+faststart',str(mp4)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    return mp4

def main():
    today=datetime.date.today()
    post=POSTS[today.toordinal()%len(POSTS)]
    cta='Need an estimate for your project? Prestige Remodeling serves Manitowoc and the Wisconsin lakeshore.\nPrestigeRemodelingWI.com | 920-242-0969'
    facebook=f"{post['hook']}\n\n{post['body']}\n\n{cta}"
    instagram=f"{post['hook']}\n\n{post['body']}\n\nPrestigeRemodelingWI.com | 920-242-0969\n\n#Manitowoc #Wisconsin #Remodeling #Contractor #HomeImprovement"
    youtube=f"{post['hook']} {post['body']} PrestigeRemodelingWI.com | 920-242-0969 #Shorts #Remodeling #Manitowoc"
    tiktok=f"{post['hook']} {post['body']} PrestigeRemodelingWI.com | 920-242-0969 #remodeling #contractor #wisconsin"
    outdir=OUTPUT/today.isoformat()
    video=render_video(post,outdir)
    package={'generated_for':today.isoformat(),'campaign':post['campaign'],'hook':post['hook'],'body':post['body'],'captions':{'facebook':facebook,'instagram':instagram,'youtube-shorts':youtube,'tiktok':tiktok},'video_path':str(video.relative_to(ROOT.parent)),'video_specs':{'width':1080,'height':1920,'duration_seconds':12},'publishing_status':'BLOCKED_CREDENTIALS','required_connections':['Buffer or Meta for Facebook/Instagram','TikTok access token','Google/YouTube OAuth refresh token']}
    (outdir/'package.json').write_text(json.dumps(package,indent=2))
    item={'status':'ready','campaign':post['campaign'],'targets':['facebook'],'media_type':'text','media_url':'','captions':{'facebook':facebook},'source':'prestige-local-marketing-bot','generated_for':today.isoformat(),'multi_channel_package':str((outdir/'package.json').relative_to(ROOT.parent))}
    QUEUE.mkdir(parents=True,exist_ok=True)
    path=QUEUE/f'daily-{today.isoformat()}-facebook.json'
    if not path.exists():
        path.write_text(json.dumps(item,indent=2))
        print('Created daily Prestige Facebook queue item:',path)
    else:
        print('Daily queue item already exists:',path)
    print('Generated multi-channel package:',outdir/'package.json')
    print('Generated vertical video:',video)

if __name__=='__main__': main()
