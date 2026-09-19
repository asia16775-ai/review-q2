/* ============================================================
   data-english.js — English Review Worksheet: Quarter 2
   A. Prepositions 10 ข้อ · Q. Directions 5 ข้อ · B. Choose 9 ข้อ
   ============================================================ */
(function () {
  var PREP = ['in', 'on', 'under', 'above', 'between', 'next to', 'opposite', 'behind'];

  window.DATA_ENGLISH = {
    subject: 'eng',
    title: 'English Review Worksheet — Quarter 2',
    topics: {
      'Prepositions': { link: 'learn.html#prep' },
      'บอกทาง & แผนที่': { link: 'learn.html#map' },
      'ไวยากรณ์ & เสียง': { link: 'learn.html#gram' }
    },
    items: [

/* ---------------- A. PREPOSITIONS ---------------- */
{ label: 'A1', topic: 'Prepositions', t: 'bank',
  q: 'The <b>ball</b> is ______ the box.',
  fig: Fig.roomScene(),
  bank: PREP, ans: ['in'],
  steps: ['มองหา<b>ลูกบอล</b>ในรูป → อยู่<b>ข้างในกล่อง</b>',
          'อยู่ข้างในสิ่งที่มีผนังล้อมรอบ → ใช้ <b>in</b>'],
  why: '💡 <b>in</b> = อยู่ข้างใน (มีอะไรล้อมรอบ) · <b>on</b> = อยู่บนผิวหน้า (แตะกันอยู่)<br>' +
       'ตัวอย่าง: the ball is <b>in</b> the box · the book is <b>on</b> the table' },

{ label: 'A2', topic: 'Prepositions', t: 'bank',
  q: 'The <b>box</b> is ______ the table.',
  bank: PREP, ans: ['under'],
  steps: ['กล่องอยู่<b>ใต้โต๊ะ</b>', 'อยู่ข้างล่างและอยู่ตรง ๆ ใต้ของอีกชิ้น → ใช้ <b>under</b>'],
  why: '💡 <b>under</b> = ใต้ (อยู่ล่างและมักอยู่ตรงใต้พอดี) — คู่ตรงข้ามกับ <b>on</b> และ <b>above</b>' },

{ label: 'A3', topic: 'Prepositions', t: 'bank',
  q: 'The <b>apple</b> is ______ the teddy bear and the book.',
  bank: PREP, ans: ['between'],
  steps: ['สังเกตคำว่า <b>and</b> ในประโยค — มีของ <b>2 อย่าง</b> ขนาบอยู่',
          'แอปเปิลอยู่<b>ตรงกลาง</b>ระหว่างตุ๊กตาหมีกับหนังสือ',
          'อยู่ตรงกลางระหว่าง 2 สิ่ง → ใช้ <b>between</b>'],
  why: '⭐ <b>สูตรลัดที่ใช้ได้เสมอ</b> — เห็นโครงสร้าง “___ A <b>and</b> B” ให้ตอบ <b>between</b> ได้เลย ' +
       'เพราะ between ต้องมีของ 2 อย่างเสมอ' },

{ label: 'A4', topic: 'Prepositions', t: 'bank',
  q: 'The <b>dog</b> is ______ the bed.',
  bank: PREP, ans: ['on'],
  steps: ['หมาอยู่<b>บนเตียง</b> ตัวแตะกับเตียงอยู่', 'แตะผิวหน้าของอีกสิ่ง → ใช้ <b>on</b>'],
  why: '💡 <b>on</b> ต้อง<b>แตะกัน</b>เสมอ ถ้าลอยอยู่ไม่แตะ ต้องใช้ <b>above</b> แทน' },

{ label: 'A5', topic: 'Prepositions', t: 'bank',
  q: 'The <b>fan</b> is ______ the table.',
  bank: PREP, ans: ['above'],
  steps: ['พัดลมอยู่<b>เพดาน</b> ลอยอยู่เหนือโต๊ะ แต่<b>ไม่ได้แตะ</b>โต๊ะ',
          'อยู่ข้างบนแต่ไม่แตะกัน → ใช้ <b>above</b>'],
  why: '⚠️ <b>จุดที่พลาดกันมากที่สุดในชุดนี้</b><br>' +
       '<b>on</b> = อยู่บนและ<b>แตะกัน</b> (หนังสือบนโต๊ะ)<br>' +
       '<b>above</b> = อยู่บนแต่<b>ไม่แตะ</b> (พัดลมเหนือโต๊ะ · เครื่องบินเหนือเมฆ)' },

{ label: 'A6', topic: 'Prepositions', t: 'bank',
  q: 'The <b>teddy bear</b> is ______ the table.',
  bank: PREP, ans: ['on'],
  steps: ['ตุ๊กตาหมี<b>นั่งอยู่บนโต๊ะ</b> ก้นแตะโต๊ะอยู่', 'แตะผิวโต๊ะ → ใช้ <b>on</b>'],
  why: '💡 เทียบกับข้อ A5 ให้ชัด — <b>หมีอยู่ on โต๊ะ</b> (แตะ) แต่ <b>พัดลมอยู่ above โต๊ะ</b> (ไม่แตะ)' },

{ label: 'A7', topic: 'Prepositions', t: 'bank',
  q: 'The <b>bed</b> is ______ the table.',
  bank: PREP, ans: ['next to'],
  steps: ['เตียงอยู่<b>ข้าง ๆ</b> โต๊ะ ในระดับเดียวกัน ไม่ได้อยู่บนหรือใต้',
          'อยู่ติดกันด้านข้าง → ใช้ <b>next to</b>'],
  why: '💡 <b>next to</b> = ข้าง ๆ / ติดกัน (พูดว่า <b>beside</b> ก็ได้ แปลเหมือนกัน)<br>' +
       'ต่างจาก <b>opposite</b> ที่แปลว่า<b>อยู่ตรงข้าม</b> (คนละฝั่งถนน/ทางเดิน)' },

{ label: 'A8', topic: 'Prepositions', t: 'bank',
  q: 'The <b>café</b> is ______ the shop.',
  sub: 'ในกระดาษจริงมี 2 ช่องว่าง — ช่องหลังเติมชื่อร้านอีกร้าน (the shop)',
  fig: Fig.twoShops('café', 'shop', 24),
  bank: PREP, ans: ['next to'],
  steps: ['ร้าน 2 ร้าน<b>ติดกันอยู่ฝั่งเดียวกัน</b> ไม่มีถนนคั่น',
          'อยู่ติดกันด้านข้าง → ใช้ <b>next to</b>'],
  why: '⚠️ ตรงนี้สับสนกับ <b>opposite</b> บ่อย — ให้ดูว่ามี<b>ถนนคั่นกลางไหม</b><br>' +
       'ไม่มีถนนคั่น ติดกันเลย = <b>next to</b> · มีถนนคั่น มองข้ามไป = <b>opposite</b>' },

{ label: 'A9', topic: 'Prepositions', t: 'bank',
  q: 'The <b>museum</b> is ______ the hotel and the church.',
  fig: Fig.threeBuildings(),
  bank: PREP, ans: ['between'],
  steps: ['เห็นคำว่า <b>and</b> อีกแล้ว → มีของ 2 อย่างขนาบ',
          'พิพิธภัณฑ์อยู่<b>ตรงกลาง</b>ระหว่างโรงแรมกับโบสถ์',
          'ตอบ <b>between</b>'],
  why: '⭐ เหมือนข้อ A3 เป๊ะ — <b>เห็น “and” ให้นึกถึง between ทันที</b> สูตรนี้ใช้ได้เกือบ 100%' },

{ label: 'A10', topic: 'Prepositions', t: 'bank',
  q: 'The <b>salon</b> is ______ the bank.',
  fig: Fig.twoShops('salon', 'bank', 90),
  bank: PREP, ans: ['opposite'],
  steps: ['ดูรูป — มี<b>ถนน</b> (เส้นประ) คั่นกลางระหว่างร้านทำผมกับธนาคาร',
          'อยู่<b>คนละฝั่งถนน</b> หันหน้าเข้าหากัน',
          'ตอบ <b>opposite</b> (ตรงข้าม)'],
  why: '⭐ <b>จุดตัดสินของข้อนี้คือ “ถนน”</b> — มีถนนคั่น = <b>opposite</b> · ไม่มีถนนคั่น = <b>next to</b><br>' +
       'เวลาทำข้อสอบให้<b>มองหาเส้นถนนในรูปก่อนเสมอ</b>' },

/* ---------------- Q. DIRECTIONS ---------------- */
{ label: 'Q1', topic: 'บอกทาง & แผนที่', t: 'bank',
  q: '______ on Green Road.',
  sub: 'เริ่มจากจุด S (หน้ายิ้ม) แล้วเดินไปไปรษณีย์ตามเส้นประสีแดง',
  fig: Fig.mapPost(),
  bank: ['Go straight on', 'Turn left', 'Turn right', 'Go past'],
  ans: ['Go straight on'],
  steps: ['ดูเส้นประสีแดง — ช่วงแรกเดิน<b>ตรงไปเรื่อย ๆ</b>ตามถนน Green Road',
          'ยังไม่มีการเลี้ยว → ใช้ <b>Go straight on</b> (เดินตรงไป)'],
  why: '💡 <b>คำบอกทางที่ต้องจำ</b> — <b>Go straight on</b> ตรงไป · <b>Turn left</b> เลี้ยวซ้าย · ' +
       '<b>Turn right</b> เลี้ยวขวา · <b>Go past</b> เดินผ่าน' },

{ label: 'Q2', topic: 'บอกทาง & แผนที่', t: 'bank',
  q: '______ on Brown Road.',
  bank: ['Go straight on', 'Turn left', 'Turn right', 'Go past'],
  ans: ['Turn right'],
  steps: ['เราเดินไปทาง<b>ขวามือ</b>ของแผนที่อยู่ (ทิศตะวันออก)',
          'พอถึง Brown Road เส้นประ<b>หักลงล่าง</b>',
          'ถ้าเราหันหน้าไปทางขวาของแผนที่ แล้วเลี้ยวลงล่าง = <b>เลี้ยวขวา</b>',
          'ตอบ <b>Turn right</b>'],
  why: '⭐ <b>วิธีดูซ้าย–ขวาไม่ให้พลาด</b> — ให้<b>หมุนตัวเองตามทิศที่กำลังเดิน</b>ก่อน ' +
       'อย่าดูจากมุมมองคนอ่านแผนที่ · ลองใช้นิ้วเดินตามเส้นบนจอจริง ๆ แล้วถามว่ามือไหน' },

{ label: 'Q3', topic: 'บอกทาง & แผนที่', t: 'bank',
  q: '______ the hotel.',
  bank: ['Go straight on', 'Turn left', 'Turn right', 'Go past'],
  ans: ['Go past'],
  steps: ['เดินลงมาตาม Brown Road จะ<b>เดินผ่านโรงแรม</b>ที่อยู่ริมถนน',
          'ผ่านไปเฉย ๆ ไม่ได้เลี้ยว ไม่ได้เข้าไป → ใช้ <b>Go past</b>'],
  why: '💡 <b>go past</b> = เดินผ่าน (ผ่านเลยไป) — ใช้กับสถานที่ที่เป็น<b>จุดสังเกตริมทาง</b> ' +
       'เช่น go past the bank, go past the school' },

{ label: 'Q4', topic: 'บอกทาง & แผนที่', t: 'bank',
  q: '______ on Blue Road.',
  bank: ['Go straight on', 'Turn left', 'Turn right', 'Go past'],
  ans: ['Turn right'],
  steps: ['ตอนนี้เรากำลังเดิน<b>ลงล่าง</b>ตาม Brown Road',
          'พอถึง Blue Road เส้นประ<b>หักไปทางขวาของแผนที่</b>',
          'เมื่อหันหน้าลงล่างอยู่ แล้วหักไปทางขวาของจอ = <b>เลี้ยวขวา</b>',
          'ตอบ <b>Turn right</b>'],
  why: '📝 <b>หมายเหตุ</b> — คำบอกทางอาจเขียนได้หลายแบบ ถ้าน้องตอบ “Turn left” ให้ลอง<b>ยืนหมุนตัวจริง ๆ</b> ' +
       'ตามทิศที่เดิน แล้วจะเห็นภาพชัดขึ้นมาก' },

{ label: 'Q5', topic: 'บอกทาง & แผนที่', t: 'bank',
  q: 'The post office is ______',
  bank: ['next to the hospital', 'opposite the school',
         'behind the cinema', 'between the library and the barber'],
  ans: ['next to the hospital'],
  steps: ['หาไปรษณีย์ในแผนที่ก่อน → อยู่<b>แถวล่างสุด ขวาสุด</b>',
          'ดูว่าอะไรอยู่<b>ติดกัน</b> → คือ <b>hospital</b> (โรงพยาบาล)',
          'ตอบ <b>next to the hospital</b>'],
  why: '💡 แถวล่างเรียงกันว่า <b>school → hospital → post office</b> ' +
       'ถ้าถามว่า hospital อยู่ตรงไหน ก็ตอบได้ว่า <b>between the school and the post office</b>' },

/* ---------------- B. CHOOSE ---------------- */
{ label: 'B1', topic: 'ไวยากรณ์ & เสียง', t: 'mc',
  q: 'What time do you <b>get up</b>?',
  fig: Fig.clock(7, 0),
  o: ["I get up at 6 o'clock.", "I get up at 7 o'clock.",
      'I get up at half past 6.', 'I get up at half past 7.'], a: 1,
  steps: ['ดู<b>เข็มยาว</b>ก่อน → ชี้ตรงเลข <b>12</b> พอดี = <b>0 นาที</b> → ต้องใช้คำว่า <b>o’clock</b>',
          'ตัดข้อที่เป็น <b>half past</b> ออกได้ทันที 2 ข้อ (half past = 30 นาที)',
          'ดู<b>เข็มสั้น</b> → ชี้ที่ <b>7</b>',
          "ตอบ <b>I get up at 7 o'clock.</b>"],
  why: '⭐ <b>ทำข้อนาฬิกาให้ดูเข็มยาวก่อนเสมอ</b> เพราะมันตัดตัวเลือกได้ครึ่งหนึ่งทันที<br>' +
       'เข็มยาวชี้ 12 = <b>o’clock</b> · ชี้ 6 = <b>half past</b> · ชี้ 3 = <b>quarter past</b> · ชี้ 9 = <b>quarter to</b>' },

{ label: 'B2', topic: 'ไวยากรณ์ & เสียง', t: 'mc',
  q: 'In the ______ you must be <b>quiet</b>.',
  sub: 'quiet = เงียบ',
  o: ['sports centre', 'barbershop', 'park', 'library'], a: 3,
  steps: ['คิดว่าที่ไหนที่<b>ต้องเงียบ</b>',
          'sports centre (ศูนย์กีฬา) · park (สวนสาธารณะ) → เสียงดังได้ ❌',
          'barbershop (ร้านตัดผม) → คุยกันได้ปกติ ❌',
          '<b>library</b> (ห้องสมุด) → ต้องเงียบ ✅'],
  why: '💡 คำศัพท์สถานที่ที่ออกสอบบ่อย: <b>library</b> ห้องสมุด · <b>barbershop</b> ร้านตัดผม · ' +
       '<b>pharmacy</b> ร้านขายยา · <b>museum</b> พิพิธภัณฑ์ · <b>salon</b> ร้านทำผม' },

{ label: 'B3', topic: 'ไวยากรณ์ & เสียง', t: 'mc',
  q: 'He ______ TV every evening.',
  o: ['washes', 'wash', 'watches', 'watch'], a: 2,
  steps: ['ดูประธานก่อน → <b>He</b> เป็นบุรุษที่ 3 เอกพจน์ (he / she / it)',
          'ประธานพวกนี้ กริยาต้อง<b>เติม s หรือ es</b> → ตัด <b>wash</b> กับ <b>watch</b> ทิ้ง',
          'เหลือ <b>washes</b> กับ <b>watches</b> → ดูความหมาย',
          '<b>wash</b> = ล้าง · <b>watch</b> = ดู → ดูทีวีต้องใช้ <b>watch</b>',
          'ตอบ <b>watches</b>'],
  why: '⭐ <b>ข้อนี้ต้องตอบถูก 2 ชั้น</b> — ชั้นแรกคือไวยากรณ์ (ต้องเติม s/es) ' +
       'ชั้นที่สองคือความหมาย (watch ไม่ใช่ wash)<br>' +
       '💡 กริยาที่ลงท้ายด้วย <b>ch, sh, s, x, o</b> ให้เติม <b>-es</b> → watch<b>es</b> · wash<b>es</b> · go<b>es</b>' },

{ label: 'B4', topic: 'ไวยากรณ์ & เสียง', t: 'mc',
  q: '______ always do homework together.',
  o: ['They', 'Simon', 'Ann', 'My sister'], a: 0,
  steps: ['ดูกริยาในประโยค → เป็น <b>do</b> (ไม่ใช่ does)',
          'กริยาที่<b>ไม่เติม s</b> ต้องคู่กับประธาน<b>พหูพจน์</b> (หลายคน)',
          'Simon · Ann · My sister → คนเดียวทั้งหมด ต้องใช้ <b>does</b> ❌',
          '<b>They</b> = พวกเขา (หลายคน) → ใช้ <b>do</b> ✅',
          'และคำว่า <b>together</b> (ด้วยกัน) ก็บอกอยู่แล้วว่าต้องมีหลายคน'],
  why: '⭐ <b>เทคนิคกลับด้าน</b> — ปกติเราดูประธานแล้วเลือกกริยา แต่ข้อนี้ให้<b>ดูกริยาแล้วเลือกประธาน</b><br>' +
       'เห็น <b>do</b> → หาประธานหลายคน · เห็น <b>does</b> → หาประธานคนเดียว' },

{ label: 'B5', topic: 'ไวยากรณ์ & เสียง', t: 'mc',
  q: 'Which word has the <b>/s/ sound</b> at the end?',
  sub: 'ฟังเสียงตอนท้ายคำ ไม่ใช่ดูตัวสะกด',
  o: ['takes', 'dances', 'plays', 'brushes'], a: 0,
  steps: ['กฎเสียงท้ายคำเมื่อเติม -s / -es มี <b>3 เสียง</b>',
          '<b>take</b> ลงท้ายเสียง <b>k</b> (เสียงไม่ก้อง) → takes อ่านว่า “เท้ค<b>ส</b>” = เสียง <b>/s/</b> ✅',
          '<b>play</b> ลงท้ายเสียงสระ (ก้อง) → plays อ่านว่า “เพล<b>ซ</b>” = เสียง <b>/z/</b> ❌',
          '<b>dance</b> และ <b>brush</b> ลงท้ายเสียงเสียดแทรก → เติม -es อ่านว่า “<b>อิซ</b>” = เสียง <b>/ɪz/</b> ❌',
          'ตอบ <b>takes</b>'],
  why: '⭐ <b>กฎ 3 เสียง จำแบบนี้</b><br>' +
       '1️⃣ ท้ายคำเป็น <b>p, t, k, f</b> (เสียงเบา ๆ ไม่สั่นคอ) → เสียง <b>/s/</b> เช่น takes, stops, hits<br>' +
       '2️⃣ ท้ายคำเป็น <b>s, z, ch, sh, x, ge</b> → เสียง <b>/ɪz/</b> (เพิ่มพยางค์) เช่น dances, brushes, watches<br>' +
       '3️⃣ ที่เหลือทั้งหมด (สระ + เสียงสั่นคอ) → เสียง <b>/z/</b> เช่น plays, reads, goes<br>' +
       '💡 <b>ลองเอามือแตะคอแล้วออกเสียง</b> ถ้าคอสั่น = /z/ ถ้าไม่สั่น = /s/' },

{ label: 'B6', topic: 'บอกทาง & แผนที่', t: 'mc',
  q: 'You should ______ the pharmacy.',
  sub: 'pharmacy = ร้านขายยา',
  fig: Fig.pharmacyArrow(),
  o: ['Turn left', 'Turn right', 'Go past', 'Go straight on'], a: 2,
  steps: ['ดูรูป — ลูกศรพุ่ง<b>ผ่านหน้าร้าน</b>ขายยาไปเลย ไม่ได้เลี้ยวเข้า',
          'ไม่มีการเลี้ยวซ้ายหรือขวา → ตัด 2 ข้อแรกทิ้ง',
          'มีร้านเป็นจุดสังเกตให้ “ผ่าน” → ใช้ <b>Go past</b> ✅'],
  why: '💡 <b>Go past</b> กับ <b>Go straight on</b> ต่างกันตรงนี้ —<br>' +
       '<b>Go past + สถานที่</b> (มีของให้ผ่าน) · <b>Go straight on + ถนน</b> (แค่บอกให้เดินตรงไป)<br>' +
       'ข้อนี้มีคำว่า “the pharmacy” ต่อท้าย จึงต้องใช้ <b>go past</b>' },

{ label: 'B7', topic: 'บอกทาง & แผนที่', t: 'mc',
  q: 'Which statement is <b>NOT-True</b>?',
  sub: 'อ่านแผนที่แล้วหาข้อที่ “ไม่จริง”',
  fig: Fig.mapStreet(),
  o: ['The bank is opposite the flower shop.',
      'The bookstore is next to the supermarket.',
      'The toy store is behind the hospital.',
      'The restaurant is on the corner.'], a: 2,
  steps: ['โจทย์ถามข้อที่ <b>ไม่จริง</b> → ต้องไล่เช็กทีละข้อว่า<b>จริง</b>ไหม',
          'ก. Bank อยู่บน Red Avenue · Flower Shop อยู่ล่าง → คนละฝั่งถนน = <b>opposite จริง</b> ✅',
          'ข. Bookstore กับ Supermarket อยู่<b>ติดกัน</b>แถวเดียวกัน = <b>next to จริง</b> ✅',
          'ง. Restaurant อยู่<b>มุมขวาสุด</b>ของแถวล่าง = <b>on the corner จริง</b> ✅',
          'ค. Toy Store อยู่<b>แถวล่าง</b> ส่วน Hospital อยู่<b>แถวบนสุด</b> มี Red Avenue คั่น → ' +
          '<b>ไม่ได้อยู่หลังกัน</b> = <b>ไม่จริง</b> ❌ → ตอบข้อ ค'],
  why: '⚠️ <b>ข้อ NOT-True คือข้อที่พลาดกันมากที่สุด</b> เพราะเผลออ่านเป็น “ข้อไหนจริง”<br>' +
       '⭐ <b>วิธีทำให้ไม่พลาด</b> — เอาดินสอ<b>ติ๊กถูกข้อที่จริง</b>ไปเรื่อย ๆ แล้วข้อที่<b>ไม่มีติ๊ก</b>คือคำตอบ' },

{ label: 'B8', topic: 'บอกทาง & แผนที่', t: 'mc',
  q: 'The ______ is <b>between</b> music store and restaurant.',
  o: ['hospital', 'toy store', 'supermarket', 'bank'], a: 1,
  steps: ['หา <b>Music Store</b> และ <b>Restaurant</b> ในแผนที่ก่อน → อยู่แถวล่าง',
          'ดูว่าอะไรอยู่<b>ตรงกลาง</b>ระหว่างสองร้านนี้',
          'แถวล่างเรียงว่า Flower Shop → <b>Music Store</b> → <b>Toy Store</b> → <b>Restaurant</b>',
          'ตัวที่อยู่ตรงกลางคือ <b>Toy Store</b> ✅'],
  why: '💡 เทคนิคเดียวกับ prepositions เลย — <b>between = อยู่ตรงกลางระหว่าง 2 สิ่ง</b> ' +
       'ให้หาสองสิ่งที่โจทย์บอกก่อน แล้วดูว่าอะไรอยู่ระหว่างนั้น' },

{ label: 'B9', topic: 'บอกทาง & แผนที่', t: 'mc',
  q: 'The <b>flower shop</b> is ______ of Green Street and Red Street.',
  o: ['next to', 'opposite', 'between', 'on the corner'], a: 3,
  steps: ['สังเกตคำว่า <b>of</b> ที่ตามหลังช่องว่าง — เป็นตัวบอกใบ้สำคัญ',
          'next to / opposite / between ไม่ใช้คู่กับ <b>of</b>',
          'มีแต่ <b>on the corner of ...</b> เท่านั้นที่ใช้ of ได้',
          'และในแผนที่ Flower Shop ก็อยู่<b>ตรงหัวมุม</b>ที่ถนน 2 สายมาบรรจบกันจริง ✅'],
  why: '⭐ <b>เทคนิคดูคำใบ้จากคำข้างเคียง</b><br>' +
       '<b>on the corner <u>of</u></b> A and B = อยู่หัวมุมถนน A ตัดถนน B<br>' +
       '<b>between</b> A <u>and</u> B = อยู่ระหว่าง (ไม่มี of)<br>' +
       'ถ้าจำไม่ได้ ให้ดูว่าหลังช่องว่างมีคำว่า <b>of</b> หรือ <b>and</b>' }

    ]
  };
})();
