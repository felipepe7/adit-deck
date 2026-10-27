#!/usr/bin/env bash
# Card previews: small, silent, seamless loops the calendar plays on its glance cards
# and Facebook Groups menu cards. The full files stay where they are for the big phones.
#
#   tools/previews.sh            make any preview that is missing or older than its video
#   tools/previews.sh -f         rebuild every preview
#   tools/previews.sh a.mp4 ...  only these videos
#
# Reels (9:16) get the first 8 seconds. Anything else (a carousel's motion version)
# loops in full. Every loop ends with a 0.6s dissolve back into its first frame, so it
# never jumps. Output: calendar/media/<week>/p/<name>.mp4 at 432px wide, no audio.
set -euo pipefail
cd "$(dirname "$0")/.."

FORCE=0
if [[ "${1:-}" == "-f" ]]; then FORCE=1; shift; fi
if [[ $# -gt 0 ]]; then FILES=("$@"); else
  mapfile -t FILES < <(find calendar/media -mindepth 2 -maxdepth 2 -name '*.mp4' ! -name '*-latch.mp4' | sort)
fi

S0=0.1     # skip the first frames (some exports open on a white flash)
F=0.6      # loop dissolve
REEL=8     # seconds of a reel to preview
MAXLEN=30  # longest full-length loop

for src in "${FILES[@]}"; do
  dir=$(dirname "$src"); name=$(basename "$src"); out="$dir/p/$name"
  if [[ $FORCE -eq 0 && -f "$out" && "$out" -nt "$src" ]]; then continue; fi
  mkdir -p "$dir/p"
  IFS=x read -r w h < <(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "$src")
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$src")
  if (( w * 16 == h * 9 )); then L=$REEL; else L=$(awk -v d="$dur" -v s="$S0" -v f="$F" -v m="$MAXLEN" 'BEGIN{x=d-s-f-0.05; if(x>m)x=m; printf "%.3f", x}'); fi
  L=$(awk -v d="$dur" -v s="$S0" -v f="$F" -v l="$L" 'BEGIN{x=d-s-f-0.05; if(l>x)l=x; printf "%.3f", l}')
  LF=$(awk -v l="$L" -v f="$F" 'BEGIN{printf "%.3f", l+f}')
  ffmpeg -v error -y -ss "$S0" -t "$LF" -i "$src" -filter_complex "
    [0:v]fps=30,scale=432:-2:flags=lanczos,setsar=1,split=3[a][b][c];
    [a]trim=start=$F:end=$L,setpts=PTS-STARTPTS[body];
    [b]trim=start=$L:end=$LF,setpts=PTS-STARTPTS[tail];
    [c]trim=start=0:end=$F,setpts=PTS-STARTPTS[head];
    [tail][head]xfade=transition=fade:duration=$F:offset=0[x];
    [body][x]concat=n=2:v=1:a=0,format=yuv420p[v]" -map "[v]" -an \
    -c:v libx264 -preset veryfast -crf 27 -profile:v main -level 3.1 -g 60 -movflags +faststart "$out"
  printf '%-40s %5ss  %s KB\n' "$out" "$L" "$(( $(stat -c %s "$out") / 1024 ))"
done
