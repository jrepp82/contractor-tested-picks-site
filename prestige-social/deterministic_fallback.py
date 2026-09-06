#!/usr/bin/env python3
from __future__ import annotations
import datetime, json, math, pathlib, subprocess, sys, textwrap
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = pathlib.Path(__file__).resolve().parent
W,H=1080,1920
FPS=30
DURATION=24
SAFE=(90,180,830,1450)
BG=(5,15,28)
NAVY=(8,32,56)
BLUE=(33,119,255)
CYAN=(74,208,255)
WHITE=(244,248,252)
MUTED=(166,184,204)
GOLD=(218,171,74)
RED=(255,92,92)
GREEN=(76,207,130)
WOOD=(147,95,58)
METAL=(174,190,207)
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'

CLAIMS={
 'KICKOUT_DIVERTS_TO_GUTTER':{
  'claim':'Kick-out flashing at a roof-wall intersection diverts rainwater runoff into the gutter and helps protect the wall from water intrusion.',
  'source_name':'U.S. DOE Building Science Education — Kick-out Flashing at Roof-Wall Intersections',
  'source_url':'https://bsesc.energy.gov/energy-basics/kick-out-flashing-roof-wall-intersections'},
 'STEP_FLASHING_ROOF_WALL':{
  'claim':'Step flashing at roof-wall intersections is integrated with roof and wall drainage planes in shingle fashion to protect walls from water intrusion.',
  'source_name':'U.S. DOE Building Science Education — Step Flashing at Roof-Wall Intersections',
  'source_url':'https://bsesc.energy.gov/energy-basics/step-flashing-roof-wall-intersections'}
}

EPISODE={
 'day':1,'date':'2026-09-06','topic':'Kick-out flashing at roof-to-wall eaves','style_id':'cinematic_isometric',
 'technical_claim_ids':['KICKOUT_DIVERTS_TO_GUTTER','STEP_FLASHING_ROOF_WALL'],
 'publishing':'DISABLED','owner_approved':False,'narration_mode':'none','personal_job_media':False,
 'hook':'This tiny flashing detail can decide whether roof runoff reaches the gutter—or the wall.',
 'primary_takeaway':'Step flashing manages the roof-to-wall joint; the kick-out at the bottom redirects concentrated runoff into the gutter before it can dump behind cladding.'
}

SCENES=[
 ('hook','ONE SMALL DETAIL. BIG WATER PATH.','Watch what happens at the bottom of a roof-to-wall intersection.'),
 ('failure','WITHOUT THE KICK-OUT','Runoff follows the wall instead of being pushed into the gutter.'),
 ('step','STEP FLASHING = THE LAYERED PATH','Each piece laps with the roof and wall drainage layers.'),
 ('diverter','THE KICK-OUT FINISHES THE PATH','The bottom diverter turns concentrated runoff outward.'),
 ('water','WATER SHOULD LAND HERE','Into the gutter—not behind siding or trim.'),
 ('inspect','WHAT TO LOOK FOR','Continuous step flashing • kick-out at the eave • clear gutter entry'),
 ('payoff','THE TAKEAWAY','Correct water management is layered. Sealant is not the system.'),
 ('close','WHEN THE DETAILS MATTER','Prestige Remodeling • Manitowoc, Wisconsin')
]

def run(cmd,timeout=240):
    p=subprocess.run(cmd,text=True,capture_output=True,timeout=timeout)
    if p.returncode:
        raise RuntimeError((p.stderr or p.stdout)[-8000:])
    return p

def font(size,bold=False): return ImageFont.truetype(BOLD if bold else FONT,size)

def text_center(draw,text,y,size,bold=False,fill=WHITE,maxw=820,spacing=8):
    f=font(size,bold)
    words=text.split(); lines=[]; line=''
    for word in words:
        test=(line+' '+word).strip()
        if draw.textbbox((0,0),test,font=f)[2] > maxw and line:
            lines.append(line); line=word
        else: line=test
    if line: lines.append(line)
    for ln in lines:
        box=draw.textbbox((0,0),ln,font=f); x=(W-(box[2]-box[0]))//2
        draw.text((x,y),ln,font=f,fill=fill)
        y += (box[3]-box[1])+spacing
    return y

