/* ============================================================
   figures.js — รูปประกอบข้อสอบ วาดด้วย SVG ทั้งหมด
   วาดใหม่ให้คมชัด แต่ยึดตามรูปในข้อสอบจริงทุกจุด
   ============================================================ */
(function (w) {
  'use strict';

  var NAVY = '#1d2b3a', BLUE = '#3b5bdb', RED = '#e0364f',
      GREEN = '#17a05e', ORANGE = '#f08c1a', GREY = '#8fa1b6';

  function svg(vb, wd, inner, extra) {
    return '<svg viewBox="' + vb + '" width="' + wd + '" ' +
      'style="max-width:100%;height:auto" role="img" ' + (extra || '') + '>' + inner + '</svg>';
  }

  /* ---------------- นาฬิกา ---------------- */
  function pt(cx, cy, r, deg) {
    var a = (deg - 90) * Math.PI / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  }

  function clock(h, m, size) {
    size = size || 190;
    var s = [], i, p1, p2, p;
    s.push('<circle cx="100" cy="100" r="95" fill="#fff" stroke="' + NAVY + '" stroke-width="5"/>');
    for (i = 0; i < 60; i++) {
      var big = i % 5 === 0;
      p1 = pt(100, 100, big ? 78 : 83, i * 6);
      p2 = pt(100, 100, 89, i * 6);
      s.push('<line x1="' + p1[0].toFixed(1) + '" y1="' + p1[1].toFixed(1) +
        '" x2="' + p2[0].toFixed(1) + '" y2="' + p2[1].toFixed(1) +
        '" stroke="' + (big ? NAVY : GREY) + '" stroke-width="' + (big ? 4 : 2) +
        '" stroke-linecap="round"/>');
    }
    for (i = 1; i <= 12; i++) {
      p = pt(100, 100, 65, i * 30);
      s.push('<text x="' + p[0].toFixed(1) + '" y="' + (p[1] + 8).toFixed(1) +
        '" text-anchor="middle" font-family="Nunito,sans-serif" font-size="22" ' +
        'font-weight="800" fill="' + NAVY + '">' + i + '</text>');
    }
    var ph = pt(100, 100, 46, (h % 12) * 30 + m * 0.5);
    s.push('<line x1="100" y1="100" x2="' + ph[0].toFixed(1) + '" y2="' + ph[1].toFixed(1) +
      '" stroke="' + RED + '" stroke-width="10" stroke-linecap="round"/>');
    var pm = pt(100, 100, 73, m * 6);
    s.push('<line x1="100" y1="100" x2="' + pm[0].toFixed(1) + '" y2="' + pm[1].toFixed(1) +
      '" stroke="' + BLUE + '" stroke-width="6" stroke-linecap="round"/>');
    s.push('<circle cx="100" cy="100" r="7" fill="' + NAVY + '"/>');
    return svg('0 0 200 200', size, s.join(''), 'aria-label="clock"');
  }

  /* นาฬิกาเข็มยาวเท่ากันสองข้าง (ตามที่วาดในข้อสอบ Part B ข้อ 1) */
  function clockDouble(a, b, size) {
    size = size || 190;
    var s = [], i, p1, p2, p;
    s.push('<circle cx="100" cy="100" r="95" fill="#fff" stroke="' + NAVY + '" stroke-width="5"/>');
    for (i = 0; i < 60; i++) {
      var big = i % 5 === 0;
      p1 = pt(100, 100, big ? 78 : 83, i * 6);
      p2 = pt(100, 100, 89, i * 6);
      s.push('<line x1="' + p1[0].toFixed(1) + '" y1="' + p1[1].toFixed(1) + '" x2="' + p2[0].toFixed(1) +
        '" y2="' + p2[1].toFixed(1) + '" stroke="' + (big ? NAVY : GREY) +
        '" stroke-width="' + (big ? 4 : 2) + '" stroke-linecap="round"/>');
    }
    for (i = 1; i <= 12; i++) {
      p = pt(100, 100, 65, i * 30);
      s.push('<text x="' + p[0].toFixed(1) + '" y="' + (p[1] + 8).toFixed(1) +
        '" text-anchor="middle" font-family="Nunito,sans-serif" font-size="22" font-weight="800" fill="' +
        NAVY + '">' + i + '</text>');
    }
    var pa = pt(100, 100, 70, a * 30), pb = pt(100, 100, 70, b * 30);
    s.push('<line x1="' + pa[0].toFixed(1) + '" y1="' + pa[1].toFixed(1) + '" x2="' + pb[0].toFixed(1) +
      '" y2="' + pb[1].toFixed(1) + '" stroke="' + NAVY + '" stroke-width="7" stroke-linecap="round"/>');
    [pa, pb].forEach(function (q) {
      var dx = q[0] - 100, dy = q[1] - 100, L = Math.sqrt(dx * dx + dy * dy),
          ux = dx / L, uy = dy / L, px = -uy, py = ux,
          bx = q[0] - 16 * ux, by = q[1] - 16 * uy;
      s.push('<polygon points="' + q[0].toFixed(1) + ',' + q[1].toFixed(1) + ' ' +
        (bx + 8 * px).toFixed(1) + ',' + (by + 8 * py).toFixed(1) + ' ' +
        (bx - 8 * px).toFixed(1) + ',' + (by - 8 * py).toFixed(1) + '" fill="' + NAVY + '"/>');
    });
    s.push('<circle cx="100" cy="100" r="7" fill="' + NAVY + '"/>');
    return svg('0 0 200 200', size, s.join(''), 'aria-label="clock"');
  }

  function clockPair(h1, m1, h2, m2) {
    return '<div style="display:flex;gap:26px;justify-content:center;flex-wrap:wrap">' +
      '<div style="text-align:center">' + clock(h1, m1, 170) +
      '<div style="font-weight:800;font-size:18px;margin-top:4px">START</div></div>' +
      '<div style="text-align:center">' + clock(h2, m2, 170) +
      '<div style="font-weight:800;font-size:18px;margin-top:4px">END</div></div></div>';
  }

  /* ---------------- บ้านนับเส้นนอน (เส้นบาง — ข้อ A6) ---------------- */
  /* เส้นนอน 7 เส้น: ปล่องไฟบน · ชายคา · หน้าต่างบน/กลาง/ล่าง · ประตูบน · พื้น */
  function houseH(mark) {
    var hi = mark ? ' stroke="' + RED + '" stroke-width="8"' : ' stroke="' + NAVY + '" stroke-width="4"';
    var nm = ' stroke="' + NAVY + '" stroke-width="4"';
    var base = '', top = '';
    /* --- เส้นที่ไม่ใช่แนวนอน วาดก่อน --- */
    base += '<line x1="30" y1="150" x2="150" y2="58"' + nm + ' stroke-linecap="round"/>';
    base += '<line x1="150" y1="58" x2="270" y2="150"' + nm + ' stroke-linecap="round"/>';
    base += '<line x1="62" y1="82" x2="62" y2="127"' + nm + '/>';
    base += '<line x1="104" y1="82" x2="104" y2="99"' + nm + '/>';
    base += '<line x1="52" y1="150" x2="52" y2="250"' + nm + '/>';
    base += '<line x1="248" y1="150" x2="248" y2="250"' + nm + '/>';
    base += '<circle cx="150" cy="112" r="17" fill="none"' + nm + '/>';
    base += '<line x1="78" y1="178" x2="78" y2="236"' + nm + '/>';
    base += '<line x1="142" y1="178" x2="142" y2="236"' + nm + '/>';
    base += '<line x1="110" y1="178" x2="110" y2="206"' + nm + '/>';
    base += '<line x1="170" y1="188" x2="170" y2="250"' + nm + '/>';
    base += '<line x1="222" y1="188" x2="222" y2="250"' + nm + '/>';
    /* --- เส้นแนวนอน 7 เส้น วาดทับบนสุด --- */
    top += '<line x1="62" y1="82" x2="104" y2="82"' + hi + ' stroke-linecap="round"/>';
    top += '<line x1="30" y1="150" x2="270" y2="150"' + hi + ' stroke-linecap="round"/>';
    top += '<line x1="78" y1="178" x2="142" y2="178"' + hi + ' stroke-linecap="round"/>';
    top += '<line x1="78" y1="206" x2="142" y2="206"' + hi + ' stroke-linecap="round"/>';
    top += '<line x1="78" y1="236" x2="142" y2="236"' + hi + ' stroke-linecap="round"/>';
    top += '<line x1="170" y1="188" x2="222" y2="188"' + hi + ' stroke-linecap="round"/>';
    top += '<line x1="52" y1="250" x2="248" y2="250"' + hi + ' stroke-linecap="round"/>';
    return svg('0 0 300 270', 300, base + top, 'aria-label="house"');
  }

  /* ---------------- บ้านนับเส้นตั้ง (เส้นหนา — Part B ข้อ 3) ---------------- */
  /* เส้นตั้ง 9 เส้น: ปล่องไฟ 2 · ผนัง 2 · หน้าต่าง 3 · ประตู 2 */
  function houseV(mark) {
    var hi = mark ? ' stroke="' + BLUE + '" stroke-width="10"' : ' stroke="' + NAVY + '" stroke-width="6"';
    var nm = ' stroke="' + NAVY + '" stroke-width="6"';
    var base = '', top = '';
    base += '<line x1="30" y1="150" x2="150" y2="58"' + nm + ' stroke-linecap="round"/>';
    base += '<line x1="150" y1="58" x2="270" y2="150"' + nm + ' stroke-linecap="round"/>';
    base += '<line x1="30" y1="150" x2="270" y2="150"' + nm + ' stroke-linecap="round"/>';
    base += '<line x1="62" y1="80" x2="104" y2="80"' + nm + ' stroke-linecap="round"/>';
    base += '<line x1="80" y1="186" x2="144" y2="186"' + nm + '/>';
    base += '<line x1="80" y1="213" x2="144" y2="213"' + nm + '/>';
    base += '<line x1="80" y1="240" x2="144" y2="240"' + nm + '/>';
    base += '<line x1="176" y1="182" x2="226" y2="182"' + nm + '/>';
    base += '<line x1="52" y1="255" x2="248" y2="255"' + nm + ' stroke-linecap="round"/>';
    /* --- เส้นแนวตั้ง 9 เส้น วาดทับบนสุด --- */
    top += '<line x1="62" y1="80" x2="62" y2="127"' + hi + ' stroke-linecap="round"/>';
    top += '<line x1="104" y1="80" x2="104" y2="99"' + hi + ' stroke-linecap="round"/>';
    top += '<line x1="52" y1="150" x2="52" y2="255"' + hi + ' stroke-linecap="round"/>';
    top += '<line x1="248" y1="150" x2="248" y2="255"' + hi + ' stroke-linecap="round"/>';
    top += '<line x1="80" y1="186" x2="80" y2="240"' + hi + ' stroke-linecap="round"/>';
    top += '<line x1="112" y1="186" x2="112" y2="240"' + hi + ' stroke-linecap="round"/>';
    top += '<line x1="144" y1="186" x2="144" y2="240"' + hi + ' stroke-linecap="round"/>';
    top += '<line x1="176" y1="182" x2="176" y2="255"' + hi + ' stroke-linecap="round"/>';
    top += '<line x1="226" y1="182" x2="226" y2="255"' + hi + ' stroke-linecap="round"/>';
    return svg('0 0 300 275', 300, base + top, 'aria-label="house"');
  }

  /* ---------------- 4 กลุ่มเส้น (ข้อ A5) ---------------- */
  function arrowLine(x1, y1, x2, y2, col) {
    var dx = x2 - x1, dy = y2 - y1, L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L;
    function head(x, y, sx, sy) {
      var bx = x - 12 * sx, by = y - 12 * sy, px = -sy, py = sx;
      return '<polygon points="' + x + ',' + y + ' ' + (bx + 6 * px) + ',' + (by + 6 * py) +
        ' ' + (bx - 6 * px) + ',' + (by - 6 * py) + '" fill="' + col + '"/>';
    }
    return '<line x1="' + (x1 + 9 * ux) + '" y1="' + (y1 + 9 * uy) + '" x2="' + (x2 - 9 * ux) +
      '" y2="' + (y2 - 9 * uy) + '" stroke="' + col + '" stroke-width="4" stroke-linecap="round"/>' +
      head(x2, y2, ux, uy) + head(x1, y1, -ux, -uy);
  }

  function group(which) {
    var s = '';
    if (which === 'A') {
      s = arrowLine(22, 88, 128, 26, BLUE) + arrowLine(22, 112, 128, 62, RED);
    } else if (which === 'B') {
      s = arrowLine(18, 70, 132, 70, BLUE) + arrowLine(75, 14, 75, 126, RED) +
          '<rect x="75" y="52" width="18" height="18" fill="none" stroke="' + GREEN + '" stroke-width="3"/>';
    } else if (which === 'C') {
      s = arrowLine(18, 52, 132, 52, BLUE) + arrowLine(18, 92, 132, 92, RED);
    } else {
      s = arrowLine(20, 48, 132, 94, BLUE) + arrowLine(22, 96, 130, 44, RED);
    }
    return svg('0 0 150 140', 168, s, 'aria-label="group ' + which + '"');
  }

  function groupsAll() {
    return '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px">' +
      ['A', 'B', 'C', 'D'].map(function (g) {
        return '<div class="figcard">' + group(g) + '<div class="cap"><b>Group ' + g + '</b></div></div>';
      }).join('') + '</div>';
  }

  /* ---------------- ตาราง AB CD XY MN (ข้อ A7) ---------------- */
  function perpGrid() {
    var s = '', i;
    for (i = 0; i <= 5; i++) {
      s += '<line x1="' + (40 + i * 44) + '" y1="20" x2="' + (40 + i * 44) + '" y2="240" stroke="#e3eaf3" stroke-width="2"/>';
      s += '<line x1="40" y1="' + (20 + i * 44) + '" x2="260" y2="' + (20 + i * 44) + '" stroke="#e3eaf3" stroke-width="2"/>';
    }
    s += arrowLine(30, 130, 270, 130, NAVY);                 /* AB แนวนอน */
    s += '<text x="14" y="137" font-size="20" font-weight="800" fill="' + NAVY + '">A</text>';
    s += '<text x="276" y="137" font-size="20" font-weight="800" fill="' + NAVY + '">B</text>';
    s += arrowLine(172, 26, 172, 236, RED);                  /* CD แนวตั้ง */
    s += '<text x="164" y="18" font-size="20" font-weight="800" fill="' + RED + '">C</text>';
    s += '<text x="164" y="256" font-size="20" font-weight="800" fill="' + RED + '">D</text>';
    s += arrowLine(84, 62, 152, 212, BLUE);                  /* XY เอียง */
    s += '<text x="66" y="56" font-size="20" font-weight="800" fill="' + BLUE + '">X</text>';
    s += '<text x="150" y="232" font-size="20" font-weight="800" fill="' + BLUE + '">Y</text>';
    s += arrowLine(126, 52, 212, 206, ORANGE);               /* MN เอียง */
    s += '<text x="110" y="46" font-size="20" font-weight="800" fill="' + ORANGE + '">M</text>';
    s += '<text x="214" y="224" font-size="20" font-weight="800" fill="' + ORANGE + '">N</text>';
    s += '<rect x="172" y="112" width="18" height="18" fill="none" stroke="' + GREEN + '" stroke-width="3"/>';
    return svg('0 0 300 270', 300, s, 'aria-label="lines"');
  }

  /* ---------------- ลูกแก้วกลุ่มละ 3 (ข้อ A4) ---------------- */
  function marbles(groups) {
    groups = groups || 10;
    var perRow = 5, s = '', g, col = ['#ffd9a0', '#ffe9c9'];
    for (g = 0; g < groups; g++) {
      var r = Math.floor(g / perRow), c = g % perRow;
      var ox = 18 + c * 108, oy = 16 + r * 104;
      if (g === 0) s += '<rect x="' + (ox - 10) + '" y="' + (oy - 8) + '" width="98" height="92" rx="14" fill="none" stroke="' + NAVY + '" stroke-width="5"/>';
      [[39, 6], [10, 46], [68, 46]].forEach(function (d) {
        s += '<circle cx="' + (ox + d[0]) + '" cy="' + (oy + d[1] + 14) + '" r="25" fill="' + col[0] +
          '" stroke="' + NAVY + '" stroke-width="3"/>';
        s += '<path d="M' + (ox + d[0] - 9) + ' ' + (oy + d[1] - 2) + ' q9 16 0 32" fill="none" stroke="' +
          NAVY + '" stroke-width="2.5"/>';
      });
    }
    return svg('0 0 560 ' + (16 + Math.ceil(groups / perRow) * 104), 560, s, 'aria-label="marbles"');
  }

  /* ---------------- แถวไข่ 12 × 6 (ข้อ A1) ---------------- */
  function eggArray(rows, cols) {
    var s = '', r, c, W = cols * 86 + 20, H = rows * 58 + 16;
    for (r = 0; r < rows; r++) {
      for (c = 0; c < cols; c++) {
        var x = 12 + c * 86, y = 8 + r * 58;
        s += '<rect x="' + x + '" y="' + y + '" width="78" height="48" rx="9" fill="#fff6e6" stroke="' +
          NAVY + '" stroke-width="3"/>';
        for (var k = 0; k < 6; k++) {
          s += '<ellipse cx="' + (x + 14 + (k % 3) * 25) + '" cy="' + (y + 16 + Math.floor(k / 3) * 18) +
            '" rx="10" ry="8" fill="#ffe2b0" stroke="' + NAVY + '" stroke-width="2"/>';
        }
      }
    }
    return svg('0 0 ' + W + ' ' + H, Math.min(W, 560), s, 'aria-label="eggs"');
  }

  /* ---------------- รูป A B C (Part B ข้อ 4) ---------------- */
  function figuresABC() {
    function box(inner, letter, cap) {
      return '<div class="figcard">' + svg('0 0 160 120', 168, inner, '') +
        '<div class="cap"><b>' + letter + '</b><br>' + cap + '</div></div>';
    }
    var A = '<polygon points="16,22 108,22 146,60 108,98 16,98" fill="#eaf2ff" stroke="' + NAVY +
      '" stroke-width="4"/><text x="60" y="70" font-size="30" font-weight="800" fill="' + NAVY + '">A</text>';
    var B = '<path d="M46 44 q-4-22 18-22 q6-16 26-10 q18-12 30 6 q22-2 18 22 q18 10 4 28 q4 22-18 22 ' +
      'q-8 14-26 8 q-16 12-30-4 q-22 2-20-22 q-16-12-2-28 Z" fill="#fff0f5" stroke="' + NAVY +
      '" stroke-width="4"/><text x="64" y="72" font-size="30" font-weight="800" fill="' + NAVY + '">B</text>';
    var C = '<polygon points="20,20 140,20 140,86 80,106 20,86" fill="#e9fbf3" stroke="' + NAVY +
      '" stroke-width="4"/><text x="66" y="70" font-size="30" font-weight="800" fill="' + NAVY + '">C</text>';
    return '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px">' +
      box(A, 'A', 'ห้าเหลี่ยมลูกศร') + box(B, 'B', 'ก้อนเมฆ') + box(C, 'C', 'ป้ายหยัก') + '</div>';
  }

  /* ---------------- ห้อง (prepositions) ---------------- */
  function roomScene() {
    var s = '';
    /* พัดลมเพดาน */
    s += '<line x1="150" y1="10" x2="150" y2="30" stroke="' + NAVY + '" stroke-width="4"/>';
    s += '<ellipse cx="150" cy="34" rx="9" ry="7" fill="' + NAVY + '"/>';
    s += '<path d="M150 34 q-52-14-64 2 q22 10 64-2Z" fill="#cfd9e6" stroke="' + NAVY + '" stroke-width="2.5"/>';
    s += '<path d="M150 34 q52-14 64 2 q-22 10-64-2Z" fill="#cfd9e6" stroke="' + NAVY + '" stroke-width="2.5"/>';
    s += '<text x="150" y="62" text-anchor="middle" font-size="15" fill="' + GREY + '">fan</text>';
    /* โต๊ะ */
    s += '<rect x="56" y="150" width="200" height="14" rx="4" fill="#d8b285" stroke="' + NAVY + '" stroke-width="3"/>';
    s += '<line x1="72" y1="164" x2="72" y2="226" stroke="' + NAVY + '" stroke-width="5"/>';
    s += '<line x1="240" y1="164" x2="240" y2="226" stroke="' + NAVY + '" stroke-width="5"/>';
    s += '<text x="66" y="246" text-anchor="middle" font-size="15" fill="' + GREY + '">table</text>';
    /* หมี */
    s += '<circle cx="92" cy="112" r="15" fill="#c79a6b" stroke="' + NAVY + '" stroke-width="3"/>';
    s += '<circle cx="82" cy="99" r="6" fill="#c79a6b" stroke="' + NAVY + '" stroke-width="2.5"/>';
    s += '<circle cx="102" cy="99" r="6" fill="#c79a6b" stroke="' + NAVY + '" stroke-width="2.5"/>';
    s += '<rect x="80" y="126" width="24" height="24" rx="7" fill="#c79a6b" stroke="' + NAVY + '" stroke-width="3"/>';
    s += '<text x="92" y="92" text-anchor="middle" font-size="14" fill="' + GREY + '">teddy bear</text>';
    /* แอปเปิล (ตรงกลาง) */
    s += '<circle cx="156" cy="136" r="14" fill="#e8564f" stroke="' + NAVY + '" stroke-width="3"/>';
    s += '<line x1="156" y1="122" x2="156" y2="114" stroke="#3f6b2f" stroke-width="3"/>';
    s += '<text x="156" y="108" text-anchor="middle" font-size="14" fill="' + GREY + '">apple</text>';
    /* หนังสือ */
    s += '<rect x="200" y="128" width="46" height="22" rx="3" fill="#8fd0f0" stroke="' + NAVY + '" stroke-width="3"/>';
    s += '<line x1="223" y1="128" x2="223" y2="150" stroke="' + NAVY + '" stroke-width="2.5"/>';
    s += '<text x="223" y="122" text-anchor="middle" font-size="14" fill="' + GREY + '">book</text>';
    /* กล่อง + ลูกบอล (ใต้โต๊ะ) */
    s += '<rect x="126" y="186" width="66" height="40" rx="4" fill="#e8d3ad" stroke="' + NAVY + '" stroke-width="3"/>';
    s += '<path d="M126 186 l14-14 h66 l-14 14Z" fill="#f2e6cd" stroke="' + NAVY + '" stroke-width="2.5"/>';
    s += '<circle cx="159" cy="204" r="13" fill="#ffd166" stroke="' + NAVY + '" stroke-width="3"/>';
    s += '<text x="176" y="246" text-anchor="middle" font-size="14" fill="' + GREY + '">box (ball inside)</text>';
    /* เตียง + หมา */
    s += '<rect x="300" y="150" width="150" height="46" rx="6" fill="#e5eaf2" stroke="' + NAVY + '" stroke-width="3"/>';
    s += '<rect x="300" y="126" width="26" height="70" rx="6" fill="#b9c6d8" stroke="' + NAVY + '" stroke-width="3"/>';
    s += '<line x1="308" y1="196" x2="308" y2="224" stroke="' + NAVY + '" stroke-width="5"/>';
    s += '<line x1="444" y1="196" x2="444" y2="224" stroke="' + NAVY + '" stroke-width="5"/>';
    s += '<text x="378" y="240" text-anchor="middle" font-size="15" fill="' + GREY + '">bed</text>';
    s += '<ellipse cx="388" cy="136" rx="30" ry="17" fill="#f0c98a" stroke="' + NAVY + '" stroke-width="3"/>';
    s += '<circle cx="360" cy="128" r="13" fill="#f0c98a" stroke="' + NAVY + '" stroke-width="3"/>';
    s += '<circle cx="356" cy="126" r="2.6" fill="' + NAVY + '"/>';
    s += '<path d="M352 118 l-6-9 l10 2Z" fill="#d9a96a" stroke="' + NAVY + '" stroke-width="2"/>';
    s += '<path d="M416 130 q12-12 6-22" fill="none" stroke="' + NAVY + '" stroke-width="3"/>';
    s += '<text x="388" y="108" text-anchor="middle" font-size="14" fill="' + GREY + '">dog</text>';
    return svg('0 0 470 252', 470, s, 'aria-label="room");');
  }

  /* ---------------- แผนที่ไปรษณีย์ ---------------- */
  function mapPost() {
    function shop(x, y, w, h, t, fill) {
      return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="5" fill="' +
        (fill || '#eef3fa') + '" stroke="' + NAVY + '" stroke-width="3"/>' +
        '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 6) + '" text-anchor="middle" font-size="15" fill="' +
        NAVY + '">' + t + '</text>';
    }
    var s = '';
    s += shop(20, 18, 96, 40, 'library') + shop(124, 18, 96, 40, 'barber') + shop(250, 18, 110, 40, 'restaurant');
    s += '<text x="120" y="82" font-size="16" font-weight="700" fill="' + GREEN + '">Green Road</text>';
    s += '<line x1="20" y1="90" x2="360" y2="90" stroke="#cfe0d6" stroke-width="18"/>';
    s += shop(20, 100, 76, 40, 'KFC') + shop(104, 100, 116, 40, 'cinema') + shop(250, 100, 110, 76, 'hotel', '#fff2d8');
    s += shop(20, 148, 200, 40, 'department store');
    s += '<text x="60" y="212" font-size="16" font-weight="700" fill="#2d6fb0">Blue Road</text>';
    s += '<line x1="20" y1="220" x2="360" y2="220" stroke="#d4e2f2" stroke-width="18"/>';
    s += shop(20, 232, 96, 40, 'school') + shop(124, 232, 96, 40, 'hospital');
    s += shop(228, 232, 132, 40, 'post office', '#ffe3ec');
    s += '<text x="238" y="132" font-size="15" font-weight="700" fill="#8a5a1e" transform="rotate(-90 238 132)">Brown Road</text>';
    s += '<line x1="232" y1="18" x2="232" y2="272" stroke="#efe0cb" stroke-width="16"/>';
    /* เส้นทาง */
    s += '<path d="M28 90 L224 90 L224 216 L286 216" fill="none" stroke="' + RED +
      '" stroke-width="5" stroke-dasharray="10 7" stroke-linecap="round"/>';
    s += '<circle cx="28" cy="90" r="10" fill="' + RED + '"/>';
    s += '<text x="28" y="95" text-anchor="middle" font-size="13" fill="#fff" font-weight="800">S</text>';
    s += '<polygon points="298,216 282,208 282,224" fill="' + RED + '"/>';
    s += '<text x="294" y="252" text-anchor="middle" font-size="24">⭐</text>';
    return svg('0 0 380 285', 470, s, 'aria-label="map to post office"');
  }

  /* ---------------- แผนที่ Green Street ---------------- */
  function mapStreet() {
    function shop(x, y, w, h, t, fill) {
      return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="5" fill="' +
        (fill || '#eef3fa') + '" stroke="' + NAVY + '" stroke-width="3"/>' +
        '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 6) + '" text-anchor="middle" font-size="14" fill="' +
        NAVY + '">' + t + '</text>';
    }
    var s = '';
    s += shop(196, 12, 100, 34, 'Hospital') + shop(304, 12, 92, 34, 'Pet Shop');
    s += shop(18, 58, 84, 38, 'Bank') + shop(196, 58, 100, 38, 'Bookstore') + shop(304, 58, 108, 38, 'Supermarket');
    s += '<line x1="150" y1="6" x2="150" y2="220" stroke="#d8ecdf" stroke-width="30"/>';
    s += '<text x="150" y="118" font-size="15" font-weight="700" fill="' + GREEN +
      '" text-anchor="middle" transform="rotate(-90 150 118)">Green Street</text>';
    s += '<line x1="6" y1="118" x2="420" y2="118" stroke="#f6e0e6" stroke-width="26"/>';
    s += '<text x="330" y="112" font-size="15" font-weight="700" fill="' + RED + '">Red Avenue</text>';
    s += shop(18, 140, 100, 44, 'Flower Shop') + shop(180, 140, 92, 44, 'Music Store');
    s += shop(280, 140, 78, 44, 'Toy Store') + shop(366, 140, 92, 44, 'Restaurant', '#fff2d8');
    return svg('0 0 470 200', 470, s, 'aria-label="street map"');
  }

  /* ---------------- ร้านขายยา + ลูกศร (ข้อ B6) ---------------- */
  function pharmacyArrow() {
    var s = '';
    s += '<rect x="30" y="30" width="96" height="76" rx="6" fill="#eaf7ef" stroke="' + NAVY + '" stroke-width="4"/>';
    s += '<path d="M24 30 h108 l-12-18 h-84Z" fill="#b9e2c8" stroke="' + NAVY + '" stroke-width="3"/>';
    s += '<line x1="78" y1="48" x2="78" y2="84" stroke="' + GREEN + '" stroke-width="10"/>';
    s += '<line x1="60" y1="66" x2="96" y2="66" stroke="' + GREEN + '" stroke-width="10"/>';
    s += '<text x="78" y="126" text-anchor="middle" font-size="15" fill="' + GREY + '">pharmacy</text>';
    s += '<line x1="20" y1="150" x2="250" y2="150" stroke="' + NAVY + '" stroke-width="12" stroke-linecap="round"/>';
    s += '<polygon points="278,150 244,132 244,168" fill="' + NAVY + '"/>';
    return svg('0 0 300 180', 320, s, 'aria-label="go past the pharmacy"');
  }

  /* ---------------- การ์ดรูป 2 อัน (café / salon) ---------------- */
  function twoShops(a, b, gap) {
    function shop(x, t, fill) {
      return '<rect x="' + x + '" y="40" width="110" height="90" rx="6" fill="' + fill +
        '" stroke="' + NAVY + '" stroke-width="4"/>' +
        '<path d="M' + (x - 6) + ' 40 h122 l-14-20 h-94Z" fill="#ffe0b8" stroke="' + NAVY + '" stroke-width="3"/>' +
        '<rect x="' + (x + 16) + '" y="70" width="34" height="34" rx="3" fill="#fff" stroke="' + NAVY + '" stroke-width="3"/>' +
        '<rect x="' + (x + 64) + '" y="70" width="30" height="60" rx="3" fill="#fff" stroke="' + NAVY + '" stroke-width="3"/>' +
        '<text x="' + (x + 55) + '" y="150" text-anchor="middle" font-size="16" font-weight="700" fill="' + NAVY + '">' + t + '</text>';
    }
    var s = shop(20, a, '#fde8ef') + shop(20 + 110 + (gap || 24), b, '#e7f1ff');
    var W = 20 + 110 + (gap || 24) + 130;
    if (gap && gap > 40) {
      var mx = 20 + 110 + gap / 2;
      s += '<line x1="' + mx + '" y1="10" x2="' + mx + '" y2="160" stroke="' + GREY +
        '" stroke-width="4" stroke-dasharray="10 8"/>';
      s += '<text x="' + mx + '" y="176" text-anchor="middle" font-size="14" fill="' + GREY + '">road</text>';
    }
    return svg('0 0 ' + W + ' 185', Math.min(W, 470), s, '');
  }

  /* ---------------- อาคาร 3 หลัง (hotel museum church) ---------------- */
  function threeBuildings() {
    var s = '';
    s += '<rect x="20" y="30" width="96" height="120" rx="5" fill="#e7f1ff" stroke="' + NAVY + '" stroke-width="4"/>';
    s += '<text x="68" y="170" text-anchor="middle" font-size="16" font-weight="700" fill="' + NAVY + '">hotel</text>';
    s += '<rect x="146" y="62" width="110" height="88" rx="5" fill="#fff6e0" stroke="' + NAVY + '" stroke-width="4"/>';
    s += '<polygon points="140,62 262,62 201,30" fill="#ffe9b8" stroke="' + NAVY + '" stroke-width="3"/>';
    s += '<text x="201" y="170" text-anchor="middle" font-size="16" font-weight="700" fill="' + NAVY + '">museum</text>';
    s += '<rect x="288" y="62" width="92" height="88" rx="5" fill="#eaf7ef" stroke="' + NAVY + '" stroke-width="4"/>';
    s += '<polygon points="282,62 386,62 334,26" fill="#c7e8d4" stroke="' + NAVY + '" stroke-width="3"/>';
    s += '<line x1="334" y1="26" x2="334" y2="6" stroke="' + NAVY + '" stroke-width="4"/>';
    s += '<line x1="324" y1="14" x2="344" y2="14" stroke="' + NAVY + '" stroke-width="4"/>';
    s += '<text x="334" y="170" text-anchor="middle" font-size="16" font-weight="700" fill="' + NAVY + '">church</text>';
    return svg('0 0 400 182', 470, s, '');
  }

  w.Fig = {
    clock: clock, clockDouble: clockDouble, clockPair: clockPair,
    houseH: houseH, houseV: houseV, group: group, groupsAll: groupsAll,
    perpGrid: perpGrid, marbles: marbles, eggArray: eggArray, figuresABC: figuresABC,
    roomScene: roomScene, mapPost: mapPost, mapStreet: mapStreet,
    pharmacyArrow: pharmacyArrow, twoShops: twoShops, threeBuildings: threeBuildings
  };
})(window);
