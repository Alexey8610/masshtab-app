const book = {
  id: 'big',
  title: 'Искусство мыслить масштабно',
  author: 'Дэвид Дж. Шварц',
  chapters: window.MASHTAB_CURRICULUM
};
const KEY = 'masshtab.pwa.v1';
function loadState() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}
const previous = loadState();
const legacyProgress = previous.bookProgress?.big || previous.progress || 0;
const state = {
  activeTab: previous.activeTab || 'home',
  selectedChapter: Math.min(previous.selectedChapter || 0, book.chapters.length - 1),
  chapterProgress: previous.chapterProgress || (legacyProgress ? {'0': legacyProgress} : {}),
  chapterBest: previous.chapterBest || (previous.bookBest?.big ? {'0': previous.bookBest.big} : previous.bestScore ? {'0': previous.bestScore} : {}),
  cardsReviewedByChapter: previous.cardsReviewedByChapter || {'0': previous.cardsReviewedByBook?.big || previous.cardsReviewed || 0}
};
const screen = document.querySelector('#screen');
let viewingChapter = false;
let questionIndex = 0;
let selectedAnswer = null;
let answerChecked = false;
let sessionScore = 0;
let cardIndex = 0;
let cardRevealed = false;
let lessonFinished = false;

function save() { localStorage.setItem(KEY, JSON.stringify(state)); }
function chapterProgress(index) { return state.chapterProgress[index] || 0; }
function totalProgress() {
  return Math.round(book.chapters.reduce((sum, _, index) => sum + chapterProgress(index), 0) / book.chapters.length * 100);
}
function bestScore() { return Math.max(0, ...Object.values(state.chapterBest)); }
function reviewedCards() { return Object.values(state.cardsReviewedByChapter).reduce((sum, value) => sum + value, 0); }
function currentChapter() { return book.chapters[state.selectedChapter] || book.chapters[0]; }
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
  const progress = totalProgress();
  screen.innerHTML = `<section class="content-page">
    <div class="eyebrow">ПОНЕМНОГУ — К ЗНАНИЮ</div>
    <h1 class="page-title">Учись применять идеи</h1>
    <p class="subtle">Читайте, вспоминайте и превращайте прочитанное в свои действия.</p>
    <div class="hero">
      <div class="hero-label">КУРС · 13 ГЛАВ</div><h2>${book.title}</h2><div class="hero-author">${book.author}</div><div class="hero-book">▣</div>
      <div class="progress-block"><div class="progress-label"><span>Прогресс по книге</span><span>${progress}%</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div>
        <div class="progress-caption">${Object.values(state.chapterProgress).filter(value => value >= 1).length} из ${book.chapters.length} глав пройдено</div>
      </div>
    </div>
    <div class="metric-row">
      <div class="metric"><div class="metric-top"><span>Лучший результат</span><span class="metric-symbol">★</span></div><strong>${bestScore()}%</strong><small>по тестам глав</small></div>
      <div class="metric"><div class="metric-top"><span>Карточки</span><span class="metric-symbol">✓</span></div><strong>${reviewedCards()}</strong><small>вспомнено</small></div>
    </div>
    <div class="section-head"><h3>Твой курс</h3><button class="text-button" data-go="learn">Все главы →</button></div>
    <button class="continue-card" id="continue-course"><span class="play-icon">▶</span><span class="continue-info"><strong>13 глав · 65 вопросов</strong><small>Тесты с пояснениями и карточки к каждой главе</small></span><span class="chevron">›</span></button>
    <div class="note"><b>✦</b><span>Вопросы и объяснения сформулированы специально для обучения. Читай книгу параллельно и отмечай, что хочешь применить.</span></div>
  </section>`;
  document.querySelector('#continue-course').addEventListener('click', () => setTab('learn'));
  wireGo();
}
function renderLearn() {
  if (viewingChapter) { renderChapter(); return; }
  screen.innerHTML = `<section class="content-page"><div class="eyebrow">${book.title}</div><h1 class="page-title">Главы курса</h1><p class="subtle">В каждой главе — короткое объяснение, практическое задание и тест из пяти вопросов.</p>
    <div class="chapter-list">${book.chapters.map((chapter, index) => {
      const progress = Math.round(chapterProgress(index) * 100);
      const status = progress >= 100 ? 'Пройдено' : progress > 0 ? `В процессе · ${progress}%` : 'Не начато';
      return `<article class="chapter-card"><div class="chapter-number">${String(index + 1).padStart(2, '0')}</div><div class="chapter-main"><div class="chapter-status">ГЛАВА ${index + 1} · ${status}</div><h3>${chapter.title}</h3><div class="chapter-meta">5 вопросов · ${chapter.cards.length} карточки</div><button class="button chapter-action" data-chapter="${index}">${progress > 0 && progress < 100 ? 'Продолжить' : progress === 100 ? 'Повторить тест' : 'Начать главу'}</button></div></article>`;
    }).join('')}</div>
  </section>`;
  document.querySelectorAll('[data-chapter]').forEach(button => button.addEventListener('click', () => openChapter(Number(button.dataset.chapter))));
}
function openChapter(index) {
  state.selectedChapter = index;
  viewingChapter = true;
  questionIndex = 0;
  selectedAnswer = null;
  answerChecked = false;
  sessionScore = 0;
  lessonFinished = false;
  cardIndex = 0;
  cardRevealed = false;
  save();
  renderLearn();
}
function renderChapter() {
  const chapter = currentChapter();
  screen.innerHTML = `<section class="content-page"><button class="text-button back-button" id="back-to-chapters">‹ Все главы</button>
    <div class="eyebrow">ГЛАВА ${state.selectedChapter + 1} ИЗ ${book.chapters.length}</div><h1 class="page-title">${chapter.title}</h1>
    <p class="lesson-intro">${chapter.summary}</p><div class="practice-prompt"><span>✎</span><span>${chapter.practice}</span></div>
    ${lessonFinished ? renderFinished(chapter) : renderQuestion(chapter)}
  </section>`;
  document.querySelector('#back-to-chapters').addEventListener('click', () => { viewingChapter = false; lessonFinished = false; renderLearn(); });
  document.querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click', () => {
    if (!answerChecked) { selectedAnswer = Number(button.dataset.answer); renderChapter(); }
  }));
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
    ${question.options.map((option, index) => {
      let style = 'choice';
      if (selectedAnswer === index) style += ' selected';
      if (answerChecked && index === question.correct) style += ' correct';
      else if (answerChecked && index === selectedAnswer) style += ' wrong';
      return `<button class="${style}" data-answer="${index}"><span class="choice-dot"></span><span>${option}</span></button>`;
    }).join('')}
    ${answerChecked ? `<div class="explanation">${question.explanation}</div><button class="button" id="next-question">${questionIndex === chapter.questions.length - 1 ? 'Завершить главу' : 'Следующий вопрос'}</button>` : `<button class="button" id="check-answer" ${selectedAnswer === null ? 'disabled' : ''}>Проверить ответ</button>`}
  </div>`;
}
function renderFinished(chapter) {
  return `<div class="complete-box"><div class="complete-mark">✓</div><h3>Глава завершена</h3>
    <p>Верных ответов: ${sessionScore} из ${chapter.questions.length}. Результат сохранён для этой главы.</p>
    <button class="button" id="finished-cards">Повторить карточки главы</button>
    <div class="button-row"><button class="button secondary" id="repeat-test">Пройти тест ещё раз</button><button class="button secondary" id="finished-chapters">К списку глав</button></div>
  </div>`;
}
function checkAnswer() {
  if (selectedAnswer === null) return;
  const chapter = currentChapter(), question = chapter.questions[questionIndex];
  answerChecked = true;
  if (selectedAnswer === question.correct) sessionScore++;
  state.chapterProgress[state.selectedChapter] = Math.max(chapterProgress(state.selectedChapter), (questionIndex + 1) / chapter.questions.length);
  save();
  renderChapter();
}
function nextQuestion() {
  const chapter = currentChapter();
  if (questionIndex === chapter.questions.length - 1) {
    lessonFinished = true;
    state.chapterProgress[state.selectedChapter] = 1;
    state.chapterBest[state.selectedChapter] = Math.max(state.chapterBest[state.selectedChapter] || 0, Math.round(sessionScore / chapter.questions.length * 100));
  } else {
    questionIndex++;
    selectedAnswer = null;
    answerChecked = false;
  }
  save();
  renderChapter();
}
function renderReview() {
  const chapter = currentChapter(), cards = chapter.cards, card = cards[cardIndex % cards.length];
  const options = book.chapters.map((item, index) => `<option value="${index}" ${index === state.selectedChapter ? 'selected' : ''}>Глава ${index + 1}. ${item.title}</option>`).join('');
  screen.innerHTML = `<section class="content-page"><div class="eyebrow">ПОВТОРЕНИЕ · ГЛАВА ${state.selectedChapter + 1}</div><h1 class="page-title">Карточки памяти</h1>
    <p class="subtle">Выбери главу, вспомни ответ и открой карточку.</p><select class="chapter-select" id="review-chapter">${options}</select>
    <div class="card-stage"><button class="flashcard" id="flip-card"><span class="flash-icon">${cardRevealed ? '✦' : '?'}</span><span class="flash-text">${cardRevealed ? card[1] : card[0]}</span><span class="flash-hint">${cardRevealed ? 'ОТВЕТ' : 'НАЖМИ, ЧТОБЫ ОТКРЫТЬ'}</span></button></div>
    <div class="card-counter">Карточка ${cardIndex + 1} из ${cards.length} · по этой главе повторено ${state.cardsReviewedByChapter[state.selectedChapter] || 0}</div>
    ${cardRevealed ? `<div class="button-row"><button class="button secondary" id="again">↻ &nbsp; Повторить</button><button class="button" id="know">✓ &nbsp; Знаю</button></div>` : ''}
  </section>`;
  document.querySelector('#review-chapter').addEventListener('change', event => {
    state.selectedChapter = Number(event.target.value); cardIndex = 0; cardRevealed = false; save(); renderReview();
  });
  document.querySelector('#flip-card').onclick = () => { cardRevealed = !cardRevealed; renderReview(); };
  document.querySelector('#again')?.addEventListener('click', moveCard);
  document.querySelector('#know')?.addEventListener('click', () => {
    state.cardsReviewedByChapter[state.selectedChapter] = (state.cardsReviewedByChapter[state.selectedChapter] || 0) + 1;
    save(); moveCard();
  });
}
function moveCard() { cardIndex = (cardIndex + 1) % currentChapter().cards.length; cardRevealed = false; renderReview(); }
function renderBooks() {
  screen.innerHTML = `<section class="content-page"><div class="eyebrow">ТЕКУЩИЙ КУРС</div><h1 class="page-title">Моя книга</h1><p class="subtle">Сейчас изучаем одну книгу. Остальные добавим отдельными курсами позже.</p>
    <article class="book-card single-book"><div class="book-number">01</div><div class="book-info"><h3>${book.title}</h3><div class="author">${book.author}</div><p>Курс по всем тринадцати главам: краткие учебные объяснения, тесты и карточки.</p><button class="button book-action" id="open-chapters">Открыть главы</button></div></article>
  </section>`;
  document.querySelector('#open-chapters').addEventListener('click', () => setTab('learn'));
}
function wireGo() { document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => setTab(button.dataset.go))); }
document.querySelectorAll('.tab').forEach(button => button.addEventListener('click', () => setTab(button.dataset.tab)));
render();
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('./sw.js').catch(() => {});