def glow_dot(im,xy,r,color):
    layer=Image.new('RGBA',im.size,(0,0,0,0)); d=ImageDraw.Draw(layer)
    for rr,a in [(r*4,20),(r*3,35),(r*2,55),(r,220)]:
        d.ellipse((xy[0]-rr,xy[1]-rr,xy[0]+rr,xy[1]+rr),fill=(*color,a))
    layer=layer.filter(ImageFilter.GaussianBlur(radius=max(2,r//2)))
    im.alpha_composite(layer)

def iso_house(draw,origin=(240,690),scale=1.0,show_kick=True,show_step=True,water_mode='good',highlight=None):
    ox,oy=origin
    wall=[(ox,oy),(ox+390*scale,oy-145*scale),(ox+390*scale,oy+430*scale),(ox,oy+565*scale)]
    draw.polygon(wall,fill=(31,47,66),outline=(91,119,145),width=4)
    side=[(ox+390*scale,oy-145*scale),(ox+555*scale,oy-60*scale),(ox+555*scale,oy+515*scale),(ox+390*scale,oy+430*scale)]
    draw.polygon(side,fill=(22,36,53),outline=(91,119,145),width=4)
    roof=[(ox-95*scale,oy+70*scale),(ox+250*scale,oy-190*scale),(ox+585*scale,oy-20*scale),(ox+240*scale,oy+240*scale)]
    draw.polygon(roof,fill=(62,69,78),outline=(126,139,151),width=4)
    for i in range(5):
        yy=oy+70*scale-i*48*scale
        draw.line([(ox-80*scale+i*45*scale,yy),(ox+255*scale+i*45*scale,yy-250*scale)],fill=(102,111,120),width=3)
    gutter=[(ox+185*scale,oy+220*scale),(ox+530*scale,oy+43*scale),(ox+548*scale,oy+67*scale),(ox+203*scale,oy+244*scale)]
    draw.polygon(gutter,fill=METAL,outline=(226,235,243),width=3)
    if show_step:
        for i in range(5):
            x=ox+30*scale+i*48*scale; y=oy+40*scale-i*36*scale
            draw.polygon([(x,y),(x+55*scale,y-42*scale),(x+92*scale,y-23*scale),(x+37*scale,y+19*scale)],fill=(101,176,226),outline=(193,229,251),width=2)
    if show_kick:
        x=ox+205*scale; y=oy+206*scale
        kick=[(x,y),(x+88*scale,y-45*scale),(x+122*scale,y-28*scale),(x+54*scale,y+42*scale),(x+12*scale,y+27*scale)]
        draw.polygon(kick,fill=GOLD,outline=(255,225,151),width=4)
    if water_mode:
        pts=[]
        for i in range(8):
            t=i/7
            x=ox+15*scale+(215*scale)*t
            y=oy-40*scale+(250*scale)*t
            pts.append((x,y))
        if water_mode=='good':
            pts += [(ox+260*scale,oy+225*scale),(ox+350*scale,oy+180*scale),(ox+420*scale,oy+145*scale)]
            col=CYAN
        else:
            pts += [(ox+238*scale,oy+265*scale),(ox+255*scale,oy+355*scale),(ox+265*scale,oy+455*scale)]
            col=RED
        draw.line(pts,fill=col,width=max(8,int(12*scale)),joint='curve')
        for px,py in pts[::2]: draw.ellipse((px-8,py-8,px+8,py+8),fill=col)
    if highlight=='kick':
        draw.ellipse((ox+175*scale,oy+150*scale,ox+365*scale,oy+330*scale),outline=GOLD,width=8)
    elif highlight=='step':
        draw.line([(ox-5*scale,oy+80*scale),(ox+280*scale,oy-145*scale)],fill=CYAN,width=8)
    elif highlight=='gutter':
        draw.line([(ox+178*scale,oy+215*scale),(ox+545*scale,oy+30*scale)],fill=GREEN,width=10)

def top_brand(draw):
    draw.rounded_rectangle((90,76,990,146),radius=28,fill=(8,32,56),outline=(37,107,168),width=2)
    draw.text((126,94),'PRESTIGE  •  CONTRACTOR EXPLAINS',font=font(26,True),fill=(185,221,255))

def footer(draw,scene_idx):
    draw.text((92,1760),f'{scene_idx+1:02d} / {len(SCENES):02d}',font=font(22,True),fill=(107,132,157))
    draw.text((650,1760),'PrestigeRemodelingWI.com',font=font(22,True),fill=(107,132,157))

def base_scene(idx):
    im=Image.new('RGBA',(W,H),BG+(255,)); d=ImageDraw.Draw(im)
    for r in range(900,120,-70):
        a=max(8,int(28*(1-r/900)))
        layer=Image.new('RGBA',(W,H),(0,0,0,0)); ld=ImageDraw.Draw(layer)
        ld.ellipse((540-r,780-r,540+r,780+r),fill=(18,74,117,a))
        im.alpha_composite(layer)
    top_brand(d); footer(d,idx)
    return im,d

def scene(idx,key,title,sub):
    im,d=base_scene(idx)
    y=205
    title_size=44 if len(title)>32 else (50 if len(title)>24 else 58)
    y=text_center(d,title,y,title_size,True,WHITE,maxw=700,spacing=8)
    text_center(d,sub,y+26,29,False,MUTED,maxw=700,spacing=6)
    if key=='hook':
        iso_house(d,(245,770),1.05,True,True,'good','kick')
        glow_dot(im,(510,1060),18,GOLD)
        d.text((165,1430),'KICK-OUT',font=font(29,True),fill=GOLD)
        d.line((310,1450,510,1100),fill=GOLD,width=4)
    elif key=='failure':
        iso_house(d,(250,765),1.02,False,True,'bad',None)
        d.rounded_rectangle((130,1375,950,1510),radius=28,fill=(74,19,27),outline=(152,44,58),width=3)
        d.text((175,1414),'RUNOFF TRACKS DOWN THE WALL',font=font(34,True),fill=(255,164,169))
        d.text((175,1462),'This is the failure path.',font=font(27),fill=(255,210,212))
    elif key=='step':
        iso_house(d,(245,760),1.04,False,True,None,'step')
        for n,(x,y2) in enumerate([(300,1150),(365,1098),(430,1044),(495,990)],1):
            d.rounded_rectangle((x-28,y2-28,x+28,y2+28),radius=14,fill=BLUE)
            d.text((x-9,y2-17),str(n),font=font(24,True),fill=WHITE)
        d.text((155,1450),'SHINGLE-FASHION LAPS',font=font(34,True),fill=CYAN)
    elif key=='diverter':
        iso_house(d,(235,760),1.06,True,True,None,'kick')
        d.polygon([(595,1120),(780,1020),(820,1040),(675,1190)],fill=GOLD,outline=(255,230,166),width=5)
        d.text((565,1240),'OUTWARD',font=font(36,True),fill=GOLD)
        d.line((645,1285,740,1165),fill=GOLD,width=5)
    elif key=='water':
        iso_house(d,(235,760),1.06,True,True,'good','gutter')
        d.rounded_rectangle((155,1385,925,1515),radius=30,fill=(14,67,53),outline=(54,157,110),width=3)
        d.text((260,1425),'ROOF  →  KICK-OUT  →  GUTTER',font=font(32,True),fill=(158,246,202))
    elif key=='inspect':
        items=[('1','STEP FLASHING','layered with roof + wall drainage'),('2','KICK-OUT','present at the bottom of the sidewall'),('3','GUTTER ENTRY','runoff has an unobstructed path')]
        yy=660
        for n,h,desc in items:
            d.rounded_rectangle((130,yy,950,yy+225),radius=34,fill=(12,38,63),outline=(44,103,153),width=3)
            d.rounded_rectangle((170,yy+52,260,yy+142),radius=25,fill=BLUE)
            d.text((199,yy+67),n,font=font(42,True),fill=WHITE)
            d.text((300,yy+42),h,font=font(38,True),fill=WHITE)
            text_center(d,desc,yy+108,25,False,MUTED,maxw=560)
            yy+=255
    elif key=='payoff':
        d.rounded_rectangle((130,610,950,1330),radius=42,fill=(9,29,50),outline=(42,100,150),width=4)
        d.text((195,695),'THE SYSTEM',font=font(31,True),fill=CYAN)
        steps=['Step flashing handles the joint.','Kick-out redirects concentrated runoff.','The gutter receives the water.','Sealant is maintenance—not the drainage strategy.']
        yy=785
        for i,s in enumerate(steps):
            col=GOLD if i==3 else WHITE
            d.ellipse((190,yy+8,214,yy+32),fill=col)
            f=font(29,i==3); words=s.split(); line=''; lines=[]
            for word in words:
                test=(line+' '+word).strip()
                if d.textbbox((0,0),test,font=f)[2]>555 and line: lines.append(line); line=word
                else: line=test
            if line: lines.append(line)
            for j,ln in enumerate(lines[:2]): d.text((245,yy+j*38),ln,font=f,fill=col)
            yy+=135
    elif key=='close':
        d.rounded_rectangle((150,570,930,1320),radius=60,fill=(7,31,55),outline=(39,111,172),width=4)
        d.text((265,690),'PRESTIGE',font=font(92,True),fill=WHITE)
        d.text((287,800),'REMODELING',font=font(52,True),fill=CYAN)
        d.line((260,900,820,900),fill=GOLD,width=5)
        d.text((244,980),'Built Right.',font=font(40,True),fill=WHITE)
        d.text((244,1040),'Built Strong.',font=font(40,True),fill=WHITE)
        d.text((244,1100),'Built to Last.',font=font(40,True),fill=WHITE)
        d.rounded_rectangle((250,1200,830,1300),radius=30,fill=BLUE)
        d.text((320,1225),'Request an Estimate',font=font(34,True),fill=WHITE)
    return im.convert('RGB')

def create_scenes(outdir):
    paths=[]
    for i,(key,title,sub) in enumerate(SCENES):
        p=outdir/f'beat-{i+1:02d}.png'
        scene(i,key,title,sub).save(p,quality=96)
        paths.append(p)
    return paths

def create_audio(out):
    cmd=['ffmpeg','-y','-f','lavfi','-i',f'anoisesrc=color=pink:amplitude=0.035:duration={DURATION}:sample_rate=48000',
         '-f','lavfi','-i',f'sine=frequency=86:sample_rate=48000:duration={DURATION}',
         '-filter_complex',"[0:a]highpass=f=900,lowpass=f=6500,volume=0.35[n];[1:a]volume=0.025,lowpass=f=250[s];[n][s]amix=inputs=2:normalize=0,loudnorm=I=-18:TP=-1.5:LRA=5,volume=-3dB,pan=stereo|c0=c0|c1=c0[a]",
         '-map','[a]','-c:a','aac','-b:a','192k',str(out)]
    run(cmd)

def render_video(outdir,scenes,audio):
    beat=3.25; fade=0.35
    cmd=['ffmpeg','-y']
    for p in scenes: cmd += ['-loop','1','-t',str(beat),'-i',str(p)]
    cmd += ['-i',str(audio)]
    chains=[]
    for i in range(len(scenes)):
        z="min(zoom+0.00045,1.045)" if i%2==0 else "if(lte(zoom,1.0),1.045,max(1.0,zoom-0.00045))"
        chains.append(f'[{i}:v]scale=1080:1920,zoompan=z=\'{z}\':d={int(beat*FPS)}:s=1080x1920:fps={FPS},setsar=1[v{i}]')
    prev='v0'; offset=beat-fade
    for i in range(1,len(scenes)):
        out=f'x{i}'
        trans=['fade','smoothleft','fadeblack','smoothup','fade','circleopen','fade'][i-1]
        chains.append(f'[{prev}][v{i}]xfade=transition={trans}:duration={fade}:offset={offset:.2f}[{out}]')
        prev=out; offset += beat-fade
    filt=';'.join(chains)
    video=outdir/'Prestige_Kickout_Flashing_PREMIUM_PRIVATE_CANDIDATE.mp4'
    cmd += ['-filter_complex',filt,'-map',f'[{prev}]','-map',f'{len(scenes)}:a','-t',f'{offset+fade:.2f}','-r',str(FPS),'-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-movflags','+faststart',str(video)]
    run(cmd,timeout=420)
    return video

def av_probe(video):
    p=run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(video)],timeout=30)
    data=json.loads(p.stdout); streams=data['streams']; v=next(s for s in streams if s['codec_type']=='video'); a=next(s for s in streams if s['codec_type']=='audio')
    loud=run(['ffmpeg','-hide_banner','-i',str(video),'-af','loudnorm=I=-18:TP=-1:LRA=7:print_format=json','-f','null','-'],timeout=60).stderr
    start=loud.rfind('{'); end=loud.rfind('}')+1
    stats=json.loads(loud[start:end]) if start>=0 and end>start else {}
    return {
      'video_codec':v['codec_name'],'resolution':f"{v['width']}x{v['height']}",'fps':v.get('avg_frame_rate'),
      'audio_codec':a['codec_name'],'audio_channels':a.get('channels'),'duration_seconds':round(float(data['format']['duration']),2),
      'integrated_lufs':float(stats.get('input_i','nan')),'true_peak_dbfs':float(stats.get('input_tp','nan')),'decode_errors':False
    }

def objective_gate(av,video):
    errors=[]
    if av['video_codec']!='h264': errors.append('video codec must be H.264')
    if av['resolution']!='1080x1920': errors.append('resolution must be 1080x1920')
    if av['audio_codec']!='aac' or av['audio_channels']!=2: errors.append('audio must be AAC stereo')
    if not 10 <= av['duration_seconds'] <= 60: errors.append('duration outside 10-60 seconds')
    if not -20 <= av['integrated_lufs'] <= -16: errors.append(f"integrated loudness {av['integrated_lufs']} outside -20..-16 LUFS")
    if av['true_peak_dbfs'] > -1.0: errors.append(f"true peak {av['true_peak_dbfs']} exceeds -1 dBFS")
    if video.stat().st_size < 500000: errors.append('video file unexpectedly small')
    return errors

def write_metadata(outdir,video,av,errors):
    meta={
      'candidate_version':'premium-private-v9','contentDate':datetime.date.today().isoformat(),'episode':EPISODE,
      'style_id':EPISODE['style_id'],'technical_claim_ids':EPISODE['technical_claim_ids'],
      'technical_sources':CLAIMS,'video_path':str(video),'publishing':'DISABLED','owner_approved':False,
      'personal_job_media':False,'stock_footage':False,'recycled_third_party_clips':False,'narration_mode':'none',
      'audio_mode':'original-sound-design-only','visual_beats':len(SCENES),
      'layout':{'canvas':{'width':1080,'height':1920},'critical_zone':{'x_min':90,'x_max':830,'y_min':180,'y_max':1450},'platform_preview_required':True},
      'av':av,'objective_errors':errors,
      'objective_status':'PASS' if not errors else 'REJECTED',
      'subjective_review':{'status':'REQUIRED_NOT_COMPLETED','minimum_each':9.0,'minimum_overall':9.3,'self_generated_auto_approval':False},
      'candidate_status':'PRIVATE_AWAITING_PREMIUM_REVIEW' if not errors else 'REJECTED_OBJECTIVE_QA',
      'release_rule':'Even an objective PASS is not publish authorization. Independent/owner subjective review must score every category >=9.0 and overall >=9.3, then Jason must explicitly approve this exact finished video.'
    }
    (outdir/'candidate-metadata.json').write_text(json.dumps(meta,indent=2))
    return meta

def main():
    outdir=pathlib.Path('.social-output')/'premium-private'/datetime.date.today().isoformat()
    outdir.mkdir(parents=True,exist_ok=True)
    scenes=create_scenes(outdir)
    audio=outdir/'sound-design.m4a'; create_audio(audio)
    video=render_video(outdir,scenes,audio)
    av=av_probe(video); errors=objective_gate(av,video)
    meta=write_metadata(outdir,video,av,errors)
    print(json.dumps({'video':str(video),'metadata':str(outdir/'candidate-metadata.json'),'objective_status':meta['objective_status'],'candidate_status':meta['candidate_status'],'av':av,'errors':errors},indent=2))
    if errors: sys.exit(2)

if __name__=='__main__': main()
