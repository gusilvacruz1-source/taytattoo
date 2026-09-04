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

  /* -------------------------------------------------- revelar rolando */

  var alvos = Array.prototype.slice.call(document.querySelectorAll('.revela'));

  function revelar(el) { el.setAttribute('data-vista', ''); }
  function revelarTudo() { alvos.forEach(revelar); }

  if (pouca || !('IntersectionObserver' in window)) {
    revelarTudo();
  } else {
    var olho = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        revelar(entrada.target);
        olho.unobserve(entrada.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

    alvos.forEach(function (el) { olho.observe(el); });

    /* Rede de segurança, uma única medição, sem ouvir a rolagem.
       Há contextos em que o observer responde mas nunca acusa interseção
       (a página é montada sem nunca ser pintada: aba de fundo, captura
       headless, algumas webviews). Ali, a seção ficaria invisível para
       sempre. Dois segundos depois medimos na mão o que já está na tela
       e revelamos. O que está abaixo da dobra segue com o observer. */
    window.setTimeout(function () {
      var altura = window.innerHeight || document.documentElement.clientHeight;
      alvos.forEach(function (el) {
        if (el.hasAttribute('data-vista')) return;
        if (el.getBoundingClientRect().top > altura * 0.95) return;
        revelar(el);
        olho.unobserve(el);
      });
    }, 2000);
  }
})();
