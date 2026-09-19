/* ============================================================
   engine.js — เอนจิ้นแบบฝึกหัด + ระบบให้ครูเห็นว่าน้องอยู่จุดไหน
   ------------------------------------------------------------
   ชนิดข้อ:  mc   เลือกตอบ
             fill พิมพ์คำตอบ
             bank เลือกคำจากคลังคำ
             list เขียนรายการหลายบรรทัด (นับทีละบรรทัด)
   ============================================================ */
(function (w, d) {
  'use strict';

  var S = {
    subject: '', title: '', name: '', items: [], topics: {},
    started: 0, elapsed: 0, running: true, limitSec: 0,
    qStart: 0, answered: 0, totalPts: 0, gotPts: 0
  };

  /* ---------------- ตัวช่วย ---------------- */
  function el(id) { return d.getElementById(id); }
  function mk(tag, cls, html) {
    var e = d.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function norm(s) {
    return String(s == null ? '' : s).toLowerCase().trim()
      .replace(/[.!?,;]+$/g, '').replace(/\s+/g, ' ')
      .replace(/[‘’]/g, "'");
  }
  function two(n) { return n < 10 ? '0' + n : '' + n; }
  function mmss(sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60);
    return two(m) + ':' + two(sec % 60);
  }
  function b36(n) { return Math.max(0, Math.round(n)).toString(36); }

  /* ---------------- ชื่อผู้เรียน ---------------- */
  function getName() {
    try { return localStorage.getItem('rq2_name') || ''; } catch (e) { return ''; }
  }
  function setName(v) {
    try { localStorage.setItem('rq2_name', v); } catch (e) {}
  }

  /* ---------------- แถบสถานะ ---------------- */
  function buildBar() {
    var bar = mk('div', 'statusbar');
    bar.id = 'statusbar';
    bar.innerHTML =
      '<div class="row1">' +
        '<span class="who">👤 <span id="sbName">-</span></span>' +
        '<span class="stat">ทำแล้ว <b id="sbDone">0</b>/<b>' + S.items.length + '</b></span>' +
        '<span class="stat">ถูก <b id="sbScore">0</b>/<b>' + S.totalPts + '</b></span>' +
        '<span class="spacer"></span>' +
        '<span class="clock" id="sbClock">00:00</span>' +
        '<button class="mini" id="sbPause">⏸ พัก</button>' +
        '<button class="mini" id="sbSet">⏱ ตั้งเวลา</button>' +
      '</div>' +
      '<div class="strip" id="sbStrip"></div>';
    var hdr = d.querySelector('header.topbar');
    if (hdr && hdr.parentNode) hdr.parentNode.insertBefore(bar, hdr.nextSibling);
    else d.body.insertBefore(bar, d.body.firstChild);

    var strip = el('sbStrip');
    S.items.forEach(function (it, i) {
      var b = mk('button', 'dot', it.label || (i + 1));
      b.id = 'dot' + i;
      b.title = 'ข้อ ' + (i + 1);
      b.addEventListener('click', function () {
        var q = el('q' + i);
        if (q) { q.scrollIntoView({ behavior: 'smooth', block: 'start' }); S.qStart = Date.now(); }
      });
      strip.appendChild(b);
    });

    el('sbName').textContent = S.name || 'ยังไม่ใส่ชื่อ';
    el('sbPause').addEventListener('click', function () {
      S.running = !S.running;
      this.textContent = S.running ? '⏸ พัก' : '▶ ทำต่อ';
    });
    el('sbSet').addEventListener('click', function () {
      var v = prompt('ตั้งเวลาทำข้อสอบกี่นาที?\n(ใส่ 0 = ไม่จับเวลาถอยหลัง แค่นับเวลาที่ใช้)',
        S.limitSec ? Math.round(S.limitSec / 60) : '20');
      if (v === null) return;
      var n = parseInt(v, 10);
      S.limitSec = isNaN(n) || n <= 0 ? 0 : n * 60;
      tick();
    });
  }

  function tick() {
    if (S.running) S.elapsed = (Date.now() - S.started) / 1000;
    var c = el('sbClock');
    if (!c) return;
    if (S.limitSec) {
      var left = S.limitSec - S.elapsed;
      c.textContent = (left < 0 ? '+' : '') + mmss(Math.abs(left));
      c.className = 'clock' + (left < 0 ? ' over' : (left < 120 ? ' warn' : ''));
    } else {
      c.textContent = mmss(S.elapsed);
      c.className = 'clock';
    }
  }

  /* ---------------- กล่องขอความช่วยเหลือ ---------------- */
  function refreshHelp() {
    var box = el('helpbox'), list = [];
    S.items.forEach(function (it, i) { if (it._help) list.push(i); });
    if (!box) return;
    if (!list.length) { box.className = 'helpbox'; return; }
    box.className = 'helpbox show';
    box.innerHTML = '<b>🙋 ข้อที่น้องขอให้ครูอธิบาย (' + list.length + ' ข้อ)</b>' +
      '<div class="chips">' + list.map(function (i) {
        return '<button data-i="' + i + '">ข้อ ' + (S.items[i].label || (i + 1)) + '</button>';
      }).join('') + '</div>';
    box.querySelectorAll('.chips button').forEach(function (b) {
      b.addEventListener('click', function () {
        var q = el('q' + b.dataset.i);
        if (q) q.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function paintDot(i) {
    var it = S.items[i], b = el('dot' + i);
    if (!b) return;
    var cls = 'dot';
    if (it._done) cls += it._got >= it.pts ? ' ok' : (it._got > 0 ? ' part' : ' no');
    if (it._help && !it._done) cls += ' help';
    b.className = cls;
  }

  /* ---------------- เฉลยแบบขั้นตอน ---------------- */
  function stepsHtml(it) {
    var h = '';
    if (it.steps && it.steps.length) {
      h += it.steps.map(function (s, k) {
        return '<div class="step"><b>ขั้นที่ ' + (k + 1) + ':</b> ' + s + '</div>';
      }).join('');
    }
    if (it.why) h += '<p style="margin:8px 0 0">' + it.why + '</p>';
    return h;
  }

  function reveal(it, i, okText) {
    var fb = el('fb' + i);
    var full = it._got >= it.pts;
    fb.className = 'fb show ' + (full ? 'ok' : 'no');
    fb.innerHTML = '<div class="h">' + (full ? '✅ ถูกต้อง!' : (it._got > 0 ? '🟡 ถูกบางส่วน' : '❌ ยังไม่ถูก')) +
      (it.pts > 1 ? ' (' + it._got + '/' + it.pts + ' คะแนน)' : '') + '</div>' +
      (okText ? '<p style="margin:0 0 6px"><b>คำตอบ:</b> ' + okText + '</p>' : '') + stepsHtml(it);
    el('q' + i).classList.add(full ? 'ok' : 'no');
  }

  function score(it, i, got) {
    if (it._done) return;
    it._done = true;
    it._got = got;
    it._sec = Math.max(0, (Date.now() - S.qStart) / 1000);
    S.qStart = Date.now();
    S.answered++;
    S.gotPts += got;
    el('sbDone').textContent = S.answered;
    el('sbScore').textContent = S.gotPts;
    paintDot(i);
    if (S.answered >= S.items.length) setTimeout(finish, 500);
  }

  /* ---------------- สร้างข้อ ---------------- */
  function shell(it, i) {
    var q = mk('div', 'q');
    q.id = 'q' + i;
    var h = '<div class="head"><span class="qnum">' + (it.label || (i + 1)) + '</span>' +
      '<span class="qtext">' + it.q + '</span></div>';
    if (it.sub) h += '<p class="qsub">' + it.sub + '</p>';
    if (it.fig) h += '<div class="fig">' + it.fig + '</div>';
    q.innerHTML = h;
    return q;
  }

  function addBtns(q, it, i) {
    var row = mk('div', 'qbtns');
    var hb = mk('button', 'helpbtn', '🙋 ติดข้อนี้ ขอครูอธิบาย');
    hb.addEventListener('click', function () {
      it._help = !it._help;
      hb.className = 'helpbtn' + (it._help ? ' on' : '');
      hb.textContent = it._help ? '🙋 บอกครูแล้ว' : '🙋 ติดข้อนี้ ขอครูอธิบาย';
      q.classList.toggle('help', !!it._help && !it._done);
      paintDot(i);
      refreshHelp();
    });
    row.appendChild(hb);
    q.appendChild(row);
    q.appendChild(mk('div', 'fb', '')).id = 'fb' + i;
  }

  var KEY = 'กขคง';

  function buildMC(it, i, root) {
    var q = shell(it, i);
    var opts = mk('div', 'opts' + (it.two ? ' two' : ''));
    it.o.forEach(function (t, j) {
      var b = mk('button', 'opt',
        '<span class="k">' + (it.keys ? it.keys[j] : KEY[j]) + '</span><span>' + t + '</span>');
      b.dataset.j = j;
      opts.appendChild(b);
    });
    q.appendChild(opts);
    addBtns(q, it, i);
    root.appendChild(q);

    opts.querySelectorAll('.opt').forEach(function (b) {
      b.addEventListener('click', function () {
        if (it._done) return;
        var j = +b.dataset.j, ok = j === it.a;
        opts.querySelectorAll('.opt').forEach(function (x) {
          x.disabled = true;
          if (+x.dataset.j === it.a) x.classList.add('correct');
          else if (+x.dataset.j === j) x.classList.add('wrong');
          else x.classList.add('dim');
        });
        score(it, i, ok ? it.pts : 0);
        reveal(it, i, '<b>' + (it.keys ? it.keys[it.a] : KEY[it.a]) + '. ' + it.o[it.a] + '</b>');
      });
    });
  }

  function buildFill(it, i, root) {
    var q = shell(it, i);
    var row = mk('div', 'fill');
    row.innerHTML = '<input type="text" placeholder="' + (it.ph || 'พิมพ์คำตอบ') + '" autocomplete="off">' +
      (it.unit ? '<span class="unit">' + it.unit + '</span>' : '') +
      '<button class="btn small">ตรวจ</button>';
    q.appendChild(row);
    addBtns(q, it, i);
    root.appendChild(q);

    var inp = row.querySelector('input'), btn = row.querySelector('button');
    function go() {
      if (it._done) return;
      if (!inp.value.trim()) { alert('พิมพ์คำตอบก่อนนะ'); inp.focus(); return; }
      var v = norm(inp.value);
      var ok = it.ans.some(function (a) { return norm(a) === v; });
      inp.disabled = true; btn.disabled = true;
      inp.classList.add(ok ? 'ok' : 'no');
      score(it, i, ok ? it.pts : 0);
      reveal(it, i, '<b>' + it.ans[0] + '</b>');
    }
    btn.addEventListener('click', go);
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
  }

  function buildBank(it, i, root) {
    var q = shell(it, i);
    var bank = mk('div', 'bank');
    it.bank.forEach(function (t) {
      var b = mk('button', '', t);
      b.dataset.v = t;
      bank.appendChild(b);
    });
    q.appendChild(bank);
    addBtns(q, it, i);
    root.appendChild(q);

    bank.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        if (it._done) return;
        var v = b.dataset.v;
        var ok = it.ans.some(function (a) { return norm(a) === norm(v); });
        bank.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
        b.classList.add('sel');
        b.style.background = ok ? 'var(--ok)' : 'var(--no)';
        b.style.borderColor = ok ? 'var(--ok)' : 'var(--no)';
        b.style.color = '#fff';
        if (!ok) {
          bank.querySelectorAll('button').forEach(function (x) {
            if (it.ans.some(function (a) { return norm(a) === norm(x.dataset.v); })) {
              x.style.background = 'var(--ok-soft)';
              x.style.borderColor = 'var(--ok)';
            }
          });
        }
        score(it, i, ok ? it.pts : 0);
        reveal(it, i, '<b>' + it.ans[0] + '</b>');
      });
    });
  }

  function buildList(it, i, root) {
    var q = shell(it, i);
    var box = mk('div', 'listq'), k;
    for (k = 0; k < it.n; k++) {
      box.innerHTML += '<input type="text" placeholder="' + (it.ph || '') + ' ' + (k + 1) + '" autocomplete="off">';
    }
    q.appendChild(box);
    var row = mk('div', 'qbtns');
    row.innerHTML = '<button class="btn small">ตรวจ</button>';
    q.appendChild(row);
    addBtns(q, it, i);
    root.appendChild(q);

    row.querySelector('button').addEventListener('click', function () {
      if (it._done) return;
      var inputs = [].slice.call(box.querySelectorAll('input'));
      if (!inputs.some(function (x) { return x.value.trim(); })) { alert('เขียนอย่างน้อย 1 ข้อก่อนนะ'); return; }
      var used = {}, got = 0;
      inputs.forEach(function (x) {
        var v = norm(x.value), hit = -1;
        it.pool.forEach(function (group, gi) {
          if (used[gi]) return;
          if (group.some(function (a) { return norm(a) === v; })) hit = gi;
        });
        x.disabled = true;
        if (hit >= 0) { used[hit] = 1; got++; x.classList.add('ok'); }
        else if (v) x.classList.add('no');
      });
      got = Math.min(got, it.pts);
      this.disabled = true;
      score(it, i, got);
      reveal(it, i, it.pool.map(function (g) { return g[0]; }).join(' · '));
    });
  }

  /* ---------------- สรุปผล ---------------- */
  function resultCode() {
    var body = S.items.map(function (it) {
      return b36(it._got || 0) + (it._help ? 'h' : '.') + b36(it._sec || 0);
    }).join(',');
    var raw = 'RQ2|' + S.subject + '|' + (S.name || '-') + '|' + b36(S.elapsed) + '|' + body;
    try { return btoa(unescape(encodeURIComponent(raw))); } catch (e) { return raw; }
  }

  function confetti() {
    var box = el('confetti');
    if (!box) return;
    var cols = ['#ffd166', '#06d6a0', '#ef476f', '#4cc9f0', '#b388ff'], i;
    box.innerHTML = '';
    for (i = 0; i < 70; i++) {
      var s = mk('i');
      s.style.left = (Math.random() * 100) + '%';
      s.style.background = cols[i % cols.length];
      s.style.animationDuration = (1.6 + Math.random() * 1.6) + 's';
      s.style.animationDelay = (Math.random() * .6) + 's';
      box.appendChild(s);
    }
    box.className = 'confetti go';
    setTimeout(function () { box.className = 'confetti'; }, 4200);
  }

  function finish() {
    var r = el('result');
    if (!r) return;
    r.className = 'card result show';
    var pc = Math.round(S.gotPts / S.totalPts * 100);

    /* คะแนนแยกตามเรื่อง */
    var byT = {};
    S.items.forEach(function (it) {
      var k = it.topic || 'อื่น ๆ';
      byT[k] = byT[k] || { got: 0, max: 0 };
      byT[k].got += it._got || 0;
      byT[k].max += it.pts;
    });

    /* ข้อที่ใช้เวลานาน */
    var times = S.items.map(function (it, i) { return { i: i, s: it._sec || 0, it: it }; })
      .sort(function (a, b) { return b.s - a.s; }).slice(0, 3);

    var wrong = S.items.filter(function (it) { return (it._got || 0) < it.pts; });
    var helps = S.items.filter(function (it) { return it._help; });

    var h = '<div class="big">' + S.gotPts + ' / ' + S.totalPts + '</div>' +
      '<p class="msg">' + (pc === 100 ? '🏆 <b>เต็ม!</b> เก่งมากกกก' :
        pc >= 80 ? '🎉 <b>เยี่ยมมาก</b> เหลืออีกนิดเดียว' :
        pc >= 50 ? '💪 <b>มาถูกทางแล้ว</b> ซ่อมอีกหน่อย' :
                   '📖 <b>ยังไม่เป็นไร</b> ค่อย ๆ ซ่อมไปทีละเรื่อง') +
      '<br>ใช้เวลา <b>' + mmss(S.elapsed) + '</b></p>';

    h += '<h3>คะแนนแยกตามเรื่อง</h3><div class="bars">';
    Object.keys(byT).forEach(function (k) {
      var b = byT[k], p = b.max ? b.got / b.max : 0;
      var cls = p >= 0.8 ? 'good' : (p < 0.6 ? 'weak' : '');
      var link = (S.topics[k] && S.topics[k].link)
        ? ' → <a href="' + S.topics[k].link + '"><b>กลับไปอ่านหัวข้อนี้</b></a>' : '';
      h += '<div class="bar ' + cls + '"><span class="n">' + k + '</span>' +
        '<span class="v">' + b.got + '/' + b.max + '</span>' +
        '<span class="a">' + (p >= 0.8 ? 'แน่นแล้ว ✅' : 'ควรทบทวนอีกรอบ' + link) + '</span></div>';
    });
    h += '</div>';

    if (times[0] && times[0].s > 5) {
      h += '<h3>⏱ ข้อที่ใช้เวลานานที่สุด</h3><p class="th">ข้อพวกนี้คือจุดที่ลังเล ' +
        'ถึงตอบถูกก็ควรทบทวนซ้ำ</p><ul>';
      times.forEach(function (t) {
        h += '<li>ข้อ <b>' + (t.it.label || (t.i + 1)) + '</b> — ' + mmss(t.s) +
          ((t.it._got >= t.it.pts) ? ' (ตอบถูก)' : ' <b style="color:var(--no)">(ตอบผิด)</b>') + '</li>';
      });
      h += '</ul>';
    }

    if (helps.length) {
      h += '<h3>🙋 ข้อที่น้องขอให้ครูอธิบาย</h3><p>ข้อ <b>' +
        helps.map(function (it) { return it.label || (S.items.indexOf(it) + 1); }).join(', ') + '</b></p>';
    }

    if (wrong.length) {
      h += '<h3>📌 ข้อที่ต้องซ่อม</h3><p>ข้อ <b>' +
        wrong.map(function (it) { return it.label || (S.items.indexOf(it) + 1); }).join(', ') +
        '</b></p><div class="btn-row"><button class="btn" id="btnRetry">🔁 ทำเฉพาะข้อที่ผิดอีกรอบ</button></div>';
    }

    h += '<h3>📤 ส่งผลให้ครู</h3>' +
      '<p class="th">กดปุ่มคัดลอก แล้ววางในแชทส่งให้ครู · ครูเอาไปเปิดดูในหน้า “สำหรับครู” ได้</p>' +
      '<textarea class="code" id="codeBox" readonly>' + resultCode() + '</textarea>' +
      '<div class="btn-row"><button class="btn" id="btnCopy">📋 คัดลอกรหัสผล</button>' +
      '<button class="btn ghost" onclick="location.reload()">🔄 เริ่มใหม่ทั้งหมด</button></div>';

    r.innerHTML = h;

    var bc = el('btnCopy');
    if (bc) bc.addEventListener('click', function () {
      var t = el('codeBox');
      t.select(); t.setSelectionRange(0, 99999);
      try { d.execCommand('copy'); this.textContent = '✅ คัดลอกแล้ว!'; }
      catch (e) { this.textContent = 'กดค้างที่กล่องแล้วเลือก Copy'; }
    });
    var br = el('btnRetry');
    if (br) br.addEventListener('click', function () {
      var first = wrong[0];
      d.querySelectorAll('.q').forEach(function (q) { q.style.display = 'none'; });
      wrong.forEach(function (it) {
        var q = el('q' + S.items.indexOf(it));
        if (q) q.style.display = '';
      });
      if (first) el('q' + S.items.indexOf(first)).scrollIntoView({ behavior: 'smooth' });
      this.textContent = '✅ แสดงเฉพาะข้อที่ผิดแล้ว (เลื่อนขึ้นไปดู)';
      this.disabled = true;
    });

    if (pc === 100) confetti();
    r.scrollIntoView({ behavior: 'smooth' });
  }

  /* ---------------- เริ่ม ---------------- */
  function init(cfg) {
    S.subject = cfg.subject;
    S.title = cfg.title || '';
    S.topics = cfg.topics || {};
    S.items = cfg.items;
    S.items.forEach(function (it) { it.pts = it.pts || 1; S.totalPts += it.pts; });
    S.name = getName();

    buildBar();
    var root = el('quiz');
    S.items.forEach(function (it, i) {
      if (it.t === 'fill') buildFill(it, i, root);
      else if (it.t === 'bank') buildBank(it, i, root);
      else if (it.t === 'list') buildList(it, i, root);
      else buildMC(it, i, root);
    });

    if (!S.name) {
      setTimeout(function () {
        var v = prompt('ใส่ชื่อของหนูก่อนเริ่มนะ 😊\n(ครูจะได้รู้ว่าใครทำ)');
        if (v && v.trim()) { S.name = v.trim(); setName(S.name); el('sbName').textContent = S.name; }
      }, 300);
    }

    S.started = Date.now();
    S.qStart = Date.now();
    setInterval(tick, 500);
    tick();

    var cf = mk('div', 'confetti');
    cf.id = 'confetti';
    d.body.appendChild(cf);
  }

  w.Quiz = { init: init, norm: norm, mmss: mmss };
})(window, document);
