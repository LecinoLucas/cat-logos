// Cartões de preço (tela do produto). Chave = nome da foto em img/ofertas.
// o: [medida, tamanho, "de", "por", parcelamento]   ·   obs: aviso   ·   tag: selo do preço
(function(){
const O=(m,d,de,p,x)=>({m,d,de,p,x});
const S=["Solteiro","0,88 × 1,88 m"],SO=["Solteirão","1,08 × 1,98 m"],C=["Casal","1,38 × 1,88 m"],Q=["Queen","1,58 × 1,98 m"],K=["King","1,93 × 2,03 m"];
const o=(t,de,p,x)=>O(t[0],t[1],de,p,x);
const COR="Verifique as cores disponíveis.",CORB="Verifique as cores do box baú disponíveis.",NB="Não acompanha o box.";
const BX=(t,de,p)=>({eb:"Box baú",n:"Box baú",tag:"+ 5% no Pix",o:[o(t,de,p,"até 10x sem juros")],obs:COR+" Colchão e objetos decorativos não inclusos."});
window.CARDS={
"molas-bau-solteiro-solteirao.jpg":{full:1,eb:"Colchão + Box baú",n:"Molas ensacadas macio",o:[o(S,"2.820,00","2.047,00","10x R$ 234,00"),o(SO,"3.289,00","2.494,00","10x R$ 270,00")],obs:CORB},
"molas-bau-casal-queen.jpg":{eb:"Colchão + Box baú",n:"Molas ensacadas macio",o:[o(C,"3.489,00","2.690,00","10x R$ 293,00"),o(Q,"4.280,00","3.285,00","10x R$ 359,00")],obs:"Não acompanha a cabeceira."},
"molas-bau-queen.jpg":{eb:"Colchão + Box baú",n:"Molas ensacadas",o:[o(Q,"5.280,00","3.960,00","10x R$ 430,00")],obs:CORB},
"molas-bau-king.jpg":{eb:"Colchão + Box baú",n:"Molas ensacadas",o:[o(K,"5.789,00","4.597,00","10x R$ 489,00")],obs:CORB},
"inducol-casal-box.jpg":{eb:"Colchão + Box · suporte 200 kg",n:"Inducol Hotelaria firme",o:[o(C,"1.889,00","1.449,00","10x R$ 160,00")],obs:COR},
"inducol-casal.jpg":{eb:"Colchão · suporte 200 kg",n:"Inducol Hotelaria firme",o:[o(C,"1.440,00","1.098,00","10x R$ 124,00")],obs:NB},
"inducol-hotelaria-solteiro.jpg":{eb:"Colchão · suporte 200 kg",n:"Inducol Hotelaria firme",o:[o(S,"1.100,00","799,00","8x R$ 108,00")],obs:NB},
"hotelaria-solteiro.jpg":{eb:"Colchão + Box",n:"Molas de hotelaria firme",o:[o(S,"1.399,00","999,00","10x R$ 120,00")],obs:"Verifique as cores do box disponíveis."},
"kingkoil-solteiro.jpg":{eb:"Colchão",n:"King Koil Hotelaria firme",o:[o(S,"1.898,00","1.398,00","10x R$ 160,00")],obs:NB},
"simmons-casal.jpg":{eb:"Colchão",n:"Simmons Firme",o:[o(C,"4.270,00","3.297,00","10x R$ 356,00")],obs:NB},
"sealy-queen.jpg":{eb:"Colchão molas",n:"Sealy Conforto Intermediário",o:[o(Q,"2.899,00","2.199,00","10x R$ 240,00")],obs:NB},
"sealy-joy.jpg":{eb:"Colchão molas ensacadas",n:"Sealy Joy Intermediário",o:[o(S,"1.396,00","1.049,00","10x R$ 124,00"),o(SO,"1.898,00","1.396,00","10x R$ 160,00")],obs:"Não acompanha a cama."},
"sealy-royal-foam-queen.jpg":{eb:"Colchão de espuma",n:"Sealy Royal Foam Látex",o:[o(Q,"3.980,00","2.798,00","10x R$ 318,00")],obs:NB},
"sealy-miami.jpg":{eb:"Colchão molas ensacadas",n:"Sealy Miami Macio",o:[o(S,"1.460,00","1.097,00","10x R$ 118,00"),o(SO,"1.898,00","1.449,00","10x R$ 160,00")],obs:NB},
"probel-guarda-costas-king.jpg":{eb:"Colchão + Box",n:"Probel Guarda Costas",o:[o(K,"6.450,00","4.998,00","10x R$ 548,00")],obs:"Espuma firme com gel. Não acompanha a cabeceira e os demais itens."},
"herval-king.jpg":{eb:"Colchão + Box",n:"Herval Molas firme",o:[o(K,"3.698,00","2.895,00","10x R$ 310,00")],obs:"Não acompanha os demais itens decorativos."},
"kingkoil-queen.jpg":{eb:"Colchão",n:"King Koil Hotelaria dupla face",o:[o(Q,"4.580,00","3.296,00","10x R$ 355,00")],obs:NB},
"kingkoil-crystal-queen.jpg":{eb:"Colchão com látex",n:"King Koil Crystal macio",o:[o(Q,"22.240,00","10.345,00","10x R$ 1.099,00")],obs:NB},
"kingkoil-nanobionic-queen.jpg":{eb:"Colchão com látex",n:"King Koil Nanobionic",o:[o(Q,"30.244,00","14.845,00","10x R$ 1.568,00")],obs:"Não acompanha a cama."},
"kingkoil-diamond-queen.jpg":{eb:"Colchão com látex",n:"King Koil Diamond",o:[o(Q,"11.980,00","6.987,00","10x R$ 784,00")],obs:NB},
"bicama-solteiro.jpg":{eb:"Colchão + Bicama",n:"Molas firme + bicama de molas",o:[o(S,"2.299,00","1.799,00","10x R$ 210,00")],obs:COR},
"bicama-casal.jpg":{eb:"Colchão + Bicama",n:"Molas firme + bicama de molas",o:[o(C,"2.985,00","2.443,00","10x R$ 279,00")],obs:COR},
"box-solteiro.jpg":BX(S,"1.399,00","999,00"),
"box-solteirao.jpg":BX(SO,"1.490,00","1.100,00"),
"box-casal.jpg":BX(C,"1.590,00","1.199,00"),
"box-queen.jpg":BX(Q,"1.990,00","1.399,00"),
"box-king.jpg":BX(K,"2.290,00","1.899,00"),
"coord-azul-solteiro.jpg":{eb:"Coordenado 5 peças",n:"Azul · linho toque 300 fios",o:[o(S,"560,00","299,00","5x R$ 80,00")],obs:COR},
"coord-rose-solteiro.jpg":{eb:"Coordenado 5 peças",n:"Rosê · linho toque 300 fios",o:[o(S,"560,00","299,00","5x R$ 80,00")],obs:COR},
"coord3-azul-claro.jpg":{eb:"Coordenado 3 peças dupla face",n:"Azul claro · micropercal 200 fios",o:[o(S,"560,00","299,00","5x R$ 80,00")],obs:COR},
"coord3-rosa-antigo.jpg":{eb:"Coordenado 3 peças dupla face",n:"Rosa antigo · micropercal 200 fios",o:[o(S,"560,00","299,00","5x R$ 80,00")],obs:COR},
"travesseiro-pluma.jpg":{eb:"Travesseiro · suporte médio",n:"Toque de Pluma",o:[O("50 × 70","","49,90","19,90","")],obs:"Não utiliza pluma animal."}
};
})();
