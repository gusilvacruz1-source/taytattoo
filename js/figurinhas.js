/* =====================================================================
   AS FIGURINHAS

   Adesivos que ficam colados no fundo das seções, atrás do texto, e
   andam devagar quando a página rola. São decoração: não recebem clique
   e leitor de tela ignora.

   Para colar uma nova:
   1. Salve o PNG (com fundo transparente) em img/figurinhas/
   2. Copie uma linha de exemplo abaixo, tire as duas barras da frente
   3. Salve.

   Os campos:
     arquivo   nome do PNG dentro de img/figurinhas/
     secao     onde ela cola. Vale: capa, trabalhos, traco,
               disponiveis, agendar, contato
     largura   largura em pixels no desktop (encolhe junto no celular)
     x, y      posição dentro da seção, em %. Prefira as bordas: o meio
               é do texto.
               Pode passar da borda: a seção corta o excesso, e a
               figurinha sangra para fora do texto sem empurrar a página
               nem criar rolagem lateral.
               **Mantenha o y entre 5% e 55%.** Mais para baixo a
               figurinha vaza pela borda da seção, e o bloco seguinte a
               corta em linha reta: aparece o retângulo dela.
     giro      inclinação em graus. Um adesivo colado à mão nunca fica reto.
     fundura   o quanto ela anda no scroll, de 2 (quase parada) a 14
               (bem solta). Acima de 14 embrulha o estômago.
     opacidade opcional, de 0 a 1. O padrão é 1.

   O ARCO é o outro jeito de colar. Em vez de ficar num canto, a arte
   atravessa a seção inteira de uma parede à outra, pendurada como fio.
   Hoje só o arame usa. Os campos mudam:

     arco      true, e aí valem os campos abaixo em vez de largura e x
     y         a linha do fio, contando do alto da seção. Aceita qualquer
               medida do CSS, e vale usar clamp() para o arco não cair em
               cima do título no celular
     elo       o tamanho de cada pedaço de fio, em pixels. É ele que dá a
               espessura: quanto menor o elo, mais fino o arame. O número
               de pedaços o site calcula sozinho pela largura da tela
     curva     quanto o arco levanta no meio, em graus na ponta. 0 é reto

   Regra de ouro: no máximo duas por seção. Passou disso vira poluição,
   e a página deixa de ser sobre o traço da Tay.
   ===================================================================== */

const FIGURINHAS = [
  /* As artes são WebP com transparência de verdade, geradas a partir dos
     JPG que a Tay mandou. Os .jpg continuam na pasta como fonte, mas o
     site não os carrega.

     Antes eram os próprios JPG, de fundo preto, compostos em "screen"
     para o preto sumir. Funcionava só enquanto o navegador não isolasse a
     mistura — quando ele isola, e Safari e iOS isolam, o preto volta e
     aparece o retângulo do arquivo colado por cima da seção. Com alfa no
     arquivo não há o que sumir, e sumiram junto os dois remendos que
     existiam: "inverter", para arte de fundo branco, e "contraste", para
     fundo fotográfico cujo preto não era preto.

     As opacidades são cheias. Opacidade baixa aqui não deixa a figurinha
     discreta: deixa ela com ar de fantasma aceso, porque o traço perde
     corpo mas continua sendo a única coisa clara na tela. Para deixar
     alguma mais discreta, o caminho é diminuir a "largura". */

  /* Trabalhos: a filigrana à direita e o arame atravessando por cima.

     O arame é o único em arco: ele é um fio, e fio que começa e acaba
     dentro do quadro vira objeto. Pendurado de uma parede à outra,
     cortado pelas duas, ele volta a ser fio. Fica na faixa vazia acima do
     título, que é o único lugar da seção onde ele atravessa inteiro sem
     passar por cima de nada. */
  { arquivo: 'filigrana.webp',     secao: 'trabalhos',   largura: 260, x: '87%', y: '14%', giro: 7,   fundura: 8, opacidade: 1 },
  { arquivo: 'arame.webp',         secao: 'trabalhos',   arco: true, elo: 145, curva: 9, y: 'clamp(38px, 9vw, 120px)', fundura: 5, opacidade: 1 },

  /* Traço: o lírio à esquerda e o arabesco fechando à direita. */
  { arquivo: 'lirio.webp',         secao: 'traco',       largura: 240, x: '2%',  y: '52%', giro: -9,  fundura: 6, opacidade: 1 },
  { arquivo: 'arabesco.webp',      secao: 'traco',       largura: 275, x: '86%', y: '8%',  giro: 8,   fundura: 4, opacidade: 1 },

  /* Disponíveis: as tulipas à direita e a flor vermelha à esquerda. A
     flor é a única cor da página fora o vermelho do botão, e por sorte é
     o mesmo vermelho de tinta. */
  { arquivo: 'tulipas.webp',       secao: 'disponiveis', largura: 330, x: '82%', y: '10%', giro: 5,   fundura: 5, opacidade: 1 },
  { arquivo: 'flor-vermelha.webp', secao: 'disponiveis', largura: 200, x: '4%',  y: '55%', giro: -11, fundura: 8, opacidade: 1 },

  /* Agendar: a mão do chifrinho. */
  { arquivo: 'mao.webp',           secao: 'agendar',     largura: 210, x: '87%', y: '48%', giro: 9,   fundura: 7, opacidade: 1 },

  /* Contato: a pontilhada à direita e o olho à esquerda. O olho veio com
     fundo branco, e o recorte já resolveu isso no arquivo. */
  { arquivo: 'pontilhada.webp',    secao: 'contato',     largura: 360, x: '80%', y: '38%', giro: 10,  fundura: 7, opacidade: 1 },
  { arquivo: 'olho-grande.webp',   secao: 'contato',     largura: 225, x: '3%',  y: '52%', giro: -7,  fundura: 6, opacidade: 1 },

  /* ------------------------------------------------------------------
     Cinco ficaram fora do ar. Para pôr qualquer uma, tire as barras.

     brilho e linhas: não são desenho de traço, são imagens de área
     cheia. O brilho é um estouro de luz que ocupa o quadro inteiro, e o
     fundo das linhas é azul-marinho em vez de preto. Sob "screen" os
     dois levantam um retângulo claro que a máscara não dissolve, e na
     página parecem mancha, não adesivo.

     olho-meiotom: veio com o quadriculado de transparência assado dentro
     do JPG. Mesmo invertido, o xadrez aparece como textura.

     olhos e flor-lateral: a página já está no teto de duas figurinhas
     por seção, que é a regra escrita aqui em cima.

     Nos três primeiros casos, o conserto de verdade é recortar o fundo e
     salvar em PNG com transparência.
     ------------------------------------------------------------------ */
  // { arquivo: 'brilho.webp',        secao: 'trabalhos', largura: 180, x: '2%',  y: '46%', giro: -5, fundura: 5, opacidade: 1 },
  // { arquivo: 'linhas.webp',        secao: 'agendar',   largura: 170, x: '1%',  y: '20%', giro: -6, fundura: 9, opacidade: 1 },
  // { arquivo: 'olho-meiotom.webp',  secao: 'traco',     largura: 120, x: '90%', y: '52%', giro: -5, fundura: 6, opacidade: 1 },
  // { arquivo: 'olhos.webp',         secao: 'capa',      largura: 160, x: '4%',  y: '50%', giro: -8, fundura: 6, opacidade: 1 },
  // { arquivo: 'flor-lateral.webp',  secao: 'capa',      largura: 120, x: '6%',  y: '50%', giro: 12, fundura: 7, opacidade: 1 },
];
