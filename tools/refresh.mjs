#!/usr/bin/env node
/* Rebuilds calendar/stats.js (per-platform numbers for every calendar post, plus the
   Facebook group post log) and calendar/groups-list.js (the FB Groups Mastersheet).

   Usage:  node tools/refresh.mjs --in <folder of raw pulls> [--now <ISO time>]

   Raw pulls (any can be missing; the last known numbers for that source are kept):
     ig_reels.json  ig_posts.json  fb_reels.json  fb_posts.json
     li_posts.json  tt_posts.json  yt_videos.json          -> {"rows": [...]} from Metricool
     groups_all.json  groups_sponsored.json  post_log.json  -> {"values": [...]} from Google Sheets
   Column order for each Metricool file is in SPEC below (tools/README.md lists the metric ids). */

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CAL = path.join(ROOT, "calendar");
const MAP_FILE = path.join(ROOT, "tools", "post-map.json");
const REPORT_FILE = path.join(ROOT, "tools", "last-refresh.json");

const argv = process.argv.slice(2);
const arg = k => { const i = argv.indexOf("--" + k); return i >= 0 ? argv[i + 1] : null; };
const IN = arg("in");
if (!IN) { console.error("Missing --in <folder>"); process.exit(1); }
const NOW = arg("now") || new Date().toISOString();

const SPEC = {
  ig_reels:  { net: "ig", kind: "reel", cols: ["date","url","text","views","watch","likes","comments","shares","saves","reach"] },
  ig_posts:  { net: "ig", kind: "post", cols: ["date","url","text","type","views","reach","likes","comments","shares","saves","follows"] },
  fb_reels:  { net: "fb", kind: "reel", cols: ["date","url","text","views","watch","likes","reach"] },
  fb_posts:  { net: "fb", kind: "post", cols: ["date","url","type","text","impressions","reach","likes","comments","shares","videoViews"] },
  li_posts:  { net: "li", kind: "post", cols: ["date","url","text","impressions","videoViews","likes","comments","shares"] },
  tt_posts:  { net: "tt", kind: "video", cols: ["date","url","text","views","likes","comments","shares","watch"] },
  yt_videos: { net: "yt", kind: "video", cols: ["date","url","text","views","watch","likes","comments"] },
};
const NETS = ["ig", "fb", "li", "tt", "yt"];

/* ---------- helpers ---------- */
const readJSON = f => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch (e) { return null; } };
function loadJS(file, names) {
  if (!fs.existsSync(file)) return {};
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(file, "utf8") + `\n;globalThis.__out = {${names.map(n => `${n}: typeof ${n} !== "undefined" ? ${n} : undefined`).join(",")}};`, ctx);
  return ctx.__out;
}
const num = v => { if (v === null || v === undefined || v === "") return undefined; const n = parseFloat(String(v).replace(/,/g, "")); return isFinite(n) ? n : undefined; };
const int = v => { const n = num(v); return n === undefined ? undefined : Math.round(n); };
function norm(u) {
  if (!u) return "";
  try {
    const x = new URL(/^https?:/.test(u) ? u : "https://" + u);
    const h = x.hostname.replace(/^(www|m)\./, "");
    if (h.endsWith("youtube.com") && x.searchParams.get("v")) return "youtube.com/watch?v=" + x.searchParams.get("v");
    if (h === "youtu.be") return "youtube.com/watch?v=" + x.pathname.slice(1);
    return (h + x.pathname.replace(/\/+$/, "")).toLowerCase();
  } catch (e) { return String(u).toLowerCase(); }
}
function clean(u) {
  try {
    const x = new URL(u);
    if (x.hostname.replace(/^www\./, "").endsWith("youtube.com") && x.searchParams.get("v")) return `https://www.youtube.com/watch?v=${x.searchParams.get("v")}`;
    return x.origin + x.pathname;
  } catch (e) { return u; }
}
function rowDate(s) { // Metricool stamps are UTC, YYYYMMDDhhmmss
  const m = String(s).match(/^(\d{4})(\d{2})(\d{2})(\d{2})?(\d{2})?(\d{2})?/); if (!m) return null;
  return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0)));
}
const laDay = d => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles", year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
const dayNum = ymd => Math.round(Date.parse(ymd + "T12:00:00Z") / 864e5);
const STOP = new Set("the and for you your with that this are was our from have has what who how all any not but can get out its they them their more most just every into one two own via per than then there here when where which will would could should about after before over under very also only been being were does did doing done each other some such these those through until while why yes no adit practice practices".split(" "));
const tokens = s => String(s || "").toLowerCase().replace(/https?:\S+/g, " ").replace(/[^a-z0-9]+/g, " ").split(" ").filter(t => t.length >= 3 && !STOP.has(t));

