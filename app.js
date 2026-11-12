const courses = window.MASHTAB_COURSES;
const KEY = 'masshtab.pwa.v1';
function loadState() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } }
const previous = loadState();
function migrateByChapter(source, courseId, oldPrefix = '') {
  const result = {};
  if (!source || typeof source !== 'object') return result;
  for (const [index, value] of Object.entries(source)) {
    const key = oldPrefix ? `${courseId}:${index.replace(oldPrefix, '')}` : `${courseId}:${index}`;
    result[key] = value;
  }
  return result;
}
function normalizeByChapter(source, courseId = 'big') {
  if (!source || typeof source !== 'object') return {};
  return Object.keys(source).some(key => key.startsWith(`${courseId}:`)) ? source : migrateByChapter(source, courseId);
}
const state = {
  activeTab: previous.activeTab || 'home',
  selectedCourseId: previous.selectedCourseId || 'big',
  activeCourseIds: previous.activeCourseIds || courses.map(item => item.id),
  selectedChapter: previous.selectedChapter || 0,
  chapterProgress: normalizeByChapter(previous.chapterProgress),
  chapterBest: normalizeByChapter(previous.chapterBest),
  cardsReviewedByChapter: normalizeByChapter(previous.cardsReviewedByChapter)
};
const legacyProgress = previous.bookProgress?.big || previous.progress || 0;
if (legacyProgress && state.chapterProgress['big:0'] === undefined) state.chapterProgress['big:0'] = legacyProgress;
const legacyBest = previous.bookBest?.big || previous.bestScore || 0;
if (legacyBest && state.chapterBest['big:0'] === undefined) state.chapterBest['big:0'] = legacyBest;
const legacyCards = previous.cardsReviewedByBook?.big || previous.cardsReviewed || 0;
if (legacyCards && state.cardsReviewedByChapter['big:0'] === undefined) state.cardsReviewedByChapter['big:0'] = legacyCards;
if (!courses.some(item => item.id === state.selectedCourseId)) state.selectedCourseId = courses[0].id;
for (const item of courses) if (!state.activeCourseIds.includes(item.id)) state.activeCourseIds.push(item.id);

