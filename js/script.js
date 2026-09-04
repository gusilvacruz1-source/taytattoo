/* =====================================================================
   TAY MACHADO · ARTE TATTOO
   Sem framework, sem build, sem dependência externa.
   Cinco coisas: menu, retrato, galerias, lupa e revelação na rolagem.
   Tudo colapsa em prefers-reduced-motion.
   ===================================================================== */
(function () {
  'use strict';

  var pouca = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var temGsap = (typeof gsap !== 'undefined') && (typeof ScrollTrigger !== 'undefined');
  function revelar(el) { el.setAttribute('data-vista', ''); }

  /* Cada palavra do título de seção ganha a própria máscara, para
     entrarem escalonadas em vez de o bloco inteiro aparecer de uma vez.
     Só onde o título é texto puro: dividir um elemento com marcação
     dentro apagaria os links. */
  Array.prototype.slice.call(document.querySelectorAll('.titulo')).forEach(function (t) {
    if (t.children.length) return;
    var palavras = t.textContent.trim().split(/\s+/);
    t.textContent = '';
    palavras.forEach(function (palavra, i) {
      var mascara = document.createElement('span');
      mascara.className = 'pal';
      mascara.style.setProperty('--i', i);
      var dentro = document.createElement('span');
      dentro.textContent = palavra;
      mascara.appendChild(dentro);
      t.appendChild(mascara);
      if (i < palavras.length - 1) t.appendChild(document.createTextNode(' '));
    });
  });

  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ------------------------------------------------ menu no celular */
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var aberto = nav.hasAttribute('data-aberto');
      if (aberto) nav.removeAttribute('data-aberto');
      else nav.setAttribute('data-aberto', '');
      menuBtn.setAttribute('aria-expanded', String(!aberto));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;
      nav.removeAttribute('data-aberto');
      menuBtn.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !nav.hasAttribute('data-aberto')) return;
      nav.removeAttribute('data-aberto');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.focus();
    });
  }

  /* ---------------------------------------------------- vídeo da capa */
  /* Sem autoplay no HTML de propósito: quem manda tocar é o JS, e só
     quando o visitante não pediu menos movimento. Em reduced-motion fica
     o poster parado. Sem os arquivos, o elemento não pinta nada e sobra
     o breu com o véu por cima, que é um degradê discreto e serve. */
  var video = document.getElementById('capaVideo');
  if (video && !pouca) {
    var tocar = function () { video.play().catch(function () {}); };
    if (video.readyState >= 2) tocar();
    else video.addEventListener('loadeddata', tocar, { once: true });
  }

  /* --------------------------------------------------------- retrato */

  /* A moldura da capa tem três degraus, e o arquivo é quem manda: o
     vídeo dela tatuando ganha da foto parada, que ganha do selo. Nada
     precisa ser editado aqui: cada um aparece se o arquivo existir, e
     some sem barulho se não existir. */
  var retratoVideo = document.getElementById('retratoVideo');
  var retrato = document.getElementById('retrato');

  function assumirMoldura(el) {
    el.hidden = false;
    var selo = document.querySelector('.capa__selo');
    if (selo) selo.remove();
  }

  function assumirVideo() {
    assumirMoldura(retratoVideo);
    if (retrato) retrato.remove();       /* o vídeo já traz o poster */
    if (!pouca) retratoVideo.play().catch(function () {});
  }

  function assumirFoto() {
    if (retratoVideo && !retratoVideo.hidden) return;   /* o vídeo já assumiu */
    assumirMoldura(retrato);
  }

  if (retratoVideo) {
    retratoVideo.addEventListener('loadeddata', assumirVideo, { once: true });

    /* Sem o mp4 o elemento sai de cena e a foto assume. Se ele ficasse,
       o poster dele mostraria a foto parada e a foto real entraria por
       baixo, duplicada. */
    retratoVideo.addEventListener('error', function () { retratoVideo.remove(); });

    /* Estes dois "se já estiver pronto" não são zelo excessivo: o vídeo
       e a foto estão escritos no HTML, então o navegador começa a
       baixá-los antes deste script existir. Quando o arquivo vem do
       cache, ele termina de carregar ANTES de a gente escutar, o evento
       nunca chega e a moldura fica no selo para sempre. Foi o que
       aconteceu no primeiro teste com a foto no lugar. */
    if (retratoVideo.readyState >= 2) assumirVideo();
  }

  if (retrato) {
    retrato.addEventListener('load', assumirFoto);
    if (retrato.complete && retrato.naturalWidth > 0) assumirFoto();
  }

  /* -------------------------------------------------------- galerias */

  var VIDEO = /\.(mp4|webm|mov)$/i;

  /* Monta a mídia de UM ângulo. Vídeo e foto entram pelo mesmo lugar. */
  function midiaDe(a, pasta, adiantada) {
    var src = pasta + a.arquivo;
    var el;

    if (VIDEO.test(a.arquivo)) {
      el = document.createElement('video');
      el.src = src;
      el.muted = true;
      el.loop = true;
      el.playsInline = true;
      el.preload = 'metadata';
      if (a.capa) el.poster = pasta + a.capa;
    } else {
      el = document.createElement('img');
      el.src = src;
      el.alt = a.alt || '';
      el.loading = adiantada ? 'eager' : 'lazy';
      el.decoding = 'async';
    }
    return el;
  }

  function temVideo(angulos) {
    return angulos.some(function (a) { return VIDEO.test(a.arquivo); });
  }

  /* Cada cartão é uma TATUAGEM, não uma foto: os ângulos moram dentro
     dele e só aparecem quando a peça abre. */
  function montarGaleria(lista) {
    var alvo = document.getElementById('galeria');
    var vazio = document.getElementById('galeriaVazia');
    var filtros = document.getElementById('filtros');
    var nota = document.getElementById('galeriaNota');

    var itens = (lista || []).filter(function (p) {
      return p && p.angulos && p.angulos.length && p.angulos[0].arquivo;
    });

    if (!alvo || !itens.length) return [];

    if (vazio) vazio.remove();
    alvo.hidden = false;
    if (nota) nota.hidden = false;

    itens.forEach(function (peca, i) {
      var capa = peca.angulos[0];

      var botao = document.createElement('button');
      botao.className = 'peca';
      botao.type = 'button';
      botao.dataset.indice = String(i);
      botao.dataset.cat = peca.categorias || '';

      var quantos = peca.angulos.length;
      botao.setAttribute('aria-label',
        (peca.titulo || 'Trabalho') + (quantos > 1
          ? ', abrir e ver os ' + quantos + ' ângulos'
          : ', abrir'));

      /* A proporção reserva o espaço antes de a foto carregar: sem isso
         a grade pula quando cada imagem chega. */
      var moldura = document.createElement('span');
      moldura.className = 'peca__moldura';
      moldura.style.aspectRatio = peca.proporcao || '3/4';

      var midia = midiaDe(capa, 'img/trabalhos/', i < 4);
      if (VIDEO.test(capa.arquivo) && !pouca) {
        botao.addEventListener('mouseenter', function () { midia.play().catch(function () {}); });
        botao.addEventListener('mouseleave', function () { midia.pause(); });
      }
      /* Nome de arquivo errado não deixa buraco na grade: o cartão sai. */
      midia.addEventListener('error', function () { botao.remove(); });

      moldura.appendChild(midia);
      botao.appendChild(moldura);

      /* Selo: sem ele ninguém descobre que há mais fotos ali dentro. */
      if (quantos > 1 || temVideo(peca.angulos)) {
        var selo = document.createElement('span');
        selo.className = 'peca__angulos';
        var html = '';
        if (temVideo(peca.angulos)) {
          html += '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 2l7 4-7 4z" fill="currentColor"/></svg>';
        }
        if (quantos > 1) {
          html += '<span class="sr-only">Peça com </span>' + quantos + '<span class="sr-only"> ângulos</span>';
        } else {
          html += '<span class="sr-only">Peça em vídeo</span>';
        }
        selo.innerHTML = html;
        botao.appendChild(selo);
      }

      var marca = document.createElement('span');
      marca.className = 'peca__marca';
      marca.innerHTML = '<svg width="14" height="14" aria-hidden="true"><use href="#i-mais"/></svg>';
      botao.appendChild(marca);

      alvo.appendChild(botao);
    });

    /* --------------------------------------------------------- filtros */

    var cartoes = Array.prototype.slice.call(alvo.querySelectorAll('.peca'));
    var vazioCat = document.getElementById('categoriaVazia');
    var categorias = (typeof CATEGORIAS !== 'undefined') ? CATEGORIAS : [];

    /* Só entra aba que tem peça atrás dela. Filtro que abre no vazio é
       pior que filtro que não existe. */
    function temPeca(id) {
      if (id === 'todas') return true;
      return cartoes.some(function (c) {
        return (c.dataset.cat || '').split(/\s+/).indexOf(id) !== -1;
      });
    }

    function medir() {
      var mapa = new Map();
      cartoes.forEach(function (c) {
        if (!c.hidden) mapa.set(c, c.getBoundingClientRect());
      });
      return mapa;
    }

    /* FLIP na mão: mede antes, aplica o filtro, mede depois e anima a
       diferença. O cartão desliza do lugar antigo para o novo em vez de
       teleportar. */
    function filtrar(categoria) {
      var antes = medir();

      cartoes.forEach(function (c) {
        var cats = (c.dataset.cat || '').split(/\s+/);
        c.hidden = !(categoria === 'todas' || cats.indexOf(categoria) !== -1);
      });

      var visiveis = cartoes.filter(function (c) { return !c.hidden; });
      if (vazioCat) vazioCat.hidden = visiveis.length > 0;
      alvo.hidden = visiveis.length === 0;

      /* A grade muda em silêncio para quem usa leitor de tela. Este aviso
         é o retorno que o clique no filtro não dá sozinho. */
      var aviso = document.getElementById('avisoFiltro');
      if (aviso) {
        aviso.textContent = visiveis.length === 0
          ? 'Nenhuma peça nessa aba.'
          : (visiveis.length === 1 ? '1 peça' : visiveis.length + ' peças');
      }

      /* Cartão que entrou agora precisa estar revelado, senão o
         clip-path da entrada o deixaria invisível. */
      visiveis.forEach(revelar);

      if (!temGsap || pouca) return;

      var depois = medir();
      depois.forEach(function (agora, el) {
        var antigo = antes.get(el);
        if (antigo) {
          var dx = antigo.left - agora.left;
          var dy = antigo.top - agora.top;
          if (dx || dy) {
            gsap.fromTo(el, { x: dx, y: dy }, { x: 0, y: 0, duration: 0.65, ease: 'power3.inOut' });
          }
        } else {
          gsap.fromTo(el, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.55, ease: 'power3.out' });
        }
      });
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }

    var abas = categorias.filter(function (c) { return temPeca(c.id); });

    /* Uma aba só ("Todas") não é escolha nenhuma: nem mostra a barra. */
    if (filtros && abas.length > 1) {
      filtros.hidden = false;
      abas.forEach(function (c, k) {
        var chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chip' + (k === 0 ? ' is-active' : '');
        chip.textContent = c.nome;
        chip.dataset.filtro = c.id;
        chip.setAttribute('aria-pressed', k === 0 ? 'true' : 'false');

        chip.addEventListener('click', function () {
          filtros.querySelectorAll('.chip').forEach(function (outro) {
            var ativo = outro === chip;
            outro.classList.toggle('is-active', ativo);
            outro.setAttribute('aria-pressed', ativo ? 'true' : 'false');
          });
          filtrar(c.id);
        });

        filtros.appendChild(chip);
      });
    }

    return itens;
  }

  /* Desenhos livres: trilho horizontal com encaixe, cada um leva ao direct. */
  function montarFlashes(lista) {
    var alvo = document.getElementById('flashes');
    var vazio = document.getElementById('flashesVazio');
    var itens = (lista || []).filter(function (i) { return i && i.arquivo; });
    if (!alvo || !itens.length) return;

    if (vazio) vazio.remove();
    alvo.hidden = false;

    itens.forEach(function (item, i) {
      var cartao = document.createElement('article');
      cartao.className = 'flash';

      var foto = document.createElement('div');
      foto.className = 'flash__foto';
      var midia = midiaDe(item, 'img/disponiveis/', i < 3);
      midia.addEventListener('error', function () { cartao.remove(); });
      foto.appendChild(midia);

      var pe = document.createElement('div');
      pe.className = 'flash__pe';

      var nome = document.createElement('h3');
      nome.className = 'flash__nome';
      nome.textContent = item.nome || item.alt || 'Desenho disponível';

      var cta = document.createElement('a');
      cta.className = 'btn btn--fio';
      cta.href = 'https://instagram.com/tay_arte_tattoo';
      cta.target = '_blank';
      cta.rel = 'noopener';
      cta.innerHTML = 'Agendar no direct <svg aria-hidden="true"><use href="#i-seta"/></svg>';

      pe.appendChild(nome);
      pe.appendChild(cta);
      cartao.appendChild(foto);
      cartao.appendChild(pe);
      alvo.appendChild(cartao);
    });
  }

  /* As listas vêm de js/trabalhos.js. São "const" de topo de script:
     existem no escopo global, mas não viram propriedade de window. */
  var listaTrabalhos = (typeof TRABALHOS !== 'undefined') ? TRABALHOS : [];
  var listaDisponiveis = (typeof DISPONIVEIS !== 'undefined') ? DISPONIVEIS : [];

  var pecas = montarGaleria(listaTrabalhos);
  montarFlashes(listaDisponiveis);

  /* --------------------------------------------------------- as vagas */

  /* Os quadrados que mostram onde cada foto vai entrar. Aparecem enquanto
     não houver peça publicada, e somem sozinhos no instante em que a
     primeira entrar em js/trabalhos.js: quem decide é a lista, não um
     sinalizador no endereço.

     O painel que manda para o Instagram continua embaixo deles, porque
     hoje é a única coisa da página que leva a trabalho de verdade. */
  function abrirVaga(i, proporcao) {
    var vaga = document.createElement('div');
    vaga.className = 'vaga';
    if (proporcao) vaga.style.aspectRatio = proporcao;

    var n = document.createElement('span');
    n.className = 'vaga__n';
    n.textContent = i < 9 ? '0' + (i + 1) : String(i + 1);

    var t = document.createElement('span');
    t.className = 'vaga__t';
    t.textContent = 'foto aqui';

    vaga.appendChild(n);
    vaga.appendChild(t);
    return vaga;
  }

  function mostrarVagas() {
    /* Proporções desencontradas de propósito: foto de tatuagem nunca vem
       toda do mesmo tamanho, e a grade precisa mostrar isso. */
    var formatos = ['4/5', '1/1', '3/4', '4/5', '2/3', '1/1', '3/4', '4/5'];

    var galeria = document.getElementById('galeria');
    if (galeria && !pecas.length) {
      galeria.hidden = false;
      for (var i = 0; i < 8; i++) galeria.appendChild(abrirVaga(i, formatos[i]));
    }

    var trilho = document.getElementById('flashes');
    if (trilho && !trilho.children.length) {
      trilho.hidden = false;
      for (var j = 0; j < 5; j++) trilho.appendChild(abrirVaga(j));
    }
  }

  mostrarVagas();

  /* ------------------------------------------------------------- lupa */

  /* A lupa abre UMA peça e caminha pelos ângulos dela: o close, a foto
     de longe, o vídeo, a cicatrizada. */
  var lupa = document.getElementById('lupa');
  var palco = document.getElementById('lupaPalco');
  var legenda = document.getElementById('lupaLegenda');
  var contador = document.getElementById('lupaContador');
  var tituloLupa = document.getElementById('lupaTitulo');
  var pontos = document.getElementById('lupaPontos');
  var btnFecha = document.getElementById('lupaFecha');
  var btnAnt = document.getElementById('lupaAnt');
  var btnProx = document.getElementById('lupaProx');

  var angulos = [];
  var iAngulo = 0;
  var voltarPara = null;

  function pintarAngulo() {
    var a = angulos[iAngulo];
    if (!a) return;

    palco.innerHTML = '';
    var el = midiaDe(a, 'img/trabalhos/', true);
    if (VIDEO.test(a.arquivo)) {
      el.controls = true;
      el.autoplay = !pouca;              /* em reduced-motion fica no poster */
      el.setAttribute('aria-label', a.alt || '');
    }
    palco.appendChild(el);

    legenda.textContent = a.alt || '';
    contador.textContent = angulos.length > 1
      ? (iAngulo + 1) + ' de ' + angulos.length
      : '';

    /* Um ponto por ângulo, clicável. */
    pontos.innerHTML = '';
    if (angulos.length > 1) {
      angulos.forEach(function (_, k) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'lupa__ponto' + (k === iAngulo ? ' is-atual' : '');
        b.setAttribute('aria-label', 'Ângulo ' + (k + 1));
        b.setAttribute('aria-current', k === iAngulo ? 'true' : 'false');
        b.addEventListener('click', function () { iAngulo = k; pintarAngulo(); });
        pontos.appendChild(b);
      });
    }

    /* O próximo já vai baixando, para a seta responder na hora. */
    if (angulos.length > 1) {
      var seguinte = angulos[(iAngulo + 1) % angulos.length];
      if (!VIDEO.test(seguinte.arquivo)) {
        var adiante = new Image();
        adiante.src = 'img/trabalhos/' + seguinte.arquivo;
      }
    }

    if (temGsap && !pouca) {
      gsap.fromTo(el, { opacity: 0, scale: 0.985 },
        { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' });
    }
  }

  function abrirPeca(peca, origem) {
    if (!peca || !peca.angulos || !peca.angulos.length) return;

    angulos = peca.angulos;
    iAngulo = 0;
    voltarPara = origem || null;
    tituloLupa.textContent = peca.titulo || '';

    var sozinha = angulos.length < 2;
    btnAnt.hidden = sozinha;
    btnProx.hidden = sozinha;
    palco.classList.toggle('pode-arrastar', !sozinha);

    pintarAngulo();
    lupa.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { lupa.setAttribute('data-aberta', ''); });
    btnFecha.focus();
  }

  function fechar() {
    lupa.removeAttribute('data-aberta');
    document.body.style.overflow = '';
    window.setTimeout(function () {
      lupa.hidden = true;
      palco.innerHTML = '';
      pontos.innerHTML = '';
      if (voltarPara) voltarPara.focus();
    }, pouca ? 0 : 260);
  }

  function andar(passo) {
    if (angulos.length < 2) return;
    iAngulo = (iAngulo + passo + angulos.length) % angulos.length;
    pintarAngulo();
  }

  if (lupa && pecas.length) {
    document.addEventListener('click', function (e) {
      var cartao = e.target.closest && e.target.closest('.peca');
      if (cartao) abrirPeca(pecas[Number(cartao.dataset.indice)], cartao);
    });

    btnFecha.addEventListener('click', fechar);
    btnAnt.addEventListener('click', function () { andar(-1); });
    btnProx.addEventListener('click', function () { andar(1); });

    /* Arrastar para trocar de ângulo. Quase todo mundo chega desta página
       pelo Instagram, no celular, e ali a seta de 42px é alvo pequeno: o
       dedo quer arrastar. O arraste segue o dedo a 60% para dar peso, e
       volta elástico se não passar do limite. */
    var arrastando = false, x0 = 0, dx = 0, moveu = false, midiaArraste = null;

    function porX(el, valor) {
      if (temGsap) gsap.set(el, { x: valor });
      else el.style.transform = 'translateX(' + valor + 'px)';
    }

    palco.addEventListener('pointerdown', function (e) {
      if (angulos.length < 2) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      midiaArraste = palco.firstElementChild;
      if (!midiaArraste) return;
      arrastando = true; moveu = false; x0 = e.clientX; dx = 0;
      try { palco.setPointerCapture(e.pointerId); } catch (err) {}
    });

    palco.addEventListener('pointermove', function (e) {
      if (!arrastando) return;
      dx = e.clientX - x0;
      if (Math.abs(dx) > 4) moveu = true;
      porX(midiaArraste, dx * 0.6);
    });

    function soltar(e) {
      if (!arrastando) return;
      arrastando = false;
      try { palco.releasePointerCapture(e.pointerId); } catch (err) {}

      var limite = Math.min(110, palco.getBoundingClientRect().width * 0.16);

      if (Math.abs(dx) > limite) {
        /* pintarAngulo recria a mídia, então o deslocamento some junto */
        andar(dx < 0 ? 1 : -1);
      } else if (midiaArraste) {
        if (temGsap && !pouca) {
          gsap.to(midiaArraste, { x: 0, duration: 0.45, ease: 'elastic.out(1, 0.55)' });
        } else {
          porX(midiaArraste, 0);
        }
      }
      dx = 0;
    }

    palco.addEventListener('pointerup', soltar);
    palco.addEventListener('pointercancel', soltar);

    /* Clique no fundo fecha. Clique na mídia, não. E arraste que terminou
       em cima do palco não conta como clique: fecharia sem querer. */
    lupa.addEventListener('click', function (e) {
      if (moveu) { moveu = false; return; }
      if (e.target === lupa || e.target.id === 'lupaPalco') fechar();
    });

    document.addEventListener('keydown', function (e) {
      if (lupa.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); fechar(); return; }
      if (e.key === 'ArrowRight') { e.preventDefault(); andar(1); return; }
      if (e.key === 'ArrowLeft') { e.preventDefault(); andar(-1); return; }
      if (e.key !== 'Tab') return;

      /* Foco preso dentro da lupa, passando pelos pontos também. */
      var focaveis = [btnFecha];
      if (angulos.length > 1) {
        focaveis = focaveis.concat(
          Array.prototype.slice.call(pontos.querySelectorAll('button')),
          [btnAnt, btnProx]);
      }
      var atual = focaveis.indexOf(document.activeElement);
      e.preventDefault();
      var proximo = e.shiftKey ? atual - 1 : atual + 1;
      if (proximo < 0) proximo = focaveis.length - 1;
      if (proximo >= focaveis.length) proximo = 0;
      focaveis[proximo].focus();
    });
  }

  /* ------------------------------------------------------- figurinhas */

  /* Cola os adesivos de js/figurinhas.js no fundo das seções. Isso roda
     com ou sem GSAP: figurinha é conteúdo, não animação. O parallax é
     que depende do GSAP, e entra depois. */
  function colarFigurinhas(lista) {
    var coladas = [];

    (lista || []).forEach(function (f) {
      if (!f || !f.arquivo || !f.secao) return;

      var secao = document.getElementById(f.secao);
      if (!secao) return;

      var img = document.createElement('img');
      img.className = 'figurinha';
      img.src = 'img/figurinhas/' + f.arquivo;
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      img.loading = 'lazy';
      img.decoding = 'async';
      img.style.width = (f.largura || 140) + 'px';
      img.style.left = f.x || '4%';
      img.style.top = f.y || '20%';
      /* Adesivo colado à mão nunca fica reto. O GSAP lê esta rotação e a
         mantém enquanto anima o deslocamento. */
      img.style.transform = 'rotate(' + (f.giro || 0) + 'deg)';
      if (f.opacidade != null) img.style.opacity = String(f.opacidade);
      /* Dois ajustes de imagem, os dois no mesmo filter porque um
         substitui o outro se forem escritos separados:

         "inverter" é para arte que veio com fundo claro. Sem ele o
         branco vira um retângulo estourado sob o "screen"; invertida, o
         branco vira preto e some, e o traço escuro acende.

         "contraste" empurra os quase-pretos para o preto. Serve para
         arte de fundo fotográfico, cujo preto não é preto de verdade e
         o "screen" levanta como um halo claro em volta, dando o ar de
         coisa brilhando. Não use em arte pontilhada: ali o contraste
         come os pontos e a figurinha some. */
      var lentes = [];
      if (f.inverter) lentes.push('invert(1)');
      if (f.contraste) lentes.push('contrast(' + f.contraste + ')');
      if (lentes.length) img.style.filter = lentes.join(' ');

      /* "sangra" troca a máscara redonda por uma encostada na borda: do
         lado que sai da página o desenho fica inteiro, e só os outros
         três lados dissolvem. Sem isto a figurinha cortada pela seção
         aparece com a beirada apagada, que denuncia o fim do arquivo em
         vez de sugerir que ela continua para fora. */
      if (f.sangra === 'esquerda' || f.sangra === 'direita') {
        img.classList.add('figurinha--sangra-' + f.sangra);
      }

      /* Nome de arquivo errado não deixa um retângulo quebrado na seção. */
      img.addEventListener('error', function () { img.remove(); });

      secao.appendChild(img);
      coladas.push({ el: img, secao: secao, fundura: f.fundura || 6 });
    });

    return coladas;
  }

  var figurinhas = colarFigurinhas(typeof FIGURINHAS !== 'undefined' ? FIGURINHAS : []);

  /* ---------------------------------------------------------- movimento */

  var alvos = Array.prototype.slice.call(document.querySelectorAll('.revela'));
  var fino = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var cursor = document.getElementById('cursor');

  /* Sem GSAP, ou com movimento reduzido, a classe .motion nunca entra no
     <html>: o CSS então não esconde nada e a página aparece inteira. É
     por isso que a revelação depende do GSAP estar de pé, e não do JS. */
  if (!temGsap || pouca) {
    if (cursor) cursor.remove();

  } else {
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('motion');

    /* 1. Revelação das seções. Quem move é a transição do CSS; o
       ScrollTrigger só diz a hora. Transição, e não keyframe, porque
       retoma do valor atual se a pessoa rolar para trás no meio. */
    alvos.forEach(function (el) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: function () { revelar(el); }
      });
    });

    /* 2. As peças entram por baixo, como tinta subindo na pele. Mesmo
       mecanismo da revelação: quem move é o CSS, o gatilho só diz a hora. */
    Array.prototype.slice.call(document.querySelectorAll('.peca')).forEach(function (peca) {
      alvos.push(peca);
      ScrollTrigger.create({
        trigger: peca,
        start: 'top 90%',
        once: true,
        onEnter: function () { revelar(peca); }
      });
    });

    /* 3. Figurinhas: andam devagar com a rolagem.

       Não há entrada de "assentar como adesivo recém-colado" aqui, e a
       ausência é deliberada: um gsap.from deixa o elemento no estado
       inicial (opacidade 0) até o gatilho disparar, e onde o gatilho não
       dispara a figurinha fica invisível para sempre. Foi exatamente o
       que aconteceu. Um fromTo com immediateRender:false resolveria a
       invisibilidade, mas ao custo de um piscão: a figurinha apareceria,
       sumiria e voltaria. Entre a entrada bonita e a figurinha existir,
       fica a segunda. O parallax abaixo já dá vida, e é um fromTo que em
       repouso não esconde nada. */
    figurinhas.forEach(function (o) {
      gsap.fromTo(o.el,
        { yPercent: -o.fundura },
        {
          yPercent: o.fundura,
          ease: 'none',
          scrollTrigger: { trigger: o.secao, start: 'top bottom', end: 'bottom top', scrub: true }
        });
    });

    /* 4. O vídeo da capa anda menos que a página. A escala de 1.08 existe
       para o movimento não descobrir a borda. */
    var video = document.getElementById('capaVideo');
    if (video) {
      gsap.fromTo(video,
        { yPercent: -4, scale: 1.08 },
        {
          yPercent: 4,
          ease: 'none',
          scrollTrigger: { trigger: '.capa', start: 'top top', end: 'bottom top', scrub: true }
        });
    }

    /* 5. Hover magnético nos botões de ação: no máximo 8px, com volta
       elástica. É feedback, por isso a ida é curta e a volta é que sobra. */
    if (fino) {
      document.querySelectorAll('[data-magnetico]').forEach(function (el) {
        el.addEventListener('mousemove', function (e) {
          var r = el.getBoundingClientRect();
          var dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
          var dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
          gsap.to(el, { x: dx * 8, y: dy * 8, duration: 0.4, ease: 'power3.out' });
        });
        el.addEventListener('mouseleave', function () {
          gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
        });
      });
    }

    /* 6. A bolinha. Cresce em cima do que dá para abrir, e um pouco no
       que dá para clicar: é ela dizendo onde a mão pode ir. Cresce por
       escala, nunca por largura. O cursor do sistema continua visível. */
    if (cursor && fino) {
      var paraX = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
      var paraY = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });

      document.addEventListener('mousemove', function (e) {
        cursor.classList.add('is-on');
        paraX(e.clientX);
        paraY(e.clientY);
      });

      document.addEventListener('mouseover', function (e) {
        if (!e.target.closest) return;
        var obra = e.target.closest('.peca, .flash');
        var clicavel = e.target.closest('a, button');
        gsap.to(cursor, {
          scale: obra ? 3.6 : (clicavel ? 2 : 1),
          duration: 0.4,
          ease: 'power3.out'
        });
      });

      document.addEventListener('mouseleave', function () { cursor.classList.remove('is-on'); });

    } else if (cursor) {
      cursor.remove();
    }

    /* 7. O nome gigante do rodapé sobe conforme a página termina. É a
       chegada: a palavra emerge da margem enquanto o site acaba. */
    var marcaRodape = document.querySelector('.rodape__marca span');
    if (marcaRodape) {
      gsap.fromTo(marcaRodape, { yPercent: 38 }, {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.rodape', start: 'top bottom', end: 'bottom bottom', scrub: true }
      });
    }

    /* 8. O selo do topo gira com a rolagem. É o único indicador de
       posição da página, e usa a forma da própria marca para isso. */
    var seloTopo = document.querySelector('.topo .marca__selo');
    if (seloTopo) {
      gsap.to(seloTopo, {
        rotation: 360,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.6 }
      });
    }

    /* 9. A linha dos passos se desenha de cima para baixo enquanto a
       pessoa desce. Conta que aquilo ali é uma sequência, não uma lista. */
    var linhaPassos = document.querySelector('.passos__linha');
    if (linhaPassos) {
      gsap.fromTo(linhaPassos, { scaleY: 0 }, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.passos', start: 'top 82%', end: 'bottom 72%', scrub: true }
      });
    }

    /* As fotos mudam a altura da página conforme carregam. Sem isto o
       ScrollTrigger dispara nos lugares errados. */
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });

    /* Rede de segurança, uma única medição. Há contextos em que o
       ScrollTrigger não chega a disparar (aba de fundo, captura headless,
       algumas webviews) e a seção ficaria invisível para sempre. */
    window.setTimeout(function () {
      /* Primeiro dá uma chance ao próprio ScrollTrigger: o refresh dispara
         o que já está na tela e não chegou a ser medido. */
      ScrollTrigger.refresh();

      var altura = window.innerHeight || document.documentElement.clientHeight;
      alvos.forEach(function (el) {
        if (el.hasAttribute('data-vista')) return;
        if (el.getBoundingClientRect().top > altura * 0.95) return;
        revelar(el);
      });
    }, 2000);
  }
})();
