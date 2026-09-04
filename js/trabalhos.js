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
  // {
  //   titulo: 'Cobra na panturrilha',
  //   categorias: 'blackwork autorais',
  //   proporcao: '3/4',
  //   angulos: [
  //     { arquivo: 'cobra-1.jpg', alt: 'Cobra em blackwork descendo a panturrilha' },
  //     { arquivo: 'cobra-2.jpg', alt: 'A mesma cobra vista de lado, com a perna estendida' },
  //     { arquivo: 'cobra.mp4',   alt: 'Vídeo da cobra: a luz corre pelas escamas', capa: 'cobra-capa.jpg' },
  //   ],
  // },
  // {
  //   titulo: 'Lírio na clavícula',
  //   categorias: 'delicadas cicatrizadas',
  //   proporcao: '1/1',
  //   angulos: [
  //     { arquivo: 'lirio-1.jpg', alt: 'Lírio de traço fino sobre a clavícula, já cicatrizado' },
  //   ],
  // },
];

/* Desenhos autorais livres, esperando quem leve.
   O "nome" é o que aparece no cartão. */
const DISPONIVEIS = [
  // { arquivo: 'lua-ornamental.jpg', nome: 'Lua ornamental', alt: 'Lua ornamental com pontilhismo' },
];
