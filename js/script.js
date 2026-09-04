/* =====================================================================
   TAY MACHADO · ARTE TATTOO
   Sem framework, sem build, sem dependência externa.
   Cinco coisas: menu, retrato, galerias, lupa e revelação na rolagem.
   Tudo colapsa em prefers-reduced-motion.
   ===================================================================== */
(function () {
  'use strict';

  var pouca = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  /* O arquivo manda: existindo img/retrato.jpg, ele aparece e o selo sai.
     Faltando, nada acontece e o selo continua ocupando a moldura. */
  var retrato = document.getElementById('retrato');
  if (retrato) {
    retrato.addEventListener('load', function () {
      retrato.hidden = false;
      var selo = document.querySelector('.capa__selo');
      if (selo) selo.remove();
    });
  }

  /* -------------------------------------------------------- galerias */

  var VIDEO = /\.(mp4|webm|mov)$/i;

  function midiaDe(item, pasta, adiantada) {
    var src = pasta + item.arquivo;
    var el;

    if (VIDEO.test(item.arquivo)) {
      el = document.createElement('video');
      el.src = src;
      el.muted = true;
      el.loop = true;
      el.playsInline = true;
      el.preload = 'metadata';
      if (item.capa) el.poster = pasta + item.capa;
    } else {
      el = document.createElement('img');
      el.src = src;
      el.alt = item.alt || '';
      el.loading = adiantada ? 'eager' : 'lazy';
      el.decoding = 'async';
    }
    return el;
  }

  /* Peças fechadas: grade em colunas, cada uma abre na lupa. */
  function montarGaleria(lista) {
    var alvo = document.getElementById('galeria');
    var vazio = document.getElementById('galeriaVazia');
    var itens = (lista || []).filter(function (i) { return i && i.arquivo; });
    if (!alvo || !itens.length) return [];

    if (vazio) vazio.remove();
    alvo.hidden = false;

    itens.forEach(function (item, i) {
      var botao = document.createElement('button');
      botao.className = 'peca';
      botao.type = 'button';
      botao.setAttribute('aria-label', 'Ampliar: ' + (item.alt || 'trabalho'));
      botao.dataset.indice = String(i);

      var midia = midiaDe(item, 'img/trabalhos/', i < 4);
      var ehVideo = VIDEO.test(item.arquivo);

      if (ehVideo && !pouca) {
        botao.addEventListener('mouseenter', function () { midia.play().catch(function () {}); });
        botao.addEventListener('mouseleave', function () { midia.pause(); });
      }

      /* Nome de arquivo errado não deixa buraco na grade: o cartão sai. */
      midia.addEventListener('error', function () { botao.remove(); });

      botao.appendChild(midia);

      if (ehVideo) {
        var selo = document.createElement('span');
        selo.className = 'peca__video';
        selo.innerHTML = '<svg width="14" height="14" aria-hidden="true"><use href="#i-play"/></svg>';
        botao.appendChild(selo);
      }

      var marca = document.createElement('span');
      marca.className = 'peca__marca';
      marca.innerHTML = '<svg width="14" height="14" aria-hidden="true"><use href="#i-mais"/></svg>';
      botao.appendChild(marca);

      alvo.appendChild(botao);
    });

    return itens.map(function (item) {
      return {
        src: 'img/trabalhos/' + item.arquivo,
        alt: item.alt || '',
        video: VIDEO.test(item.arquivo)
      };
    });
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

  /* ------------------------------------------------------------- lupa */

  var lupa = document.getElementById('lupa');
  var palco = document.getElementById('lupaPalco');
  var legenda = document.getElementById('lupaLegenda');
  var contador = document.getElementById('lupaContador');
  var indice = 0;
  var voltarPara = null;

  function pintar() {
    var item = pecas[indice];
    if (!item) return;

    palco.innerHTML = '';
    var el;
    if (item.video) {
      el = document.createElement('video');
      el.src = item.src;
      el.controls = true;
      el.autoplay = !pouca;
      el.loop = true;
      el.playsInline = true;
    } else {
      el = document.createElement('img');
      el.src = item.src;
      el.alt = item.alt;
    }
    palco.appendChild(el);

    legenda.textContent = item.alt;
    contador.textContent = (indice + 1) + ' / ' + pecas.length;
  }

  function abrir(i, origem) {
    if (!pecas.length) return;
    indice = i;
    voltarPara = origem || null;
    pintar();
    lupa.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { lupa.setAttribute('data-aberta', ''); });
    document.getElementById('lupaFecha').focus();
  }

  function fechar() {
    lupa.removeAttribute('data-aberta');
    document.body.style.overflow = '';
    window.setTimeout(function () {
      lupa.hidden = true;
      palco.innerHTML = '';
      if (voltarPara) voltarPara.focus();
    }, pouca ? 0 : 260);
  }

  function andar(passo) {
    if (!pecas.length) return;
    indice = (indice + passo + pecas.length) % pecas.length;
    pintar();
  }

  if (lupa && pecas.length) {
    document.addEventListener('click', function (e) {
      var peca = e.target.closest && e.target.closest('.peca');
      if (peca) abrir(Number(peca.dataset.indice), peca);
    });

    document.getElementById('lupaFecha').addEventListener('click', fechar);
    document.getElementById('lupaAnt').addEventListener('click', function () { andar(-1); });
    document.getElementById('lupaProx').addEventListener('click', function () { andar(1); });

    /* Clique no fundo fecha. Clique na mídia, não. */
    lupa.addEventListener('click', function (e) {
      if (e.target === lupa || e.target.id === 'lupaPalco') fechar();
    });

    document.addEventListener('keydown', function (e) {
      if (lupa.hidden) return;
      if (e.key === 'Escape') { fechar(); return; }
      if (e.key === 'ArrowLeft') { andar(-1); return; }
      if (e.key === 'ArrowRight') { andar(1); return; }
      if (e.key !== 'Tab') return;

      /* Foco preso dentro da lupa enquanto ela estiver aberta. */
      var focaveis = lupa.querySelectorAll('button, video[controls]');
      if (!focaveis.length) return;
      var primeiro = focaveis[0];
      var ultimo = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault(); ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault(); primeiro.focus();
      }
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
  function revelar(el) { el.setAttribute('data-vista', ''); }

  var temGsap = (typeof gsap !== 'undefined') && (typeof ScrollTrigger !== 'undefined');
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

    /* 3. Figurinhas: assentam como se tivessem acabado de ser coladas, e
       depois andam devagar com a rolagem. */
    figurinhas.forEach(function (o) {
      gsap.from(o.el, {
        scale: 0.84,
        opacity: 0,
        duration: 0.7,
        ease: 'back.out(1.6)',
        scrollTrigger: { trigger: o.secao, start: 'top 78%', once: true }
      });

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
