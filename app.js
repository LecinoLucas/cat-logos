const $=s=>document.querySelector(s);
const app=$("#app");
const CLOUD='<svg class="cloud" viewBox="0 0 64 40" aria-hidden="true"><path fill="#6db3f0" d="M16 38a12 12 0 0 1-2-23.8A15 15 0 0 1 43 11a13 13 0 0 1 6 27z"/></svg>';
const WAI='<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.8-4.5-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.4-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.3z"/></svg>';
const BACK='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
const GRID='<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/></svg>';
const CLOSE='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 5l14 14M19 5L5 19"/></svg>';
const ATD=(window.ATENDENTES||[]).filter(a=>a&&a.numero);
const wa=t=>`https://wa.me/${(ATD[0]&&ATD[0].numero)||window.WHATSAPP||""}?text=${encodeURIComponent(t)}`;
// Janelinha "Com quem você quer falar?": aparece ao tocar em qualquer link do WhatsApp (quando há 2 ou mais atendentes)
const wam=document.createElement("div");wam.id="wam";wam.hidden=true;
wam.innerHTML='<div class="wam-scrim" data-x></div><div class="wam-box" role="dialog" aria-modal="true" aria-labelledby="wam-t"><button class="wam-x" data-x aria-label="Fechar"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 5l14 14M19 5L5 19"/></svg></button><h2 id="wam-t">Com quem você quer falar?</h2><p>Escolha quem vai te atender no WhatsApp</p><div class="wam-list"></div></div>';
document.body.appendChild(wam);
const closeWam=()=>{wam.classList.remove("in");setTimeout(()=>{wam.hidden=true},220)};
wam.addEventListener("click",e=>{if(e.target.closest("[data-x]"))closeWam()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!wam.hidden)closeWam()});
function openWam(text){
  wam.querySelector(".wam-list").innerHTML=ATD.map(a=>{
    const ini=esc(a.nome.charAt(0).toUpperCase());
    const av=a.foto?`<img src="${esc(a.foto)}" alt="" loading="lazy">`:`<span>${ini}</span>`;
    return `<a class="wam-opt" data-direct target="_blank" rel="noopener" href="https://wa.me/${esc(a.numero)}?text=${encodeURIComponent(text)}"><i class="wam-av">${av}</i><b>${esc(a.nome)}</b><span class="wam-go">${WAI}</span></a>`}).join("");
  wam.hidden=false;requestAnimationFrame(()=>wam.classList.add("in"));
}
document.addEventListener("click",e=>{
  if(e.target.closest&&e.target.closest(".chip2,.mc"))return;
  const a=e.target.closest&&e.target.closest('a[href^="https://wa.me/"]');
  if(!a)return;
  if(a.hasAttribute("data-direct")){setTimeout(closeWam,150);return}
  if(ATD.length<2)return;
  e.preventDefault();const q=new URL(a.href).searchParams.get("text")||"";openWam(q);
},true);
const waProd=p=>wa(`Olá! Vi no catálogo ${p.remote||p.loja?"da Pioneira":"da Black Friday"} e tenho interesse em: ${p.wa||p.name}`);
const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
// Logo oficial: nuvem em cima, nome e "COLCHÕES" embaixo (nome editável em STORE.marca)
const LOGO=(c="")=>`<span class="logo ${c}">${CLOUD}<b>${esc((window.STORE&&STORE.marca)||"apioneira")}</b><small>COLCHÕES</small></span>`;
const brand=`<a class="brand" href="#/" aria-label="Início">${LOGO()}</a>`;
const fmt=t=>esc(t).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>");
const COND="Até 10x no cartão · Condições especiais no Pix";
const CARD=p=>!p.url&&!p.video&&window.CARDS&&window.CARDS[p.img];
const imgFull=p=>p.url||(CARD(p)?`img/ofertas/c/${p.img}`:`img/ofertas/${p.img}`);
const money=v=>{const i=String(v).lastIndexOf(",");return i<0?`<em>${esc(v)}</em>`:`<em>${esc(v.slice(0,i))}</em><sup>${esc(v.slice(i))}</sup>`};
const cardHTML=c=>{const o=c.o,tag=c.tag||"no Pix";
  const pick=o.length>1?`<span class="mcs">${o.map((x,k)=>`<span class="mc${k?"":" on"}" role="button" tabindex="0" data-k="${k}"><b>${esc(x.m)}</b><small>${esc(x.d)}</small></span>`).join("")}</span>`
    :`<span class="sz"><b>${esc(o[0].m)}</b>${o[0].d?`<small>${esc(o[0].d)}</small>`:""}</span>`;
  const pr=o.map((x,k)=>`<span class="pr"${k?" hidden":""} data-k="${k}"><span class="val"><small>R$</small>${money(x.p)}</span><span class="rt"><span class="tl"><u class="tg">${esc(tag)}</u>${x.de?`<s>De R$ ${esc(x.de)}</s>`:""}</span>${x.x?`<span class="px">${/^\d+x R\$/.test(x.x)?"ou ":""}${esc(x.x)}</span>`:""}</span></span>`).join("");
  return `<span class="fcard"><i class="eb">${esc(c.eb)}</i><b class="nm">${esc(c.n)}</b>${pick}${pr}${c.obs?`<i class="ob">${esc(c.obs)}</i>`:""}</span>`};
