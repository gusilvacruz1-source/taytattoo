# Sistema visual · Tay Machado

Documentado a partir do que foi construído, não do que se planejou.

## Leitura do brief

Portfólio de tatuadora, para quem chega do Instagram no celular e quer
agendar. Linguagem editorial darkwork. Dials: variância 8, movimento 6
(o "não precisa pesar a mão" da cliente derrubou de 7), densidade 3.

Referência de nível: o site da Eloize Betim, feito antes. Este é o
irmão escuro. Onde aquele alterna tinta e papel, este trava no escuro do
começo ao fim, por pedido da cliente. O raio é parecido, um pouco menor.

## Cor

Breu, osso e um acento. O acento é **verde escuro**, a pedido da Tay, e
continua sendo um só: o campo do botão principal, o anel de foco e a
seleção de texto. Em lugar nenhum mais.

| Token | Cor | Papel | Contraste |
|---|---|---|---|
| `--musgo` | `#265C41` | campo do botão principal | 6,3:1 com o osso por cima |
| `--musgo-alto` | `#2E7050` | o mesmo, um passo aceso, no hover | — |
| `--seiva` | `#4E9E77` | anel de foco, link, marca de caneta | 6,1:1 sobre o breu |

Os três saíram de conta, e não de olho. O verde do botão precisava de duas
coisas ao mesmo tempo: carregar texto osso por cima com folga sobre o
mínimo de 4,5:1, e ter sobre o breu a mesma presença que o vermelho
anterior tinha, para o botão não deixar de saltar. `#265C41` fecha os
dois — 6,3:1 com o osso e 2,5:1 com o breu, contra os 5,7:1 e 2,5:1 do
vermelho que saiu.

A **flor vermelha** continua sendo a única outra cor da página. Antes ela
era vermelha ao lado de um botão vermelho, e a justificativa era que os
dois se somavam; agora o botão é verde, e vermelho e verde são opostos na
roda. Em vez de um sumir no outro, cada um segura o seu lado. No celular
ela sai de cena, junto com as outras figurinhas densas.

## Tipografia

Duas vozes, servidas pelo próprio site em `fonts/` (subconjunto latino,
72 KB somadas). Sem Google Fonts: a página não faz **nenhuma** requisição a
terceiros.

