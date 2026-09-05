/* =====================================================================
   O CATÁLOGO DO SITE. É só aqui que se mexe para publicar.

   Cada item da lista é uma TATUAGEM, não uma foto. Abrindo o cartão, as
   setas passam pelos ângulos daquela mesma peça: o close, a foto de
   longe, o vídeo, a cicatrizada. Como numa ficha de imóvel, em que se
   navega pelos cômodos da mesma casa.

   Para publicar uma peça nova:
   1. Salve os arquivos dela em img/trabalhos/
   2. Copie o bloco de exemplo abaixo, tire as barras da frente
   3. Troque o título, as categorias e a lista de ângulos
   4. Salve. A grade e os filtros se montam sozinhos.

   Os campos de cada peça:
     titulo      o nome que aparece ao abrir. Escreva como você chamaria
                 a peça conversando: "Cobra na panturrilha"
     categorias  uma ou mais, separadas por espaço, dos ids lá de baixo.
                 Uma peça pode ser duas coisas ao mesmo tempo: uma manga
                 delicada já curada é "delicadas cicatrizadas"
     proporcao   a forma do cartão na grade, ex.: '3/4', '1/1', '4/5'.
                 Serve para o espaço já ficar reservado antes de a foto
                 carregar, sem a página pular
     angulos     a lista de fotos e vídeos DA MESMA peça. O primeiro é a
                 capa, o que aparece na grade

   Cada ângulo:
     arquivo   nome do arquivo dentro de img/trabalhos/
     alt       o que se vê. É lido em voz alta por leitores de tela e
               aparece se a imagem falhar. Escreva "cobra em blackwork
               na panturrilha", nunca "tattoo 1"
     capa      só para vídeo: um quadro dele em imagem, que aparece
               antes de o vídeo carregar

   Vale foto (.jpg, .png, .webp) e vídeo (.mp4, .webm).
   ===================================================================== */

/* As abas do filtro, na ordem em que aparecem. "todas" é obrigatória e
   fica sempre na frente. Para criar uma aba nova, acrescente aqui e use
   o mesmo id no campo "categorias" das peças. */
const CATEGORIAS = [
  { id: 'todas',        nome: 'Todas' },
  { id: 'autorais',     nome: 'Autorais' },
  { id: 'delicadas',    nome: 'Delicadas' },
  { id: 'blackwork',    nome: 'Blackwork' },
  { id: 'cicatrizadas', nome: 'Cicatrizadas' },
];

const TRABALHOS = [
  /* AS SETE PRIMEIRAS PEÇAS, das fotos que a Tay mandou em 05/09.

     Os títulos e as categorias abaixo são LEITURA MINHA, feita olhando as
     fotos — a Tay não mandou os nomes. Elas estão no ar para o site sair
     do vazio, mas cada linha aqui é para ela corrigir: é o trabalho dela,
     e quem nomeia é ela. O que está certo com certeza é o arquivo, a
     proporção e quais fotos são da mesma peça. */

  {
    titulo: 'Flor com olho no antebraço',
    categorias: 'autorais blackwork',
    proporcao: '9/16',
    angulos: [
      { arquivo: 'flor-olho-antebraco.jpeg', alt: 'Flor grande de pétalas sombreadas com um olho no centro, descendo o antebraço' },
    ],
  },
  {
    titulo: 'Draw or die',
    categorias: 'autorais',
    proporcao: '3/4',
    angulos: [
      { arquivo: 'draw-or-die-coxa.jpeg', alt: 'Letra ornamentada na coxa com a frase DRAW OR DIE embaixo' },
    ],
  },
  {
    titulo: 'Mulher e crânio na perna',
    categorias: 'autorais blackwork',
    proporcao: '3/4',
    angulos: [
      { arquivo: 'mulher-cranio-perna.jpeg', alt: 'Rosto de mulher chorando sob um crânio de animal, com flecha e flor, descendo a perna' },
    ],
  },
  {
    titulo: 'Fada na lua',
    categorias: 'autorais delicadas',
    proporcao: '3/4',
    angulos: [
      { arquivo: 'fada-lua-antebraco.jpeg', alt: 'Fada sentada numa lua entre estrelas, em traço fino, no antebraço' },
    ],
  },
  {
    titulo: 'Filigrana no tornozelo',
    categorias: 'delicadas',
    proporcao: '3/4',
    angulos: [
      { arquivo: 'filigrana-tornozelo.jpeg', alt: 'Ornamento simétrico de traço fino descendo a parte de trás do tornozelo' },
    ],
  },
  {
    titulo: 'Mulher coroada',
    categorias: 'autorais blackwork',
    proporcao: '3/4',
    angulos: [
      { arquivo: 'mulher-coroa-antebraco.jpeg', alt: 'Rosto de mulher com coroa de raios e lágrimas escuras, sobre uma base ornamentada, no antebraço' },
    ],
  },
  {
    /* A única com dois ângulos: a mão fechando o rosto e o dorso dela em
       close. É para isso que o cartão tem setas. */
    titulo: 'Olho no sol',
    categorias: 'autorais blackwork',
    proporcao: '4/5',
    angulos: [
      { arquivo: 'olho-sol-mao-1.jpeg', alt: 'Mão cobrindo o rosto, com um olho dentro de um sol tatuado no dorso' },
      { arquivo: 'olho-sol-mao-2.jpeg', alt: 'O mesmo olho no sol, visto de perto com a mão estendida' },
    ],
  },
];

/* Desenhos autorais livres, esperando quem leve.
   O "nome" é o que aparece no cartão. */
const DISPONIVEIS = [
  // { arquivo: 'lua-ornamental.jpg', nome: 'Lua ornamental', alt: 'Lua ornamental com pontilhismo' },
];