const waSel=(p,sl)=>{const c=CARD(p),k=sl&&+sl.dataset.k||0;return c&&c.o.length>1?wa(`Olá! Vi no catálogo da Black Friday e tenho interesse em: ${p.wa||p.name} — medida ${c.o[k].m}`):waProd(p)};
const imgThumb=p=>p.thumb||(p.url?p.url:`img/ofertas/t/${p.img}`);
const catThumb=c=>c.coverUrl||(c.cover?`img/ofertas/t/${c.cover}`:"");
const MEDIDAS=[["solteiro","Solteiro","0,88 × 1,88"],["solteirao","Solteirão","1,08 × 1,98"],["casal","Casal","1,38 × 1,88"],["queen","Queen","1,58 × 1,98"],["king","King","1,93 × 2,03"]];
const medOf=p=>{if(p.med)return p.med;const t=(String(p.name||"")+" "+String(p.leg||"")).replace(/king koil/ig,"");const r=[];
  if(/solteir[ãa]o/i.test(t))r.push("solteirao");
  if(/solteiro/i.test(t.replace(/solteir[ãa]o/ig,"")))r.push("solteiro");
  if(/casal/i.test(t))r.push("casal");if(/queen/i.test(t))r.push("queen");if(/\bking\b/i.test(t))r.push("king");return r};
const visCat=c=>!!c&&(!STORE.soBlack||!!c.black);
const catVis=k=>visCat(CATEGORIES.find(c=>c.key===k));
const medList=m=>PRODUCTS.filter(p=>catVis(p.cat)&&medOf(p).includes(m));
const vitOf=k=>VITRINE.find(v=>v.key===k&&v.cats);
const catOf=k=>{if(k==="destaques")return{key:k,name:"Mais procurados"};const v=vitOf(k);if(v)return{key:k,name:v.name};if(k.indexOf("medida-")===0){const m=MEDIDAS.find(x=>x[0]===k.slice(7));return m?{key:k,name:m[1]}:undefined}const c=CATEGORIES.find(c=>c.key===k);return visCat(c)?c:undefined};
const inCat=k=>{if(k==="destaques")return PRODUCTS.filter(p=>p.dest&&catVis(p.cat));const v=vitOf(k);if(v)return PRODUCTS.filter(p=>v.cats.includes(p.cat)&&catVis(p.cat));return k.indexOf("medida-")===0?medList(k.slice(7)):(visCat(CATEGORIES.find(c=>c.key===k))?PRODUCTS.filter(p=>p.cat===k||(p.tags&&p.tags.includes(k))):[])};

