(function(){
const D=window.DATA, $=s=>document.querySelector(s), el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
const fmt=t=>{t=+t;const m=Math.floor(t/60),s=(t-m*60);return m+":"+(s<10?"0":"")+s.toFixed(1)};
const fmt0=t=>{t=Math.round(+t);return Math.floor(t/60)+":"+String(t%60).padStart(2,"0")};
const TYPE={talent:"On camera",ai:"AI render",broll:"B-roll",drone:"Drone",gfx:"Graphics",logo:"Logo",stock:"Stock",split:"Split screen",guest:"Guest"};
const COL={talent:"#5286C2",ai:"#D9A21B",broll:"#8A929D",drone:"#2F7D68",gfx:"#8B6CC4",logo:"#F5F5F5",stock:"#9A6B4F",split:"#1E3A5F",guest:"#C2734A"};
// The editor's move vocabulary. Each shot's Edit/Camera notes are matched against these.
const MOVES=[
 {k:"logo",ic:"✦",t:"Logo fade in",h:"Fade the logo up over 8 to 12 frames, keep it small and centered, and hold it at least 1.5 seconds so it can be read.",re:/logo[^.]*(fade|fades|holds|up)|fades up and holds/i},
 {k:"logobuild",ic:"✎",t:"Logo build",h:"Build the mark piece by piece (letters, shapes or a write-on) timed to the voice or the beat, then hold the finished logo.",re:/logo builds|assembles|letter by letter|write.?on|written on|letterform|wordmark|bug animates/i},
 {k:"zoom",ic:"⤢",t:"Zoom / punch-in",h:"Punch in from the wide to the tight angle on a key word. Use a cut-in, not a slow digital zoom.",re:/zoom|punch|cut in/i},
 {k:"flash",ic:"⚡",t:"Flash transition",h:"2 to 4 frames of white flash on the cut, landed on a beat. Flash out of one shot, or in and out between two.",re:/flash/i},
 {k:"flicker",ic:"▚",t:"Flicker run",h:"A run of 2 to 3 frame shots cut hard against each other so the screen flickers, then land on a hold.",re:/flicker|two to three frames/i},
 {k:"leak",ic:"☀",t:"Light leak",h:"A warm light leak or lens flare carries the cut. Let the leak peak exactly on the cut point.",re:/light leak|warm leak|leak out|flare/i},
 {k:"whip",ic:"➶",t:"Whip transition",h:"Whip pan with motion blur out of one room and into the next, cut in the middle of the blur.",re:/whip/i},
 {k:"dissolve",ic:"◐",t:"Fade / dissolve",h:"Soft dissolve or fade on text and endings. Keep it 10 to 15 frames, never on fast talking cuts.",re:/dissolve|fades out|then fade|ghosts/i},
 {k:"wipe",ic:"▮",t:"Mask / foreground wipe",h:"Use a shape or something passing close to the lens as the cut point, so the next shot is revealed through it.",re:/wipe|mask|foreground/i},
 {k:"caption",ic:"Aa",t:"Word-by-word captions",h:"Captions start on the first word and build word by word or line by line. Keep them off the face.",re:/caption|word by word|line by line/i},
 {k:"bold",ic:"B",t:"Bold key words",h:"The money word goes big and bold, small connector words stay light. One emphasis per line.",re:/bold|big |goes big|lands big|huge/i},
 {k:"gfx",ic:"✳",t:"Motion graphic",h:"Small animated accents (underline, circle, icon, sparkle) on the key word to keep the eye busy.",re:/underline|circle|scribble|icon|sparkle|pops in|graphic/i},
 {k:"lower",ic:"▭",t:"Lower third",h:"Name super or lower third with the logo, held long enough to read twice, then out.",re:/lower third|name super/i},
 {k:"hold",ic:"⏸",t:"Hold the shot",h:"Let the strong shot breathe. Do not cut away just to cut. Long holds sell the room and the person.",re:/holds|held |longest|no cutaways/i},
 {k:"quick",ic:"⏩",t:"Quick cut",h:"Under one second on screen. Use quick cuts to add energy between longer holds.",re:/quick cut|fast cut|under (a|one) second|short (cut|insert)|1\.\d second/i},
 {k:"action",ic:"✋",t:"Cut on action",h:"Cut on a gesture, a look or a step, so the movement hides the edit.",re:/cut on|on her gesture|on the gesture|on the look/i},
 {k:"split",ic:"◫",t:"Split screen",h:"Before and after or two angles side by side, both halves framed with the subject centered in their half.",re:/split/i},
 {k:"grade",ic:"◑",t:"Grade shift",h:"Change the look on purpose to mark a new room or mood, then hold that grade for the whole section.",re:/grade drops|grade/i},
 {k:"vo",ic:"🎙",t:"B-roll over voice",h:"Cut to B-roll while her voice keeps going, so the story never stops.",re:/b-roll over|under her voice/i},
 {k:"drone",ic:"🛸",t:"Drone shot",h:"Open or reveal with a slow drone move. Logo or place name can sit over it.",re:/drone/i}
];
const MV=Object.fromEntries(MOVES.map(m=>[m.k,m]));
const tagsFor=x=>{const txt=(x[6]||"")+" "+(x[0]==="drone"?"drone":"");return MOVES.filter(m=>m.re.test(txt)).map(m=>m.k)};
const KMAP={"Flash":"flash","Light leak":"leak","Flare":"leak","Dissolve":"dissolve","Drone":"drone","Name super":"lower","Logo bug":"logobuild","Logo":"logo","Foreground wipe":"wipe","Flicker":"flicker","Split":"split","Write-on":"logobuild","Whip":"whip","Curtain pull":"wipe"};
const TAGS=D.shots.map(tagsFor);
(D.moves||[]).forEach(m=>{const k=KMAP[m[1]];if(!k)return;let i=D.shots.findIndex(x=>m[0]>=x[1]-0.05&&m[0]<x[2]);if(i<0)i=D.shots.length-1;if(!TAGS[i].includes(k))TAGS[i].push(k)});
const H=D.vert?"":" h";
document.title=D.pageTitle||document.title;
const body=document.body;body.innerHTML="";
// ---------- dark band: nav + hero
const band=el("header","band");body.appendChild(band);
const bw=el("div","wrap");band.appendChild(bw);
bw.appendChild(el("div","top",`<a href="../"><img src="../logo_d.png" alt="Puro Flow Media"></a><div class="navlinks"><a href="../">← Library</a><a href="../#v${D.num}">Deck view</a><span>${String(D.num).padStart(2,"0")} / ${D.of}</span></div>`));
const hero=el("div","hero"+H);
hero.innerHTML=`<div><div class="reel${H}"><video id="reel" src="clips/reel.mp4" poster="img/poster.jpg" autoplay muted loop playsinline preload="auto"></video>${D.silent?"":`<button class="sound" id="sound" type="button">🔊 Tap for sound</button>`}</div>
<div class="reelcap">Final export, ${fmt0(D.dur)} · <a href="${D.drive}" target="_blank" rel="noopener">4K original in Drive</a> · <a href="${D.pdf}" download>PDF</a></div></div>
<div class="info"><div><div class="eyebrow">How To Edit · Breakdown ${String(D.num).padStart(2,"0")} · ${esc(D.kind)}</div><h1>${D.headline}<br><em>${D.headline2}</em></h1><p class="lead">${D.lead}</p></div>
<div class="card"><dl class="kv"><dt>Client</dt><dd>Dr. Katherine Ahn · Aviara Aesthetic, Beverly Hills</dd><dt>Format</dt><dd>${D.vert?"9:16 vertical":"16:9 horizontal"} · ${D.W}×${D.H} · ${D.fps} fps · ${fmt0(D.dur)}</dd><dt>Made for</dt><dd>${D.forWhat}</dd></dl></div>
<div class="stats">${D.stats.map(s=>`<div class="stat"><b>${s[0]}</b><span>${s[1]}</span></div>`).join("")}</div></div>`;
bw.appendChild(hero);
// ---------- sticky nav
const counts={};TAGS.forEach((t,i)=>t.forEach(k=>{(counts[k]=counts[k]||[]).push(i)}));
const order=MOVES.map(m=>m.k).filter(k=>counts[k]);
const toc=[["dothis","Do this"],["shots","Shot by shot"],["rules","What to steal"],["structure","Structure"],["pace","Pace"],["grade","Color"],["music","Music"],["sound","Sound"],["moves","Transitions"],["text","Type"],["checklist","Checklist"]].filter(x=>x[0]!=="moves"||D.moves&&D.moves.length).filter(x=>x[0]!=="text"||D.typeNotes).filter(x=>x[0]!=="dothis"||order.length);
const nav=el("nav","toc",`<div class="wrap">${toc.map(x=>`<a href="#${x[0]}">${x[1]}</a>`).join("")}</div>`);body.appendChild(nav);
const main=el("main");body.appendChild(main);const W=el("div","wrap");main.appendChild(W);
const sec=(id,eb,h2,lead)=>{const s=el("section");s.id=id;s.innerHTML=`<div class="eyebrow">${eb}</div><h2>${h2}</h2>${lead?`<p class="lead">${lead}</p>`:""}`;W.appendChild(s);return s};
let s;
// ---------- editor instructions
if(order.length){
 s=sec("dothis","Editor instructions","Do this in your edit",`The ${order.length} moves that make this video. Tap a move to jump through every shot that uses it.`);
 const g=el("div","dothis");
 order.forEach(k=>{const m=MV[k],ix=counts[k];const b=el("button","mv",`<span class="ic" aria-hidden="true">${m.ic}</span><h3>${m.t}</h3><small>${ix.length} shot${ix.length>1?"s":""} · ${ix.slice(0,8).map(i=>String(i+1).padStart(2,"0")).join(", ")}${ix.length>8?"…":""}</small><p>${m.h}</p>`);b.type="button";b.dataset.k=k;b.setAttribute("aria-pressed","false");g.appendChild(b)});
 s.appendChild(g);
}
// ---------- shot player
const n=D.shots.length;
s=sec("shots","Shot by shot",D.shotsTitle||`${n} shots, one at a time`,"Every clip loops the real shot from the final edit. Use the arrows, tap the strip, or press ← →.");
const used=[...new Set(D.shots.map(x=>x[0]))];
const fl=el("div","filters");fl.setAttribute("role","group");fl.setAttribute("aria-label","Filter shots");
fl.innerHTML=`<button type="button" data-f="all" aria-pressed="true">All ${n}</button>`+used.map(t=>`<button type="button" data-f="t:${t}" aria-pressed="false">${TYPE[t]}</button>`).join("")+order.slice(0,8).map(k=>`<button type="button" data-f="m:${k}" aria-pressed="false">${MV[k].ic} ${MV[k].t}</button>`).join("");
s.appendChild(fl);
const pl=el("div","player"+H);
pl.innerHTML=`<div class="stage"><video id="stv" muted loop playsinline autoplay preload="auto"></video><span class="tag" id="stt"></span></div>
<div class="pinfo"><div class="meta"><div class="big" id="pnum"></div><div class="tc" id="ptc"></div></div><h3 id="pti"></h3><p class="vo" id="pvo"></p>
<div class="dobox"><b>Editor: do this</b><div class="chips" id="pch"></div><p id="ped"></p></div>
<div class="row" id="prow"></div>
<div class="ctrl"><button class="rnd" id="prev" type="button" aria-label="Previous shot">‹</button><div class="segs" id="segs"></div><button class="rnd" id="next" type="button" aria-label="Next shot">›</button></div></div>`;
s.appendChild(pl);
const film=el("div","film"+H);s.appendChild(film);
const segs=pl.querySelector("#segs");
D.shots.forEach((x,i)=>{const nn=String(i+1).padStart(2,"0");
 const b=el("button");b.type="button";b.setAttribute("aria-label",`Shot ${nn}`);b.addEventListener("click",()=>go(i));segs.appendChild(b);
 const f=el("button","fm",`<video muted loop playsinline preload="none" poster="img/s${nn}.jpg" data-src="clips/shot${nn}.mp4"></video><span>${nn}</span>`);f.type="button";f.setAttribute("aria-label",`Shot ${nn}: ${x[3]}`);f.addEventListener("click",()=>go(i));film.appendChild(f)});
const io=("IntersectionObserver" in window)?new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){if(!v.src)v.src=v.dataset.src;v.play().catch(()=>{})}else v.pause()}),{rootMargin:"120px"}):null;
film.querySelectorAll("video").forEach(v=>{if(io)io.observe(v);else{v.src=v.dataset.src;v.autoplay=true}});
let cur=0,vis=D.shots.map((_,i)=>i);
function go(i){cur=i;const x=D.shots[i],[type,a,b,title,vo,cam,edit,why]=x,nn=String(i+1).padStart(2,"0");
 const v=$("#stv");v.poster=`img/s${nn}.jpg`;v.src=`clips/shot${nn}.mp4`;v.play().catch(()=>{});
 const t=$("#stt");t.textContent=TYPE[type]||type;t.className="tag"+(type==="ai"?" ai":"");
 $("#pnum").innerHTML=`${nn}<span> / ${String(n).padStart(2,"0")}</span>`;
 $("#ptc").textContent=`${fmt(a)} – ${fmt(b)} · ${(b-a).toFixed(1)}s`;
 $("#pti").textContent=title;$("#pvo").textContent=vo?`"${vo}"`:"";$("#pvo").hidden=!vo;
 const tg=TAGS[i];$("#pch").innerHTML=tg.length?tg.map(k=>`<span class="chip">${MV[k].ic} ${MV[k].t}</span>`).join(""):`<span class="chip">✂ Plain cut</span>`;
 $("#ped").innerHTML=edit||"";
 $("#prow").innerHTML=`${cam?`<p><b>Camera</b>${cam}</p>`:""}${why?`<p style="margin-top:10px"><b>Why it works</b>${why}</p>`:""}`;
 segs.querySelectorAll("button").forEach((z,j)=>{z.classList.toggle("on",j===i);z.classList.toggle("dim",!vis.includes(j))});
 film.querySelectorAll(".fm").forEach((z,j)=>z.classList.toggle("on",j===i));
 const fm=film.children[i];if(fm&&!fm.hidden){const l=fm.offsetLeft-film.clientWidth/2+fm.clientWidth/2;film.scrollTo({left:l,behavior:"smooth"})}}
