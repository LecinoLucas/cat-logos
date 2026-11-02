const brl=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL",minimumFractionDigits:0});
const $=id=>document.getElementById(id);
const wa=t=>`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`;
const CATS=[["all","Tudo"],["box-bau","Box Baú"],["colchao","Colchões"],["tricama","Tricama"],["box","Box"]];
const LABEL={"box-bau":"Box Baú",colchao:"Colchão",tricama:"Tricama",box:"Box"};
let cat="all";
function render(){
  $("tabs").innerHTML=CATS.map(([k,n])=>`<button data-c="${k}" class="${k===cat?"on":""}">${n}</button>`).join("");
  $("tabs").querySelectorAll("button").forEach(b=>b.onclick=()=>{cat=b.dataset.c;render();$("feed").scrollTo({top:0})});
  $("feed").innerHTML=PRODUCTS.filter(p=>cat==="all"||p.cat===cat).map(p=>{
    const imgs=[p.img,...(p.gallery||[])];
    const price=p.price?`<div class="price"><span class="from">${brl(p.from)}</span><span class="now">${brl(p.price)}</span></div><div class="cond">${p.pix} · ${p.inst}</div>`:`<div class="ask">Consulte valores</div>`;
    return `<section class="card"><div class="photo">${imgs.map(i=>`<div class="slide"><img class="bg" src="img/${i}" alt=""><img class="fg" loading="lazy" src="img/${i}" alt="${p.name}"></div>`).join("")}</div><div class="dots">${imgs.length>1?imgs.map((_,k)=>`<i class="${k?"":"on"}"></i>`).join(""):""}</div><div class="info"><div class="eyebrow">${LABEL[p.cat]}</div><h2>${p.name.replace(/^(Box Baú|Colchão) /,"")}</h2><div class="size">${p.size}</div>${price}<a class="btn" target="_blank" rel="noopener" href="${wa(`Olá! Tenho interesse em: ${p.name} (${p.size})`)}">Pedir no WhatsApp</a></div></section>`}).join("");
  document.querySelectorAll(".photo").forEach(ph=>{const d=ph.nextElementSibling.children;if(d.length)ph.onscroll=()=>{const k=Math.round(ph.scrollLeft/ph.clientWidth);[...d].forEach((x,j)=>x.classList.toggle("on",j===k))}});
}
render();
