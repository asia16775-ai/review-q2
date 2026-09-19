/* qr.js — ตัวสร้าง QR code ขนาดเล็ก ทำงานในเครื่อง ไม่ต้องต่อเน็ต ไม่ต้องโหลดไลบรารีข้างนอก
   โหมด byte · ระดับกันพลาด M (กู้ได้ ~15%) · เวอร์ชัน 1–20
   ใช้:  QR.svg('ข้อความ', {scale:6, margin:4})  →  คืนสตริง <svg>...</svg>  */
(function (w) {
  'use strict';

  /* ── ตารางมาตรฐาน QR (index = เวอร์ชัน 1–40) ───────────────────────── */
  var ECC_CW = {
    L: [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28,
        28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    M: [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26,
        26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28]
  };
  var ECC_NB = {
    L: [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8,
        8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
    M: [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16,
        17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49]
  };
  var ECL_BITS = { L: 1, M: 0, Q: 3, H: 2 };

  /* ── คณิตศาสตร์ Galois Field (สำหรับรหัสกันพลาด Reed–Solomon) ───────── */
  function gfMul(x, y) {
    var z = 0;
    for (var i = 7; i >= 0; i--) {
      z = (z << 1) ^ ((z >>> 7) * 0x11D);
      z ^= ((y >>> i) & 1) * x;
    }
    return z & 0xFF;
  }

  function rsDivisor(deg) {
    var res = [], i, j;
    for (i = 0; i < deg - 1; i++) res.push(0);
    res.push(1);
    var root = 1;
    for (i = 0; i < deg; i++) {
      for (j = 0; j < deg; j++) {
        res[j] = gfMul(res[j], root);
        if (j + 1 < deg) res[j] ^= res[j + 1];
      }
      root = gfMul(root, 0x02);
    }
    return res;
  }

  function rsRemainder(data, divisor) {
    var res = [], i, j;
    for (i = 0; i < divisor.length; i++) res.push(0);
    for (i = 0; i < data.length; i++) {
      var factor = data[i] ^ res.shift();
      res.push(0);
      for (j = 0; j < divisor.length; j++) res[j] ^= gfMul(divisor[j], factor);
    }
    return res;
  }

  /* ── ความจุของแต่ละเวอร์ชัน ──────────────────────────────────────── */
  function rawModules(v) {
    var r = (16 * v + 128) * v + 64;
    if (v >= 2) {
      var n = Math.floor(v / 7) + 2;
      r -= (25 * n - 10) * n - 55;
      if (v >= 7) r -= 36;
    }
    return r;
  }
  function rawCodewords(v) { return Math.floor(rawModules(v) / 8); }
  function dataCodewords(v, ecl) {
    return rawCodewords(v) - ECC_CW[ecl][v] * ECC_NB[ecl][v];
  }

  function alignPositions(v) {
    if (v === 1) return [];
    var n = Math.floor(v / 7) + 2;
    var step = (v === 32) ? 26 : Math.ceil((v * 4 + 4) / (n * 2 - 2)) * 2;
    var res = [6];
    for (var pos = v * 4 + 10; res.length < n; pos -= step) res.splice(1, 0, pos);
    return res;
  }

  function toUtf8(s) {
    var str, out = [], i;
    try { str = unescape(encodeURIComponent(s)); }
    catch (e) { str = s; }
    for (i = 0; i < str.length; i++) out.push(str.charCodeAt(i) & 0xFF);
    return out;
  }

  function getBit(x, i) { return ((x >>> i) & 1) !== 0; }

  /* ── สร้างตารางจุด ─────────────────────────────────────────────── */
  function matrix(text, ecl) {
    ecl = ecl || 'M';
    var bytes = toUtf8(text), ver, i, j, x, y;

    for (ver = 1; ver <= 40; ver++) {
      var ccBits = (ver <= 9) ? 8 : 16;
      if (4 + ccBits + bytes.length * 8 <= dataCodewords(ver, ecl) * 8) break;
    }
    if (ver > 40) throw new Error('ข้อมูลยาวเกินไปสำหรับ QR');

    /* --- บิตของข้อมูล --- */
    var bb = [];
    function push(val, len) { for (var k = len - 1; k >= 0; k--) bb.push((val >>> k) & 1); }
    push(4, 4);
    push(bytes.length, ver <= 9 ? 8 : 16);
    for (i = 0; i < bytes.length; i++) push(bytes[i], 8);

    var capBits = dataCodewords(ver, ecl) * 8;
    push(0, Math.min(4, capBits - bb.length));
    push(0, (8 - bb.length % 8) % 8);
    for (var pad = 0xEC; bb.length < capBits; pad ^= 0xEC ^ 0x11) push(pad, 8);

    var dataCw = [];
    for (i = 0; i < bb.length; i += 8) {
      var v8 = 0;
      for (j = 0; j < 8; j++) v8 = (v8 << 1) | bb[i + j];
      dataCw.push(v8);
    }

    /* --- แบ่งบล็อก + ใส่รหัสกันพลาด + สลับเรียง --- */
    var numBlocks = ECC_NB[ecl][ver], eccLen = ECC_CW[ecl][ver];
    var rawCw = rawCodewords(ver);
    var numShort = numBlocks - rawCw % numBlocks;
    var shortLen = Math.floor(rawCw / numBlocks);
    var div = rsDivisor(eccLen), blocks = [], k = 0;
    for (i = 0; i < numBlocks; i++) {
      var take = shortLen - eccLen + (i < numShort ? 0 : 1);
      var dat = dataCw.slice(k, k + take);
      k += take;
      var ecc = rsRemainder(dat, div);
      if (i < numShort) dat = dat.concat([0]);      /* เติมช่องว่างให้ทุกบล็อกยาวเท่ากัน */
      blocks.push(dat.concat(ecc));
    }
    var allCw = [];
    for (i = 0; i < blocks[0].length; i++) {
      for (j = 0; j < numBlocks; j++) {
        if (i !== shortLen - eccLen || j >= numShort) allCw.push(blocks[j][i]);
      }
    }

    /* --- เตรียมตาราง --- */
    var size = ver * 4 + 17;
    var mod = [], fn = [];
    for (y = 0; y < size; y++) {
      mod.push(new Array(size));
      fn.push(new Array(size));
      for (x = 0; x < size; x++) { mod[y][x] = false; fn[y][x] = false; }
    }
    function setFn(cx, cy, dark) {
      if (cx < 0 || cy < 0 || cx >= size || cy >= size) return;
      mod[cy][cx] = dark; fn[cy][cx] = true;
    }

    /* เส้นจังหวะ */
    for (i = 0; i < size; i++) { setFn(6, i, i % 2 === 0); setFn(i, 6, i % 2 === 0); }

    /* สี่เหลี่ยมมุม 3 มุม */
    function finder(cx, cy) {
      for (var dy = -4; dy <= 4; dy++) {
        for (var dx = -4; dx <= 4; dx++) {
          var dist = Math.max(Math.abs(dx), Math.abs(dy));
          setFn(cx + dx, cy + dy, dist !== 2 && dist !== 4);
        }
      }
    }
    finder(3, 3); finder(size - 4, 3); finder(3, size - 4);

    /* จุดปรับตำแหน่ง */
    var ap = alignPositions(ver);
    for (i = 0; i < ap.length; i++) {
      for (j = 0; j < ap.length; j++) {
        if ((i === 0 && j === 0) || (i === 0 && j === ap.length - 1) ||
            (i === ap.length - 1 && j === 0)) continue;
        for (var ay = -2; ay <= 2; ay++) {
          for (var ax = -2; ax <= 2; ax++) {
            setFn(ap[j] + ax, ap[i] + ay, Math.max(Math.abs(ax), Math.abs(ay)) !== 1);
          }
        }
      }
    }

    /* ข้อมูลเวอร์ชัน (v7 ขึ้นไป) */
    if (ver >= 7) {
      var rem = ver;
      for (i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1F25);
      var vbits = (ver << 12) | rem;
      for (i = 0; i < 18; i++) {
        var bit = getBit(vbits, i), a = size - 11 + i % 3, b = Math.floor(i / 3);
        setFn(a, b, bit); setFn(b, a, bit);
      }
    }

    function drawFormat(mask) {
      var d = (ECL_BITS[ecl] << 3) | mask, r = d, n;
      for (n = 0; n < 10; n++) r = (r << 1) ^ ((r >>> 9) * 0x537);
      var bits = ((d << 10) | r) ^ 0x5412;
      for (n = 0; n <= 5; n++) setFn(8, n, getBit(bits, n));
      setFn(8, 7, getBit(bits, 6));
      setFn(8, 8, getBit(bits, 7));
      setFn(7, 8, getBit(bits, 8));
      for (n = 9; n < 15; n++) setFn(14 - n, 8, getBit(bits, n));
      for (n = 0; n < 8; n++) setFn(size - 1 - n, 8, getBit(bits, n));
      for (n = 8; n < 15; n++) setFn(8, size - 15 + n, getBit(bits, n));
      setFn(8, size - 8, true);                     /* จุดดำถาวร */
    }
    drawFormat(0);

    /* --- วางข้อมูลแบบซิกแซก --- */
    var bi = 0;
    for (var right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (var vert = 0; vert < size; vert++) {
        for (j = 0; j < 2; j++) {
          var cx = right - j;
          var upward = ((right + 1) & 2) === 0;
          var cy = upward ? size - 1 - vert : vert;
          if (!fn[cy][cx] && bi < allCw.length * 8) {
            mod[cy][cx] = getBit(allCw[bi >>> 3], 7 - (bi & 7));
            bi++;
          }
        }
      }
    }

    /* --- ลองมาสก์ทั้ง 8 แบบ เลือกอันที่อ่านง่ายที่สุด --- */
    function maskOn(m) {
      for (var yy = 0; yy < size; yy++) {
        for (var xx = 0; xx < size; xx++) {
          if (fn[yy][xx]) continue;
          var inv;
          switch (m) {
            case 0: inv = (xx + yy) % 2 === 0; break;
            case 1: inv = yy % 2 === 0; break;
            case 2: inv = xx % 3 === 0; break;
            case 3: inv = (xx + yy) % 3 === 0; break;
            case 4: inv = (Math.floor(xx / 3) + Math.floor(yy / 2)) % 2 === 0; break;
            case 5: inv = (xx * yy) % 2 + (xx * yy) % 3 === 0; break;
            case 6: inv = ((xx * yy) % 2 + (xx * yy) % 3) % 2 === 0; break;
            default: inv = ((xx + yy) % 2 + (xx * yy) % 3) % 2 === 0;
          }
          if (inv) mod[yy][xx] = !mod[yy][xx];
        }
      }
    }

    function penalty() {
      var p = 0, xx, yy, run, col, dark = 0;
      /* กฎ 1 — เรียงสีเดียวกัน 5 ช่องขึ้นไป */
      for (yy = 0; yy < size; yy++) {
        run = 1;
        for (xx = 1; xx < size; xx++) {
          if (mod[yy][xx] === mod[yy][xx - 1]) { run++; if (run === 5) p += 3; else if (run > 5) p++; }
          else run = 1;
        }
      }
      for (xx = 0; xx < size; xx++) {
        run = 1;
        for (yy = 1; yy < size; yy++) {
          if (mod[yy][xx] === mod[yy - 1][xx]) { run++; if (run === 5) p += 3; else if (run > 5) p++; }
          else run = 1;
        }
      }
      /* กฎ 2 — สี่เหลี่ยม 2x2 สีเดียวกัน */
      for (yy = 0; yy < size - 1; yy++) {
        for (xx = 0; xx < size - 1; xx++) {
          col = mod[yy][xx];
          if (col === mod[yy][xx + 1] && col === mod[yy + 1][xx] && col === mod[yy + 1][xx + 1]) p += 3;
        }
      }
      /* กฎ 3 — ลวดลายที่ชนกับสี่เหลี่ยมมุม */
      var PA = [true, false, true, true, true, false, true, false, false, false, false];
      var PB = [false, false, false, false, true, false, true, true, true, false, true];
      function match(get, n) {
        var c = 0, s, t;
        for (s = 0; s + 11 <= n; s++) {
          var a = true, b = true;
          for (t = 0; t < 11; t++) {
            var g = get(s + t);
            if (g !== PA[t]) a = false;
            if (g !== PB[t]) b = false;
          }
          if (a) c++;
          if (b) c++;
        }
        return c;
      }
      for (yy = 0; yy < size; yy++) {
        (function (r) { p += 40 * match(function (i2) { return mod[r][i2]; }, size); })(yy);
      }
      for (xx = 0; xx < size; xx++) {
        (function (c2) { p += 40 * match(function (i2) { return mod[i2][c2]; }, size); })(xx);
      }
      /* กฎ 4 — สัดส่วนสีดำต่างจากครึ่งหนึ่งมากไป */
      for (yy = 0; yy < size; yy++) for (xx = 0; xx < size; xx++) if (mod[yy][xx]) dark++;
      var total = size * size;
      var kk = Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1;
      p += Math.max(kk, 0) * 10;
      return p;
    }

    var best = -1, bestP = Infinity;
    for (var m = 0; m < 8; m++) {
      maskOn(m); drawFormat(m);
      var pen = penalty();
      if (pen < bestP) { bestP = pen; best = m; }
      maskOn(m);                                    /* ย้อนกลับ (XOR ซ้ำ) */
    }
    maskOn(best); drawFormat(best);

    return { size: size, version: ver, mask: best, modules: mod };
  }

  /* ── ออกมาเป็น SVG ──────────────────────────────────────────────── */
  function svg(text, opts) {
    opts = opts || {};
    var ecl = opts.ecl || 'M';
    var scale = opts.scale || 6;
    var margin = (opts.margin === undefined) ? 4 : opts.margin;
    var dark = opts.dark || '#101820';
    var light = opts.light || '#ffffff';

    var qr = matrix(text, ecl);
    var n = qr.size, dim = (n + margin * 2) * scale;
    var path = [];
    for (var y = 0; y < n; y++) {
      var x = 0;
      while (x < n) {
        if (!qr.modules[y][x]) { x++; continue; }
        var run = 0;
        while (x + run < n && qr.modules[y][x + run]) run++;
        path.push('M' + (x + margin) + ' ' + (y + margin) + 'h' + run + 'v1h-' + run + 'z');
        x += run;
      }
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + (n + margin * 2) +
      ' ' + (n + margin * 2) + '" width="' + dim + '" height="' + dim +
      '" shape-rendering="crispEdges" role="img" aria-label="QR code สำหรับส่งผลให้ครู">' +
      '<rect width="100%" height="100%" fill="' + light + '"/>' +
      '<path fill="' + dark + '" d="' + path.join('') + '"/></svg>';
  }

  w.QR = { matrix: matrix, svg: svg, capacity: dataCodewords };
})(window);
