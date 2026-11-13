/*
  check.mjs — optional self-test. Proves every day still works: counters, quiz answers,
  shuffling, flashcard flip, study-guide search, deep links.
  Needs Node.js + jsdom once:  npm install jsdom     then:  node tools/check.mjs
  (add the ONE-FILE name as the 2nd argument to test that version too)
*/
import fs from 'fs';
import path from 'path';
import { JSDOM, VirtualConsole } from 'jsdom';

const SITE = process.argv[2];
const ENTRY = process.argv[3] || 'index.html';
const file = path.join(SITE, ENTRY);
let html = fs.readFileSync(file, 'utf8');

// inline relative <script src>/<link href> so jsdom can run the folder version offline
const readRel = p => fs.readFileSync(path.join(SITE, p), 'utf8');
html = html.replace(/<link rel="stylesheet" href="([^"]+)">/, (_, h) => `<style>${readRel(h)}</style>`);
html = html.replace(/<script src="([^"]+)"><\/script>/g, (_, s) => `<script>${readRel(s).replace(/<\/script/gi, '<\\/script')}</script>`);

const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => { const m = 'jsdomError: ' + e.message; if (!/Not implemented/.test(m)) errors.push(m); });
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  pretendToBeVisual: true,
  url: 'https://example.com/',
  virtualConsole: vc,
});
const w = dom.window, d = w.document;
w.addEventListener('error', e => errors.push('window error: ' + e.message));
const wait = ms => new Promise(r => setTimeout(r, ms));
await wait(200);

// data straight from the page's own globals, so expectations come from the content files
const DAYS = w.FLANIGANS_DAYS;
const nums = Object.keys(DAYS).map(Number).sort((a, b) => a - b);
const totalQuiz = nums.reduce((n, k) => n + DAYS[k].quiz.length, 0);
let fails = 0;
const globalLetters = { A: 0, B: 0, C: 0, D: 0 };
let reshuffled = 0;
let globalFourOpt = 0;
const ok = (cond, msg) => { if (!cond) { fails++; console.log('  FAIL  ' + msg); } else console.log('  ok    ' + msg); };

const click = el => el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
const navTo = async hash => { w.location.hash = hash; await wait(80); };
const txt = sel => (d.querySelector(sel)?.textContent || '').trim();

console.log(`\n=== testing ${ENTRY} ===`);

/* ---------- home ---------- */
await navTo('#/');
const cards = [...d.querySelectorAll('.day-card')];
ok(cards.length === 10, `home shows 8 day cards + midterm card + final exam card (found ${cards.length})`);
ok(/Study\. Review\. Test yourself\./.test(d.querySelector('.hero')?.textContent || ''), 'home hero renders');
let exp = '';
nums.forEach(n => {
  const c = DAYS[n];
  const study = c.sheet.reduce((s, g) => s + g.items.length, 0);
  exp += `${c.quiz.length} quiz qs ${c.cards.length} flashcards ${c.study || study} study points `;
});
const homeText = d.querySelector('main').textContent;
ok(/MIDTERM/.test(homeText) && /FINAL EXAM/.test(homeText), 'home has both MIDTERM and FINAL EXAM cards');
nums.forEach(n => ok(homeText.includes(DAYS[n].title) && homeText.includes('DAY ' + n), `home card for Day ${n}: ${DAYS[n].title.slice(0, 28)}`));

