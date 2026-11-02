const brl=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const $=id=>document.getElementById(id);
const wa=(txt)=>`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`;
$("waTop").href=wa("Olá! Vim pelo catálogo da Pioneira Colchões.");
const CATS=[["all","Todos"],["bf","Black Friday"],["box-bau","Box Baú"],["colchao","Colchões"],["tricama","Tricama"],["box","Box"]];
const inCat=(p,c)=>c==="all"||p.cat===c||(c==="bf"&&p.price);
let cat="all";
function renderChips(){$("chips").innerHTML=CATS.map(([k,n])=>`<button data-c="${k}" class="${k===cat?"on":""}">${n}</button>`).join("");
  $("chips").querySelectorAll("button").forEach(b=>b.onclick=()=>{cat=b.dataset.c;renderChips();renderGrid()})}
function renderGrid(){
  $("title").textContent=CATS.find(c=>c[0]===cat)[1]==="Todos"?"Todos os produtos":CATS.find(c=>c[0]===cat)[1];
  $("grid").innerHTML=PRODUCTS.filter(p=>inCat(p,cat)).map((p,i)=>{
    const pr=p.price?`<div class="from">De ${brl(p.from)}</div><div class="price">${brl(p.price)}</div><div class="meta">${p.pix} · ${p.inst}</div>`:`<div class="price sm">Consulte valores</div>`;
    return `<article class="card"><img loading="lazy" data-i="${PRODUCTS.indexOf(p)}" src="img/${p.img}" alt="${p.name}"><div class="body"><h3>${p.name}</h3><p class="size">${p.size}</p>${pr}<p class="note">${p.note}</p><a class="btn" target="_blank" rel="noopener" href="${wa(`Olá! Tenho interesse em: ${p.name} (${p.size})`)}">Pedir no WhatsApp</a></div></article>`}).join("");
  $("grid").querySelectorAll("img").forEach(im=>im.onclick=()=>zoom(PRODUCTS[im.dataset.i]));
}
function zoom(p){const lb=$("lb");lb.innerHTML=`<button aria-label="Fechar">×</button><div>${[p.img,...(p.gallery||[])].map(i=>`<img src="img/${i}" alt="${p.name}">`).join("")}</div>`;lb.hidden=false;lb.onclick=e=>{if(e.target.tagName!=="IMG")lb.hidden=true}}
// Stories: cada categoria abre uma sequência de fotos em tela cheia
const STORIES=[["bf","Black Friday","box-queen.jpg"],["box-bau","Box Baú","box-solteiro.jpg"],["colchao","Colchões","sealy-queen.jpg"],["tricama","Tricama","tricama-foto1.jpg"],["box","Box","box-foto2.jpg"]];
function slides(c){const out=[];PRODUCTS.filter(p=>inCat(p,c)).forEach(p=>{out.push({img:p.img,p});(p.gallery||[]).forEach(g=>out.push({img:g,p}))});return out}
let S=null,timer=null;
function story(c){S={c,list:slides(c),i:0};showSlide()}
function showSlide(){
  clearTimeout(timer);const sv=$("sv"),{list,i,c}=S,s=list[i];
  sv.innerHTML=`<div class="bars">${list.map((_,k)=>`<i class="${k<i?"done":k===i?"cur":""}"><b></b></i>`).join("")}</div><div class="head"><span>${STORIES.find(x=>x[0]===c)[1]}</span><button class="x" aria-label="Fechar">×</button></div><div class="stage"><img src="img/${s.img}" alt="${s.p.name}"><button class="zl" aria-label="Anterior"></button><button class="zr" aria-label="Próxima"></button></div><div class="foot"><div><b>${s.p.name}</b><br>${s.p.price?brl(s.p.price)+" no Pix":"Consulte valores"}</div><a class="btn" target="_blank" rel="noopener" href="${wa(`Olá! Tenho interesse em: ${s.p.name} (${s.p.size})`)}">WhatsApp</a></div>`;
  sv.hidden=false;document.body.style.overflow="hidden";
  sv.querySelector(".x").onclick=close;sv.querySelector(".zl").onclick=()=>go(-1);sv.querySelector(".zr").onclick=()=>go(1);
  timer=setTimeout(()=>go(1),5000);
}
function go(d){S.i+=d;if(S.i<0)S.i=0;if(S.i>=S.list.length)return close();showSlide()}
function close(){clearTimeout(timer);$("sv").hidden=true;document.body.style.overflow="";S=null}
document.addEventListener("keydown",e=>{if(!S)return;if(e.key==="Escape")close();if(e.key==="ArrowRight")go(1);if(e.key==="ArrowLeft")go(-1)});
$("stories").innerHTML=STORIES.map(([c,n,img])=>`<button data-c="${c}"><span class="ring"><img src="img/${img}" alt=""></span>${n}</button>`).join("");
$("stories").querySelectorAll("button").forEach(b=>b.onclick=()=>story(b.dataset.c));
renderChips();renderGrid();
