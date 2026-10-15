// flowerGarden.js — Type Garden's flower engine (stems, roses, leaves, curls, weave layers,
// boil jitter, cursor lean) ported to plain canvas for the Waving Portfolio hero.
// Draws in the poster's own SVG units onto two canvases: one BEHIND the letters
// (layer 0) and one IN FRONT of them (layer 1), so stems weave through the type.
//
// Usage (see the integration notes):
//   const garden = createGarden({ density: 1, boil: true });
//   garden.attach({ root, svg, back, front });   // refs objects ({current})
//   garden.setColors({ red, blue, line, vein });
//   garden.setLayout(cells, vbW, vbH);           // cells = layout.cells from the hero
//   garden.restart(startTimeMs);                  // (re)plant; births stagger from startTimeMs
//   garden.regrow(i); garden.setPointer(x, y);    // x,y = client px, or null
//   garden.start(); ... garden.destroy();

export function createGarden(opts = {}) {
  const density = opts.density ?? 1;
  let boil = opts.boil ?? true;
  let isStatic = !!opts.static;
  let cc = {
    red: '#e5262c', blue: '#1b6b4a', line: '#f6f4f0', vein: '#f6f4f0',
    // every rose picks one of these; leaves pick one of the greens
    palette: ['#FF5C8A', '#FF8A3D', '#FFC233', '#B45CFF', '#2DB8FF', '#14C8A8', '#FF6B5E', '#7C6CFF'],
    leaves: ['#2FBF71', '#1FA37A', '#7BC96F', '#16A085'],
  };
  const hx = (c) => { const x = c.replace('#', ''); return [0, 2, 4].map((i) => parseInt(x.slice(i, i + 2), 16)); };
  const mix = (a, b, t) => { const A = hx(a), B = hx(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); };

  // ---------- math ----------
  const h = (n) => { const x = Math.sin(n) * 43758.5453; return x - Math.floor(x); };
  const spr = (t, k = 7, w = 16) => (t <= 0 ? 0 : 1 - Math.exp(-t * k) * Math.cos(t * w));
  const eo = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3));
  const rng = (seed) => {
    let s = seed | 0;
    return () => {
      s = (s + 0x6D2B79F5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  const bez = (a, b, c, d, n) => {
    const P = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, u = 1 - t;
      P.push([
        u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
        u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1],
      ]);
    }
    return P;
  };
  const at = (P, u) => {
    const n = P.length;
    const i = Math.min(n - 2, Math.max(1, Math.round(u * (n - 1))));
    return [P[i], Math.atan2(P[i + 1][1] - P[i - 1][1], P[i + 1][0] - P[i - 1][0])];
  };
  const jit = (id, f, amp) => {
    if (!amp) return [0, 0, 0];
    return [
      (h(id * 1.37 + f * 7.13) * 2 - 1) * amp,
      (h(id * 2.71 + f * 3.11) * 2 - 1) * amp,
      (h(id * 5.3 + f * 1.7) * 2 - 1) * 0.035,
    ];
  };
  const path = (c, p, closed) => {
    const n = p.length;
    if (n < 2) return;
    const m = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    if (closed) {
      const s = m(p[n - 1], p[0]);
      c.moveTo(s[0], s[1]);
      for (let i = 0; i < n; i++) {
        const q = m(p[i], p[(i + 1) % n]);
        c.quadraticCurveTo(p[i][0], p[i][1], q[0], q[1]);
      }
      c.closePath();
    } else {
      c.moveTo(p[0][0], p[0][1]);
      for (let i = 1; i < n - 1; i++) {
        const q = m(p[i], p[i + 1]);
        c.quadraticCurveTo(p[i][0], p[i][1], q[0], q[1]);
      }
      c.lineTo(p[n - 1][0], p[n - 1][1]);
    }
  };
  const backend = (g) => ({
    fill: (p, col) => { g.beginPath(); path(g, p, true); g.fillStyle = col; g.fill(); },
    stroke: (p, col, w) => {
      g.beginPath(); path(g, p, false);
      g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; g.stroke();
    },
  });
  const vine = (base, dir, len, amp, waves, ph, bend, n) => {
    n = n || 40;
    const P = [[base[0], base[1]]], step = len / n;
    let x = base[0], y = base[1];
    for (let i = 1; i <= n; i++) {
      const u = i / n, a = dir + bend * u + amp * Math.sin(u * Math.PI * waves + ph) * Math.min(1, u * 3);
      x += Math.cos(a) * step; y += Math.sin(a) * step; P.push([x, y]);
    }
    return P;
  };
  const curl = (P, sign, rad) => {
    const n = P.length, e = P[n - 1], a = Math.atan2(e[1] - P[n - 2][1], e[0] - P[n - 2][0]);
    const c = [e[0] - Math.sin(a) * sign * rad, e[1] + Math.cos(a) * sign * rad];
    const a0 = Math.atan2(e[1] - c[1], e[0] - c[0]);
    for (let i = 1; i <= 14; i++) {
      const u = i / 14, t = a0 + sign * u * Math.PI * 1.6, rr = rad * (1 - 0.5 * u);
      P.push([c[0] + Math.cos(t) * rr, c[1] + Math.sin(t) * rr]);
    }
    return P;
  };
  // where the stem passes in front of / behind the letter
  const weave = (r, startLayer) => {
    const cuts = [], nc = 1 + Math.floor(r() * 3);
    for (let i = 0; i < nc; i++) cuts.push(0.15 + r() * 0.7);
    cuts.sort((a, b) => a - b);
    const segs = [];
    let u0 = 0, layer = startLayer;
    for (const c of cuts) {
      if (c <= u0) continue;
      segs.push({ u0, u1: c, layer });
      if (r() < 0.3) { const g = 0.02 + r() * 0.03; u0 = Math.min(0.98, c + g); } else u0 = c;
      layer = 1 - layer;
    }
    segs.push({ u0, u1: 1, layer });
    return segs;
  };
  const layerAt = (segs, u) => {
    for (const s of segs) if (u >= s.u0 && u <= s.u1) return s.layer;
    return segs[segs.length - 1].layer;
  };

  // ---------- growth (identical recipe to Type Garden) ----------
  const wordParams = (ws) => {
    const r = rng(ws * 7 + 13);
    return {
      roseP: 0.3 + r() * 0.3, leafy: (0.6 + r() * 0.8) * density, dens: density,
      lean: (r() - 0.5) * 0.6, big: 0.85 + r() * 0.45, curvy: 0.8 + r() * 0.6,
      bridgeP: Math.min(0.95, (0.45 + r() * 0.35) * density), w: 0.5,
    };
  };
  function grow(r, E, nid, p, o) {
    let tip = o.tip || (r() < p.roseP ? 'rose' : r() < 0.45 ? 'fan' : r() < 0.6 ? 'leaf' : 'curl');
    let P = o.pts || vine(o.base, o.dir, o.len, (0.35 + r() * 0.45) * p.curvy, 1 + r() * 1.6, r() * 6.28, (r() - 0.5) * 1.2, 40);
    if (tip === 'curl') P = curl(P, r() < 0.5 ? -1 : 1, 0.05 + r() * 0.05);
    const segs = weave(r, o.layer0 != null ? o.layer0 : (r() < 0.5 ? 0 : 1));
    const dur = Math.max(320, (o.len || 0.8) * 620);
    const thorns = [], nt = Math.floor(r() * 2.5);
    for (let i = 0; i < nt; i++) thorns.push({ u: 0.15 + r() * 0.65, s: r() < 0.5 ? -1 : 1 });
    E.push({ t: 'stem', id: nid(), pts: P, segs, d0: o.d0, dur, w: o.depth ? 0.82 : 1, thorns });
    const nl = Math.floor(r() * 2.8 * p.leafy);
    let sd = r() < 0.5 ? -1 : 1;
    for (let i = 0; i < nl; i++) {
      const u = 0.25 + r() * 0.6, [q, a] = at(P, u);
      sd = -sd;
      E.push({ t: 'leaf', ci: (r() * 1000) | 0, id: nid(), x: q[0], y: q[1], a: a + sd * (0.55 + r() * 0.5), L: (0.14 + r() * 0.2) * (o.depth ? 0.8 : 1), bend: (r() - 0.5) * 1.2, layer: layerAt(segs, u), d0: o.d0 + dur * u });
    }
    const [tp, ta] = at(P, 1), td = o.d0 + dur * 0.8, tl = layerAt(segs, 1);
    // a rose sitting over the letter body goes behind it (roses are a soft tint so the red letter still reads)
    const over = tp[1] > -(p.cap + 0.04) && tp[1] < 0.06 && Math.abs(tp[0]) < p.w * 0.5 + 0.06;
    if (tip === 'rose') {
      const R = (0.13 + r() * 0.15) * p.big * (o.depth ? 0.75 : 1);
      const layer = over ? (r() < 0.1 ? 1 : 0) : (r() < 0.6 ? 1 : tl);
      E.push({ t: 'rose', ci: (r() * 1000) | 0, id: nid(), x: tp[0], y: tp[1], R, rot: (r() - 0.5) * 1.0, ph1: r() * 6.28, ph2: r() * 6.28, turns: 1.8 + r() * 1, layer, d0: td });
      if (r() < 0.2) {
        const oo = ta + (r() < 0.5 ? 1 : -1) * 1.3;
        E.push({ t: 'rose', ci: (r() * 1000) | 0, id: nid(), x: tp[0] + Math.cos(oo) * R * 1.4, y: tp[1] + Math.sin(oo) * R * 1.4, R: R * (0.6 + r() * 0.3), rot: (r() - 0.5) * 1.2, ph1: r() * 6.28, ph2: r() * 6.28, turns: 1.8 + r(), layer, d0: td + 120 });
      }
    } else if (tip === 'fan') {
      const spread = 0.6 + r() * 0.3;
      for (let j = 0; j < 2; j++) E.push({ t: 'leaf', ci: (r() * 1000) | 0, id: nid(), x: tp[0], y: tp[1], a: ta + (j - 0.5) * spread, L: 0.2 + r() * 0.2, bend: (j - 0.5) * 0.8, layer: tl, d0: td + j * 60 });
    } else if (tip === 'leaf') {
      E.push({ t: 'leaf', ci: (r() * 1000) | 0, id: nid(), x: tp[0], y: tp[1], a: ta + (r() - 0.5) * 0.3, L: 0.16 + r() * 0.16, bend: (r() - 0.5), layer: tl, d0: td });
    }
    if (!o.depth && r() < 0.3) {
      const u = 0.35 + r() * 0.35, [q, a] = at(P, u);
      grow(r, E, nid, p, { base: q, dir: a + (r() < 0.5 ? -1 : 1) * (0.7 + r() * 0.4), len: (o.len || 0.8) * (0.35 + r() * 0.2), d0: o.d0 + dur * u, depth: 1, layer0: layerAt(segs, u) });
    }
    return P;
  }
  // grows the elements of one letter; coordinates are in units of S, origin at the letter's baseline centre
  function gen(l, seed) {
    const r = rng((l.ws ^ Math.imul(l.wi + 1, 2654435761)) + seed);
    const p = wordParams(l.ws), E = [];
    let k0 = 0;
    const nid = () => l.id * 100 + (k0++);
    const w = l.w, inX = () => (r() - 0.5) * w * 0.7;
    p.w = w; p.cap = l.cap;
    const nUp = 1 + (r() < 0.45 * p.dens ? 1 : 0);
    for (let i = 0; i < nUp; i++) {
      grow(r, E, nid, p, { base: [inX(), -r() * 0.3], dir: -Math.PI / 2 + p.lean * 0.5 + (r() - 0.5) * 0.7, len: 0.6 + r() * 0.55, d0: 40 + i * 130, tip: l.wi === 0 && i === 0 ? 'rose' : null });
    }
    if (r() < 0.15 * p.dens) grow(r, E, nid, p, { base: [inX(), -0.1 - r() * 0.35], dir: Math.PI / 2 + (r() - 0.5) * 0.8, len: 0.35 + r() * 0.35, d0: 160 });
    if (l.prevDx != null && r() < p.bridgeP) {
      const px = -l.prevDx;
      const a = [inX(), -0.05 - r() * 0.55], b = [px + (r() - 0.5) * 0.25, -0.05 - r() * 0.55];
      const bulge = (r() < 0.55 ? -1 : 1) * (0.4 + r() * 0.4), dx = b[0] - a[0];
      let P = bez(a, [a[0] + dx * 0.15, a[1] + bulge], [b[0] - dx * 0.15, b[1] + bulge * 0.9], b, 40);
      if (r() < 0.45) P = P.slice(0, Math.floor(P.length * (0.7 + r() * 0.2)));
      grow(r, E, nid, p, { pts: P, len: Math.abs(dx) + Math.abs(bulge), d0: 90, tip: r() < 0.5 ? 'curl' : r() < 0.5 ? 'leaf' : 'rose' });
    }
    if (l.wi === 0) grow(r, E, nid, p, { base: [-w * 0.3, -0.15 - r() * 0.4], dir: Math.PI + (r() - 0.5) * 1.2, len: 0.45 + r() * 0.3, d0: 120, tip: 'curl' });
    return E;
  }

  // ---------- drawing ----------
  function strokeRange(B, P, a, b, col, w) {
    const n = P.length - 1, ia = a * n, ib = b * n;
    const lerp = (t) => {
      const i = Math.min(n - 1, Math.floor(t)), f = t - i;
      return [P[i][0] + (P[i + 1][0] - P[i][0]) * f, P[i][1] + (P[i + 1][1] - P[i][1]) * f];
    };
    const pts = [lerp(ia)];
    for (let i = Math.floor(ia) + 1; i < ib; i++) pts.push(P[i]);
    pts.push(lerp(ib));
    if (pts.length >= 2) B.stroke(pts, col, w);
  }
  function thorn(B, P, u, s, S) {
    const [p, a] = at(P, u), d = a + s * 2.3, L = S * 0.045;
    B.stroke([p, [p[0] + Math.cos(d) * L, p[1] + Math.sin(d) * L]], cc.blue, S * 0.022);
  }
  function leaf(B, bx, by, a, L, bend, col) {
    if (L < 0.5) return;
    const ca = Math.cos(a), sa = Math.sin(a), px = -sa, py = ca;
    const ax = (u) => { const b = Math.sin(Math.PI * u) * bend * 0.15 * L; return [bx + ca * u * L + px * b, by + sa * u * L + py * b]; };
    const hw = (u) => L * 0.18 * Math.sin(Math.PI * Math.pow(u, 0.8));
    const N = 12, s1 = [], s2 = [];
    for (let i = 0; i <= N; i++) { const u = i / N, c = ax(u), w = hw(u); s1.push([c[0] + px * w, c[1] + py * w]); s2.push([c[0] - px * w, c[1] - py * w]); }
    const tip = ax(1), base = ax(0);
    B.fill([base, ...s1.slice(1, N), tip, tip, ...s2.slice(1, N).reverse(), base], col || cc.blue);
    if (L > 6) { const v = []; for (let i = 0; i <= 8; i++) v.push(ax(0.08 + 0.72 * i / 8)); B.stroke(v, cc.vein, Math.max(0.8, L * 0.03)); }
  }
  function rose(B, cx, cy, R, rot, e, a, tl) {
    const cr = Math.cos(rot), sr = Math.sin(rot);
    const tm = tl ? Math.hypot(tl[0], tl[1]) : 0, ux = tm ? tl[0] / tm : 0, uy = tm ? tl[1] / tm : 0, sq = -0.28 * tm;
    const T = (x, y, z = 0) => {
      let dx = x * cr - y * sr, dy = x * sr + y * cr;
      if (tm) { const k = (dx * ux + dy * uy) * sq; dx += k * ux + tl[0] * R * z; dy += k * uy + tl[1] * R * z; }
      return [cx + dx, cy + dy];
    };
    // petals, back to front: [cx, cy, rx, ry, angle, depth, edge]
    const P = [
      [0, -0.36, 0.56, 0.54, 0, 0, 0],
      [-0.5, -0.06, 0.6, 0.6, -0.35, 0, 0],
      [0.52, -0.06, 0.6, 0.6, 0.35, 0, 0],
      [-0.42, 0.3, 0.62, 0.48, 0.2, 0.12, 1],
      [0.47, 0.3, 0.62, 0.48, -0.2, 0.12, 1],
      [0.05, 0.42, 0.56, 0.38, 0, 0.14, 0],
    ];
    const base = cc.palette[e.ci % cc.palette.length];
    const petal = (i) => (i < 3 ? mix(base, '#000000', 0.14) : i === 5 ? mix(base, '#ffffff', 0.18) : base);
    const ink = mix(base, '#3a0a1c', 0.55);
    const ax0 = 0, ay0 = 0.5, lw = Math.max(0.8, R * 0.045), st = 85;
    P.forEach((q, i) => {
      const s = spr((a - i * st) / 1000, 8, 14);
      if (s <= 0.001) return;
      const open = (1 - Math.min(1, s)) * (q[0] < 0 ? 0.5 : -0.5), ang = q[4] + open, ca = Math.cos(ang), sa = Math.sin(ang);
      const pt = (th) => {
        const rr = 1 + 0.08 * Math.sin(3 * th + e.ph1 + i) + 0.04 * Math.sin(5 * th + e.ph2);
        const lx = Math.cos(th) * q[2] * rr, ly = Math.sin(th) * q[3] * rr;
        const px = q[0] + lx * ca - ly * sa, py = q[1] + lx * sa + ly * ca;
        return T((ax0 + (px - ax0) * s) * R, (ay0 + (py - ay0) * s) * R, q[5]);
      };
      const pts = [];
      for (let k = 0; k < 26; k++) pts.push(pt(k / 26 * Math.PI * 2));
      B.fill(pts, petal(i));
      if (q[6] && R >= 12 && s > 0.4) {
        const arc = [];
        for (let k = 0; k <= 14; k++) arc.push(pt(Math.PI * (1.18 + 0.64 * k / 14)));
        strokeRange(B, arc, 0, Math.min(1, (s - 0.4) / 0.5), ink, lw * 0.8);
      }
    });
    const fr = eo((a - P.length * st - 80) / 520);
    if (fr > 0 && R > 3) {
      const sp = [], scl = [];
      const turns = R < 20 ? Math.min(e.turns, 1.3) : R < 32 ? e.turns * 0.8 : e.turns;
      for (let i = 0; i <= 70; i++) {
        const u = i / 70, th = e.ph1 + u * turns * Math.PI * 2, rr = R * (0.08 + 0.57 * u);
        sp.push(T(Math.cos(th) * rr * 1.05, Math.sin(th) * rr * 0.72 - 0.12 * R, 0.34 - 0.24 * u));
      }
      strokeRange(B, sp, 0, fr, ink, lw);
      if (R >= 14) {
        for (let i = 0; i <= 36; i++) { const u = i / 36; scl.push(T((-0.72 + 1.5 * u) * R, 0.36 * R + 0.16 * R * Math.abs(Math.sin(u * Math.PI * 3)), 0.18)); }
        strokeRange(B, scl, 0, fr, ink, lw);
      }
    }
  }

  // ---------- state ----------
  let refs = null, cells = [], vbW = 1, vbH = 1, compact = false;
  const sfOf = (c) => (c.giant ? (compact ? 0.4 : 0.5) : (compact ? 0.52 : 0.7));
  let sessionSeed = (Math.random() * 1e9) | 0;
  let ptr = null;            // pointer in client px
  let raf = 0, lastNow = 0, startAt = 0, planted = false;
  const fa = {};             // per-rose face-turn smoothing
  const map = { k: 1, ox: 0, oy: 0, pw: 0, ph: 0 };

  const cellSeed = (i, n) => sessionSeed + i * 131 + n * 7919;
  function buildCell(c, i, prevCell, ws) {
    const S = (c.h / 0.72) * sfOf(c);
    const L = {
      ch: c.ch, id: i + 1, S, cap: c.h / S, cx: c.x + c.w / 2, base: c.y + c.h - c.s * 0.5, w: c.w / S,
      ws, wi: prevCell ? prevCell.wi + 1 : 0, prevDx: prevCell ? (c.x + c.w / 2 - prevCell.cx) / S : null,
      n: 0, lean: [0, 0], birth: 0, els: [], row: c.row, giant: !!c.giant, order: 0,
    };
    L.els = gen(L, cellSeed(i, 0));
    return L;
  }
  function layoutCells(src) {
    // chain neighbours in the same row (R-T, L-I-O ...) into one "word": they share params and bridge stems
    const out = [];
    src.forEach((c, i) => {
      let prev = null;
      if (!c.giant) {
        for (let j = out.length - 1; j >= 0; j--) {
          const q = src[j];
          if (q.giant || q.row !== c.row) continue;
          const gap = c.x - (q.x + q.w);
          if (gap >= 0 && gap < Math.max(c.w, q.w) * 0.6) prev = out[j];
          break;
        }
      }
      const ws = prev ? prev.ws : Math.floor(rng(cellSeed(i, 1))() * 1e9);
      out.push(buildCell(c, i, prev, ws));
    });
    return out;
  }
  function stagger(c, i) {
    // left-to-right wipe, row by row, the giant letter blooms a touch later
    return (c.cx / vbW) * 700 + c.row * 140 + (c.giant ? 260 : 0) + i * 30;
  }

  const api = {
    attach(r) { refs = r; },
    setColors(c) { cc = { ...cc, ...c }; },
    setBoil(v) { boil = v; },
    setStatic(v) { isStatic = !!v; },
    setLayout(src, w, hh) {
      vbW = w; vbH = hh; compact = hh > w;
      const same = planted && src.length === cells.length && src.every((c, i) => c.ch === cells[i].ch && !!c.giant === cells[i].giant);
      if (same) {
        // geometry only (resize / compact toggle) — keep the same flowers
        src.forEach((c, i) => {
          const L = cells[i], S = (c.h / 0.72) * sfOf(c);
          L.S = S; L.cap = c.h / S; L.cx = c.x + c.w / 2; L.base = c.y + c.h - c.s * 0.5; L.row = c.row;
        });
      } else {
        const births = cells.map((c) => c.birth);
        cells = layoutCells(src);
        cells.forEach((c, i) => { c.birth = births[i] != null && planted ? births[i] : startAt + stagger(c, i); });
        planted = true;
      }
      cells._src = src;
    },
    // (re)plant a fresh garden; roses/stems start growing from `start` (ms, performance.now clock)
    restart(start, fresh = true) {
      if (fresh) sessionSeed = (Math.random() * 1e9) | 0;
      startAt = start;
      const src = cells._src || [];
      cells = layoutCells(src);
      cells._src = src;
      cells.forEach((c, i) => { c.birth = start + stagger(c, i); });
      planted = true;
    },
    regrow(i, now = performance.now()) {
      const L = cells[i];
      if (!L) return;
      L.n++;
      L.els = gen(L, cellSeed(i, L.n * 3 + 1));
      L.birth = now + 80;
    },
    setPointer(x, y) { ptr = x == null ? null : [x, y]; },
    start() {
      cancelAnimationFrame(raf);
      const loop = () => { raf = requestAnimationFrame(loop); api.frame(performance.now()); };
      loop();
    },
    destroy() { cancelAnimationFrame(raf); },
    frame(now) {
      if (!refs) return;
      const root = refs.root.current, svg = refs.svg.current, back = refs.back.current, front = refs.front.current;
      if (!root || !svg || !back || !front || !cells.length) return;
      const dt = Math.min(64, now - (lastNow || now)); lastNow = now;
      const q = root.getBoundingClientRect(), r = svg.getBoundingClientRect();
      if (!q.width || !q.height || !r.width) return;
      const d = Math.min(2, window.devicePixelRatio || 1);
      const pw = Math.round(q.width * d), ph = Math.round(q.height * d);
      for (const cv of [back, front]) { if (cv.width !== pw || cv.height !== ph) { cv.width = pw; cv.height = ph; } }
      const k = Math.min(r.width / vbW, r.height / vbH);
      const ox = r.left - q.left + (r.width - vbW * k) / 2, oy = r.top - q.top + (r.height - vbH * k) / 2;
      Object.assign(map, { k, ox, oy });
      const P = ptr ? [(ptr[0] - q.left - ox) / k, (ptr[1] - q.top - oy) / k] : null;

      const kLean = 1 - Math.exp(-dt / 80);
      const frameN = boil && !isStatic ? Math.floor(now / 120) : 0;
      const ctxs = [back, front].map((cv) => {
        const g = cv.getContext('2d');
        g.setTransform(1, 0, 0, 1, 0, 0);
        g.clearRect(0, 0, cv.width, cv.height);
        g.setTransform(d * k, 0, 0, d * k, d * ox, d * oy);
        return g;
      });

      for (const L of cells) {
        // lean toward the pointer (Type Garden's near-pointer attraction)
        let tx = 0, ty = 0;
        if (P) {
          const dx = P[0] - L.cx, dy = P[1] - (L.base - L.S * 0.6), dd = Math.hypot(dx, dy), reach = Math.max(260, L.S * 3.2);
          if (dd < reach && dd > 1) { const w = 1 - dd / reach, s = w * w * (3 - 2 * w); tx = (dx / dd) * s; ty = (dy / dd) * s; }
        }
        L.lean[0] += (tx - L.lean[0]) * 0.07; L.lean[1] += (ty - L.lean[1]) * 0.07;
      }

      for (let layer = 0; layer < 2; layer++) {
        const B = backend(ctxs[layer]);
        for (const L of cells) {
          const age = isStatic ? 1e6 : now - L.birth;
          if (age < 0) continue;
          const jamp = boil && !isStatic ? Math.max(0.8, L.S * 0.01) : 0;
          const warp = (x, y) => {
            const t = isStatic ? 99 : (now - L.birth) / 1000;
            if (t > 0 && t < 2.5) {
              const hh = Math.max(0, (L.base - y) / L.S), dmp = Math.exp(-t * 3.2), dir = L.id % 2 ? 1 : -1;
              x += L.S * 0.07 * hh * dmp * Math.sin(t * 11) * dir;
              y += L.S * 0.035 * hh * dmp * Math.sin(t * 11 + 1.2);
            }
            const hh = Math.min(2.5, Math.max(0, (L.base - y) / L.S)), f = hh * hh * 0.5 + hh * 0.5;
            x += L.lean[0] * L.S * 0.1 * f;
            y += L.lean[1] * L.S * 0.05 * f;
            return [x, y];
          };
          for (const e of L.els) {
            const j = jit(e.id, frameN, jamp);
            const wx = (x, y) => warp(L.cx + x * L.S + j[0], L.base + y * L.S + j[1]);
            if (e.t === 'stem') {
              const fr = eo((age - e.d0) / e.dur);
              if (fr <= 0) continue;
              const Pp = e.pts.map((p) => wx(p[0], p[1]));
              for (const sg of e.segs) {
                if (sg.layer !== layer) continue;
                const b = Math.min(sg.u1, fr);
                if (b <= sg.u0) continue;
                strokeRange(B, Pp, sg.u0, b, cc.blue, L.S * 0.022 * (e.w || 1));
              }
              for (const th of e.thorns) if (fr > th.u && layerAt(e.segs, th.u) === layer) thorn(B, Pp, th.u, th.s, L.S);
            } else if (e.layer === layer) {
              if (e.t === 'leaf') {
                const sc = spr((age - e.d0) / 1000, 7, 15);
                if (sc <= 0) continue;
                const p = wx(e.x, e.y);
                leaf(B, p[0], p[1], e.a + j[2], e.L * L.S * sc, e.bend, cc.leaves[e.ci % cc.leaves.length]);
              } else if (e.t === 'rose') {
                const a = age - e.d0;
                if (a < 0) continue;
                const p = wx(e.x, e.y);
                // face-turn: rose petals shift toward the pointer
                let wx2 = 0, wy2 = 0;
                if (P) {
                  const dx = P[0] - p[0], dy = P[1] - p[1], dd = Math.hypot(dx, dy), reach = 300;
                  if (dd < reach && dd > 0.001) { const w = 1 - dd / reach, s = w * w * (3 - 2 * w) * Math.min(1, dd / 40); wx2 = (dx / dd) * s; wy2 = (dy / dd) * s; }
                }
                const c = fa[e.id] || (fa[e.id] = [0, 0]);
                c[0] += (wx2 - c[0]) * 0.09; c[1] += (wy2 - c[1]) * 0.09;
                rose(B, p[0], p[1], e.R * L.S, e.rot + j[2] + c[0] * 0.22, e, a, c);
              }
            }
          }
        }
      }
    },
  };
  return api;
}