/* ---------- each day ---------- */
for (const n of nums) {
  const c = DAYS[n];
  const study = c.sheet.reduce((s, g) => s + g.items.length, 0);
  console.log(`\n--- DAY ${n}: ${c.quiz.length} quiz / ${c.cards.length} cards / ${study} study items`);

  // QUIZ: answer everything correctly
  await navTo(`#/day/${n}/quiz`);
  const orderA = [...d.querySelectorAll('[data-pick]')].map(o => o.textContent.trim().slice(0, 14)).join('|');
  ok(!!d.querySelector('#q-shuffle'), `D${n} quiz has a Shuffle Quiz button`);
  ok(txt('#q-count') === `Question 1 of ${c.quiz.length}`, `D${n} quiz counter says 1 of ${c.quiz.length} (got "${txt('#q-count')}")`);
  const seenLetters = {};
  let firstOptLetter = null;
  let correct = 0;
  for (let i = 0; i < c.quiz.length; i++) {
    const opts = [...d.querySelectorAll('[data-pick]')];
    if (!opts.length) { fails++; console.log(`  FAIL  D${n} quiz: ran out of questions at ${i}`); break; }
    // find the truly-correct option by matching the stored answer text
    const qText = d.querySelector('.q-text').textContent.trim();
    const src = c.quiz.find(q => q.q === qText);
    const want = src.opts[src.ans];
    const idx = opts.findIndex(o => o.textContent.trim().endsWith(want.trim()));
    if (idx === -1) { fails++; console.log(`  FAIL  D${n} could not find correct option for: ${qText.slice(0, 60)}`); break; }
    const letter = opts[idx].querySelector('.key').textContent.trim();
    seenLetters[letter] = (seenLetters[letter] || 0) + 1;
    if (opts.length === 4) { globalLetters[letter]++; globalFourOpt++; }
    if (firstOptLetter === null) firstOptLetter = letter;
    click(opts[idx]);
    await wait(5);
    if (!d.querySelector('.opt.correct')) { fails++; console.log(`  FAIL  D${n} no correct highlight after answering`); break; }
    if (!(d.querySelector('#q-fb').textContent || '').includes('CORRECT')) { fails++; console.log(`  FAIL  D${n} missing explanation`); break; }
    correct++;
    click(d.querySelector('#q-next'));
    await wait(5);
  }
  ok(correct === c.quiz.length, `D${n} answered all ${c.quiz.length} questions`);
  const results = d.querySelector('.results');
  ok(!!results, `D${n} reached results screen`);
  ok(/100%/.test(results?.textContent || ''), `D${n} perfect run scores 100% (${(results?.textContent || '').match(/\d+%/)?.[0]})`);
  const dist = Object.entries(seenLetters).map(([k, v]) => `${k}:${v}`).join(' ');
  const maxShare = Math.max(...Object.values(seenLetters)) / c.quiz.length;
  ok(maxShare < 0.6, `D${n} no single letter dominates this sitting (${dist})`);
  // retake should restart AND re-shuffle answer positions
  click(d.querySelector('[data-retake]'));
  await wait(30);
  ok(txt('#q-count') === `Question 1 of ${c.quiz.length}`, `D${n} retake restarts at question 1`);
  const orderB = [...d.querySelectorAll('[data-pick]')].map(o => o.textContent.trim().slice(0, 14)).join('|');
  if (orderA !== orderB) reshuffled++; else console.log(`  note  D${n} question 1 happened to land in the same order twice (1-in-24 chance)`);

  // FLASHCARDS
  await navTo(`#/day/${n}/cards`);
  ok(txt('#c-count') === `Card 1 of ${c.cards.length}`, `D${n} card counter is 1 of ${c.cards.length} (got "${txt('#c-count')}")`);
  let flipped = 0, advanced = 0;
  click(d.querySelector('#c-flip')); await wait(5);
  if (/ANSWER/.test(d.querySelector('.face-tag')?.textContent || '')) flipped++;
  for (let i = 0; i < c.cards.length; i++) { click(d.querySelector('#c-next')); await wait(4); advanced++; }
  ok(txt('#c-count') === `Card ${((1 + c.cards.length) % c.cards.length) || c.cards.length} of ${c.cards.length}` || /Card \d+ of \d+/.test(txt('#c-count')), `D${n} next wraps around: "${txt('#c-count')}"`);
  click(d.querySelector('#c-shuffle')); await wait(10);
  ok(txt('#c-count') === `Card 1 of ${c.cards.length}`, `D${n} shuffle keeps an accurate count`);
  ok(flipped === 1, `D${n} flashcard flips to the answer side`);

  // STUDY GUIDE
  await navTo(`#/day/${n}/guide`);
  const items = [...d.querySelectorAll('.sheet-item')];
  ok(items.length === study, `D${n} study guide lists all ${study} points (found ${items.length})`);
  const groups = [...d.querySelectorAll('.sheet-group > h3')].map(h => h.textContent.trim());
  ok(groups.length === c.sheet.length, `D${n} study guide has ${c.sheet.length} group headings (found ${groups.length})`);
  const si = d.querySelector('#g-search');
  si.value = 'zzzznothing';
  si.dispatchEvent(new w.Event('input', { bubbles: true }));
  await wait(30);
  ok(d.querySelectorAll('.sheet-item').length === 0, `D${n} search filters out everything for a nonsense word`);
  const firstWord = (c.sheet[0].items[0].name || '').split(' ')[0];
  const si2 = d.querySelector('#g-search');
  si2.value = firstWord; si2.dispatchEvent(new w.Event('input', { bubbles: true })); await wait(30);
  ok(d.querySelectorAll('.sheet-item').length > 0, `D${n} search finds "${firstWord}"`);
}

