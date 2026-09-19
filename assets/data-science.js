/* ============================================================
   data-science.js — SCIENCE IE · 2nd Quarter REVISION
   Part A 14 ข้อ · Part B ข้อ 15–20 และ 21–25 (รวม 25 คะแนน)
   ============================================================ */
window.DATA_SCIENCE = {
  subject: 'sci',
  title: 'Science IE — 2nd Quarter Revision',
  topics: {
    'สิ่งแวดล้อมและความสะอาด': { link: 'learn.html#clean' },
    'ส่วนต่าง ๆ ของบ้าน':      { link: 'learn.html#house' },
    'ของในห้องเรียน':          { link: 'learn.html#classroom' }
  },
  items: [

{ label: '1', topic: 'สิ่งแวดล้อมและความสะอาด', t: 'mc',
  q: 'Which student is <b>protecting the environment</b>?',
  sub: 'protect = ปกป้อง · environment = สิ่งแวดล้อม',
  o: ['Atom plants the trees.', 'Ben throws the trash on the ground.',
      'James cuts down a tree.', 'Tom leaves the trash in the garden.'], a: 0,
  steps: [
    'อ่านหาคำที่<b>ช่วยให้ดีขึ้น</b> กับคำที่<b>ทำให้แย่ลง</b>',
    '<b>plants the trees</b> = ปลูกต้นไม้ → ช่วยสิ่งแวดล้อม ✅',
    'throws trash on the ground = ทิ้งขยะลงพื้น ❌ · cuts down a tree = ตัดต้นไม้ ❌',
    'leaves the trash = ทิ้งขยะไว้ ❌'
  ],
  why: '💡 <b>คำที่ต้องจำ</b> — <span class="en">plant</span> (ปลูก) ดี · ' +
       '<span class="en">cut down</span> (ตัดทิ้ง) ไม่ดี · <span class="en">throw / leave trash</span> (ทิ้งขยะ) ไม่ดี' },

{ label: '2', topic: 'สิ่งแวดล้อมและความสะอาด', t: 'mc',
  q: 'What can <b>happen</b> if we <b>don’t clean</b> our surroundings?',
  sub: 'surroundings = บริเวณรอบ ๆ ตัวเรา',
  o: ['The surroundings will be beautiful', 'People can get sick',
      'Everyone will be healthy', 'Plants will grow faster'], a: 1,
  steps: [
    'สังเกตคำว่า <b>don’t</b> = ไม่ → ผลที่ตามมาต้องเป็นเรื่อง<b>ไม่ดี</b>',
    'ตัด 3 ข้อที่เป็นเรื่องดีออกทันที (สวย / แข็งแรง / โตเร็ว)',
    'เหลือข้อเดียวที่เป็นเรื่องไม่ดี → <b>People can get sick</b> (คนป่วยได้)'
  ],
  why: '⚠️ <b>เทคนิคทำข้อสอบ</b> — พอเจอคำว่า <b>don’t / not / never</b> ในโจทย์ ' +
       'ให้มองหาตัวเลือกที่เป็น<b>ผลเสีย</b> จะตัดตัวเลือกได้เร็วมาก' },

{ label: '3', topic: 'สิ่งแวดล้อมและความสะอาด', t: 'mc',
  q: 'Where should we <b>throw the rubbish</b>?',
  sub: 'rubbish = ขยะ (อังกฤษ) · trash = ขยะ (อเมริกัน) แปลเหมือนกัน',
  o: ['In the ocean', 'On the ground', 'In the toilet', 'In the trash bin'], a: 3,
  steps: [
    'ขยะต้องไปอยู่ใน<b>ที่ของมัน</b>เท่านั้น',
    'ทะเล / พื้น / ชักโครก → ทำให้สกปรกและอุดตัน ❌',
    'ตอบ <b>In the trash bin</b> = ในถังขยะ ✅'
  ],
  why: '💡 <b>bin</b> = ถัง · <span class="en">trash bin / rubbish bin / dustbin</span> แปลว่าถังขยะเหมือนกันหมด' },

{ label: '4', topic: 'สิ่งแวดล้อมและความสะอาด', t: 'mc',
  q: 'What should you do if the <b>rubbish bin is full</b>?',
  o: ['Leave the rubbish on the desk.', 'Throw the rubbish out the window.',
      'Put the rubbish on the floor.', 'Find another rubbish bin.'], a: 3,
  steps: [
    'ถังเต็ม ≠ ทิ้งที่ไหนก็ได้',
    'วางบนโต๊ะ / โยนออกหน้าต่าง / วางบนพื้น → ยังสกปรกอยู่ดี ❌',
    'ตอบ <b>Find another rubbish bin</b> = หาถังใบอื่น ✅'
  ],
  why: '💡 <b>another</b> = อีกอัน / ใบอื่น — เป็นคำที่ออกสอบบ่อย ให้จำคู่กับ <b>other</b> (อื่น ๆ)' },

{ label: '5', topic: 'สิ่งแวดล้อมและความสะอาด', t: 'mc',
  q: 'What <b>needs to be cleaned</b> in the <b>school bathroom</b>?',
  o: ['The wall', 'The sinks and toilets', 'The mirror', 'The posters'], a: 1,
  steps: [
    'คิดว่าในห้องน้ำอะไร<b>สกปรกง่ายที่สุด</b>และต้องทำความสะอาดทุกวัน',
    '<b>sink</b> = อ่างล้างมือ · <b>toilet</b> = โถส้วม → สองอย่างนี้ต้องทำความสะอาดแน่นอน ✅',
    'กำแพง กระจก โปสเตอร์ ก็ทำความสะอาดได้ แต่<b>ไม่ใช่สิ่งหลัก</b>ของห้องน้ำ'
  ],
  why: '💡 คำศัพท์ห้องน้ำ: <b>sink</b> อ่างล้างมือ · <b>toilet</b> โถส้วม · <b>mirror</b> กระจก · ' +
       '<b>tap</b> ก๊อกน้ำ · <b>soap</b> สบู่' },

{ label: '6', topic: 'สิ่งแวดล้อมและความสะอาด', t: 'mc',
  q: 'Which <b>action</b> helps <b>keep the classroom clean</b>?',
  o: ['Write on the wall.', 'Throw books on the floor.', 'Sweep the floor.',
      'Leave trash under the desk.'], a: 2,
  steps: [
    'หาตัวเลือกที่<b>ทำให้สะอาดขึ้น</b> ไม่ใช่สกปรกขึ้น',
    'เขียนกำแพง / โยนหนังสือ / ทิ้งขยะใต้โต๊ะ → สกปรกทั้งหมด ❌',
    '<b>Sweep the floor</b> = กวาดพื้น ✅'
  ],
  why: '💡 คำกริยาทำความสะอาด: <b>sweep</b> กวาด · <b>mop</b> ถู · <b>wipe</b> เช็ด · ' +
       '<b>dust</b> ปัดฝุ่น · <b>wash</b> ล้าง' },

{ label: '7', topic: 'สิ่งแวดล้อมและความสะอาด', t: 'mc',
  q: 'Who should <b>help keep the school clean</b>?',
  o: ['Everyone in school', 'Only the teachers', 'Plants and animals', 'Only the janitors'], a: 0,
  steps: [
    'สังเกตคำว่า <b>Only</b> (เฉพาะ...เท่านั้น) — มักเป็นตัวเลือกที่<b>แคบเกินไป</b>',
    'โรงเรียนเป็นของ<b>ทุกคน</b> ทุกคนจึงต้องช่วยกัน',
    'ตอบ <b>Everyone in school</b> ✅'
  ],
  why: '⚠️ <b>เทคนิคสำคัญ</b> — ข้อสอบเรื่องความรับผิดชอบ คำตอบมักเป็น <b>Everyone</b> ' +
       'ส่วนตัวเลือกที่ขึ้นต้นด้วย <b>Only</b> มักผิด เพราะจำกัดคนแค่กลุ่มเดียว<br>' +
       '(<b>janitor</b> = ภารโรง)' },

{ label: '8', topic: 'ของในห้องเรียน', t: 'mc',
  q: 'Which of these are the <b>things inside the classroom</b>?',
  o: ['A whiteboard and a pencil', 'A desk and a bus', 'A pen and a car', 'A book and a train'], a: 0,
  steps: [
    'ต้องเป็นของที่อยู่ในห้องเรียน <b>ทั้งสองอย่าง</b> ถึงจะถูก',
    'ข้อ ข — desk อยู่ในห้อง แต่ <b>bus</b> (รถเมล์) ไม่อยู่ ❌',
    'ข้อ ค — pen อยู่ในห้อง แต่ <b>car</b> (รถยนต์) ไม่อยู่ ❌',
    'ข้อ ง — book อยู่ในห้อง แต่ <b>train</b> (รถไฟ) ไม่อยู่ ❌',
    'ข้อ ก — <b>whiteboard</b> (กระดานไวท์บอร์ด) + <b>pencil</b> (ดินสอ) อยู่ในห้องทั้งคู่ ✅'
  ],
  why: '⚠️ <b>กับดักของข้อนี้</b> — ทุกตัวเลือกมีของในห้องเรียน 1 อย่างเสมอ ' +
       'ถ้าอ่านแค่คำแรกจะตอบผิดทันที ต้อง<b>อ่านให้ครบทั้งคู่</b>' },

{ label: '9', topic: 'สิ่งแวดล้อมและความสะอาด', t: 'mc',
  q: 'Why is <b>keeping a home clean</b> everyone’s <b>responsibility</b>?',
  sub: 'responsibility = ความรับผิดชอบ',
  o: ['Skip cleaning completely.', 'Everyone uses the home, so everyone should help care for it.',
      'Only guests need a clean home.', 'Cleaning is only needed once a year.'], a: 1,
  steps: [
    'โจทย์ถาม <b>Why</b> (ทำไม) → คำตอบต้องเป็น<b>เหตุผล</b> ไม่ใช่คำสั่ง',
    'ข้อ ก “ไม่ต้องทำความสะอาดเลย” → ไม่ใช่เหตุผล ❌',
    'ข้อ ค และ ง มีคำว่า <b>Only</b> → แคบเกินไป ❌',
    'ข้อ ข “ทุกคนใช้บ้าน ทุกคนจึงควรช่วยดูแล” → เป็นเหตุผลที่สมเหตุสมผล ✅'
  ],
  why: '💡 เชื่อมกับข้อ 7 ได้เลย — <b>ของที่ทุกคนใช้ ทุกคนต้องช่วยดูแล</b> ทั้งโรงเรียนและบ้าน' },

{ label: '10', topic: 'สิ่งแวดล้อมและความสะอาด', t: 'mc',
  q: 'Which person is showing the <b>best cleaning habit</b>?',
  sub: 'habit = นิสัย',
  o: ['Louise cleans windows with a toy.', 'Tom drops wrapper on the floor.',
      'Jade puts her books away after studying.', 'John leaves his dirty dishes in his room.'], a: 2,
  steps: [
    'หาคนที่ทำให้<b>สะอาดขึ้นจริง</b> และทำอย่าง<b>ถูกวิธี</b>',
    'Louise ใช้<b>ของเล่น</b>เช็ดกระจก → ผิดวิธี ❌',
    'Tom ทำห่อขนมตกพื้น ❌ · John ทิ้งจานสกปรกไว้ในห้อง ❌',
    'Jade <b>เก็บหนังสือเข้าที่หลังอ่านเสร็จ</b> → เป็นนิสัยที่ดี ✅'
  ],
  why: '💡 <b>put ... away</b> = เก็บเข้าที่ (เป็นสำนวน ไม่ได้แปลว่า “วางไกล ๆ”) ' +
       'เจอคำนี้ในข้อสอบบ่อยมาก' },

{ label: '11', topic: 'สิ่งแวดล้อมและความสะอาด', t: 'mc',
  q: 'Which <b>tool</b> do we use to <b>sweep the floor</b>?',
  o: ['Pan', 'Pen', 'Spoon', 'Broom'], a: 3,
  steps: [
    '<b>sweep</b> = กวาด → ต้องใช้ <b>ไม้กวาด</b>',
    'Pan = กระทะ · Pen = ปากกา · Spoon = ช้อน → ใช้กวาดพื้นไม่ได้ ❌',
    '<b>Broom</b> = ไม้กวาด ✅'
  ],
  why: '⚠️ ระวังคำที่<b>เขียนคล้ายกัน</b> — <b>Broom</b> (ไม้กวาด) กับ <b>Room</b> (ห้อง) ' +
       'ต่างกันแค่ตัว B · และ <b>Pan</b> (กระทะ) กับ <b>Pen</b> (ปากกา) ต่างกันแค่สระ' },

{ label: '12', topic: 'สิ่งแวดล้อมและความสะอาด', t: 'mc',
  q: 'Where should we <b>put the trash</b>?',
  o: ['On the chair', 'In the trash bin', 'In the hallway', 'On the floor'], a: 1,
  steps: [
    'เหมือนข้อ 3 เลย — ขยะต้องอยู่ใน<b>ถังขยะ</b>',
    'ตอบ <b>In the trash bin</b> ✅'
  ],
  why: '💡 <b>hallway</b> = ทางเดิน / โถงทางเดิน — เป็นทางที่คนเดินผ่าน ไม่ใช่ที่ทิ้งขยะ' },

{ label: '13', topic: 'ส่วนต่าง ๆ ของบ้าน', t: 'mc',
  q: 'Which <b>room</b> do you use to <b>take a bath or shower</b>?',
  o: ['A dining room', 'A kitchen', 'A bathroom', 'A garage'], a: 2,
  steps: [
    'คำว่า <b>bath</b> (อาบน้ำ) อยู่ในชื่อห้องเลย → <b>bath</b>room',
    'dining room = ห้องอาหาร · kitchen = ครัว · garage = โรงรถ ❌',
    'ตอบ <b>A bathroom</b> ✅'
  ],
  why: '💡 <b>ชื่อห้องส่วนใหญ่บอกหน้าที่ของตัวเอง</b> — bath+room = ห้องอาบน้ำ · ' +
       'bed+room = ห้องนอน · living+room = ห้องนั่งเล่น · dining+room = ห้องกินข้าว' },

{ label: '14', topic: 'ส่วนต่าง ๆ ของบ้าน', t: 'mc',
  q: 'Which one is <b>part of a house</b>?',
  o: ['A chair room', 'A mop room', 'A table room', 'A living room'], a: 3,
  steps: [
    '3 ตัวเลือกแรกเป็นคำที่<b>ไม่มีอยู่จริง</b>ในภาษาอังกฤษ (chair room, mop room, table room)',
    '<b>A living room</b> = ห้องนั่งเล่น เป็นห้องจริงในบ้าน ✅'
  ],
  why: '⚠️ ข้อสอบชอบสร้าง<b>คำปลอม</b>ที่ฟังดูเหมือนจริง ' +
       'ให้ยึดจาก<b>ห้องที่เราเคยได้ยินจริง ๆ</b> เท่านั้น' },

/* ---------------- PART B ---------------- */
{ label: '15-20', topic: 'ส่วนต่าง ๆ ของบ้าน', t: 'list', pts: 6, n: 6,
  q: 'List down at least <b>six (6) parts of a house</b>.',
  sub: 'เขียนเป็นภาษาอังกฤษ บรรทัดละ 1 ห้อง (พิมพ์ไทยก็ได้ แต่ตอนสอบจริงต้องเขียนอังกฤษ)',
  ph: 'ห้องที่',
  pool: [
    ['living room', 'livingroom', 'living-room', 'ห้องนั่งเล่น'],
    ['bedroom', 'bed room', 'ห้องนอน'],
    ['bathroom', 'bath room', 'toilet', 'ห้องน้ำ'],
    ['kitchen', 'ครัว', 'ห้องครัว'],
    ['dining room', 'diningroom', 'ห้องอาหาร', 'ห้องกินข้าว'],
    ['garage', 'โรงรถ'],
    ['garden', 'yard', 'สวน'],
    ['balcony', 'ระเบียง'],
    ['roof', 'หลังคา'],
    ['door', 'ประตู'],
    ['window', 'หน้าต่าง'],
    ['wall', 'กำแพง', 'ผนัง'],
    ['floor', 'พื้น'],
    ['stairs', 'staircase', 'บันได'],
    ['study room', 'ห้องอ่านหนังสือ']
  ],
  steps: [
    'เดินสำรวจบ้านในหัวทีละห้อง แล้วเขียนตามที่เดินผ่าน',
    '<b>ห้องหลัก 5 ห้องที่ต้องจำให้ได้:</b> living room · bedroom · bathroom · kitchen · dining room',
    'ถ้ายังไม่ครบ 6 ให้เติม <b>garage</b> (โรงรถ) หรือ <b>garden</b> (สวน)',
    'ส่วนประกอบอื่นของบ้านก็ตอบได้ เช่น roof · door · window · wall · stairs'
  ],
  why: '💡 <b>เทคนิคจำ 6 ห้องแบบไม่ลืม</b> — นึกเป็นลำดับกิจวัตรประจำวัน:<br>' +
       'ตื่นนอนที่ <b>bedroom</b> → อาบน้ำที่ <b>bathroom</b> → ทำอาหารที่ <b>kitchen</b> → ' +
       'กินข้าวที่ <b>dining room</b> → ดูทีวีที่ <b>living room</b> → ออกไปเอารถที่ <b>garage</b>' },

{ label: '21-25', topic: 'ของในห้องเรียน', t: 'list', pts: 5, n: 5,
  q: 'List at least <b>five (5) things inside the classroom</b>.',
  sub: 'เขียนเป็นภาษาอังกฤษ บรรทัดละ 1 อย่าง',
  ph: 'สิ่งที่',
  pool: [
    ['whiteboard', 'white board', 'board', 'blackboard', 'กระดาน'],
    ['desk', 'โต๊ะเรียน'],
    ['chair', 'เก้าอี้'],
    ['table', 'โต๊ะ'],
    ['book', 'books', 'หนังสือ'],
    ['pen', 'ปากกา'],
    ['pencil', 'ดินสอ'],
    ['eraser', 'rubber', 'ยางลบ'],
    ['ruler', 'ไม้บรรทัด'],
    ['bag', 'schoolbag', 'backpack', 'กระเป๋า'],
    ['clock', 'นาฬิกา'],
    ['door', 'ประตู'],
    ['window', 'หน้าต่าง'],
    ['fan', 'พัดลม'],
    ['light', 'lamp', 'ไฟ', 'หลอดไฟ'],
    ['bin', 'trash bin', 'rubbish bin', 'dustbin', 'ถังขยะ'],
    ['computer', 'คอมพิวเตอร์'],
    ['map', 'แผนที่'],
    ['poster', 'โปสเตอร์'],
    ['notebook', 'สมุด'],
    ['scissors', 'กรรไกร'],
    ['crayon', 'crayons', 'สีเทียน']
  ],
  steps: [
    'นั่งนึกภาพห้องเรียนของตัวเอง แล้ว<b>กวาดสายตาจากหน้าห้องไปหลังห้อง</b>',
    'หน้าห้อง: <b>whiteboard</b> · <b>clock</b> · <b>door</b>',
    'ที่โต๊ะเรา: <b>desk</b> · <b>chair</b> · <b>book</b> · <b>pencil</b> · <b>eraser</b> · <b>ruler</b>',
    'รอบห้อง: <b>window</b> · <b>fan</b> · <b>bin</b> · <b>bag</b>',
    'เลือกมา 5 อย่างที่<b>สะกดได้มั่นใจที่สุด</b>'
  ],
  why: '⚠️ <b>ข้อนี้ได้คะแนนง่ายที่สุดในข้อสอบ</b> เพราะตอบอะไรก็ได้ที่อยู่ในห้องเรียนจริง ๆ<br>' +
       '💡 <b>เคล็ดลับ:</b> เลือกคำ<b>สั้น ๆ ที่สะกดไม่ผิด</b> เช่น pen · book · desk · chair · bag ' +
       'ดีกว่าเสี่ยงเขียน whiteboard แล้วสะกดผิด' }

  ]
};
