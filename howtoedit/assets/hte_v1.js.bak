(function(){
const D=window.DATA, $=s=>document.querySelector(s), el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
const fmt=t=>{t=+t;const m=Math.floor(t/60),s=(t-m*60);return m+":"+(s<10?"0":"")+s.toFixed(1)};
const fmt0=t=>{t=Math.round(+t);return Math.floor(t/60)+":"+String(t%60).padStart(2,"0")};
const TYPE={talent:"On camera",ai:"AI render",broll:"B-roll",drone:"Drone",gfx:"Graphics",logo:"Logo",stock:"Stock",split:"Split screen",guest:"Guest"};
const COL={talent:"#7FA3CF",ai:"#E7C873",broll:"#5C6470",drone:"#3E7C6B",gfx:"#9C8AC4",logo:"#F5F5F5",stock:"#8A6F5A",split:"#4F8FBF",guest:"#C98F6B"};
const W=$(".wrap"); const H=D.vert?"":" h";
document.title=D.pageTitle||document.title;
// top
W.appendChild(el("div","top",`<a href="../"><img src="../logo_w.png" alt="Puro Flow Media"></a><div class="navlinks"><a href="../">Library</a><span class="eyebrow" style="color:var(--muted)">${D.num} of ${D.of}</span></div>`));
// hero
const hero=el("div","hero"+H);
hero.innerHTML=`<div><div class="reel${H}"><video id="reel" src="clips/reel.mp4" poster="img/poster.jpg" autoplay muted loop playsinline preload="metadata"></video>${D.silent?"":`<button class="sound" id="sound" type="button">Tap for sound</button>`}</div>
<div class="reelcap">Final export, ${fmt0(D.dur)} · <a href="${D.drive}" target="_blank" rel="noopener">open the 4K original in Drive</a> · <a href="${D.pdf}" download>download the PDF</a></div></div>
<div class="info"><div><div class="eyebrow">How To Edit · Breakdown ${String(D.num).padStart(2,"0")} · ${esc(D.kind)}</div><h1>${D.headline}<br><em>${D.headline2}</em></h1><p class="lead">${D.lead}</p></div>
<div class="card"><dl class="kv"><dt>Client</dt><dd>Dr. Katherine Ahn · Aviara Aesthetic, Beverly Hills</dd><dt>Video</dt><dd>${esc(D.label)} (Video ${D.num} of ${D.of})</dd><dt>Format</dt><dd>${D.vert?"9:16 vertical":"16:9 horizontal"} · ${D.W}×${D.H} · ${D.fps} fps</dd><dt>Runtime</dt><dd>${fmt0(D.dur)}</dd><dt>Made for</dt><dd>${D.forWhat}</dd></dl></div>
<div class="stats">${D.stats.map(s=>`<div class="stat"><b>${s[0]}</b><span>${s[1]}</span></div>`).join("")}</div></div>`;
W.appendChild(hero);
const toc=[["rules","What to steal"],["structure","Structure"],["pace","Pace"],["shots","Shots"],["grade","Color"],["music","Music"],["sound","Sound"],["moves","Drone + transitions"],["text","Type"],["checklist","Checklist"]].filter(x=>x[0]!=="moves"||D.moves&&D.moves.length).filter(x=>x[0]!=="text"||D.typeNotes);
W.appendChild(el("nav","toc",toc.map(x=>`<a href="#${x[0]}">${x[1]}</a>`).join("")));
const sec=(id,eb,h2,lead)=>{const s=el("section");s.id=id;s.innerHTML=`<div class="eyebrow">${eb}</div><h2>${h2}</h2>${lead?`<p class="lead">${lead}</p>`:""}`;W.appendChild(s);return s};
// rules
let s=sec("rules","What to steal",D.rulesTitle,D.rulesLead);
s.appendChild(el("div","rules",D.rules.map(r=>`<div class="rule${r.warn?" no":""}"><h3>${r.t}</h3><p>${r.d}</p></div>`).join("")));
// structure
s=sec("structure","The structure",D.structTitle,D.structLead);
const nb=D.beats.length;
const beats=el("div","beats");beats.style.gridTemplateColumns=`repeat(${Math.min(nb,6)},minmax(0,1fr))`;
beats.innerHTML=D.beats.map(b=>`<div class="beat"><h3>${b.n}</h3><div class="t">${fmt0(b.a)}–${fmt0(b.b)}</div><p>${b.d}</p></div>`).join("");s.appendChild(beats);
const shades=["#1E3A5F","#2C527F","#3A3F47","#4A5260","#2A2D33","#355C88"];
s.appendChild(el("div","bar",D.beats.map((b,i)=>`<div style="width:${((b.b-b.a)/D.dur*100).toFixed(2)}%;background:${shades[i%shades.length]}">${b.n.toUpperCase()}</div>`).join("")));
const tk=[];for(let i=0;i<=5;i++)tk.push(`<span>${fmt0(D.dur*i/5)}</span>`);s.appendChild(el("div","ticks",tk.join("")));
const strip=el("div","strip");strip.setAttribute("role","img");strip.setAttribute("aria-label","Every shot in order, colored by type");
D.shots.forEach((x,i)=>{const sp=el("span");sp.style.flex=(x[2]-x[1]).toFixed(2);sp.style.background=COL[x[0]]||"#5C6470";sp.title=`${i+1} ${x[3]}`;strip.appendChild(sp)});s.appendChild(strip);
const used=[...new Set(D.shots.map(x=>x[0]))];
s.appendChild(el("div","legend",used.map(t=>`<span><i style="background:${COL[t]}"></i>${TYPE[t]}</span>`).join("")));
// pace
s=sec("pace","Pace",D.pace.title,D.pace.lead);
const P=D.shots.map(x=>x[2]-x[1]),mx=Math.max(...P),n=P.length,cw=1000,ch=200,bw=cw/n;
let svg=`<svg viewBox="0 0 ${cw} ${ch+24}" role="img" aria-label="Length of every shot in order">`;
[0.25,0.5,0.75,1].forEach(f=>{const y=ch-ch*f;svg+=`<line x1="0" x2="${cw}" y1="${y}" y2="${y}" stroke="#2A2D33" stroke-width="1"/><text x="2" y="${y-3}" fill="#9AA3AE" font-size="11" font-family="JetBrains Mono,monospace">${(mx*f).toFixed(1)}s</text>`});
P.forEach((p,i)=>{const h=Math.max(2,p/mx*ch);svg+=`<rect x="${(i*bw+bw*0.12).toFixed(1)}" y="${(ch-h).toFixed(1)}" width="${(bw*0.76).toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="${COL[D.shots[i][0]]||"#5C6470"}"><title>Shot ${i+1}: ${p.toFixed(1)}s, ${esc(D.shots[i][3])}</title></rect>`});
const avg=P.reduce((a,b)=>a+b,0)/n,ya=ch-avg/mx*ch;svg+=`<line x1="0" x2="${cw}" y1="${ya}" y2="${ya}" stroke="#F5F5F5" stroke-dasharray="5 5" stroke-width="1.2"/><text x="${cw-4}" y="${ya-5}" text-anchor="end" fill="#F5F5F5" font-size="12" font-family="JetBrains Mono,monospace">avg ${avg.toFixed(1)}s</text>`;
svg+=`<text x="0" y="${ch+18}" fill="#9AA3AE" font-size="11" font-family="Montserrat,sans-serif">Shot 1</text><text x="${cw}" y="${ch+18}" text-anchor="end" fill="#9AA3AE" font-size="11" font-family="Montserrat,sans-serif">Shot ${n}</text></svg>`;
const c1=el("div","chart",svg+`<div class="cap">Each bar is one shot, in order. Height is how long it stays on screen.</div>`);s.appendChild(c1);
const sorted=[...P].sort((a,b)=>a-b),med=sorted[Math.floor(n/2)];
const li=P.indexOf(mx),si=P.indexOf(Math.min(...P));
s.appendChild(el("div","kpis",`<div class="kpi"><b>${n}</b><span>shots in ${fmt0(D.dur)}</span></div><div class="kpi"><b>${avg.toFixed(1)}s</b><span>average shot (median ${med.toFixed(1)}s)</span></div><div class="kpi"><b>${Math.min(...P).toFixed(1)}s</b><span>fastest: shot ${si+1}</span></div><div class="kpi"><b>${mx.toFixed(1)}s</b><span>longest hold: shot ${li+1}</span></div>`));
if(D.pace.notes)s.appendChild(el("div","card",`<ul class="clean">${D.pace.notes.map(x=>`<li>${x}</li>`).join("")}</ul>`)).style.marginTop="16px";
// shots
s=sec("shots","Shot by shot",D.shotsTitle||`${n} shots, each one playing`,D.shotsLead||"Every clip loops the actual shot from the final edit. Camera is what the shooter did, Edit is what we did with it.");
const fl=el("div","filters");fl.setAttribute("role","group");fl.setAttribute("aria-label","Filter shots");
fl.innerHTML=`<button type="button" data-f="all" aria-pressed="true">All ${n}</button>`+used.map(t=>`<button type="button" data-f="${t}" aria-pressed="false">${TYPE[t]}</button>`).join("");s.appendChild(fl);
const grid=el("div","shots"+H);s.appendChild(grid);
const io=("IntersectionObserver" in window)?new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){if(!v.src)v.src=v.dataset.src;v.play().catch(()=>{})}else v.pause()}),{rootMargin:"200px"}):null;
D.shots.forEach((x,i)=>{const [type,a,b,title,vo,cam,edit,why]=x,nn=String(i+1).padStart(2,"0");
 const c=el("article","shot");c.dataset.type=type;
 c.innerHTML=`<div class="media"><video muted loop playsinline preload="none" poster="img/s${nn}.jpg" data-src="clips/shot${nn}.mp4" aria-label="Shot ${nn}: ${esc(title)}"></video><span class="tag ${type==="ai"?"ai":""}">${TYPE[type]}</span></div><div class="body"><div class="head"><span class="n">${nn}</span><span class="tc">${fmt(a)}–${fmt(b)} · ${(b-a).toFixed(1)}s</span></div><h3>${title}</h3>${vo?`<p class="vo">"${vo}"</p>`:""}${cam?`<p><b>Camera</b>${cam}</p>`:""}${edit?`<p><b>Edit</b>${edit}</p>`:""}${why?`<p><b>Why it works</b>${why}</p>`:""}</div>`;
 grid.appendChild(c);const v=c.querySelector("video");if(io)io.observe(v);else v.src=v.dataset.src;});
