from pathlib import Path
import re
from PIL import Image,ImageDraw
import numpy as np
root=Path('.')
out=root/'public/images/brands/light';out.mkdir(parents=True,exist_ok=True)
white=['magnum','stlth','mercato-di-bellina','iron-brothers','freezo','hope-harvest']
original=['bull-nutrition','unity-supplements','whiskey-road','wellth-foods','medicrunch']
files=[]
for slug in white+original+['nosh-balls']:
 source=root/'public/images/project'/slug/('logo.webp' if slug in ['stlth','medicrunch'] else 'logo.png')
 im=Image.open(source).convert('RGBA');a=np.array(im)
 if slug in white:
  visible=a[:,:,3]>0
  a[visible,:3]=[25,26,24]
 elif slug=='nosh-balls':
  # Preserve the complete colored ball, including its neutral highlights/shadows.
  colorful=(a[:,:,:3].max(2).astype(int)-a[:,:,:3].min(2).astype(int)>25)&(a[:,:,3]>0)
  yy,xx=np.where(colorful); bounds=(xx.min()-2,yy.min()-2,xx.max()+3,yy.max()+3)
  protect=np.zeros(a.shape[:2],dtype=bool);protect[bounds[1]:bounds[3],bounds[0]:bounds[2]]=True
  neutral=(a[:,:,:3].max(2).astype(int)-a[:,:,:3].min(2).astype(int)<20)&(a[:,:,3]>0)&~protect
  a[neutral,:3]=[25,26,24]
  assert np.array_equal(a[protect],np.array(im)[protect])
 Image.fromarray(a).save(out/f'{slug}.png');files.append(out/f'{slug}.png')
sheet=Image.new('RGB',(1000,420),'#FAFAFA');d=ImageDraw.Draw(sheet)
for i,p in enumerate(files):
 im=Image.open(p);im.thumbnail((210,95));x=i%4*250;y=i//4*140
 sheet.paste(im,(x+15,y+30),im);d.text((x+15,y+10),p.stem,fill='black')
sheet.save('output/playwright/maya-review/logo-corrected.png')
