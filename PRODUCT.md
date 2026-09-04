# Tay Machado · Arte Tattoo

## O que é
Site de uma tatuadora só: a Tay Machado (@tay_arte_tattoo). Não é o site do
estúdio. O OctoInk aparece porque ela é a fundadora e atende lá, mas os
outros artistas da casa não entram aqui.

## Mecanismo próprio
Não há formulário, não há checkout e não há agenda automática. O site existe
para levar a pessoa até o direct da Tay já sabendo o que mandar: referência,
lugar do corpo e tamanho. O orçamento sai na conversa, como já sai hoje.

Hoje o link da bio dela é um site do Canva
(`taymachadotatuadora.my.canva.site/agendamentos`). É esse link que este
site substitui.

## Quem usa, onde
Quase sempre no celular, vindo de um story ou do link da bio no Instagram.
Olha rápido, quer ver traço e saber como agendar.

## Verdade do produto (não inventar)
Tudo abaixo saiu do perfil dela ou do WhatsApp da própria cliente.

- Nome: **Tay Machado**. Perfil: **@tay_arte_tattoo**, 80 posts, 2.530
  seguidores.
- Bio: "Tattooer · founder @octo.inktattoo @ilustra_tay" e "Agendamentos de
  tatuo e projetos".
- **Fundadora do OctoInk Tattoo Studio** (@octo.inktattoo). O estúdio tem
  quatro artistas, e a bio dele diz "orçamentos direto com os artistas".
- Segunda conta, de ilustração: **@ilustra_tay**.
- Destaques do perfil: **Delicadas** e **Disponíveis**.
- Briefing dela, por escrito: "gostaria que trouxesse uma vibe mais escura
  sem perder os detalhes, voltado mais para o darkwork, mas não precisa
  pesar a mão, quero que ainda sim tenha seu traço profissional".
- Sem preço, sem prazo, sem política de sinal, sem endereço e sem horário
  publicados. **Não afirmar nenhum.**
- Sem foto nem vídeo no site ainda. Ela ficou de mandar os dois.
- Telefone: **(42) 9125-1759**, lido da conversa dela com o Gu. Está
  publicado. Ver a pendência 4 sobre a contagem de dígitos.

## Pendências (o que precisa vir da Tay)
0. **Confirmar as abas do filtro.** Hoje são Autorais, Delicadas,
   Blackwork e Cicatrizadas. "Delicadas" veio do destaque do perfil dela
   e "blackwork" do briefing que ela escreveu; as outras duas são leitura
   nossa. Vale ela dizer como divide o próprio trabalho.
1. **Fotos e vídeos dos trabalhos.** É a lacuna que mais pesa: duas das seis
   seções hoje são estado vazio apontando para o Instagram.
2. **A moldura da capa**, que é o quadro no meio do nome. Aceita três
   coisas, e a primeira que existir manda: um **vídeo dela tatuando**
   (`img/retrato.mp4`, mudo e em loop), o **retrato parado**
   (`img/retrato.jpg`) ou, sem nenhum dos dois, o selo. A cliente pediu
   o vídeo tatuando; ele ainda não chegou.
3. **Vídeo de fundo da capa** (`img/hero-fundo.mp4`) e um quadro dele como
   poster (`img/hero-fundo.jpg`). Sem os dois, a capa fica no breu com o
   véu por cima, que continua legível.
4. **Desenhos disponíveis**, com nome de cada um, para a seção Disponíveis.
4. **Conferir os dígitos do WhatsApp.** O número está no ar como
   `(42) 9125-1759`, lido da conversa com ela. São 8 dígitos depois do DDD,
   e celular no Brasil tem 9 desde 2016: pode ser que o certo seja
   `(42) 99125-1759`. **Clique no botão do site e veja se abre a conversa
   dela.** Se não abrir, é só acrescentar um 9 nos dois lugares da mesma
   linha do `index.html` (o `href` e o texto visível) e no JSON-LD.
5. **As figurinhas.** Cinco já estão posicionadas no código, esperando o
   arquivo: `filigrana`, `lirio`, `tulipas`, `linhas` e `pontilhada`.
   Falta subir os PNGs em `img/figurinhas/` com esses nomes. **Confirmar
   antes quem é o autor de cada uma**: são artes que vão para o site
   comercial de uma tatuadora, e imagem achada na internet pode ter dono.
6. **Logo real** do selo. O que está no ar é um monograma provisório.
7. **Domínio**, se ela quiser um. Hoje o site sobe em subdomínio do Netlify.
8. **Estilos**: o texto da seção Traço descreve tatuagem autoral, delicadas e
   projeto ilustrado. "Delicadas" veio do destaque dela; os outros dois vieram
   da bio ("agendamentos de tatuo e projetos"). Vale ela confirmar a redação.
9. **Cidade, endereço e horário.** Não estão no site porque não foram
   confirmados. No rodapé há um comentário marcando o lugar deles, na
   coluna do estúdio: são as duas coisas que fazem alguém sair de casa.
10. **Política de idade.** O site da Eloize traz "não realizamos
   tatuagens em menores de 18 anos" no rodapé. Aqui a frase **não**
   entrou: é uma afirmação sobre a prática da Tay, e ninguém confirmou.
   Vale perguntar a ela e, se for o caso, acrescentar.

## Compromissos de marca
- Tema escuro do começo ao fim, sem seção clara no meio. É o pedido dela.
- Darkwork sem pesar a mão: o vermelho de tinta é o único acento e aparece
  em três lugares, não como campo.
- O nome dela é o maior elemento da página.

## Restrições técnicas
HTML, CSS e JS puros, sem build e sem dependência externa: nem fonte, nem
script, nem ícone vindos de fora. Publicado no Netlify a partir da raiz.
