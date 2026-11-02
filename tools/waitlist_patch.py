# Re-versions a finished Josh Dan Martell reel for the waitlist: covers the old "$1,000" CTA sticker and end card
# with new ones drawn with the exact same geometry and motion as the original compositor (tier_dm.py), so the old
# graphics never show. Usage: python3 waitlist_patch.py <in.mp4> <out.mp4> [--detect-only]
import sys, os, json, math, subprocess, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from scipy import ndimage

S = os.path.dirname(os.path.abspath(__file__)) + '/pipe/'
FU = S + 'fonts/Ubuntu-%s.ttf'; FA = S + 'fa/package/webfonts/fa-solid-900.ttf'; LOGO = S + 'broll/adit_logo_flat.png'
W, H = 1080, 1920; FPS = 30000 / 1001; F1 = 1 / FPS
NAVYT = (9, 42, 61); ORANGE = (242, 136, 32); BLUE = (37, 168, 224)
fu = lambda w, sz: ImageFont.truetype(FU % w, sz)
def ease(x): x = min(1, max(0, x)); return x * x * (3 - 2 * x)
def eob(x): x = min(1, max(0, x)); c = 1.5; return 1 + (c + 1) * (x - 1) ** 3 + c * (x - 1) ** 2

def _txt(parts, font):
    w = sum(font.getlength(x) for x, _ in parts); asc, desc = font.getmetrics()
    im = Image.new('RGBA', (int(w) + 4, asc + desc + 4), (0, 0, 0, 0)); d = ImageDraw.Draw(im); x = 2
    for x_, col in parts: d.text((x, 2), x_, font=font, fill=col); x += font.getlength(x_)
    return im

