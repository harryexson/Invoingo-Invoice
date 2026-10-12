from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
root=Path(__file__).resolve().parents[2]
image=Image.new('RGB',(1024,1024),'#9fe870');draw=ImageDraw.Draw(image)
font=ImageFont.truetype(str(root/'landing/assets/inter-900.ttf'),620)
draw.text((150,90),'i',font=font,fill='#163300')
draw.line((475,666,785,350),fill='#163300',width=75)
draw.line((547,350,785,350,785,588),fill='#163300',width=75)
image.save(root/'expo-preview/assets/invoingo-icon.png')
