const brl=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL",minimumFractionDigits:0});
const $=id=>document.getElementById(id);
const wa=t=>`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`;
const CATS=[["all","Promoções"],["box-bau","Box Baú"],["colchao","Colchões"],["tricama","Tricama"],["box","Box"]];
const LABEL={"box-bau":"Box Baú",colchao:"Colchão",tricama:"Tricama",box:"Box"};
const off=p=>p.price?Math.round((1-p.price/p.from)*100):0;
let cat="all";

function renderGrid(){
  $("tabs").innerHTML=CATS.map(([k,n])=>`<button data-c="${k}" class="${k===cat?"on":""}">${n}</button>`).join("");
  $("tabs").querySelectorAll("button").forEach(b=>b.onclick=()=>{cat=b.dataset.c;renderGrid();window.scrollTo({top:0})});
  const list=PRODUCTS.map((p,i)=>({p,i})).filter(({p})=>cat==="all"||p.cat===cat)
    .sort((a,b)=>off(b.p)-off(a.p));
  $("grid").innerHTML=list.map(({p,i})=>`<button class="tile" data-i="${i}" aria-label="${p.name}"><img loading="lazy" src="img/${p.img}" alt="${p.name}">${p.price?`<span class="badge">-${off(p)}%</span>`:""}</button>`).join("");
  $("grid").querySelectorAll(".tile").forEach(t=>t.onclick=()=>open(+t.dataset.i));
}

function open(i){
  const p=PRODUCTS[i],imgs=[p.img,...(p.gallery||[])];
  $("s-gal").innerHTML=imgs.map(f=>`<div class="slide"><img src="img/${f}" alt="${p.name}"></div>`).join("");
  $("s-gal").scrollLeft=0;
  $("s-dots").innerHTML=imgs.length>1?imgs.map((_,k)=>`<i class="${k?"":"on"}"></i>`).join(""):"";
  $("s-cat").textContent=LABEL[p.cat];
  $("s-name").textContent=p.name;
  $("s-size").textContent=p.size;
  $("s-price").innerHTML=p.price
    ?`<div class="price"><span class="from">${brl(p.from)}</span><span class="now">${brl(p.price)}</span></div><div class="cond">${p.pix} · ${p.inst}</div>`
    :`<div class="ask">Consulte valores</div>`;
  $("s-note").textContent=p.note||"";
  $("s-wa").href=wa(`Olá! Vi a promoção no catálogo e tenho interesse em: ${p.name} (${p.size})`);
  $("sheet").hidden=false;document.body.classList.add("lock");
  requestAnimationFrame(()=>$("sheet").classList.add("in"));
}
function close(){
  $("sheet").classList.remove("in");document.body.classList.remove("lock");
  setTimeout(()=>{$("sheet").hidden=true},250);
}
document.querySelectorAll("[data-close]").forEach(e=>e.onclick=close);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("sheet").hidden)close()});
$("s-gal").onscroll=e=>{const g=e.target,k=Math.round(g.scrollLeft/g.clientWidth);[...$("s-dots").children].forEach((x,j)=>x.classList.toggle("on",j===k))};
renderGrid();