const step=d=>{const p=vis.indexOf(cur);let q=p<0?0:(p+d+vis.length)%vis.length;go(vis[q])};
$("#prev").addEventListener("click",()=>step(-1));$("#next").addEventListener("click",()=>step(1));
document.addEventListener("keydown",e=>{if(e.target.closest&&e.target.closest("input,textarea"))return;const r=pl.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;if(e.key==="ArrowRight"){step(1);e.preventDefault()}if(e.key==="ArrowLeft"){step(-1);e.preventDefault()}});
function filt(f){fl.querySelectorAll("button").forEach(z=>z.setAttribute("aria-pressed",z.dataset.f===f));
 document.querySelectorAll(".mv").forEach(z=>z.setAttribute("aria-pressed",f==="m:"+z.dataset.k));
 vis=D.shots.map((x,i)=>i).filter(i=>f==="all"||(f.startsWith("t:")&&D.shots[i][0]===f.slice(2))||(f.startsWith("m:")&&TAGS[i].includes(f.slice(2))));
 if(!vis.length)vis=D.shots.map((_,i)=>i);
 film.querySelectorAll(".fm").forEach((z,j)=>z.hidden=!vis.includes(j));go(vis[0])}
fl.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>filt(b.dataset.f)));
document.querySelectorAll(".mv").forEach(b=>b.addEventListener("click",()=>{const on=b.getAttribute("aria-pressed")==="true";filt(on?"all":"m:"+b.dataset.k);if(!on)$("#shots").scrollIntoView({behavior:"smooth"})}));
go(0);
// ---------- rules
s=sec("rules","What to steal",D.rulesTitle,D.rulesLead);
s.appendChild(el("div","rules",D.rules.map(r=>`<div class="rule${r.warn?" no":""}"><h3>${r.t}</h3><p>${r.d}</p></div>`).join("")));
// ---------- structure
s=sec("structure","The structure",D.structTitle,D.structLead);
const nb=D.beats.length;
const beats=el("div","beats");beats.style.gridTemplateColumns=`repeat(${Math.min(nb,6)},minmax(0,1fr))`;
beats.innerHTML=D.beats.map(b=>`<div class="beat"><h3>${b.n}</h3><div class="t">${fmt0(b.a)}–${fmt0(b.b)}</div><p>${b.d}</p></div>`).join("");s.appendChild(beats);
const shades=["#1E3A5F","#2C527F","#3A3F47","#4A5260","#2A2D33","#355C88"];
s.appendChild(el("div","bar",D.beats.map((b,i)=>`<div style="width:${((b.b-b.a)/D.dur*100).toFixed(2)}%;background:${shades[i%shades.length]}">${b.n.toUpperCase()}</div>`).join("")));
const tk=[];for(let i=0;i<=5;i++)tk.push(`<span>${fmt0(D.dur*i/5)}</span>`);s.appendChild(el("div","ticks",tk.join("")));
const strip=el("div","strip");strip.setAttribute("role","img");strip.setAttribute("aria-label","Every shot in order, colored by type");
D.shots.forEach((x,i)=>{const sp=el("span");sp.style.flex=(x[2]-x[1]).toFixed(2);sp.style.background=COL[x[0]]||"#8A929D";sp.title=`${i+1} ${x[3]}`;sp.style.cursor="pointer";sp.addEventListener("click",()=>{filt("all");go(i);$("#shots").scrollIntoView({behavior:"smooth"})});strip.appendChild(sp)});s.appendChild(strip);
s.appendChild(el("div","legend",used.map(t=>`<span><i style="background:${COL[t]}"></i>${TYPE[t]}</span>`).join("")));
// ---------- pace
s=sec("pace","Pace",D.pace.title,D.pace.lead);
const P=D.shots.map(x=>x[2]-x[1]),mx=Math.max(...P),cw=1000,ch=200,bwd=cw/n;
let svg=`<svg viewBox="0 0 ${cw} ${ch+24}" role="img" aria-label="Length of every shot in order">`;
[0.25,0.5,0.75,1].forEach(f=>{const y=ch-ch*f;svg+=`<line x1="0" x2="${cw}" y1="${y}" y2="${y}" stroke="rgba(245,245,245,.10)" stroke-width="1"/><text x="2" y="${y-3}" fill="#A7ABB2" font-size="11" font-family="JetBrains Mono,monospace">${(mx*f).toFixed(1)}s</text>`});
P.forEach((p,i)=>{const h=Math.max(2,p/mx*ch);svg+=`<rect x="${(i*bwd+bwd*0.12).toFixed(1)}" y="${(ch-h).toFixed(1)}" width="${(bwd*0.76).toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="${COL[D.shots[i][0]]||"#8A929D"}"><title>Shot ${i+1}: ${p.toFixed(1)}s, ${esc(D.shots[i][3])}</title></rect>`});
const avg=P.reduce((a,b)=>a+b,0)/n,ya=ch-avg/mx*ch;svg+=`<line x1="0" x2="${cw}" y1="${ya}" y2="${ya}" stroke="#F5F5F5" stroke-dasharray="5 5" stroke-width="1.2"/><text x="${cw-4}" y="${ya-5}" text-anchor="end" fill="#F5F5F5" font-size="12" font-family="JetBrains Mono,monospace">avg ${avg.toFixed(1)}s</text>`;
svg+=`<text x="0" y="${ch+18}" fill="#A7ABB2" font-size="11" font-family="Montserrat,sans-serif">Shot 1</text><text x="${cw}" y="${ch+18}" text-anchor="end" fill="#A7ABB2" font-size="11" font-family="Montserrat,sans-serif">Shot ${n}</text></svg>`;
s.appendChild(el("div","chart",svg+`<div class="cap">Each bar is one shot, in order. Height is how long it stays on screen.</div>`));
const sorted=[...P].sort((a,b)=>a-b),med=sorted[Math.floor(n/2)];
const li=P.indexOf(mx),si=P.indexOf(Math.min(...P));
s.appendChild(el("div","kpis",`<div class="kpi"><b>${n}</b><span>shots in ${fmt0(D.dur)}</span></div><div class="kpi"><b>${avg.toFixed(1)}s</b><span>average shot (median ${med.toFixed(1)}s)</span></div><div class="kpi"><b>${Math.min(...P).toFixed(1)}s</b><span>fastest: shot ${si+1}</span></div><div class="kpi"><b>${mx.toFixed(1)}s</b><span>longest hold: shot ${li+1}</span></div>`));
if(D.pace.notes)s.appendChild(el("div","card",`<ul class="clean">${D.pace.notes.map(x=>`<li>${x}</li>`).join("")}</ul>`)).style.marginTop="16px";
// ---------- grade
s=sec("grade","Color grade",D.grade.title,D.grade.lead);
const meter=(l,v,max)=>`<div class="meter"><span>${l}</span><span class="track"><span class="fill" style="width:${Math.max(2,Math.min(100,Math.round(v/max*100)))}%;display:block"></span></span><span class="v">${(+v).toFixed(2)}</span></div>`;
const looks=el("div","looks");if(D.grade.looks.length<3)looks.style.gridTemplateColumns=`repeat(${D.grade.looks.length},minmax(0,1fr))`;
D.grade.looks.forEach(L=>{looks.appendChild(el("div","card look"+H,`<img src="img/${L.img}.jpg" alt="${esc(L.name)} example frame" loading="lazy"><h3>${L.name}</h3><div class="where">${L.where}</div><div class="sw">${L.sw.map(c=>`<span style="background:${c}" title="${c}"></span>`).join("")}</div>${meter("Brightness",L.bright,1)}${meter("Warmth",Math.max(0,L.warm),0.3)}${meter("Saturation",L.sat,0.6)}<ul style="margin-top:12px">${L.tips.map(t=>`<li>${t}</li>`).join("")}</ul>`))});
s.appendChild(looks);
if(D.grade.notes)s.appendChild(el("div","card",`<ul class="clean">${D.grade.notes.map(x=>`<li>${x}</li>`).join("")}</ul>`)).style.marginTop="16px";
// ---------- music
const M=D.music;s=sec("music","Music choice",M.title,M.lead);
s.appendChild(el("div","kpis",(M.kpis||[]).map(k=>`<div class="kpi${k[2]?" flag":""}"><b>${k[0]}</b><span>${k[1]}</span></div>`).join("")));
s.appendChild(el("div","card",`<ul class="clean">${M.notes.map(x=>`<li>${x}</li>`).join("")}</ul>`)).style.marginTop="16px";
// ---------- sound
const S=D.sound;s=sec("sound","Sound engineering",S.title,S.lead);
s.appendChild(el("div","kpis",S.kpis.map(k=>`<div class="kpi${k[2]?" flag":""}"><b>${k[0]}</b><span>${k[1]}</span></div>`).join("")));
if(S.rms&&S.rms.length){const r=S.rms.map(v=>Math.max(-60,v)),lw=1000,lh=150,st=lw/(r.length-1||1);
 let p="";r.forEach((v,i)=>{const y=lh-(v+60)/60*lh;p+=(i?"L":"M")+(i*st).toFixed(1)+" "+y.toFixed(1)});
 let g=`<svg viewBox="0 0 ${lw} ${lh+22}" role="img" aria-label="Loudness over time">`;
 [-12,-24,-36,-48].forEach(db=>{const y=lh-(db+60)/60*lh;g+=`<line x1="0" x2="${lw}" y1="${y}" y2="${y}" stroke="rgba(245,245,245,.10)"/><text x="2" y="${y-3}" fill="#A7ABB2" font-size="11" font-family="JetBrains Mono,monospace">${db} dB</text>`});
 D.shots.forEach(x=>{const xx=x[1]/D.dur*lw;g+=`<line x1="${xx.toFixed(1)}" x2="${xx.toFixed(1)}" y1="0" y2="${lh}" stroke="#F5F5F5" stroke-opacity=".12"/>`});
 g+=`<path d="${p}" fill="none" stroke="#6E98CC" stroke-width="1.8"/>`;
 g+=`<text x="0" y="${lh+16}" fill="#A7ABB2" font-size="11" font-family="JetBrains Mono,monospace">0:00</text><text x="${lw}" y="${lh+16}" text-anchor="end" fill="#A7ABB2" font-size="11" font-family="JetBrains Mono,monospace">${fmt0(D.dur)}</text></svg>`;
 s.appendChild(el("div","chart",g+`<div class="cap">Blue line: loudness every half second. Faint blue lines: every cut.</div>`));}
