/* Adit x PuroFlow Media content calendar.
   To add a week: copy the last object in WEEKS, change the dates and days, drop the reels in media/wN/. */
const HUB = {
  handle: "@get_adit",
  folder: "https://drive.google.com/drive/folders/1V_CR-VNonq-Lrk2_FkKINx_5MWylALdE",
  feedback: "#adit-edits-revisions"
};

const WEEKS = [
  {
    id: "week-1", n: 1, range: "Oct 19 to 23", state: "Posted",
    theme: "Challenge + Thought Leadership",
    cover: { big: "OCT 19", to: "TO OCT 23", year: "2026" },
    summary: "5 reels edited and posted Monday through Friday on @get_adit.",
    glanceNote: "Challenge momentum on the bookends, thought leadership and social proof in the middle.",
    media: "media/w1/",
    days: [
      { id: "mon", day: "Monday", short: "Mon", date: "10/19", status: "Posted", format: "Reel · 36s",
        title: "Review Challenge Extended to Oct 31", bucket: "Challenge / Community", video: true,
        ig: "https://www.instagram.com/reel/DerbrE0Aiaq/",
        drive: "https://drive.google.com/file/d/1Uxn5PpyfMR148NDo3hjkU05f4Xp8F8gC/view?usp=drive_link",
        results: { views: 335, watch: "7.1s", likes: 11 },
        hook: "🚨🏆 The Adit Review Challenge just got extended 🔥",
        caption: [
          "Due to popular demand, the challenge is staying open through the end of October, and every Google review since October 1st now counts 👀",
          "$1,000 🥇 $500 🥈 $250 🥉 are still up for grabs.",
          "New board as of Oct 19: Cook 35, Canton 17, Breeze 14, with 4th through 7th separated by one point each 😳"
        ],
        thought: "Momentum post. Entries kept coming in after the first deadline, so we turned the extension into news: a fresh leaderboard, tighter races, and a reason for every practice to come back and comment CHALLENGE.",
        cta: "Comment CHALLENGE on this post. That is it. You are in 🙌",
        tags: "#AditReviewChallenge #DentalMarketing #GoogleReviews #PracticeGrowth",
        ask: "Comment CHALLENGE to join" },
      { id: "tue", day: "Tuesday", short: "Tue", date: "10/20", status: "Posted", format: "Reel · 35s",
        title: "What Doctors Miss About Business", bucket: "Thought Leadership", video: true,
        ig: "https://www.instagram.com/reel/Deun8PODHEB/",
        drive: "https://drive.google.com/file/d/1yMLJGxRR-_cyn0KugX-mEtj-jkD9R2LY/view?usp=drive_link",
        results: { views: 210, watch: "6.2s", likes: 8 },
        hook: "What do doctors misunderstand about business? 🤔📊",
        caption: [
          "Most doctors are incredible clinicians who were never trained to run a business. Josh Gosnell, VP of Revenue at Adit, says the biggest blind spot is simple: knowing your numbers.",
          "Peter Drucker put it best: you can't improve what you can't measure 📈 Your KPIs are the pulse of your practice and the roadmap to your growth."
        ],
        thought: "Authority post. Josh speaks to the business side of the practice, which is exactly where Adit's analytics live. Ending on a question drives comments, and the PS keeps the Review Challenge in front of a new audience.",
        cta: "👇 Which KPI do you check first every Monday? Drop it in the comments.",
        tags: "#DentalPractice #PracticeGrowth #KPIs #PracticeManagement",
        ask: "Which KPI do you check first?" },
      { id: "wed", day: "Wednesday", short: "Wed", date: "10/21", status: "Posted", format: "Reel · 46s",
        title: "Shelley Bostrom at WOCON", bucket: "Partner / Social Proof", video: true,
        ig: "https://www.instagram.com/reel/Dew2Bq_FFg2/",
        drive: "https://drive.google.com/file/d/1PJYkJzoEdBYE_F-8SlhF73QTE38GGvrM/view?usp=drive_link",
        results: { views: 387, watch: "13.0s", likes: 25 },
        hook: "When Shelley talks, practice owners listen. 🙌",
        caption: [
          "At WOCON in Monterey, Jeff Holt (Business Development, Adit Ortho) brought @alignmypractice founder Shelley Bostrom to the stage to talk about what every practice is really competing on: the patient experience.",
          "30 years in dental and ortho, 300+ doctors coached across three countries, and when she advises her offices, she loves pointing them to Adit. 💙"
        ],
        thought: "Social proof and partner love. A respected consultant endorsing Adit on stage carries more weight than any ad, tagging her brings her audience in, and it shows the Adit team showing up at events.",
        cta: "Thank you, Shelley, for an incredible session! 🧡 Relationship post, no hard ask.",
        tags: "#WOCON #Orthodontics #PatientExperience #PracticeGrowth",
        ask: "Thank-you close, tags @alignmypractice" },
      { id: "thu", day: "Thursday", short: "Thu", date: "10/22", status: "Posted", format: "Reel · 105s",
        title: "Josh's Dental Tech Tier List", bucket: "Thought Leadership / Product", video: true,
        ig: "https://www.instagram.com/reel/DezKXQAiP4a/",
        drive: "https://drive.google.com/file/d/1tvKl-TIDmwJPYrYdQsglzvzXJevyBwXL/view?usp=drive_link",
        results: { views: 298, watch: "6.4s", likes: 4 },
        hook: "Josh ranked dental technology from S tier to C tier 👀🦷",
        caption: [
          "🏆 S tier: two-way texting (98% of patients read a text within 60 seconds) and practice analytics.",
          "🥈 A tier: AI phone answering and AI-generated notes.",
          "🥉 C tier: virtual consults, digital forms and automated review requests.",
          "Josh's take on reviews: the best ask is still a personal, one-on-one ask from your team 🙌"
        ],
        thought: "Debate bait. Tier lists get people disagreeing in the comments, and every S tier pick is something Adit does. Ranking automated review requests in C tier sets up the Review Challenge: personal asks win.",
        cta: "👇 Where would YOU rank AI phone answering? Drop your tier in the comments.",
        tags: "#DentalTechnology #DentalPractice #PracticeManagement",
        ask: "Where would you rank AI phone answering?" },
      { id: "fri", day: "Friday", short: "Fri", date: "10/23", status: "Posted", format: "Reel · 36s",
        title: "Final Stretch: Tag Points Doubled", bucket: "Challenge / Growth", video: true,
        ig: "https://www.instagram.com/reel/De141e3gJBR/",
        drive: "https://drive.google.com/file/d/1lqhZODpnk1hJj5qWVesxBUq0wI-20jRF/view?usp=drive_link",
        results: { views: 194, watch: "4.9s", likes: 8 },
        hook: "🏁 Final stretch of the Adit Review Challenge 🔥 Tag points just doubled 🚨",
        caption: [
          "Already tagged 5 colleagues? Tag 5 more doctors or office managers and earn 5 more points, up to 10 tag points per practice. Team members count too.",
          "Every contestant tagged, plus the board as of Oct 22: Cook 37, Canton 20, Breeze 17, with #3, #4 and #5 only four points apart 😳"
        ],
        thought: "Reach play for the last week. Every tag puts Adit in front of another doctor or office manager, so doubling tag points doubles the reach. Josh, Dr. Rita Chuang, Shelley's team and live booth B-roll make it feel like a movement, not a contest.",
        cta: "🚨 Not in yet? Comment CHALLENGE below and you're in 🙌",
        tags: "#AditReviewChallenge #GoogleReviews #DentalPractice #PracticeGrowth",
        ask: "Tag 5 more colleagues, comment CHALLENGE" }
    ],
    learnings: [
      { k: "387", v: "views on Shelley at WOCON, our best post of the week. Real faces from real events win." },
      { k: "13.0s", v: "average watch on Shelley, more than double every Josh talking head that week." },
      { k: "4.9s", v: "average watch on Friday's challenge announcement. The audience has heard \"comment CHALLENGE\" from Josh enough." },
      { k: "105s", v: "was too long for the tech tier list: 6% retention. Our record tier list (Sep 18, 1,843 views) ran 52s." }
    ],
    close: { kind: "thanks" }
  },
  {
    id: "week-2", n: 2, range: "Oct 26 to Nov 1", state: "Planned",
    theme: "Challenge Final Week + New Faces",
    cover: { big: "OCT 26", to: "TO NOV 1", year: "2026" },
    summary: "7 posts, one every day. The challenge gets the bookends, and the middle of the week goes to new faces, optometry and live proof.",
    glanceNote: "Close the challenge with proof, not more announcements. Every post runs under a minute, and every non-challenge post carries a one-line PS until Saturday.",
    media: "media/w2/",
    days: [
      { id: "mon", day: "Monday", short: "Mon", date: "10/26", status: "In design", format: "Carousel · 3 slides",
        title: "Leaderboard: 5 Days Left", bucket: "Challenge / Community", mock: "leaderboard",
        hook: "5 days left. The podium is still up for grabs 🏆",
        caption: [
          "The Adit Review Challenge ends Saturday, Oct 31 at midnight. Here's the board heading into the final week 👇",
          "🥇 @dr.jesse_cook 37 · 🥈 @aliddin58 19 · 🥉 @breezeortho 16 · 4️⃣ @sammiecappello 13 · 5️⃣ @ms.laurielynn 12",
          "#2 and #3 are three points apart. Three new reviews flips the podium 😳 Swipe for ranks 6 to 15."
        ],
        thought: "Momentum without another Josh announcement. A carousel breaks the run of challenge reels, the tight race does the selling, and tagging all 15 practices pulls each of their followers into the post.",
        cta: "Comment CHALLENGE to get in, and tag up to 10 doctors or office managers for extra points 🙌",
        tags: "#AditReviewChallenge #GoogleReviews #DentalPractice #PracticeGrowth",
        notes: ["Points refresh from the tracking sheet Monday morning before it posts.", "Format: ranks 1 to 5, 6 to 10, 11 to 15 (Miro mockup)."],
        ask: "5 days left, #2 and #3 three points apart" },
      { id: "tue", day: "Tuesday", short: "Tue", date: "10/27", status: "Needs Adit approval", format: "Reel · 37s",
        title: "You Don't Need to Rip Out Your EHR", bucket: "Optometry / Product", video: true,
        talent: "Steven Marinkovich",
        hook: "You don't need to rip out your EHR. You need to connect everything around it. 👓",
        caption: [
          "Most eye care practices run phones in one place, texts in another, scheduling somewhere else and forms on paper.",
          "Adit brings it into one connected system: VoIP phones, reminders and confirmations, recall texts, online scheduling, digital forms and call analytics. And it works alongside the EHR you already use: CrystalPM, RevolutionEHR, OfficeMate or Eyefinity.",
          "🏆 PS: The Adit Review Challenge ends Saturday. Comment CHALLENGE to get in."
        ],
        thought: "Opens the optometry vertical, which hasn't had a feed post since Sep 21, and puts a new face on the account. It answers the objection ODs raise first (\"I'm not switching my EHR\"), and it's the clearest 37 seconds on what Adit is that we have.",
        cta: "Want to see how it fits your exact setup? Comment EHR 👇",
        tags: "#Optometry #Optometrist #EyeCare #PracticeManagement #CrystalPM #RevolutionEHR #OfficeMate #Eyefinity",
        manychat: "Comment EHR triggers a ManyChat DM. Adit team to define what the DM says and where it sends people.",
        notes: ["Upload v5 to the Orlando Steven folder in Drive."],
        ask: "Comment EHR, ManyChat DM to be defined by Adit" },
      { id: "wed", day: "Wednesday", short: "Wed", date: "10/28", status: "Needs Adit approval", format: "Reel · 60s cut (from 102s)",
        title: "Live AI Call on Stage at WOCON", bucket: "Partner / Live Proof", video: true,
        talent: "Shelley Bostrom",
        drive: "https://drive.google.com/file/d/1v-b-hOl-1277sK4K7CSlLFGj7Kp_5F3m/view?usp=drive_link",
        hook: "She called an AI receptionist live, in front of a full room. 📞",
        caption: [
          "At WOCON in Monterey, @alignmypractice founder Shelley Bostrom picked up her phone on stage and called an AI receptionist as a brand-new patient.",
          "It answered right away, took her name and date of birth, handled \"I don't have insurance,\" offered the next available consult and booked her for Monday at 9 AM, confirmation on the way before she hung up.",
          "Her takeaway: you can teach AI to be a new employee 💙",
          "🏆 PS: Last week of the Adit Review Challenge. Comment CHALLENGE."
        ],
        thought: "Builds on last week's best post (Shelley, 387 views, 13s average watch). A respected outside consultant demoing the product live on stage is the strongest proof we can show. Nobody has to take our word for it.",
        cta: "Would your front desk have answered that call? 👇 Tell us how many rings it usually takes.",
        tags: "#WOCON #Orthodontics #AIReceptionist #FrontDesk #PatientExperience #PracticeGrowth",
        notes: ["Trim to about 60s: keep the call, cut the room pans."],
        ask: "Would your front desk have answered?" },
      { id: "thu", day: "Thursday", short: "Thu", date: "10/29", status: "Ready", format: "Reel · 45s cut (from 63s)",
        title: "7 Fastest Ways Practices Lose Money", bucket: "Thought Leadership / Halloween", video: true,
        talent: "Josh Gosnell",
        drive: "https://drive.google.com/file/d/1Jy9OsEBj6yLFOqWst89D4MzAfBobnGQL/view?usp=drive_link",
        hook: "The scariest numbers in your practice aren't on Halloween 🎃",
        caption: [
          "Josh ranked the 7 fastest ways practices lose money:",
          "1️⃣ Losing a great employee · 2️⃣ Poor reviews · 3️⃣ No-shows · 4️⃣ Unscheduled treatment · 5️⃣ Overdue recall · 6️⃣ Disconnected software · 7️⃣ After-hours gaps",
          "Number 2 is the one you can fix this week 👀"
        ],
        thought: "Ranking videos hold our record (Sep 18 tier list: 1,843 views, 18 shares, 18 saves). Halloween gives it a seasonal hook, and #2, poor reviews, hands off to the challenge's last 48 hours. The cut already has the CHALLENGE sticker and end card.",
        cta: "Which one is costing YOUR practice the most? Drop the number 👇 Comment CHALLENGE to fix #2 before Saturday.",
        tags: "#DentalPractice #PracticeManagement #DentalBusiness #NoShows #GoogleReviews #Halloween",
        notes: ["Trim to about 45s. Our record ranking video ran 52s; last week's 105s list held 6%."],
        ask: "Which one costs you the most?" },
      { id: "fri", day: "Friday", short: "Fri", date: "10/30", status: "Needs Adit approval", format: "Reel · 22s",
        title: "Every Practice Has Gaps to Close", bucket: "Partner / Event Energy", video: true,
        talent: "Shelley Bostrom",
        drive: "https://drive.google.com/file/d/1DvjBE1Q1mb85TjH5ynE62ux07DIUmLP8/view?usp=drive_link",
        hook: "A full room at WOCON, and one line every practice needed to hear 🎤",
        caption: [
          "\"Every one of you has gaps to close, and a huge opportunity to improve new patient consults.\" Shelley Bostrom of @alignmypractice, opening her session at WOCON in Monterey.",
          "The new patient isn't only the front desk's job. It's the whole team, all the way to the treatment coordinator.",
          "🏆 24 hours left in the Adit Review Challenge. Comment CHALLENGE."
        ],
        thought: "Short (22s) and full of real faces, the two things our numbers reward. It keeps Shelley's momentum going and shows the size of the room, which tells doctors Adit is where the industry shows up. Friday stays light so Saturday's last call hits harder.",
        cta: "What's the biggest gap in your new patient process? 👇",
        tags: "#WOCON #Orthodontics #NewPatientExperience #TreatmentCoordinator #PracticeGrowth",
        ask: "What's your biggest new patient gap?" },
      { id: "sat", day: "Saturday", short: "Sat", date: "10/31", status: "In production", format: "Reel · 15 to 20s",
        title: "Final Day: Ends at Midnight", bucket: "Challenge / Halloween", mock: "finalday",
        hook: "🎃 Happy Halloween. The Adit Review Challenge ends at midnight.",
        caption: [
          "No tricks. Just a few hours left to climb the board 👻",
          "Every new Google review since Oct 1 is a point, plus up to 10 points for tagging doctors and office managers. $1,000 🥇 $500 🥈 $250 🥉",
          "Winners announced Monday, Nov 2."
        ],
        thought: "Last-day urgency in a short, text-led reel instead of another talking head, since Friday's announcement had our lowest watch time (4.9s). Live top 5, a countdown and WOCON crowd B-roll. Halloween makes the urgency feel fun instead of salesy.",
        cta: "Comment CHALLENGE before midnight and tag your team 🙌",
        tags: "#AditReviewChallenge #GoogleReviews #DentalPractice #Halloween",
        notes: ["Built from the live board plus WOCON crowd and booth B-roll. No talking head."],
        ask: "Comment CHALLENGE before midnight" },
      { id: "sun", day: "Sunday", short: "Sun", date: "11/1", status: "In design", format: "Carousel · 4 slides",
        title: "October by the Numbers", bucket: "Community / Proof", mock: "numbers",
        hook: "One month. 19 practices. 119 new Google reviews. ⭐",
        caption: [
          "That's what happened when dental, ortho, chiro and optometry practices across the country made asking for reviews a team sport this October.",
          "We're verifying every count today. Winners go live tomorrow 🏆",
          "Missed this one? Adit runs a new challenge every month."
        ],
        thought: "Turns the contest into proof that asking works, gives every practice that entered some credit, and builds suspense for Monday's winners. It also opens the list for November's challenge so the momentum doesn't stop on Nov 1.",
        cta: "Want first access to November's challenge? DM us your email 📩",
        tags: "#AditReviewChallenge #GoogleReviews #PracticeGrowth #DentalMarketing",
        notes: ["Counts shown are as of Oct 25. Final numbers go in after Saturday's close."],
        ask: "Winners tomorrow, DM for November" }
    ],
    close: {
      kind: "asks",
      title: "What we need from the Adit team",
      items: [
        { k: "Approve", v: "Steven's EHR reel (Tue), Shelley's live AI call (Wed) and Shelley's packed-room clip (Fri)." },
        { k: "ManyChat", v: "What the EHR comment DM should say and where it should send optometrists." },
        { k: "Winners", v: "Confirm Monday, Nov 2 for the winners announcement, and who on the Adit side presents the prizes." },
        { k: "November", v: "Green light on the next monthly challenge so Sunday's post can open the waitlist." }
      ],
      next: "Next week: winners reveal Monday Nov 2, then November's challenge kickoff."
    }
  }
];
