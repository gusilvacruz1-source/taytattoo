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
  // { arquivo: 'olho.png',    secao: 'trabalhos',   largura: 132, x: '3%',  y: '14%',  giro: -8,  fundura: 7 },
  // { arquivo: 'cobra.png',   secao: 'traco',       largura: 190, x: '82%', y: '58%',  giro: 12,  fundura: 5 },
  // { arquivo: 'lua.png',     secao: 'disponiveis', largura: 118, x: '6%',  y: '70%',  giro: -14, fundura: 9, opacidade: .8 },
  // { arquivo: 'rabisco.png', secao: 'agendar',     largura: 210, x: '76%', y: '10%',  giro: 6,   fundura: 4 },
];
