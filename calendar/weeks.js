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
    id: "oct-26", n: 5, tab: "Oct 26", range: "Oct 26 to Nov 1", state: "Planned",
    theme: "Challenge Final Week + New Faces",
    cover: { big: "OCT 26", to: "TO NOV 1", year: "2026" },
    summary: "7 posts, one every day. The challenge gets the bookends, and the middle of the week goes to new faces, optometry and live proof.",
    glanceNote: "Close the challenge with proof, not more announcements. Every post runs under a minute, and every non-challenge post carries a one-line PS until Saturday.",
    media: "media/w2/",
    days: [
      { id: "mon", day: "Monday", short: "Mon", date: "10/26", status: "Scheduled", format: "Carousel · 4 videos scored to Latch · 9:43 PM PT",
        title: "Leaderboard: 5 Days Left", bucket: "Challenge / Community", slides: ["mon-1.jpg", "mon-2.jpg", "mon-3.jpg", "mon-4.mp4"],
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