fl.querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>{fl.querySelectorAll("button").forEach(z=>z.setAttribute("aria-pressed",z===btn));const f=btn.dataset.f;grid.querySelectorAll(".shot").forEach(c=>c.hidden=!(f==="all"||c.dataset.type===f))}));
// grade
s=sec("grade","Color grade",D.grade.title,D.grade.lead);
const meter=(l,v,max)=>`<div class="meter"><span>${l}</span><span class="track"><span class="fill" style="width:${Math.max(2,Math.min(100,Math.round(v/max*100)))}%;display:block"></span></span><span class="v">${(+v).toFixed(2)}</span></div>`;
const looks=el("div","looks");if(D.grade.looks.length<3)looks.style.gridTemplateColumns=`repeat(${D.grade.looks.length},minmax(0,1fr))`;
D.grade.looks.forEach(L=>{looks.appendChild(el("div","card look"+H,`<img src="img/${L.img}.jpg" alt="${esc(L.name)} example frame" loading="lazy"><h3>${L.name}</h3><div class="where">${L.where}</div><div class="sw">${L.sw.map(c=>`<span style="background:${c}" title="${c}"></span>`).join("")}</div>${meter("Brightness",L.bright,1)}${meter("Warmth",Math.max(0,L.warm),0.3)}${meter("Saturation",L.sat,0.6)}<ul style="margin-top:12px">${L.tips.map(t=>`<li>${t}</li>`).join("")}</ul>`))});
s.appendChild(looks);
if(D.grade.notes)s.appendChild(el("div","card",`<ul class="clean">${D.grade.notes.map(x=>`<li>${x}</li>`).join("")}</ul>`)).style.marginTop="16px";
// music
const M=D.music;s=sec("music","Music choice",M.title,M.lead);
s.appendChild(el("div","kpis",(M.kpis||[]).map(k=>`<div class="kpi${k[2]?" flag":""}"><b>${k[0]}</b><span>${k[1]}</span></div>`).join("")));
s.appendChild(el("div","card",`<ul class="clean">${M.notes.map(x=>`<li>${x}</li>`).join("")}</ul>`)).style.marginTop="16px";
// sound
const S=D.sound;s=sec("sound","Sound engineering",S.title,S.lead);
s.appendChild(el("div","kpis",S.kpis.map(k=>`<div class="kpi${k[2]?" flag":""}"><b>${k[0]}</b><span>${k[1]}</span></div>`).join("")));
if(S.rms&&S.rms.length){const r=S.rms.map(v=>Math.max(-60,v)),lw=1000,lh=150,st=lw/(r.length-1||1);
 let p="";r.forEach((v,i)=>{const y=lh-(v+60)/60*lh;p+=(i?"L":"M")+(i*st).toFixed(1)+" "+y.toFixed(1)});
 let g=`<svg viewBox="0 0 ${lw} ${lh+22}" role="img" aria-label="Loudness over time">`;
 [-12,-24,-36,-48].forEach(db=>{const y=lh-(db+60)/60*lh;g+=`<line x1="0" x2="${lw}" y1="${y}" y2="${y}" stroke="#2A2D33"/><text x="2" y="${y-3}" fill="#9AA3AE" font-size="11" font-family="JetBrains Mono,monospace">${db} dB</text>`});
 (D.shots||[]).forEach(x=>{const xx=x[1]/D.dur*lw;g+=`<line x1="${xx.toFixed(1)}" x2="${xx.toFixed(1)}" y1="0" y2="${lh}" stroke="#7FA3CF" stroke-opacity=".18"/>`});
 g+=`<path d="${p}" fill="none" stroke="#E7C873" stroke-width="1.8"/>`;
 g+=`<text x="0" y="${lh+16}" fill="#9AA3AE" font-size="11" font-family="JetBrains Mono,monospace">0:00</text><text x="${lw}" y="${lh+16}" text-anchor="end" fill="#9AA3AE" font-size="11" font-family="JetBrains Mono,monospace">${fmt0(D.dur)}</text></svg>`;
 s.appendChild(el("div","chart",g+`<div class="cap">Gold line: loudness every half second. Faint blue lines: every cut.</div>`));}