s.appendChild(el("div","card",`<ul class="clean">${S.notes.map(x=>`<li>${x}</li>`).join("")}</ul>`)).style.marginTop="16px";
// ---------- moves
if(D.moves&&D.moves.length){s=sec("moves","Drone, transitions, flickers",D.movesTitle||"Every move, timestamped",(D.movesLead?D.movesLead+" ":"")+"Tap one to see that shot.");
 const mvs=el("div","moves");D.moves.forEach(m=>{const r=el("div","move jump",`<span class="t">${fmt(m[0])}</span><span class="k">${m[1]}</span><span class="d">${m[2]}</span>`);r.addEventListener("click",()=>{let i=D.shots.findIndex(x=>m[0]>=x[1]-0.05&&m[0]<x[2]);if(i<0)i=n-1;filt("all");go(i);$("#shots").scrollIntoView({behavior:"smooth"})});mvs.appendChild(r)});s.appendChild(mvs);}
// ---------- type
if(D.typeNotes){s=sec("text","Captions and typography",D.typeTitle||"How the words look",D.typeLead||"");
 s.appendChild(el("div","card",`<ul class="clean">${D.typeNotes.map(x=>`<li>${x}</li>`).join("")}</ul>${D.capsSamples?`<div class="caps">${D.capsSamples.map(x=>`<span>${x}</span>`).join("")}</div>`:""}`));}
