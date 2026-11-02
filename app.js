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
  const a=e.target.closest&&e.target.closest('a[href^="https://wa.me/"]');
  if(!a)return;
  if(a.hasAttribute("data-direct")){setTimeout(closeWam,150);return}
  if(ATD.length<2)return;
  e.preventDefault();const q=new URL(a.href).searchParams.get("text")||"";openWam(q);
},true);
const waProd=p=>wa(`Olá! Vi no catálogo da Black Friday e tenho interesse em: ${p.wa||p.name}`);
const brand=`<a class="brand" href="#/">${CLOUD}<b>pioneira</b></a>`;
const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fmt=t=>esc(t).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>");
const COND="Até 10x no cartão · Condições especiais no Pix";
const catOf=k=>CATEGORIES.find(c=>c.key===k);
const inCat=k=>PRODUCTS.filter(p=>p.cat===k);

// Rolagem vertical em tela cheia. opts.closing → última tela com convite; opts.start → índice inicial.
function feedHTML(list,opts={}){
  const cards=list.map((p,i)=>p.video?`<div class="card vid" aria-label="${p.name}"><span class="frame"><video src="img/ofertas/${p.video}" poster="img/ofertas/${p.img}" muted loop playsinline preload="none"></video><button class="snd" aria-label="Ligar ou desligar o som"></button></span></div>`:`<a class="card" target="_blank" rel="noopener" href="${waProd(p)}" aria-label="${p.name} — pedir no WhatsApp"><span class="frame"><img class="fg" ${i<2?"":'loading="lazy"'} src="img/ofertas/${p.img}" alt="${p.name}" style="object-position:${p.pos||"50% 50%"}"></span></a>`).join("");
  const gancho=STORE.gancho?STORE.gancho.replace(/^(\S+)\s+(.+)$/,"$1 <i>$2</i>"):"";
  const sp=(STORE.selo||"").split(" ");
  const seal=sp.length>=2?`<div class="seal"><small>${esc(sp[0])}</small><b>${esc(sp[1])}</b><small>${esc(sp.slice(2).join(" "))}</small></div>`:"";
  const intro=opts.intro?`<section class="card intro light v2"><div class="stage"><div class="tagwrap"><div class="tagscroll"><div class="tag3d"><img class="tagimg" src="img/etiqueta-3d.webp" alt="Black Friday Pioneira">${seal}</div></div></div>${STORE.periodo?`<div class="when">${esc(STORE.periodo).replace(/^(.+?) de (.+)$/i,"<b>$1</b><span>de $2</span>")}</div>`:""}</div><div class="copy">${gancho?`<h3>${gancho}</h3>`:""}${STORE.subtitulo?`<p class="sub">${esc(STORE.subtitulo.charAt(0).toUpperCase()+STORE.subtitulo.slice(1))}</p>`:""}${STORE.frase?`<p class="corner">${fmt(STORE.frase)}</p>`:""}</div><div class="dock"><button class="cue" type="button" aria-label="Ver as ofertas"><span>Deslize para ver as ofertas</span><i class="ring"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></i></button></div></section>`:"";
  const end=opts.closing?`<section class="card end"><div class="endbox">${CLOUD}<h3>Gostou?</h3><p>Veja todas as categorias<br>ou fale direto com a gente.</p><a class="ghost" href="#/categorias">Ver categorias</a><a class="ghost" href="#/loja">Conheça a Pioneira</a><a class="solid" target="_blank" rel="noopener" href="${wa("Olá! Vi o catálogo da Black Friday e gostaria de saber mais.")}">${WAI}Falar no WhatsApp</a></div></section>`:"";
  return `<div class="feed">${intro}${cards}${end}</div><div class="count" aria-hidden="true"></div><a class="fab" target="_blank" rel="noopener" aria-label="Pedir no WhatsApp"></a>`;
}
function wireFeed(list,start=0,off=0){
  const feed=$(".feed"),count=$(".count"),fab=$(".fab"),cards=[...feed.querySelectorAll(".card")];
  const SPK='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z"/>',SPK_ON=SPK+'<path d="M16.500 8.500a5 5 0 0 1 0 7M19 6a8.500 8.500 0 0 1 0 12"/></svg>',SPK_OFF=SPK+'<path d="M17 9l5 6M22 9l-5 6"/></svg>';
  let sound=false;
  const vids=cards.map(c=>c.querySelector("video"));
  const paint=()=>cards.forEach((c,j)=>{const b=c.querySelector(".snd");if(b)b.innerHTML=sound?SPK_ON:SPK_OFF});
  cards.forEach((c,j)=>{const v=vids[j];if(!v)return;
    c.querySelector(".snd").onclick=e=>{e.stopPropagation();sound=!sound;vids.forEach(x=>x&&(x.muted=!sound));paint()};
    c.querySelector(".frame").onclick=()=>{v.paused?v.play().catch(()=>{}):v.pause()}});
  paint();
  const view=feed.closest(".view");
  const set=i=>{
    cards.forEach((c,j)=>c.classList.toggle("act",j===i));
    view.classList.toggle("onlight",!!cards[i]&&cards[i].classList.contains("light"));
    vids.forEach((v,j)=>{if(!v)return;if(j===i){v.muted=!sound;v.play().catch(()=>{})}else{v.pause()}});
    const k=i-off,isEnd=k>=list.length,isIntro=k<0,hide=isEnd||isIntro;
    count.style.opacity=(isEnd||isIntro)?0:1;
    fab.style.opacity=hide?0:1;fab.style.pointerEvents=hide?"none":"auto";
    if(isIntro){fab.href=wa("Olá! Vi o catálogo da Black Friday e gostaria de saber mais.");fab.innerHTML=WAI}
    else if(!isEnd){count.textContent=`${k+1} / ${list.length}`;fab.href=waProd(list[k]);fab.innerHTML=WAI+`<span>${esc(STORE.botao||"Falar no WhatsApp")}</span>`}
    fab.classList.toggle("lbl",!isIntro&&!isEnd)
  };
  cards.forEach(c=>{const im=c.querySelector(".fg");if(!im)return;const ok=()=>im.classList.add("ld");im.complete?ok():im.onload=ok});
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)set(cards.indexOf(e.target))}),{root:feed,threshold:.6});
  cards.forEach(c=>io.observe(c));
  const introEl=feed.querySelector(".intro");
  if(introEl){
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
  feed.scrollTop=(start+off)*feed.clientHeight;set(start+off);
}