s.appendChild(el("div","card",`<ul class="clean">${S.notes.map(x=>`<li>${x}</li>`).join("")}</ul>`)).style.marginTop="16px";
// moves
if(D.moves&&D.moves.length){s=sec("moves","Drone, transitions, flickers",D.movesTitle||"Every move, timestamped",D.movesLead||"");
 s.appendChild(el("div","moves",D.moves.map(m=>`<div class="move"><span class="t">${fmt(m[0])}</span><span class="k">${m[1]}</span><span class="d">${m[2]}</span></div>`).join("")));}
// type
if(D.typeNotes){s=sec("text","Captions and typography",D.typeTitle||"How the words look",D.typeLead||"");
 const cd=el("div","card",`<ul class="clean">${D.typeNotes.map(x=>`<li>${x}</li>`).join("")}</ul>${D.capsSamples?`<div class="caps">${D.capsSamples.map(x=>`<span>${x}</span>`).join("")}</div>`:""}`);s.appendChild(cd);}
// checklist
s=sec("checklist","Before you export","Editor checklist","Run your edit through this list before you post it for review. Checks stay on this device only.");
const ck=el("div","check");let saved={};const key="hte-"+D.slug;try{saved=JSON.parse(localStorage.getItem(key)||"{}")}catch(e){}
D.checklist.forEach((c,i)=>{const l=el("label",null,`<input type="checkbox" ${saved[i]?"checked":""}><span>${c}</span>`);l.querySelector("input").addEventListener("change",e=>{saved[i]=e.target.checked;try{localStorage.setItem(key,JSON.stringify(saved))}catch(err){}});ck.appendChild(l)});s.appendChild(ck);
// prev/next
W.appendChild(el("div","pn",`${D.prev?`<a href="../${D.prev.slug}/"><small>Previous · ${D.prev.num} of ${D.of}</small>${esc(D.prev.title)}</a>`:"<span></span>"}${D.next?`<a class="next" href="../${D.next.slug}/"><small>Next · ${D.next.num} of ${D.of}</small>${esc(D.next.title)}</a>`:"<span></span>"}`));
W.appendChild(el("footer",null,`<span>Puro Flow Media · How To Edit</span><span>Breakdown ${String(D.num).padStart(2,"0")} · Create in flow state</span>`));
const reel=$("#reel"),snd=$("#sound");if(snd)snd.addEventListener("click",()=>{reel.muted=!reel.muted;if(!reel.muted){reel.currentTime=0;reel.play().catch(()=>{})}snd.textContent=reel.muted?"Tap for sound":"Mute"});
})();
