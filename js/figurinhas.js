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
  /* As cinco abaixo já estão posicionadas e esperando o arquivo. Suba o
     PNG em img/figurinhas/ com o nome exato da coluna "arquivo" e ela
     aparece sozinha. Enquanto o arquivo não existe, nada acontece: o
     site remove a figurinha em silêncio, sem deixar buraco na seção. */

  /* A filigrana com as estrelinhas, na borda direita da galeria. */
  { arquivo: 'filigrana.png',  secao: 'trabalhos',   largura: 168, x: '86%', y: '16%', giro: 7,   fundura: 8, opacidade: .55 },

  /* O lírio, embaixo à esquerda, onde a lista de traços deixa espaço. */
  { arquivo: 'lirio.png',      secao: 'traco',       largura: 150, x: '2%',  y: '62%', giro: -9,  fundura: 6, opacidade: .5 },

  /* As tulipas gravadas, à direita dos desenhos disponíveis. */
  { arquivo: 'tulipas.png',    secao: 'disponiveis', largura: 196, x: '80%', y: '8%',  giro: 5,   fundura: 5, opacidade: .45 },

  /* As linhas orgânicas, à esquerda dos três passos. */
  { arquivo: 'linhas.png',     secao: 'agendar',     largura: 176, x: '3%',  y: '22%', giro: -6,  fundura: 9, opacidade: .5 },

  /* A figura pontilhada, grande, fechando a página no contato. */
  { arquivo: 'pontilhada.png', secao: 'contato',     largura: 230, x: '78%', y: '48%', giro: 10,  fundura: 7, opacidade: .4 },
];
