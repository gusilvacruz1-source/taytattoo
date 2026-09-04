# Sistema visual · Tay Machado

Documentado a partir do que foi construído, não do que se planejou.

## Leitura do brief

Portfólio de tatuadora, para quem chega do Instagram no celular e quer
agendar. Linguagem editorial darkwork. Dials: variância 8, movimento 6
(o "não precisa pesar a mão" da cliente derrubou de 7), densidade 3.

Referência de nível: o site da Eloize Betim, feito antes. Este é o
irmão escuro. Onde aquele alterna tinta e papel, este trava no escuro do
começo ao fim, por pedido da cliente. Onde aquele arredonda em 20px, este
não arredonda nada.

## Cor

| Papel | Valor | Onde |
|---|---|---|
| Breu | `#0B0B0C` | fundo da página inteira |
| Carvão | `#131315` | cartões, painéis, moldura da capa |
| Carvão alto | `#1B1B1E` | estado hover de superfície |
| Linha | `#2A2A2F` | fio de cabelo entre seções e cartões |
| Linha viva | `#3C3C43` | borda de botão fantasma e pontilhado |
| Osso | `#EDE7DD` | títulos e nome |
| Osso texto | `#C9C2B7` | corpo |
| Osso suave | `#A39C91` | etiquetas, meta, descrições secundárias |
| Cinza numeral | `#6F6960` | os "01 02 03" dos passos |
| Sangue | `#A32E24` | **único acento**: botão principal |
| Sangue alto | `#BE3A2D` | hover do botão principal |
| Brasa | `#D4685C` | o mesmo acento clareado: foco e sublinhado de link |

Estratégia: monocromático quente com **um acento só**. O vermelho ocupa
menos de 2% da superfície e aparece em três lugares: o botão de agendar, o
anel de foco e a seleção de texto. É assim que se faz darkwork sem pesar a
mão: o preto é campo, o vermelho é detalhe.

Contraste medido sobre o breu: osso 15,5:1 · osso-texto 11,1:1 ·
osso-suave 7,1:1 · cinza-numeral 3,6:1 (texto grande) · osso sobre
sangue 5,6:1. Texto secundário é tingido do mesmo matiz quente, nunca
cinza neutro.

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

**Raio zero em tudo.** Botões, cartões, painéis, campos, moldura. Uma
escala só, sem exceção documentada. Blackwork não tem canto arredondado, e
a página é uma folha de flash, não um app.

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
E a pele é a daqui, escura e sem raio, porque a cliente pediu o oposto do
tema claro daquele site.

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

Quatro gestos, cada um com uma razão:

| Gesto | Por que existe | Ingredientes |
|---|---|---|
| Peça sobe por `clip-path` | hierarquia: o trabalho entra em cena | transição CSS .9s, `--saida`, gatilho em `top 90%` |
| Cartão desliza ao filtrar | evita o teleporte, mostra que é o mesmo cartão | FLIP à mão, `power3.inOut`, .65s |
| Cinza que vira cor no hover | a recompensa por parar em cima da peça | `filter` .5s, só em `hover:hover` e `pointer:fine` |
| Figurinhas com parallax | delight, a faixa rara | `yPercent` com `scrub`, entrada em `back.out(1.6)` |
| Bolinha do cursor | feedback: diz onde a mão pode ir | `gsap.quickTo`, `power3`, .35s |

A bolinha cresce por **escala**, nunca por largura ou altura, e o cursor
do sistema continua visível por baixo: escondê-lo quebra quem depende
dele. Ela é a única forma redonda do site, e é uma exceção declarada à
regra de raio zero, porque é um ponteiro e não uma superfície. Some no
toque e em movimento reduzido, onde o JS a remove do documento.

O cinza que vira cor mora dentro de `@media (hover:hover) and
(pointer:fine)`. No celular não existe hover: fora dessa media query a
foto nasce colorida, em vez de ficar cinza para sempre.

O hover magnético dos botões anda no máximo 8px e volta em
`elastic.out(1, .4)`: a ida é curta porque é feedback, a volta é que sobra.

Uma rede de segurança roda dois segundos depois de carregar: chama
`ScrollTrigger.refresh()` e, para o que ainda estiver escondido dentro da
tela, põe `data-vista` na mão.

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
