/*
  convert.mjs — one-time content migration.
  Reads the 7 original single-file apps in the parent folder and writes clean
  data files into ../data/day1.js … day7.js using one unified shape:

    quiz  : { cat, q, opts[], ans, exp }
    cards : { cat, title, body }                 (body is a small HTML snippet)
    sheet : { group, items: [{ name, tag, spec, desc, extra[] }] }

  Run:  node tools/convert.mjs            (from the flanigans-study-site folder)
  Review diff of reworded question stems:  node tools/convert.mjs --stems
*/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(HERE, '..');
const SRC = path.resolve(SITE, '..');

/* ---------- pull a JS array literal out of an HTML file ---------- */
function extract(src, name) {
  const start = src.indexOf(`const ${name} = [`);
  if (start === -1) return null;
  let i = src.indexOf('[', start), depth = 0, str = null, esc = false;
  for (let j = i; j < src.length; j++) {
    const c = src[j];
    if (str) { if (esc) { esc = false; continue; } if (c === '\\') { esc = true; continue; } if (c === str) str = null; continue; }
    if (c === '/' && src[j + 1] === '/') { j = src.indexOf('\n', j); if (j === -1) break; continue; }
    if (c === '"' || c === "'" || c === '`') { str = c; continue; }
    if (c === '[') depth++;
    else if (c === ']') { depth--; if (depth === 0) return src.slice(i, j + 1); }
  }
  throw new Error(`could not find the end of ${name}`);
}
function parseArray(src, name) {
  const lit = extract(src, name);
  if (!lit) throw new Error(`missing array: ${name}`);
  return Function(`"use strict"; return (${lit});`)();
}

/* ---------- question stem leveling (content is kept, wording is flattened) ---------- */
const OVERRIDES = {
  // day: { "original stem": "new stem" }
  1: {
    "What does your COMPLETE Flanigan's uniform consist of (every single item)?":
      "What does the complete Flanigan's uniform consist of?",
  },
  2: {
    "What is the COMPLETE specification for Joe's Steakhouse Soup (prep status, base, meat cut, vegetables, starch, portion ounces, bowl size, basket, garnish, and side items)?":
      "What are the correct specs for Joe's Steakhouse Soup?",
    "Select the COMPLETE and exact specification for Joe's Rockin' Rib Rolls (egg roll count, wrapper prep, all 5 filling ingredients, cooking method, how they are cut, platter type, orientation of rolls, and exact sauce cup size & dressing portion):":
      "What are the correct specs for Joe's Rockin' Rib Rolls?",
    "What is the COMPLETE specification for Loaded Nachos, including every single ingredient, both platters used in presentation, and the mandatory guest verbal warning?":
      "What are the correct specs for Loaded Nachos?",
    "What is the COMPLETE specification for Tumbleweed Onions (exact onion weight, slicing style, flour prep, cooking method, exact basket, seasoning sprinkle, exact sauce portion, guest choice rule, and both suggested sauces)?":
      "What are the correct specs for Tumbleweed Onions?",
    "What is the COMPLETE specification for Mozzarella Sticks (piece count, cooking method, exact sauce type & portion, and exact basket type)?":
      "What are the correct specs for Mozzarella Sticks?",
    "What is the COMPLETE specification for the STARTER order of French Fries (exact weight, cut style, seasoning, and exact serving basket)?":
      "What are the correct specs for French Fries ordered as a starter?",
    "What is the COMPLETE specification for the STARTER order of Sweet Potato Fries (exact weight, topping sprinkle, and exact basket type)?":
      "What are the correct specs for Sweet Potato Fries ordered as a starter?",
    "What is the COMPLETE specification for 5 Wings - Small Order (breakdown of wing parts, serving vessel, and drum/flat guest request rule with upcharge)?":
      "What are the correct specs for the 5-wing small order?",
    "What is the COMPLETE specification for 10 Wings - Regular Order (exact count of flats and drums, serving vessel, and drum/flat guest request rule with upcharge)?":
      "What are the correct specs for the 10-wing regular order?",
    "What is the COMPLETE specification for 20 Wings - Jumbo Order (exact flat/drum count, serving vessel, all drum/flat rule, and sauce splitting restrictions)?":
      "What are the correct specs for the 20-wing jumbo order?",
    "What is the COMPLETE specification for Curly Fries as a SIDE ORDER (exact weight, specific brand seasoning, and what items they are served with)?":
      "What are the correct specs for Curly Fries ordered as a side?",
    "What is the COMPLETE specification for Sweet Potato Fries as a SIDE ORDER (exact weight, seasoning sprinkle, serving dish/presentation, and exact sandwich/entree substitution upcharge)?":
      "What are the correct specs for Sweet Potato Fries ordered as a side?",
  },
  4: {
    "Describe Jimmy's Sweet Stack (creator, base foundation cookie, ice cream, and toppings):":
      "What are the correct specs for Jimmy's Sweet Stack?",
  },
  6: {
    "Describe the COMPLETE ingredients, garnish/rim, and pricing for the 'Flanitini':":
      "What are the ingredients, garnish/rim, and price for the 'Flanitini'?",
    "Describe the COMPLETE ingredients, toppings/rim, and pricing for the 'Rumchata Cookie Crumb Martini':":
      "What are the ingredients, toppings/rim, and price for the 'Rumchata Cookie Crumb Martini'?",
    "Describe the COMPLETE ingredients, garnish, and pricing for the 'Espresso Martini':":
      "What are the ingredients, garnish, and price for the 'Espresso Martini'?",
  },
};