/* ---------- inputs ---------- */
const { WEEKS } = loadJS(path.join(CAL, "weeks.js"), ["WEEKS"]);
if (!WEEKS) { console.error("Could not read calendar/weeks.js"); process.exit(1); }
const prev = loadJS(path.join(CAL, "stats.js"), ["STATS"]).STATS || { posts: {}, groupLog: [] };
const map = readJSON(MAP_FILE) || {};
const ignore = new Set((map._ignore || []).map(norm));

const MON = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
const days = [];
WEEKS.forEach(w => {
  const wm = MON[w.id.split("-")[0]] || 1, year = parseInt((w.cover && w.cover.year) || "2026", 10);
  w.days.forEach(d => {
    const [m, dd] = String(d.date).split("/").map(Number);
    const y = (wm === 12 && m === 1) ? year + 1 : year;
    const ymd = `${y}-${String(m).padStart(2, "0")}-${String(dd).padStart(2, "0")}`;
    days.push({ key: `${w.id}/${d.id}`, ymd, n: dayNum(ymd), ig: d.ig || null,
      toks: tokens([d.title, d.hook, (d.caption || []).join(" "), d.tags, d.cta].join(" ")) });
  });
});
const firstDay = Math.min(...days.map(d => d.n));

// rows by network, normalized
const rows = { ig: [], fb: [], li: [], tt: [], yt: [] };
const have = new Set();
for (const [file, spec] of Object.entries(SPEC)) {
  const j = readJSON(path.join(IN, file + ".json")); if (!j || !Array.isArray(j.rows)) continue;
  have.add(spec.net);
  j.rows.forEach(r => {
    const o = {}; spec.cols.forEach((c, i) => o[c] = r[i]);
    const d = rowDate(o.date); if (!d || !o.url) return;
    const x = { net: spec.net, kind: spec.kind, url: clean(o.url), key: norm(o.url), at: d.toISOString(), ymd: laDay(d), text: o.text || "" };
    if (spec.net === "ig") Object.assign(x, { views: int(o.views), watch: num(o.watch), likes: int(o.likes), comments: int(o.comments), shares: int(o.shares), saves: int(o.saves), reach: int(o.reach) });
    if (spec.net === "fb" && spec.kind === "reel") Object.assign(x, { views: int(o.views), watch: num(o.watch), likes: int(o.likes) });
    if (spec.net === "fb" && spec.kind === "post") Object.assign(x, { views: (int(o.videoViews) || 0) > 0 ? int(o.videoViews) : int(o.impressions), impressions: int(o.impressions), reach: int(o.reach), likes: int(o.likes), comments: int(o.comments), shares: int(o.shares) });
    if (spec.net === "li") Object.assign(x, { views: int(o.videoViews) ?? int(o.impressions), impressions: int(o.impressions), likes: int(o.likes), comments: int(o.comments), shares: int(o.shares), video: int(o.videoViews) !== undefined });
    if (spec.net === "tt") Object.assign(x, { views: int(o.views), watch: num(o.watch), likes: int(o.likes), comments: int(o.comments), shares: int(o.shares) });
    if (spec.net === "yt") Object.assign(x, { views: int(o.views), watch: num(o.watch), likes: int(o.likes), comments: int(o.comments) });
    if (x.watch !== undefined) x.watch = Math.round(x.watch * 10) / 10;
    rows[spec.net].push(x);
  });
}

/* ---------- match rows to calendar days ---------- */
const claimed = new Map(); // norm(url) -> day key
Object.entries(map).forEach(([k, v]) => { if (k.startsWith("_")) return; NETS.forEach(n => { if (v[n]) claimed.set(norm(v[n]), k); }); });
days.forEach(d => { if (d.ig && !claimed.has(norm(d.ig))) { (map[d.key] = map[d.key] || {}).ig = d.ig; claimed.set(norm(d.ig), d.key); } });

const df = new Map(); days.forEach(d => new Set(d.toks).forEach(t => df.set(t, (df.get(t) || 0) + 1)));
const idf = t => Math.log(1 + days.length / (1 + (df.get(t) || 0)));
function vec(toks) { const v = new Map(); toks.forEach(t => v.set(t, (v.get(t) || 0) + idf(t))); return v; }
function cos(a, b) { let dot = 0, na = 0, nb = 0; a.forEach((x, t) => { na += x * x; if (b.has(t)) dot += x * b.get(t); }); b.forEach(x => nb += x * x); return dot && na && nb ? dot / Math.sqrt(na * nb) : 0; }
const dayVec = new Map(days.map(d => [d.key, vec(d.toks)]));

