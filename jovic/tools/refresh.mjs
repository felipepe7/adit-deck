#!/usr/bin/env node
/* Rebuilds jovic/calendar/stats.js: the live link and the numbers for every post on Victor's content calendar.

   Usage:  node tools/refresh.mjs --in <folder of raw pulls> [--now <ISO time>]

   Raw pulls from Metricool, brand 8185392 (any can be missing; the last known numbers for that network are kept):
     ig_reels.json  ig_posts.json  fb_reels.json  fb_posts.json
     li_posts.json  tt_posts.json  yt_videos.json          -> {"rows": [...]}
   Column order for each file is in SPEC below (tools/README.md lists the Metricool metric ids).

   On the calendar a platform reads "Scheduled" until stats.js has an entry for it, then "Posted" with the live link.
   An entry exists when the post is matched to a raw row (numbers + link), or when tools/post-map.json lists the
   network under "_posted" for that day (a post that is live but has no analytics row, like a LinkedIn personal profile). */

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
const NETS = ["ig", "fb", "tt", "yt", "li"];

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
const laFmt = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
function laParts(d) { const p = Object.fromEntries(laFmt.formatToParts(d).map(x => [x.type, x.value])); return { ymd: `${p.year}-${p.month}-${p.day}`, min: (+p.hour) * 60 + (+p.minute) }; }
const dayNum = ymd => Math.round(Date.parse(ymd + "T12:00:00Z") / 864e5);
const clockMin = t => { const m = String(t || "").match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i); if (!m) return null; let h = (+m[1]) % 12; if (/pm/i.test(m[3])) h += 12; return h * 60 + (+m[2]); };
// words every Jovic post shares carry no signal for telling one reel from another
const STOP = new Set("the and for you your with that this are was our from have has what who how all any not but can get out its they them their more most just every into one two own via per than then there here when where which will would could should about after before over under very also only been being were does did doing done each other some such these those through until while why yes no jovic flooring supply victor san diego free delivery first orders over sq ft call text job site contractors contractor flippers investors".split(" "));
const tokens = s => String(s || "").toLowerCase().replace(/https?:\S+/g, " ").replace(/[^a-z0-9]+/g, " ").split(" ").filter(t => t.length >= 3 && !STOP.has(t));

/* ---------- inputs ---------- */
const { WEEKS } = loadJS(path.join(CAL, "weeks.js"), ["WEEKS"]);
if (!WEEKS) { console.error("Could not read calendar/weeks.js"); process.exit(1); }
const prev = loadJS(path.join(CAL, "stats.js"), ["STATS"]).STATS || { posts: {} };
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
    const at = {}; (d.times || []).forEach(t => { at[t.k] = clockMin(t.t); });
    days.push({ key: `${w.id}/${d.id}`, ymd, n: dayNum(ymd), nets: (d.times || []).map(t => t.k), at,
      toks: tokens([d.title, d.hook, (d.caption || []).join(" "), d.tags].join(" ")) });
  });
});
const firstDay = Math.min(...days.map(d => d.n));