const screen = document.querySelector('#screen');
let viewingChapter = false;
let questionIndex = 0;
let selectedAnswer = null;
let answerChecked = false;
let sessionScore = 0;
let cardIndex = 0;
let cardRevealed = false;
let lessonFinished = false;
const currentCourse = () => courses.find(item => item.id === state.selectedCourseId) || courses[0];
const chapterKey = (courseId, index) => `${courseId}:${index}`;
const currentChapter = () => currentCourse().chapters[state.selectedChapter] || currentCourse().chapters[0];
const chapterProgress = (courseId, index) => state.chapterProgress[chapterKey(courseId, index)] || 0;
function save() { localStorage.setItem(KEY, JSON.stringify(state)); }
function courseProgress(courseId) {
  const selected = courses.find(item => item.id === courseId) || courses[0];
  const total = selected.chapters.reduce((sum, _, index) => sum + chapterProgress(courseId, index), 0);
  return Math.round(total / selected.chapters.length * 100);
}
function courseBest(courseId) {
  const selected = courses.find(item => item.id === courseId) || courses[0];
  return Math.max(0, ...selected.chapters.map((_, index) => state.chapterBest[chapterKey(courseId, index)] || 0));
}
function cardsReviewed(courseId) {
  const selected = courses.find(item => item.id === courseId) || courses[0];
  return selected.chapters.reduce((sum, _, index) => sum + (state.cardsReviewedByChapter[chapterKey(courseId, index)] || 0), 0);
}
function setTab(tab) {
  state.activeTab = tab;
  viewingChapter = false;
  lessonFinished = false;
  selectedAnswer = null;
  answerChecked = false;
  render();
  save();
}
function render() {
  document.querySelectorAll('.tab').forEach(button => button.classList.toggle('active', button.dataset.tab === state.activeTab));
  if (state.activeTab === 'home') renderHome();
  if (state.activeTab === 'learn') renderLearn();
  if (state.activeTab === 'review') renderReview();
  if (state.activeTab === 'books') renderBooks();
}
function renderHome() {
  const course = currentCourse(), progress = courseProgress(course.id);
  const cards = courses.map(item => `<button class="continue-card course-home-card" data-open-course="${item.id}">
    <span class="play-icon">▶</span><span class="continue-info"><strong>${item.title}</strong><small>${item.author} · ${item.chapters.length} глав · ${courseProgress(item.id)}%</small></span><span class="chevron">›</span>
  </button>`).join('');
  screen.innerHTML = `<section class="content-page"><div class="eyebrow">ПОНЕМНОГУ — К ЗНАНИЮ</div>
    <h1 class="page-title">Учись применять идеи</h1><p class="subtle">Изучай книги по главам, отвечай на вопросы и возвращайся к карточкам.</p>
    <div class="hero"><div class="hero-label">В ФОКУСЕ · ${course.chapters.length} ГЛАВ</div><h2>${course.title}</h2><div class="hero-author">${course.author}</div><div class="hero-book">▣</div>
      <div class="progress-block"><div class="progress-label"><span>Прогресс книги</span><span>${progress}%</span></div><div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div>
        <div class="progress-caption">${course.chapters.filter((_, index) => chapterProgress(course.id, index) >= 1).length} из ${course.chapters.length} глав пройдено</div></div></div>
    <div class="metric-row"><div class="metric"><div class="metric-top"><span>Лучший результат</span><span class="metric-symbol">★</span></div><strong>${courseBest(course.id)}%</strong><small>по тестам этой книги</small></div>
      <div class="metric"><div class="metric-top"><span>Карточки</span><span class="metric-symbol">✓</span></div><strong>${cardsReviewed(course.id)}</strong><small>вспомнено по книге</small></div></div>
    <div class="section-head"><h3>Все курсы</h3><button class="text-button" data-go="books">Открыть список →</button></div><div class="chapter-list">${cards}</div>
    <div class="note"><b>✦</b><span>У каждого курса свой прогресс. Можно читать несколько книг параллельно и переключаться между ними в любой момент.</span></div>
  </section>`;
  wireOpenCourse(); wireGo();
}
function openCourse(id) {
  state.selectedCourseId = id;
  if (!state.activeCourseIds.includes(id)) state.activeCourseIds.push(id);
  state.selectedChapter = 0;
  state.activeTab = 'learn';
  viewingChapter = false; lessonFinished = false; questionIndex = 0; selectedAnswer = null; answerChecked = false; sessionScore = 0; cardIndex = 0; cardRevealed = false;
  save(); render();
}
function renderLearn() {
  if (viewingChapter) { renderChapter(); return; }
  const course = currentCourse();
  screen.innerHTML = `<section class="content-page"><button class="text-button back-button" id="all-courses">‹ Все книги</button>
    <div class="eyebrow">${course.author}</div><h1 class="page-title">${course.title}</h1>
    <p class="subtle">${course.chapters.length} глав · в каждой краткое объяснение, задание, тест из пяти вопросов и карточки.</p>
    <div class="chapter-list">${course.chapters.map((chapter, index) => {
      const progress = Math.round(chapterProgress(course.id, index) * 100);
      const status = progress >= 100 ? 'Пройдено' : progress > 0 ? `В процессе · ${progress}%` : 'Не начато';
      return `<article class="chapter-card"><div class="chapter-number">${String(index + 1).padStart(2, '0')}</div><div class="chapter-main">
        <div class="chapter-status">ГЛАВА ${index + 1} · ${status}</div><h3>${chapter.title}</h3><div class="chapter-meta">5 вопросов · ${chapter.cards.length} карточки</div>
        <button class="button chapter-action" data-chapter="${index}">${progress > 0 && progress < 100 ? 'Продолжить' : progress === 100 ? 'Повторить тест' : 'Начать главу'}</button>
      </div></article>`;
    }).join('')}</div></section>`;
  document.querySelector('#all-courses').addEventListener('click', () => setTab('books'));
  document.querySelectorAll('[data-chapter]').forEach(button => button.addEventListener('click', () => openChapter(Number(button.dataset.chapter))));
}
function openChapter(index) {
  state.selectedChapter = index; viewingChapter = true; questionIndex = 0; selectedAnswer = null; answerChecked = false; sessionScore = 0; lessonFinished = false; cardIndex = 0; cardRevealed = false;
  save(); renderLearn();
}
function renderChapter() {
  const chapter = currentChapter(), course = currentCourse();
  screen.innerHTML = `<section class="content-page"><button class="text-button back-button" id="back-to-chapters">‹ Все главы</button>
    <div class="eyebrow">${course.title.toUpperCase()} · ГЛАВА ${state.selectedChapter + 1} ИЗ ${course.chapters.length}</div>
    <h1 class="page-title">${chapter.title}</h1><p class="lesson-intro">${chapter.summary}</p>
    <div class="practice-prompt"><span>✎</span><span>${chapter.practice}</span></div>
    ${lessonFinished ? renderFinished(chapter) : renderQuestion(chapter)}
  </section>`;
  document.querySelector('#back-to-chapters').addEventListener('click', () => { viewingChapter = false; lessonFinished = false; renderLearn(); });
  document.querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click', () => { if (!answerChecked) { selectedAnswer = Number(button.dataset.answer); renderChapter(); } }));
  document.querySelector('#check-answer')?.addEventListener('click', checkAnswer);
  document.querySelector('#next-question')?.addEventListener('click', nextQuestion);
  document.querySelector('#repeat-test')?.addEventListener('click', () => openChapter(state.selectedChapter));
  document.querySelector('#finished-chapters')?.addEventListener('click', () => { viewingChapter = false; lessonFinished = false; renderLearn(); });
  document.querySelector('#finished-cards')?.addEventListener('click', () => setTab('review'));
}
function renderQuestion(chapter) {
  const question = chapter.questions[questionIndex];
  return `<div class="question-card"><div class="question-meta"><span>ПРОВЕРЬ СЕБЯ</span><span>${questionIndex + 1} / ${chapter.questions.length}</span></div>
    <div class="mini-track"><i style="width:${((questionIndex + 1) / chapter.questions.length) * 100}%"></i></div><h3>${question.text}</h3>
    ${question.options.map((option, index) => { let style = 'choice'; if (selectedAnswer === index) style += ' selected'; if (answerChecked && index === question.correct) style += ' correct'; else if (answerChecked && index === selectedAnswer) style += ' wrong'; return `<button class="${style}" data-answer="${index}"><span class="choice-dot"></span><span>${option}</span></button>`; }).join('')}
    ${answerChecked ? `<div class="explanation">${question.explanation}</div><button class="button" id="next-question">${questionIndex === chapter.questions.length - 1 ? 'Завершить главу' : 'Следующий вопрос'}</button>` : `<button class="button" id="check-answer" ${selectedAnswer === null ? 'disabled' : ''}>Проверить ответ</button>`}
  </div>`;
}
function renderFinished(chapter) {
  return `<div class="complete-box"><div class="complete-mark">✓</div><h3>Глава завершена</h3><p>Верных ответов: ${sessionScore} из ${chapter.questions.length}. Результат сохранён для этой главы.</p>
    <button class="button" id="finished-cards">Повторить карточки главы</button><div class="button-row"><button class="button secondary" id="repeat-test">Пройти тест ещё раз</button><button class="button secondary" id="finished-chapters">К списку глав</button></div></div>`;
}
function checkAnswer() {
  if (selectedAnswer === null) return;
  const chapter = currentChapter(), question = chapter.questions[questionIndex], key = chapterKey(currentCourse().id, state.selectedChapter);
  answerChecked = true; if (selectedAnswer === question.correct) sessionScore++;
  state.chapterProgress[key] = Math.max(chapterProgress(currentCourse().id, state.selectedChapter), (questionIndex + 1) / chapter.questions.length);
  save(); renderChapter();
}
function nextQuestion() {
  const chapter = currentChapter(), key = chapterKey(currentCourse().id, state.selectedChapter);
  if (questionIndex === chapter.questions.length - 1) {
    lessonFinished = true; state.chapterProgress[key] = 1;
    state.chapterBest[key] = Math.max(state.chapterBest[key] || 0, Math.round(sessionScore / chapter.questions.length * 100));
  } else { questionIndex++; selectedAnswer = null; answerChecked = false; }
  save(); renderChapter();
}
function renderReview() {
  const course = currentCourse(), chapter = currentChapter(), cards = chapter.cards, card = cards[cardIndex % cards.length];
  const options = course.chapters.map((item, index) => `<option value="${index}" ${index === state.selectedChapter ? 'selected' : ''}>Глава ${index + 1}. ${item.title}</option>`).join('');
  screen.innerHTML = `<section class="content-page"><div class="eyebrow">${course.title} · ГЛАВА ${state.selectedChapter + 1}</div><h1 class="page-title">Карточки памяти</h1>
    <p class="subtle">Выбери книгу и главу, вспомни ответ и открой карточку.</p><select class="course-select" id="review-course">${courses.map(item => `<option value="${item.id}" ${item.id === course.id ? 'selected' : ''}>${item.title}</option>`).join('')}</select>
    <select class="chapter-select" id="review-chapter">${options}</select><div class="card-stage"><button class="flashcard" id="flip-card"><span class="flash-icon">${cardRevealed ? '✦' : '?'}</span><span class="flash-text">${cardRevealed ? card[1] : card[0]}</span><span class="flash-hint">${cardRevealed ? 'ОТВЕТ' : 'НАЖМИ, ЧТОБЫ ОТКРЫТЬ'}</span></button></div>
    <div class="card-counter">Карточка ${cardIndex + 1} из ${cards.length} · по этой главе повторено ${state.cardsReviewedByChapter[chapterKey(course.id,state.selectedChapter)] || 0}</div>
    ${cardRevealed ? `<div class="button-row"><button class="button secondary" id="again">↻ &nbsp; Повторить</button><button class="button" id="know">✓ &nbsp; Знаю</button></div>` : ''}
  </section>`;
  document.querySelector('#review-course').addEventListener('change', event => { state.selectedCourseId = event.target.value; state.selectedChapter = 0; cardIndex = 0; cardRevealed = false; save(); renderReview(); });
  document.querySelector('#review-chapter').addEventListener('change', event => { state.selectedChapter = Number(event.target.value); cardIndex = 0; cardRevealed = false; save(); renderReview(); });
  document.querySelector('#flip-card').onclick = () => { cardRevealed = !cardRevealed; renderReview(); };
  document.querySelector('#again')?.addEventListener('click', moveCard);
  document.querySelector('#know')?.addEventListener('click', () => { const key = chapterKey(course.id,state.selectedChapter); state.cardsReviewedByChapter[key] = (state.cardsReviewedByChapter[key] || 0) + 1; save(); moveCard(); });
}
function moveCard() { cardIndex = (cardIndex + 1) % currentChapter().cards.length; cardRevealed = false; renderReview(); }
function renderBooks() {
  screen.innerHTML = `<section class="content-page"><div class="eyebrow">БИБЛИОТЕКА КУРСОВ</div><h1 class="page-title">Выбирай книгу</h1><p class="subtle">Все пять курсов доступны. Можно изучать их параллельно; у каждого свой прогресс.</p>
    <div class="book-list">${courses.map((course,index) => `<article class="book-card"><div class="book-number">${String(index+1).padStart(2,'0')}</div><div class="book-info"><h3>${course.title}</h3><div class="author">${course.author}</div><p>${course.about}</p><span class="status-pill current">${course.chapters.length} глав · ${course.chapters.length * 5} вопросов</span><button class="button book-action" data-open-course="${course.id}">${courseProgress(course.id) ? 'Продолжить курс' : 'Начать курс'}</button></div></article>`).join('')}</div>
  </section>`;
  wireOpenCourse();
}
function wireOpenCourse() { document.querySelectorAll('[data-open-course]').forEach(button => button.addEventListener('click', () => openCourse(button.dataset.openCourse))); }
function wireGo() { document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => setTab(button.dataset.go))); }
document.querySelectorAll('.tab').forEach(button => button.addEventListener('click', () => setTab(button.dataset.tab)));
render();
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('./sw.js').catch(() => {});
