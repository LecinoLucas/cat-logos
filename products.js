// ── Como editar ─────────────────────────────────────────────
// Nova oferta: ponha a foto em img/ofertas/ (e uma miniatura em img/ofertas/t/) e inclua uma linha abaixo.
// top:true  → aparece na rolagem da tela inicial (mais vendidos), na ordem desta lista.
// cat       → categoria (precisa existir em CATEGORIES).
window.WHATSAPP = "5562981310293"; // DDI + DDD + número
window.CATEGORIES = [
  {key:"tricama",name:"Tricama",cover:"tricama-4.jpg"},
  {key:"bicama-bau",name:"Bicama com Baú",cover:"bicama-bau-colagem.jpg"},
  {key:"bicama",name:"Bicama Tradicional",cover:"bicama-tradicional-1.jpg",pos:"50% 72%"},
  {key:"box-bau",name:"Box Baú",cover:"box-queen.jpg"},
  {key:"colchao",name:"Colchões",cover:"sealy-queen.jpg"}
];
window.PRODUCTS = [
  // ── Mais vendidos (top:true) ──
  {cat:"tricama",top:true,img:"tricama-promo.jpg",name:"Tricama 3 em 1"},
  {cat:"tricama",top:true,img:"tricama-colagem.jpg",name:"Tricama 3 em 1"},
  {cat:"bicama-bau",top:true,img:"bicama-bau-capa.jpg",name:"Bicama com Baú"},
  {cat:"bicama-bau",top:true,img:"bicama-bau-colagem.jpg",name:"Bicama com Baú"},
  {cat:"bicama",top:true,img:"bicama-tradicional-1.jpg",name:"Bicama Tradicional"},
  {cat:"bicama",top:true,img:"bicama-tradicional-2.jpg",name:"Bicama Tradicional"},
  {cat:"bicama",top:true,img:"bicama-casal.jpg",name:"Colchão Molas Firme + Bicama de Molas Casal"},
  // ── Tricama ──
  {cat:"tricama",img:"tricama-3.jpg",name:"Tricama 3 em 1"},
  {cat:"tricama",img:"tricama-1.jpg",name:"Tricama 3 em 1"},
  {cat:"tricama",img:"tricama-2.jpg",name:"Tricama 3 em 1"},
  {cat:"tricama",img:"tricama-4.jpg",name:"Tricama 3 em 1"},
  // ── Box Baú ──
  {cat:"box-bau",img:"box-solteiro.jpg",name:"Box Baú Solteiro (0,88 × 1,88 m)"},
  {cat:"box-bau",img:"box-solteirao.jpg",name:"Box Baú Solteirão (1,08 × 1,98 m)"},
  {cat:"box-bau",img:"box-casal.jpg",name:"Box Baú Casal (1,38 × 1,88 m)"},
  {cat:"box-bau",img:"box-queen.jpg",name:"Box Baú Queen (1,58 × 1,98 m)"},
  {cat:"box-bau",img:"box-king.jpg",name:"Box Baú King (1,93 × 2,03 m)"},
  // ── Colchões ──
  {cat:"colchao",img:"hotelaria-solteiro.jpg",name:"Colchão Molas de Hotelaria Firme + Box Solteiro"},
  {cat:"colchao",img:"kingkoil-solteiro.jpg",name:"Colchão King Koil Firme Solteiro"},
  {cat:"colchao",img:"simmons-casal.jpg",name:"Colchão Simmons Firme Casal"},
  {cat:"colchao",img:"sealy-queen.jpg",name:"Colchão Sealy Conforto Intermediário Queen"},
  {cat:"colchao",img:"kingkoil-queen.jpg",name:"Colchão King Koil Hotelaria Dupla Face Queen"}
];
