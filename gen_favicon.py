from PIL import Image

src = Image.open(r'public/logo.png').convert('RGBA')
bbox = src.getbbox()            # crop ruang kosong transparan
content = src.crop(bbox)

# bikin kanvas persegi dengan margin tipis 6% agar logo mengisi ikon
w, h = content.size
side = int(max(w, h) * 1.06)
square = Image.new('RGBA', (side, side), (0, 0, 0, 0))
square.paste(content, ((side - w) // 2, (side - h) // 2), content)

# favicon PNG multi-ukuran
for size in (32, 48, 64, 192, 512):
    square.resize((size, size), Image.LANCZOS).save(f'public/favicon-{size}.png')

# apple-touch-icon (iOS suka background opaque -> taruh di putih)
for size in (180,):
    bg = Image.new('RGBA', (size, size), (255, 255, 255, 255))
    logo = square.resize((int(size * 0.86), int(size * 0.86)), Image.LANCZOS)
    off = (size - logo.width) // 2
    bg.paste(logo, (off, off), logo)
    bg.convert('RGB').save(f'public/apple-touch-icon.png')

print('done; cropped', bbox, '-> square', square.size)
