# Site da Tay Machado (@tay_arte_tattoo)

Site de uma página só para a tatuadora Tay Machado. HTML, CSS e JS puros,
sem framework e sem build. É só abrir o `index.html` no navegador.

Nenhuma dependência externa: as fontes são servidas pelo próprio site e os
ícones estão dentro do HTML. A página abre inteira sem internet de
terceiros, e continua legível mesmo se o JavaScript falhar.

## Ver na sua máquina

```
# opção 1: clique duplo em index.html

# opção 2: servidor local (recomendado, evita bloqueio de fonte)
python3 -m http.server 8080
# depois abra http://localhost:8080
```

## Estrutura

```
index.html          a página inteira
css/style.css       tokens, componentes e as seis seções
js/trabalhos.js     A LISTA DE FOTOS. É só aqui que se mexe para publicar
js/figurinhas.js    A LISTA DE ADESIVOS. Onde cada figurinha cola
js/script.js        menu, galerias, lupa, cursor e a camada de movimento
js/vendor/          GSAP e ScrollTrigger, servidos pelo próprio site
img/trabalhos/      fotos e vídeos das peças fechadas
img/disponiveis/    desenhos livres
img/retrato.jpg     o retrato da capa (ainda não existe)
img/hero-fundo.mp4  o vídeo de fundo da capa (ainda não existe)
img/figurinhas/     os adesivos em PNG (ainda vazio)
fonts/              Cormorant Garamond e Archivo, 72 KB somadas
PRODUCT.md          a verdade do negócio e as pendências
DESIGN.md           o sistema visual, como construído
```

## Publicar uma peça nova

**Cada cartão da grade é uma tatuagem, não uma foto.** Abrindo, as setas
passam pelos ângulos daquela mesma peça: o close, a foto de longe, o
vídeo, a cicatrizada. Como numa ficha de imóvel, em que se navega pelos
cômodos da mesma casa.

1. Salve os arquivos da peça em `img/trabalhos/`.
2. Abra `js/trabalhos.js` e copie o bloco de exemplo, tirando as barras.

```js
const TRABALHOS = [
  {
    titulo: 'Cobra na panturrilha',
    categorias: 'blackwork autorais',
    proporcao: '3/4',
    angulos: [
      { arquivo: 'cobra-1.jpg', alt: 'Cobra em blackwork descendo a panturrilha' },
      { arquivo: 'cobra-2.jpg', alt: 'A mesma cobra vista de lado' },
      { arquivo: 'cobra.mp4',   alt: 'Vídeo da cobra', capa: 'cobra-capa.jpg' },
    ],
  },
];
```

3. Salve. A grade, o selo de "3 ângulos" e as abas de filtro se montam
   sozinhos, e a seção de "as fotos estão a caminho" some no mesmo instante.

| Campo | O que é |
|---|---|
| `titulo` | o nome que aparece ao abrir. Escreva como você chamaria conversando |
| `categorias` | uma ou mais, separadas por espaço, dos ids em `CATEGORIAS`. Uma peça pode ser duas coisas: uma manga delicada já curada é `delicadas cicatrizadas` |
| `proporcao` | a forma do cartão: `3/4`, `1/1`, `4/5`. Reserva o espaço antes de a foto carregar, para a grade não pular |
| `angulos` | as fotos e vídeos DA MESMA peça. O primeiro é a capa |

Em cada ângulo: `arquivo`, `alt` e, só para vídeo, `capa` (um quadro dele).
Vale `.jpg`, `.png`, `.webp`, `.mp4` e `.webm`.

A descrição (`alt`) é lida em voz alta por leitores de tela e aparece se a
imagem falhar. Escreva o que se vê, nunca "tattoo 1".

### As abas do filtro

Saem da lista `CATEGORIAS`, no topo do mesmo arquivo. **Só aparece a aba
que tem peça atrás dela**, e a barra inteira some se sobrar só a "Todas":
filtro que abre no vazio é pior que filtro que não existe. Para criar uma
aba nova, acrescente em `CATEGORIAS` e use o mesmo id nas peças.

## A capa: retrato e vídeo de fundo

São três arquivos, todos opcionais. O que faltar, o site contorna sozinho.

