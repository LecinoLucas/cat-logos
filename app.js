const $=id=>document.getElementById(id);
const wa=p=>`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Vi no catálogo da Black Friday e tenho interesse em: ${p.name}`)}`;
const ICON='<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.8-4.5-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.4-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.3z"/></svg>';
let cat="all";
function render(){
  $("tabs").innerHTML=CATEGORIES.map(([k,n])=>`<button data-c="${k}" class="${k===cat?"on":""}">${n}</button>`).join("");
  $("tabs").querySelectorAll("button").forEach(b=>b.onclick=()=>{cat=b.dataset.c;render();$("feed").scrollTo({top:0})});
  $("feed").innerHTML=PRODUCTS.filter(p=>cat==="all"||p.cat===cat).map(p=>
    `<a class="card" target="_blank" rel="noopener" href="${wa(p)}" aria-label="${p.name} — pedir no WhatsApp"><img class="bg" src="img/ofertas/${p.img}" alt=""><img class="fg" loading="lazy" src="img/ofertas/${p.img}" alt="${p.name}"><span class="wa">${ICON}</span></a>`).join("");
}
render();