const SPEC_RE = [
  // "What is the COMPLETE specification for <item> (<detail list>)?"
  /^What is the (?:COMPLETE|FULL|complete|full)(?: and (?:exact|EXACT))? specification (?:for|of) (.+?)(?:[?]|\s*:)?$/i,
  /^What are the (?:COMPLETE|complete)(?: exact)? specs? (?:for|of) (.+?)(?:[?]|\s*:)?$/i,
  /^Which option (?:provides|gives|contains|has) the (?:COMPLETE|FULL|EXHAUSTIVE)[^?]*?(?:for|of) (.+?)(?:[?]|\s*:)?$/i,
  /^Select the (?:COMPLETE|complete)[^:]*for (.+?)(?:\s*:)?$/i,
  /^Identify the (?:COMPLETE|complete)(?: specification| spec)? (?:for|of) (.+?)(?:[?]|\s*:)?$/i,
  /^Describe (.+?):$/i,
  /^What is the (?:exact )?spec for (.+?)(?:[?]|\s*:)?$/i,
  /^What (?:are the exact specs?|is the exact spec) for (.+?)(?:\s*\([^)]*\))?[?]$/i,
];

/* "Match each X with its exact Y:" → drop the trailing colon, keep the words */
function tidyStem(q) {
  return q.replace(/\s*:\s*$/, '').replace(/\s{2,}/g, ' ').trim();
}

function cleanItem(raw) {
  let s = raw.trim().replace(/[?]$/, '').replace(/:$/, '').trim();
  // drop the trailing "(detail, list, of, things)" parenthetical
  s = s.replace(/\s*\([^()]*\)\s*$/g, '').trim();
  // drop ", including ..." / ", with every ..." tails
  s = s.replace(/,\s*(including|with|and (?:the )?exact)\b.*$/i, '').trim();
  s = s.replace(/[,;:\s]+$/g, '').trim();
  // keep leading quotes on nicknames
  s = s.replace(/^(the|a|an)\s+/i, m => m);
  return s;
}

