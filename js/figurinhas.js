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

   Regra de ouro: no máximo duas por seção. Passou disso vira poluição,
   e a página deixa de ser sobre o traço da Tay.
   ===================================================================== */

const FIGURINHAS = [
  /* As artes são JPG de fundo preto. O CSS as compõe em "screen", que
     apaga o preto e deixa só o traço claro, e por cima passa uma máscara
     radial que dissolve a borda do arquivo.

     As opacidades são cheias. Opacidade baixa aqui não deixa a figurinha
     discreta: deixa ela com ar de fantasma aceso, porque o traço perde
     corpo mas continua sendo a única coisa clara na tela. Em opacidade 1
     o "screen" sobre o breu devolve a arte com a força que ela tem no
     arquivo, e o preto do fundo continua sumindo do mesmo jeito.

     Para deixar alguma mais discreta, o caminho é diminuir a "largura",
     não a opacidade.

     Campo "contraste": use só em arte de fundo fotográfico, cujo preto
     não é preto de verdade e aparece como halo claro em volta. Nunca em
     arte pontilhada, onde ele come os pontos. */

  /* Trabalhos: a filigrana à direita e o arame descendo pela esquerda. */
  { arquivo: 'filigrana.jpg',     secao: 'trabalhos',   largura: 260, x: '87%', y: '14%', giro: 7,   fundura: 8, opacidade: 1 },
  { arquivo: 'arame.jpg',         secao: 'trabalhos',   largura: 230, x: '1%',  y: '34%', giro: -4,  fundura: 7, opacidade: 1, contraste: 1.5 },

  /* Traço: o lírio à esquerda e o arabesco fechando à direita. */
  { arquivo: 'lirio.jpg',         secao: 'traco',       largura: 240, x: '2%',  y: '52%', giro: -9,  fundura: 6, opacidade: 1 },
  { arquivo: 'arabesco.jpg',      secao: 'traco',       largura: 275, x: '86%', y: '8%',  giro: 8,   fundura: 4, opacidade: 1 },

  /* Disponíveis: as tulipas à direita e a flor vermelha à esquerda. A
     flor é a única cor da página fora o vermelho do botão, e por sorte é
     o mesmo vermelho de tinta. */
  { arquivo: 'tulipas.jpg',       secao: 'disponiveis', largura: 330, x: '82%', y: '10%', giro: 5,   fundura: 5, opacidade: 1 },
  { arquivo: 'flor-vermelha.jpg', secao: 'disponiveis', largura: 200, x: '4%',  y: '55%', giro: -11, fundura: 8, opacidade: 1 },

  /* Agendar: a mão do chifrinho. */
  { arquivo: 'mao.jpg',           secao: 'agendar',     largura: 210, x: '87%', y: '48%', giro: 9,   fundura: 7, opacidade: 1 },

  /* Contato: a pontilhada à direita e o olho à esquerda. O olho veio com
     fundo branco, por isso o "inverter". */
  { arquivo: 'pontilhada.jpg',    secao: 'contato',     largura: 360, x: '80%', y: '38%', giro: 10,  fundura: 7, opacidade: 1 },
  { arquivo: 'olho-grande.jpg',   secao: 'contato',     largura: 225, x: '3%',  y: '52%', giro: -7,  fundura: 6, opacidade: 1, inverter: true },

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
  // { arquivo: 'brilho.jpg',        secao: 'trabalhos', largura: 180, x: '2%',  y: '46%', giro: -5, fundura: 5, opacidade: 1 },
  // { arquivo: 'linhas.jpg',        secao: 'agendar',   largura: 170, x: '1%',  y: '20%', giro: -6, fundura: 9, opacidade: 1 },
  // { arquivo: 'olho-meiotom.jpg',  secao: 'traco',     largura: 120, x: '90%', y: '52%', giro: -5, fundura: 6, opacidade: 1, inverter: true },
  // { arquivo: 'olhos.jpg',         secao: 'capa',      largura: 160, x: '4%',  y: '50%', giro: -8, fundura: 6, opacidade: 1 },
  // { arquivo: 'flor-lateral.jpg',  secao: 'capa',      largura: 120, x: '6%',  y: '50%', giro: 12, fundura: 7, opacidade: 1 },
];