// raw rows by network, normalized
const rows = { ig: [], fb: [], li: [], tt: [], yt: [] };
const have = new Set();
for (const [file, spec] of Object.entries(SPEC)) {
  const j = readJSON(path.join(IN, file + ".json")); if (!j || !Array.isArray(j.rows)) continue;
  have.add(spec.net);
  j.rows.forEach(r => {
    const o = {}; spec.cols.forEach((c, i) => o[c] = r[i]);
    const d = rowDate(o.date); if (!d || !o.url) return;
    const la = laParts(d);
    const x = { net: spec.net, kind: spec.kind, url: clean(o.url), key: norm(o.url), at: d.toISOString(), ymd: la.ymd, min: la.min, text: o.text || "" };
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

const df = new Map(); days.forEach(d => new Set(d.toks).forEach(t => df.set(t, (df.get(t) || 0) + 1)));
const idf = t => Math.log(1 + days.length / (1 + (df.get(t) || 0)));
function vec(toks) { const v = new Map(); toks.forEach(t => v.set(t, (v.get(t) || 0) + idf(t))); return v; }
function cos(a, b) { let dot = 0, na = 0, nb = 0; a.forEach((x, t) => { na += x * x; if (b.has(t)) dot += x * b.get(t); }); b.forEach(x => nb += x * x); return dot && na && nb ? dot / Math.sqrt(na * nb) : 0; }
const dayVec = new Map(days.map(d => [d.key, vec(d.toks)]));
const setMap = (key, net, url) => { (map[key] = map[key] || {})[net] = url; };

const report = { at: NOW, autoMatched: [], unmatched: [] };
const free = (r, net) => !claimed.has(r.key) && !ignore.has(r.key);

// pass 1: a day's own platforms, rows that went out on that Pacific date. This is how every calendar post is planned, so it is the strong signal.
for (const day of days) {
  for (const net of day.nets) {
    if (map[day.key] && map[day.key][net]) continue;
    const cands = rows[net].filter(r => free(r) && r.ymd === day.ymd).map(r => {
      const s = cos(vec(tokens(r.text)), dayVec.get(day.key)), dt = day.at[net] == null ? null : Math.abs(r.min - day.at[net]);
      return { r, s, dt };
    }).sort((a, b) => b.s - a.s || (a.dt ?? 1e9) - (b.dt ?? 1e9));
    if (!cands.length) continue;
    const [best, second] = cands;
    const close = best.dt !== null && best.dt <= 180;                      // within 3 hours of the planned time
    const alone = !second;
    const ok = alone ? (best.s >= 0.05 || close)
      : ((best.s >= 0.12 && best.s - second.s >= 0.04) || (close && (second.dt === null || second.dt > best.dt + 60) && best.s >= second.s));
    if (ok) { setMap(day.key, net, best.r.url); claimed.set(best.r.key, day.key); report.autoMatched.push({ net, url: best.r.url, day: day.key, score: +best.s.toFixed(2), how: "date" }); }
  }
}
// pass 2: anything left, matched by caption within the days around it
for (const net of NETS) {
  for (const r of rows[net]) {
    if (!free(r)) continue;
    const n = dayNum(r.ymd); if (n < firstDay - 1) continue;
    const rv = vec(tokens(r.text));
    const cands = days.filter(d => n >= d.n - 1 && n <= d.n + 4 && !(map[d.key] && map[d.key][net]))
      .map(d => ({ d, s: cos(rv, dayVec.get(d.key)), shared: tokens(r.text).filter(t => d.toks.includes(t)).length }))
      .sort((a, b) => b.s - a.s);
    const best = cands[0], second = cands[1];
    if (best && best.s >= 0.12 && best.shared >= 2 && (!second || best.s - second.s >= 0.04)) {
      setMap(best.d.key, net, r.url); claimed.set(r.key, best.d.key);
      report.autoMatched.push({ net, url: r.url, day: best.d.key, score: +best.s.toFixed(2), how: "caption" });
    } else {
      report.unmatched.push({ net, url: r.url, date: r.ymd, text: String(r.text).slice(0, 90), best: best ? `${best.d.key} (${best.s.toFixed(2)})` : null });
    }
  }
}

/* ---------- build per-post stats ---------- */
const byKey = new Map(); NETS.forEach(n => rows[n].forEach(r => byKey.set(r.key, r)));
const posts = {};
const dayKeys = new Set(days.map(d => d.key));
Object.entries(map).forEach(([k, v]) => {
  if (k.startsWith("_") || !dayKeys.has(k)) return;
  const manual = new Set(v._posted || []);
  const o = {};
  NETS.forEach(net => {
    const url = v[net];
    const old = prev.posts && prev.posts[k] && prev.posts[k][net];
    if (url) {
      const r = byKey.get(norm(url));
      if (r) { const { key, text, net: _n, ymd, min, ...keep } = r; o[net] = { ...keep, posted: true }; }
      else if (old && norm(old.url) === norm(url)) o[net] = old;           // analytics did not return it this time: keep what we had
      else o[net] = { url: clean(url), posted: true };                       // mapped by hand, so it is live; numbers come with the next pull
    } else if (manual.has(net)) o[net] = { posted: true };                   // live, but no link or analytics row (LinkedIn personal profile)
    else if (!have.has(net) && old) o[net] = old;
  });
  if (!Object.keys(o).length) return;
  const sum = f => NETS.reduce((s, n) => s + ((o[n] && o[n][f]) || 0), 0);
  o.total = { views: sum("views"), likes: sum("likes"), comments: sum("comments"), shares: sum("shares") };
  posts[k] = o;
});

/* ---------- write ---------- */
const STATS = { updated: NOW, posts };
fs.writeFileSync(path.join(CAL, "stats.js"), `/* Generated by tools/refresh.mjs from Metricool. Do not edit by hand. */\nconst STATS = ${JSON.stringify(STATS, null, 1)};\n`);
fs.writeFileSync(MAP_FILE, JSON.stringify(map, null, 2) + "\n");
fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2) + "\n");

const counts = Object.fromEntries(NETS.map(n => [n, rows[n].length]));
console.log(`Rows read: ${JSON.stringify(counts)}`);
console.log(`Posts with stats: ${Object.keys(posts).length}  Auto-matched: ${report.autoMatched.length}  Unmatched: ${report.unmatched.length}`);
report.autoMatched.forEach(a => console.log(`  matched ${a.net} ${a.url} -> ${a.day} (${a.how}, ${a.score})`));
report.unmatched.forEach(u => console.log(`  unmatched ${u.net} ${u.date} ${u.url} "${u.text}"${u.best ? " best guess " + u.best : ""}`));
