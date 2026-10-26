# Calendar data refresh

`refresh.mjs` rebuilds two generated files from raw pulls:

- `calendar/stats.js`: per-platform numbers for every calendar post (Instagram, Facebook, LinkedIn, TikTok, YouTube from Metricool) plus the Facebook group post log.
- `calendar/groups-list.js`: the sponsored groups and the full group list from the FB Groups Mastersheet.

Never edit those two files by hand. Content (captions, plans, the November group menu) lives in `calendar/weeks.js` and `calendar/groups.js`.

## Run it

1. Put the raw pulls in a folder (any of them can be missing; the last known numbers for that source are kept).
2. `node tools/refresh.mjs --in <folder>`
3. Read the output. `tools/last-refresh.json` lists anything it matched on its own and anything it could not place.
4. Commit `calendar/stats.js`, `calendar/groups-list.js`, `tools/post-map.json` and `tools/last-refresh.json`, then push to main.

## Raw pulls

Metricool, brand id `6357642` (Adit), from `2026-09-27T00:00:00-07:00` to now. Save each result exactly as returned (`{"rows": [...]}`), with the metrics in this order:

| File | Metric ids, in order |
|---|---|
| `ig_reels.json` | IGRE02, IGRE06, IGRE03, IGRE23, IGRE24, IGRE10, IGRE07, IGRE21, IGRE12, IGRE11 |
| `ig_posts.json` | IGPO02, IGPO06, IGPO03, IGPO07, IGPO28, IGPO14, IGPO13, IGPO08, IGPO27, IGPO15, IGPO29 |
| `fb_reels.json` | FBRE02, FBRE06, FBRE05, FBRE10, FBRE13, FBRE08, FBRE11 |
| `fb_posts.json` | FBPO02, FBPO06, FBPO07, FBPO03, FBPO11, FBPO12, FBPO13, FBPO08, FBPO14, FBPO16 |
| `li_posts.json` | LIPO02, LIPO08, LIPO04, LIPO12, LIPO16, LIPO13, LIPO10, LIPO18 |
| `tt_posts.json` | TKPO02, TKPO03, TKPO05, TKPO07, TKPO08, TKPO09, TKPO10, TKPO15 |
| `yt_videos.json` | YTVP02, YTVP05, YTVP17, YTVP06, YTVP08, YTVP09, YTVP11 |

Google Sheets, saved as returned (`{"values": [...]}`):

| File | Spreadsheet | Range |
|---|---|---|
| `groups_all.json` | FB Groups - Mastersheet `1Igp0VactRiADil_jTmBdUm93vZhSxG5cpC7Mk1nq9cc` | `'All groups'!A1:E200` |
| `groups_sponsored.json` | same | `'Sponsored groups'!A1:F100` |
| `post_log.json` | Adit FB Groups · Group Post Log `1uCEDkEqcjAUYtKE1lgm3mPFhb5fdfZUdGNzs89ny4CA` | `'Post Log'!A:M` |

## Matching posts to calendar days

`post-map.json` says which native post belongs to which day (`<week id>/<day id>`). Instagram matches by the `ig` link in `weeks.js` when there is one. Everything else is matched by date (the day before to four days after) and caption similarity, then written into `post-map.json`. Posts that are not part of the calendar (Adit's own event posts, testimonial uploads) go in `_ignore`. A day shows as Posted on the site as soon as it has numbers.