const ROUTES={
  home(){
    const list=PRODUCTS.filter(p=>p.top);const l=list.length?list:PRODUCTS;
    app.innerHTML=`<div class="view dark">${feedHTML(l,{closing:true,intro:true})}<header class="over">${brand}<a class="pill" href="#/categorias">${GRID}Categorias</a></header></div>`;
    wireFeed(l,-1,1);
  },
  categorias(){
    app.innerHTML=`<div class="view light scroll"><header class="bar"><span></span><h1>Categorias</h1><a class="ic" href="#/" aria-label="Fechar">${CLOSE}</a></header><div class="cats">${CATEGORIES.map(c=>`<a class="cat" href="#/c/${c.key}"><img src="img/ofertas/t/${c.cover}" alt="" style="object-position:${c.pos||"top"}"><span><b>${c.name}</b><small>${inCat(c.key).length} ${inCat(c.key).length===1?"oferta":"ofertas"}</small></span></a>`).join("")}</div><a class="aboutlink" href="#/loja">A Pioneira<small>Pagamento, contato e atendimento</small></a></div>`;
  },
  loja(){
    const S=STORE,rows=[];
    if(S.endereco)rows.push(["Endereço",esc(S.endereco)]);
    if(S.horario)rows.push(["Horário",esc(S.horario)]);
    if(S.entrega)rows.push(["Entrega",esc(S.entrega)]);
    const map=S.endereco?(S.mapa||`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(S.endereco)}`):"";
    app.innerHTML=`<div class="view light scroll"><header class="bar"><a class="ic" href="#/categorias" aria-label="Voltar">${BACK}</a><h1>A Pioneira</h1><span></span></header><div class="about">${CLOUD}<p class="lead">Colchões, box baú, tricama e bicama com atendimento direto pelo WhatsApp.</p>${S.validade?`<p class="valid">Ofertas de Black Friday válidas até ${esc(S.validade)}</p>`:""}<dl class="perks"><div><dt>Pagamento</dt><dd>${COND}</dd></div><div><dt>Marcas</dt><dd>Sealy · Simmons · King Koil</dd></div><div><dt>Atendimento</dt><dd>Tire dúvidas e escolha o seu pelo WhatsApp</dd></div>${rows.map(([a,b])=>`<div><dt>${a}</dt><dd>${b}</dd></div>`).join("")}</dl><div class="acts"><a class="solid dk" target="_blank" rel="noopener" href="${wa("Olá! Vi o catálogo da Black Friday e gostaria de saber mais.")}">${WAI}Falar no WhatsApp</a>${map?`<a class="ghost dk" target="_blank" rel="noopener" href="${esc(map)}">Ver no mapa</a>`:""}${S.telefone?`<a class="ghost dk" href="tel:+${esc(S.telefone)}">Ligar</a>`:""}${S.instagram?`<a class="ghost dk" target="_blank" rel="noopener" href="https://instagram.com/${esc(S.instagram)}">Instagram @${esc(S.instagram)}</a>`:""}</div><p class="ver">Versão ${window.BUILD||"-"}</p></div></div>`;
  },
  cat(k){
    const c=catOf(k);if(!c)return location.hash="#/";
    app.innerHTML=`<div class="view light scroll"><header class="bar"><a class="ic" href="#/categorias" aria-label="Voltar">${BACK}</a><h1>${c.name}</h1><span></span></header><div class="grid">${inCat(k).map((p,i)=>`<a class="tile${p.video?" isvid":""}" href="#/c/${k}/${i}"><img loading="lazy" src="img/ofertas/t/${p.img}" alt="${p.name}" style="object-position:${p.pos||"50% 50%"}"></a>`).join("")}</div></div>`;
  },
  viewer(k,n){
    const c=catOf(k),l=inCat(k);if(!c||!l.length)return location.hash="#/";
    app.innerHTML=`<div class="view dark">${feedHTML(l)}<header class="over"><a class="pill" href="#/c/${k}">${BACK}${c.name}</a>${brand}</header></div>`;
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
addEventListener("hashchange",route);route();
// abertura curta, só na primeira vez da sessão
const sp=$("#splash");let seen=false;try{seen=sessionStorage.getItem("sp")}catch(e){}
if(seen)sp.remove();else{try{sessionStorage.setItem("sp","1")}catch(e){}setTimeout(()=>{sp.classList.add("out");setTimeout(()=>sp.remove(),600)},1000)}
