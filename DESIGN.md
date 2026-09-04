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

1. **Capa** · split assimétrico 1.05fr / .95fr, texto à esquerda e moldura
   de retrato 4:5 à direita. `min-height: 100dvh`, nunca `vh`.
2. **Trabalhos** · masonry em `columns: 3`, que vira 2 e depois 1.
3. **Traço** · linhas de índice, duas colunas, divisória **só entre** as
   linhas, nunca em cima e embaixo de cada uma.
4. **Disponíveis** · trilho horizontal com `scroll-snap-type: x mandatory`.
5. **Agendar** · sequência vertical com recuo crescente: cada passo anda
   para a direita conforme avança.
6. **Contato** · faixa de duas colunas, texto à esquerda e lista de canais
   à direita.

## Ícones

Tabler Icons 3.31.0 (MIT), copiados do pacote e servidos como sprite SVG no
topo do documento, referenciado por `<use>`. Traço 2, pontas redondas,
viewBox 24. Nenhum ícone desenhado à mão. **Nenhum emoji na interface.**

A única forma autoral é o selo: um monograma circular com o nome em volta e
uma espiral no centro, gerada como espiral arquimediana. É provisório, sai
quando o logo real da Tay chegar.

## Movimento

Um único momento autoral: **o selo**. O anel de texto gira em 120s e a
espiral se desenha em 3,2s com `stroke-dashoffset`. Nenhuma outra parte da
página repete esse gesto.

Entrada da capa: cada linha sobe 110% de dentro de uma máscara, escalonada
em 100ms, com `cubic-bezier(.16,1,.3,1)`. O **repouso é o estado visível** e
a animação parte do escondido com `both`: se ela não rodar, a capa aparece
inteira em vez de ficar em branco.

Revelação na rolagem: `IntersectionObserver`, nunca `addEventListener
('scroll')`. Micro-interações em 220 a 300ms com a mesma curva: cartão de
peça em `scale(1.035)`, seta do botão em `translateX(4px)`, botão em
`translateY(1px)` no `:active`.

`prefers-reduced-motion: reduce` zera animação e transição, revela tudo e
fixa a espiral desenhada.

## Superfícies do navegador

Seleção em sangue sobre osso · foco visível em contorno brasa de 2px com
3px de deslocamento · barra do trilho horizontal fina, em linha viva ·
grão em camada única fixa, `pointer-events: none`, opacidade .05, fora de
qualquer container que role.

## Dívida conhecida

- **A página não tem uma foto.** É a dívida que mais pesa, e não é técnica:
  as fotos ainda não chegaram. Duas seções são estado vazio apontando para o
  Instagram. Elas se preenchem sozinhas conforme os arquivos entram em
  `js/trabalhos.js`.
- A rede de segurança da revelação mede a tela uma vez, dois segundos depois
  de carregar, para contextos em que o observer responde mas nunca acusa
  interseção (aba de fundo, captura headless, algumas webviews). O que está
  abaixo da dobra nesses contextos continua dependendo do observer.
