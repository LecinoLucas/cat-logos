const brl=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const $=id=>document.getElementById(id);
const wa=t=>`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`;
$("waTop").href=wa("Olá! Vim pelo catálogo da Pioneira Colchões.");
const CATS=[["all","Tudo"],["box-bau","Box Baú"],["colchao","Colchões"],["tricama","Tricama"],["box","Box"]];
let cat="all",list=[],idx=0;
const photos=()=>PRODUCTS.filter(p=>cat==="all"||p.cat===cat).flatMap(p=>[p.img,...(p.gallery||[])].map((img,k)=>({img,p,main:k===0})));
function render(){
  $("chips").innerHTML=CATS.map(([k,n])=>`<button data-c="${k}" class="${k===cat?"on":""}">${n}</button>`).join("");
  $("chips").querySelectorAll("button").forEach(b=>b.onclick=()=>{cat=b.dataset.c;render()});
  list=photos();
  $("grid").innerHTML=list.map((s,i)=>`<figure data-i="${i}"><img loading="lazy" src="img/${s.img}" alt="${s.p.name}">${s.main?`<figcaption>${s.p.name}</figcaption>`:""}</figure>`).join("");
  $("grid").querySelectorAll("figure").forEach(f=>f.onclick=()=>show(+f.dataset.i));
}
function show(i){
  idx=(i+list.length)%list.length;const s=list[idx],p=s.p;
  $("v").innerHTML=`<div class="stage"><button class="x" aria-label="Fechar">×</button><img src="img/${s.img}" alt="${p.name}"><button class="pv" aria-label="Anterior"></button><button class="nx" aria-label="Próxima"></button></div><div class="info"><div><b>${p.name}</b><small>${p.size}</small>${p.price?`<span class="p">${brl(p.price)}</span> <small style="display:inline">no Pix</small>`:""}</div><a class="wa" target="_blank" rel="noopener" href="${wa(`Olá! Tenho interesse em: ${p.name} (${p.size})`)}">Pedir</a></div>`;
  $("v").hidden=false;document.body.style.overflow="hidden";
  $("v").querySelector(".x").onclick=close;$("v").querySelector(".pv").onclick=()=>show(idx-1);$("v").querySelector(".nx").onclick=()=>show(idx+1);
}
function close(){$("v").hidden=true;document.body.style.overflow=""}
document.addEventListener("keydown",e=>{if($("v").hidden)return;if(e.key==="Escape")close();if(e.key==="ArrowRight")show(idx+1);if(e.key==="ArrowLeft")show(idx-1)});
render();