A moldura do meio do nome funciona em **três degraus**. O primeiro que
existir manda, e nada precisa ser editado no código:

| Arquivo | O que é | Se faltar |
|---|---|---|
| `img/retrato.mp4` | **um vídeo dela tatuando**, mudo e em loop | cai para a foto |
| `img/retrato.jpg` | o retrato parado (e a capa do vídeo) | cai para o selo |
| `img/hero-fundo.mp4` | o vídeo que roda atrás da seção inteira, H.264 | fica só o breu |
| `img/hero-fundo.jpg` | um quadro do vídeo, para aparecer antes de ele carregar | nada aparece antes |

O vídeo é mudo, roda em loop e fica em preto e branco, igual às fotos. Ele
não toca para quem pediu menos movimento no sistema: nesse caso fica o
poster parado.

Vídeo de celular costuma vir em `.mov` e pesado. Converta antes de subir,
mirando menos de 1 MB:

```
# o vídeo de fundo da seção
ffmpeg -i entrada.mov -vcodec libx264 -crf 30 -an -vf scale=1280:-2 img/hero-fundo.mp4
ffmpeg -i img/hero-fundo.mp4 -vframes 1 -q:v 3 img/hero-fundo.jpg

# o vídeo da moldura, em pé (a moldura é 4:5)
ffmpeg -i tatuando.mov -vcodec libx264 -crf 30 -an -vf "scale=900:-2,crop=900:1125" img/retrato.mp4
ffmpeg -i img/retrato.mp4 -vframes 1 -q:v 3 img/retrato.jpg
```

O vídeo da moldura fica **mudo e em loop**, e não toca para quem pediu
menos movimento no sistema: nesse caso aparece o `retrato.jpg` parado.
Mire em menos de 2 MB: é o elemento central da capa e carrega antes de
tudo.

## Os quadrados de "foto aqui"

Enquanto não houver nenhuma peça publicada, a galeria mostra quadrados
tracejados e numerados no lugar de cada foto, com proporções
desencontradas de propósito, porque foto de tatuagem nunca vem toda do
mesmo tamanho.

**Eles somem sozinhos** no instante em que a primeira peça entrar em
`js/trabalhos.js`. Quem decide é a lista: não há botão nem endereço
especial para ligar ou desligar.

## Colar uma figurinha

Os adesivos ficam no fundo das seções, atrás do texto, e andam devagar
quando a página rola. São decoração pura: não recebem clique e leitor de
tela ignora.

1. Salve o PNG **com fundo transparente** em `img/figurinhas/`.
2. Abra `js/figurinhas.js` e copie uma das linhas de exemplo, tirando as
   duas barras da frente.

```js
const FIGURINHAS = [
  { arquivo: 'olho.png', secao: 'trabalhos', largura: 132,
    x: '3%', y: '14%', giro: -8, fundura: 7 },
];
```

| Campo | O que faz |
|---|---|
| `secao` | onde cola. Vale `capa`, `trabalhos`, `traco`, `disponiveis`, `agendar`, `contato` |
| `largura` | largura em pixels no desktop |
| `x`, `y` | posição dentro da seção, em %. Pode passar da borda: a seção corta o excesso |
| `giro` | inclinação em graus. Adesivo colado à mão nunca fica reto |
| `fundura` | o quanto anda no scroll, de 2 (quase parada) a 14 (solta) |
| `opacidade` | opcional, de 0 a 1 |

### As cinco que já estão posicionadas

O código já espera cinco figurinhas, cada uma com lugar, giro e fundura
definidos. **Suba o PNG com o nome exato** e ela aparece sozinha, sem
editar nada:

| Arquivo | Onde cola | O que é |
|---|---|---|
| `filigrana.jpg` | trabalhos, direita | os arabescos com as estrelinhas |
| `arame.jpg` | trabalhos, esquerda | o arame farpado |
| `lirio.jpg` | traço, esquerda | o lírio de traço fino |
| `arabesco.jpg` | traço, direita | o arabesco pontilhado |
| `tulipas.jpg` | disponíveis, direita | as tulipas gravadas |
| `flor-vermelha.jpg` | disponíveis, esquerda | a flor vermelha, a única cor da página fora o botão |
| `mao.jpg` | agendar, direita | a mão do chifrinho |
| `pontilhada.jpg` | contato, direita | a figura pontilhada |
| `olho-grande.jpg` | contato, esquerda | o olho, com `inverter: true` |