// ---------- checklist
s=sec("checklist","Before you export","Editor checklist","Run your edit through this list before you post it for review. Checks stay on this device only.");
const ck=el("div","check");let saved={};const key="hte-"+D.slug;try{saved=JSON.parse(localStorage.getItem(key)||"{}")}catch(e){}
D.checklist.forEach((c,i)=>{const l=el("label",null,`<input type="checkbox" ${saved[i]?"checked":""}><span>${c}</span>`);l.querySelector("input").addEventListener("change",e=>{saved[i]=e.target.checked;try{localStorage.setItem(key,JSON.stringify(saved))}catch(err){}});ck.appendChild(l)});s.appendChild(ck);
// ---------- prev/next + footer
W.appendChild(el("div","pn",`${D.prev?`<a href="../${D.prev.slug}/"><small>‹ Previous · ${D.prev.num} of ${D.of}</small>${esc(D.prev.title)}</a>`:"<span></span>"}${D.next?`<a class="next" href="../${D.next.slug}/"><small>Next · ${D.next.num} of ${D.of} ›</small>${esc(D.next.title)}</a>`:"<span></span>"}`));
body.appendChild(el("footer","band",`<div class="wrap"><span>Puro Flow Media · How To Edit</span><span>Create in <b>flow</b> state</span></div>`));
// sound + active nav
const reel=$("#reel"),snd=$("#sound");if(snd)snd.addEventListener("click",()=>{reel.muted=!reel.muted;if(!reel.muted){reel.currentTime=0;reel.play().catch(()=>{})}snd.textContent=reel.muted?"🔊 Tap for sound":"Mute"});
reel.play().catch(()=>{});
if("IntersectionObserver" in window){const links=[...nav.querySelectorAll("a")];const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id))}}),{rootMargin:"-40% 0px -55% 0px"});document.querySelectorAll("main section").forEach(x=>so.observe(x))}
// kick: keep every on-screen video playing (blocked autoplay, background tabs, low power)
const _on=v=>{const r=v.getBoundingClientRect();return r.width>0&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth};
const kick=()=>{if(document.hidden)return;document.querySelectorAll("video").forEach(v=>{if(!_on(v))return;if(v.id!=="reel"||reel.muted)v.muted=true;if(!v.src&&v.dataset.src)v.src=v.dataset.src;if(v.paused)v.play().catch(()=>{})})};
document.addEventListener("visibilitychange",kick);addEventListener("pageshow",kick);addEventListener("load",kick);
["pointerdown","touchstart","keydown","wheel"].forEach(t=>addEventListener(t,kick,{passive:true}));
addEventListener("scroll",()=>{clearTimeout(kick.t);kick.t=setTimeout(kick,150)},{passive:true});
setTimeout(kick,600);setTimeout(kick,2000);
})();