function levelStem(q, day) {
  const over = (OVERRIDES[day] || {})[q];
  if (over) return over;
  if (/^(True or False|Fill in the blank|Fill in the blanks|According to)/i.test(q)) return q;
  if (/^(Which of the following (?:is )?NOT|What protein is NOT|Which option is NOT)/i.test(q)) return q;
  for (const re of SPEC_RE) {
    const m = q.match(re);
    if (!m) continue;
    const item = cleanItem(m[1]);
    if (!item) continue;
    const withThe = /^(the|a|an|their|Joe|Kids|Jimmy|Giuseppe|Flanigan|Legendary|Jurassic|Deluxe|Dinner|Pasta|Salad|Baked|Curly|Firecracker|Peel|Dolphin|Tumbleweed|Mozzarella|Chicken|Loaded|Smoked|Seafood|Clam|Dirty|Black|Bruschetta|Banzai|Key|Dulce|Shrimp|Steak|Philly|Tuna|Way|Chipotle|Fresh|Salmon|Tilapia|Grand|Cajun|Lemon|Shrimp|Skateboard|Mini|Macaroni|Clam)\b/i.test(item) ? '' : '';
    return `What are the correct specs for ${item.startsWith('the ') || item.startsWith('a ') ? item : 'the ' + item}?`;
  }
  if (/^(Match|Identify)\b/.test(q) && /:$/.test(q)) return tidyStem(q);
  return tidyStem(q);
}

/* ---------- family A (days 1, 5, 6, 7) : already 3 arrays ---------- */
function fromFamilyA(src, day) {
  const quiz = parseArray(src, `DAY${day}_QUIZ`).map(q => ({
    cat: q.cat, q: levelStem(q.q, day), orig: q.q, opts: q.opts, ans: q.ans, exp: q.exp
  }));
  const cards = parseArray(src, `DAY${day}_FLASHCARDS`).map(c => ({
    cat: c.cat, title: c.title, body: (c.body || '').trim()
  }));
  const sheet = parseArray(src, `DAY${day}_CHEAT_SHEET`).map(g => ({
    group: g.group,
    items: (g.items || []).map(it => ({
      name: it.name,
      tag: it.dish || it.tag || '',
      spec: it.spec || '',
      desc: it.desc || '',
      extra: (it.extra || []).map(e => ({ label: e.label, text: e.text }))
    }))
  }));
  return { quiz, cards, sheet };
}

/* ---------- family B (days 2, 3, 4) : menu spec list + quiz bank ---------- */
const SPEC_FIELDS = [
  ['portion', 'Portion'],
  ['dish', 'Serving dish'],
  ['fresh', 'Prep / freshness'],
  ['sauce', 'Sauce & garnish'],
  ['ingredients', 'Ingredients'],
  ['rules', 'Rules'],
  ['verbatim', 'Verbatim spec'],
];

function fromFamilyB(src, day) {
  const items = parseArray(src, day === 2 ? 'flanData' : `flanDataDay${day}`);
  const quiz = parseArray(src, day === 2 ? 'quizBank' : `quizBankDay${day}`).map(q => ({
    cat: q.category, q: levelStem(q.q, day), orig: q.q, opts: q.options, ans: q.answer, exp: q.exp
  }));
  const cards = items.map(it => {
    const body = SPEC_FIELDS
      .filter(([k]) => it[k])
      .map(([k, label]) => `<p><strong>${label}:</strong> ${it[k]}</p>`)
      .join('\n          ');
    return { cat: `${it.category} (${it.page})`, title: it.name, body };
  });
  const groups = [];
  for (const it of items) {
    let g = groups.find(x => x.group === `${it.category} (${it.page})`);
    if (!g) { g = { group: `${it.category} (${it.page})`, items: [] }; groups.push(g); }
    g.items.push({
      name: it.name,
      tag: it.portion || '',
      spec: it.dish || '',
      desc: it.verbatim || it.ingredients || '',
      extra: SPEC_FIELDS
        .filter(([k]) => it[k] && k !== 'portion' && k !== 'dish' && k !== 'verbatim')
        .map(([k, label]) => ({ label, text: it[k] }))
    });
  }
  return { quiz, cards, sheet: groups };
}

