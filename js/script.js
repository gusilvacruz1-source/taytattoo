/* =====================================================================
   TAY MACHADO · ARTE TATTOO
   Sem framework, sem build, sem dependência externa.
   Cinco coisas: menu, retrato, galerias, lupa e revelação na rolagem.
   Tudo colapsa em prefers-reduced-motion.
   ===================================================================== */
(function () {
  'use strict';

  var pouca = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* A rolagem suave, montada lá embaixo se o Lenis estiver de pé. Mora
     aqui em cima porque a lupa precisa pausá-la enquanto está aberta. */
  var rolagem = null;

  /* Travar o fundo enquanto a lupa está aberta. Só o overflow do body não
     basta com a rolagem suave por cima: o Lenis tem o próprio laço, e sem
     o stop() a página continua deslizando atrás do escuro. */
  function travarRolagem() {
    if (rolagem) rolagem.stop();
    document.body.style.overflow = 'hidden';
  }
  function soltarRolagem() {
    if (rolagem) rolagem.start();
    document.body.style.overflow = '';
  }

  /* A altura do cabeçalho fixo, lida do mesmo token que o CSS usa, para a
     âncora não parar com o título escondido atrás dele. O +24 repete a
     folga do scroll-padding-top, que o Lenis não lê. */
  function alturaTopo() {
    var barra = document.querySelector('.topo');
    return (barra ? barra.offsetHeight : 0) + 24;
  }
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

  /* O autoplay agora mora no HTML, junto com muted e playsinline, porque
     no celular é esse trio que o navegador aceita. Um play() só de JS o
     iPhone recusa com frequência — ainda mais enquanto a página carrega —
     e antes a recusa era engolida por um catch vazio: o visitante ficava
     com a foto parada para sempre, sem nada a fazer a respeito.

     Aqui o JS só cobre o que o atributo não resolve:

     1. Movimento reduzido desliga o autoplay na hora e fica o poster.
     2. Quando o navegador recusa mesmo assim, a gente volta a tentar no
        primeiro toque, tecla ou rolagem. O caso comum é o Modo de Baixo
        Consumo do iPhone, que bloqueia vídeo automático sem exceção mas
        libera depois de um gesto da pessoa.
     3. E toda vez que a aba volta a aparecer, porque o celular pausa o
        vídeo ao sair dela e não retoma sozinho.

     Sem os arquivos nada disso pinta, e sobra o breu com o véu por cima,
     que é um degradê discreto e serve. */
  var video = document.getElementById('capaVideo');

  if (video && pouca) {
    video.autoplay = false;
    video.pause();

  } else if (video) {
    var GESTOS = ['pointerdown', 'touchstart', 'keydown', 'scroll'];

    var soltarGestos = function () {
      GESTOS.forEach(function (g) { window.removeEventListener(g, insistir); });
    };

    var insistir = function () {
      if (!video.paused) { soltarGestos(); return; }
      var promessa = video.play();
      if (promessa && promessa.then) promessa.then(soltarGestos, function () {});
    };

    GESTOS.forEach(function (g) {
      window.addEventListener(g, insistir, { passive: true });
    });
    /* Este fica para sempre: sair e voltar da aba pausa o vídeo de novo,
       e é a única das três situações que se repete. */
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) insistir();
    });

    insistir();
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
    travarRolagem();
    requestAnimationFrame(function () { lupa.setAttribute('data-aberta', ''); });
    btnFecha.focus();
  }

  function fechar() {
    lupa.removeAttribute('data-aberta');
    soltarRolagem();
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

    (lista || []).forEach(function (f, ordem) {
      /* Toda figurinha precisa de seção, e de uma das duas fontes de
         desenho: um arquivo de imagem ou uma teia, que é desenhada. */
      if (!f || !f.secao || (!f.arquivo && !f.teia)) return;

      var secao = document.getElementById(f.secao);
      if (!secao) return;

      /* Teia: é desenho, não arquivo. Vai como SVG escrito na hora, o que
         a deixa nítida em qualquer tela, do peso de um parágrafo de texto
         e pintada pela cor do CSS em vez de pela do JPG. */
      if (f.teia) {
        var teia = montarTeia(f);
        secao.appendChild(teia);
        coladas.push({ el: teia, secao: secao, fundura: f.fundura || 5 });
        return;
      }

      /* A figurinha vai em duas camadas, e a divisão tem uma razão: o
         parallax e a entrada são os dois transform, e um só elemento não
         carrega os dois — o GSAP reescreve o transform a cada quadro da
         rolagem e apagaria a entrada no meio dela.

         Então o BERÇO fica com o lugar na seção, a inclinação de adesivo
         colado à mão e o parallax; e a ARTE, dentro dele, fica com a
         entrada. Cada transform no seu elemento, e os dois convivem. */
      var berco = document.createElement('span');
      berco.className = 'fig';
      berco.setAttribute('aria-hidden', 'true');

      /* Posição e tamanho vão em variáveis, e não direto no style: assim o
         CSS pode trocar as três de uma vez no celular, com media query, e
         a troca acontece ao girar o aparelho sem recarregar a página. */
      berco.style.setProperty('--fx', f.x || '4%');
      berco.style.setProperty('--fy', f.y || '20%');
      berco.style.setProperty('--fw', (f.largura || 140) + 'px');
      /* No estreito a seção vira uma coluna só e o texto ocupa a largura
         inteira. O único vão que sobra é a faixa embaixo do último bloco,
         e é para lá que estas medidas mandam a figurinha. */
      if (f.celular) {
        if (f.celular.x) berco.style.setProperty('--fx-cel', f.celular.x);
        if (f.celular.y) berco.style.setProperty('--fy-cel', f.celular.y);
        if (f.celular.largura) berco.style.setProperty('--fw-cel', f.celular.largura + 'px');
      }
      /* Adesivo colado à mão nunca fica reto. O GSAP lê esta rotação e a
         mantém enquanto anima o deslocamento. */
      var giro = f.giro || 0;
      berco.style.transform = 'rotate(' + giro + 'deg)';
      /* A presença mora numa variável, e não no style.opacity, porque a
         figurinha chega com uma transição: escrever direto no elemento
         travaria o valor final e a entrada não teria para onde ir. */
      berco.style.setProperty('--presenca', f.opacidade != null ? String(f.opacidade) : '1');
      /* De quanto ela endireita ao chegar. O sinal é o contrário da
         inclinação dela: a figurinha entra torta para o outro lado e
         assenta na inclinação final, como adesivo que é pressionado. */
      berco.style.setProperty('--assenta', (giro > 0 ? -1 : 1) * 5 + 'deg');
      /* Arte densa some no celular, onde a coluna é estreita e o texto
         ocupa tudo. Quem decide é o CSS, não o JS: assim ela volta se a
         pessoa girar o aparelho, sem precisar recarregar. */
      if (f.soLargo) berco.classList.add('fig--so-largo');

      var img = document.createElement('img');
      img.className = 'figurinha';
      img.src = 'img/figurinhas/' + f.arquivo;
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      /* Nome de arquivo errado não deixa um retângulo quebrado na seção. */
      img.addEventListener('error', function () { berco.remove(); });

      /* A BOIA, entre o berço e a arte. É a terceira camada, e cada uma
         das três carrega um transform só:

           berço  o lugar na seção, a inclinação e o parallax (GSAP)
           boia   o balanço lento, que nunca para (keyframes do CSS)
           arte   a entrada, que acontece uma vez (transição do CSS)

         Fossem duas camadas, o balanço e a entrada disputariam o mesmo
         transform e um apagaria o outro no meio do caminho. */
      var boia = document.createElement('span');
      boia.className = 'fig__boia';
      /* Cada figurinha balança no seu tempo. Se todas tivessem a mesma
         duração elas subiriam e desceriam juntas, e um punhado de coisas
         balançando em uníssono não parece vivo: parece máquina. Os
         números vêm da ordem na lista, então são sempre os mesmos — o
         site não muda de humor a cada visita. */
      boia.style.setProperty('--boia-dur', (8.5 + (ordem % 5) * 1.9).toFixed(1) + 's');
      /* Atraso negativo: em vez de esperarem para começar, elas já entram
         no meio do próprio ciclo, cada uma num ponto diferente. */
      boia.style.setProperty('--boia-atraso', '-' + ((ordem * 2.7) % 9).toFixed(1) + 's');
      /* O sentido alterna, para as vizinhas não subirem sempre juntas. */
      if (ordem % 2) boia.classList.add('fig__boia--avessa');

      boia.appendChild(img);
      berco.appendChild(boia);
      secao.appendChild(berco);
      coladas.push({ el: berco, secao: secao, fundura: f.fundura || 6 });
    });

    return coladas;
  }

  /* A TEIA DE ARANHA.

     É a assinatura da Tay nas tatuagens e nas ilustrações, e por isso é o
     único ornamento que se repete na página.

     Por um tempo ela foi desenhada aqui por geometria — fios radiais e
     fios de captura calculados —, porque a arte dela ainda não tinha
     chegado. Chegou, e a geometria saiu: teia de verdade é rasgada e
     irregular, e nenhuma conta entrega isso. */

  /* Monta a faixa de teia que atravessa a seção de parede a parede.

     São três peças, e não duas: o fio que emenda, e um canto em cada
     parede. A Tay pediu duas vezes que a teia lá de cima fosse UMA só, e
     duas vezes o que estava no ar eram dois cantos com um vão entre eles.
     Dois cantos separados por 500px de nada são duas teias, por mais bem
     desenhado que cada um esteja.

     O fio vem primeiro, no fundo, e os cantos por cima dele. Ele é a
     fatia do fio de amarração que a própria arte já tem correndo no topo,
     repetida no tamanho natural pelo vão — nada estica, nada amplia. O
     alinhamento das três peças é do CSS, por --esc; aqui só a ordem
     importa, e ela é essa: fio, canto, canto.

     Cada cópia mantém a proporção do arquivo, e a da direita é espelhada
     pelo CSS: a arte é uma só e o navegador não a baixa duas vezes. */
  function montarTeia(f) {
    var fita = document.createElement('div');
    fita.className = 'teia teia--fita';
    fita.setAttribute('aria-hidden', 'true');
    fita.style.top = f.y || '4%';
    /* Mora numa variável, e não no style.opacity, porque a faixa chega
       com uma transição de opacidade: escrever direto no elemento
       travaria o valor final e a entrada não teria para onde ir. */
    fita.style.setProperty('--presenca', f.opacidade != null ? String(f.opacidade) : '.5');

    var fio = document.createElement('span');
    fio.className = 'teia__fio';
    fita.appendChild(fio);

    /* Dois cantos, sempre: um por parede. Não é configurável porque a
       forma depende disso — um canto só deixaria uma ponta solta, e três
       repetiriam canto no meio da parede, onde canto não existe. */
    for (var v = 0; v < 2; v++) {
      var meia = document.createElement('span');
      meia.className = 'teia__parte' + (v ? ' teia__parte--espelho' : '');
      var arte = document.createElement('img');
      arte.src = 'img/figurinhas/' + (f.arquivo || 'teia-ponta.webp');
      arte.alt = '';
      arte.loading = 'lazy';
      arte.decoding = 'async';
      arte.addEventListener('error', function () { fita.remove(); });
      meia.appendChild(arte);
      fita.appendChild(meia);
    }
    return fita;
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

    /* 0. Rolagem suave.

       A roda do mouse move a página em degraus, e cada degrau é um salto
       seco: é o que faz um site parecer duro mesmo com tudo o mais no
       lugar. O Lenis põe inércia nesse movimento — a página parte, corre
       e encosta, em vez de pular. É de onde vem a sensação de fluidez, e
       é o mesmo que o site da Eloize usa.

       Ele assume a rolagem inteira, então o ScrollTrigger tem de ouvir o
       Lenis em vez do evento nativo, e o relógio do Lenis passa a ser o
       do GSAP: dois relógios separados brigam e o parallax treme.

       Nada disto roda em movimento reduzido: quem pediu menos movimento
       não quer inércia nenhuma, e este bloco inteiro está dentro do
       "senão" que já exclui esse caso. */
    if (typeof Lenis !== 'undefined') {
      rolagem = new Lenis({
        duration: 1.1,
        easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }
      });
      rolagem.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (tempo) { rolagem.raf(tempo * 1000); });
      /* O GSAP normalmente ignora quadros muito atrasados para não dar
         solavanco. Com o Lenis pendurado no mesmo relógio, esse pulo de
         segurança é justamente o que trava a rolagem. */
      gsap.ticker.lagSmoothing(0);

      /* O scroll-behavior:smooth do CSS e o Lenis fazem a mesma coisa ao
         mesmo tempo, e o resultado é uma âncora que anda em dois tempos.
         Com o Lenis de pé, o do CSS sai. */
      document.documentElement.style.scrollBehavior = 'auto';

      /* Âncora interna passa pelo Lenis, senão o navegador teleporta e a
         inércia não existe justamente onde ela mais aparece. */
      Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]')).forEach(function (a) {
        a.addEventListener('click', function (e) {
          var id = a.getAttribute('href');
          if (id.length < 2) return;
          var destino = document.querySelector(id);
          if (!destino) return;
          e.preventDefault();
          rolagem.scrollTo(destino, { offset: -alturaTopo() });
        });
      });
    }

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

    /* 2b. Teias, rabiscos e figurinhas chegam junto com a seção, e os três
       precisam de gatilho próprio: todos moram fora dos blocos marcados
       com .revela — a figurinha e a teia são filhas diretas da seção, e a
       volta da capa mora dentro da frase — então esperar pelo data-vista
       de um ancestral seria esperar por um atributo que nunca chega ali.
       Sem isto o traço fica com o stroke-dashoffset cheio para sempre, e a
       figurinha com opacidade zero: os dois, invisíveis.

       Cada um vira alvo também, para a rede de segurança lá embaixo
       alcançá-los se o gatilho não disparar. */
    Array.prototype.slice.call(document.querySelectorAll('.teia, .rabisco, .fig')).forEach(function (traco) {
      alvos.push(traco);
      ScrollTrigger.create({
        trigger: traco,
        start: 'top 94%',
        once: true,
        onEnter: function () { revelar(traco); }
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

    /* 8. (vago) Aqui girava o selo do topo com a rolagem, e ele era o
       único indicador de posição da página. Saiu junto com a espiral, a
       pedido da Tay — ela não queria espiral em lugar nenhum. Se um dia
       entrar uma marca no lugar dela, o giro volta com duas linhas. */

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
