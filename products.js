// ── Como editar ─────────────────────────────────────────────
// Nova oferta: ponha a foto (formato em pé, 9:16) em img/ofertas/ e uma miniatura em img/ofertas/t/, e inclua uma linha abaixo.
// top:true → aparece na rolagem da tela inicial (na ordem desta lista).
// cat      → categoria (precisa existir em CATEGORIES).
// VÍDEO: {cat:"box-bau",top:true,video:"nome.mp4",img:"nome.jpg",name:"Vídeo: ...",wa:"Box Baú"}
//         → o vídeo vai em img/ofertas/ (mp4, até ~20 MB) e a imagem de capa (img) em img/ofertas/ + miniatura em img/ofertas/t/.
// pos      → (opcional) enquadramento da foto, ex.: "50% 30%".
window.WHATSAPP = "5562981310293"; // DDI + DDD + número
// ── Dados da loja ──  (campos vazios ficam escondidos no site)
window.STORE = {
  instagram: "pioneiracolchoes",   // sem o @
  endereco: "",                    // ex.: "Av. Exemplo, 123 - Centro, Cidade - UF"
  mapa: "",                        // (opcional) link do Google Maps; se vazio, é gerado pelo endereço
  horario: "",                     // ex.: "Seg a Sex 8h–18h · Sáb 8h–13h"
  entrega: "",                     // ex.: "Entregamos em Goiânia e região"
  telefone: "",                    // ex.: "5562999999999" (DDI+DDD+número) para o botão Ligar
  validade: "30/11",               // aparece na página "A Pioneira": "Ofertas de Black Friday válidas até 30/11"
  // Textos da capa de abertura (deixe "" para esconder uma linha)
  periodo: "01 a 30 de novembro",
  destaque: "Até 60% off",
  subtitulo: "em todos os nossos produtos. Só em novembro.",
  frase: "A **última chance** de garantir sua cama dos sonhos **com o menor preço!**"   // canto da capa; **texto** = negrito
};
window.CATEGORIES = [
  // group: título da seção na tela de categorias. Sem "cover" = categoria sem fotos ainda (aparece como "Em breve").
  // Para ativar uma categoria: ponha as fotos em img/ofertas/ (+ miniatura em img/ofertas/t/), use cat:"<key>" nos produtos e, se quiser, defina cover.
  {group:"Black Friday",key:"box-bau",name:"Box Baú",cover:"box-queen.jpg"},
  {group:"Black Friday",key:"colchao",name:"Colchões",cover:"sealy-queen.jpg"},
  {group:"Black Friday",key:"camas",name:"Tricama e Bicama",cover:"bicama-casal.jpg",pos:"50% 30%"},

  {group:"Marcas",key:"king-koil",name:"King Koil"},
  {group:"Marcas",key:"ecoflex",name:"Ecoflex"},
  {group:"Marcas",key:"inducol",name:"Inducol"},
  {group:"Marcas",key:"sealy",name:"Sealy"},
  {group:"Marcas",key:"simmons",name:"Simmons"},
  {group:"Marcas",key:"plumatex",name:"Plumatex"},
  {group:"Marcas",key:"probel",name:"Probel"},
  {group:"Marcas",key:"outras-marcas",name:"Outras marcas"},

  {group:"Complementos",key:"cabeceiras",name:"Cabeceiras"},
  {group:"Complementos",key:"travesseiros",name:"Travesseiros"},
  {group:"Complementos",key:"protetores",name:"Protetores"}
];
window.PRODUCTS = [
  // ── Black Friday ──
  {cat:"campanha",top:true,video:"video-black-esperar.mp4",img:"video-black-esperar.jpg",name:"Vídeo: Por que esperar pode sair caro?",wa:"as ofertas da Black Friday"},
  {cat:"camas",top:true,img:"tricama-promo.jpg",name:"Tricama 3 em 1"},
  {cat:"camas",top:true,img:"bicama-casal.jpg",name:"Colchão Molas Firme + Bicama de Molas Casal"},
  {cat:"box-bau",top:true,video:"video-box-bau-qualidade.mp4",img:"video-box-bau-qualidade.jpg",name:"Vídeo: Antes de comprar um box baú, veja isso",wa:"Box Baú"},
  {cat:"box-bau",top:true,img:"box-bau-tabela.jpg",name:"Box Baú (tabela de preços: Solteiro ao King)"},
  {cat:"box-bau",top:true,img:"box-solteiro.jpg",name:"Box Baú Solteiro (0,88 × 1,88 m)"},
  {cat:"box-bau",top:true,img:"box-solteirao.jpg",name:"Box Baú Solteirão (1,08 × 1,98 m)"},
  {cat:"box-bau",top:true,img:"box-casal.jpg",name:"Box Baú Casal (1,38 × 1,88 m)"},
  {cat:"box-bau",top:true,img:"box-queen.jpg",name:"Box Baú Queen (1,58 × 1,98 m)"},
  {cat:"box-bau",top:true,img:"box-king.jpg",name:"Box Baú King (1,93 × 2,03 m)"},
  {cat:"box-bau",top:true,img:"molas-bau-king.jpg",name:"Colchão Molas Ensacadas + Box Baú King (1,93 × 2,03 m)"},
  {cat:"colchao",top:true,img:"hotelaria-solteiro.jpg",name:"Colchão Molas de Hotelaria Firme + Box Solteiro"},
  {cat:"colchao",top:true,img:"kingkoil-solteiro.jpg",name:"Colchão King Koil Firme Solteiro"},
  {cat:"colchao",top:true,img:"simmons-casal.jpg",name:"Colchão Simmons Firme Casal"},
  {cat:"colchao",top:true,img:"sealy-queen.jpg",name:"Colchão Sealy Conforto Intermediário Queen"},
  {cat:"colchao",top:true,img:"kingkoil-queen.jpg",name:"Colchão King Koil Hotelaria Dupla Face Queen"},
  {cat:"colchao",top:true,img:"simmons-queen.jpg",name:"Colchão Simmons Mola Extra Firme Queen (última peça)"},
  {cat:"colchao",top:true,img:"kingkoil-crystal-queen.jpg",name:"Colchão Crystal com Látex Conforto Macio King Koil Queen"},
  {cat:"colchao",top:true,img:"kingkoil-diamond-queen.jpg",name:"Colchão com Látex Diamond King Koil Queen (última peça)"}
];