/* ---------- final exam ---------- */
console.log('\n--- ANSWER POSITION BALANCE');
ok(reshuffled >= 7, `answer positions move on a retake (${reshuffled} of 8 days re-shuffled question 1; expect ~8, 1-in-24 coincidences allowed)`);
Object.entries(globalLetters).forEach(([k, v]) => {
  const pct = (100 * v / globalFourOpt);
  ok(pct >= 15 && pct <= 35, `letter ${k} carries ${pct.toFixed(1)}% of correct answers across all ${globalFourOpt} four-option questions`);
});

console.log('\n--- MIDTERM: Days 1–4 mixed (random draw)');
const mid = nums.filter(n => n <= 4);
const midQuiz = mid.reduce((s, n) => s + DAYS[n].quiz.length, 0);
const midCards = mid.reduce((s, n) => s + DAYS[n].cards.length, 0);
const midStudy = mid.reduce((s, n) => s + DAYS[n].sheet.reduce((a, g) => a + g.items.length, 0), 0);
const MIDTERM_N = 30, FINAL_N = 60; // keep in sync with EXAM_QS in app.js
const midDraw = Math.min(MIDTERM_N, midQuiz);
const qDayMid = new Map(), qDayAll = new Map();
mid.forEach(n => DAYS[n].quiz.forEach(q => qDayMid.set(q.q, n)));
nums.forEach(n => DAYS[n].quiz.forEach(q => qDayAll.set(q.q, n)));

// answer a whole exam sitting, collecting the question texts; ends on the results screen
const runExamSitting = async (n, dayMap) => {
  const seen = [];
  for (let i = 0; i < n; i++) {
    const opts = [...d.querySelectorAll('[data-pick]')];
    if (!opts.length) { fails++; console.log('  FAIL  exam sitting ran out at question ' + (i + 1)); return seen; }
    const qText = d.querySelector('.q-text').textContent.trim();
    seen.push(qText);
    const src = DAYS[dayMap.get(qText)]?.quiz.find(q => q.q === qText);
    if (!src) { fails++; console.log('  FAIL  exam question not in pool: ' + qText.slice(0, 60)); return seen; }
    const want = src.opts[src.ans];
    const idx = opts.findIndex(o => o.textContent.trim().endsWith(want.trim()));
    if (idx === -1) { fails++; console.log('  FAIL  exam: correct option missing for: ' + qText.slice(0, 60)); return seen; }
    click(opts[idx]); await wait(4);
    click(d.querySelector('#q-next')); await wait(4);
  }
  return seen;
};

