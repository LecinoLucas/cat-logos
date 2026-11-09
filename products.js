// ── Como editar ─────────────────────────────────────────────
// Nova oferta: ponha a foto (formato em pé, 9:16) em img/ofertas/ e uma miniatura em img/ofertas/t/, e inclua uma linha abaixo.
// top:true → aparece na rolagem da tela inicial (na ordem desta lista).
// cat      → categoria (precisa existir em CATEGORIES).
// VÍDEO: {cat:"box-bau",top:true,video:"nome.mp4",img:"nome.jpg",name:"Vídeo: ...",wa:"Box Baú"}
//         → o vídeo vai em img/ofertas/ (mp4, até ~20 MB) e a imagem de capa (img) em img/ofertas/ + miniatura em img/ofertas/t/.
// pos      → (opcional) enquadramento da foto, ex.: "50% 30%".
// Atendentes: quando a pessoa toca em qualquer botão de WhatsApp, abre uma janelinha para escolher com quem falar.
// numero = DDI + DDD + número (só dígitos) · foto = caminho da imagem em img/atendentes/ (opcional; sem foto aparece a inicial)
// Quem estiver sem número fica escondido; com um só atendente, o WhatsApp abre direto.
window.ATENDENTES = [
  {nome:"Vanuza",   numero:"556232152561", foto:""},
  {nome:"Cleonice", numero:"5562981310293", foto:""}
];
// ── Dados da loja ──  (campos vazios ficam escondidos no site)
window.STORE = {
  marca: "apioneira",              // nome na logo (a logo oficial no Instagram está escrita "apioneira")
  instagram: "pioneiracolchoes",   // sem o @
  endereco: "",                    // ex.: "Av. Exemplo, 123 - Centro, Cidade - UF"
  mapa: "",                        // (opcional) link do Google Maps; se vazio, é gerado pelo endereço
  horario: "",                     // ex.: "Seg a Sex 8h–18h · Sáb 8h–13h"
  entrega: "",                     // ex.: "Entregamos em Goiânia e região"
  telefone: "556232152561",        // ex.: "5562999999999" (DDI+DDD+número) para o botão Ligar
  validade: "30/11",               // aparece na página "A Pioneira": "Ofertas de Black Friday válidas até 30/11"
  soBlack: true,                   // true = o site mostra só a Black Friday (esconde Box Gold, Camas, Bicamas etc.). Mude para false para liberar o catálogo da loja.
  botao: "WhatsApp",      // texto do botão de WhatsApp nas ofertas (o mesmo em todas as telas)
  // Textos da capa de abertura (deixe "" para esconder uma linha)
  periodo: "De 01 a 30 de novembro",
  destaque: "Até 60% off",           // o número antes do % conta de 0 até ele quando a página abre
  subtitulo: "O conforto que você ama com o preço que **não volta mais.**"   // **texto** = destaque em azul
};
window.CATEGORIES = [
  // group: título da seção na tela de categorias. Sem "cover" = categoria sem fotos ainda (aparece como "Em breve").
  // Para ativar uma categoria: ponha as fotos em img/ofertas/ (+ miniatura em img/ofertas/t/), use cat:"<key>" nos produtos e, se quiser, defina cover.
  {group:"Black Friday",black:true,key:"box-bau",name:"Baús",cover:"box-queen.jpg"},
  {group:"Black Friday",black:true,key:"colchao-bau",name:"Colchão + Box Baú",cover:"molas-bau-solteiro-solteirao.jpg"},
  {group:"Black Friday",black:true,key:"colchao",name:"Colchões",cover:"sealy-queen.jpg"},
  {group:"Black Friday",black:true,key:"tricama",name:"Tricama 3 em 1",cover:"tricama-promo.jpg",pos:"50% 30%"},
  {group:"Black Friday",black:true,key:"mesas",name:"Mesas de cabeceira",cover:"video-mesas-cabeceira.jpg",pos:"50% 40%"},
  {group:"Black Friday",black:true,key:"cama-posta",name:"Cama posta",cover:"coord-azul-solteiro.jpg",pos:"50% 35%"},
  {group:"Black Friday",black:true,key:"camas",name:"Bicama",cover:"bicama-casal.jpg",pos:"50% 30%"},

  {group:"Camas",key:"bicamas-loja",name:"Bicamas",cover:"bicamas-03.jpg",pos:"50% 50%"},
  {group:"Camas",key:"camas-loja",name:"Camas",cover:"camas-08.jpg",pos:"50% 50%"},

  {group:"Box",key:"box-gold",name:"Box Gold",cover:"box-gold-10.jpg",pos:"50% 62%"},
  {group:"Box",key:"box-tradicional",name:"Box Tradicional",cover:"box-trad-1.jpg",pos:"50% 45%"},

  {group:"Marcas",key:"king-koil",name:"King Koil",cover:"kingkoil-queen.jpg",black:true},
  {group:"Marcas",key:"ecoflex",name:"Ecoflex"},
  {group:"Marcas",key:"inducol",name:"Inducol"},
  {group:"Marcas",key:"sealy",name:"Sealy",cover:"sealy-queen.jpg",black:true},
  {group:"Marcas",key:"simmons",name:"Simmons",cover:"simmons-casal.jpg",black:true},
  {group:"Marcas",key:"plumatex",name:"Plumatex"},
  {group:"Marcas",key:"probel",name:"Probel",cover:"probel-guarda-costas-king.jpg",black:true},
  {group:"Marcas",key:"herval",name:"Herval",cover:"herval-king.jpg",black:true},
  {group:"Marcas",key:"outras-marcas",name:"Outras marcas"},

  {group:"Complementos",key:"cabeceiras",name:"Cabeceiras"},
  {group:"Complementos",key:"travesseiros",name:"Travesseiros"},
  {group:"Complementos",key:"protetores",name:"Protetores"}
];
window.PRODUCTS = [
  // ── Bicamas (catálogo da loja) ──
  {cat:"bicamas-loja",loja:true,img:"bicamas-01.jpg",name:"Bicama",ratio:"1280/1280"},
  {cat:"bicamas-loja",loja:true,img:"bicamas-02.jpg",name:"Bicama",ratio:"1280/1280"},
  {cat:"bicamas-loja",loja:true,img:"bicamas-03.jpg",name:"Bicama",ratio:"768/1024"},
  {cat:"bicamas-loja",loja:true,img:"bicamas-04.jpg",name:"Bicama",ratio:"768/1024"},
  {cat:"bicamas-loja",loja:true,img:"bicamas-05.jpg",name:"Bicama",ratio:"769/1024"},
  {cat:"bicamas-loja",loja:true,img:"bicamas-06.jpg",name:"Bicama",ratio:"769/1024"},
  {cat:"bicamas-loja",loja:true,img:"bicamas-07.jpg",name:"Bicama",ratio:"769/1024"},
  {cat:"bicamas-loja",loja:true,img:"bicamas-08.jpg",name:"Bicama",ratio:"769/1024"},
  {cat:"bicamas-loja",loja:true,img:"bicamas-09.jpg",name:"Bicama",ratio:"819/1024"},
  {cat:"bicamas-loja",loja:true,img:"bicamas-10.jpg",name:"Bicama",ratio:"540/675"},
  {cat:"bicamas-loja",loja:true,img:"bicamas-11.jpg",name:"Bicama",ratio:"540/675"},
  {cat:"bicamas-loja",loja:true,img:"bicamas-12.jpg",name:"Bicama",pos:"50% 60%"},
  // ── Camas (catálogo da loja) ──
  {cat:"camas-loja",loja:true,img:"camas-01.jpg",name:"Cama",ratio:"960/1280"},
  {cat:"camas-loja",loja:true,img:"camas-02.jpg",name:"Cama",ratio:"1528/1528"},
  {cat:"camas-loja",loja:true,img:"camas-03.jpg",name:"Cama",ratio:"1599/1599"},
  {cat:"camas-loja",loja:true,img:"camas-04.jpg",name:"Cama",ratio:"1600/1600"},
  {cat:"camas-loja",loja:true,img:"camas-05.jpg",name:"Cama",ratio:"1200/1600"},
  {cat:"camas-loja",loja:true,img:"camas-06.jpg",name:"Cama",ratio:"1600/1600"},
  {cat:"camas-loja",loja:true,img:"camas-07.jpg",name:"Cama"},
  {cat:"camas-loja",loja:true,img:"camas-08.jpg",name:"Cama",ratio:"768/1024"},
  {cat:"camas-loja",loja:true,img:"camas-09.jpg",name:"Cama",ratio:"768/1024"},
  {cat:"camas-loja",loja:true,img:"camas-10.jpg",name:"Cama",ratio:"1280/853"},
  {cat:"camas-loja",loja:true,img:"camas-11.jpg",name:"Cama",ratio:"1280/853"},
  {cat:"camas-loja",loja:true,img:"camas-12.jpg",name:"Cama"},
  // ── Box Tradicional (catálogo da loja) ──
  {cat:"box-tradicional",loja:true,img:"box-trad-1.jpg",name:"Box Tradicional",ratio:"1080/872"},
  {cat:"box-tradicional",loja:true,img:"box-trad-2.jpg",name:"Box Tradicional",ratio:"1080/1441"},
  {cat:"box-tradicional",loja:true,img:"box-trad-3.jpg",name:"Box Tradicional",ratio:"1080/1442"},
  {cat:"box-tradicional",loja:true,img:"box-trad-4.jpg",name:"Box Tradicional",ratio:"864/1920"},
  {cat:"box-tradicional",loja:true,img:"box-trad-5.jpg",name:"Box Tradicional"},
  // ── Box Gold (catálogo da loja) ──
  {cat:"box-gold",loja:true,img:"box-gold-01.jpg",name:"Box Gold",ratio:"4/3"},
  {cat:"box-gold",loja:true,img:"box-gold-02.jpg",name:"Box Gold"},
  {cat:"box-gold",loja:true,img:"box-gold-03.jpg",name:"Box Gold"},
  {cat:"box-gold",loja:true,img:"box-gold-04.jpg",name:"Box Gold"},
  {cat:"box-gold",loja:true,img:"box-gold-05.jpg",name:"Box Gold",ratio:"16/9"},
  {cat:"box-gold",loja:true,img:"box-gold-06.jpg",name:"Box Gold",ratio:"16/9"},
  {cat:"box-gold",loja:true,img:"box-gold-07.jpg",name:"Box Gold"},
  {cat:"box-gold",loja:true,img:"box-gold-08.jpg",name:"Box Gold"},
  {cat:"box-gold",loja:true,img:"box-gold-09.jpg",name:"Box Gold"},
  {cat:"box-gold",loja:true,img:"box-gold-10.jpg",name:"Box Gold"},
  {cat:"box-gold",loja:true,img:"box-gold-11.jpg",name:"Box Gold",ratio:"1/1"},
  {cat:"box-gold",loja:true,img:"box-gold-12.jpg",name:"Box Gold"},
  {cat:"box-gold",loja:true,img:"box-gold-13.jpg",name:"Box Gold"},
  {cat:"box-gold",loja:true,img:"box-gold-14.jpg",name:"Box Gold",ratio:"1/1"},
  {cat:"box-gold",loja:true,img:"box-gold-15.jpg",name:"Box Gold",ratio:"1/1"},
  // ── Black Friday ──
  {cat:"box-bau",top:true,img:"box-bau-tabela.jpg",leg:"Box Baú · todos os tamanhos",preco:"Solteiro ao King · a partir de R$ 999",name:"Box Baú (tabela de preços: Solteiro ao King)"},
  {cat:"campanha",top:true,video:"video-black-esperar.mp4",img:"video-black-esperar.jpg",name:"Vídeo: Por que esperar pode sair caro?",wa:"as ofertas da Black Friday"},
  {cat:"tricama",top:true,img:"tricama-promo.jpg",leg:"Tricama 3 em 1 · aço e 2 anos de garantia",preco:"10x R$ 333,87 · R$ 3.050 à vista",name:"Tricama 3 em 1 (estrutura em aço, 2 anos de garantia)"},
  {cat:"mesas",top:true,video:"video-mesas-cabeceira.mp4",img:"video-mesas-cabeceira.jpg",leg:"Mesas de cabeceira · toque num modelo",chips:[{t:"DIME",img:"mesa-dime.jpg"},{t:"MILETO",img:"mesa-mileto.jpg"},{t:"MH5404",img:"mesa-mh5404.jpg"},{t:"MH5405",img:"mesa-mh5405.jpg"},{t:"MH5410",img:"mesa-mh5410.jpg"},{t:"LINO",img:"mesa-lino.jpg"},{t:"MILOS",img:"mesa-milos.jpg"}],name:"Vídeo: Mesas de cabeceira",wa:"Mesas de cabeceira"},
  {cat:"mesas",img:"mesa-dime.jpg",leg:"Mesa DIME",preco:"Consulte o valor",name:"Mesa de cabeceira DIME",back:"Todos os modelos"},
  {cat:"mesas",img:"mesa-mileto.jpg",leg:"Mesa MILETO",preco:"Consulte o valor",name:"Mesa de cabeceira MILETO",back:"Todos os modelos"},
  {cat:"mesas",img:"mesa-mh5404.jpg",leg:"Mesa MH5404",preco:"Consulte o valor",name:"Mesa de cabeceira MH5404",back:"Todos os modelos"},
  {cat:"mesas",img:"mesa-mh5405.jpg",leg:"Mesa MH5405",preco:"Consulte o valor",name:"Mesa de cabeceira MH5405",back:"Todos os modelos"},
  {cat:"mesas",img:"mesa-mh5410.jpg",leg:"Mesa MH5410",preco:"Consulte o valor",name:"Mesa de cabeceira MH5410",back:"Todos os modelos"},
  {cat:"mesas",img:"mesa-lino.jpg",leg:"Mesa LINO",preco:"Consulte o valor",name:"Mesa de cabeceira LINO",back:"Todos os modelos"},
  {cat:"mesas",img:"mesa-milos.jpg",leg:"Mesa MILOS",preco:"Consulte o valor",name:"Mesa de cabeceira MILOS",back:"Todos os modelos"},
  {cat:"cama-posta",top:true,img:"coord-azul-solteiro.jpg",leg:"Coordenado 5 peças azul · Solteiro",preco:"R$ 299 no Pix",name:"Coordenado 5 peças azul linho toque 300 fios Solteiro"},
  {cat:"cama-posta",top:true,img:"coord-rose-solteiro.jpg",leg:"Coordenado 5 peças rosê · Solteiro",preco:"R$ 299 no Pix",name:"Coordenado 5 peças rosê linho toque 300 fios Solteiro"},
  {cat:"cama-posta",video:"video-coordenado-rose.mp4",img:"video-coordenado-rose.jpg",leg:"Coordenado rosê · veja de perto",name:"Vídeo: Coordenado rosê",wa:"Coordenado 5 peças rosê"},
  {cat:"camas",top:true,img:"bicama-solteiro.jpg",leg:"Bicama de molas Solteiro",preco:"R$ 1.799 no Pix",name:"Colchão Molas Firme + Bicama de Molas Solteiro (0,88 × 1,88 m)"},
  {cat:"camas",video:"video-bicama-molas.mp4",img:"video-bicama-molas.jpg",tags:["bicamas-loja"],leg:"Bicama de molas · veja de perto",preco:"R$ 1.299 (de R$ 1.699)",name:"Vídeo: Bicama de molas",wa:"Bicama de molas"},
  {cat:"camas",top:true,img:"bicama-casal.jpg",leg:"Bicama de Molas Casal",preco:"R$ 2.443 no Pix",name:"Colchão Molas Firme + Bicama de Molas Casal"},
  {cat:"box-bau",top:true,video:"video-box-bau-qualidade.mp4",img:"video-box-bau-qualidade.jpg",name:"Vídeo: Antes de comprar um box baú, veja isso",wa:"Box Baú"},
  {cat:"box-bau",top:true,img:"box-solteiro.jpg",leg:"Box Baú Solteiro",preco:"R$ 999",name:"Box Baú Solteiro (0,88 × 1,88 m)"},
  {cat:"box-bau",top:true,img:"box-solteirao.jpg",leg:"Box Baú Solteirão",preco:"R$ 1.100",name:"Box Baú Solteirão (1,08 × 1,98 m)"},
  {cat:"box-bau",top:true,img:"box-casal.jpg",leg:"Box Baú Casal",preco:"R$ 1.199",name:"Box Baú Casal (1,38 × 1,88 m)"},
  {cat:"box-bau",top:true,img:"box-queen.jpg",leg:"Box Baú Queen",preco:"R$ 1.399",name:"Box Baú Queen (1,58 × 1,98 m)"},
  {cat:"box-bau",top:true,img:"box-king.jpg",leg:"Box Baú King",preco:"R$ 1.899",name:"Box Baú King (1,93 × 2,03 m)"},
  {cat:"colchao-bau",top:true,img:"molas-bau-solteiro-solteirao.jpg",leg:"Colchão + Box Baú Solteiro e Solteirão",preco:"Solteiro R$ 2.047 · Solteirão R$ 2.494 no Pix",name:"Colchão Molas Ensacadas Macio + Box Baú (Solteiro e Solteirão)"},
  {cat:"colchao-bau",top:true,img:"molas-bau-casal-queen.jpg",leg:"Colchão + Box Baú Casal e Queen",preco:"Casal R$ 2.690 · Queen R$ 3.285 no Pix",name:"Colchão Molas Ensacadas Macio + Box Baú (Casal e Queen)"},
  {cat:"colchao-bau",top:true,img:"molas-bau-queen.jpg",leg:"Colchão + Box Baú Queen",preco:"R$ 3.960 no Pix",name:"Colchão Molas Ensacadas + Box Baú Queen (1,58 × 1,98 m)"},
  {cat:"colchao-bau",top:true,img:"molas-bau-king.jpg",leg:"Colchão + Box Baú King",preco:"R$ 4.597 no Pix",name:"Colchão Molas Ensacadas + Box Baú King (1,93 × 2,03 m)"},
  {cat:"colchao",top:true,img:"hotelaria-solteiro.jpg",leg:"Colchão Hotelaria + Box Solteiro",preco:"R$ 999 no Pix",name:"Colchão Molas de Hotelaria Firme + Box Solteiro"},
  {cat:"colchao",top:true,img:"kingkoil-solteiro.jpg",leg:"King Koil Firme Solteiro",preco:"R$ 1.398 no Pix",tags:["king-koil"],name:"Colchão King Koil Firme Solteiro"},
  {cat:"colchao",top:true,img:"simmons-casal.jpg",leg:"Simmons Firme Casal",preco:"R$ 3.297 no Pix",tags:["simmons"],name:"Colchão Simmons Firme Casal"},
  {cat:"colchao",top:true,img:"sealy-queen.jpg",leg:"Sealy Intermediário Queen",preco:"R$ 2.199 no Pix",tags:["sealy"],name:"Colchão Sealy Conforto Intermediário Queen"},
  {cat:"colchao",top:true,img:"sealy-joy.jpg",leg:"Sealy Joy Intermediário",preco:"Solteiro R$ 1.049 · Solteirão R$ 1.396",tags:["sealy"],name:"Colchão Sealy Joy Molas Ensacadas Conforto Intermediário (Solteiro e Solteirão)"},
  {cat:"colchao",top:true,img:"sealy-royal-foam-queen.jpg",tags:["sealy"],leg:"Sealy Royal Foam Látex Queen",preco:"R$ 2.798 no Pix",name:"Colchão Sealy Royal Foam Látex Queen (1,58 × 1,98 m)"},
  {cat:"colchao",top:true,img:"sealy-miami.jpg",leg:"Sealy Miami Macio",preco:"Solteiro R$ 1.097 · Solteirão R$ 1.449",tags:["sealy"],name:"Colchão Sealy Miami Molas Ensacadas Macio (Solteiro e Solteirão)"},
  {cat:"colchao",top:true,img:"probel-guarda-costas-king.jpg",leg:"Probel Guarda Costas King",preco:"R$ 4.998 no Pix",tags:["probel"],name:"Colchão Probel Espuma Firme com Gel Linha Guarda Costas + Box King (1,93 × 2,03 m)"},
  {cat:"colchao",top:true,img:"herval-king.jpg",tags:["herval"],leg:"Herval Molas Firme + Box King",preco:"R$ 2.895 no Pix",name:"Colchão Herval de Molas Firme + Box King (1,93 × 2,03 m)"},
  {cat:"colchao",top:true,img:"kingkoil-queen.jpg",leg:"King Koil Hotelaria Queen",preco:"R$ 3.296 no Pix",tags:["king-koil"],name:"Colchão King Koil Hotelaria Dupla Face Queen"},
  {cat:"colchao",top:true,img:"simmons-queen.jpg",leg:"Simmons Extra Firme Queen",preco:"R$ 4.998 no Pix",tags:["simmons"],name:"Colchão Simmons Mola Extra Firme Queen (última peça)"},
  {cat:"colchao",top:true,img:"kingkoil-crystal-queen.jpg",leg:"King Koil Crystal Queen",preco:"R$ 10.345 no Pix",tags:["king-koil"],name:"Colchão Crystal com Látex Conforto Macio King Koil Queen"},
  {cat:"colchao",top:true,img:"kingkoil-diamond-queen.jpg",leg:"King Koil Diamond Queen",preco:"R$ 6.987 no Pix",tags:["king-koil"],name:"Colchão com Látex Diamond King Koil Queen (última peça)"}
];