# ---------------- sticker (same construction as tier_dm._sticker_parts) ----------------
def sticker_parts(l3parts, l4parts, size=None, fill_a=250, f3size=40):
    f1, f2, f3 = fu('Medium', 31), fu('Bold', 44), fu('Bold', f3size)
    l1 = _txt([('Comment the word', NAVYT)], f1); l3 = _txt(l3parts, f1); l4 = _txt(l4parts, f3)
    bb = f2.getbbox('CHALLENGE'); cw, ch = bb[2] - bb[0] + 36, f2.size + 22
    chip = Image.new('RGBA', (cw, ch), (0, 0, 0, 0)); d = ImageDraw.Draw(chip)
    d.rounded_rectangle([0, 0, cw - 1, ch - 1], 14, fill=BLUE); d.text((18 - bb[0], (ch - f2.size) / 2 - 4), 'CHALLENGE', font=f2, fill=(255, 255, 255))
    w = max(l1.width, l3.width, l4.width, cw) + 44; h = 22 + l1.height + 6 + ch + 8 + l3.height + l4.height + 16
    nat = (w, h)
    if size: w, h = size
    card = Image.new('RGBA', (w + 60, h + 60), (0, 0, 0, 0)); cd = ImageDraw.Draw(card)
    cd.rounded_rectangle([30, 30, 30 + w, 30 + h], 26, fill=(255, 255, 255, fill_a))
    y = 30 + 20 + (h - nat[1]) // 2
    card.alpha_composite(l1, (30 + (w - l1.width) // 2, y)); y += l1.height + 6
    chip_xy = (30 + (w - cw) // 2, y); y += ch + 8
    for im in (l3, l4):
        card.alpha_composite(im, (30 + (w - im.width) // 2, y)); y += im.height - 2
    ico = ImageFont.truetype(FA, 54); g = chr(0xf4ad); ib = ico.getbbox(g)
    badge = Image.new('RGBA', (ib[2] - ib[0] + 6, ib[3] - ib[1] + 6), (0, 0, 0, 0)); ImageDraw.Draw(badge).text((3 - ib[0], 3 - ib[1]), g, font=ico, fill=ORANGE)
    return dict(card=card, chip=chip, chip_xy=chip_xy, badge=badge, nat=nat, size=(w, h))

OLD = sticker_parts([('to see how you can', NAVYT)], [('win ', NAVYT), ('$1,000', ORANGE)])

def sticker_scale(ts):
    return (0.5 + 0.5 * eob(ts / 0.5)) * 0.92

def render_sticker(P, ts, scale=None, alpha=None):
    """Returns (RGBA image, top-left offset relative to pos) exactly like tier_dm.draw_sticker minus the shadow."""
    im = P['card'].copy(); chip, chip_xy, badge = P['chip'], P['chip_xy'], P['badge']
    pulse = 1 + 0.07 * max(0, math.sin(math.pi * ((ts % 3.2) - 2.5) / 0.7)) if (ts % 3.2) > 2.5 else 1
    c2 = chip.resize((int(chip.width * pulse), int(chip.height * pulse)), Image.LANCZOS)
    im.alpha_composite(c2, (chip_xy[0] - (c2.width - chip.width) // 2, chip_xy[1] - (c2.height - chip.height) // 2))
    wig = 10 * math.sin(ts * 6.0) * (1 if (ts % 3.2) > 2.5 else 0.25)
    b2 = badge.rotate(wig, Image.BICUBIC, expand=True); im.alpha_composite(b2, (im.width - b2.width - 4, 4))
    sc = sticker_scale(ts) if scale is None else scale
    a = min(1, max(0, ts) / 0.25) if alpha is None else alpha
    ang = -3 + 1.3 * math.sin(2 * math.pi * ts / 3.6)
    im = im.resize((max(1, int(im.width * sc)), max(1, int(im.height * sc))), Image.LANCZOS).rotate(ang, Image.BICUBIC, expand=True)
    if a < 1: im.putalpha(im.getchannel('A').point(lambda v: int(v * a)))
    # the original pasted the shadow canvas (2r = 24 px margin each side) centred on pos
    shw, shh = im.width + 48, im.height + 48
    bob = 6 * math.sin(2 * math.pi * ts / 2.7)
    return im, (shw, shh, bob)

def place(pos, geo):
    shw, shh, bob = geo
    return int(pos[0] - shw / 2) + 24, int(pos[1] - shh / 2 + bob) + 24

# ---------------- end card (same construction as tier_dm.endcard) ----------------
def ec_layers(line_b, line_c, c_size):
    L = []
    logo = Image.open(LOGO).convert('RGBA'); lw = 380; logo = logo.resize((lw, int(logo.height * lw / logo.width)), Image.LANCZOS)
    L.append((logo, (W - lw) // 2, 420, 1.15, 'logo'))
    a = _txt([('Comment the word', NAVYT)], fu('Medium', 66)); L.append((a, (W - a.width) // 2, 770, 1.50, 'rise'))
    f = fu('Bold', 124); bb = f.getbbox('CHALLENGE'); bw, bh = bb[2] - bb[0] + 96, f.size + 56
    box = Image.new('RGBA', (bw, bh), (0, 0, 0, 0)); d = ImageDraw.Draw(box)
    d.rounded_rectangle([0, 0, bw - 1, bh - 1], 30, fill=BLUE); d.text((48 - bb[0], (bh - f.size) / 2 - 6), 'CHALLENGE', font=f, fill=(255, 255, 255))
    L.append((box, (W - bw) // 2, 880, 1.85, 'pop'))
    b = _txt(line_b, fu('Medium', 58)); L.append((b, (W - b.width) // 2, 1110, 2.25, 'rise'))
    c2 = _txt(line_c, fu('Bold', c_size)); L.append((c2, (W - c2.width) // 2, 1185 + (112 - c_size) // 2, 2.55, 'rise'))
    ico = ImageFont.truetype(FA, 96); g = chr(0xf4ad); ib = ico.getbbox(g)
    ic = Image.new('RGBA', (ib[2] - ib[0] + 8, ib[3] - ib[1] + 8), (0, 0, 0, 0)); ImageDraw.Draw(ic).text((4 - ib[0], 4 - ib[1]), g, font=ico, fill=ORANGE)
    L.append((ic, (W - ic.width) // 2, 1420, 3.00, 'bounce'))
    return L

def endcard(L, te):
    im = Image.new('RGBA', (W, H), (255, 255, 255, 255)); d = ImageDraw.Draw(im)
    for i, col in enumerate([(37, 168, 224), (45, 220, 150), (253, 185, 19), (242, 136, 32)]):
        d.rectangle([i * W // 4, 0, (i + 1) * W // 4, 14], fill=col)
    for lay, x, y, t0, kind in L:
        k = (te - t0) / 0.6
        if k <= 0: continue
        a = min(1, k); l2 = lay; idle = te - t0 - 0.6
        if kind == 'pop':
            sc = (0.6 + 0.4 * eob(k)) * (1 + (0.035 * math.sin(2 * math.pi * idle / 1.5) if idle > 0 else 0)); l2 = lay.resize((max(1, int(lay.width * sc)), max(1, int(lay.height * sc))), Image.LANCZOS)
            x, y = x + (lay.width - l2.width) // 2, y + (lay.height - l2.height) // 2
        elif kind in ('rise', 'logo'):
            y += int(44 * (1 - ease(k)))
            if kind == 'rise' and idle > 0: y += 4 * math.sin(2 * math.pi * idle / 2.4 + x * 0.01 + y * 0.003)
        elif kind == 'bounce': y += int(-16 * abs(math.sin((te - t0) * 3.0)))
        if a < 1: l2 = l2.copy(); l2.putalpha(l2.getchannel('A').point(lambda v: int(v * a)))
        im.alpha_composite(l2, (int(x), int(y)))
    return im

# ---------------- new copy ----------------
def pick_new_sticker():
    w0, h0 = OLD['size']
    opts = [([('to join the waitlist', NAVYT)], [('$5,000+', ORANGE), (' in prizes', NAVYT)], 40),
            ([('to join the waitlist', NAVYT)], [('$5,000+', ORANGE), (' in prizes', NAVYT)], 36),
            ([('to join the waitlist', NAVYT)], [('$5,000+', ORANGE), (' prizes', NAVYT)], 40)]
    for l3, l4, fs in opts:
        P = sticker_parts(l3, l4, f3size=fs)
        if P['nat'][0] <= w0 and P['nat'][1] <= h0:
            return sticker_parts(l3, l4, size=(w0, h0), fill_a=255, f3size=fs), l3, l4
    raise SystemExit('no sticker copy fits ' + str(OLD['size']))

def new_endcard_layers():
    line_b = [('to join the waitlist for', NAVYT)]
    parts = [('$5,000+ ', ORANGE), ('in prizes', NAVYT)]
    for sz in (112, 104, 96, 90):
        if fu('Bold', sz).getlength(''.join(p for p, _ in parts)) <= 940: return ec_layers(line_b, parts, sz), sz
    return ec_layers(line_b, parts, 90), 90

# ---------------- video io ----------------
def probe(f):
    o = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-count_packets', '-show_entries', 'stream=nb_read_packets', '-show_entries', 'format=duration', '-of', 'json', f], capture_output=True, text=True).stdout
    j = json.loads(o); return int(j['streams'][0]['nb_read_packets']), float(j['format']['duration'])

def frames(f, crop=None):
    vf = ['-vf', f'crop={crop[2]}:{crop[3]}:{crop[0]}:{crop[1]}'] if crop else []
    w, h = (crop[2], crop[3]) if crop else (W, H)
    p = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', f] + vf + ['-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE, bufsize=w * h * 3 * 4)
    n = 0
    while True:
        b = p.stdout.read(w * h * 3)
        if len(b) < w * h * 3: break
        yield n, np.frombuffer(b, np.uint8).reshape(h, w, 3); n += 1
    p.wait()

# ---------------- detection ----------------
SR = (600, 330, 480, 520)   # sticker search region x, y, w, h (old CTA_POS was 878,585)
def detect(f):
    N, dur = probe(f)
    # 1) sticker: count pure-white pixels in the region per frame
    cnt = []; boxes = {}
    for n, fr in frames(f, SR):
        m = fr.min(axis=2) > 246; cnt.append(int(m.sum()))
        if n % 3 == 0: boxes[n] = m
    cnt = np.array(cnt); base = np.median(cnt[:max(10, int(2 * FPS))])
    over = np.where(cnt > base + 12000)[0]
    j = int(over[0]); t_cta0 = j / FPS - 0.25
    # 2) end card: first frame where the bottom strip is pure white
    bot = []
    for n, fr in frames(f, (0, 1840, W, 80)):
        bot.append(float((fr.min(axis=2) > 250).mean()))
    bot = np.array(bot); k = int(np.where(bot > 0.97)[0][0])
    return dict(N=N, dur=dur, base=float(base), j=j, t_cta0=t_cta0, k_bottom=k, cnt=cnt.tolist())

def panel_top(fr):
    """y of the end card's top edge (its blue colour bar, first quarter of the width), or None."""
    col = fr[:, 100].astype(int)
    m = (abs(col[:, 0] - 37) < 25) & (abs(col[:, 1] - 168) < 25) & (abs(col[:, 2] - 224) < 25)
    ys = np.where(m)[0]
    if len(ys) < 3: return None
    return int(ys.min())

def refine_total(f, k_bottom):
    tops = []
    lo = max(0, k_bottom - 6); hi = k_bottom + 40
    for n, fr in frames(f):
        if n < lo: continue
        if n > hi: break
        y = panel_top(fr)
        if y is not None and 20 < y < H - 20: tops.append((n, y))
    ests = []
    for n, y in tops:
        p = 1 - y / H
        if not (0.02 < p < 0.95): continue
        lo_, hi_ = 0.0, 1.0                                 # invert smoothstep
        for _ in range(60):
            mid = (lo_ + hi_) / 2
            if ease(mid) < p: lo_ = mid
            else: hi_ = mid
        ests.append(n / FPS - lo_ * 1.5)
    return float(np.median(ests)), tops, ests

def refine_sticker(f, t_cta0, guess=(878, 585)):
    """grid-search pos (and t_cta) by comparing the rendered OLD sticker with real frames inside the card."""
    want = {}
    for ts in (1.0, 1.6, 2.2, 3.1, 4.0):
        want[int(round((t_cta0 + ts) * FPS))] = None
    for ts in (0.27, 0.3, 0.34, 0.38, 0.42, 0.47):
        want[int(round((t_cta0 + ts) * FPS))] = None
    mx = max(want)
    for n, fr in frames(f):
        if n in want: want[n] = fr.astype(np.int16)
        if n >= mx: break
    def err(pos, tc, ns):
        e = 0; c = 0
        for n in ns:
            ts = n / FPS - tc
            im, geo = render_sticker(OLD, ts)
            a = np.asarray(im.getchannel('A'), np.float32) / 255; rgb = np.asarray(im.convert('RGB'), np.int16)
            x0, y0 = place(pos, geo)
            fr = want[n][y0:y0 + im.height, x0:x0 + im.width]
            if fr.shape[:2] != a.shape: return 1e9
            m = a > 0.99
            e += np.abs(fr[m] - rgb[m]).mean() if m.any() else 255; c += 1
        return e / c
    steady = sorted(n for n in want if n / FPS - t_cta0 > 0.9)
    best = (1e9, guess)
    for dx in range(-24, 25, 4):
        for dy in range(-24, 25, 4):
            p = (guess[0] + dx, guess[1] + dy); e = err(p, t_cta0, steady[:2])
            if e < best[0]: best = (e, p)
    g2 = best[1]
    for dx in range(-3, 4):
        for dy in range(-3, 4):
            p = (g2[0] + dx, g2[1] + dy); e = err(p, t_cta0, steady)
            if e < best[0]: best = (e, p)
    pos = best[1]; steady_err = best[0]
    entr = sorted(n for n in want if n / FPS - t_cta0 < 0.6)
    tb = (1e9, t_cta0)
    for df in range(-4, 5):
        tc = t_cta0 + df / FPS; e = err(pos, tc, [n for n in entr if n / FPS - tc >= 0.26])
        if e < tb[0]: tb = (e, tc)
    return pos, tb[1], steady_err, tb[0]

# ---------------- patch ----------------
def patch(f, out, P):
    NEW, l3, l4 = pick_new_sticker(); L, csz = new_endcard_layers()
    pos, t_cta, total = P['pos'], P['t_cta'], P['total']
    enc = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', '30000/1001', '-i', '-',
                            '-i', f, '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p',
                            '-c:a', 'copy', '-movflags', '+faststart', out], stdin=subprocess.PIPE)
    for n, fr in frames(f):
        t = n / FPS; ts = t - t_cta
        if ts >= -F1 * 1.01 and t < total + 1.6:
            sc = max(sticker_scale(ts - F1), sticker_scale(ts), sticker_scale(ts + F1)) if ts < 0.6 else None
            a = min(1, (ts + F1) / 0.125)
            im, geo = render_sticker(NEW, ts, scale=sc, alpha=a)
            fr = fr.copy(); x0, y0 = place(pos, geo)
            x1, y1 = max(0, x0), max(0, y0); x2, y2 = min(W, x0 + im.width), min(H, y0 + im.height)
            A = np.asarray(im, np.float32)[y1 - y0:y2 - y0, x1 - x0:x2 - x0]
            al = A[..., 3:4] / 255; reg = fr[y1:y2, x1:x2].astype(np.float32)
            fr[y1:y2, x1:x2] = np.clip(reg * (1 - al) + A[..., :3] * al + 0.5, 0, 255).astype(np.uint8)
        te = t - total
        if te >= -F1:
            y = min(int(H * (1 - ease(te / 1.5))), int(H * (1 - ease((te + F1) / 1.5)))) - 2
            if y < H:
                if not fr.flags.writeable: fr = fr.copy()
                pan = np.asarray(endcard(L, max(0, te)).convert('RGB'))
                y = max(0, y); fr[y:] = pan[:H - y]
        enc.stdin.write(np.ascontiguousarray(fr).tobytes())
    enc.stdin.close(); enc.wait()
    return dict(l3=''.join(p for p, _ in l3), l4=''.join(p for p, _ in l4), endcard_size=csz)

if __name__ == '__main__':
    f, out = sys.argv[1], sys.argv[2]
    D = detect(f)
    total, tops, ests = refine_total(f, D['k_bottom'])
    pos, t_cta, se, te_ = refine_sticker(f, D['t_cta0'])
    P = dict(file=os.path.basename(f), N=D['N'], dur=D['dur'], t_cta0=D['t_cta0'], t_cta=t_cta, pos=pos, sticker_err=se, entrance_err=te_,
             total=total, total_spread=float(np.ptp(ests)) if ests else None)
    print(json.dumps(P))
    if '--detect-only' in sys.argv: sys.exit(0)
    P.update(patch(f, out, P))
    json.dump(P, open(out + '.json', 'w'), indent=1); print('done', out)
