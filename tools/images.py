#!/usr/bin/env python3
"""Создаёт уменьшенные копии главных фото (hero-960.webp) для телефонов
и картинки для соцсетей og.jpg (1200x630) для каждой модели.
Запуск из папки сайта: python tools/images.py  (нужен Pillow: pip install pillow)
Запускайте после замены фото hero.webp."""
import os
from PIL import Image
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets', 'img', 'models')
# Где по вертикали находится машина на фото (0 верх, 1 низ), как .ph-<id> в css/style.css
FOCUS = {'a10': .62, 'b10': .68, 'c01': .64, 'c10': .62, 'c11': .70, 'c16': .68, 'd19': .68}
for mid in sorted(os.listdir(ROOT)):
    src = os.path.join(ROOT, mid, 'hero.webp')
    if not os.path.isfile(src):
        continue
    im = Image.open(src).convert('RGB')
    w, h = im.size
    im.resize((960, round(h * 960 / w)), Image.LANCZOS).save(os.path.join(ROOT, mid, 'hero-960.webp'), 'WEBP', quality=78, method=6)
    ch = round(w * 630 / 1200)
    top = min(max(round(h * FOCUS.get(mid, .6) - ch / 2), 0), h - ch)
    im.crop((0, top, w, top + ch)).resize((1200, 630), Image.LANCZOS).save(os.path.join(ROOT, mid, 'og.jpg'), 'JPEG', quality=84, optimize=True, progressive=True)
    print('OK', mid)