const report = { at: NOW, autoMatched: [], unmatched: [] };
for (const net of NETS) {
  for (const r of rows[net]) {
    if (claimed.has(r.key) || ignore.has(r.key)) continue;
    const n = dayNum(r.ymd); if (n < firstDay - 1) continue;
    const rv = vec(tokens(r.text));
    const cands = days.filter(d => n >= d.n - 1 && n <= d.n + 4 && !(map[d.key] && map[d.key][net]))
      .map(d => ({ d, s: cos(rv, dayVec.get(d.key)), shared: tokens(r.text).filter(t => d.toks.includes(t)).length }))
      .sort((a, b) => b.s - a.s);
    const best = cands[0], second = cands[1];
    if (best && best.s >= 0.12 && best.shared >= 2 && (!second || best.s - second.s >= 0.04)) {
      (map[best.d.key] = map[best.d.key] || {})[net] = r.url; claimed.set(r.key, best.d.key);
      report.autoMatched.push({ net, url: r.url, day: best.d.key, score: +best.s.toFixed(2) });
    } else if (n >= firstDay - 1) {
      report.unmatched.push({ net, url: r.url, date: r.ymd, text: String(r.text).slice(0, 90), best: best ? `${best.d.key} (${best.s.toFixed(2)})` : null });
    }
  }
}

/* ---------- build per-post stats ---------- */
const byKey = new Map(); NETS.forEach(n => rows[n].forEach(r => byKey.set(r.key, r)));
const posts = {};
Object.entries(map).forEach(([k, v]) => {
  if (k.startsWith("_")) return;
  const o = {};
  NETS.forEach(net => {
    if (!v[net]) return;
    const r = byKey.get(norm(v[net]));
    if (r) { const { key, text, net: _n, ymd, ...keep } = r; o[net] = keep; }
    else if (!have.has(net) && prev.posts && prev.posts[k] && prev.posts[k][net]) o[net] = prev.posts[k][net];
    else o[net] = { url: clean(v[net]) };
  });
  const sum = f => NETS.reduce((s, n) => s + ((o[n] && o[n][f]) || 0), 0);
  o.total = { views: sum("views"), likes: sum("likes"), comments: sum("comments"), shares: sum("shares") };
  posts[k] = o;
});

/* ---------- FB Groups Mastersheet ---------- */
const FIX = { "nifty thrify": "Nifty Thrifty Dentists", "forward thinking chiro alliiance": "Forward Thinking Chiro Alliance", "forward thinking chiro allinaince": "Forward Thinking Chiro Alliance",
  "chiropractic netwroking group": "Chiropractic Networking Group", "od's on facebook": "ODs on Facebook", "od's on finance": "ODs on Finance", "oz group": "OZ Group", "focus chiropractic": "Focus Chiropractic", "chirotouch users group": "ChiroTouch Users Group" };
