const $=s=>document.querySelector(s);
const app=$("#app");
const CLOUD='<svg class="cloud" viewBox="0 0 64 40" aria-hidden="true"><path fill="#6db3f0" d="M16 38a12 12 0 0 1-2-23.8A15 15 0 0 1 43 11a13 13 0 0 1 6 27z"/></svg>';
const WAI='<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.8-4.5-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.4-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.3z"/></svg>';
const BACK='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
const GRID='<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/></svg>';
const CLOSE='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 5l14 14M19 5L5 19"/></svg>';
const wa=t=>`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`;
const waProd=p=>wa(`Olá! Vi no catálogo da Black Friday e tenho interesse em: ${p.wa||p.name}`);
const brand=`<a class="brand" href="#/">${CLOUD}<b>pioneira</b></a>`;
const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const COND="Até 10x no cartão · Condições especiais no Pix";
const catOf=k=>CATEGORIES.find(c=>c.key===k);
const inCat=k=>PRODUCTS.filter(p=>p.cat===k);

// Rolagem vertical em tela cheia. opts.closing → última tela com convite; opts.start → índice inicial.
function feedHTML(list,opts={}){
  const cards=list.map((p,i)=>p.video?`<div class="card vid" aria-label="${p.name}"><span class="frame"><video src="img/ofertas/${p.video}" poster="img/ofertas/${p.img}" muted loop playsinline preload="none"></video><button class="snd" aria-label="Ligar ou desligar o som"></button></span></div>`:`<a class="card" target="_blank" rel="noopener" href="${waProd(p)}" aria-label="${p.name} — pedir no WhatsApp"><span class="frame"><img class="fg" ${i<2?"":'loading="lazy"'} src="img/ofertas/${p.img}" alt="${p.name}" style="object-position:${p.pos||"50% 50%"}"></span></a>`).join("");
  const dest=STORE.destaque?STORE.destaque.replace(/^(\S+)\s+(.+)$/,"$1 <i>$2</i>"):"";
  const intro=opts.intro?`<section class="card intro"><div class="endbox">${CLOUD}<small>PIONEIRA COLCHÕES</small><h3>Black Friday</h3><span class="hair"></span>${STORE.periodo?`<b class="per">${esc(STORE.periodo)}</b>`:""}${dest?`<p class="big">${dest}</p>`:""}${STORE.subtitulo?`<p class="sub">${esc(STORE.subtitulo)}</p>`:""}<span class="cond">${COND}</span><button class="go" type="button">Navegue pelas ofertas <span aria-hidden="true">↓</span></button><a class="ghost" target="_blank" rel="noopener" href="${wa("Olá! Vi o catálogo da Black Friday e gostaria de saber mais.")}">${WAI}Falar no WhatsApp</a></div></section>`:"";
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
  const set=i=>{
    cards.forEach((c,j)=>c.classList.toggle("act",j===i));
    vids.forEach((v,j)=>{if(!v)return;if(j===i){v.muted=!sound;v.play().catch(()=>{})}else{v.pause()}});
    const k=i-off,isEnd=k>=list.length||k<0;
    count.style.opacity=fab.style.opacity=isEnd?0:1;fab.style.pointerEvents=isEnd?"none":"auto";
    if(!isEnd){count.textContent=`${k+1} / ${list.length}`;fab.href=waProd(list[k]);fab.innerHTML=WAI+"<span>Pedir no WhatsApp</span>"}
  };
  cards.forEach(c=>{const im=c.querySelector(".fg");if(!im)return;const ok=()=>im.classList.add("ld");im.complete?ok():im.onload=ok});
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)set(cards.indexOf(e.target))}),{root:feed,threshold:.6});
  cards.forEach(c=>io.observe(c));
  const go=feed.querySelector(".go");
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
    app.innerHTML=`<div class="view light scroll"><header class="bar"><a class="ic" href="#/categorias" aria-label="Voltar">${BACK}</a><h1>A Pioneira</h1><span></span></header><div class="about">${CLOUD}<p class="lead">Colchões, box baú, tricama e bicama com atendimento direto pelo WhatsApp.</p>${S.validade?`<p class="valid">Ofertas de Black Friday válidas até ${esc(S.validade)}</p>`:""}<dl class="perks"><div><dt>Pagamento</dt><dd>${COND}</dd></div><div><dt>Marcas</dt><dd>Sealy · Simmons · King Koil</dd></div><div><dt>Atendimento</dt><dd>Tire dúvidas e escolha o seu pelo WhatsApp</dd></div>${rows.map(([a,b])=>`<div><dt>${a}</dt><dd>${b}</dd></div>`).join("")}</dl><div class="acts"><a class="solid dk" target="_blank" rel="noopener" href="${wa("Olá! Vi o catálogo da Black Friday e gostaria de saber mais.")}">${WAI}Falar no WhatsApp</a>${map?`<a class="ghost dk" target="_blank" rel="noopener" href="${esc(map)}">Ver no mapa</a>`:""}${S.telefone?`<a class="ghost dk" href="tel:+${esc(S.telefone)}">Ligar</a>`:""}${S.instagram?`<a class="ghost dk" target="_blank" rel="noopener" href="https://instagram.com/${esc(S.instagram)}">Instagram @${esc(S.instagram)}</a>`:""}</div></div></div>`;
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
