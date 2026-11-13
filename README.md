# Flanigan's Training — 8-Day Study Hub

One site instead of seven files and a stack of paper quizzes. Dark green + gold,
bottom icon nav, same three tabs on every day: **Quiz · Cards · Guide**.

Two ways to use it, both included:

| Version | What it is | Best for |
|---|---|---|
| `index.html` + `styles.css` + `app.js` + `data/day1.js…day8.js` | the normal folder version — this is the one to edit | hosting on GitHub Pages, easy content edits |
| `Flanigans-Study-Hub-ONE-FILE.html` | the whole site in one file (auto-generated) | texting/airdropping to a coworker, opening off a USB stick, offline |

No internet is needed once the page is open, and no account, no sign-in, nothing is
uploaded anywhere — practice scores are saved on that device only.

## Put it on GitHub Pages (about 5 minutes)

1. Go to **github.com** → sign in (or create a free account) → **New repository**.
2. Name it something short, e.g. `flanigans-training`. Keep it **Public**. Click **Create repository**.
3. On the new repo page click **uploading an existing file** and drag in the *contents* of this
   folder — `index.html`, `styles.css`, `app.js`, the `data` folder (and `tools` if you want).
   `index.html` must sit at the **top level**, not inside a subfolder. Click **Commit changes**.
4. Click **Settings** → **Pages** (left sidebar) → under **Build and deployment**,
   Source: **Deploy from a branch**, Branch: **main** and **/(root)** → **Save**.
5. Wait a minute, refresh: your link is
   `https://YOUR-USERNAME.github.io/flanigans-training/`

Tell your coworkers the link. You can also send them straight to one thing by pasting:

- `…/#/day/4/quiz` — Day 4 practice quiz
- `…/#/day/6/guide` — Day 6 study guide
- `…/#/midterm/quiz` — the mixed 4-day Midterm (144 questions)
- `…/#/exam/quiz` — the mixed 8-day Final Exam (285 questions)

## What's inside

```
index.html                      the page (home + day screens)
styles.css                      one theme for all 8 days
app.js                          the engine: quiz, flashcards, study guide, scores
data/day1.js … day8.js          content only — this is what you edit
Flanigans-Study-Hub-ONE-FILE.html  generated single-file copy
tools/convert.mjs               one-time migration from the original 7 HTML files (already run)
tools/build.mjs                 regenerates the ONE-FILE version after a content change
tools/check.mjs                 optional self-test (see "Re-check the whole site" below)
README.md                       this file
```

Content right now: **285 practice questions, 162 flashcards, 194 study points** across
Days 1–8 (manual pages 5–9, 11–24, 29–33, 35–39, 41–43, 45–46). Day 8 (accounting, credit
cards, gift cards, comps, tip declaration, Joe's To-Go, evaluations) was built from the
worksheet photos and the matching manual lesson pages — it wasn't one of the original seven
applets. Pass mark is 80%, the same as your worksheets.

Two mixed tests sit under the day cards: **Midterm** (Days 1–4: 144 quiz qs, 100 flashcards,
102 study points) and **Final Exam** (all 8 days). Both have the same Quiz / Cards / Guide
tabs as any day. Question AND answer order reshuffle on every attempt — and every quiz,
every day and both exams, has a **Shuffle Quiz** button to re-mix mid-sitting. Flashcards
keep their **Shuffle Deck** button.

## Editing content

Open `data/day3.js` (or whichever day) in any plain text editor — Notepad, TextEdit (plain
text mode), VS Code — and edit between the brackets. Each day has three lists:

```js
quiz:  [ { cat: "Soups", q: "question text", opts: ["wrong","right"], ans: 1, exp: "why" } ],
cards: [ { cat: "Soups (Page 11)", title: "Clam Chowder", body: "<p><strong>Portion:</strong> 10 oz</p>" } ],
sheet: [ { group: "Soups (Page 11)", items: [ { name: "Clam Chowder", tag: "10 oz in a 12 oz bowl",
          spec: "lined bone basket", desc: "verbatim spec…", extra: [ { label: "Rules", text: "…" } ] } ] } ]
```

Two easy-to-remember rules:

- `ans` is the position of the correct option, **counting from 0**. So if the right answer is
  the 3rd one in the list, `ans: 2`. If you move options around, change `ans` to match.
- Keep the commas and the quotation marks. One missing comma or a stray quote mark is the
  classic break (it's what killed Day 6 in the old set). When unsure, add `\` before a quote
  you want inside a sentence, like `"Upsell: \"only $3.99 right now!\""`.

After editing content, refresh the single-file copy with (needs Node.js; skip it if you only
use the hosted version):

```
node tools/build.mjs
```

To check a day's counters are honest, open the site and look at the day header strip — it
reads `40 quiz qs • 24 cards • 24 study points`, and every counter in the app is worked out
from the files rather than typed in, so it can't go stale.

### Re-check the whole site yourself (optional, catches the classic mistakes)

If you want proof that a content edit didn't break anything, this runs the site headless and
walks all 8 days — counters, every quiz question, flashcard flip, guide search, deep links:

```
npm install jsdom        # one time, inside this folder
node tools/check.mjs .
node tools/check.mjs . Flanigans-Study-Hub-ONE-FILE.html
rm -rf node_modules      # delete it afterwards if you like, it is only for the test
```

Ends with `ALL CHECKS PASSED`, or lists exactly what broke.

## Print a paper copy if you still need one

Study Guide tab → **Print this study guide**. Cards tab → **Print Cards** (prints the term and
the answer together). Both print black-on-white, not the dark screen theme.
