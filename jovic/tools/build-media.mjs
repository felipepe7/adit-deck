#!/usr/bin/env node
/* Turns finished reels into the files the calendar plays.

   Usage:  node tools/build-media.mjs <folder with the original reels> [<week>/<day>=<file> ...] [--force]

   For every day listed in tools/media-map.json it finds the original in <folder> (the file name contains the
   day's words, any case), then writes
     calendar/media/<week>/<day>.mp4   720p H.264 + AAC, fast-start, 14 MB or less
     calendar/media/<week>/<day>.jpg   the poster, a frame from the first seconds
   and finishes by running tools/previews.sh for the small silent loops on the glance cards.

   When a file name does not match (the Thursday repost, say), name it yourself:
     node tools/build-media.mjs ~/Downloads w1116/thu="IMG_4821.MOV"
   A day whose files are already built is skipped; --force rebuilds it. Needs ffmpeg and ffprobe. */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CAL = path.join(ROOT, "calendar");
const MAX_MB = 14;

const args = process.argv.slice(2);
const force = args.includes("--force");
const pos = args.filter(a => !a.startsWith("--"));
const dir = pos.find(a => !/^w\d+\/[a-z-]+=/.test(a));
if (!dir) { console.error("Usage: node tools/build-media.mjs <folder with the original reels> [w1116/thu=file.mp4 ...] [--force]"); process.exit(1); }
const overrides = Object.fromEntries(pos.filter(a => a !== dir).map(a => { const i = a.indexOf("="); return [a.slice(0, i), a.slice(i + 1)]; }));

const MAP = JSON.parse(fs.readFileSync(path.join(ROOT, "tools", "media-map.json"), "utf8"));
const words = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const VIDEO = /\.(mp4|mov|m4v)$/i;
const originals = fs.readdirSync(dir).filter(f => VIDEO.test(f)).map(f => ({ f, w: words(f.replace(VIDEO, "")), p: path.join(dir, f), t: fs.statSync(path.join(dir, f)).mtimeMs }));

const run = (cmd, a) => spawnSync(cmd, a, { encoding: "utf8", maxBuffer: 64 << 20 });
const probe = (f, entries, sel = []) => run("ffprobe", ["-v", "error", ...sel, "-show_entries", entries, "-of", "default=nw=1:nk=1", f]).stdout.trim().split("\n");
const mb = f => fs.statSync(f).size / 1048576;

function encode(src, out) {
  const [fr] = probe(src, "stream=r_frame_rate", ["-select_streams", "v:0"]);
  const [a, b] = String(fr).split("/").map(Number); const fps = b ? a / b : a;
  const dur = parseFloat(probe(src, "format=duration")[0]) || 60;
  // three quality steps at 720p, then 540p, then a bitrate-capped last resort for a long video
  const steps = [{ h: 1280, crf: 26 }, { h: 1280, crf: 29 }, { h: 960, crf: 28 }, { h: 960, crf: 31 }, { h: 960, crf: 31, cap: true }];
  for (const s of steps) {
    const vf = `scale=-2:'min(ih,${s.h})'` + (fps > 30.5 ? ",fps=30" : "");
    const rate = s.cap ? ["-maxrate", `${Math.max(250, Math.floor((MAX_MB * 8 * 1024 * 0.9) / dur - 96))}k`, "-bufsize", "2M"] : [];
    const r = run("ffmpeg", ["-v", "error", "-y", "-i", src, "-map", "0:v:0", "-map", "0:a:0?", "-vf", vf, "-c:v", "libx264", "-preset", "veryfast", "-crf", String(s.crf), ...rate,
      "-profile:v", "high", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k", "-ac", "2", "-movflags", "+faststart", out]);
    if (r.status !== 0) throw new Error(r.stderr || "ffmpeg failed");
    if (mb(out) <= MAX_MB) return { dur, h: s.h, crf: s.crf };
  }
  return { dur, h: 960, crf: 31, over: true };
}

const built = [], missing = [], skipped = [];
for (const [key, hints] of Object.entries(MAP)) {
  if (key.startsWith("_")) continue;
  const [wk, day] = key.split("/");
  const out = path.join(CAL, "media", wk, day + ".mp4"), poster = path.join(CAL, "media", wk, day + ".jpg");
  let src = null;
  if (overrides[key]) { src = path.isAbsolute(overrides[key]) ? overrides[key] : path.join(dir, overrides[key]); if (!fs.existsSync(src)) { missing.push(`${key} (file ${overrides[key]} not found)`); continue; } }
  else {
    const hits = originals.filter(o => hints.some(h => o.w.includes(words(h)))).sort((x, y) => y.t - x.t);
    if (hits.length > 1) console.log(`  ${key}: ${hits.length} files match, using the newest (${hits[0].f})`);
    if (hits.length) src = hits[0].p;
  }
  if (!src) { missing.push(key); continue; }
  if (!force && fs.existsSync(out) && fs.existsSync(poster) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs) { skipped.push(key); continue; }
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const info = encode(src, out);
  const ss = Math.min(1.2, info.dur / 4).toFixed(2);
  const pr = run("ffmpeg", ["-v", "error", "-y", "-ss", ss, "-i", out, "-frames:v", "1", "-vf", "scale=540:-2:flags=lanczos", "-q:v", "4", poster]);
  if (pr.status !== 0) throw new Error(pr.stderr || "poster failed");
  built.push(key);
  console.log(`  ${key}: ${path.basename(src)} -> ${path.relative(ROOT, out)}  ${mb(out).toFixed(1)} MB, ${info.h === 1280 ? "720p" : "540p"}, crf ${info.crf}${info.over ? "  (still over " + MAX_MB + " MB: a long video, trim it or raise MAX_MB)" : ""}`);
}

if (built.length) { const r = spawnSync("bash", [path.join(ROOT, "tools", "previews.sh")], { stdio: "inherit" }); if (r.status !== 0) process.exitCode = r.status || 1; }
console.log(`Built ${built.length}, skipped ${skipped.length} already done, missing ${missing.length}${missing.length ? ": " + missing.join(", ") : ""}`);