const disp = s => { const t = String(s || "").replace(/\s+/g, " ").trim(); return FIX[t.toLowerCase()] || t; };
const slug = s => disp(s).toLowerCase().replace(/&/g, " ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const yes = v => { const t = String(v || "").trim().toLowerCase(); return t === "yes" ? true : t === "no" ? false : null; };
const VMAP = { dental: "dental", optometry: "opto", opto: "opto", chiropractic: "chiro", chiro: "chiro", orthodontics: "ortho", ortho: "ortho" };
const prevGL = loadJS(path.join(CAL, "groups-list.js"), ["GROUP_LIST"]).GROUP_LIST;
let GROUP_LIST = prevGL;
const allJ = readJSON(path.join(IN, "groups_all.json")), spJ = readJSON(path.join(IN, "groups_sponsored.json"));
if (allJ && spJ) {
  const V = { dental: { all: [], sponsored: [] }, ortho: { all: [], sponsored: [] }, chiro: { all: [], sponsored: [] }, opto: { all: [], sponsored: [] } };
  let cur = null; const seen = new Set();
  (allJ.values || []).forEach(r => {
    const name = (r[0] || "").trim(), link = (r[1] || "").trim();
    if (!name) return;
    const v = VMAP[name.toLowerCase()];
    if (v && !/^https?:/.test(link)) { cur = v; return; }
    if (!cur) return;
    const k = link ? norm(link) : slug(name); if (seen.has(k)) return; seen.add(k);
    V[cur].all.push({ key: slug(name), name: disp(name), url: link || null, partner: yes(r[2]), access: yes(r[3]), devi: yes(r[4]) });
  });
  cur = null;
  (spJ.values || []).forEach(r => {
    const name = (r[0] || "").trim(), link = (r[1] || "").trim();
    if (!name) return;
    const v = VMAP[name.toLowerCase()];
    if (v && !/^https?:/.test(link)) { cur = v; return; }
    if (!cur) return;
    const posters = String(r[4] || "").split(",").map(s => s.trim()).filter(s => s && s.toLowerCase() !== "none");
    const match = V[cur].all.find(g => (link && g.url && norm(g.url) === norm(link)) || g.key === slug(name));
    const g = { key: match ? match.key : slug(name), name: disp(name), url: link || (match && match.url) || null, freq: int(r[2]) ?? null,
      soldier: (r[3] || "").trim() || null, posters, comment: yes(r[5]),
      partner: match ? match.partner : true, access: posters.length ? true : (match ? match.access : null), devi: match ? match.devi : null };
    if (match) match.sponsored = true;
    V[cur].sponsored.push(g);
  });
  GROUP_LIST = { updated: NOW, source: "FB Groups - Mastersheet", verticals: V };
}

/* ---------- group post log (Gokul's team) ---------- */
let groupLog = prev.groupLog || [];
const logJ = readJSON(path.join(IN, "post_log.json"));
if (logJ && Array.isArray(logJ.values) && logJ.values.length) {
  const head = logJ.values[0].map(h => String(h || "").toLowerCase());
  const col = (...names) => head.findIndex(h => names.some(n => h.includes(n)));
  const C = { date: col("date"), v: col("vertical"), group: col("group"), post: col("post id"), title: col("post title"), by: col("posted by"),
    link: col("link"), views: col("views"), comments: col("comments"), reactions: col("reactions"), shares: col("shares"), leads: col("dm", "lead"), notes: col("notes") };
  const g = (r, i) => i >= 0 ? (r[i] ?? "") : "";
  const isoDate = s => { const t = String(s || "").trim(); let m = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/); if (m) return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
    m = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/); if (m) return `${m[3].length === 2 ? "20" + m[3] : m[3]}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}`;
    const p = Date.parse(t); return isNaN(p) ? t : new Date(p).toISOString().slice(0, 10); };
  groupLog = logJ.values.slice(1).filter(r => String(g(r, C.link)).trim()).map(r => ({
    date: isoDate(g(r, C.date)), vertical: VMAP[String(g(r, C.v)).trim().toLowerCase()] || String(g(r, C.v)).trim().toLowerCase(),
    group: slug(g(r, C.group)), groupName: disp(g(r, C.group)), post: String(g(r, C.post)).trim().toUpperCase(), by: String(g(r, C.by)).trim(),
    link: String(g(r, C.link)).trim(), views: int(g(r, C.views)), comments: int(g(r, C.comments)), reactions: int(g(r, C.reactions)),
    shares: int(g(r, C.shares)), leads: int(g(r, C.leads)), notes: String(g(r, C.notes)).trim() }));
}

/* ---------- write ---------- */
const STATS = { updated: NOW, posts, groupLog };
fs.writeFileSync(path.join(CAL, "stats.js"), `/* Generated by tools/refresh.mjs from Metricool and the group post log. Do not edit by hand. */\nconst STATS = ${JSON.stringify(STATS, null, 1)};\n`);
if (GROUP_LIST) fs.writeFileSync(path.join(CAL, "groups-list.js"), `/* Generated by tools/refresh.mjs from the FB Groups Mastersheet. Do not edit by hand. */\nconst GROUP_LIST = ${JSON.stringify(GROUP_LIST, null, 1)};\n`);
fs.writeFileSync(MAP_FILE, JSON.stringify(map, null, 2) + "\n");
fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2) + "\n");

const counts = Object.fromEntries(NETS.map(n => [n, rows[n].length]));
console.log(`Rows read: ${JSON.stringify(counts)}`);
console.log(`Posts with stats: ${Object.keys(posts).length}  Auto-matched: ${report.autoMatched.length}  Unmatched: ${report.unmatched.length}  Group log rows: ${groupLog.length}`);
report.autoMatched.forEach(a => console.log(`  matched ${a.net} ${a.url} -> ${a.day} (${a.score})`));
report.unmatched.forEach(u => console.log(`  unmatched ${u.net} ${u.date} ${u.url} "${u.text}"${u.best ? " best guess " + u.best : ""}`));