// Rolagem vertical em tela cheia. opts.closing → última tela com convite; opts.start → índice inicial.
function feedHTML(list,opts={}){
  const catKey=list[0]&&list[0].cat;
  const idxOf=(cat,img)=>{const l=PRODUCTS.filter(x=>x.cat===cat||(x.tags&&x.tags.includes(cat)));return l.findIndex(x=>x.img===img)};
  const cap=p=>{const t=String(p.leg||p.name||"").replace(/^Vídeo: /,"");
    const ch=p.chips?`<span class="chips2">${p.chips.map(c=>{const k=idxOf(p.cat,c.img);return k<0?"":`<span class="chip2" role="link" tabindex="0" data-go="#/c/${p.cat}/${k}">${esc(c.t)}</span>`}).join("")}</span>`:"";
    const bk=p.back?`<span class="chips2"><span class="chip2 bk" role="link" tabindex="0" data-go="#/c/${p.cat}/0">‹ ${esc(p.back)}</span></span>`:"";
    if(p.preco&&!p.keepcap&&!p.chips&&!p.back)return "";
    return `<span class="cap"><b>${esc(t)}</b>${p.preco?`<em>${esc(p.preco)}</em>`:""}${ch}${bk}</span>`};
  const slides=list.map((p,i)=>{
    const st=p.ratio?` style="aspect-ratio:${p.ratio.replace("/"," / ")}"`:"";
    const pc=CARD(p),nc=pc?" pc nocap":(cap(p)?"":" nocap");
    return p.video
      ?`<div class="slide vid${nc}" data-i="${i}" aria-label="${esc(p.name)}"><span class="frame"${st}><video src="img/ofertas/${p.video}" poster="img/ofertas/${p.img}" muted loop playsinline preload="none"></video><button class="snd" aria-label="Ligar ou desligar o som"></button></span>${cap(p)}</div>`
      :`<a class="slide${nc}" data-i="${i}" data-href="${waProd(p)}" target="_blank" rel="noopener" aria-label="${esc(p.name)}"><span class="frame"${st}>${p.selo?`<span class="selo"><i>${esc(p.selo)}</i>${p.selo2?`<small>${esc(p.selo2)}</small>`:""}</span>`:""}<img class="fg" ${i<2?"":'loading="lazy"'} src="${imgFull(p)}" alt="${esc(p.name)}" style="object-position:${p.pos||(pc?"8% 40%":"50% 50%")}"></span>${pc?cardHTML(pc):cap(p)}</a>`}).join("");
  const ARW=d=>`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
  const car=`<section class="card car"><div class="track">${slides}</div><button class="nav prev" type="button" aria-label="Oferta anterior">${ARW("M5 15l7-7 7 7")}</button><button class="nav next" type="button" aria-label="Próxima oferta">${ARW("M5 9l7 7 7-7")}</button></section>`;
  const dm=(STORE.destaque||"").match(/^(.*?)(\d+)\s*%\s*(.*)$/);
  const big=dm?`<p class="big">${esc(dm[1].trim())} <span class="num" data-to="${dm[2]}">${dm[2]}</span><small>%</small> <i>${esc(dm[3])}</i></p>`:(STORE.destaque?`<p class="big">${esc(STORE.destaque)}</p>`:"");
  const sp=(STORE.selo||"").split(" ");
  const seal=sp.length>=2?`<div class="seal"><small>${esc(sp[0])}</small><b>${esc(sp[1])}</b><small>${esc(sp.slice(2).join(" "))}</small></div>`:"";
  const puff=(l,t,dx,dl)=>`<i class="puff" style="left:${l}%;top:${t}%;--dx:${dx}px;animation-delay:${dl}s">${CLOUD}</i>`;
  const intro=opts.intro?`<section class="card intro light v3"><div class="rig"><div class="swing"><i class="rope"></i><div class="tagbox tagscroll"><img class="tagimg" src="img/etiqueta-pendurada.webp" alt="Black Friday Pioneira">${puff(64,6,34,2.4)}${puff(76,16,50,3.9)}${puff(58,2,-18,5.4)}</div></div></div><div class="copy">${STORE.periodo?`<b class="when">${esc(STORE.periodo)}</b>`:""}${big}<span class="hair"></span>${STORE.subtitulo?`<p class="sub">${fmt(STORE.subtitulo)}</p>`:""}</div><div class="dock"><button class="cue" type="button" aria-label="Escolher o que procura"><span>Deslize para escolher</span><i class="ring"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></i></button></div></section>`:"";
  const end=opts.closing?`<section class="card end"><div class="endbox">${LOGO("big")}<h3>Gostou?</h3><p>Veja todas as categorias<br>ou fale direto com a gente.</p><a class="ghost" href="#/categorias">Ver categorias</a><a class="ghost" href="#/loja">Conheça a Pioneira</a><a class="solid" target="_blank" rel="noopener" href="${wa("Olá! Vi o catálogo da Black Friday e gostaria de saber mais.")}">${WAI}Falar no WhatsApp</a></div></section>`:"";
  if(opts.home){
    const vc=VITRINE.map(v=>{const n=inCat(v.key).length;return n?`<a class="vc" href="#/c/${v.key}"><img src="img/ofertas/t/${v.cover}" alt="" style="object-position:${v.pos||"50% 35%"}"><span><b>${esc(v.name)}</b><small>${n} ${n===1?"oferta":"ofertas"}</small></span></a>`:""}).join("");
    const mt=MEDIDAS.filter(m=>medList(m[0]).length).map(m=>{const n=medList(m[0]).length;return `<a class="mt" href="#/c/medida-${m[0]}"><b>${m[1]}</b><small>${m[2]} m</small><i>${n} ${n===1?"oferta":"ofertas"}</i></a>`}).join("");
    const bc=CATEGORIES.filter(c=>c.group==="Marcas"&&visCat(c)&&inCat(c.key).length).map(c=>`<a class="mchip" href="#/c/${c.key}">${esc(c.name)}</a>`).join("");
    const ds=inCat("destaques").map((p,i)=>`<a class="mp" href="#/c/destaques/${i}" aria-label="${esc(p.leg||p.name)}"><img loading="lazy" src="${imgThumb(p)}" alt="" style="object-position:${p.pos||"50% 50%"}">${p.video?'<i class="pl"></i>':""}</a>`).join("");
    const choose=`<section class="card choose"><h2>Qual a medida da sua cama?</h2><div class="mtiles">${mt}</div><h2 class="h2b">Ou escolha o produto</h2><div class="vgrid">${vc}</div>${bc?`<p class="lab">Por marca</p><div class="mchips">${bc}</div>`:""}${ds?`<p class="lab">Mais procurados</p><div class="strip">${ds}</div>`:""}<div class="cta"><a class="dockwa" target="_blank" rel="noopener" href="${wa("Olá! Vi o catálogo da Black Friday e gostaria de saber mais.")}">${WAI}<span>Falar no WhatsApp</span></a><a class="lnk" href="#/loja">Conheça a Pioneira</a></div></section>`;
    return `<div class="feed home">${intro}${choose}</div>`;
  }
  return `<div class="feed">${intro}${car}${end}</div><div class="dock2 off"><i class="prog" aria-hidden="true"><b></b></i><div class="count" aria-hidden="true"></div><div class="btns"><a class="dk-cat" href="#/categorias">${GRID}<span>Categorias</span></a><a class="fab" target="_blank" rel="noopener" aria-label="Falar no WhatsApp"></a></div></div>`;
}
function wireIntro(feed){
  const introEl=feed.querySelector(".intro");
  if(introEl){
    const num=introEl.querySelector(".num");
    if(num){const to=+num.dataset.to,reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
      if(!reduce){num.textContent="0";const t0=performance.now()+1250,dur=1700;
        const step=now=>{const k=Math.max(0,Math.min(1,(now-t0)/dur));num.textContent=Math.round(to*(1-Math.pow(1-k,3)));if(k<1&&document.body.contains(num))requestAnimationFrame(step)};
        requestAnimationFrame(step)}}
    let ticking=false;
    feed.addEventListener("scroll",()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{
      const p=Math.max(0,Math.min(1,feed.scrollTop/(feed.clientHeight*.42)));
      introEl.style.setProperty("--p",p.toFixed(3));ticking=false})},{passive:true});
    // inclinação: giroscópio do celular (Android) ou mouse no computador
    const ts=introEl.querySelector(".tagscroll");let tx=0,ty=0,cx=0,cy=0,base=null,raf=0;
    const clamp=(v,m)=>Math.max(-m,Math.min(m,v));
    const loop=()=>{cx+=(tx-cx)*.12;cy+=(ty-cy)*.12;
      ts.style.setProperty("--ry",cx.toFixed(2)+"deg");ts.style.setProperty("--rx",cy.toFixed(2)+"deg");
      raf=(Math.abs(tx-cx)>.05||Math.abs(ty-cy)>.05)?requestAnimationFrame(loop):0};
    const kick=()=>{if(!raf)raf=requestAnimationFrame(loop)};
    window.addEventListener("deviceorientation",e=>{
      if(e.gamma==null||e.beta==null)return;
      if(!base)base={g:e.gamma,b:e.beta};
      tx=clamp((e.gamma-base.g)*.5,12);ty=clamp(-(e.beta-base.b)*.4,10);kick()},{passive:true});
    introEl.addEventListener("pointermove",e=>{
      if(e.pointerType!=="mouse")return;const r=introEl.getBoundingClientRect();
      tx=clamp(((e.clientX-r.left)/r.width-.5)*28,14);ty=clamp(-((e.clientY-r.top)/r.height-.5)*20,10);kick()});
  }
  const go=feed.querySelector(".cue");
  if(go)go.onclick=()=>{
    const top=feed.clientHeight;
    feed.style.scrollSnapType="none";
    try{feed.scrollTo({top,behavior:"smooth"})}catch(e){feed.scrollTop=top}
    setTimeout(()=>{feed.scrollTop=top;feed.style.scrollSnapType=""},750);
  };
}
function wireFeed(list,start=0,hasIntro=false){
  const feed=$(".feed"),count=$(".count"),fab=$(".fab"),dock=$(".dock2"),view=feed.closest(".view");
  const secs=[...feed.querySelectorAll(":scope>.card")];
  const car=feed.querySelector(".car"),track=car.querySelector(".track"),slides=[...track.querySelectorAll(".slide")];
  const prev=car.querySelector(".prev"),next=car.querySelector(".next");
  const SPK='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z"/>',SPK_ON=SPK+'<path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',SPK_OFF=SPK+'<path d="M17 9l5 6M22 9l-5 6"/></svg>';
  let sound=false,cur=-1,carOn=false,swiped=false,first=true;
  const vids=slides.map(c=>c.querySelector("video"));
  const paint=()=>slides.forEach(c=>{const b=c.querySelector(".snd");if(b)b.innerHTML=sound?SPK_ON:SPK_OFF});
  slides.forEach((c,j)=>{const v=vids[j];if(!v)return;
    c.querySelector(".snd").onclick=e=>{e.stopPropagation();sound=!sound;vids.forEach(x=>x&&(x.muted=!sound));paint()};
    c.querySelector(".frame").onclick=()=>{if(j!==cur)return;v.paused?v.play().catch(()=>{}):v.pause()}});
  paint();
  slides.forEach(c=>{const im=c.querySelector(".fg");if(!im)return;const ok=()=>im.classList.add("ld");im.complete?ok():im.onload=ok});
  const goTo=(k,smooth=true)=>{k=Math.max(0,Math.min(slides.length-1,k));const s=slides[k];
    track.scrollTo({top:s.offsetTop,behavior:smooth?"smooth":"auto"})};
  const ARR='<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',DN='<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  const sync=()=>{
    dock.classList.toggle("off",!carOn);
    if(cur<0)return;
    slides.forEach((c,j)=>{c.classList.toggle("act",j===cur);
      if(c.dataset.href){j===cur?c.setAttribute("href",c.dataset.href):c.removeAttribute("href")}});
    vids.forEach((v,j)=>{if(!v)return;if(j===cur&&carOn){v.muted=!sound;v.play().catch(()=>{})}else v.pause()});
    const last=cur>=slides.length-1;
    const pb=dock.querySelector(".prog b");if(pb)pb.style.width=((cur+1)/slides.length*100)+"%";
    count.innerHTML=`<span class="n">${cur+1} / ${slides.length}</span><span class="hint dn${swiped&&!last?" gone":""}">${last?(hasIntro?"Role para ver mais":"Última foto"):"Deslize para baixo"}${last&&!hasIntro?"":DN}</span>`;
    fab.href=slides[cur].dataset.href||waProd(list[cur]);fab.innerHTML=WAI+`<span>${esc(STORE.botao||"WhatsApp")}</span>`;
    prev.classList.toggle("dis",cur===0);next.classList.toggle("dis",last&&true);
  };
  let tk=false;
  const onScroll=()=>{if(tk)return;tk=true;requestAnimationFrame(()=>{tk=false;
    const mid=track.scrollTop;let best=0,bd=1e9;
    slides.forEach((s,j)=>{const d=Math.abs(s.offsetTop-mid);if(d<bd){bd=d;best=j}});
    if(best!==cur){if(cur>=0&&!first)swiped=true;first=false;cur=best;sync()}})};
  track.addEventListener("scroll",onScroll,{passive:true});
  prev.onclick=()=>goTo(cur-1);next.onclick=()=>{if(cur<slides.length-1)goTo(cur+1);else if(hasIntro){const t=feed.scrollTop+feed.clientHeight;feed.scrollTo({top:t,behavior:"smooth"})}};
  track.addEventListener("click",e=>{const c=e.target.closest(".chip2");if(c){e.preventDefault();e.stopPropagation();location.hash=c.dataset.go}},true);
  const setMed=(m,k)=>{const sl=m.closest(".slide"),p=list[+sl.dataset.i];sl.dataset.k=k;
    sl.querySelectorAll(".mc").forEach(x=>x.classList.toggle("on",x===m));
    sl.querySelectorAll(".pr").forEach(x=>x.hidden=x.dataset.k!==String(k));
    sl.dataset.href=waSel(p,sl);if(sl.hasAttribute("href"))sl.setAttribute("href",sl.dataset.href);if(+sl.dataset.i===cur)fab.href=sl.dataset.href};
  track.addEventListener("click",e=>{const m=e.target.closest(".mc");if(!m)return;e.preventDefault();e.stopPropagation();
    if(+m.closest(".slide").dataset.i!==cur){goTo(+m.closest(".slide").dataset.i);return}setMed(m,m.dataset.k)},true);
  track.addEventListener("click",e=>{const s=e.target.closest(".slide");if(!s)return;const j=+s.dataset.i;if(j!==cur){e.preventDefault();goTo(j)}},true);
  document.addEventListener("keydown",function kd(e){if(!document.body.contains(track)){document.removeEventListener("keydown",kd);return}
    if(e.key==="ArrowDown")goTo(cur+1);else if(e.key==="ArrowUp")goTo(cur-1)});
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.target===car){carOn=e.isIntersecting&&e.intersectionRatio>=.6;sync()}
    if(hasIntro&&e.target===secs[0])view.classList.toggle("onlight",e.isIntersecting&&e.intersectionRatio>=.5);
  }),{root:feed,threshold:[0,.5,.6,.8,1]});
  secs.forEach(c=>io.observe(c));
  requestAnimationFrame(()=>{goTo(Math.max(0,start),false);cur=Math.max(0,start);sync();onScroll()});
  if(!hasIntro){feed.scrollTop=0;carOn=true}
}

const ROUTES={
  home(toChoose){
    app.innerHTML=`<div class="view dark onlight">${feedHTML([],{home:true,intro:true})}<header class="over">${brand}</header></div>`;
    const feed=$(".feed");wireIntro(feed);
    if(toChoose)requestAnimationFrame(()=>{feed.scrollTop=feed.clientHeight});
  },
  categorias(){ROUTES.home(true)},
  loja(){
    const S=STORE,rows=[];
    if(S.endereco)rows.push(["Endereço",esc(S.endereco)]);
    if(S.horario)rows.push(["Horário",esc(S.horario)]);
    if(S.entrega)rows.push(["Entrega",esc(S.entrega)]);
    const map=S.endereco?(S.mapa||`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(S.endereco)}`):"";
    app.innerHTML=`<div class="view light scroll"><header class="bar"><a class="ic" href="#/categorias" aria-label="Voltar">${BACK}</a><h1>A Pioneira</h1><span></span></header><div class="about">${LOGO("big dk")}<p class="lead">Colchões, box baú, tricama e bicama com atendimento direto pelo WhatsApp.</p>${S.validade?`<p class="valid">Ofertas de Black Friday válidas até ${esc(S.validade)}</p>`:""}<dl class="perks"><div><dt>Pagamento</dt><dd>${COND}</dd></div><div><dt>Marcas</dt><dd>Sealy · Simmons · King Koil</dd></div><div><dt>Atendimento</dt><dd>Tire dúvidas e escolha o seu pelo WhatsApp</dd></div>${rows.map(([a,b])=>`<div><dt>${a}</dt><dd>${b}</dd></div>`).join("")}</dl><div class="acts"><a class="solid dk" target="_blank" rel="noopener" href="${wa("Olá! Vi o catálogo da Black Friday e gostaria de saber mais.")}">${WAI}Falar no WhatsApp</a>${map?`<a class="ghost dk" target="_blank" rel="noopener" href="${esc(map)}">Ver no mapa</a>`:""}${S.telefone?`<a class="ghost dk" href="tel:+${esc(S.telefone)}">Ligar</a>`:""}${S.instagram?`<a class="ghost dk" target="_blank" rel="noopener" href="https://instagram.com/${esc(S.instagram)}">Instagram @${esc(S.instagram)}</a>`:""}</div><p class="ver">Versão ${window.BUILD||"-"}</p></div></div>`;
  },
  cat(k){
    const c=catOf(k);if(!c)return location.hash="#/";
    if(!inCat(k).length){app.innerHTML=`<div class="view light scroll"><header class="bar"><a class="ic" href="#/categorias" aria-label="Voltar">${BACK}</a><h1>${c.name}</h1><span></span></header><div class="about">${LOGO("big dk")}<p class="lead">As fotos de ${esc(c.name)} chegam em breve.</p><p class="valid">Enquanto isso, fale com a gente</p><div class="acts"><a class="solid dk" target="_blank" rel="noopener" href="${wa(`Olá! Gostaria de ver as opções de ${c.name}.`)}">${WAI}Perguntar sobre ${esc(c.name)}</a><a class="ghost dk" href="#/categorias">Voltar às categorias</a></div></div></div>`;return}
    const L=inCat(k),pres=MEDIDAS.filter(m=>L.some(p=>medOf(p).includes(m[0])));
    const mbar=(pres.length>1&&k.indexOf("medida-")!==0)?`<div class="mbar" role="group" aria-label="Filtrar por medida"><button type="button" class="mf on" data-m="">Todas</button>${pres.map(m=>`<button type="button" class="mf" data-m="${m[0]}">${m[1]}</button>`).join("")}</div>`:"";
    app.innerHTML=`<div class="view light scroll"><header class="bar"><a class="ic" href="#/categorias" aria-label="Voltar">${BACK}</a><h1>${c.name}</h1><span></span></header>${mbar}<div class="grid">${inCat(k).map((p,i)=>`<a class="tile${p.video?" isvid":""}" data-med="${medOf(p).join(" ")}" href="#/c/${k}/${i}"><img loading="lazy" src="${imgThumb(p)}" alt="${esc(p.name)}" style="object-position:${p.pos||"50% 50%"}"></a>`).join("")}</div></div>`;
    const bar=app.querySelector(".mbar");if(bar)bar.addEventListener("click",e=>{const b=e.target.closest(".mf");if(!b)return;
      bar.querySelectorAll(".mf").forEach(x=>x.classList.toggle("on",x===b));const m=b.dataset.m;
      app.querySelectorAll(".tile").forEach(t=>{t.hidden=!!m&&!(t.dataset.med||"").split(" ").includes(m)})});
  },
  viewer(k,n){
    const c=catOf(k),l=inCat(k);if(!c||!l.length)return location.hash="#/";
    app.innerHTML=`<div class="view dark${l.some(p=>CARD(p)&&CARD(p).full)?" imm":""}">${feedHTML(l)}<header class="over slim"><a class="pill ib" href="#/c/${k}" aria-label="Voltar para ${esc(c.name)}">${BACK}</a>${brand}<i class="sp"></i></header></div>`;
    wireFeed(l,Math.min(+n||0,l.length-1));
  }
};
function route(){
  const h=location.hash.replace(/^#\/?/,"").split("/");
  if(h[0]==="categorias")ROUTES.categorias();
  else if(h[0]==="loja")ROUTES.loja();
  else if(h[0]==="c"&&h[2]!==undefined)ROUTES.viewer(h[1],h[2]);
  else if(h[0]==="c")ROUTES.cat(h[1]);
  else ROUTES.home();
  const sc=$(".scroll");if(sc)sc.scrollTop=0;
}
// Conteúdo enviado pela área restrita (/admin): categorias e fotos vêm do Supabase, se configurado em config.js
async function loadRemote(){
  const S=window.SUPABASE;if(!S||!S.url||!S.key)return;
  const ctl=new AbortController(),t=setTimeout(()=>ctl.abort(),6000),h={apikey:S.key,Authorization:"Bearer "+S.key};
  try{
    const get=q=>fetch(S.url+"/rest/v1/"+q,{headers:h,signal:ctl.signal}).then(r=>r.ok?r.json():[]);
    const [cs,is]=await Promise.all([get("categorias?select=*&ativo=eq.true&order=ordem.asc"),get("itens?select=*&ativo=eq.true&order=ordem.asc,created_at.desc")]);
    cs.forEach(c=>{const ex=CATEGORIES.find(x=>x.key===c.slug);if(ex)ex.name=c.nome;else CATEGORIES.push({group:c.grupo,key:c.slug,name:c.nome})});
    is.forEach(i=>{const c=CATEGORIES.find(x=>x.key===i.categoria);PRODUCTS.push({cat:i.categoria,top:!!i.destaque,url:i.url,thumb:i.thumb||i.url,name:i.nome||(c?c.name:"Produto"),remote:true})});
    CATEGORIES.forEach(c=>{if(!c.cover&&!c.coverUrl){const f=is.find(i=>i.categoria===c.key);if(f)c.coverUrl=f.thumb||f.url}});
  }catch(e){}finally{clearTimeout(t)}
}
addEventListener("hashchange",route);
Promise.race([loadRemote(),new Promise(r=>setTimeout(r,1200))]).then(route);
// abertura curta, só na primeira vez da sessão
const sp=$("#splash");let seen=false;try{seen=sessionStorage.getItem("sp")}catch(e){}
if(seen)sp.remove();else{try{sessionStorage.setItem("sp","1")}catch(e){}setTimeout(()=>{sp.classList.add("out");setTimeout(()=>sp.remove(),600)},1000)}
