const $=s=>document.querySelector(s);
const app=$("#app");
const CLOUD='<svg class="cloud" viewBox="0 0 64 40" aria-hidden="true"><path fill="#6db3f0" d="M16 38a12 12 0 0 1-2-23.8A15 15 0 0 1 43 11a13 13 0 0 1 6 27z"/></svg>';
const WAI='<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.8-4.5-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.4-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.3z"/></svg>';
const BACK='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
const GRID='<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/></svg>';
const CLOSE='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 5l14 14M19 5L5 19"/></svg>';
const wa=t=>`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`;
const waProd=p=>wa(`Olá! Vi no catálogo da Black Friday e tenho interesse em: ${p.name}`);
const brand=`<a class="brand" href="#/">${CLOUD}<b>pioneira</b></a>`;
const catOf=k=>CATEGORIES.find(c=>c.key===k);
const inCat=k=>PRODUCTS.filter(p=>p.cat===k);

// Rolagem vertical em tela cheia. opts.closing → última tela com convite; opts.start → índice inicial.
function feedHTML(list,opts={}){
  const cards=list.map((p,i)=>`<a class="card" target="_blank" rel="noopener" href="${waProd(p)}" aria-label="${p.name} — pedir no WhatsApp"><img class="bg" src="img/ofertas/t/${p.img}" alt=""><img class="fg" ${i<2?"":'loading="lazy"'} src="img/ofertas/${p.img}" alt="${p.name}"></a>`).join("");
  const end=opts.closing?`<section class="card end"><div class="endbox">${CLOUD}<h3>Gostou?</h3><p>Veja todas as categorias<br>ou fale direto com a gente.</p><a class="ghost" href="#/categorias">Ver categorias</a><a class="solid" target="_blank" rel="noopener" href="${wa("Olá! Vi o catálogo da Black Friday e gostaria de saber mais.")}">${WAI}Falar no WhatsApp</a></div></section>`:"";
  return `<div class="feed">${cards}${end}</div><div class="count" aria-hidden="true"></div><a class="fab" target="_blank" rel="noopener" aria-label="Pedir no WhatsApp"></a>`;
}
function wireFeed(list,start=0){
  const feed=$(".feed"),count=$(".count"),fab=$(".fab"),cards=[...feed.querySelectorAll(".card")];
  const set=i=>{
    cards.forEach((c,j)=>c.classList.toggle("act",j===i));
    const isEnd=i>=list.length;
    count.style.opacity=fab.style.opacity=isEnd?0:1;fab.style.pointerEvents=isEnd?"none":"auto";
    if(!isEnd){count.textContent=`${i+1} / ${list.length}`;fab.href=waProd(list[i]);fab.innerHTML=WAI}
  };
  cards.forEach(c=>{const im=c.querySelector(".fg");if(!im)return;const ok=()=>im.classList.add("ld");im.complete?ok():im.onload=ok});
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)set(cards.indexOf(e.target))}),{root:feed,threshold:.6});
  cards.forEach(c=>io.observe(c));
  feed.scrollTop=start*feed.clientHeight;set(start);
}

const ROUTES={
  home(){
    const list=PRODUCTS.filter(p=>p.top);const l=list.length?list:PRODUCTS;
    app.innerHTML=`<div class="view dark">${feedHTML(l,{closing:true})}<header class="over">${brand}<a class="pill" href="#/categorias">${GRID}Categorias</a></header></div>`;
    wireFeed(l);
  },
  categorias(){
    app.innerHTML=`<div class="view light scroll"><header class="bar"><span></span><h1>Categorias</h1><a class="ic" href="#/" aria-label="Fechar">${CLOSE}</a></header><div class="cats">${CATEGORIES.map(c=>`<a class="cat" href="#/c/${c.key}"><img src="img/ofertas/t/${c.cover}" alt="" style="object-position:${c.pos||"top"}"><span><b>${c.name}</b><small>${inCat(c.key).length} ${inCat(c.key).length===1?"oferta":"ofertas"}</small></span></a>`).join("")}</div></div>`;
  },
  cat(k){
    const c=catOf(k);if(!c)return location.hash="#/";
    app.innerHTML=`<div class="view light scroll"><header class="bar"><a class="ic" href="#/categorias" aria-label="Voltar">${BACK}</a><h1>${c.name}</h1><span></span></header><div class="grid">${inCat(k).map((p,i)=>`<a class="tile" href="#/c/${k}/${i}"><img class="bg" loading="lazy" src="img/ofertas/t/${p.img}" alt=""><img class="fg" loading="lazy" src="img/ofertas/t/${p.img}" alt="${p.name}"></a>`).join("")}</div></div>`;
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
  else if(h[0]==="c"&&h[2]!==undefined)ROUTES.viewer(h[1],h[2]);
  else if(h[0]==="c")ROUTES.cat(h[1]);
  else ROUTES.home();
  const sc=$(".scroll");if(sc)sc.scrollTop=0;
}
addEventListener("hashchange",route);route();
// abertura curta, só na primeira vez da sessão
const sp=$("#splash");let seen=false;try{seen=sessionStorage.getItem("sp")}catch(e){}
if(seen)sp.remove();else{try{sessionStorage.setItem("sp","1")}catch(e){}setTimeout(()=>{sp.classList.add("out");setTimeout(()=>sp.remove(),600)},1000)}
