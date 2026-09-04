/* =====================================================================
   O CATÁLOGO DO SITE. É só aqui que se mexe para publicar.

   Para publicar uma peça nova:
   1. Salve o arquivo em img/trabalhos/ (ou img/disponiveis/)
   2. Copie uma linha de exemplo abaixo, tire as duas barras da frente,
      e troque o nome do arquivo e a descrição
   3. Salve. O site se monta sozinho.

   Vale foto (.jpg, .png, .webp) e vídeo (.mp4, .webm). Em vídeo dá para
   apontar uma capa com "capa: 'nome.jpg'".

   A descrição ("alt") é lida em voz alta por leitores de tela e aparece
   se a imagem falhar. Escreva o que se vê: "cobra em blackwork na
   panturrilha", nunca "tattoo 1".
   ===================================================================== */

/* Peças fechadas na pele. */
const TRABALHOS = [
  // { arquivo: 'cobra-panturrilha.jpg', alt: 'Cobra em blackwork na panturrilha' },
  // { arquivo: 'ornamental-tornozelo.jpg', alt: 'Ornamental de filigrana no tornozelo' },
  // { arquivo: 'processo.mp4', alt: 'Processo de uma peça delicada', capa: 'processo.jpg' },
];

/* Desenhos autorais livres, esperando quem leve.
   O "nome" é o que aparece no cartão. */
const DISPONIVEIS = [
  // { arquivo: 'lua-ornamental.jpg', nome: 'Lua ornamental', alt: 'Lua ornamental com pontilhismo' },
];