**Display · Cormorant Garamond** (`--display`), variável 300 a 600.
Serifada de alto contraste e hastes muito finas. Escolhida porque o que
ela faz de mais reconhecível é o traço fino: o destaque "Delicadas" é um
destaque inteiro no perfil dela. Uma didone pesada ou um blackletter
gótico seriam o clichê que a própria cliente pediu para evitar ("não
precisa pesar a mão").

- Nome na capa `clamp(3.4rem, 10.5vw, 8.4rem)`, peso 300, entrelinha .86
- h2 de seção `clamp(2.1rem, 4.8vw, 3.6rem)`, peso 400
- Numerais dos passos `clamp(2.4rem, 5vw, 4rem)`, peso 300

Peso 300 de propósito: é o contraste grosso/fino que dá o ar editorial, e
peso alto achata a fonte.

**Interface · Archivo** (`--ui`), variável 400 a 700. Corpo, botões,
etiquetas, navegação. A mesma sans do site da Eloize: os dois sites vieram
da mesma mão e é bom que se pareçam de longe.

- Corpo `clamp(.95rem, 1.05vw, 1.0625rem)` / 1.68, medida máxima 54ch
- Botão `.78rem`, peso 600, caixa alta, tracking `.16em`
- Etiqueta de seção `.7rem`, peso 600, caixa alta, tracking `.24em`

A serifada **não** desce para corpo pequeno: abaixo de ~1.2rem as hastes
finas somem no celular.

## Forma

Tudo é redondo, e o quanto depende do papel:

| Papel | Raio | Onde |
|---|---|---|
| Superfície | `22px` | painel, vaga, cartão de flash, lista de canais, faixa |
| Peça da galeria | `26px` | a maior superfície da página, e a que carrega foto |
| Controle | pílula | botão, aba de filtro, botão de ícone, menu, link de pular, seta |
| Indicador | pílula | selo de ângulos, marca de ampliar, pontos da lupa, bolinha do cursor |
| Moldura da capa | arco | `50vw 50vw 22px 22px`: meia-lua em cima, canto de superfície embaixo |

**Nada fica reto.** Canto redondo convivendo com canto vivo na mesma tela
é o que faz uma página parecer quebrada, e pílula ao lado de retângulo de
12 é a mesma quebra em menor escala — foi por isso que o controle deixou de
ter raio próprio e virou pílula inteira, como no site da Eloize.

O arco da moldura é o mesmo gesto do site dela, e é o que dá o ar de coisa
desenhada em vez de caixa: a única forma da página que não é retângulo
arredondado.

**Sem sombra.** Sombra não se lê sobre breu. A profundidade vem de duas
coisas: a claridade da superfície (breu → carvão → carvão alto) e um fio de
cabelo de 1px. Declarado uma vez, nunca repetido por seção.

## Grade

Seis seções, seis famílias de layout diferentes. Nenhuma se repete:

1. **Capa** · vídeo cobrindo a seção inteira, véu por cima, e o nome e o
   retrato dividindo a mesma célula da grade: a foto na frente, as letras
   reaparecendo dos dois lados e embaixo. `min-height: 100dvh`, nunca `vh`.
   O nome fica numa linha só e o retrato tem 21vw: é o que garante letra
   sobrando de cada lado. Ele cruza o **terço de baixo** da foto, porque
   num enquadramento 4:5 o rosto fica em cima. No celular a composição se
   desfaz e o retrato desce para baixo do nome, onde ele caberia inteiro
   por cima das letras.
2. **Trabalhos** · masonry em `columns: 3`, que vira 2 e depois 1, com
   a barra de filtros por cima. Cada cartão é uma **peça**, não uma foto:
   o selo no canto diz quantos ângulos existem lá dentro, e a lupa
   caminha por eles.
3. **Traço** · linhas de índice, duas colunas, divisória **só entre** as
   linhas, nunca em cima e embaixo de cada uma.
4. **Disponíveis** · trilho horizontal com `scroll-snap-type: x mandatory`.
5. **Agendar** · sequência vertical com recuo crescente: cada passo anda
   para a direita conforme avança.
6. **Contato** · faixa de duas colunas, texto à esquerda e lista de canais
   à direita.

O **rodapé** é portado do site da Eloize: três colunas de links, a linha
legal separada por um fio, e o nome gigante cortado ao meio pela borda de
baixo. O corte é um contêiner de altura fixa, por volta de metade da
altura da letra, com o `overflow` do rodapé escondendo o resto: a palavra
some para dentro da margem em vez de terminar. O nome ali é massa, não
texto: fica em `#212126` e sai da árvore de acessibilidade.

## A galeria

Portada do site da Eloize Betim, feito antes pela mesma mão, com a mesma
ideia no centro: **o cartão é uma tatuagem, não uma foto.** Uma peça tem
o close, a foto de longe, o vídeo e a cicatrizada, e todos moram dentro
dela. Sem isso a grade vira um álbum onde a mesma tattoo aparece cinco
vezes e ninguém entende que é a mesma.

Seis mecanismos, todos portados:

1. **Peça com ângulos.** O primeiro ângulo é a capa. Os outros só
   aparecem quando a peça abre.
2. **Selo de ângulos** no canto do cartão, com o número e um triângulo
   quando um dos ângulos é vídeo. Sem ele ninguém descobre que há mais
   ali dentro.
3. **Filtros com FLIP feito à mão**: mede a posição de cada cartão, aplica
   o filtro, mede de novo e anima a diferença. O cartão desliza do lugar
   antigo para o novo em vez de teleportar.
4. **Aba só entra se tiver peça atrás dela**, e a barra some se sobrar só
   a "Todas". Filtro que abre no vazio é pior que filtro que não existe.
5. **Lupa por peça**, com título, legenda, contador "1 de 3", um ponto
   clicável por ângulo, setas, `Esc`, `←`, `→` e foco preso lá dentro,
   passando pelos pontos.
6. **`proporcao` por peça**, que reserva o espaço do cartão antes de a
   foto carregar. Sem isso a grade pula durante o carregamento.

Duas coisas mudaram de propósito. Os dados moram em `js/trabalhos.js`, e
não em JSON escapado dentro de atributo HTML como no site da Eloize:
quem mantém este site edita uma lista, não `&quot;` no meio da marcação.
E a pele é a daqui, escura, porque a cliente pediu o oposto do tema claro
daquele site.

## A fita do estúdio

A galeria é das peças: cada cartão é um desenho pronto na pele. As quatro
fotos de estúdio não são isso — são a Tay com a máquina na mão, e uma
cliente rindo no meio da sessão. Postas na galeria, virariam peças mal
fotografadas; deixadas de fora, o site inteiro não tem uma imagem de quem
tatua trabalhando.

Ficam no fim do Agendar, sob o olho **"No dia"**. Os três passos acima são
o combinado — mensagem, orçamento, sinal —, e a fita é o que acontece
depois dele. É o mesmo assunto continuado, não uma seção nova pedindo
atenção.

No desktop são quatro colunas iguais, `aspect-ratio:3/4`, em preto e
branco; a cor só volta no `:hover`, e só onde há mouse de verdade
(`hover:hover and pointer:fine`). O cinza é o que faz a fita não competir
com a galeria, que é colorida e é a matéria do site.

Abaixo de 720px a grade vira fita que rola de lado: `flex`, `overflow-x`,
`scroll-snap-type:x mandatory` e `flex:0 0 68%`. Empilhadas, quatro fotos
de 3/4 dão quase duas telas de rolagem para dizer uma coisa só. Os 68% e
a sangria até as bordas (`margin-inline` negativo) existem para a segunda
foto assomar na margem: é ela que conta que a fita anda.

## Ícones

Tabler Icons 3.31.0 (MIT), copiados do pacote e servidos como sprite SVG no
topo do documento, referenciado por `<use>`. Traço 2, pontas redondas,
viewBox 24. Nenhum ícone desenhado à mão. **Nenhum emoji na interface.**

A única forma autoral é o selo: um monograma circular com o nome em volta e
uma espiral no centro, gerada como espiral arquimediana. É provisório, sai
quando o logo real da Tay chegar.

## Movimento

O fundo da capa é vídeo, em preto e branco como as fotos, com um véu de
três paradas por cima. Sem o véu o Cormorant claro não se sustenta, e ele
fecha mais embaixo, onde ficam a frase e os botões. O vídeo **não** tem
`autoplay` no HTML: quem manda tocar é o JS, e só quando o visitante não
pediu menos movimento. Em `reduced-motion` fica o poster parado.

Um único momento autoral no primeiro plano: **o selo**. O anel de texto gira em 120s e a
espiral se desenha em 3,2s com `stroke-dashoffset`. Nenhuma outra parte da
página repete esse gesto.

Entrada da capa: cada linha sobe 110% de dentro de uma máscara, escalonada
em 100ms, com `cubic-bezier(.16,1,.3,1)`. O **repouso é o estado visível** e
a animação parte do escondido com `both`: se ela não rodar, a capa aparece
inteira em vez de ficar em branco.

Revelação na rolagem: ScrollTrigger, nunca `addEventListener('scroll')`. Micro-interações em 220 a 300ms com a mesma curva: cartão de
peça em `scale(1.035)`, seta do botão em `translateX(4px)`, botão em
`translateY(1px)` no `:active`.

`prefers-reduced-motion: reduce` zera animação e transição, revela tudo e
fixa a espiral desenhada.

## A camada de movimento

GSAP 3.12.7 e ScrollTrigger, tirados do pacote do npm e servidos pelo
próprio site em `js/vendor/` (116 KB). Não há CDN: a página continua sem
nenhuma requisição a terceiros.

**Nada depende do GSAP para ser legível.** A classe `.motion` só entra no
`<html>` depois que o GSAP responde presente e o visitante não pediu menos
movimento. É essa classe que autoriza o CSS a esconder qualquer coisa. Sem
ela, a página aparece inteira. Nenhum `gsap.from` esconde conteúdo: um
`from` com ScrollTrigger deixa o elemento invisível até o gatilho disparar,
e se ele nunca dispara a seção some para sempre. Quem esconde é o CSS, sob
`.motion`, e quem revela é um `onEnter` que põe `data-vista`.

Cada gesto tem uma razão. Nenhum existe só para a página se mexer:

| Gesto | Por que existe | Ingredientes |
|---|---|---|
| Peça sobe por `clip-path` | hierarquia: o trabalho entra em cena | transição CSS .9s, `--saida`, gatilho em `top 90%` |
| Cartão desliza ao filtrar | evita o teleporte, mostra que é o mesmo cartão | FLIP à mão, `power3.inOut`, .65s |
| Cinza que vira cor no hover | a recompensa por parar em cima da peça | `filter` .5s, só em `hover:hover` e `pointer:fine` |
| Figurinhas com parallax | delight, a faixa rara | `yPercent` com `scrub`, entrada em `back.out(1.6)` |
| Bolinha do cursor | feedback: diz onde a mão pode ir | `gsap.quickTo`, `power3`, .35s |
| Arrastar entre ângulos | gesto: no celular a seta de 42px é alvo pequeno | segue o dedo a 60%, volta em `elastic.out(1, .55)` |
| Título sobe palavra por palavra | hierarquia: separa o título do texto que vem depois | máscara `.pal`, transição .85s, atraso de 55ms por palavra |
| Faixa que anda | ritmo: um respiro entre a galeria e o método | `@keyframes` CSS, 34s linear, duas fitas iguais |
| Linha dos passos se desenha | diz que aquilo é sequência, não lista | `scaleY` 0→1 com `scrub` ao longo da seção |
| Nome do rodapé emerge | chegada: a palavra sobe enquanto o site acaba | `yPercent` 38→0 com `scrub`, termina no último pixel da página |
| Selo do topo gira com a rolagem | é o único indicador de posição da página | `rotation: 360`, `scrub: .6`, `start: 0` até `max` |
| Rolagem com inércia | a roda do mouse move em degraus, e o degrau é o que faz um site parecer duro | Lenis 1.1.18, `duration: 1.1`, saída exponencial |
| Rabisco que se desenha | a marca de caneta chega escrevendo, como caneta chega | `stroke-dashoffset` 100→0, 1.1s, atraso de .25s |
| Figurinha que assenta | ela chega com a seção, em vez de já estar lá | sobe 26px, cresce de 93% e endireita a inclinação; 1,15s, `--saida` |
| Figurinha que balança | a página não fica parada enquanto ninguém rola | 7px e 1 grau, 8,5 a 16s, ease-in-out, vai e volta sem parar |

Os quatro últimos entraram juntos. Três deles são de rolagem contínua
(`scrub`), que é o oposto de animação que dispara: a pessoa é quem move, e
por isso pode voltar atrás sem nada engasgar. Todos falham abertos — a
faixa é CSS puro e anda mesmo sem o GSAP, e o título só se esconde debaixo
de `.motion`, de modo que sem GSAP ele nasce no lugar.

A faixa que anda é **uma só** na página inteira. Duas seriam enchimento: a
segunda deixaria de marcar um respiro e viraria papel de parede. Ela para
inteira em movimento reduzido, e o texto dela é decorativo, `aria-hidden`,
porque repete o que as seções já dizem.

Dentro da lupa dá para **arrastar** de um ângulo para o outro. Quase todo
mundo chega aqui pelo Instagram, no celular, e ali a seta de 42px é alvo
pequeno: o dedo quer arrastar. O arraste segue o dedo a 60% para ter peso,
troca de ângulo passando de 16% da largura do palco, e volta elástico se
não passar. Um arraste que termina em cima do palco não conta como
clique, senão fecharia a lupa sem querer.

A bolinha cresce por **escala**, nunca por largura ou altura, e o cursor
do sistema continua visível por baixo: escondê-lo quebra quem depende
dele. Ela é pílula, como os outros indicadores. Some no toque e em
movimento reduzido, onde o JS a remove do documento.

O cinza que vira cor mora dentro de `@media (hover:hover) and
(pointer:fine)`. No celular não existe hover: fora dessa media query a
foto nasce colorida, em vez de ficar cinza para sempre.

O hover magnético dos botões anda no máximo 8px e volta em
`elastic.out(1, .4)`: a ida é curta porque é feedback, a volta é que sobra.

Uma rede de segurança roda dois segundos depois de carregar: chama
`ScrollTrigger.refresh()` e, para o que ainda estiver escondido dentro da
tela, põe `data-vista` na mão.

## A teia

É a assinatura da Tay nas tatuagens e nas ilustrações, e por isso é o
único ornamento que se repete na página. Entrou no lugar do arame farpado
a pedido dela, guardando o que o arame tinha de bom: atravessar de parede
a parede.

O desenho é dela. Por um tempo o site desenhava a teia por geometria —
fios radiais e fios de captura calculados — porque a arte ainda não tinha
chegado; chegou, e a geometria saiu inteira. Teia de verdade é rasgada e
irregular, e nenhuma conta entrega isso.

O desenho é o que a Tay mandou: canto de teia nas duas pontas, fios
pendurados entre eles e uma aranha descendo por um deles. Ele já nasceu
para atravessar, ao contrário da arte anterior, que era uma teia redonda.

A teia **não estica de parede a parede: ela ancora nas duas e se emenda
pelo fio.** São três tentativas, e vale ficar escrito por que cada uma
falhou, porque a Tay reprovou duas delas.

**Esticar** foi o primeiro erro. A arte tem 368px de largura; espalhada num
monitor ela amplia três vezes, as células passam de 35px para 100 e o
desenho fica grosso e borrado. Pior: o corte no meio da arte virava um
risco reto atravessando a seção, e teia não tem risco reto.

**Ancorar duas cópias nas paredes, no tamanho natural**, resolveu o borrão
e criou o problema que ela apontou: sobravam 500px de nada no meio, e dois
cantos de teia com um vão entre eles são **duas teias**. Eu tinha escrito
aqui que o vão era certo, que "teia de verdade não cobre parede inteira".
Estava errado no que importava: uma teia pendurada num vão não é feita de
dois cantos soltos — é feita de um fio esticado com o bicho trabalhando nas
pontas. O vão sem fio não lia como respiro, lia como duas.

**A emenda estava na própria arte.** Ela tem um fio de amarração correndo
reto no topo, de ponta a ponta (linhas 28 a 48 do arquivo).
`teia-fio.webp` é uma fatia de 48px dele, tirada de uma faixa onde só ele
passa, e essa fatia se repete no tamanho natural pelo vão inteiro. O
resultado é um fio contínuo de parede a parede com a teia adensada nas duas
pontas — uma teia só.

Nada amplia em nenhum momento: o fio se **repete**, não estica, e os cantos
ficam no tamanho que o desenho pede. As três peças escalam por uma variável
única, `--esc`, e é ela que garante o essencial — que o fio do meio e o fio
dos cantos caiam sempre na mesma altura. Medido em cinco larguras: os três
elementos dão o mesmo topo, e o fio sobrepõe os dois cantos em todas.
Quando a tela estreita a ponto de os cantos se tocarem, o fio zera sozinho
e some, sem media query. O espelho é do CSS, então o navegador baixa a arte
uma vez só.

A opacidade é meia de propósito. Em cheio a teia enterra o título da
seção, que passa por baixo dela.

## Os motivos

A Tay listou o que usa nas criações dela: **teia de aranha, crisântemo,
punhal e adaga, corvo, vela**. É esse o vocabulário, e é ele que manda nas
figurinhas — as que não eram dele saíram (a mão do chifrinho, o olho, as
tulipas, a filigrana, o lírio, o arabesco), e os arquivos ficaram na pasta
com a linha comentada, para voltarem numa linha.

| Onde | O quê | Por quê ali |
|---|---|---|
| Trabalhos | a faixa de teia | é o único vão da seção: os cartões da galeria ocupam a largura inteira daí para baixo |
| Traço | o corvo, à direita | à esquerda ele cruzava o título, que é branco como ele |
| Disponíveis | o punhal e o crisântemo | o punhal na folga da direita, o crisântemo sangrando pela esquerda abaixo do texto |
| Agendar | a aranha e as velas | aranha aqui, e não na galeria: lá a faixa de teia já ocupa o vão, e aranha em cima de teia vira mancha |
| Contato | a pontilhada e uma teia | a teia abaixo do texto, nunca ao lado: mais acima ela caía no parágrafo |

### O vão do celular

No estreito a seção vira uma coluna só e o texto ocupa a largura inteira.
Não sobra lateral nenhuma — foi o que a Tay apontou quando o lírio caiu em
cima de uma descrição — e mudar a figurinha de lugar ali só troca qual
parágrafo fica embaixo dela.

Então o vão é **feito**, e não procurado: no celular cada seção abre 96px
a mais no rodapé, e é essa faixa que carrega o desenho. Ele fica inteiro,
sem encostar em linha nenhuma, e a página ganha um respiro entre seções
que ela não tinha no estreito.

Cada figurinha traz o próprio lugar de celular num campo `celular`, com x,
y e largura separados. O y costuma ser `calc(100% - alguma coisa)`, que
conta do pé da seção e por isso não depende da altura dela — a mesma linha
vale para uma seção de três parágrafos e para uma de dez.

As três medidas vão em variáveis CSS, e não direto no elemento: a troca
acontece por media query, então girar o aparelho basta, sem recarregar.
Sobrou o `soLargo`, que some com a figurinha no estreito, mas hoje nenhuma
usa: ter lugar de celular é sempre melhor que sumir.

## O nome

Cormorant Garamond continua sendo a voz de leitura da página, mas o nome
saiu dela: a Tay disse que estava "um pouco delicado", e o estúdio é
darkwork.

O nome agora é **Eater**, e vale só para ele: capa, cabeçalho e o nome
cortado do rodapé. Página inteira em blackletter deixa de ser gótica e
vira fantasia.

Ela foi escolhida entre cinco. A referência que a cliente mandou era a
Midnight Grave, que é fonte paga de uso comercial licenciado — e o que
chegou aqui foi a *imagem* do alfabeto dela, que o navegador não consegue
usar para escrever. Então montei o nome nas cinco góticas com licença OFL
que servem (livre para site comercial) e a escolha foi de vocês. A Eater
tem as pontas afiadas E o pingo da referência, e continua legível no
tamanho grande do nome — a Nosifer pinga mais, mas engorda as letras.

Na capa ele é **cromado**. Não é gradiente decorativo: é o desenho de como
metal polido reflete. Claro em cima, escurecendo até a linha do horizonte,
e no milímetro seguinte estourando em branco de novo, que é o chão
refletido. É a virada dura no meio que o olho lê como metal.

Nenhuma parada do gradiente desce abaixo de `#55514B`. Sobre o breu, preto
no gradiente não vira sombra: vira buraco, e a letra perde o corpo. O nome
do rodapé ficou fora do cromado — dois brilhos disputariam a mesma página.

## O vídeo da capa

Uma tatuagem de asas nas costas, em preto e branco, rodando atrás da capa
inteira com um véu por cima. É a primeira coisa que a página diz, e diz
sem texto: darkwork, preto fechado, peça grande.

Ele chegou como gravação de tela de iPhone, que vem em **HEVC** — formato
que só o Safari toca. Está no ar em dois arquivos: VP9 em `.webm` (578 KB,
que Chrome e Firefox escolhem) e H.264 em `.mp4` (1 MB, que o Safari pega).
O `<source>` do WebM vem primeiro, e quem não entender cai no seguinte.

O laço é em **vaivém**: o trecho corre até o fim e volta de ré, colado. Um
corte seco do fim para o começo num plano que se move devagar aparece como
solavanco a cada volta; em vaivém não há emenda para aparecer. Custa o
dobro de duração, e quase nada de peso, porque a metade de ré é o mesmo
material.

O começo foi cortado fora: os primeiros meio segundo traziam um aviso do
sistema operacional sobre gravação de tela. É a checagem que todo vídeo de
celular pede antes de subir.

Ele é mudo, roda em `loop`, e quem manda tocar é o JS — nunca o `autoplay`
do HTML. Quem pediu menos movimento fica com o poster parado.

## A entrada das figurinhas

A figurinha chega junto com a seção: sobe um palmo, cresce de 93% ao
tamanho e **assenta** na inclinação — entra torta para o lado contrário ao
dela e endireita, que é o gesto de um adesivo sendo pressionado. É a mesma
ideia do "adesivo colado à mão nunca fica reto", só que em movimento.

Ela vai em **três camadas**, e a divisão tem uma razão de engenharia: são
três movimentos e todos são `transform`, e um elemento só não carrega os
três — o GSAP reescreve o transform a cada quadro da rolagem e apagaria os
outros dois no meio do caminho.

| Camada | O que carrega | Quem move |
|---|---|---|
| `.fig` (berço) | o lugar na seção, a inclinação, o parallax | GSAP, na rolagem |
| `.fig__boia` | o balanço lento, que nunca para | keyframes do CSS |
| `.figurinha` (arte) | a entrada, que acontece uma vez | transição do CSS |

**O balanço** é de sete pixels e um grau, em ciclos de 8,5 a 16 segundos —
cada figurinha no seu tempo, e metade delas no sentido contrário. Se todas
tivessem a mesma duração elas subiriam e desceriam juntas, e um punhado de
coisas balançando em uníssono não parece vivo: parece máquina. Os números
vêm da ordem na lista, então são sempre os mesmos — o site não muda de
humor a cada visita.

É pequeno de propósito. Figurinha é fundo, e fundo que se mexe demais rouba
a leitura do texto que está por cima. O que se quer é que a página não
pareça parada, não que ela chame atenção para o canto.

**A opacidade não entra nisto, e é de propósito.** As figurinhas ficam
posicionadas em absoluto dentro da seção, e o gatilho de rolagem não é
garantido para elas: medindo com o movimento ligado, várias não chegavam a
receber o `data-vista`. Se a entrada apagasse a arte, um gatilho que falha
deixaria a figurinha invisível para sempre — que é exatamente o que este
site não faz em lugar nenhum.

Animando só o transform, o pior caso é uma figurinha 26px mais abaixo, 7%
menor e cinco graus mais torta. Num adesivo colado à mão isso não é
defeito: é outro jeito de estar colado.

Pelo mesmo motivo a faixa de teia **acende** em vez de nascer do nada:
começa em 45% da presença e sobe até a cheia. O pior caso é uma teia mais
fraca, e não uma seção sem teia.

## A rolagem

Lenis 1.1.18, servido do próprio site (`js/vendor/`, 13 KB). A roda do
mouse move a página em degraus, e cada degrau é um salto seco: é o que faz
um site parecer duro mesmo com tudo o mais no lugar. Com inércia a página
parte, corre e encosta.

Ele assume a rolagem inteira, então três coisas mudam junto: o
ScrollTrigger passa a ouvir o Lenis em vez do evento nativo, o relógio do
Lenis vira o do GSAP (dois relógios separados brigam e o parallax treme) e
o `scroll-behavior: smooth` do CSS sai, senão a âncora anda em dois tempos.
As âncoras internas passam pelo `scrollTo` do Lenis, descontando a altura
do cabeçalho fixo. A lupa dá `stop()` nele enquanto está aberta.

Nada disso roda em movimento reduzido: o bloco inteiro vive dentro do mesmo
`senão` que já exclui esse caso, e ali a página rola do jeito do navegador.

## Os rabiscos

Duas marcas de caneta na página inteira: uma volta em torno de "detalhe",
na frase da capa, e uma seta ligando o passo 01 ao 02. Cada uma aponta para
algo que já está escrito ali — a volta cerca a palavra que a própria Tay
usou no briefing, e a seta diz que aquilo é sequência.

Duas, e não uma por seção: a marca de caneta vale pela raridade. Repetida,
deixa de ser alguém apontando e vira textura.

São `<svg>` escritos no HTML, e não imagens: herdam a cor do CSS, ficam
nítidas em qualquer tela e o traço se desenha sozinho quando a seção chega.
O `pathLength="100"` declara que todo caminho mede 100, seja qual for o
tamanho real — sem isso o tracejado teria de ser medido em JS e remedido a
cada mudança de tela, porque a volta estica junto com a palavra que cerca.

## Acesso

Primeira parada do `Tab` é um link de pular, para quem navega por teclado
não atravessar o menu inteiro. Filtrar avisa quantas peças sobraram numa
região `aria-live`, porque a grade muda em silêncio para quem usa leitor
de tela. A lupa prende o foco enquanto está aberta, passando também pelos
pontos, e devolve o foco ao cartão de origem ao fechar. As abas do filtro
têm 44px de alvo de toque e `aria-pressed`. O selo de ângulos tem texto
só para leitor de tela, dizendo "peça com 3 ângulos" em vez de só "3".

## Superfícies do navegador

Seleção em sangue sobre osso · foco visível em contorno brasa de 2px com
3px de deslocamento · barra do trilho horizontal fina, em linha viva ·
grão em camada única fixa, `pointer-events: none`, opacidade .05, fora de
qualquer container que role.

## Dívida conhecida

- **A página não tem uma foto nem o vídeo.** É a dívida que mais pesa, e não é técnica:
  as fotos ainda não chegaram. Duas seções são estado vazio apontando para o
  Instagram. Elas se preenchem sozinhas conforme os arquivos entram em
  `js/trabalhos.js`.
- A rede de segurança da revelação mede a tela uma vez, dois segundos depois
  de carregar, para contextos em que o observer responde mas nunca acusa
  interseção (aba de fundo, captura headless, algumas webviews). O que está
  abaixo da dobra nesses contextos continua dependendo do observer.
