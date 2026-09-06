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
     celular   opcional: { x, y, largura } só para tela estreita. No
               celular a seção vira uma coluna e o texto ocupa a largura
               inteira — o único vão que sobra é a faixa embaixo do último
               bloco. É para lá que estas medidas mandam a figurinha, e o
               y costuma ser calc(100% - alguma coisa), que conta do pé da
               seção e não depende da altura dela.
     soLargo   opcional: true some no celular. Use só quando não houver
               vão nenhum — ter lugar de celular é sempre melhor que
               sumir.

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

  /* Trabalhos: só a faixa de teia, atravessando o alto.

     Ela entrou no lugar do arame farpado a pedido da Tay — o arame ela
     achou lindo, mas a teia é a assinatura dela. E guarda o que o arame
     tinha de bom: atravessa de parede a parede, na faixa acima do título,
     que é o único vão desta seção, já que os cartões da galeria ocupam a
     largura inteira daí para baixo.

     A montagem é fixa e não sai daqui: um fio emendando o vão e um canto
     em cada parede, sempre. Não é configurável de propósito — a forma
     depende disso. Um canto só deixaria uma ponta solta; três repetiriam
     canto no meio da parede, onde canto não existe; e dois sem o fio do
     meio, que foi o que esteve no ar, leem como duas teias, que é
     exatamente o que a Tay pediu para não ser. Quem monta é montarTeia(),
     em js/script.js.

     A opacidade é meia de propósito: em cheio ela enterra o título, que
     passa por baixo dela. */
  { teia: 'arte',                  secao: 'trabalhos',   arquivo: 'teia-canto.webp', y: '0', fundura: 4, opacidade: .62 },


  /* Traço: só o corvo, na beirada da direita.

     O corvo entrou no lugar do lírio, e ficou na DIREITA, e não na
     esquerda: à esquerda ele cruzava o título, que é branco como ele.
     Uma seção inteira de texto não tem vão no meio — o lugar de figurinha
     aqui é sangrando pela lateral, na altura do título, do lado em que
     nenhuma linha começa.

     No celular ele sai de cena ("soLargo"). Ali a coluna é única e não
     existe lateral: mudar o lírio de lugar só trocaria qual parágrafo
     fica embaixo dele. Fica o arabesco, que é pontilhado e esparso e
     atravessa o texto sem disputar com ele. */
  { arquivo: 'corvo.webp',         secao: 'traco',       largura: 215, x: '81%', y: '4%',  giro: 5,   fundura: 6, opacidade: 1,
    celular: { x: '-7%',  y: 'calc(100% - 178px)', largura: 118 } },

  /* Disponíveis: o punhal à direita e a flor vermelha à esquerda.

     O punhal é do vocabulário que a Tay listou — teia, crisântemo, punhal
     e adaga, corvo, vela — e entrou no lugar das tulipas, que não eram.

     A flor vermelha continua sendo a única cor da página fora o acento.
     Ela era vermelha ao lado de um botão vermelho; agora o botão é verde,
     e vermelho e verde são opostos na roda: em vez de sumir um no outro,
     cada um segura o seu lado. Se algum dia ela incomodar, é uma linha. */
  { arquivo: 'punhal.webp',        secao: 'disponiveis', largura: 200, x: '83%', y: '6%',  giro: 6,   fundura: 5, opacidade: 1 },
  { arquivo: 'crisantemo.webp',    secao: 'disponiveis', largura: 320, x: '-2%', y: '42%', giro: -8,  fundura: 8, opacidade: 1,
    celular: { x: '52%',  y: 'calc(100% - 172px)', largura: 158 } },

  /* Agendar: a aranha em cima e as velas embaixo, as duas à direita.

     Aqui estava a mão do chifrinho, e antes dela uma teia que o site
     desenhava por conta. Saíram as duas: a mão porque não é do vocabulário
     da Tay, e a teia desenhada porque a arte dela chegou e uma teia
     calculada ao lado de uma rasgada é duas línguas na mesma página.

     A aranha ficou aqui, e não na galeria: lá a faixa de teia já ocupa o
     único vão da seção, e aranha em cima de teia vira mancha. */
  { arquivo: 'aranha.webp',        secao: 'agendar',     largura: 250, x: '76%', y: '6%',  giro: -5,  fundura: 6, opacidade: 1,
    celular: { x: '-8%',  y: 'calc(100% - 170px)', largura: 160 } },
  { arquivo: 'vela.webp',          secao: 'agendar',     largura: 230, x: '76%', y: '52%', giro: 3,   fundura: 5, opacidade: 1,
    celular: { x: '58%',  y: 'calc(100% - 168px)', largura: 150 } },

  /* Contato: a pontilhada à direita e a teia desenhada à esquerda.

     Esta teia é arte, e não a que o site desenha sozinho. Vale a troca
     porque ela é rasgada e irregular como teia de verdade é, e a
     desenhada é geométrica — boa para atravessar uma seção inteira, seca
     demais para ficar parada num canto.

     Ela mora abaixo do texto, e não ao lado: colada mais acima caía em
     cima do parágrafo, que é exatamente o que a Tay apontou no lírio. E
     sai de cena no celular, onde a coluna é única e não existe vão. */
  { arquivo: 'pontilhada.webp',    secao: 'contato',     largura: 360, x: '80%', y: '38%', giro: 10,  fundura: 7, opacidade: 1 },
  { arquivo: 'teia-arte.webp',     secao: 'contato',     largura: 300, x: '-7%', y: '40%', giro: -6,  fundura: 5, opacidade: 1,
    celular: { x: '-9%',  y: 'calc(100% - 180px)', largura: 155 } },

  /* ------------------------------------------------------------------
     TRÊS SAÍRAM DE CENA POR PEDIDO DA TAY, e os arquivos continuam na
     pasta. Ela listou o que usa nas criações dela — teia de aranha,
     crisântemo, punhal e adaga, corvo, vela — e estas três não são nada
     disso. Para trazer qualquer uma de volta, tire as barras da frente.

     O arame ela chamou de lindo, e saiu só porque a teia é a assinatura
     dela; se um dia quiser os dois, o arame volta em outra seção. */
  // { arquivo: 'arame.webp',        secao: 'trabalhos', largura: 230, x: '-4%', y: '34%', giro: -4, fundura: 7, opacidade: 1 },
  // { arquivo: 'tulipas.webp',      secao: 'disponiveis', largura: 330, x: '82%', y: '10%', giro: 5, fundura: 5, opacidade: 1 },
  // { arquivo: 'filigrana.webp',    secao: 'trabalhos', largura: 260, x: '87%', y: '22%', giro: 7, fundura: 8, opacidade: 1 },
  // { arquivo: 'lirio.webp',        secao: 'traco',     largura: 210, x: '-6%', y: '6%',  giro: -9, fundura: 6, opacidade: 1 },
  // { arquivo: 'flor-vermelha.webp',secao: 'disponiveis', largura: 200, x: '4%', y: '55%', giro: -11, fundura: 8, opacidade: 1 },
  // { arquivo: 'arabesco.webp',     secao: 'traco',     largura: 275, x: '86%', y: '8%',  giro: 8, fundura: 4, opacidade: 1 },
  // { arquivo: 'mao.webp',          secao: 'agendar',   largura: 210, x: '87%', y: '48%', giro: 9,  fundura: 7, opacidade: 1 },
  // { arquivo: 'olho-grande.webp',  secao: 'contato',   largura: 225, x: '3%',  y: '52%', giro: -7, fundura: 6, opacidade: 1 },

  /* ------------------------------------------------------------------
     E cinco nunca chegaram a entrar. Para pôr qualquer uma, idem.

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
