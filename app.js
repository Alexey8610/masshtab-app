const courses = [
  {
    id: 'big', title: 'Искусство мыслить масштабно', author: 'Дэвид Дж. Шварц',
    about: 'Цели, уверенность и привычка искать возможности.',
    lesson: 'Думай о возможностях',
    intro: 'Большая цель становится ближе, когда ты переводишь её в конкретные действия. Сосредоточься на том, что можно попробовать, чему научиться и какой шаг сделать первым.',
    practice: 'Запиши одну цель и самый маленький шаг, который можно сделать сегодня.',
    questions: [
      {q:'Что помогает превратить большую цель в движение?',a:['Ждать идеального момента','Сформулировать ближайший конкретный шаг','Сравнивать себя с другими'],correct:1,why:'Маленькое конкретное действие делает цель выполнимой и помогает начать.'},
      {q:'Как полезнее реагировать на ошибку?',a:['Считать её доказательством, что не получится','Разобрать, чему она учит, и скорректировать подход','Скрыть её и ничего не менять'],correct:1,why:'Ошибка может дать информацию для следующей попытки.'},
      {q:'Что лучше всего поддерживает уверенность?',a:['Только позитивные мысли','Подготовка, практика и готовность действовать','Отказ от сложных задач'],correct:1,why:'Уверенность укрепляется опытом действий и подготовкой.'},
      {q:'Как применить идею роста на практике?',a:['Выбрать навык и регулярно тренировать его','Сразу требовать от себя совершенства','Избегать обратной связи'],correct:0,why:'Регулярная практика превращает намерение в развиваемый навык.'},
      {q:'Какой вопрос помогает перейти от мечты к плану?',a:['Почему это слишком трудно?','Какой следующий шаг я могу сделать сегодня?','Кто уже сделал это лучше меня?'],correct:1,why:'Вопрос о ближайшем шаге возвращает внимание к действию.'}
    ],
    cards: [['Что помогает начать движение к большой цели?','Определить один выполнимый шаг и сделать его сегодня.'],['Как превратить неудачу в пользу?','Посмотреть, какую информацию она дала, и изменить следующий подход.'],['Из чего складывается уверенность?','Из подготовки, практики и готовности пробовать.']]
  },
  {
    id: 'mindset', title: 'Гибкое сознание', author: 'Кэрол Дуэк',
    about: 'Как отношение к способностям влияет на обучение и развитие.', lesson: 'Способности можно развивать',
    intro: 'Навык не обязан быть дан от природы. Практика, стратегии и обратная связь помогают постепенно осваивать новое. Ошибка может подсказать, что попробовать иначе.',
    practice: 'Выбери навык, который хочешь развить, и запиши одну небольшую практику на эту неделю.',
    questions: [
      {q:'Что отличает установку на развитие?',a:['Убеждение, что способности можно развивать','Ожидание, что всё должно получаться сразу','Отказ от незнакомых задач'],correct:0,why:'Такой взгляд направляет внимание на обучение, практику и новые стратегии.'},
      {q:'Что полезно сделать после ошибки?',a:['Решить, что таланта нет','Найти, чему она учит, и попробовать другой подход','Избегать подобных задач'],correct:1,why:'Разбор ошибки помогает выбрать следующий способ действия.'},
      {q:'Какая похвала лучше поддерживает обучение?',a:['«Ты просто гений»','«Ты приложил усилия и нашёл хороший способ»','«Тебе повезло»'],correct:1,why:'Похвала конкретной стратегии и усилий помогает замечать, что именно сработало.'}
    ],
    cards: [['Что значит установка на развитие?','Верить, что навыки и способности могут меняться благодаря обучению и практике.'],['Что спросить себя после ошибки?','Чему она меня научила и что я попробую по-другому?'],['Что отмечать вместо «я талантлив»?','Конкретное усилие, стратегию или прогресс, который помог справиться.']]
  },
  {
    id: 'habits', title: 'Атомные привычки', author: 'Джеймс Клир',
    about: 'Небольшие изменения и привычки, которые поддерживают цели.', lesson: 'Маленькие шаги складываются',
    intro: 'Повторяемое маленькое действие может стать частью повседневности. Чтобы привычку было легче начать, привяжи её к знакомому событию и заранее подготовь удобную среду.',
    practice: 'Выбери полезное действие на две минуты и реши, после какого привычного дела будешь его выполнять.',
    questions: [
      {q:'Как проще закрепить новую привычку?',a:['Начать с очень большого плана','Связать маленькое действие с уже привычным событием','Полагаться только на вдохновение'],correct:1,why:'Знакомое событие служит напоминанием и снижает усилие на старте.'},
      {q:'Что помогает сделать полезное действие доступнее?',a:['Заранее подготовить нужные вещи','Спрятать всё необходимое','Оставить план неопределённым'],correct:0,why:'Подготовленная среда упрощает переход к действию.'},
      {q:'На чём сосредоточиться в начале?',a:['На идеальном результате','На повторении небольшого действия','На сравнении с чужим темпом'],correct:1,why:'Сначала важно закрепить повторение; результат приходит со временем.'}
    ],
    cards: [['Как начать новую привычку?','Сделать действие небольшим и привязать его к знакомому событию.'],['Как среда помогает привычке?','Убирает лишние препятствия и напоминает о выбранном действии.'],['Что важнее для старта: масштаб или повторение?','Регулярное повторение посильного действия.']]
  },
  {
    id: 'seven', title: '7 навыков высокоэффективных людей', author: 'Стивен Кови',
    about: 'Приоритеты, личная ответственность и принципы эффективных действий.', lesson: 'Начинай с важного',
    intro: 'Эффективность начинается с ясного понимания того, что для тебя важно. Когда приоритеты определены, легче планировать неделю и выбирать действия, которые приближают к долгосрочным целям.',
    practice: 'Запиши одну важную для тебя роль или цель и выдели для неё время на этой неделе.',
    questions: [
      {q:'С чего начать, чтобы действовать осознанно?',a:['Определить важное направление','Сразу согласиться на все просьбы','Заполнить день случайными делами'],correct:0,why:'Ясное направление помогает выбирать действия, которые действительно важны.'},
      {q:'Как проявляется личная ответственность?',a:['Ждать, что другие всё решат','Выбирать свой следующий ответ и действие','Обвинять обстоятельства'],correct:1,why:'Можно не контролировать всё вокруг, но можно выбирать собственный следующий шаг.'},
      {q:'Как уделить время приоритету?',a:['Надеяться, что останется свободная минута','Запланировать его заранее','Откладывать до идеального дня'],correct:1,why:'Важные дела легче выполнить, если заранее выделить для них место в расписании.'}
    ],
    cards: [['Как приоритет помогает планированию?','Он даёт критерий, по которому можно выбирать, чему уделить время.'],['Что в моей власти, даже когда не всё зависит от меня?','Мой следующий ответ и действие.'],['Как поддержать важную цель?','Заранее выделить для неё конкретное время.']]
  },
  {
    id: 'thinkrich', title: 'Думай и богатей', author: 'Наполеон Хилл',
    about: 'Классический взгляд на постановку целей, настойчивость и стремление к успеху.', lesson: 'Намерение и план',
    intro: 'Желание становится полезным ориентиром, когда сформулировано ясно и связано с планом действий. Регулярно возвращайся к цели, проверяй шаги и при необходимости уточняй маршрут.',
    practice: 'Сформулируй цель одним предложением и запиши ближайшее действие, которое поможет её проверить на практике.',
    questions: [
      {q:'Что помогает превратить намерение в план?',a:['Ясно сформулированная цель и конкретные шаги','Одно лишь ожидание успеха','Частая смена целей'],correct:0,why:'Цель становится практичнее, когда у неё есть выполнимые шаги и способ действовать.'},
      {q:'Что делать, если выбранный способ не сработал?',a:['Отказаться от цели без разбора','Оценить результат и скорректировать план','Повторять то же самое, не меняя подход'],correct:1,why:'Настойчивость может сочетаться с гибкостью в выборе средств.'},
      {q:'Зачем периодически пересматривать цель?',a:['Чтобы проверить движение и уточнить действия','Чтобы усложнить её без причины','Чтобы сравнить себя с окружающими'],correct:0,why:'Проверка помогает видеть прогресс и принимать обоснованные решения о следующих шагах.'}
    ],
    cards: [['Что превращает намерение в действие?','Ясная цель, конкретный план и ближайший выполнимый шаг.'],['Что означает настойчивость на практике?','Продолжать двигаться к цели и менять способ, если факты показывают, что он не работает.'],['Зачем проверять план?','Чтобы замечать прогресс и выбирать подходящие следующие действия.']]
  }
];
// Keep one course available for this iPhone-first version. Future courses can be enabled here.
const availableCourseIds = new Set(['big']);
const availableCourses = courses.filter(book => availableCourseIds.has(book.id));

