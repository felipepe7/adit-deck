/* Adit x PuroFlow Media content calendar. Weeks run oldest to newest; the newest opens by default.
   To add a week: copy the last object in WEEKS, change the dates and days, drop the reels in media/wN/. */
const LEGACY = { "week-1": "oct-19", "week-2": "oct-26" };
const HUB = {
  handle: "@get_adit",
  folder: "https://drive.google.com/drive/folders/1V_CR-VNonq-Lrk2_FkKINx_5MWylALdE",
  feedback: "#adit-edits-revisions"
};

const WEEKS = [
  {
    id: "sep-28", n: 1, tab: "Sep 28", range: "Sep 28 to Oct 4", state: "Posted",
    theme: "Josh Games + Challenge Launch",
    cover: { big: "SEP 28", to: "TO OCT 4", year: "2026" },
    summary: "4 posts on @get_adit: two Josh reels, the Review Challenge launch carousel and a product offer.",
    glanceNote: "Josh games to start conversations, then the Review Challenge launch carousel, which became our most commented post since late September.",
    media: "media/w0928/",
    days: [
      { id: "mon-a", day: "Monday", short: "Mon", jump: "Mon AM", date: "9/28", status: "Posted", format: "Reel · 57s · 6:06 AM PT",
        title: "Agree or Disagree: Practice Management Edition", bucket: "Game / Thought Leadership", video: true,
        ig: "https://www.instagram.com/reel/Dd1P9dijNDz/",
        drive: "https://drive.google.com/file/d/1WAuc-OaZJaKMIx1Jj2P4JxYbN4UqT-lY/view?usp=drive_link",
        results: [["327", "Views"], ["7.4s", "Avg watch"], ["10", "Likes"]],
        hook: "Agree or disagree: practice management edition 🤔",
        caption: [
          "We put the things dental, optometry and chiropractic office owners say out loud on a board, and Josh had to pick a side on every single one. No hedging. No \"it depends.\"",
          "A few of these will start an argument in your break room."
        ],
        thought: "A game built for comments. Josh has to commit to a side on statements owners say every day, across dental, optometry and chiro. Debate formats get people arguing in the comments, which is the signal Instagram rewards.",
        cta: "Which one did he get wrong? 👇",
        tags: "#dentaloffice #practicemanagement #practiceowner",
        ask: "Which one did he get wrong?" },
      { id: "mon-b", day: "Monday", short: "Mon", jump: "Mon PM", date: "9/28", status: "Posted", format: "Reel · 14s · 11:31 AM PT",
        title: "Dental No-Show Policy, the Honest Version", bucket: "Dental / Front Desk", video: true,
        ig: "https://www.instagram.com/reel/Dd11WMfkZ04/",
        results: [["154", "Views"], ["4.6s", "Avg watch"], ["6", "Likes"]],
        hook: "Dental no-show policy, the honest version 🦷",
        caption: [
          "Not the one written in your new patient packet. The one your front desk actually holds the line on.",
          "Every office has a gap between the two, and that gap is where the schedule falls apart."
        ],
        thought: "A pain point every front desk lives with. Calling out the gap between the written policy and the enforced one makes it relatable, and asking for their best enforced policy turns the comments into peer advice.",
        cta: "What is the best no-show policy you have actually enforced? 👇",
        tags: "#dentaloffice #noshows #practicemanagement",
        ask: "Best no-show policy you've enforced?" },
      { id: "wed-a", day: "Wednesday", short: "Wed", jump: "Wed AM", date: "9/30", status: "Posted", format: "Carousel · 5 slides · 1:02 AM PT",
        title: "Review Challenge Launch: $1,750 in Prizes", bucket: "Challenge / Launch",
        slides: ["wed-a-1.jpg", "wed-a-2.jpg", "wed-a-3.jpg", "wed-a-4.jpg", "wed-a-5.jpg"],
        ig: "https://www.instagram.com/p/Dd53AaSG-5_/",
        drive: "https://drive.google.com/file/d/11_ujNuWnJPRootZLzpzhmErJNgoWXgQJ/view?usp=drive_link",
        results: [["823", "Views"], ["65", "Comments"], ["27", "Likes"]],
        hook: "Google reviews are the new word of mouth. So we're paying the practices that grow them the fastest 🏆",
        caption: [
          "$1,750 in Amazon prizes 😍 14 days. Open to any U.S. dental, ortho, optometry or chiropractic practice, @get_adit client or not.",
          "How to enter: 1️⃣ Follow @get_adit · 2️⃣ Comment CHALLENGE below (tag your colleagues for bonus points) · 3️⃣ Check your DMs and send us your office name",
          "The contest runs Oct 7 to Oct 21. Leaderboards drop every Monday and Friday right here."
        ],
        thought: "The kickoff. A pinned rules carousel gives every entrant one place to learn how scoring works, and comment-to-enter turns each entry into a ManyChat conversation and a captured practice contact.",
        cta: "Comment CHALLENGE below. Swipe for the full rules 👉",
        tags: "#dentalpractice #googlereviews #dentalmarketing",
        ask: "Comment CHALLENGE to enter" },
      { id: "wed-b", day: "Wednesday", short: "Wed", jump: "Wed PM", date: "9/30", status: "Posted", format: "Image post · 11:18 AM PT",
        title: "Free Phones & VoIP for Life", bucket: "Product / Offer", slides: ["wed-b.jpg"],
        ig: "https://www.instagram.com/p/Dd69frgzqcH/",
        results: [["183", "Views"], ["5", "Comments"], ["4", "Likes"]],
        hook: "Keep the calls. Lose the phone bill. 🤏📞",
        caption: [
          "Get free phones and VoIP for life with Adit, the all-in-one practice management platform that brings patient communication, scheduling, reminders and payments together."
        ],
        thought: "A direct product offer to balance the engagement posts. One clear benefit in one image (no more phone bill), with a question that gets owners talking about the expenses they want to cut.",
        cta: "Practice owners and office managers: what's one monthly expense you'd love to break up with? 👇",
        tags: "PracticeManagement PatientCommunication HealthcareTechnology DentalPractice Adit",
        ask: "Which expense would you cut?" }
    ],
    learnings: [
      { k: "65", v: "comments on the challenge launch carousel, our most commented post since late September. Comment-to-enter turns attention into contacts." },
      { k: "7.4s", v: "average watch on Josh's agree or disagree game, versus 4.6s on the no-show tip. Games hold attention longer than tips." },
      { k: "183", v: "views on the phone bill image, the lowest of the week. Static product offers reach the fewest people." }
    ],
    close: { kind: "thanks" }
  },
  {
    id: "oct-5", n: 2, tab: "Oct 5", range: "Oct 5 to 11", state: "Posted",
    theme: "Entries Closing",
    cover: { big: "OCT 5", to: "TO OCT 11", year: "2026" },
    summary: "1 reel on @get_adit: the 48-hour push before Review Challenge entries closed on Wednesday, Oct 7.",
    glanceNote: "One feed post this week: the deadline push before entries closed Wednesday, Oct 7.",
    media: "media/w1005/",
    days: [
      { id: "mon", day: "Monday", short: "Mon", date: "10/5", status: "Posted", format: "Reel · 36s · 6:03 AM PT",
        title: "48 Hours Left to Get In", bucket: "Challenge / Urgency", video: true,
        ig: "https://www.instagram.com/reel/DeHRbUpnz2S/",
        results: [["204", "Views"], ["3.8s", "Avg watch"], ["7", "Likes"]],
        hook: "48 hours left to get in 👀",
        caption: [
          "$1,750 in gift cards. 14 days. One scoreboard.",
          "Whichever practice grows its Google reviews the most between Oct 7 and Oct 21 takes $1,000. Second takes $500. Third takes $250. Paid to the practice.",
          "Every new review counts, any rating. Nobody is being asked to chase 5 stars. We're measuring which practice actually gets patients to show up and leave one, because that's the skill that compounds long after this contest ends 📈"
        ],
        thought: "Deadline urgency before entries closed, plus a fairness rule up front (any rating counts) so practices could enter without worrying about gaming their Google profile.",
        cta: "Rules are in the video. Comment CHALLENGE and we'll send you the whole thing. Entries close Wednesday.",
        tags: "#DentalPractice #GoogleReviews #PracticeGrowth",
        ask: "Comment CHALLENGE, entries close Wednesday" }
    ],
    learnings: [
      { k: "3.8s", v: "average watch on the deadline reminder. A countdown with no face on screen lost people fastest." },
      { k: "1", v: "feed post this week. Posting every day starts the week of Oct 26." }
    ],
    close: { kind: "thanks" }
  },
  {
    id: "oct-12", n: 3, tab: "Oct 12", range: "Oct 12 to 18", state: "Posted",
    theme: "Entries Reopened + First Leaderboard",
    cover: { big: "OCT 12", to: "TO OCT 18", year: "2026" },
    summary: "3 posts on @get_adit: entries reopened by demand, Dr. Rita Chuang's testimonial and the first public leaderboard.",
    glanceNote: "Demand reopened the challenge, the first leaderboard named every practice, and Dr. Rita Chuang gave us October's most viewed reel.",
    media: "media/w1012/",
    days: [
      { id: "mon", day: "Monday", short: "Mon", date: "10/12", status: "Posted", format: "Carousel · 4 slides · 1:27 AM PT",
        title: "Entries Are Open Again", bucket: "Challenge / Reopen", slides: ["mon-1.jpg", "mon-2.jpg", "mon-3.jpg", "mon-4.jpg"],
        ig: "https://www.instagram.com/p/DeYzdaYmz2M/",
        results: [["486", "Views"], ["11", "Comments"], ["8", "Likes"]],
        hook: "We closed entries Wednesday. You wouldn't let us. 👀",
        caption: [
          "Entries are open again until Friday, Oct 16.",
          "⏱️ Your clock starts the day you enter. Everyone gets counted on the same day, end of day Friday Oct 30, so every day you sit on this is a day off your own clock. Already in? You keep your start date and your head start 💪",
          "🏆 $1,000, $500 and $250 in gift cards, paid to the practice. Every new review counts, any rating. No paying, discounting or incentivizing anyone for a review."
        ],
        thought: "Practices kept asking to join after entries closed, so we reopened and made the urgency explicit: your clock starts the day you enter, and the first movers keep their head start.",
        cta: "Comment the word CHALLENGE to get in 👇",
        tags: "#Doctors #GoogleReviews #PracticeGrowth",
        ask: "Comment CHALLENGE, open until Oct 16" },
      { id: "tue-a", day: "Tuesday", short: "Tue", jump: "Tue AM", date: "10/13", status: "Posted", format: "Reel · 73s · 6:07 AM PT",
        title: "Dr. Rita Chuang on What Changed", bucket: "Client Testimonial", video: true,
        ig: "https://www.instagram.com/reel/Deb4CnigvZ6/",
        results: [["404", "Views"], ["10.3s", "Avg watch"], ["17", "Likes"]],
        hook: "We didn't write this one 👀",
        caption: [
          "Dr. Rita Chuang, president of the CAO, on what actually changed in her practice.",
          "Her point isn't really about software. It's about time. The calls that get captured instead of missed, the admin that stops eating the day, and what a team does with the hours that come back.",
          "Ask most practice owners what they want more of and it isn't more patients. It's more time with the ones already in the chair."
        ],
        thought: "Unscripted proof from a respected doctor. A client in her own words beats any claim Adit can make about itself, and it became our most viewed reel of October.",
        cta: "No hard ask. The testimonial does the work.",
        tags: "#PracticeGrowth #PracticeManagement #PatientExperience",
        ask: "Testimonial, no hard ask" },
      { id: "tue-b", day: "Tuesday", short: "Tue", jump: "Tue PM", date: "10/13", status: "Posted", format: "Carousel · 5 slides, video finale · 6:56 PM PT",
        title: "First Leaderboard: The Top 5", bucket: "Challenge / Leaderboard", slides: ["tue-b-1.jpg", "tue-b-2.jpg", "tue-b-3.jpg", "tue-b-4.jpg", "tue-b-5.mp4"],
        ig: "https://www.instagram.com/p/DedQNL-Ggzk/",
        results: [["642", "Views"], ["39", "Comments"], ["21", "Likes"]],
        hook: "🚨🏆 The Adit Review Challenge leaderboard is live, and it's getting spicy 🔥",
        caption: [
          "Here is the leaderboard as of Oct 13 👇",
          "🥇 @dr.jesse_cook 13 · 🥈 @aliddin58 11 · 🥉 @mistylove5830 8 · 4️⃣ @breezeortho 6 · 5️⃣ @sammiecappello 6",
          "The gap between 5th and 6th is ONE point. One review. One tag. That is all it takes to flip this board 😳"
        ],
        thought: "The first public scoreboard. Naming and tagging every practice gives contestants something to share, pulls their followers in, and shows practices on the fence that real offices are already winning.",
        cta: "Still want in? Comment CHALLENGE on our most recent pinned post. Entries close Friday, Oct 16.",
        tags: "#AditReviewChallenge",
        ask: "Comment CHALLENGE to get on the board" }
    ],
    learnings: [
      { k: "404", v: "views on Dr. Rita Chuang's testimonial, the most viewed reel of October, with 10.3s average watch." },
      { k: "39", v: "comments on the first leaderboard. Naming practices in public gets them commenting and tagging." },
      { k: "642", v: "views on the leaderboard carousel, beating every reel that week." }
    ],
    close: { kind: "thanks" }
  },
  {
    id: "oct-19", n: 4, tab: "Oct 19", range: "Oct 19 to 23", state: "Posted",
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
        results: [["335", "Views"], ["7.1s", "Avg watch"], ["11", "Likes"]],
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
        results: [["210", "Views"], ["6.2s", "Avg watch"], ["8", "Likes"]],
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
        results: [["387", "Views"], ["13.0s", "Avg watch"], ["25", "Likes"]],
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
        results: [["298", "Views"], ["6.4s", "Avg watch"], ["4", "Likes"]],
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
        results: [["194", "Views"], ["4.9s", "Avg watch"], ["8", "Likes"]],
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
      { k: "387", v: "views on Shelley at WOCON, the best post of the week. Real faces from real events win." },
      { k: "13.0s", v: "average watch on Shelley, more than double every Josh talking head that week." },
      { k: "4.9s", v: "average watch on Friday's challenge announcement. The audience has heard \"comment CHALLENGE\" from Josh enough." },
      { k: "105s", v: "was too long for the tech tier list: 6% retention. Our record tier list (Sep 18, 1,843 views) ran 52s." }
    ],
    close: { kind: "thanks" }
  },
  {
    id: "oct-26", n: 5, tab: "Oct 26", range: "Oct 26 to Nov 1", state: "Posted",
    theme: "Challenge Final Week + New Faces",
    cover: { big: "OCT 26", to: "TO NOV 1", year: "2026" },
    summary: "7 posts, one every day. The challenge gets the bookends, and the middle of the week goes to new faces, optometry and live proof.",
    glanceNote: "Close the challenge with proof, not more announcements. Every post runs under a minute, and every non-challenge post carries a one-line PS until Saturday.",
    media: "media/w2/",
    days: [
      { id: "mon", day: "Monday", short: "Mon", date: "10/26", status: "Posted", format: "Carousel · 4 videos scored to Latch · 9:43 PM PT",
        title: "Leaderboard: 5 Days Left", bucket: "Challenge / Community", slides: ["mon-1.jpg", "mon-2.jpg", "mon-3.jpg", "mon-4.mp4"],
        ig: "https://www.instagram.com/p/De_BzIGlSJG/",
        hook: "5 days left. The podium is still up for grabs 🏆",
        caption: [
          "The Adit Review Challenge ends Saturday, Oct 31 at midnight. Here's the board heading into the final week 👇",
          "🥇 @dr.jesse_cook 39 · 🥈 @breezeortho 26 · 🥉 @aliddin58 20 · 4️⃣ @ms.laurielynn 13 · 5️⃣ @sammiecappello 13, then all 15 contestants tagged in rank order",
          "Breeze just jumped to #2 with 10 new Google reviews since Thursday 👀 and 4th and 5th are tied at 13. Five days is plenty of time to flip this board 😳"
        ],
        thought: "Momentum without another Josh announcement. A carousel breaks the run of challenge reels, the tight race does the selling, and tagging all 15 practices pulls each of their followers into the post.",
        cta: "Comment CHALLENGE to get in, and tag up to 10 doctors or office managers for extra points 🙌",
        tags: "#AditReviewChallenge #GoogleReviews #DentalPractice #PracticeGrowth",
        notes: ["Every contestant's Google reviews recounted Oct 26, 8:30 PM PT. Points = reviews since Oct 1 + tag points + 1 sign-up point.", "Scheduled on Metricool: Facebook 9:10 PM (photos), TikTok 9:30 (photo carousel), Instagram 9:43 (every slide is a video scored to the Latch instrumental, motion version last), YouTube Short 9:45 and LinkedIn 9:50 (the motion video)."],
        ask: "5 days left, Breeze jumps to #2" },
      { id: "tue", day: "Tuesday", short: "Tue", date: "10/27", status: "Posted", format: "Reel · 37s · Timeless (Instrumental) · 11:30 AM PT",
        title: "You Don't Need to Rip Out Your EHR", bucket: "Optometry / Product", video: true,
        talent: "Steven Marinkovich",
        ig: "https://www.instagram.com/reel/DfAglStDGXP/",
        hook: "You don't need to rip out your EHR. You need to connect everything around it. 👓",
        caption: [
          "Most eye care practices run phones in one place, texts in another, scheduling somewhere else and forms on paper.",
          "Adit brings it into one connected system: VoIP phones, reminders and confirmations, recall texts, online scheduling, digital forms and call analytics. And it works alongside the EHR you already use: CrystalPM, RevolutionEHR, OfficeMate or Eyefinity.",
          "🏆 PS: The Adit Review Challenge ends Saturday. Comment CHALLENGE to get in."
        ],
        thought: "Opens the optometry vertical, which hasn't had a feed post since Sep 21, and puts a new face on the account. It answers the objection ODs raise first (\"I'm not switching my EHR\"), and it's the clearest 37 seconds on what Adit is that we have.",
        cta: "Want to see how it fits your exact setup? Comment EHR 👇",
        tags: "#Optometry #Optometrist #EyeCare #PracticeManagement #CrystalPM #RevolutionEHR #OfficeMate #Eyefinity",
        manychat: "Every comment on this reel, EHR included, gets the Review Challenge DM, so each commenter's info is captured.",
        notes: ["Posted Oct 27 with Timeless (Instrumental): Instagram 11:30 AM PT, then Facebook, YouTube and LinkedIn. TikTok repost pending (its API flagged the upload).", "Next edits: clean up the mic noise on Steven's voice (Adit's feedback)."],
        ask: "Comment EHR, answered by the Review Challenge DM" },
      { id: "wed", day: "Wednesday", short: "Wed", date: "10/28", status: "Ready", format: "Reel · 49s · 8:00 AM PT",
        title: "Patients Choose the Best Experience", bucket: "Partner / Ortho Insight", video: true,
        talent: "Shelley Bostrom",
        hook: "Most patients go to 2.7 consults before they choose a provider. That's a 1 in 3 shot at every one 👀",
        caption: [
          "At WOCON in Monterey, Shelley Bostrom of @alignmypractice told a room of ortho teams what actually wins it. Patients may say they're price shopping, but when your fee is higher and the experience is better, they choose the relationship.",
          "Her formula: connection, confidence, experience, and layering in the value. Because like Maya Angelou said, people never forget how you made them feel 💙",
          "🏆 PS: 4 days left in the Adit Review Challenge. Comment CHALLENGE to get in."
        ],
        thought: "Builds on Shelley's run (her intro was last week's best post: 387 views, 13s average watch). Pure insight this time: a number every ortho team feels, and the answer owners want to hear, that a higher fee still wins on experience. Experience is the thread back to Adit, since the first call, booking, reminders and follow-up all happen before the consult.",
        cta: "What does your team do that new patients never forget? 👇",
        tags: "#Orthodontics #OrthoPractice #PatientExperience #NewPatientConsult #TreatmentCoordinator #WOCON #PracticeGrowth",
        manychat: "Every comment on this reel gets the Review Challenge DM, so each commenter's info is captured.",
        notes: ["Re-edited Oct 27: an orthodontist walking a patient through braces replaces the throat-exam stock shot under \"better experience\".", "Metricool, each platform's best Wednesday hour: Instagram 8 AM PT (Shelley as collaborator), LinkedIn 11 AM, Facebook 12 PM, YouTube 4 PM. TikTok Mon 11/2 at noon (one a day)."],
        ask: "What do new patients never forget?" },
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
      { id: "fri", day: "Friday", short: "Fri", date: "10/30", status: "Posted", format: "Reel · 22s · 8:25 PM PT",
        title: "Every Practice Has Gaps to Close", bucket: "Partner / Event Energy", video: true,
        talent: "Shelley Bostrom",
        ig: "https://www.instagram.com/reel/DfJL7_WjyN0/",
        drive: "https://drive.google.com/file/d/1DvjBE1Q1mb85TjH5ynE62ux07DIUmLP8/view?usp=drive_link",
        hook: "A full room at WOCON, and one line every practice needed to hear 🎤",
        caption: [
          "Shelley Bostrom of @alignmypractice opened her session in Monterey with this: the new patient experience isn't just about the doctor and the treatment coordinator. It's the whole team.",
          "Every single practice in that room had gaps to close, and a huge opportunity hiding in their new patient consults.",
          "🏆 PS: The Adit Review Challenge ends tomorrow at midnight. Comment CHALLENGE to get in."
        ],
        thought: "Short (22s) and full of real faces, the two things our numbers reward. It keeps Shelley's momentum going and shows the size of the room, which tells doctors Adit is where the industry shows up. Friday stays light so Saturday's last call hits harder.",
        cta: "What's the biggest gap in your new patient process? 👇",
        tags: "#WOCON #Orthodontics #NewPatientExperience #TreatmentCoordinator #PracticeGrowth",
        manychat: "Every comment on this reel gets the Review Challenge DM, so each commenter's info is captured.",
        notes: ["Scheduled Oct 30, 10 minutes apart: Instagram 8:25 PM PT (Shelley as collaborator), Facebook 8:35, YouTube 8:45, LinkedIn 8:55, TikTok 9:05."],
        ask: "What's your biggest new patient gap?" },
      { id: "sat", day: "Saturday", short: "Sat", date: "10/31", status: "Not posted", format: "Reel · 15 to 20s",
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
        notes: ["Didn't go out on Oct 31. The last-day push ran in Friday's PS and the challenge DM, and the close went to Sunday's winners post."],
        ask: "Comment CHALLENGE before midnight" },
      { id: "sun", day: "Sunday", short: "Sun", date: "11/1", status: "Posted", format: "Carousel · 5 videos scored to Latch · 9:29 PM PT",
        title: "And the Winners Are...", bucket: "Challenge / Community", slides: ["sun-1.jpg", "sun-2.jpg", "sun-3.jpg", "sun-4.jpg", "sun-5.mp4"],
        ig: "https://www.instagram.com/p/DfOjzg6AO1a/",
        hook: "We have our winners! 🏆",
        caption: [
          "31 days. 184 new Google reviews. One photo finish. Here's the final podium of the Adit Review Challenge 👇",
          "🥇 @breezeortho 46 · 🥈 @dr.jesse_cook 43 · 🥉 @aliddin58 20, then the rest of the top 20 tagged in placement order",
          "Breeze started the final week in 2nd, then added 20 new Google reviews to win by just 3 points 🔥"
        ],
        thought: "The payoff for a month of leaderboards. The cover is the podium, not a list, and the motion version saves 1st place for Latch's drop. Tagging the top 20 pulls every practice and its followers back into the post, and 184 new Google reviews in 31 days turns the challenge into proof that asking works.",
        cta: "Comment CHALLENGE to get on the waitlist for the next challenge, with over $5,000 in prizes 🏆",
        tags: "#AditReviewChallenge #GoogleReviews #DentalPractice #Orthodontics #Chiropractic #PracticeGrowth",
        manychat: "Comments and challenge DMs now get a waitlist message for the next challenge (both flows updated Nov 1), so every commenter's practice and email still get captured.",
        notes: ["Final count: every practice's Google reviews at the Oct 31 midnight close, rechecked Nov 1 at 5:50 PM PT. Points = reviews since Oct 1 + tag points + 1 sign-up point.", "Slides: the winners podium, the final top 5, 6th to 10th, 11th to 20th, then the motion reveal (counts down 20th to 4th top to bottom, Breeze lands on Latch's drop, ends on the $5,000+ next-challenge card).", "Posted Nov 1, 10 minutes apart: Instagram 9:29 PM PT (every slide a video scored to Latch, motion reveal last), Facebook 9:39 (photos), YouTube Short 9:49 and LinkedIn 9:59 (the motion reveal with the podium cover). TikTok Mon 11/2 at noon (one a day)."],
        ask: "Breeze wins by 3 points" }
    ],
    learnings: [
      { k: "821", v: "views for Steven's EHR reel across five platforms, the best of the week. A new face and a new vertical beat another challenge post." },
      { k: "12.4s", v: "average Instagram watch on Josh's 45s money list, our longest of the week. Short ranked lists hold people to the end." },
      { k: "226", v: "Facebook views on Friday's 22s Shelley clip, more than Instagram (97). Facebook is carrying the short event clips." }
    ],
    close: { kind: "thanks" }
  },
  {
    id: "nov-2", n: 6, tab: "Nov 2", range: "Nov 2 to 8", state: "Planned",
    theme: "Waitlist Week + Josh's Playbook",
    cover: { big: "NOV 2", to: "TO NOV 8", year: "2026" },
    summary: "8 posts, two a day on Tuesday, Thursday and Friday. Josh's playbook opens every weekday, and the evening posts build the waitlist for the December challenge.",
    glanceNote: "November builds the waitlist. Every post ends on the same ask, comment CHALLENGE for first access to $10,000 in prizes, and the waitlist DM captures each practice. Josh's finished reels now carry the waitlist sticker and end card.",
    media: "media/w3/",
    days: [
      { id: "mon", day: "Monday", short: "Mon", date: "11/2", status: "Posted", format: "Reel · 57s · Tier list · 3:11 PM PT",
        title: "Ranking Practice Time-Wasters", bucket: "Thought Leadership / Tier List", video: true,
        talent: "Josh Gosnell", ig: "https://www.instagram.com/reel/DfQdTBdjU2d/",
        hook: "Josh ranked the biggest time-wasters in a practice, S tier to F tier ⏳",
        caption: [
          "📞 Manual missed-call recovery: F tier. Why spend your team's time on something you can automate?",
          "🛡️ Insurance verification: F tier for a doctor, C tier for the team · 👥 Unnecessary meetings: C tier (keep the morning huddle) · 📅 Manual appointment confirmations: C tier · 💳 Manual payment collection: B tier, because sometimes a personal touch gets the collection",
          "🏆 PS: The next Adit challenge has $10,000 in prizes. Comment CHALLENGE to get on the waitlist."
        ],
        thought: "Tier lists are our record format (Sep 18: 1,849 views, 18 shares), and this one runs 57s, close to the record's 52s. Most of the board (missed-call recovery, confirmations, payment collection) is work Adit automates, and the reel never has to say so.",
        cta: "Which one eats the most hours in your office? 👇",
        tags: "#DentalPractice #PracticeManagement #FrontDesk #DentalOffice #TierList #PracticeGrowth",
        manychat: "Every comment gets the waitlist DM (both flows switched Nov 1), so each commenter's practice and email get captured.",
        notes: ["Josh's tier list cut from Oct 19, re-versioned for the waitlist: the $1,000 sticker and end card now say $10,000 in prizes (re-cut Nov 2), with the same motion.", "Posted Nov 2, 15 minutes apart: Instagram 3:11 PM PT, Facebook 3:26, YouTube Short 3:41, LinkedIn 3:56, TikTok flagged a second upload the same day as spam risk, so it posts Thu 11/5 at noon. Cover: Josh cutout, Ranking Practice Time-Wasters."],
        ask: "Which one eats the most hours?" },
      { id: "tue-a", day: "Tuesday", short: "Tue", jump: "Tue AM", date: "11/3", status: "Posted", format: "Reel · 60s · 4:00 PM PT",
        title: "Convert More Patients in 5 Steps", bucket: "Thought Leadership / Framework", video: true,
        talent: "Josh Gosnell", ig: "https://www.instagram.com/reel/DfTIIPoFKLS/",
        hook: "Doctors, here's how to convert more patients in 5 steps 📈",
        caption: [
          "1️⃣ Understand why the patient called · 2️⃣ Ask better questions before offering an appointment · 3️⃣ Connect the visit to the patient's desired outcome · 4️⃣ Remove doubt around scheduling, insurance and payment · 5️⃣ Confirm the next step and follow up",
          "Josh's take: a lot of patients drop off because nobody properly follows up with the lead 👀",
          "🏆 PS: The next Adit challenge has $10,000 in prizes. Comment CHALLENGE to get on the waitlist."
        ],
        thought: "A framework a front desk can use on the very next call, so it gets saved and shared. Steps 4 and 5 are where Adit lives (scheduling, insurance, payments, follow-up), and Josh gets there on his own.",
        cta: "Which step does your team skip most? Drop the number 👇",
        tags: "#DentalPractice #NewPatients #FrontDesk #PatientExperience #PracticeGrowth #DentalOffice",
        manychat: "Every comment gets the waitlist DM.",
        notes: ["Josh's five-step cut from Oct 19, re-versioned with the waitlist sticker and end card, which say $10,000 in prizes (re-cut Nov 2).", "Posted Nov 3 after the morning slot had passed, 15 minutes apart and two hours ahead of the carousel: Instagram 4:00 PM PT, Facebook 4:15, YouTube Short 4:30 (YouTube's best hour of the day). LinkedIn's 5:00 upload failed on LinkedIn's end, so it posted at 7:15. Cover: Josh cutout, Convert More Patients in 5 Steps.", "TikTok held while its spam flag cleared (Wed and Thu posted fine), so it posts Fri 11/6 at noon."],
        ask: "Which step does your team skip?" },
      { id: "tue-b", day: "Tuesday", short: "Tue", jump: "Tue PM", date: "11/3", status: "Posted", format: "Carousel · 5 videos scored to Latch · 6:00 PM PT",
        title: "October by the Numbers", bucket: "Challenge / Waitlist", slides: ["tue-b-1.jpg", "tue-b-2.jpg", "tue-b-3.jpg", "tue-b-4.jpg", "tue-b-5.mp4"],
        ig: "https://www.instagram.com/p/DfTVyKeDIWu/",
        hook: "184 new Google reviews in 31 days 📈",
        caption: [
          "That's what 20 practices did in October when asking for reviews became a team sport. 17 of them grew their Google reviews, and the top 3 added 94 between them:",
          "🥇 Breeze Orthodontics +40 (@breezeortho) · 🥈 Cook Chiropractic +37 (@dr.jesse_cook) · 🥉 Canton Orthodontics of Roswell +17 (@aliddin58)",
          "The pattern Josh keeps coming back to: the best ask is still a personal, one-on-one ask from your team 🙌 Next up, a challenge with $10,000 in prizes 🏆"
        ],
        thought: "Sunday's post celebrated the practices. This one shows everyone who didn't compete what one month of asking did, so the next challenge sells itself and the only CTA is the waitlist.",
        cta: "Comment CHALLENGE to get on the waitlist 👇",
        tags: "#GoogleReviews #DentalPractice #Orthodontics #Chiropractic #PracticeGrowth #AditReviewChallenge",
        manychat: "Every comment gets the waitlist DM.",
        notes: ["Numbers from the final count (Oct 31 midnight close, rechecked Nov 1), the same figures as the Facebook groups D4 post.", "Slides: the 184 headline, the top 3 gains, the one-line lesson, the $10,000 waitlist card, then the motion version (184 counts up, the gains count in, and the $10,000 slide lands on Latch's drop). Every slide is a video scored to Latch, so the carousel plays with sound.", "Posted Nov 3, 15 minutes apart: Instagram 6:00 PM PT (Tuesday's evening peak), Facebook 6:15 (photos), LinkedIn 6:30 and YouTube Short 6:45 (the motion version with the 184 cover). No TikTok while its spam flag clears."],
        ask: "Comment CHALLENGE for the waitlist" },
      { id: "wed", day: "Wednesday", short: "Wed", date: "11/4", status: "Posted", format: "Reel · 51s · Say this, not that · 10:00 AM PT",
        title: "Front-Desk Words to Stop Using", bucket: "Front Desk / Say This, Not That", video: true,
        talent: "Josh Gosnell", ig: "https://www.instagram.com/reel/DfVD_xmiJkp/",
        hook: "Doctors, stop saying these words to patients 🚫",
        caption: [
          "❌ That's our policy → ✅ Let me see what options we have available · ❌ You need treatment → ✅ The doctor recommends · ❌ It costs this much → ✅ The investment will be · ❌ We're completely booked → ✅ Our first available appointment is",
          "❌ We'll have to call you back → ✅ Someone on my team will follow up with you · ❌ I don't know → ✅ Let me find that answer for you · ❌ That's not my department → ✅ Let me connect you to someone who can answer that · ❌ You missed your appointment → ✅ We miss seeing you",
          "Save this for your next team huddle 📌 🏆 PS: The next Adit challenge has $10,000 in prizes. Comment CHALLENGE to get on the waitlist."
        ],
        thought: "Office managers are our best audience, and \"say this, not that\" is the most saveable format we have: a team can use it on the next call. Eight swaps in 51 seconds keeps the pace up.",
        cta: "Which one does your front desk still say? 👇",
        tags: "#FrontDesk #OfficeManager #DentalOffice #PatientExperience #DentalPractice #CustomerService",
        manychat: "Every comment gets the waitlist DM.",
        notes: ["Josh's cut from Oct 19, re-versioned with the waitlist sticker and end card, which say $10,000 in prizes (re-cut Nov 2). Kept off the Facebook groups (reel bank note).", "Posted Nov 4 on schedule, each at its platform's best Wednesday hour: Instagram 10:00 AM PT, LinkedIn 11:00, Facebook 12:00 PM, YouTube Short 4:00. Cover: Josh cutout, Front-Desk Words to Stop Using.", "TikTok Sat 11/7 at noon."],
        ask: "Which one does your desk still say?" },
      { id: "thu-a", day: "Thursday", short: "Thu", jump: "Thu AM", date: "11/5", status: "Scheduled", format: "Reel · 65s · Countdown · 10:00 AM PT",
        title: "3 Changes That Transform a Practice", bucket: "Leadership / Countdown", video: true,
        talent: "Josh Gosnell",
        hook: "The 3 changes Josh would make to transform any practice 🔁",
        caption: [
          "3️⃣ Focus on the patient, not the practice. Everyone wants the most convenient experience, and the success of the practice follows the patient experience.",
          "2️⃣ Give ownership to every outcome. Someone on your team should own every result · 1️⃣ You can't manage what you can't measure. Know your KPIs, not just production at the end of the month.",
          "Josh: that's what takes a practice from $500K to $1M, or $1M to $2M 💡 🏆 PS: The next Adit challenge has $10,000 in prizes. Comment CHALLENGE to get on the waitlist."
        ],
        thought: "A countdown holds people to number one, and number one (know your numbers) picks up where Josh's KPI reel left off on Oct 20. Built for owners: every change is a leadership habit, not a feature.",
        cta: "Which of the 3 is hardest in your practice? 👇",
        tags: "#PracticeGrowth #DentalPractice #PracticeOwner #Leadership #KPIs #PatientExperience",
        manychat: "Every comment gets the waitlist DM.",
        notes: ["Josh's countdown cut from Oct 19, re-versioned with the waitlist sticker and end card, which say $10,000 in prizes (re-cut Nov 2).", "Scheduled for each platform's best Thursday hour (Metricool): Instagram 10:00 AM PT, LinkedIn 11:00, Facebook 12:00 PM, YouTube Short 4:00. Cover: Josh on the garden set, 3 Changes That Transform a Practice.", "TikTok Sun 11/8 at noon."],
        ask: "Which change is hardest?" },
      { id: "thu-b", day: "Thursday", short: "Thu", jump: "Thu PM", date: "11/5", status: "Needs Adit approval", format: "Reel · about 60s · 6:00 PM PT",
        title: "Would Your Front Desk Have Answered That Call?", bucket: "Product Proof / Live Call", video: true,
        talent: "Shelley Bostrom",
        hook: "She called an AI receptionist live on stage, as a brand-new patient 📞",
        caption: [
          "At WOCON in Monterey, Shelley Bostrom of @alignmypractice picked up her phone in front of a full room and called an AI front desk as a new patient.",
          "It answered right away, took her name and date of birth, handled \"I don't have insurance,\" and booked her into the next open consult. The whole call is in the video.",
          "🏆 PS: The next Adit challenge has $10,000 in prizes. Comment CHALLENGE to get on the waitlist."
        ],
        thought: "The strongest product proof we have: a live call, an outside consultant and a full room. Office manager groups get the same clip Thursday (groups post D1), so the feed and the groups land together.",
        cta: "Honest question: on a busy afternoon, how many rings before your front desk picks up? 👇",
        tags: "#FrontDesk #MissedCalls #AIReceptionist #Orthodontics #DentalOffice #WOCON",
        manychat: "Every comment gets the waitlist DM.",
        notes: ["Needs Adit's OK: it shows the AI receptionist on a live call. Shelley as collaborator and people tag.", "Trimming to about 60s for the feed and the groups (this preview is the full 102s)."],
        ask: "How many rings before you pick up?" },
      { id: "fri-a", day: "Friday", short: "Fri", jump: "Fri AM", date: "11/6", status: "Scheduled", format: "Reel · 57s · 10:00 AM PT",
        title: "3 Books Every Practice Owner Should Read", bucket: "Leadership / Personal", video: true,
        talent: "Josh Gosnell",
        hook: "3 books Josh says every practice owner should read 📚",
        caption: [
          "1️⃣ Extreme Ownership, Jocko Willink: when something goes wrong, don't ask who to blame. Ask what you can do differently as a leader.",
          "2️⃣ Atomic Habits, James Clear: extraordinary results come from doing the right things consistently, 1% better every day · 3️⃣ Good to Great, Jim Collins: the best strategy fails without the right people in the right positions.",
          "Your weekend reading list 🙌 🏆 PS: The next Adit challenge has $10,000 in prizes. Comment CHALLENGE to get on the waitlist."
        ],
        thought: "An easy Friday save that shows the person behind the VP title. Book lists are evergreen and reach owners who don't follow dental tech accounts yet.",
        cta: "What's the one book you'd add? 👇",
        tags: "#PracticeOwner #Leadership #BookRecommendations #DentalPractice #ExtremeOwnership #AtomicHabits",
        manychat: "Every comment gets the waitlist DM.",
        notes: ["Josh's cut from Oct 19, re-versioned with the waitlist sticker and end card, which say $10,000 in prizes (re-cut Nov 2).", "Re-edited Nov 6 (v2): each book cover pops up big on screen the moment Josh names it, then shrinks into its spot on the list (Dan Martell style), scored to Timeless (instrumental) under Josh's voice.", "Reposted Nov 6 with the v2 edit: Instagram 11:20 AM PT, LinkedIn 11:25, Facebook 11:35, YouTube Short 11:45. Cover: Josh on the garden set, 3 Books Every Practice Owner Should Read.", "TikTok Mon 11/9 at noon."],
        ask: "What book would you add?" },
      { id: "fri-b", day: "Friday", short: "Fri", jump: "Fri PM", date: "11/6", status: "Needs Adit approval", format: "Motion reel · about 15s · scored to Latch · 6:00 PM PT",
        title: "The Next Prize Is a Shoot", bucket: "Challenge / Waitlist", mock: "december",
        hook: "The next Adit challenge comes with a film crew 🎬",
        caption: [
          "Starting in December, the top 3 practices win a professional shoot of their office:",
          "🥇 A full branded photo and video shoot ($5,000 value) · 🥈 A hero video plus office photos ($3,500 value) · 🥉 An office photo shoot ($1,500 value)",
          "$10,000 in prizes. The details go to the waitlist first 👀"
        ],
        thought: "Gift cards got practices in the door in October. A shoot is worth more to a practice than a gift card, Puro Flow produces it so Adit isn't paying production costs, and while we're in each winner's office we film Adit testimonials and reels. Showing the prize now gives the waitlist all of November to grow.",
        cta: "Comment CHALLENGE to get on the waitlist 👇",
        tags: "#AditChallenge #DentalPractice #Orthodontics #Chiropractic #PracticeGrowth #PracticeMarketing",
        manychat: "Every comment gets the waitlist DM.",
        notes: ["Needs Adit's green light on the December challenge and these prizes before it's built.", "Built in the winners post style, scored to Latch, with the same $10,000 end card."],
        ask: "Comment CHALLENGE for the waitlist" }
    ],
    close: {
      kind: "asks",
      title: "What we need from the Adit team",
      items: [
        { k: "Winner stories", v: "We're getting Breeze, Cook and Canton to each record a short video in their own office: what the challenge was like, what worked, what didn't, and why reviews matter. They post as collabs with @get_adit as they come in." },
        { k: "December", v: "Green light on the December challenge and the plan: $10,000 in prizes. 1st place: a full branded photo and video shoot ($5,000 value). 2nd: a hero video plus office photos ($3,500). 3rd: an office photo shoot ($1,500). Puro Flow produces the shoots, so Adit isn't paying production costs, and we film Adit content in each office while we're there.", link: "files/Adit-December-Challenge-Plan.pdf", linkText: "Open the December plan" },
        { k: "Approve", v: "Shelley's live AI call (Thu) and the December prize reveal (Fri)." },
        { k: "Prizes", v: "Who on the Adit side sends October's gift cards ($1,000, $500, $250), and when? The winners will ask." }
      ],
      next: "Next week: the first winner stories and Josh's case acceptance words. Facebook groups round 2 starts Nov 16."
    }
  }
];
