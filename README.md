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
js/script.js        menu, galerias, lupa e revelação na rolagem
img/trabalhos/      fotos e vídeos das peças fechadas
img/disponiveis/    desenhos livres
img/retrato.jpg     o retrato da capa (ainda não existe)
fonts/              Cormorant Garamond e Archivo, 72 KB somadas
PRODUCT.md          a verdade do negócio e as pendências
DESIGN.md           o sistema visual, como construído
```

## Publicar uma foto nova

1. Salve o arquivo em `img/trabalhos/` (ou `img/disponiveis/`).
2. Abra `js/trabalhos.js`. Tem uma linha de exemplo comentada lá dentro:
   tire as duas barras da frente e troque o nome do arquivo e a descrição.

```js
const TRABALHOS = [
  { arquivo: 'cobra-panturrilha.jpg', alt: 'Cobra em blackwork na panturrilha' },
];
```

3. Salve. A galeria se monta sozinha e a seção de "as fotos estão a caminho"
   some no mesmo instante.

Vale foto (`.jpg`, `.png`, `.webp`) e vídeo (`.mp4`, `.webm`). Em vídeo dá
para apontar uma capa: `capa: 'nome.jpg'`.

A descrição (`alt`) é lida em voz alta por leitores de tela e aparece se a
imagem falhar. Escreva o que se vê, nunca "tattoo 1".

## O retrato da capa

Salve o retrato como `img/retrato.jpg` (900x1125 ou maior) e ele entra
sozinho na moldura. Sem o arquivo, fica o selo girando, e está tudo bem.

## Publicar no Netlify

1. Entre em **netlify.com** e faça login **com o GitHub**.
2. **Add new site → Import an existing project → GitHub →** este repositório.
3. Não mexa em "Build command" nem em "Publish directory": o `netlify.toml`
   já diz que o site é a raiz e que não há nada para compilar.
4. **Deploy**.

## Pendências

Estão listadas em `PRODUCT.md`, com a origem de cada dado. As duas mais
urgentes: **as fotos** e a **confirmação do WhatsApp** (o bloco está pronto
e comentado no `index.html`, e não deve ir para o ar antes de a Tay
autorizar o número).