const KEY = 'masshtab.pwa.v1';
function readState() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}
const previous = readState();
const state = {
  activeBooks: (previous.activeBooks || ['big']).filter(id => availableCourseIds.has(id)),
  selectedBook: availableCourseIds.has(previous.selectedBook) ? previous.selectedBook : 'big',
  bookProgress: previous.bookProgress || {big: previous.progress || 0},
  bookBest: previous.bookBest || {big: previous.bestScore || 0},
  cardsReviewedByBook: previous.cardsReviewedByBook || (previous.cardsReviewed ? {big: previous.cardsReviewed} : {}),
  activeTab: previous.activeTab || 'home'
};
if (!state.activeBooks.includes('big')) state.activeBooks.unshift('big');
let screen = document.querySelector('#screen');
let selected = null, checked = false, score = 0, questionIndex = 0, cardIndex = 0, revealed = false, finished = false;
const course = () => availableCourses.find(book => book.id === state.selectedBook) || availableCourses[0];
const progressOf = id => state.bookProgress[id] || 0;
const reviewedTotal = () => availableCourses.reduce((sum, book) => sum + (state.cardsReviewedByBook[book.id] || 0), 0);
const bestTotal = () => Math.max(0, ...availableCourses.map(book => state.bookBest[book.id] || 0));
function save() { localStorage.setItem(KEY, JSON.stringify(state)); }
function setTab(tab) { state.activeTab = tab; selected = null; checked = false; finished = false; render(); save(); }
function render() {
  document.querySelectorAll('.tab').forEach(button => button.classList.toggle('active', button.dataset.tab === state.activeTab));
  if (state.activeTab === 'home') home();
  if (state.activeTab === 'learn') learn();
  if (state.activeTab === 'review') review();
  if (state.activeTab === 'books') library();
}
function home() {
  const book = course(), pct = Math.round(progressOf(book.id) * 100);
  const activeCards = state.activeBooks.map(id => availableCourses.find(item => item.id === id)).filter(Boolean).map(item => {
    const p = Math.round(progressOf(item.id) * 100);
    return `<button class="continue-card" data-open-book="${item.id}"><span class="play-icon">▶</span><span class="continue-info"><strong>${item.title}</strong><small>${p ? `Прогресс ${p}%` : 'Начать первый урок'}</small></span><span class="chevron">›</span></button>`;
  }).join('');
  screen.innerHTML = `<section class="content-page"><div class="eyebrow">ПОНЕМНОГУ — К ЗНАНИЮ</div><h1 class="page-title">Учись применять идеи</h1><p class="subtle">Читайте, вспоминайте и превращайте прочитанное в свои действия.</p><div class="hero"><div class="hero-label">ТЕКУЩИЙ КУРС · ОДНА КНИГА</div><h2>${book.title}</h2><div class="hero-author">${book.author}</div><div class="hero-book">▣</div><div class="progress-block"><div class="progress-label"><span>Прогресс книги</span><span>${pct}%</span></div><div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div><div class="progress-caption">${book.lesson}</div></div></div><div class="metric-row"><div class="metric"><div class="metric-top"><span>Лучший результат</span><span class="metric-symbol">★</span></div><strong>${bestTotal()}%</strong><small>по тестам</small></div><div class="metric"><div class="metric-top"><span>Карточки</span><span class="metric-symbol">✓</span></div><strong>${reviewedTotal()}</strong><small>вспомнено</small></div></div><div class="section-head"><h3>Мой курс</h3><button class="text-button" data-go="books">Открыть книгу →</button></div><div class="book-list active-book-list">${activeCards}</div><div class="note"><b>✦</b><span>Сейчас в приложении одна книга. Остальные добавим отдельными курсами позже.</span></div></section>`;
  wireOpenBook(); wireGo();
}
function learn() {
  const book = course(), questions = book.questions;
  screen.innerHTML = `<section class="content-page"><button class="text-button back-button" data-go="books">‹ Все книги</button><div class="eyebrow">${book.title}</div><h1 class="page-title">${book.lesson}</h1><p class="lesson-intro">${book.intro}</p><div class="practice-prompt"><span>✎</span><span>${book.practice}</span></div>${finished ? finishView(book, questions) : quizView(questions)}</section>`;
  document.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => { if (!checked) { selected = Number(button.dataset.choice); learn(); } }));
  document.querySelector('#check-answer')?.addEventListener('click', () => checkAnswer(questions));
  document.querySelector('#next-question')?.addEventListener('click', () => nextQuestion(book, questions));
  document.querySelector('#restart')?.addEventListener('click', restartQuiz);
  document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => setTab(button.dataset.go)));
}
function quizView(questions) {
  const q = questions[questionIndex];
  return `<div class="question-card"><div class="question-meta"><span>ПРОВЕРЬ СЕБЯ</span><span>${questionIndex + 1} / ${questions.length}</span></div><div class="mini-track"><i style="width:${((questionIndex + 1) / questions.length) * 100}%"></i></div><h3>${q.q}</h3>${q.a.map((answer, i) => { let cls = 'choice'; if (selected === i) cls += ' selected'; if (checked && i === q.correct) cls += ' correct'; else if (checked && i === selected) cls += ' wrong'; return `<button class="${cls}" data-choice="${i}"><span class="choice-dot"></span><span>${answer}</span></button>`; }).join('')}${checked ? `<div class="explanation">${q.why}</div><button class="button" id="next-question">${questionIndex === questions.length - 1 ? 'Завершить урок' : 'Следующий вопрос'}</button>` : `<button class="button" id="check-answer" ${selected === null ? 'disabled' : ''}>Проверить ответ</button>`}</div>`;
}
function finishView(book, questions) { return `<div class="complete-box"><div class="complete-mark">✓</div><h3>Урок завершён</h3><p>Верных ответов: ${score} из ${questions.length}. Карточки помогут закрепить идеи.</p><button class="button" id="restart">Пройти ещё раз</button><button class="button secondary finish-books" data-go="books">Выбрать другую книгу</button></div>`; }
function checkAnswer(questions) {
  if (selected === null) return;
  checked = true;
  if (selected === questions[questionIndex].correct) score++;
  const book = course();
  state.bookProgress[book.id] = Math.max(progressOf(book.id), (questionIndex + 1) / questions.length);
  save(); learn();
}
function nextQuestion(book, questions) {
  if (questionIndex === questions.length - 1) {
    finished = true;
    state.bookBest[book.id] = Math.max(state.bookBest[book.id] || 0, Math.round(score / questions.length * 100));
  } else { questionIndex++; selected = null; checked = false; }
  save(); learn();
}
function restartQuiz() { questionIndex = 0; selected = null; checked = false; score = 0; finished = false; learn(); }
function review() {
  const book = course(), cards = book.cards, card = cards[cardIndex % cards.length];
  screen.innerHTML = `<section class="content-page"><div class="eyebrow">${book.title}</div><h1 class="page-title">Карточки памяти</h1><p class="subtle">Вспомни ответ, затем нажми на карточку.</p><div class="card-stage"><button class="flashcard" id="flip-card"><span class="flash-icon">${revealed ? '✦' : '?'}</span><span class="flash-text">${revealed ? card[1] : card[0]}</span><span class="flash-hint">${revealed ? 'ОТВЕТ' : 'НАЖМИ, ЧТОБЫ ОТКРЫТЬ'}</span></button></div><div class="card-counter">Карточка ${cardIndex + 1} из ${cards.length} · по этой книге повторено ${state.cardsReviewedByBook[book.id] || 0}</div>${revealed ? `<div class="button-row"><button class="button secondary" id="again">↻ &nbsp; Повторить</button><button class="button" id="know">✓ &nbsp; Знаю</button></div>` : ''}<button class="text-button back-button" data-go="books">‹ Выбрать другую книгу</button></section>`;
  document.querySelector('#flip-card').onclick = () => { revealed = !revealed; review(); };
  document.querySelector('#again')?.addEventListener('click', moveCard);
  document.querySelector('#know')?.addEventListener('click', () => { state.cardsReviewedByBook[book.id] = (state.cardsReviewedByBook[book.id] || 0) + 1; save(); moveCard(); });
  document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => setTab(button.dataset.go)));
}
function moveCard() { cardIndex = (cardIndex + 1) % course().cards.length; revealed = false; review(); }
function library() {
  screen.innerHTML = `<section class="content-page"><div class="eyebrow">ТЕКУЩИЙ КУРС</div><h1 class="page-title">Моя книга</h1><p class="subtle">Пока здесь одна книга. Остальные добавим позже, отдельными курсами.</p><div class="book-list">${availableCourses.map((book, i) => {
    const active = state.activeBooks.includes(book.id), pct = Math.round(progressOf(book.id) * 100);
    return `<article class="book-card"><div class="book-number">${String(i + 1).padStart(2, '0')}</div><div class="book-info"><h3>${book.title}</h3><div class="author">${book.author}</div><p>${book.about}</p>${active ? `<span class="status-pill current">${pct === 100 ? 'Урок пройден' : pct ? `В изучении · ${pct}%` : 'Выбрана для изучения'}</span><button class="button book-action" data-open-book="${book.id}">Продолжить</button>` : `<button class="button book-action" data-start-book="${book.id}">Начать изучение</button>`}</div></article>`;
  }).join('')}</div></section>`;
  wireOpenBook();
  document.querySelectorAll('[data-start-book]').forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.startBook;
    if (!state.activeBooks.includes(id)) state.activeBooks.push(id);
    openBook(id);
  }));
}
function openBook(id) { state.selectedBook = id; state.activeTab = 'learn'; questionIndex = 0; selected = null; checked = false; score = 0; finished = false; cardIndex = 0; revealed = false; save(); render(); }
function wireOpenBook() { document.querySelectorAll('[data-open-book]').forEach(button => button.addEventListener('click', () => openBook(button.dataset.openBook))); }
function wireGo() { document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => setTab(button.dataset.go))); }
document.querySelectorAll('.tab').forEach(button => button.addEventListener('click', () => setTab(button.dataset.tab)));
render();
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('./sw.js').catch(() => {});
