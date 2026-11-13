/* Day 8 — Accounting, Gift Cards, Discounts, Tip Declaration & Evaluations (Pages 45–46)
   Built from the Day 8 worksheet (manual pages 45–46) and the Flanigan's
   "Training – Day 8: Final Steps & Evaluation" lesson pages.
   Edit away: this file is only content, the app lives in app.js. */
window.FLANIGANS_DAYS = window.FLANIGANS_DAYS || {};
window.FLANIGANS_DAYS[8] = {
  day: 8,
  title: "Accounting, Gift Cards, Comps, Tips & Evaluations",
  pages: "Pages 45–46",
  blurb: "Checkout, credit cards, gift cards, comps, tip declaration, Joe's To-Go & write-ups",
  quiz: [
    {
      "cat": "Checkout & Cash (p. 45)",
      "q": "If a credit card tip is over 50%, what do you do?",
      "opts": [
        "Wing it",
        "Cross your fingers",
        "Get a manager — the manager must verify the tip and/or initial the correction",
        "Tell all your coworkers"
      ],
      "ans": 2,
      "exp": "Page 45, Credit Cards #6: a credit card tip over 50% (or one totaled wrong) MUST be verified by your manager, who initials the correction."
    },
    {
      "cat": "Checkout & Cash (p. 45)",
      "q": "During checkout, \"cash to remit\" refers to:",
      "opts": [
        "The tip amount for the night",
        "The cash you give to the manager — the amount of cash you are responsible for remitting",
        "The money used for pizza parties",
        "The extra cash kept for emergencies"
      ],
      "ans": 1,
      "exp": "Page 45, Checkout Procedures #4: \"Cash to remit\" is the amount of cash you are responsible for remitting — it goes to a manager."
    },
    {
      "cat": "Checkout & Cash (p. 45)",
      "q": "Who is allowed to make the cash drop in the safe?",
      "opts": [
        "Any server whose checks are all closed",
        "The host",
        "Managers only — servers are not allowed to make their own drop",
        "Whichever team member is nearest the safe"
      ],
      "ans": 2,
      "exp": "Page 45, Checkout Procedures #7: bring the checkout to a manager to be signed and dropped in the safe. Servers are not allowed to make their own drop. MANAGERS ONLY!"
    },
    {
      "cat": "Checkout & Cash (p. 45)",
      "q": "You are responsible for all money during your shift until…",
      "opts": [
        "You put it in the drop box yourself",
        "It is put into a manager's hand and signed",
        "You run the \"Of This Shift\" checkout report",
        "Your credit card totals match the report"
      ],
      "ans": 1,
      "exp": "Page 45 note: you are responsible for this money (and all money during your shift) until it is put into a manager's hand and signed."
    },
    {
      "cat": "Checkout & Cash (p. 45)",
      "q": "What is the very first thing to do at checkout?",
      "opts": [
        "Count the cash drawer",
        "Tip out the busser",
        "Print the deposit slip",
        "Make sure all checks are closed"
      ],
      "ans": 3,
      "exp": "Page 45, Checkout Procedures #1–2: make sure all checks are closed, then run the checkout report \"Of This Shift.\""
    },
    {
      "cat": "Checkout & Cash (p. 45)",
      "q": "You must turn in your checkout even if it's a slow shift and you only ran one table.",
      "opts": ["True", "False"],
      "ans": 0,
      "exp": "Page 45: every server turns in their checkout at the end of the shift — no exceptions for slow shifts."
    },
    {
      "cat": "Checkout & Cash (p. 45)",
      "q": "If your credit card totals do not match the checkout report, you should:",
      "opts": [
        "Try five more times for good luck",
        "STOP and get a manager to correct the credit cards",
        "Put in cash to make it match",
        "Shrug and walk away"
      ],
      "ans": 1,
      "exp": "Page 45, Checkout Procedures #3: check all credit cards first and match totals to the checkout report. If they don't match, STOP and get a manager."
    },
    {
      "cat": "Credit Cards (p. 45)",
      "q": "Which of the following is NOT an acceptable form of payment?",
      "opts": ["Visa", "Traveler's Checks", "Gift Cards", "Discover"],
      "ans": 1,
      "exp": "Page 45: we accept Visa, Mastercard, American Express, Discover and gift cards. Traveler's checks are not accepted — and neither are personal checks."
    },
    {
      "cat": "Credit Cards (p. 45)",
      "q": "What's the proper way to handle a declined credit card?",
      "opts": [
        "Try five more times for good luck",
        "Tell them to wash dishes",
        "Run it once more, and if it's declined twice, notify the manager and let them handle it",
        "Shrug and walk away"
      ],
      "ans": 2,
      "exp": "Page 45, Credit Cards #3: repeat the process once. If DECLINED TWICE, notify the manager and let them handle it from there."
    },
    {
      "cat": "Credit Cards (p. 45)",
      "q": "A credit card voucher is NOT valid unless it is:",
      "opts": ["Signed", "Initialed", "Photographed", "Rounded up"],
      "ans": 0,
      "exp": "Page 45, Credit Cards #8–10: the guest must sign the voucher; the signature must match the name on the card and the signature on the back of the card."
    },
    {
      "cat": "Credit Cards (p. 45)",
      "q": "The imprint comes through with NO NAME on the voucher (or you manually key the number). What two procedures must you follow?",
      "opts": [
        "Manually imprint the card (legible) AND request photo ID to verify identity and signature",
        "Refuse the card entirely",
        "Accept it as long as the numbers match",
        "Write the card number on the back of the check"
      ],
      "ans": 0,
      "exp": "Page 45, Credit Cards #11: manual imprint + photo ID are both required. ONE infraction in this area may lead to separation of employment!"
    },
    {
      "cat": "Credit Cards (p. 45)",
      "q": "The signature on the voucher doesn't match the signature on the back of the card. First you:",
      "opts": [
        "Take the card back to the manager",
        "Ask the guest to re-sign and show a driver's license; if they refuse, get a manager",
        "Charge it anyway — names are names",
        "Ask for cash instead"
      ],
      "ans": 1,
      "exp": "Page 45, Credit Cards #10: request that the customer re-sign and request a driver's license to verify. If they refuse, get a manager."
    },
    {
      "cat": "Credit Cards (p. 45)",
      "q": "Can you add a tip to a credit card voucher after the guest leaves if they \"forgot\"?",
      "opts": [
        "Yes — just add it when they come back",
        "No — the voucher is gone once the guest leaves; you can't add a tip after the fact"
      ],
      "ans": 1,
      "exp": "Page 45 worksheet: NO. Tips have to be on the signed voucher — you cannot add a tip after the guest has left. Make sure the guest finalizes the tip before they walk out."
    },
    {
      "cat": "Credit Cards (p. 45)",
      "q": "Cash advances on credit cards are permitted as long as a manager watches.",
      "opts": ["True", "False"],
      "ans": 1,
      "exp": "Page 45, Credit Cards #7: cash advances on credit cards are NOT permitted — manager or not."
    },
    {
      "cat": "Credit Cards (p. 45)",
      "q": "Scenario: A guest signs \"Mickey Mouse\" on a $200 AmEx voucher.",
      "opts": ["Totally fine", "Totally NOT OK"],
      "ans": 1,
      "exp": "Page 45, Credit Cards #9: the signature MUST match the name on the card (real refusals have happened, e.g. card \"JOHN SMITH\" signed \"JIM BROWN\"). A \"Mickey Mouse\" signature is not acceptable."
    },
    {
      "cat": "Credit Cards (p. 45)",
      "q": "Scenario: You high-five a cop in uniform and remind him about the Police Menu.",
      "opts": ["Totally fine", "Totally NOT OK"],
      "ans": 0,
      "exp": "Page 45 worksheet: totally fine — uniformed police get the Police Menu comp, and pointing it out is good service (food only, from the Police Menu)."
    },
    {
      "cat": "Gift Cards (p. 46)",
      "q": "What denominations do Flanigan's gift cards come in?",
      "opts": [
        "$5 to $500, sold at the host stand",
        "Any denomination from $10.00 to $1000, obtained through your manager",
        "$25 to $250 only",
        "$50 increments only"
      ],
      "ans": 1,
      "exp": "Page 46: gift cards accommodate any denomination from $10.00 to $1000, obtained through your manager."
    },
    {
      "cat": "Gift Cards (p. 46)",
      "q": "Can a gift card be issued for $1,000?",
      "opts": ["True", "False"],
      "ans": 0,
      "exp": "Page 46: yes — gift cards go up to $1,000 (minimum $10). Ask a manager."
    },
    {
      "cat": "Gift Cards (p. 46)",
      "q": "Flanigan's accepts personal checks under $50.",
      "opts": ["True", "False"],
      "ans": 1,
      "exp": "Page 46: we do NOT accept personal checks at all — any amount."
    },
    {
      "cat": "Gift Cards (p. 46)",
      "q": "A gift card purchase of $200.00 or more paid by credit card must:",
      "opts": [
        "Be rung up by the server with no extra steps",
        "Involve a manager before the transaction is completed",
        "Be refused — gift cards can't be paid by card",
        "Be paid in cash instead"
      ],
      "ans": 1,
      "exp": "Page 46: gift card purchases of $200.00 or more paid with a credit card must involve a manager — it protects us and the guest against card fraud."
    },
    {
      "cat": "Gift Cards (p. 46)",
      "q": "Scenario: You forget to get a manager for a $300 gift card purchase.",
      "opts": ["Totally fine", "Totally NOT OK"],
      "ans": 1,
      "exp": "Page 46: NOT OK. A $300 gift card purchase is over the $200 threshold — a manager must be involved before completing the transaction."
    },
    {
      "cat": "Gift Cards (p. 46)",
      "q": "Red flags of a counterfeit credit card at a gift card sale (name missing from the printed slip, slip numbers don't match the card). You:",
      "opts": [
        "Finish the sale and hope for the best",
        "Ask the guest to try a different card",
        "Summon a manager immediately — the transaction then gets called into the merchant for approval",
        "Photograph the card and move on"
      ],
      "ans": 2,
      "exp": "Page 46: these are the two most common fraud indications. A manager must be summoned immediately and the transaction called into the merchant for approval."
    },
    {
      "cat": "Comps & Discounts (p. 46)",
      "q": "Do all comps need to be entered and approved by a manager?",
      "opts": [
        "Yes — comps and discounts are handled by the manager only",
        "No — servers can comp up to $10"
      ],
      "ans": 0,
      "exp": "Page 46, Comps and Discounts #1: all comps and discounts are handled by the manager only."
    },
    {
      "cat": "Comps & Discounts (p. 46)",
      "q": "What is FOODCOMP-SHIFT 50% used for?",
      "opts": [
        "50% off any entree for guests",
        "Employee shift meals from the Employee Menu, eaten on the premises before or after your shift",
        "50% off for employees on their day off",
        "Happy hour food discounts"
      ],
      "ans": 1,
      "exp": "Page 46 chart: FOODCOMP-SHIFT 50% = employee shift meals from the Employee Menu. Employee meals are to be eaten on the premises before or after your shift."
    },
    {
      "cat": "Comps & Discounts (p. 46)",
      "q": "The Police discount (FOODCOMP-POLICE) requires:",
      "opts": [
        "20% off anything on the regular menu",
        "Plainclothes officers only",
        "Uniformed police, ordering from the Police Menu, food only",
        "A police badge number on the credit card slip"
      ],
      "ans": 2,
      "exp": "Page 46: uniformed police meals must be ordered from the Police Menu — regular menu items are not discounted — and the discount applies to food only."
    },
    {
      "cat": "Comps & Discounts (p. 46)",
      "q": "The 10% off-duty employee discount (FOODCOMP-EMP/OFF-DUTY) requires the employee to:",
      "opts": [
        "Present a recent pay stub and be seated with the party",
        "Bring a manager's permission slip",
        "Wear the uniform",
        "Pay with a Flanigan's gift card"
      ],
      "ans": 0,
      "exp": "Page 46: 10% off the entire check when eating at Flanigan's off duty — employee must present a recent pay stub and be seated with the party."
    },
    {
      "cat": "Comps & Discounts (p. 46)",
      "q": "Scenario: You give your buddy an employee discount when they show up in flip flops (you're not even there).",
      "opts": ["Totally fine", "Totally NOT OK"],
      "ans": 1,
      "exp": "Page 46: NOT OK. The off-duty discount belongs to the employee — they must be seated with the party and present a recent pay stub. Discounts to \"buddies\" are not how comps work; managers handle comps anyway."
    },
    {
      "cat": "Comps & Discounts (p. 46)",
      "q": "PROMO-LIQUOR/BAR 100% on the comp chart means:",
      "opts": [
        "The bar is comped to servers",
        "Any alcoholic beverage that is comped",
        "Liquor samples for guests",
        "All alcoholic beverages are 100% taxable"
      ],
      "ans": 1,
      "exp": "Page 46 chart: PROMO-LIQUOR/BAR 100% = any alcoholic beverage that is comped. (PROMO-N/A BEV 100% is the same for non-alcoholic beverages.)"
    },
    {
      "cat": "Tip Declaration (p. 45)",
      "q": "Fill-in: Falsifying tip income is ______.",
      "opts": ["Illegal", "Just bad practice", "Only illegal above $1,000", "The manager's problem"],
      "ans": 0,
      "exp": "Page 45, Tip Declaration: falsifying tip income is ILLEGAL."
    },
    {
      "cat": "Tip Declaration (p. 45)",
      "q": "If an IRS audit finds you underreported tips, penalties and interest can be as much as ____ of the assessed tax for EACH year audited.",
      "opts": ["10%", "25%", "50%", "No penalties apply"],
      "ans": 2,
      "exp": "Page 45: additional taxes PLUS penalties and interest up to 50% of the assessed tax for each year audited — and the IRS can go back as many as six years in some cases."
    },
    {
      "cat": "Tip Declaration (p. 45)",
      "q": "How far back can the IRS audit your tip income in some cases?",
      "opts": ["One year", "Two years", "Four years", "As many as six years"],
      "ans": 3,
      "exp": "Page 45: the IRS has the right to go back and audit as many as six years in some cases."
    },
    {
      "cat": "Tip Declaration (p. 45)",
      "q": "Is it okay to round your tip declaration down to the nearest dollar?",
      "opts": [
        "Yes — the IRS doesn't care about change",
        "No — 100% of tips are taxable and you must report ALL tips received"
      ],
      "ans": 1,
      "exp": "Page 45: NO. The law requires each tipped employee to report ALL tips — cash tips, charge card tips and tips from other employees (minus what you tip out)."
    },
    {
      "cat": "Tip Declaration (p. 45)",
      "q": "The \"8% myth\" means:",
      "opts": [
        "8% of your tips are tax free",
        "8% is only a reporting threshold for employers — the law requires 100% of tips to be reported as taxable income",
        "8% is what you must tip out",
        "8% is the credit card processing fee"
      ],
      "ans": 1,
      "exp": "Page 45: the 8%-of-sales figure Flanigan's shows is a reference computed from IRS guidelines. All tips must be reported after each shift — 100% of tips are taxable."
    },
    {
      "cat": "Tip Declaration (p. 45)",
      "q": "Besides reporting tips to Flanigan's each shift, the law requires each tipped employee to keep:",
      "opts": [
        "A daily \"tip diary\" or other written evidence of tip income",
        "Nothing extra",
        "A receipt of every guest check",
        "A text message log of tips"
      ],
      "ans": 0,
      "exp": "Page 45, Record Keeping #3: keep a daily tip diary or other written evidence to prove tip income — in addition to the daily reporting to Flanigan's."
    },
    {
      "cat": "Tip Declaration (p. 45)",
      "q": "At Flanigan's, servers must report all tips:",
      "opts": [
        "Once a month at payroll time",
        "At the end of their shift when they are out",
        "Only if they exceeded the 8% reference",
        "Directly to the IRS every week"
      ],
      "ans": 1,
      "exp": "Page 45: the IRS requires you to report tips to your employer — at Flanigan's, report ALL tips at the end of your shift when you are out."
    },
    {
      "cat": "Joe's To-Go & Evaluations (Day 8 lesson)",
      "q": "When is the 10% Joe's To-Go charge NOT applied?",
      "opts": [
        "On Taco Tuesday",
        "When the guest is dining in and also placing a to-go order",
        "When they tip 20%",
        "When the order is under $20"
      ],
      "ans": 1,
      "exp": "Joe's To-Go Big 5, step 5: if the guest is dining in and also placing a to-go order, do NOT apply the 10% to-go charge."
    },
    {
      "cat": "Joe's To-Go & Evaluations (Day 8 lesson)",
      "q": "If a to-go order is not picked up within 15 minutes, you:",
      "opts": [
        "Throw it out",
        "Re-fire the order",
        "Call the number on file",
        "Hold it at the host stand for an hour"
      ],
      "ans": 2,
      "exp": "Joe's To-Go Big 5, step 3: always start a tab with the guest's name and phone number — if the order is not picked up within 15 minutes, call the number on file."
    },
    {
      "cat": "Joe's To-Go & Evaluations (Day 8 lesson)",
      "q": "For a to-go order paid by credit card, the card must belong to the person picking up the order.",
      "opts": ["True", "False"],
      "ans": 0,
      "exp": "Joe's To-Go Big 5, step 3: \"The card used for payment must belong to the person picking up the order.\""
    },
    {
      "cat": "Joe's To-Go & Evaluations (Day 8 lesson)",
      "q": "Is a written evaluation always a bad thing?",
      "opts": [
        "Yes — it's always a write-up",
        "No — it can be a positive write-up recognizing outstanding performance, or a negative one correcting behavior"
      ],
      "ans": 1,
      "exp": "Day 8 lesson: the Written Evaluation form serves two purposes — to recognize and reinforce positive behavior, and to address unacceptable behavior."
    },
    {
      "cat": "Joe's To-Go & Evaluations (Day 8 lesson)",
      "q": "After a written evaluation is completed, what happens to the paperwork?",
      "opts": [
        "It is shredded after reading",
        "It stays in the server's apron",
        "It is reviewed in person and signed by employee and manager; a copy is filed on-site and the original is emailed to the main office",
        "Only the manager keeps a copy"
      ],
      "ans": 2,
      "exp": "Day 8 lesson: all evaluations are reviewed in person with the employee and signed by both. A copy is filed on-site in the employee's record; the original goes to the main office."
    }
  ],
  cards: [
    {
      "cat": "Checkout (p. 45)",
      "title": "Checkout Procedure — Step by Step",
      "body": "<ol><li>Make sure <strong>all checks are closed</strong>.</li><li>Run the checkout report <strong>\"Of This Shift\"</strong>.</li><li>Check <strong>all credit cards first</strong> and match totals to the report — if they don't match, <strong>STOP and get a manager</strong>.</li><li>Know your <strong>\"cash to remit\"</strong> amount.</li><li>Drop done <strong>neatly and orderly, all monies facing the same direction</strong>.</li><li>Bring the checkout to a <strong>manager</strong> to be signed and dropped in the safe.</li></ol>"
    },
    {
      "cat": "Checkout (p. 45)",
      "title": "Cash to Remit & Who Drops",
      "body": "<p><strong>\"Cash to remit\"</strong> = the cash you are responsible for remitting (handed to the manager).</p><p><strong>Managers only</strong> make the drop in the safe — servers never make their own drop.</p><p style=\"color:var(--danger); font-weight:700;\">You are responsible for ALL money during your shift until it is in a manager's hand and signed.</p>"
    },
    {
      "cat": "Credit Cards (p. 45)",
      "title": "Declined Card — The Ladder",
      "body": "<p>1st decline: <strong>run it one more time</strong>.</p><p>2nd decline: <strong>STOP — notify the manager</strong> and let them handle it from there.</p><p>Never try five more times, never offer to wash dishes, never shrug it off.</p>"
    },
    {
      "cat": "Credit Cards (p. 45)",
      "title": "Tips Over 50% & Voucher Basics",
      "body": "<p>Credit card tip <strong>over 50%</strong> (or totaled wrong): <strong>manager must verify and/or initial the correction</strong>.</p><p>Treat vouchers <strong>like cash</strong>. A voucher is <strong>not valid unless signed</strong>. <strong>Cash advances are not permitted.</strong></p>"
    },
    {
      "cat": "Credit Cards (p. 45)",
      "title": "No Name on Voucher / Manual Key-In",
      "body": "<p>Two procedures are <strong>BOTH</strong> required:</p><ul><li><strong>Manual imprint</strong> of the card (make sure it's legible)</li><li><strong>Photo I.D.</strong> (driver's license etc.) to verify identity AND signature</li></ul><p style=\"color:var(--danger); font-weight:700;\">ONE infraction in this area may lead to separation of employment!</p>"
    },
    {
      "cat": "Credit Cards (p. 45)",
      "title": "Accepted & Not Accepted Payments",
      "body": "<p><strong>Accepted:</strong> Visa, Mastercard, American Express, Discover, gift cards.</p><p><strong>NOT accepted:</strong> Traveler's checks, personal checks (any amount), cash advances on cards.</p><p>Signature on the voucher must match the name on the card AND the signature on the back of the card — mismatch: request re-sign + driver's license; if refused, get a manager.</p>"
    },
    {
      "cat": "Gift Cards (p. 46)",
      "title": "Gift Card Denominations & the $200 Rule",
      "body": "<p>Any denomination from <strong>$10.00 to $1,000</strong>, obtained through your <strong>manager</strong>.</p><p><strong>Gift card purchases of $200.00 or more paid by credit card MUST involve a manager</strong> before completing the transaction.</p>"
    },
    {
      "cat": "Gift Cards (p. 46)",
      "title": "Gift Card / Card Fraud Red Flags",
      "body": "<p>Two most common fraud indications:</p><ul><li>The cardholder's <strong>name does not appear</strong> on the printed slip</li><li>The <strong>numbers on the slip don't match</strong> the card</li></ul><p style=\"color:var(--danger); font-weight:700;\">Summon a manager IMMEDIATELY — the transaction is called into the merchant for approval.</p>"
    },
    {
      "cat": "Comps (p. 46)",
      "title": "Comps Rule #1 + the Four You Use Most",
      "body": "<p><strong>All comps and discounts are handled by the MANAGER ONLY.</strong></p><p>Most frequent:</p><ul><li><strong>Food Comp Birthday</strong> — 10% off entire check with proper ID; license number written on bottom of check</li><li><strong>Food Comp Police</strong> — uniformed, Police Menu, food only</li><li><strong>Food Comp Shift</strong> — 50%, Employee Menu, on premises before/after shift</li><li><strong>Food Comp Employee Off Duty</strong> — 10%, recent pay stub</li></ul>"
    },
    {
      "cat": "Comp Chart (p. 46)",
      "title": "Comp Chart — Food Codes",
      "body": "<ul><li><strong>FOODCOMP-MANAGER 100%</strong> — manager meals</li><li><strong>FOODCOMP-BIRTHDAY 10%</strong> — birthday promo meals</li><li><strong>FOODCOMP-POLICE 20%</strong> — uniformed police meals</li><li><strong>FOODCOMP-LUNCHCLUB 100%</strong> — complimentary 11th lunch with a filled lunch club card</li><li><strong>FOODCOMP-GOODWILL 100%</strong> — empathy for a mistake, guest satisfaction, appreciation, loyalty</li><li><strong>FOODCOMP-CORP 100%</strong> — corporate officers & supervisors</li><li><strong>FOODCOMP-COOKS 100%</strong> — cook shift meals, employee menu</li><li><strong>FOODCOMP-SHIFT 50%</strong> — employee shift meals</li><li><strong>FOODCOMP-EMP/OFF-DUTY 10%</strong> — employee off-duty meals</li></ul>"
    },
    {
      "cat": "Comp Chart (p. 46)",
      "title": "Comp Chart — Promo Codes",
      "body": "<ul><li><strong>PROMO-LIQUOR/BAR 100%</strong> — any alcoholic beverage that is comped</li><li><strong>PROMO-TSHIRT/HAT 100%</strong> — T-shirt / hat / all retail giveaways</li><li><strong>PROMO-N/A BEV 100%</strong> — any non-alcoholic beverage that is comped</li></ul>"
    },
    {
      "cat": "Employee Discounts (p. 46)",
      "title": "Employee Meal & Off-Duty Rules",
      "body": "<p><strong>Shift meals (50%):</strong> Employee Menu, eaten <strong>on the premises before or after your shift</strong>.</p><p><strong>Off-duty (10%):</strong> off the entire check — employee must present a <strong>recent pay stub</strong> and be <strong>seated with the party</strong>. No handing discounts to buddies.</p>"
    },
    {
      "cat": "Tip Declaration (p. 45)",
      "title": "The Law on Tips — Three Requirements",
      "body": "<ol><li><strong>100% of tips are taxable</strong> — report ALL tips (cash, charge card, from other employees, minus tip-outs).</li><li><strong>Report tips to your employer</strong> — at Flanigan's, every shift when you are out.</li><li><strong>Keep a daily tip diary</strong> or other written evidence, in addition to daily reporting.</li></ol>"
    },
    {
      "cat": "Tip Declaration (p. 45)",
      "title": "The 8% Myth",
      "body": "<p>8% is NOT \"tax-free\" — it's just a threshold where employers must report extra info to the IRS. Flanigan's posts an approximate percentage-of-sales figure as a <strong>reference only</strong>.</p><p><strong>ALL tips must be reported after each shift.</strong> Flanigan's has a Tip Reporting Alternative Commitment (TRAC) with the IRS and monitors tips regularly.</p>"
    },
    {
      "cat": "Tip Declaration (p. 45)",
      "title": "THE AUDIT!!!",
      "body": "<p>Falsifying tip income is <strong>ILLEGAL</strong>.</p><p>If the IRS finds underreporting: extra taxes + penalties and interest up to <strong>50% of the assessed tax for each year audited</strong> — and the IRS can go back up to <strong>six years</strong> in some cases.</p>"
    },
    {
      "cat": "Joe's To-Go (Day 8 lesson)",
      "title": "Joe's To-Go — Big 5",
      "body": "<ol><li><strong>Legendary greeting & guest info</strong> — Smile Talk, start a tab, name + phone, confirm location, give full address</li><li><strong>Order accuracy & suggestive selling</strong> — specific questions, apps/dessert/drinks, free coleslaw where applicable</li><li><strong>Confirm, verify & communicate</strong> — repeat order, verify total incl. 10% to-go charge, est. ready time</li><li><strong>Presentation & in-person pick-up</strong> — Smile Talk, item-by-item, condiments, inspect before leaving</li><li><strong>Friendly farewell & follow-through</strong> — Smile Talk goodbye</li></ol>"
    },
    {
      "cat": "Joe's To-Go (Day 8 lesson)",
      "title": "To-Go Money & Pickup Rules",
      "body": "<ul><li><strong>10% to-go charge</strong> — NOT applied when the guest is dining in and also ordering to-go</li><li>Credit card must belong to the <strong>person picking up</strong> the order</li><li>Not picked up within <strong>15 minutes</strong>? Call the number on file</li><li>Guest inspects the order before leaving — <strong>no refunds once the order leaves the premises</strong></li></ul>"
    },
    {
      "cat": "Evaluations (Day 8 lesson)",
      "title": "Written Evaluations — Not Always Bad",
      "body": "<p>The Written Evaluation form has <strong>two purposes</strong>: recognize positive behavior (a \"positive write-up\") and correct unacceptable behavior (a \"negative write-up\").</p><p>Reviewed <strong>in person</strong> with the employee, <strong>signed by both</strong> employee and manager. A copy is filed on-site in the employee's record; the original is emailed to the main office.</p>"
    }
  ],
  sheet: [
    {
      "group": "Page 45: Checkout & Cash Handling",
      "items": [
        {
          "name": "Checkout Procedure (Steps 1–3)",
          "tag": "Checkout",
          "spec": "All Checks Closed → \"Of This Shift\" Report → Cards First",
          "desc": "Make sure all checks are closed. Run the checkout report \"Of This Shift\". Check all credit cards FIRST and match totals to the report — if totals don't match, STOP and get a manager to correct the credit cards.",
          "extra": []
        },
        {
          "name": "Cash to Remit",
          "tag": "Checkout",
          "spec": "Your Responsible Cash Amount",
          "desc": "\"Cash to remit\" is the amount of cash you are responsible for remitting. Your drop should be done in a neat and orderly fashion, with all monies facing the same direction.",
          "extra": []
        },
        {
          "name": "Drops Are Managers Only",
          "tag": "Checkout",
          "spec": "MANAGERS ONLY!",
          "desc": "Bring the checkout to a manager to be signed and dropped in the safe. Servers are not allowed to make their own drop.",
          "extra": [
            "You are responsible for this money (and all money during your shift) until it is put into a manager's hand and signed.",
            "You must turn in your checkout even on a slow shift where you ran one table."
          ]
        }
      ]
    },
    {
      "group": "Page 45: Credit Card Rules",
      "items": [
        {
          "name": "Accepted Cards & Payments",
          "tag": "Credit Cards",
          "spec": "Visa, MC, Amex, Discover, Gift Cards",
          "desc": "Acceptable credit cards: Visa, Mastercard, American Express and Discover, plus Flanigan's gift cards. Traveler's checks are NOT accepted. Personal checks are NOT accepted (any amount). Cash advances on credit cards are not permitted.",
          "extra": []
        },
        {
          "name": "Signature Verification",
          "tag": "Credit Cards",
          "spec": "Voucher Signature = Card Name = Back-of-Card Signature",
          "desc": "Check the signature on the back of the card against the voucher signature. A voucher is not valid unless signed, and the signature MUST match the name on the card. Real refusals have happened (card \"JOHN SMITH\" signed \"JIM BROWN\"). Mismatch: request re-sign plus a driver's license; if they refuse, get a manager.",
          "extra": []
        },
        {
          "name": "Declined Cards",
          "tag": "Credit Cards",
          "spec": "Repeat Once, Then Manager",
          "desc": "If a credit card is declined, repeat the process once. If DECLINED TWICE, notify the manager and let them handle it from there.",
          "extra": []
        },
        {
          "name": "Credit Card Tips Over 50%",
          "tag": "Credit Cards",
          "spec": "Manager Verify + Initial Required",
          "desc": "If a credit card tip is over 50% or totaled wrong, you MUST get your manager to verify the tip and/or initial the correction.",
          "extra": [
            "Worksheet answer: can you add a tip to a voucher after the guest leaves if they \"forgot\"? NO."
          ]
        },
        {
          "name": "No Name on Voucher / Manual Key-In",
          "tag": "Credit Cards",
          "spec": "Manual Imprint + Photo I.D. — Both",
          "desc": "When the computer imprint shows NO NAME on the voucher, or you manually key the card number, two procedures must be followed: (1) manually imprint the card with a legible imprint, and (2) request a photo I.D. to verify both identity and signature.",
          "extra": [
            "ONE infraction in this area may lead to separation of employment!"
          ]
        },
        {
          "name": "Vouchers Are Like Cash",
          "tag": "Credit Cards",
          "spec": "Handle With Care",
          "desc": "Treat all credit card vouchers like cash. Check the card number and guest's name against the number and name printed on the voucher.",
          "extra": []
        }
      ]
    },
    {
      "group": "Page 46: Gift Cards & Card Fraud",
      "items": [
        {
          "name": "Gift Card Denominations",
          "tag": "Gift Cards",
          "spec": "$10.00 – $1,000 via Manager",
          "desc": "Flanigan's gift cards accommodate any denomination from $10.00 to $1000. They are obtained through your manager. A $1,000 gift card CAN be issued.",
          "extra": []
        },
        {
          "name": "The $200 Manager Rule",
          "tag": "Gift Cards",
          "spec": "$200+ on Credit Card → Manager",
          "desc": "Gift card purchases of $200.00 or more paid using a credit card must involve a manager before completing the transaction. Scenario: skipping the manager on a $300 gift card purchase is TOTALLY NOT OK.",
          "extra": []
        },
        {
          "name": "Counterfeit Card Red Flags",
          "tag": "Fraud",
          "spec": "Missing Name / Mismatched Numbers",
          "desc": "Most common fraud indications: (1) the cardholder's name does not appear on the printed slip, and (2) the numbers on the slip don't match the credit card. A manager must be summoned immediately and the transaction called into the merchant for approval.",
          "extra": []
        }
      ]
    },
    {
      "group": "Page 46: Comps & Discounts (Full Chart)",
      "items": [
        {
          "name": "Comps Rule #1",
          "tag": "Comps",
          "spec": "Manager Only — Always",
          "desc": "All comps and discounts are handled by the manager only, and must be entered and approved by a manager. Servers never comp or discount on their own.",
          "extra": []
        },
        {
          "name": "FOODCOMP-MANAGER 100%",
          "tag": "Comp Chart",
          "spec": "100%",
          "desc": "Manager meals.",
          "extra": []
        },
        {
          "name": "PROMO-LIQUOR/BAR 100%",
          "tag": "Comp Chart",
          "spec": "100%",
          "desc": "Any alcoholic beverage that is comped.",
          "extra": []
        },
        {
          "name": "FOODCOMP-BIRTHDAY 10%",
          "tag": "Comp Chart",
          "spec": "10% off Entire Check",
          "desc": "Birthday promo meals — requires proper ID, and the license number needs to be written on the bottom of the guest check.",
          "extra": []
        },
        {
          "name": "FOODCOMP-POLICE 20%",
          "tag": "Comp Chart",
          "spec": "Uniformed Officers / Food Only",
          "desc": "Uniformed police meals are only to be ordered from the Police Menu. Items ordered off the regular menu are NOT discounted. Applies to food only.",
          "extra": []
        },
        {
          "name": "FOODCOMP-LUNCHCLUB 100%",
          "tag": "Comp Chart",
          "spec": "11th Lunch Free",
          "desc": "Complimentary 11th lunch with a filled lunch club card.",
          "extra": []
        },
        {
          "name": "FOODCOMP-GOODWILL 100%",
          "tag": "Comp Chart",
          "spec": "Guest Recovery",
          "desc": "Used in various situations to show empathy for a mistake, enhance guest satisfaction, express appreciation, encourage loyalty, etc.",
          "extra": []
        },
        {
          "name": "FOODCOMP-CORP 100%",
          "tag": "Comp Chart",
          "spec": "Corporate",
          "desc": "Corporate officers and supervisors.",
          "extra": []
        },
        {
          "name": "FOODCOMP-COOKS 100%",
          "tag": "Comp Chart",
          "spec": "Kitchen Crew",
          "desc": "Cook shift meals — employee menu.",
          "extra": []
        },
        {
          "name": "FOODCOMP-SHIFT 50%",
          "tag": "Comp Chart",
          "spec": "Employee Menu / On Premises",
          "desc": "Employee shift meals from the Employee menu. Employee meals are to be eaten on the premises before or after your shift.",
          "extra": []
        },
        {
          "name": "FOODCOMP-EMP/OFF-DUTY 10%",
          "tag": "Comp Chart",
          "spec": "10% / Pay Stub Required",
          "desc": "Employee off-duty meals: 10% off the entire check when eating at Flanigan's off duty. The employee must present a recent pay stub and be seated with the party.",
          "extra": [
            "Scenario: giving your buddy an employee discount when they show up without you is TOTALLY NOT OK."
          ]
        },
        {
          "name": "PROMO-TSHIRT/HAT 100%",
          "tag": "Comp Chart",
          "spec": "Retail Giveaways",
          "desc": "T-shirt / hat / all retail giveaways.",
          "extra": []
        },
        {
          "name": "PROMO-N/A BEV 100%",
          "tag": "Comp Chart",
          "spec": "Non-Alcoholic",
          "desc": "Any non-alcoholic beverage that is comped.",
          "extra": []
        }
      ]
    },
    {
      "group": "Page 45: Tip Declaration & the IRS",
      "items": [
        {
          "name": "The Law on Tips",
          "tag": "Tip Declaration",
          "spec": "100% Taxable",
          "desc": "Every tipped employee must report ALL tips received as income — cash tips, charge card tips, and tips from other employees, minus what you tip out. Falsifying tip income is ILLEGAL.",
          "extra": []
        },
        {
          "name": "Report to Your Employer",
          "tag": "Tip Declaration",
          "spec": "Every Shift, On the Way Out",
          "desc": "The IRS requires you to report tips to your employer. At Flanigan's, each server MUST report all tips at the end of their shift when they are out. Do NOT round your tip declaration down — report exact amounts.",
          "extra": []
        },
        {
          "name": "Tip Diary / Written Evidence",
          "tag": "Tip Declaration",
          "spec": "Daily Records Required",
          "desc": "Keep a daily \"tip diary\" or other written evidence to prove your tip income. These records are in addition to the daily reporting of tips to Flanigan's.",
          "extra": []
        },
        {
          "name": "The 8% Myth",
          "tag": "Tip Declaration",
          "spec": "Reference Only",
          "desc": "The 8% figure is a widespread misconception — it's only a threshold below which employers must report certain additional information to the IRS. Flanigan's posts an approximate percentage-of-sales figure as a reference; ALL tips are required to be reported after each shift. Flanigan's is in a Tip Reporting Alternative Commitment (TRAC) agreement with the IRS.",
          "extra": []
        },
        {
          "name": "THE AUDIT!!!",
          "tag": "IRS",
          "spec": "Up to 50% Penalties / 6-Year Lookback",
          "desc": "If an IRS audit finds underreported tips, you pay additional taxes PLUS penalties and interest that could be as much as 50% of the assessed tax for each year audited. The IRS can go back as many as six years in some cases.",
          "extra": []
        }
      ]
    },
    {
      "group": "Day 8 Lesson: Joe's To-Go Big 5",
      "items": [
        {
          "name": "1. Legendary Greeting & Guest Info",
          "tag": "To-Go Big 5",
          "spec": "Smile Talk + Tab",
          "desc": "\"Thank you for calling Flanigan's, home of the legendary baby back ribs. My name is ____.\" Always start a tab in the POS; enter guest name and phone; confirm which Flanigan's they reached; provide the unit's full address including city.",
          "extra": []
        },
        {
          "name": "2. Order Accuracy & Suggestive Selling",
          "tag": "To-Go Big 5",
          "spec": "Ask. Offer. Estimate.",
          "desc": "Ask specific questions about every item (temp, sides, dressings). Offer complimentary coleslaw when applicable. Offer appetizers, dessert and drinks. Give an estimated ready time and confirm the order.",
          "extra": []
        },
        {
          "name": "3. Confirm, Verify & Communicate",
          "tag": "To-Go Big 5",
          "spec": "Repeat + Total + 10%",
          "desc": "Repeat the order back for accuracy. Verify the total including the 10% to-go charge. For credit cards: \"The card used for payment must belong to the person picking up the order.\" If the order is not picked up within 15 minutes, call the number on file.",
          "extra": []
        },
        {
          "name": "4. Presentation & In-Person Pick-Up",
          "tag": "To-Go Big 5",
          "spec": "Item-by-Item Check",
          "desc": "Smile Talk at pick-up. Go over the order item-by-item with the guest. Confirm condiments, plasticware and napkins. Remind the guest to inspect the order before leaving — no refunds once the order leaves the premises.",
          "extra": []
        },
        {
          "name": "5. Friendly Farewell & Follow-Through",
          "tag": "To-Go Big 5",
          "spec": "Smile Talk Goodbye",
          "desc": "\"Thanks again! Have a great night and come back soon!\" If the guest is dining in and also placing a to-go order, do NOT apply the 10% to-go charge.",
          "extra": []
        }
      ]
    },
    {
      "group": "Day 8 Lesson: Evaluations & Final Assessment",
      "items": [
        {
          "name": "Written Evaluation Form",
          "tag": "Evaluations",
          "spec": "Positive OR Negative",
          "desc": "The Written Evaluation serves two purposes: recognize and reinforce positive behavior (a \"positive write-up\") and address unacceptable behavior (a \"negative write-up\"). A written evaluation is NOT always a bad thing.",
          "extra": []
        },
        {
          "name": "Evaluation Paperwork",
          "tag": "Evaluations",
          "spec": "In Person + Both Sign",
          "desc": "All evaluations are reviewed in person with the employee and signed by both the employee and the manager. A copy is filed on-site in the employee's record; the original is emailed to the main office.",
          "extra": []
        },
        {
          "name": "Day 8 Floor Goals",
          "tag": "Day 8 Focus",
          "spec": "Full Section + Big Party",
          "desc": "Run your full section effectively, manage a large party successfully, and handle a double-seated scenario. Final assessment: a manager roleplay simulating a full-service table from start to finish, with leadership observing and giving feedback.",
          "extra": []
        }
      ]
    }
  ]
};
