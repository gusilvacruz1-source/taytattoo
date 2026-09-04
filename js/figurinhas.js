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
     x, y      posição dentro da seção, em % (0% 0% é o canto de cima
               à esquerda). Prefira as bordas: o meio é do texto.
     giro      inclinação em graus. Um adesivo colado à mão nunca fica reto.
     fundura   o quanto ela anda no scroll, de 2 (quase parada) a 14
               (bem solta). Acima de 14 embrulha o estômago.
     opacidade opcional, de 0 a 1. O padrão é 1.

   Regra de ouro: no máximo duas por seção. Passou disso vira poluição,
   e a página deixa de ser sobre o traço da Tay.
   ===================================================================== */

const FIGURINHAS = [
  /* As artes são JPG de fundo preto. O CSS as compõe em "screen", que
     apaga o preto e deixa só o traço claro. Por isso as opacidades são
     medidas: em screen sobre o breu, abaixo de ~.45 o traço some, e
     acima de ~.6 ele começa a competir com o trabalho da Tay, que é o
     assunto da página. */

  /* Trabalhos: a filigrana na borda direita. */
  { arquivo: 'filigrana.jpg',  secao: 'trabalhos',   largura: 150, x: '87%', y: '14%', giro: 7,   fundura: 8, opacidade: .55 },

  /* Traço: o lírio à esquerda e o arabesco fechando à direita. */
  { arquivo: 'lirio.jpg',      secao: 'traco',       largura: 140, x: '2%',  y: '58%', giro: -9,  fundura: 6, opacidade: .50 },
  { arquivo: 'arabesco.jpg',   secao: 'traco',       largura: 160, x: '86%', y: '8%',  giro: 8,   fundura: 4, opacidade: .46 },

  /* Disponíveis: as tulipas à direita e a flor vermelha à esquerda. A
     flor é a única cor da página fora o vermelho do botão, e por sorte
     é o mesmo vermelho de tinta. */
  { arquivo: 'tulipas.jpg',    secao: 'disponiveis', largura: 200, x: '82%', y: '10%', giro: 5,   fundura: 5, opacidade: .52 },
  { arquivo: 'flor-vermelha.jpg', secao: 'disponiveis', largura: 115, x: '4%', y: '62%', giro: -11, fundura: 8, opacidade: .55 },

  /* Agendar: as linhas à esquerda e a mão do chifrinho à direita. */
  { arquivo: 'linhas.jpg',     secao: 'agendar',     largura: 170, x: '1%',  y: '20%', giro: -6,  fundura: 9, opacidade: .50 },
  { arquivo: 'mao.jpg',        secao: 'agendar',     largura: 120, x: '85%', y: '58%', giro: 9,   fundura: 7, opacidade: .46 },

  /* Contato: a pontilhada e o olho, que precisa de "inverter" porque
     veio com fundo branco. */
  { arquivo: 'pontilhada.jpg', secao: 'contato',     largura: 220, x: '80%', y: '40%', giro: 10,  fundura: 7, opacidade: .50 },
  { arquivo: 'olho-grande.jpg', secao: 'contato',    largura: 130, x: '3%',  y: '66%', giro: -7,  fundura: 6, opacidade: .40, inverter: true },

  /* Três ficaram de fora. A flor de lado e os olhos originais, porque a
     página já está com duas figurinhas por seção, que é o teto que eu
     mesmo escrevi aqui em cima. E o olho de meio-tom porque veio com o
     quadriculado de transparência assado dentro do JPG: mesmo invertido,
     o xadrez aparece como textura. Para usá-lo de verdade, o caminho é
     recortar o fundo e salvar em PNG.

     Os olhos ficaram de fora: é a arte mais pesada das oito, de área
     cheia e alto contraste, e a cliente pediu "sem pesar a mão". Para
     pôr no ar, tire as barras da frente da linha abaixo. */
  { arquivo: 'brilho.jpg',     secao: 'trabalhos',   largura: 210, x: '2%',  y: '68%', giro: -5,  fundura: 5, opacidade: .30 },
  // { arquivo: 'olhos.jpg',        secao: 'capa',   largura: 160, x: '4%',  y: '62%', giro: -8, fundura: 6, opacidade: .22 },
  // { arquivo: 'flor-lateral.jpg',  secao: 'capa',   largura: 120, x: '6%',  y: '58%', giro: 12, fundura: 7, opacidade: .5 },
  // { arquivo: 'olho-meiotom.jpg',  secao: 'traco',  largura: 120, x: '90%', y: '70%', giro: -5, fundura: 6, opacidade: .4, inverter: true },
];
