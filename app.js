const brl=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const grid=document.getElementById("grid"),lb=document.getElementById("lb");
let cat="all";
function wa(p){const t=encodeURIComponent(`Olá! Tenho interesse em: ${p.name} (${p.size})`);return `https://wa.me/${WHATSAPP}?text=${t}`}
function render(){
  grid.innerHTML="";
  PRODUCTS.filter(p=>cat==="all"||p.cat===cat).forEach(p=>{
    const c=document.createElement("article");c.className="card";
    const price=p.price?`<div class="from">De ${brl(p.from)}</div><div class="price">${brl(p.price)}</div><div class="meta">${p.pix} · ${p.inst}</div>`:`<div class="price sm">Consulte</div>`;
    c.innerHTML=`<img loading="lazy" src="img/${p.img}" alt="${p.name}"><div class="body"><h3>${p.name}</h3><p class="size">${p.size}</p>${price}<p class="note">${p.note}</p><a class="btn" target="_blank" rel="noopener" href="${wa(p)}">Pedir no WhatsApp</a></div>`;
    c.querySelector("img").onclick=()=>open(p);
    grid.appendChild(c);
  });
}
function open(p){lb.innerHTML=`<button aria-label="Fechar">×</button><div>${[p.img,...(p.gallery||[])].map(i=>`<img src="img/${i}" alt="${p.name}">`).join("")}</div>`;lb.hidden=false;lb.onclick=e=>{if(e.target!==lb.querySelector("div")&&e.target.tagName!=="IMG")lb.hidden=true}}
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tabs button").forEach(x=>x.classList.remove("on"));b.classList.add("on");cat=b.dataset.cat;render()});
render();