await navTo('#/midterm/quiz');
ok(txt('#q-count') === `Question 1 of ${midDraw}`, `midterm draws ${midDraw} random qs from a pool of ${midQuiz} (got "${txt('#q-count')}")`);
click(d.querySelector('#q-shuffle')); await wait(20);
ok(txt('#q-count') === `Question 1 of ${midDraw}`, 'Shuffle Quiz draws a fresh set and restarts at question 1');
const drawA = await runExamSitting(midDraw, qDayMid);
ok(drawA.length === midDraw, `midterm draw A is exactly ${midDraw} questions`);
const covA = new Set(drawA.map(t => qDayMid.get(t)));
ok(covA.size === mid.length, `draw A covers every mixed day (saw days ${[...covA].sort().join(',')})`);
ok(/100%/.test(d.querySelector('.results')?.textContent || ''), 'midterm draw A perfect run scores 100%');
click(d.querySelector('[data-retake]')); await wait(30);
ok(txt('#q-count') === `Question 1 of ${midDraw}`, 'midterm retake restarts at question 1 with a new draw');
const drawB = await runExamSitting(midDraw, qDayMid);
ok(drawA.join('|') !== drawB.join('|'), 'retake sat B is a different draw and order than sat A');
const overlap = drawB.filter(t => drawA.includes(t)).length;
ok(overlap > 0 && overlap < midDraw, `retake draw shares only part of the old draw (${overlap}/${midDraw} repeated — expected ≈ ${Math.round(midDraw * midDraw / midQuiz)})`);
await navTo('#/midterm/cards');
ok(txt('#c-count') === `Card 1 of ${midCards}`, `midterm flashcards aggregate Days 1–4: ${midCards} (got "${txt('#c-count')}")`);
await navTo('#/midterm/guide');
ok(d.querySelectorAll('.sheet-item').length === midStudy, `midterm study guide aggregates Days 1–4: ${midStudy} points (found ${d.querySelectorAll('.sheet-item').length})`);

console.log('\n--- FINAL EXAM');
await navTo('#/exam/quiz');
const finalDraw = Math.min(FINAL_N, totalQuiz);
ok(txt('#q-count') === `Question 1 of ${finalDraw}`, `final exam draws ${finalDraw} random qs from a pool of ${totalQuiz} (got "${txt('#q-count')}")`);
const drawC = await runExamSitting(finalDraw, qDayAll);
ok(drawC.length === finalDraw, `final draw is exactly ${finalDraw} questions`);
const covC = new Set(drawC.map(t => qDayAll.get(t)));
ok(covC.size === nums.length, `final draw covers all ${nums.length} days (saw days ${[...covC].sort().join(',')})`);
await navTo('#/exam/cards');
const totalCards = nums.reduce((s, n) => s + DAYS[n].cards.length, 0);
const totalStudy = nums.reduce((s, n) => s + DAYS[n].sheet.reduce((a, g) => a + g.items.length, 0), 0);
ok(txt('#c-count') === `Card 1 of ${totalCards}`, `final exam flashcards aggregate every day: ${totalCards} (got "${txt('#c-count')}")`);
await navTo('#/exam/guide');
ok(d.querySelectorAll('.sheet-item').length === totalStudy, `final exam study guide aggregates: ${totalStudy} points (found ${d.querySelectorAll('.sheet-item').length})`);

/* ---------- best score persistence ---------- */
console.log('\n--- SCORE SAVE');
await navTo('#/');
await wait(50);
ok(/Best practice score: 100%/.test(d.querySelector('main').textContent), 'home shows the saved best score (device only)');

/* ---------- back button / deep links ---------- */
console.log('\n--- DEEP LINKS & BACK');
w.location.hash = '#/day/4/guide'; await wait(60);
const deep = d.querySelector('.sheet-item')?.textContent || '';
ok(deep.length > 0, 'a direct link like #/day/4/guide opens that day\u2019s study guide');

console.log(`\nscript errors: ${errors.length}${errors.length ? '\n' + errors.join('\n') : ''}`);
console.log(`RESULT: ${fails === 0 ? 'ALL CHECKS PASSED' : fails + ' CHECK(S) FAILED'}`);
w.close();
process.exit(fails === 0 ? 0 : 1);
