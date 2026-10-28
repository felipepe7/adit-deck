/* Facebook Groups plan, one object per month (newest last, newest opens by default).
   The group list itself (sponsored groups, access, who can post) comes from groups-list.js,
   which the daily refresh rebuilds from the FB Groups Mastersheet. Results come from the
   Group Post Log via stats.js. Slots point at groups by key (see groups-list.js). */
const GROUPS_HUB = {
  postLog: "https://docs.google.com/spreadsheets/d/1uCEDkEqcjAUYtKE1lgm3mPFhb5fdfZUdGNzs89ny4CA/edit",
  mastersheet: "https://docs.google.com/spreadsheets/d/1Igp0VactRiADil_jTmBdUm93vZhSxG5cpC7Mk1nq9cc/edit",
  playbook: "https://drive.google.com/file/d/1rrVGAf9xOrDz8xa6vX6ii0awNQfHCsWr/view"
};

const VERTICALS = [
  { id: "dental", label: "Dental", color: "#25A8E0" },
  { id: "chiro", label: "Chiro", color: "#FDB913" },
  { id: "opto", label: "Optometry", short: "Opto", color: "#2DDC96" },
  { id: "ortho", label: "Ortho", color: "#F28820" }
];

const GROUP_MONTHS = [
  {
    id: "nov", tab: "November", year: "2026", state: "Plan",
    summary: "Every sponsored group gets two posts a month. Post 1 goes out in week 1. Week 3 reruns whatever won week 1 in the rooms that haven't seen it, so the best post earns the most room.",
    weeks: {
      w1: { label: "Week 1", range: "Nov 2 to 8" },
      w3: { label: "Week 3", range: "Nov 16 to 22" }
    },
    decideBy: "Fri Nov 13",
    menu: [
      /* ---------------- DENTAL ---------------- */
      { id: "D1", v: "dental", status: "Needs Adit approval", kind: "Post 1 · Debate", room: "Office manager rooms",
        title: "Would Your Front Desk Have Answered That Call?", talent: "Shelley Bostrom, Align My Practice",
        media: { type: "video", src: "media/w2/shelley-ai-call.mp4", poster: "media/w2/shelley-ai-call.jpg" }, format: "Native video · about 60s",
        caption: [
          "Quick one for the office managers in here.",
          "At WOCON in Monterey, Shelley Bostrom (Align My Practice) picked up her phone on stage and called an AI receptionist as a brand-new patient, in front of a full room.",
          "It answered right away, took her name and date of birth, handled \"I don't have insurance,\" and booked her into the next open consult. The whole call is in the video.",
          "Honest question: on a busy afternoon, how many rings before someone at your front desk picks up?"
        ],
        firstComment: "Full disclosure, I work with Adit, the system on that call. Happy to show anyone how offices set up the call rules.",
        why: "Office managers are our best audience in the groups, and missed calls are lane one in the playbook. The proof comes from an outside consultant on stage, not from us, so it reads like a story instead of a pitch, and the question gets every OM sharing their own number.",
        notes: ["Post the 60s cut. Instagram ran a different Shelley reel on Wed 10/28, so this clip is still fresh."],
        drive: "https://drive.google.com/file/d/1v-b-hOl-1277sK4K7CSlLFGj7Kp_5F3m/view?usp=drive_link" },

      { id: "D2", v: "dental", status: "Ready", kind: "Post 1 · Debate", room: "Owner rooms",
        title: "The 7 Fastest Ways Practices Lose Money", talent: "Josh Gosnell",
        media: { type: "video", src: "media/w2/thu.mp4", poster: "media/w2/thu.jpg" }, format: "Native video · about 45s",
        caption: [
          "I ranked the 7 fastest ways I see practices lose money. Curious if the owners in here agree with the order.",
          "1. Losing a great employee\n2. Poor reviews\n3. No-shows\n4. Unscheduled treatment\n5. Overdue recall\n6. Disconnected software\n7. After-hours gaps",
          "The one most offices can fix this week is number 2.",
          "What would you move up or down?"
        ],
        variant: "In The Business of Dentistry we can't reply, so end it with: \"If you want the numbers behind each one, send me a DM.\"",
        why: "Ranking videos are our best format (the Sep 18 tier list reached 1,843 views). Owners love arguing about the order, and every item on the list is something Adit fixes, without the post ever saying so.",
        notes: ["Same cut as Thursday 10/29 on Instagram. Josh posts it in his own voice."],
        drive: "https://drive.google.com/file/d/1Jy9OsEBj6yLFOqWst89D4MzAfBobnGQL/view?usp=drive_link" },

      { id: "D3", v: "dental", status: "Ready", kind: "Soldier post · Question", room: "Office manager rooms",
        title: "The No-Show Policy You Actually Enforce", talent: "Josh Gosnell",
        media: { type: "video", src: "media/w0928/mon-b.mp4", poster: "media/w0928/mon-b.jpg" }, format: "Native video · 14s",
        caption: [
          "Office managers, what's the no-show policy you actually enforce?",
          "Not the one in the new patient packet. The one your front desk really holds the line on.",
          "Deposit to book? Three strikes? A call the day before and a text the morning of? I'm collecting what works and I'll share the list back here."
        ],
        why: "No-shows are a top three pain in every dental room. A soldier asking a real question gets answers instead of suspicion, and the replies become next month's hooks.",
        notes: ["Soldier posts have no monthly cap in sponsored groups, so this doesn't use a slot.", "Whoever posts it owes the group the list. That's the research loop."],
        ig: "https://www.instagram.com/reel/Dd11WMfkZ04/" },

      { id: "D4", v: "dental", status: "Waiting on Adit", kind: "Post 2 · Offer", room: "All dental rooms",
        title: "October by the Numbers + November's Challenge", talent: "Adit Review Challenge",
        media: { type: "mock", kind: "numbers" }, format: "Image post",
        caption: [
          "In October, 19 dental, ortho, chiro and optometry practices turned asking for Google reviews into a team sport, and added 119 new reviews in one month.",
          "We're running it again in November. If your office wants in, comment CHALLENGE and I'll send you the details as soon as it opens."
        ],
        why: "Practices that never saw the Instagram contest get a reason to follow Adit, which is the whole point of the monthly challenges. Every CHALLENGE comment becomes a DM and a practice contact.",
        notes: ["Counts are as of Oct 25. Final numbers go in after the Oct 31 close.", "Needs Adit's green light on November's challenge and prize."] },

      { id: "D5", v: "dental", status: "Filming in November", kind: "Coming", room: "Dental rooms",
        title: "Periodontist Office Shoot", talent: "A periodontist in California",
        media: { type: "coming", line: "10 reels in his office" }, format: "10 reels",
        why: "A doctor saying it in his own office lands harder in the groups than anyone from Adit. These take over the dental rooms from mid-November.",
        notes: ["The shoot plan goes to the doctor before we film, built from the best-performing doctor reels."] },

      /* ---------------- CHIRO ---------------- */
      { id: "C1", v: "chiro", status: "After Nov 2", kind: "Post 1 · Story", room: "Chiro marketing rooms",
        title: "A Chiropractic Office Led the Board", talent: "Cook Chiropractic",
        media: { type: "mock", kind: "chirotop" }, format: "Image post",
        caption: [
          "Fun one for the chiro docs in here. Adit ran a Google review challenge in October with 19 dental, ortho, optometry and chiropractic practices.",
          "The office that led the board from the first leaderboard to the last was a chiropractic office: Cook Chiropractic.",
          "So I'm curious how chiro offices ask for reviews. At checkout? A text after the visit? The doctor in the room? What actually works with your patients?"
        ],
        why: "A chiro office beating every dental practice is a story chiro rooms want to hear, and the question underneath it is pure peer advice. No pitch needed.",
        notes: ["Post after winners are verified Monday, Nov 2. Use the final practice count.", "Get Dr. Jesse Cook's OK to name the practice."] },

      { id: "C2", v: "chiro", status: "Needs Adit approval", kind: "Post 1 · Debate", room: "Solo doc rooms",
        title: "Who Answers the Phone While You're Adjusting?", talent: "Shelley Bostrom, Align My Practice",
        media: { type: "video", src: "media/w2/shelley-ai-call.mp4", poster: "media/w2/shelley-ai-call.jpg" }, format: "Native video · about 60s",
        caption: [
          "Question for the solo docs: who answers the phone while you're mid-adjustment?",
          "This was filmed live on stage at a practice conference. A consultant called an AI receptionist as a brand-new patient. It answered right away, handled \"I don't have insurance,\" and booked her before she hung up.",
          "Not saying it's for everyone. But when you're with a patient, what actually happens to the calls?"
        ],
        firstComment: "I work with Adit, the system on that call. Happy to show anyone how the call rules get set up.",
        why: "The playbook calls this the most natural front desk conversation in any vertical: a solo chiro can't answer mid-adjustment. The \"I don't have insurance\" moment speaks straight to cash practices.",
        notes: ["Same clip as D1, reframed for chiro."],
        drive: "https://drive.google.com/file/d/1v-b-hOl-1277sK4K7CSlLFGj7Kp_5F3m/view?usp=drive_link" },

      { id: "C3", v: "chiro", status: "Ready", kind: "Post 2 · Debate", room: "All chiro rooms",
        title: "Is Care-Plan Drop-Off Missing From This List?", talent: "Josh Gosnell",
        media: { type: "video", src: "media/w2/thu.mp4", poster: "media/w2/thu.jpg" }, format: "Native video · about 45s",
        caption: [
          "Our VP of Revenue ranked the 7 fastest ways practices lose money: losing a great employee, poor reviews, no-shows, unscheduled treatment, overdue recall, disconnected software and after-hours gaps.",
          "He filmed it for dental offices, but I think chiro has its own number one: patients dropping off mid care plan.",
          "Would you put that at the top, or does something else cost your office more?"
        ],
        why: "Care-plan drop-off is the top chiro pain in the playbook. Borrowing Josh's list and adding the chiro twist starts a debate without a pitch.",
        notes: ["John or Gokul posts it, so it's written in a team voice."],
        drive: "https://drive.google.com/file/d/1Jy9OsEBj6yLFOqWst89D4MzAfBobnGQL/view?usp=drive_link" },

      { id: "C4", v: "chiro", status: "Filming in November", kind: "Coming", room: "Chiro rooms",
        title: "Chiropractor Office Shoot", talent: "A chiropractor in his office",
        media: { type: "coming", line: "Our first chiro footage" }, format: "Reels",
        why: "Our first chiro footage. A chiropractor saying it in his own office will carry these rooms better than anything we have now." },

      /* ---------------- OPTOMETRY ---------------- */
      { id: "O1", v: "opto", status: "Needs Adit approval", kind: "Post 1 · Debate", room: "OZ Group",
        title: "You Don't Need to Rip Out Your EHR", talent: "Steven Marinkovich",
        media: { type: "video", src: "media/w2/tue.mp4", poster: "media/w2/tue.jpg" }, format: "Native video · 37s",
        caption: [
          "For the OZ crew: which EHR is your office on? CrystalPM, RevolutionEHR, OfficeMate, Eyefinity, something else?",
          "Steven from our team filmed this at a conference in Orlando. His point: most eye care offices don't need a new EHR. They need the phones, texts, scheduling and forms around it to finally talk to each other.",
          "What's the one thing you wish your EHR connected to?"
        ],
        why: "\"I'm not switching my EHR\" is the first objection ODs raise, and this answers it in 37 seconds. Asking which EHR they're on gets easy replies and tells us who runs what.",
        notes: ["Same reel as Tuesday 10/27 on Instagram (v5)."] },

      { id: "O2", v: "opto", status: "Ready", kind: "Post 1 · Proof", room: "ODs on Facebook",
        title: "Dr. Jinen Shah on Adit + RevolutionEHR", talent: "Dr. Jinen Shah",
        media: { type: "youtube", id: "Eaqw15pNnd4" }, format: "Native video · Adit testimonial library",
        caption: [
          "A lot of ODs tell us switching EHRs is a non-starter. Fair. You don't have to.",
          "Dr. Jinen Shah runs his practice on RevolutionEHR and talked us through how Adit integrates with it.",
          "If you're on RevEHR and want to see what that looks like in a real office, send me a DM."
        ],
        why: "An OD vouching for the integration is the strongest answer to the EHR objection. ODs on Facebook doesn't let us reply, so the DM ask is built into the post.",
        notes: ["Upload the original file from Adit's library, not a YouTube link. Groups bury link posts."],
        yt: "https://www.youtube.com/watch?v=Eaqw15pNnd4" },

      { id: "O3", v: "opto", status: "Ready", kind: "Post 2 · Question", room: "OZ Group",
        title: "Jessica Graham: About 5 Hours Back a Week", talent: "Jessica Graham",
        media: { type: "youtube", id: "vjnQTtTBM-8" }, format: "Native video · Adit testimonial library",
        caption: [
          "Office managers: if you got 5 hours back every week, where would they go?",
          "That's roughly what Jessica Graham says Adit saves her optometry office.",
          "Genuinely curious what eats the most time at your front desk right now."
        ],
        why: "OZ Group is the OM home turf in the playbook. Five hours a week is a number every OM can picture, and the question keeps it about them, not us.",
        notes: ["Original file from Adit's library."],
        yt: "https://www.youtube.com/watch?v=vjnQTtTBM-8" },

      { id: "O4", v: "opto", status: "Ready", kind: "Backup · Proof", room: "Either opto group",
        title: "Dr. Kevin Gee: Everything Is in One Place", talent: "Dr. Kevin Gee",
        media: { type: "youtube", id: "qtHzh5M2-7M" }, format: "Native video · Adit testimonial library",
        caption: [
          "Dr. Kevin Gee summed up his office after Adit in five words: everything is in one place.",
          "ODs, how many different systems does your front desk log into on a normal day?"
        ],
        why: "Short, quotable proof from an OD, with a question anyone can answer with one number.",
        yt: "https://www.youtube.com/watch?v=qtHzh5M2-7M" },

      { id: "O5", v: "opto", status: "Needs numbers check", kind: "Post 2 · Data", room: "Either opto group",
        title: "One Month, 17,540 Calls Answered", talent: "Adit optometry data",
        media: { type: "mock", kind: "optodata" }, format: "Image post",
        caption: [
          "Some numbers from Adit's optometry offices that surprised us.",
          "In one month, across nearly 200 eye care practices, the AI front desk answered 17,540 calls, about 29,210 minutes of patient conversations, and booked 2,424 appointments.",
          "Those are patients who got an answer when the office couldn't pick up.",
          "How many calls do you think your office misses in a week?"
        ],
        why: "The playbook's note on optometry: we genuinely have the best data in this vertical, so use it honestly. A data drop invites ODs to compare, and the question turns it back to them.",
        notes: ["Figures come from Adit's optometry roll-up in the August shoot plan. Arun to confirm they're the latest before this posts."] },

      /* ---------------- ORTHO ---------------- */
      { id: "R1", v: "ortho", status: "No group access", kind: "Post 1 · Proof", room: "Any ortho room",
        title: "Dr. Rita Chuang on Getting Hours Back", talent: "Dr. Rita Chuang, CAO president",
        media: { type: "video", src: "media/w1012/tue-a.mp4", poster: "media/w1012/tue-a.jpg" }, format: "Native video · 73s",
        caption: [
          "We didn't script this one. Dr. Rita Chuang, president of the CAO, on what changed in her practice.",
          "She doesn't talk about features. She talks about time: the calls that get captured, the admin that stops eating the day, and what her team does with the hours that come back.",
          "Ortho teams, where do your hours actually go?"
        ],
        why: "Our most viewed reel of October, and an association president vouching on camera. It's ready the day we get into an ortho group.",
        ig: "https://www.instagram.com/reel/Deb4CnigvZ6/" },

      { id: "R2", v: "ortho", status: "No group access", kind: "Post 1 · Debate", room: "TC rooms",
        title: "Every Practice Has Gaps to Close", talent: "Shelley Bostrom, Align My Practice",
        media: { type: "video", src: "media/w2/fri.mp4", poster: "media/w2/fri.jpg" }, format: "Native video · 22s",
        caption: [
          "Shelley Bostrom opened her WOCON session with a line every ortho team needs to hear: every one of you has gaps to close, and a huge opportunity to improve new patient consults.",
          "TCs, where's the biggest leak in your new patient process? The first call, the consult, or the follow-up?"
        ],
        why: "Treatment coordinators are ortho's special persona in the playbook, and they love talking craft. This hands them the mic.",
        drive: "https://drive.google.com/file/d/1DvjBE1Q1mb85TjH5ynE62ux07DIUmLP8/view?usp=drive_link" },

      { id: "R3", v: "ortho", status: "No group access", kind: "Post 2 · Debate", room: "Office manager rooms",
        title: "The 3 to 5 PM Phone Rush", talent: "Shelley Bostrom, Align My Practice",
        media: { type: "video", src: "media/w2/shelley-ai-call.mp4", poster: "media/w2/shelley-ai-call.jpg" }, format: "Native video · about 60s",
        caption: [
          "3 to 5 PM in an ortho office: every chair is full of kids and the phone won't stop.",
          "At WOCON, Shelley Bostrom called an AI receptionist on stage as a brand-new patient. It answered right away and booked her consult before she hung up.",
          "Who's covering your phones during the after-school rush?"
        ],
        why: "The after-school crush is a top ortho pain in the playbook, and this is live proof from a consultant ortho teams already trust.",
        drive: "https://drive.google.com/file/d/1v-b-hOl-1277sK4K7CSlLFGj7Kp_5F3m/view?usp=drive_link" }
    ],

    /* Two slots per sponsored group. post = menu id, decide = rerun the best of week 1. */
    slots: {
      "nifty-thrifty-dentists":                 { w1: { post: "D2", day: "Mon Nov 2" }, w3: { decide: true, day: "Mon Nov 16" } },
      "dental-nachos":                          { w1: { post: "D2", day: "Mon Nov 2" }, w3: { decide: true, day: "Mon Nov 16" } },
      "the-business-of-dentistry":              { w1: { post: "D2", day: "Mon Nov 2", note: "DM ending" }, w3: { post: "D4", day: "Mon Nov 16" } },
      "dental-office-managers-community":       { w1: { post: "D1", day: "Thu Nov 5" }, w3: { decide: true, day: "Thu Nov 19" } },
      "dentists-office-managers-team-network":  { w1: { post: "D1", day: "Thu Nov 5" }, w3: { decide: true, day: "Thu Nov 19" } },
      "dental-office-managers-leadership-network": { w1: { post: "D1", day: "Thu Nov 5" }, w3: { post: "D4", day: "Thu Nov 19" } },
      "milehighchiro":                          { w1: { post: "C2", day: "Tue Nov 3" }, w3: { decide: true, day: "Tue Nov 17" } },
      "chiropractic-worldwide":                 { w1: { post: "C2", day: "Tue Nov 3" }, w3: { post: "C3", day: "Tue Nov 17" } },
      "chiropractic-marketing":                 { w1: { post: "C1", day: "Tue Nov 3" }, w3: { decide: true, day: "Tue Nov 17" } },
      "forward-thinking-chiro-alliance":        { w1: { post: "C1", day: "Tue Nov 3" }, w3: { decide: true, day: "Tue Nov 17" } },
      "oz-group":                               { w1: { post: "O1", day: "Wed Nov 4" }, w3: { post: "O3", day: "Wed Nov 18" } },
      "ods-on-facebook":                        { w1: { post: "O2", day: "Wed Nov 4" }, w3: { decide: true, day: "Wed Nov 18" } }
    },

    asks: [
      { k: "Ortho access", v: "Three ortho posts are ready and there's nowhere to post them. All 14 ortho groups show no access, including Orthodontic Pearls, which Adit sponsors." },
      { k: "Dentistry in General", v: "Sponsored, but nobody on our side can post there yet. Who can get us in?" },
      { k: "Limits", v: "Confirm the monthly post limit for Dental Office Managers Leadership Network and Forward Thinking Chiro Alliance, and who posts in Forward Thinking." },
      { k: "Log every post", v: "After each group post, paste the link and the numbers into the Group Post Log. This page picks them up every morning." },
      { k: "Original files", v: "The original video files for Dr. Jinen Shah, Jessica Graham and Dr. Kevin Gee, so groups get a native upload instead of a YouTube link." },
      { k: "Testimonials", v: "Which verticals are Dr. Solomons, Dr. Samantha Love, Dr. Lindsay Floekey and Dr. Kyle Delk? Their testimonials could fill the dental and chiro menus." }
    ]
  }
];
