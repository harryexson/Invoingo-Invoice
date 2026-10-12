from pathlib import Path
from PIL import Image
p=Path(__file__).resolve().parents[2]/'brag-output/revision-2/composition/assets'
for name in ['editor','paid']:
    im=Image.open(p/f'{name}-full.png')
    # Pixel bounds verified against the full studio screenshot; isolate actual UI.
    print(name,im.size)
    crop=im.crop((638,170,997,790))
    canvas=Image.new('RGB',(359,797),'white')
    canvas.paste(crop,(0,0))
    canvas.save(p/f'{name}.png')
