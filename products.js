// ── Como editar ─────────────────────────────────────────────
// Nova oferta: ponha a foto em img/ofertas/ (e uma miniatura em img/ofertas/t/) e inclua uma linha abaixo.
// top:true  → aparece na rolagem da tela inicial (mais vendidos), na ordem desta lista.
// cat       → categoria (precisa existir em CATEGORIES).
window.WHATSAPP = "5562981310293"; // DDI + DDD + número
window.CATEGORIES = [
  {key:"box-bau",name:"Box Baú",cover:"box-queen.jpg"},
  {key:"colchao",name:"Colchões",cover:"sealy-queen.jpg"}
  // Futuras: {key:"tricama",name:"Tricama",cover:"..."}, {key:"box",name:"Box Cama",cover:"..."}
];
window.PRODUCTS = [
  {cat:"box-bau",top:true,img:"box-solteiro.jpg",name:"Box Baú Solteiro (0,88 × 1,88 m)"},
  {cat:"box-bau",top:true,img:"box-solteirao.jpg",name:"Box Baú Solteirão (1,08 × 1,98 m)"},
  {cat:"box-bau",top:true,img:"box-casal.jpg",name:"Box Baú Casal (1,38 × 1,88 m)"},
  {cat:"box-bau",top:true,img:"box-queen.jpg",name:"Box Baú Queen (1,58 × 1,98 m)"},
  {cat:"box-bau",top:true,img:"box-king.jpg",name:"Box Baú King (1,93 × 2,03 m)"},
  {cat:"colchao",top:true,img:"hotelaria-solteiro.jpg",name:"Colchão Molas de Hotelaria Firme + Box Solteiro"},
  {cat:"colchao",top:true,img:"kingkoil-solteiro.jpg",name:"Colchão King Koil Firme Solteiro"},
  {cat:"colchao",top:true,img:"bicama-casal.jpg",name:"Colchão Molas Firme + Bicama Casal"},
  {cat:"colchao",top:true,img:"simmons-casal.jpg",name:"Colchão Simmons Firme Casal"},
  {cat:"colchao",top:true,img:"sealy-queen.jpg",name:"Colchão Sealy Conforto Intermediário Queen"},
  {cat:"colchao",top:true,img:"kingkoil-queen.jpg",name:"Colchão King Koil Hotelaria Dupla Face Queen"}
];
