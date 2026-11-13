/* Flanigan's Training — 8-Day Study Hub
   app.js : the engine. Nothing here is day-specific; all content lives in data/day1.js … day8.js
   Nothing is uploaded anywhere: scores are saved on this device only. */
(function () {
  'use strict';

  var DAYS = window.FLANIGANS_DAYS || {};
  var DAY_NUMS = Object.keys(DAYS).map(Number).sort(function (a, b) { return a - b; });
  var PASS = 80;

  /* mixed tests: midterm covers days 1–4, final covers everything.
     each attempt draws EXAM_QS questions at random, spread fairly across the days */
  var EXAM_IDS = { exam: 1, midterm: 1 };
  var EXAM_QS = { midterm: 50, exam: 60 };
  function examDays(id) {
    return id === 'midterm' ? DAY_NUMS.filter(function (n) { return n <= 4; }) : DAY_NUMS.slice();
  }
  function examBank(id) {
    var want = EXAM_QS[id] || Infinity;
    // shuffle each day's questions, then take turns between days so one big day can't dominate
    var pools = examDays(id).map(function (n) {
      return shuffle((DAYS[n].quiz || []).map(function (q) {
        return { cat: 'Day ' + n + ' — ' + q.cat, q: q.q, opts: q.opts, ans: q.ans, exp: q.exp };
      }));
    });
    var all = [], keep = true;
    while (all.length < want && keep) {
      keep = false;
      for (var i = 0; i < pools.length && all.length < want; i++) {
        if (pools[i].length) { all.push(pools[i].shift()); keep = true; }
      }
    }
    return shuffle(all);
  }
  function cardsList(id) {
    if (!EXAM_IDS[id]) return (DAYS[id] && DAYS[id].cards) || [];
    var out = [];
    examDays(id).forEach(function (n) { out.push.apply(out, DAYS[n].cards || []); });
    return out;
  }
  function sheetList(id) {
    if (!EXAM_IDS[id]) return (DAYS[id] && DAYS[id].sheet) || [];
    var out = [];
    examDays(id).forEach(function (n) {
      (DAYS[n].sheet || []).forEach(function (g) { out.push({ group: 'Day ' + n + ' — ' + g.group, items: g.items }); });
    });
    return out;
  }

  var view = document.getElementById('view');
  var nav = document.getElementById('nav');
  var brandTitle = document.getElementById('brand-title');
  var brandSub = document.getElementById('brand-sub');

  /* ---------------- icons ---------------- */
  var I = {
    home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
    quiz: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z',
    cards: 'M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z',
    guide: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z',
    star: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
    shuffle: 'M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z',
    left: 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z',
    right: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
    flip: 'M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z',
    print: 'M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z',
    home_btn: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'
  };
  function svg(path) { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + path + '"/></svg>'; }

  /* ---------------- helpers ---------------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function store(key, val) { try { if (val === undefined) localStorage.removeItem(key); else localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* private mode: scores just won't be remembered */ } }
  function read(key) { try { var v = localStorage.getItem(key); return v === null ? null : JSON.parse(v); } catch (e) { return null; } }
  function bestKey(id) { return 'fg_best_' + id; }
  function bestOf(id) { var b = read(bestKey(id)); return (typeof b === 'number' && isFinite(b)) ? b : null; }
  function saveBest(id, pct) { var b = bestOf(id); if (b === null || pct > b) store(bestKey(id), pct); }

  function counts(id) {
    if (EXAM_IDS[id]) { var t = { quiz: 0, cards: 0, study: 0 }; examDays(id).forEach(function (n) { var c = counts(n); t.quiz += c.quiz; t.cards += c.cards; t.study += c.study; }); return t; }
    var d = DAYS[id]; if (!d) return null;
    var study = 0;
    (d.sheet || []).forEach(function (g) { study += (g.items || []).length; });
    return { quiz: (d.quiz || []).length, cards: (d.cards || []).length, study: study };
  }
  /* mixed tests: Midterm = Days 1–4, Final = every day */
  function labelOf(id) {
    if (id === 'exam') return { num: 'FINAL', title: 'Final Practice Exam', pages: 'All 8 days mixed', blurb: 'A fresh random ' + EXAM_QS.exam + '-question mix drawn from Day 1 through Day 8 — retake for a new draw' };
    if (id === 'midterm') return { num: 'MIDTERM', title: 'Midterm Practice Exam', pages: 'Days 1–4 mixed', blurb: 'A fresh random ' + EXAM_QS.midterm + '-question mix drawn from Day 1 through Day 4 — retake for a new draw' };
    return DAYS[id];
  }
  function bankFor(id) {
    if (EXAM_IDS[id]) return examBank(id);
    return (DAYS[id] && DAYS[id].quiz) || [];
  }

  /* ---------------- sessions (kept in memory while you browse) ---------------- */
  var quiz = null;   // { id, items, i, score, answered, missed, mode }
  var cards = null;  // { id, order, i, flipped }
  var guide = null;  // { id, filter }

  /* ---------------- routing ---------------- */
  var route = { id: null, tab: 'quiz' };

  function go(hash) { if (location.hash === hash) { render(); } else { location.hash = hash; } }

  function parseHash() {
    var h = (location.hash || '').replace(/^#\/?/, '');
    var m = h.match(/^day\/(\d+)\/(quiz|cards|guide)/);
    if (m) { var n = Number(m[1]); if (DAYS[n]) { route = { id: n, tab: m[2] }; return; } }
    if (h === 'day' ) { route = { id: null, tab: 'home' }; return; }
    var m2 = h.match(/^(exam|midterm)(?:\/(quiz|cards|guide))?$/);
    if (m2) { route = { id: m2[1], tab: m2[2] || 'quiz' }; return; }
    route = { id: null, tab: 'home' };
  }

  function openDay(id, tab) { go('#/' + (typeof id === 'string' ? id : 'day/' + id) + '/' + (tab || 'quiz')); }
  function home() { go('#/'); }

  /* ---------------- header + nav ---------------- */
  function paintChrome() {
    var lab = labelOf(route.id);
    brandTitle.textContent = 'FLANIGAN’S';
    if (lab) brandSub.textContent = (EXAM_IDS[route.id] ? '' : 'Day ' + route.id + ' — ') + lab.title;
    else brandSub.textContent = '8-Day Training Study Hub';

    var tabs = route.id
      ? [['Home', I.home, null], ['Quiz', I.quiz, 'quiz'], ['Cards', I.cards, 'cards'], ['Guide', I.guide, 'guide']]
      : [['Home', I.home, null], ['Midterm', I.star, 'midterm'], ['Final Exam', I.star, 'exam']];

    nav.innerHTML = tabs.map(function (t) {
      var label = t[0], icon = t[1], tab = t[2];
      var active = (tab === null && !route.id) || (route.id && tab === route.tab);
      return '<button class="nav-btn' + (active ? ' active' : '') + '" data-nav="' + (tab === null ? 'home' : tab) + '">' +
        svg(icon) + '<span>' + esc(label) + '</span></button>';
    }).join('');

    Array.prototype.forEach.call(nav.querySelectorAll('[data-nav]'), function (b) {
      b.addEventListener('click', function () {
        var t = b.getAttribute('data-nav');
        if (t === 'home') home();
        else if (t === 'exam' || t === 'midterm') go('#/' + t + '/quiz');
        else openDay(route.id, t);
      });
    });
  }

  /* ---------------- HOME ---------------- */
  function renderHome() {
    var totalQ = 0, totalC = 0, totalS = 0;
    DAY_NUMS.forEach(function (n) { var c = counts(n); totalQ += c.quiz; totalC += c.cards; totalS += c.study; });

    var cardsHtml = DAY_NUMS.map(function (n) {
      var d = DAYS[n], c = counts(n), best = bestOf(n);
      return '' +
        '<button class="day-card" data-open="' + n + '">' +
          '<span class="day-num">DAY ' + n + '</span>' +
          '<h3>' + esc(d.title) + '</h3>' +
          '<div class="pages">' + esc(d.pages) + '</div>' +
          '<div class="blurb">' + esc(d.blurb) + '</div>' +
          '<div class="counts">' +
            '<span class="count-chip">' + c.quiz + ' quiz qs</span>' +
            '<span class="count-chip">' + c.cards + ' flashcards</span>' +
            '<span class="count-chip">' + c.study + ' study points</span>' +
          '</div>' +
          '<div class="best' + (best === null ? ' no' : '') + '">' +
            (best === null ? 'No practice score yet' : 'Best practice score: ' + best + '%') +
          '</div>' +
        '</button>';
    }).join('');

    var examBest = bestOf('exam');
    var midBest = bestOf('midterm'), mc = counts('midterm');
    view.innerHTML =
      '<section class="hero">' +
        '<h2>Study. Review. Test yourself.</h2>' +
        '<p>Pick a training day below: read the study guide, drill the flashcards, then take the practice quiz. ' +
        'You need ' + PASS + '% to pass a day. Nothing here goes online — your scores stay on this device.</p>' +
      '</section>' +
      '<div class="panel">' +
        '<p class="panel-title">Training Days</p>' +
        '<div class="day-grid">' +
          cardsHtml +
          '<button class="day-card exam-card" data-open="midterm">' +
            '<span class="day-num">MIDTERM</span>' +
            '<h3>Days 1 – 4 Mixed</h3>' +
            '<div class="pages">Midterm • Days 1 – 4</div>' +
            '<div class="blurb">' + esc(labelOf('midterm').blurb) + '</div>' +
            '<div class="counts"><span class="count-chip">' + Math.min(EXAM_QS.midterm, mc.quiz) + ' random qs drawn from ' + mc.quiz + '</span></div>' +
            '<div class="best' + (midBest === null ? ' no' : '') + '">' +
              (midBest === null ? 'No practice score yet' : 'Best practice score: ' + midBest + '%') +
            '</div>' +
          '</button>' +
          '<button class="day-card exam-card" data-open="exam">' +
            '<span class="day-num">FINAL EXAM</span>' +
            '<h3>All 8 Days Mixed</h3>' +
            '<div class="pages">Final • Days 1 – 8</div>' +
            '<div class="blurb">' + esc(labelOf('exam').blurb) + '</div>' +
            '<div class="counts"><span class="count-chip">' + Math.min(EXAM_QS.exam, totalQ) + ' random qs drawn from ' + totalQ + '</span></div>' +
            '<div class="best' + (examBest === null ? ' no' : '') + '">' +
              (examBest === null ? 'No practice score yet' : 'Best practice score: ' + examBest + '%') +
            '</div>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<p class="hint">Everything on this site comes straight from the Flanigan’s training manual pages listed on each day card (' +
        totalQ + ' practice questions, ' + totalC + ' flashcards, ' + totalS + ' study points across ' + DAY_NUMS.length + ' days).</p>';

    Array.prototype.forEach.call(view.querySelectorAll('[data-open]'), function (el) {
      el.addEventListener('click', function () {
        var v = el.getAttribute('data-open');
        if (EXAM_IDS[v]) go('#/' + v + '/quiz'); else openDay(Number(v), 'quiz');
      });
    });
  }

  /* ---------------- day header strip ---------------- */
  function stripHtml(id) {
    var d = labelOf(id), c = counts(id);
    return '<div class="day-strip">' +
      '<span class="num">' + (id === 'exam' ? 'FINAL' : id === 'midterm' ? 'MIDTERM' : 'DAY ' + id) + '</span>' +
      '<div class="t"><h2>' + esc(d.title) + '</h2>' +
      '<div class="pages">' + esc(d.pages) + (c ? ' • ' + (EXAM_IDS[id] ? Math.min(EXAM_QS[id], c.quiz) + ' random of ' + c.quiz + ' quiz qs' : c.quiz + ' quiz qs') + ' • ' + c.cards + ' cards • ' + c.study + ' study points' : '') + '</div>' +
      '</div></div>';
  }

  /* ---------------- QUIZ ---------------- */
  function freshSession(id, items) {
    // clear any remembered answer order so every attempt shuffles again
    items.forEach(function (q) { q._opts = null; });
    return { id: id, mode: 'quiz', items: items, i: 0, score: 0, answered: false, missed: [] };
  }
  function newQuiz(id) { quiz = freshSession(id, shuffle(bankFor(id))); }
  function newReview() { quiz = freshSession(quiz.id, shuffle(quiz.missed)); quiz.mode = 'review'; }

  function renderQuiz() {
    var id = route.id;
    if (!quiz || quiz.id !== id) newQuiz(id);
    quiz.answered = false;
    quiz.items.forEach(function (q) { q._opts = null; });

    var q = quiz.items[quiz.i];
    var total = quiz.items.length;
    var done = quiz.i >= total;

    if (done) { view.innerHTML = stripHtml(id) + '<div class="panel">' + resultsHtml() + '</div>'; wireQuiz(); return; }

    // build the option list once per question so the order is stable while answering
    if (!q._opts) {
      q._opts = shuffle(q.opts.map(function (t, idx) { return { t: t, ok: idx === q.ans }; }));
    }
    var letters = ['A', 'B', 'C', 'D', 'E'];

    view.innerHTML = stripHtml(id) +
      '<div class="panel">' +
        '<div class="quiz-stats">' +
          '<span id="q-count">Question ' + (quiz.i + 1) + ' of ' + total + '</span>' +
          '<span class="score-badge" id="q-score">' + scoreText() + '</span>' +
        '</div>' +
        '<div class="progress"><i id="q-bar"></i></div>' +
        '<span class="q-cat">' + esc(q.cat) + '</span>' +
        '<p class="q-text" id="q-text">' + esc(q.q) + '</p>' +
        '<div class="options" id="q-opts">' +
          q._opts.map(function (o, i) {
            return '<button class="opt" data-pick="' + i + '">' +
              '<span class="key">' + letters[i] + '</span><span>' + esc(o.t) + '</span></button>';
          }).join('') +
        '</div>' +
        '<div class="feedback" id="q-fb"></div>' +
        '<div class="btn-row">' +
          '<button class="btn ghost" id="q-quit">Back to Home</button>' +
          (quiz.mode === 'quiz' ? '<button class="btn ghost" id="q-shuffle">' + svg(I.shuffle) + ' Shuffle Quiz</button>' : '') +
          '<button class="btn" id="q-next" disabled>' + (quiz.i + 1 === total ? 'See Results' : 'Next Question') + '</button>' +
        '</div>' +
        (quiz.mode === 'review'
          ? '<p class="hint">Review mode: these are the ones you missed. This round does not change your best score.</p>'
          : '<p class="hint">Question and answer order shuffle every attempt — and Shuffle Quiz mixes them again mid-quiz.</p>') +
      '</div>';

    document.getElementById('q-bar').style.width = Math.round((quiz.i / total) * 100) + '%';
    wireQuiz();
  }

  function scoreText() {
    var answeredCount = quiz.i + (quiz.answered ? 1 : 0);
    if (!answeredCount) return 'Score: 0 of ' + quiz.items.length;
    var pct = Math.round((quiz.score / answeredCount) * 100);
    return 'Score: ' + quiz.score + ' / ' + answeredCount + ' (' + pct + '%)';
  }

  function wireQuiz() {
    var quit = document.getElementById('q-quit'); if (quit) quit.addEventListener('click', home);
    var sh = document.getElementById('q-shuffle'); if (sh) sh.addEventListener('click', function () { newQuiz(quiz.id); renderQuiz(); window.scrollTo(0, 0); });
    var next = document.getElementById('q-next'); if (next) next.addEventListener('click', function () { quiz.i++; renderQuiz(); window.scrollTo(0, 0); });

    Array.prototype.forEach.call(view.querySelectorAll('[data-pick]'), function (btn) {
      btn.addEventListener('click', function () { pick(Number(btn.getAttribute('data-pick'))); });
    });
    Array.prototype.forEach.call(view.querySelectorAll('[data-missed]'), function (btn) {
      btn.addEventListener('click', function () { newReview(); renderQuiz(); window.scrollTo(0, 0); });
    });
    Array.prototype.forEach.call(view.querySelectorAll('[data-retake]'), function (btn) {
      btn.addEventListener('click', function () { newQuiz(quiz.id); renderQuiz(); window.scrollTo(0, 0); });
    });
    Array.prototype.forEach.call(view.querySelectorAll('[data-home]'), function (btn) {
      btn.addEventListener('click', home);
    });
  }

  function pick(i) {
    if (quiz.answered) return;
    quiz.answered = true;
    var q = quiz.items[quiz.i];
    var chosen = q._opts[i];
    var correctIdx = -1;
    q._opts.forEach(function (o, k) { if (o.ok) correctIdx = k; });

    var btns = view.querySelectorAll('[data-pick]');
    Array.prototype.forEach.call(btns, function (b, k) {
      b.disabled = true;
      if (q._opts[k].ok) b.classList.add('correct');
      else if (k === i) b.classList.add('wrong');
    });

    if (chosen.ok) quiz.score++;
    else quiz.missed.push(q);

    var fb = document.getElementById('q-fb');
    fb.className = 'feedback show ' + (chosen.ok ? 'ok' : 'bad');
    fb.innerHTML = '<b>' + (chosen.ok ? 'CORRECT' : 'NOT QUITE — right answer is ' + ['A', 'B', 'C', 'D', 'E'][correctIdx]) + '</b>' +
      '<div>' + esc(chosen.ok ? '' : q._opts[correctIdx].t + '  ') + esc(q.exp || '') + '</div>';
    document.getElementById('q-score').textContent = scoreText();
    var next = document.getElementById('q-next'); next.disabled = false;
  }

  function resultsHtml() {
    var total = quiz.items.length;
    var pct = Math.round((quiz.score / total) * 100);
    var passed = pct >= PASS;

    if (quiz.mode === 'quiz') saveBest(quiz.id, pct);

    var head = quiz.mode === 'review'
      ? '<div class="verdict pass">Review round complete</div><div class="big ' + (passed ? 'pass' : 'fail') + '">' + pct + '%</div>' +
        '<p class="detail">You got ' + quiz.score + ' of ' + total + ' missed questions right on the second pass.</p>'
      : '<div class="verdict ' + (passed ? 'pass' : 'fail') + '">' +
          (passed ? '&#10004; Practice passed — ready for manager review' : '&#9888; Under the ' + PASS + '% practice benchmark') +
        '</div>' +
        '<div class="big ' + (passed ? 'pass' : 'fail') + '">' + pct + '%</div>' +
        '<p class="detail">' + quiz.score + ' correct out of ' + total + '. Best score on this device: ' + bestOf(quiz.id) + '%.</p>';

    var missedHtml = '';
    if (quiz.missed.length) {
      missedHtml = '<div class="missed-list"><p class="panel-title">Review these ' + quiz.missed.length + ' missed question' + (quiz.missed.length === 1 ? '' : 's') + '</p>' +
        quiz.missed.map(function (m) {
          return '<div class="missed-item"><strong>' + esc(m.q) + '</strong>' +
            '<div class="a">&#10004; ' + esc(m.opts[m.ans]) + '</div>' +
            (m.exp ? '<div class="e">' + esc(m.exp) + '</div>' : '') +
            '</div>';
        }).join('') + '</div>';
    }

    return '<div class="results">' + head +
      '<div class="btn-row">' +
        '<button class="btn ghost" data-retake>' + (quiz.mode === 'review' ? 'Review Again' : 'Retake Quiz') + '</button>' +
        (quiz.missed.length ? '<button class="btn green" data-missed>Drill My ' + quiz.missed.length + ' Missed</button>' : '') +
        '<button class="btn" data-home>Back to Home</button>' +
      '</div>' + missedHtml + '</div>';
  }

  /* ---------------- FLASHCARDS ---------------- */
  function renderCards() {
    var id = route.id, list = cardsList(id);
    if (!cards || cards.id !== id) cards = { id: id, order: list.map(function (_, i) { return i; }), i: 0, flipped: false };
    var n = cards.order.length;
    if (!n) { view.innerHTML = stripHtml(id) + '<div class="panel">' + (EXAM_IDS[id] ? 'No flashcards for these days yet.' : 'No flashcards for this day yet.') + '</div>'; return; }
    if (cards.i >= n) cards.i = n - 1;

    var c = list[cards.order[cards.i]];
    view.innerHTML = stripHtml(id) +
      '<div class="panel">' +
        '<div class="card-counter" id="c-count">Card ' + (cards.i + 1) + ' of ' + n + '</div>' +
        '<div class="flashcard' + (cards.flipped ? ' back' : '') + '" id="card">' +
          '<span class="face-tag">' + (cards.flipped ? 'ANSWER' : 'TERM') + ' • ' + esc(c.cat) + '</span>' +
          (cards.flipped
            ? '<h3>' + esc(c.title) + '</h3><div class="body">' + c.body + '</div>'
            : '<h3>' + esc(c.title) + '</h3><div class="muted" style="font-size:0.9rem">' + esc(c.cat) + '</div>') +
          '<div class="flip-hint">' + (cards.flipped ? 'Tap the card to see the term' : 'Tap the card to flip it') + '</div>' +
        '</div>' +
        '<div class="btn-row">' +
          '<button class="btn ghost" id="c-prev">&#9664; Prev</button>' +
          '<button class="btn green" id="c-flip">Flip</button>' +
          '<button class="btn ghost" id="c-next">Next &#9654;</button>' +
        '</div>' +
        '<div class="btn-row">' +
          '<button class="btn ghost" id="c-shuffle">Shuffle Deck</button>' +
          '<button class="btn ghost" id="c-print">Print Cards</button>' +
        '</div>' +
      '</div>';

    document.getElementById('card').addEventListener('click', flip);
    document.getElementById('c-flip').addEventListener('click', flip);
    document.getElementById('c-prev').addEventListener('click', function () { step(-1); });
    document.getElementById('c-next').addEventListener('click', function () { step(1); });
    document.getElementById('c-shuffle').addEventListener('click', function () {
      cards.order = shuffle(cards.order); cards.i = 0; cards.flipped = false; renderCards();
    });
    document.getElementById('c-print').addEventListener('click', printCards);
  }
  function flip() { cards.flipped = !cards.flipped; renderCards(); }
  function step(d) {
    var last = cards.order.length - 1;
    var next = cards.i + d;
    if (next < 0) next = last;
    if (next > last) next = 0;
    cards.i = next; cards.flipped = false; renderCards();
  }
  function printCards() {
    var list = cardsList(route.id);
    var what = typeof route.id === 'number' ? 'Day ' + route.id : labelOf(route.id).title;
    var w = window.open('', '_blank');
    if (!w) { alert('Your browser blocked the print window.'); return; }
    w.document.write('<!DOCTYPE html><html><head><title>Flanigan’s ' + esc(what) + ' flashcards</title>' +
      '<style>body{font-family:Arial,Helvetica,sans-serif;padding:14px;color:#111}h4{margin:0 0 4px}.tag{color:#553300;font-size:11px;font-weight:bold;text-transform:uppercase}p{margin:3px 0;font-size:13px}.c{border:1px solid #bbb;border-radius:8px;padding:10px;margin-bottom:10px;page-break-inside:avoid}strong{color:#553300}</style></head><body>' +
      '<h3>Flanigan’s ' + esc(what) + ' — flashcards (' + list.length + ')</h3>' +
      list.map(function (c) {
        return '<div class="c"><div class="tag">' + esc(c.cat) + '</div><h4>' + esc(c.title) + '</h4>' + c.body + '</div>';
      }).join('') + '</body></html>');
    w.document.close(); w.focus();
    setTimeout(function () { w.print(); }, 250);
  }

  /* ---------------- STUDY GUIDE ---------------- */
  function renderGuide() {
    var id = route.id, groups = sheetList(id);
    if (!guide || guide.id !== id) guide = { id: id, filter: '' };
    var f = guide.filter.trim().toLowerCase();

    var body = '';
    var shown = 0;
    groups.forEach(function (g) {
      var items = (g.items || []).filter(function (it) {
        if (!f) return true;
        var hay = [g.group, it.name, it.tag, it.spec, it.desc].concat((it.extra || []).map(function (e) { return e.label + ' ' + e.text; })).join(' ').toLowerCase();
        return hay.indexOf(f) !== -1;
      });
      if (!items.length) return;
      shown += items.length;
      body += '<div class="sheet-group"><h3>' + esc(g.group) + '</h3>' +
        items.map(function (it) {
          var extras = (it.extra || []).filter(function (e) { return e.text; }).map(function (e) {
            return '<p class="x"><strong>' + esc(e.label) + ':</strong> ' + esc(e.text) + '</p>';
          }).join('');
          return '<div class="sheet-item">' +
            '<div class="row1"><h4>' + esc(it.name) + '</h4>' + (it.tag ? '<span class="tag">' + esc(it.tag) + '</span>' : '') + '</div>' +
            (it.spec ? '<p class="spec">' + esc(it.spec) + '</p>' : '') +
            (it.desc ? '<p class="desc">' + esc(it.desc) + '</p>' : '') +
            extras + '</div>';
        }).join('') + '</div>';
    });

    var totalStudy = 0;
    groups.forEach(function (g) { totalStudy += (g.items || []).length; });

    view.innerHTML = stripHtml(id) +
      '<div class="panel">' +
        '<p class="panel-title">Study Guide — ' + totalStudy + ' points' + (f ? ' • showing ' + shown : '') + '</p>' +
        '<input class="search" id="g-search" type="text" placeholder="Search ' + (EXAM_IDS[id] ? 'these days' : 'this day') + ': dish names, portions, rules…" value="' + esc(guide.filter) + '">' +
        (shown ? body : '<p class="no-hits">Nothing ' + (EXAM_IDS[id] ? 'in these days' : 'on this day') + ' matches “' + esc(guide.filter) + '”.</p>') +
      '</div>' +
      '<div class="btn-row"><button class="btn ghost" id="g-print">' + svg(I.print) + ' Print this study guide</button></div>';

    var si = document.getElementById('g-search');
    si.addEventListener('input', function () {
      guide.filter = si.value;
      var pos = si.selectionStart;
      renderGuide();
      var ns = document.getElementById('g-search');
      ns.focus(); try { ns.setSelectionRange(pos, pos); } catch (e) {}
    });
    document.getElementById('g-print').addEventListener('click', function () { window.print(); });
  }

  /* ---------------- keyboard shortcuts (flashcards) ---------------- */
  document.addEventListener('keydown', function (e) {
    if (route.tab !== 'cards' || !cards) return;
    var t = (e.target || {}).tagName;
    if (t === 'INPUT' || t === 'TEXTAREA') return;
    if (e.key === 'ArrowRight') { step(1); }
    else if (e.key === 'ArrowLeft') { step(-1); }
    else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
  });

  /* ---------------- boot ---------------- */
  function render() {
    parseHash();
    paintChrome();
    if (!route.id) renderHome();
    else if (route.tab === 'quiz') renderQuiz();
    else if (route.tab === 'cards') renderCards();
    else renderGuide();
  }
  window.addEventListener('hashchange', render);
  render();
})();