/* ---------- day titles straight from each original header ---------- */
function headerOf(src) {
  const h1 = (src.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, ''])[1].replace(/<[^>]+>/g, '').trim();
  const sub = (src.match(/<header[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/) || [, ''])[1].replace(/<[^>]+>/g, '').trim();
  return { h1, sub };
}

const DAY_META = {
  1: { title: 'General Knowledge & Service', pages: 'Pages 5–9', blurb: "Six C's, Big 5 & 4 Miles of Smiles" },
  2: { title: 'Starters & Sides', pages: 'Pages 11–15', blurb: 'Soups, appetizers, wings, sides & salads' },
  3: { title: "Salads, Proteins & Kids' Menu", pages: 'Pages 16–19', blurb: 'Service guidelines, dressings, salad add-ons, kids' },
  4: { title: 'Service, Burgers, Sandwiches & Desserts', pages: 'Pages 20–24', blurb: 'Service experience, burgers, stacks, steaks, finishers' },
  5: { title: 'Entrees — Pasta, Ribs, Beef & Seafood', pages: 'Pages 29–33', blurb: 'Pasta, Legendary Ribs, beef & chicken, seafood platters' },
  6: { title: 'Bar Functions, Beer, Wine & Spirits', pages: 'Pages 35–39', blurb: 'Glassware, draft & bottle beer, wine, spirits, martinis' },
  7: { title: 'Lunches, Meal Deals & Promos', pages: 'Pages 41–43', blurb: "$6.99 lunches, Joe's meal deals, daily promotions" },
};

/* ---------- write ---------- */
const showStems = process.argv.includes('--stems');
const stemLog = [];
let totalQ = 0, totalC = 0, totalS = 0;

for (let day = 1; day <= 7; day++) {
  const file = fs.readdirSync(SRC).find(f => f.includes(`Day ${day} Study`));
  const src = fs.readFileSync(path.join(SRC, file), 'utf8');
  const data = day === 2 || day === 3 || day === 4 ? fromFamilyB(src, day) : fromFamilyA(src, day);
  const meta = DAY_META[day];
  const { h1 } = headerOf(src);

  data.quiz.forEach(q => { if (q.q !== q.orig) stemLog.push({ day, before: q.orig, after: q.q }); });
  data.quiz.forEach(q => { delete q.orig; });
  totalQ += data.quiz.length;
  totalC += data.cards.length;
  totalS += data.sheet.reduce((n, g) => n + g.items.length, 0);

  const body =
`/* Day ${day} — ${meta.title} (${meta.pages})
   Content migrated from the original "Flanigan's Day ${day} Study Guide & Quiz.html".
   Edit away: this file is only content, the app lives in app.js. */
window.FLANIGANS_DAYS = window.FLANIGANS_DAYS || {};
window.FLANIGANS_DAYS[${day}] = {
  day: ${day},
  title: ${JSON.stringify(meta.title)},
  pages: ${JSON.stringify(meta.pages)},
  blurb: ${JSON.stringify(meta.blurb)},
  quiz: ${JSON.stringify(data.quiz, null, 2).replace(/\n/g, '\n  ')},
  cards: ${JSON.stringify(data.cards, null, 2).replace(/\n/g, '\n  ')},
  sheet: ${JSON.stringify(data.sheet, null, 2).replace(/\n/g, '\n  ')}
};
`;
  fs.writeFileSync(path.join(SITE, 'data', `day${day}.js`), body);
  console.log(`day${day}.js  quiz=${data.quiz.length}  cards=${data.cards.length}  study=${data.sheet.reduce((n, g) => n + g.items.length, 0)}  (groups ${data.sheet.length})  [from: ${h1}]`);
}
console.log(`\nTOTALS  quiz=${totalQ}  cards=${totalC}  study items=${totalS}`);
console.log(`\nQUESTION STEMS REWORDED: ${stemLog.length}`);
if (showStems) stemLog.forEach(s => console.log(`\n  D${s.day}  BEFORE: ${s.before}\n      AFTER : ${s.after}`));