Arte que veio com **fundo claro** precisa de `inverter: true` na linha
dela. Sem isso o fundo branco vira um retângulo estourado; invertida, o
branco vira preto e some, e o traço escuro acende.

**Cinco ficaram fora do ar**, com a linha comentada em `js/figurinhas.js`:

- `brilho.jpg` e `linhas.jpg` não são desenho de traço, são imagens de
  área cheia. Sob `screen` as duas levantam um retângulo claro que a
  máscara não dissolve, e na página parecem mancha, não adesivo.
- `olho-meiotom.jpg` veio com o quadriculado de transparência assado
  dentro do JPG. Mesmo invertido, o xadrez aparece como textura.
- `olhos.jpg` e `flor-lateral.jpg` porque a página já está no teto de
  duas figurinhas por seção.

Nos três primeiros, o conserto de verdade é recortar o fundo e salvar em
PNG com transparência.

**As opacidades são cheias.** Opacidade baixa aqui não deixa a figurinha
discreta: deixa ela com ar de fantasma aceso, porque o traço perde corpo
mas continua sendo a única coisa clara na tela. Para deixar alguma mais
discreta, diminua a `largura`, não a opacidade.

Há dois ajustes de imagem opcionais por figurinha:

| Campo | Para quê |
|---|---|
| `inverter: true` | arte que veio com fundo claro. Sem isso o branco vira um retângulo estourado |
| `contraste: 1.5` | arte de fundo fotográfico, cujo preto não é preto de verdade e aparece como halo claro em volta. **Nunca use em arte pontilhada**: o contraste come os pontos |

Enquanto um arquivo não existe, nada acontece: o site remove a figurinha
em silêncio, sem deixar buraco na seção. Para trocar a posição de
qualquer uma, é só mexer nos números em `js/figurinhas.js`.

### Sobre os arquivos

As artes que estão no ar são **JPG de fundo preto**, e o site as compõe
em `mix-blend-mode: screen`, que apaga o preto e deixa só o traço claro.
Por cima disso vai uma **máscara radial** que dissolve a borda do arquivo:
sem ela, um JPG cujo fundo não é preto de verdade (o das linhas é
azul-marinho) entrega o próprio retângulo e vira um bloco colado na
seção.

Isso funciona bem para desenho de traço claro sobre fundo escuro, que é o
caso de todas. Se um dia chegar **PNG com transparência**, é melhor
ainda, e nada precisa mudar no código.

**Duas por seção, no máximo.** Passou disso a página deixa de ser sobre o
traço da Tay. E prefira as bordas: o meio é do texto. O conteúdo sempre
fica por cima, mas uma figurinha atrás de um título deixa o título pior
de ler mesmo estando embaixo.

## Publicar no GitHub Pages

O site é estático e mora na raiz do repositório, então o Pages serve ele
direto, sem workflow e sem build.

1. No repositório, abra **Settings** e clique em **Pages**, na coluna da
   esquerda.
2. Em **Source**, escolha **Deploy from a branch**.
3. Em **Branch**, escolha **main** e a pasta **/ (root)**. **Save**.

Um ou dois minutos depois o site fica em:

```
https://gusilvacruz1-source.github.io/taytattoo/
```

A partir daí, todo push na `main` republica sozinho.

Todos os caminhos do site são relativos, então ele funciona igual servido
nessa subpasta ou na raiz de um domínio próprio.

## Publicar no Netlify

1. Entre em **netlify.com** e faça login **com o GitHub**.
2. **Add new site → Import an existing project → GitHub →** este repositório.
3. Não mexa em "Build command" nem em "Publish directory": o `netlify.toml`
   já diz que o site é a raiz e que não há nada para compilar.

Dá para usar os dois ao mesmo tempo. O Netlify é o caminho se ela quiser
um domínio próprio depois.
4. **Deploy**.

## Pendências

Estão listadas em `PRODUCT.md`, com a origem de cada dado. As duas mais
urgentes: **as fotos e o vídeo**, e **conferir os dígitos do WhatsApp**
(clique no botão do site e veja se abre a conversa dela).
