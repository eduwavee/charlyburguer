/* =====================================================================
   CHARLY'S — carta, armador, carrito y asistente de pedidos
   Los datos (productos, precios, horario, pagos) viven en assets/menu.js
   ===================================================================== */
(function () {
  'use strict';

  var C = window.CHARLYS;
  if (!C) return;

  /* ------------------------------------------------------------ utilidades */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var nf = new Intl.NumberFormat('es-AR');
  var money = function (n) { return '$' + nf.format(Math.round(n)); };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var norm = function (s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); };
  var icon = function (id, cls) { return '<svg class="ico ' + (cls || '') + '" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; };
  var uid = function () { return Math.random().toString(36).slice(2, 9); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var html = document.documentElement;

  var store = {
    get: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* modo privado */ } }
  };

  var P = {};
  C.productos.forEach(function (p) { P[p.id] = p; });
  var X = {};
  C.extras.forEach(function (x) { X[x.id] = x; });

  /* ------------------------------------------------------------ horario */
  var DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var toMin = function (hhmm) { var a = hhmm.split(':'); return (+a[0]) * 60 + (+a[1]); };

  function localNow() {
    try {
      var parts = new Intl.DateTimeFormat('en-US', {
        timeZone: C.local.zonaHoraria, weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23'
      }).formatToParts(new Date());
      var get = function (t) { return parts.filter(function (p) { return p.type === t; })[0].value; };
      return {
        dow: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday')),
        min: ((+get('hour')) % 24) * 60 + (+get('minute'))
      };
    } catch (e) {
      var d = new Date();
      return { dow: d.getDay(), min: d.getHours() * 60 + d.getMinutes() };
    }
  }

  function openState() {
    var H = C.horario, abre = toMin(H.abre), cierra = toMin(H.cierra), cruza = cierra <= abre;
    var n = localNow(), dias = H.dias;
    if (cruza) {
      if (dias.indexOf(n.dow) > -1 && n.min >= abre) return { open: true, left: 1440 - n.min + cierra };
      if (dias.indexOf((n.dow + 6) % 7) > -1 && n.min < cierra) return { open: true, left: cierra - n.min };
    } else if (dias.indexOf(n.dow) > -1 && n.min >= abre && n.min < cierra) {
      return { open: true, left: cierra - n.min };
    }
    var when = '';
    if (dias.indexOf(n.dow) > -1 && n.min < abre) when = 'hoy';
    else {
      for (var d = 1; d <= 7; d++) {
        if (dias.indexOf((n.dow + d) % 7) > -1) { when = d === 1 ? 'mañana' : 'el ' + DIAS[(n.dow + d) % 7]; break; }
      }
    }
    return { open: false, when: when, dow: n.dow };
  }

  var laHora = function (hhmm) { return (parseInt(hhmm, 10) === 1 ? 'la ' : 'las ') + hhmm; };

  function statusLine(s) {
    if (s.open) {
      return s.left <= 30 ? 'Abierto · cerramos en ' + s.left + ' min' : 'Abierto ahora · hasta ' + laHora(C.horario.cierra);
    }
    return 'Cerrado · abrimos ' + s.when + ' a ' + laHora(C.horario.abre);
  }

  function renderStatus() {
    var s = openState();
    var bar = $('#status');
    bar.classList.toggle('is-open', s.open);
    $('#statusText').textContent = statusLine(s);
    var cs = $('#chatStatus');
    if (cs) cs.textContent = s.open ? 'Abierto · hasta ' + C.horario.cierra : 'Cerrado · abre ' + s.when + ' ' + C.horario.abre;
    renderHours(s);
  }

  function renderHours() {
    var list = $('#hours');
    if (!list) return;
    var today = localNow().dow;
    var orden = [1, 2, 3, 4, 5, 6, 0];
    list.innerHTML = orden.map(function (d) {
      var abierto = C.horario.dias.indexOf(d) > -1;
      var nombre = DIAS[d].charAt(0).toUpperCase() + DIAS[d].slice(1);
      return '<li' + (d === today ? ' class="is-today"' : '') + '><span>' + nombre + '</span><b>' +
        (abierto ? C.horario.abre + ' – ' + C.horario.cierra : 'Cerrado') + '</b></li>';
    }).join('');
  }

  /* ------------------------------------------------------------ carrito */
  var cart = (store.get('charlys.carrito') || []).filter(function (it) { return it && P[it.id] && it.qty > 0; });

  var sizeName = function (n) { return ['', 'simple', 'doble', 'triple', 'cuádruple'][n] || n + ' carnes'; };

  function unitPrice(it) {
    var p = P[it.id], t = p.precio;
    if (p.carnes) t += Math.max(0, (it.carnes || p.carnes.incluidas) - p.carnes.incluidas) * C.carneExtra;
    (it.extras || []).forEach(function (x) { if (X[x]) t += X[x].precio; });
    return t;
  }

  function itemTitle(it) {
    var p = P[it.id], t = p.nombre;
    if (p.carnes) t += ' ' + sizeName(it.carnes);
    if (it.opcion) t += ' (' + it.opcion + ')';
    return t;
  }

  function itemLines(it) {
    var p = P[it.id], L = [];
    (it.extras || []).forEach(function (x) { if (X[x]) L.push('+ ' + X[x].nombre); });
    (it.quitar || []).forEach(function (q) {
      var r = (p.quitar || []).filter(function (z) { return z.id === q; })[0];
      if (r) L.push('Sin ' + r.nombre);
    });
    if (it.nota) L.push('Nota: ' + it.nota);
    return L;
  }

  function signature(it) {
    return [it.id, it.carnes || '', (it.extras || []).slice().sort().join('+'), (it.quitar || []).slice().sort().join('+'),
      it.opcion || '', norm(it.nota || '').trim()].join('|');
  }

  function cleanItem(it) {
    return {
      id: it.id, carnes: it.carnes || null, extras: (it.extras || []).slice(), quitar: (it.quitar || []).slice(),
      opcion: it.opcion || null, nota: (it.nota || '').trim(), qty: Math.max(1, Math.min(20, it.qty || 1))
    };
  }

  function addItem(it) {
    var clean = cleanItem(it), sig = signature(clean);
    var same = cart.filter(function (c) { return signature(c) === sig; })[0];
    if (same) same.qty = Math.min(20, same.qty + clean.qty);
    else { clean.key = uid(); cart.push(clean); }
    saveCart(true);
  }

  function replaceItem(key, it) {
    var i = cart.map(function (c) { return c.key; }).indexOf(key);
    var clean = cleanItem(it); clean.key = key;
    if (i > -1) cart[i] = clean; else cart.push(clean);
    saveCart(true);
  }

  function setQty(key, q) {
    cart = cart.filter(function (c) {
      if (c.key !== key) return true;
      c.qty = Math.min(20, q);
      return q > 0;
    });
    saveCart(false);
  }

  function totals(modo) {
    var sub = cart.reduce(function (s, it) { return s + unitPrice(it) * it.qty; }, 0);
    var envio = modo === 'delivery' ? C.entrega.delivery.costo : 0;
    return { sub: sub, envio: envio, total: sub + envio, count: cart.reduce(function (s, it) { return s + it.qty; }, 0) };
  }

  function saveCart(bump) {
    store.set('charlys.carrito', cart);
    renderCartUI(bump);
  }

  function renderCartUI(bump) {
    var t = totals();
    var count = $('#cartCount');
    count.textContent = t.count;
    count.classList.toggle('is-empty', !t.count);
    $('#cartBtn').setAttribute('aria-label', t.count ? 'Tu pedido: ' + t.count + ' productos, ' + money(t.sub) : 'Tu pedido está vacío');
    if (bump && !reduceMotion) {
      count.classList.remove('bump'); void count.offsetWidth; count.classList.add('bump');
    }
    // dock
    var dc = $('#dockCount');
    dc.hidden = !t.count; dc.textContent = t.count;
    $('#dockIco').hidden = !!t.count;
    $('#dockLabel').textContent = t.count ? 'Ver pedido' : 'Armá tu pedido';
    $('#dockTotal').textContent = t.count ? money(t.sub) : '';
    updateDock();
    // chip del chat
    var cc = $('#chatCart');
    cc.hidden = !t.count;
    cc.innerHTML = icon('bag') + '<span>' + t.count + '</span><span class="chat-cart-total"> · ' + money(t.sub) + '</span>';
    cc.setAttribute('aria-label', 'Ver pedido: ' + t.count + ' productos, ' + money(t.sub));
    if ($('#cartSheet').open) renderCart();
  }

  /* ------------------------------------------------------------ pila de la burger */
  var LAYERS = {
    'pan-arriba': '<svg viewBox="0 0 200 72"><path class="ink f-paper" d="M10 66C8 33 48 6 100 6s92 27 90 60c0 2.5-2 4-4.5 4h-171C12 70 10 68.5 10 66Z"/><path class="ink f-none" d="M48 30c10-9 22-14 36-15"/><path class="ink f-none" d="M38 42c3-3 6-5 9-7"/></svg>',
    'pan-abajo': '<svg viewBox="0 0 200 36"><path class="ink f-paper" d="M10 5h180c3 0 5 3 4 6-5 14-19 20-40 20H46C25 31 11 25 6 11c-1-3 1-6 4-6Z"/></svg>',
    carne: '<svg viewBox="0 0 200 28"><path class="ink f-blue" d="M12 6c18-4 38-1 58-3s40 2 60 0 40-1 58 3c6 2 7 12 1 15-18 5-38 2-58 4s-40-2-60 0-40 1-58-3c-7-2-7-14-1-16Z"/><g class="dots"><circle cx="38" cy="12" r="1.9"/><circle cx="64" cy="17" r="1.7"/><circle cx="92" cy="11" r="1.9"/><circle cx="118" cy="17" r="1.7"/><circle cx="146" cy="12" r="1.9"/><circle cx="170" cy="16" r="1.7"/></g></svg>',
    cheddar: '<svg viewBox="0 0 200 22"><path class="ink f-soft" d="M8 4h184l-3 7h-26l-4 7c-1.5 2.5-4.5 2.5-6 0l-4-7H74l-3 5c-1.5 2.5-4.5 2.5-6 0l-3-5H11Z"/></svg>',
    tybo: '<svg viewBox="0 0 200 22"><path class="ink f-paper" d="M8 4h184l-3 7h-26l-4 7c-1.5 2.5-4.5 2.5-6 0l-4-7H74l-3 5c-1.5 2.5-4.5 2.5-6 0l-3-5H11Z"/></svg>',
    lechuga: '<svg viewBox="0 0 200 22"><path class="ink f-paper" d="M6 13C10 5 16 16 26 9S42 14 46 8S62 15 66 8S82 15 86 8S102 15 106 8S122 15 126 8S142 15 146 8S162 15 166 8S182 15 186 9C192 8 196 12 194 16C193 18 191 19 188 19H12C8 19 5 16 6 13Z"/></svg>',
    tomate: '<svg viewBox="0 0 200 20"><rect class="ink f-soft" x="14" y="3" width="84" height="14" rx="7"/><rect class="ink f-soft" x="102" y="3" width="84" height="14" rx="7"/><g class="dots-ink"><ellipse cx="40" cy="10" rx="3" ry="2"/><ellipse cx="58" cy="10" rx="3" ry="2"/><ellipse cx="76" cy="10" rx="3" ry="2"/><ellipse cx="128" cy="10" rx="3" ry="2"/><ellipse cx="146" cy="10" rx="3" ry="2"/><ellipse cx="164" cy="10" rx="3" ry="2"/></g></svg>',
    panceta: '<svg viewBox="0 0 200 20"><path class="ink f-soft" d="M10 6C30 0 46 12 70 6S112 0 134 6S172 12 190 5V13C172 20 152 8 132 14S90 20 70 14S30 8 10 14Z"/><path class="ink f-none" stroke-dasharray="10 8" d="M18 10C34 6 50 14 70 10S112 6 134 10S168 14 182 9"/></svg>',
    cebolla: '<svg viewBox="0 0 200 20"><g class="ink f-none"><path d="M14 13c6-8 16-8 22 0"/><path d="M34 11c8-7 18-5 24 3"/><path d="M58 14c5-9 17-10 24-1"/><path d="M80 10c8-5 18-3 22 5"/><path d="M100 14c6-8 16-9 22 0"/><path d="M120 11c8-6 18-4 24 4"/><path d="M142 13c5-8 17-9 24 0"/><path d="M164 11c8-6 16-3 22 4"/></g></svg>',
    caramelizada: '<svg viewBox="0 0 200 18"><path class="ink f-soft" d="M10 7c20-5 40 5 60 0s40 5 60 0 40-5 60 1v6c-20-5-40 4-60 0s-40 5-60 0-40 4-60-1Z"/><path class="ink f-none" d="M24 10c10-3 18 2 28 0M84 10c10-3 18 2 28 0M144 10c10-3 18 2 28 0"/></svg>',
    huevo: '<svg viewBox="0 0 200 24"><path class="ink f-paper" d="M16 13c0-8 34-10 84-10 52 0 84 3 84 10s-30 9-84 9c-52 0-84-1-84-9Z"/><ellipse class="ink f-blue" cx="108" cy="11" rx="20" ry="7"/></svg>',
    salsa: '<svg viewBox="0 0 200 14"><path class="ink f-soft" d="M10 3h180v4h-38c0 5-6 5-6 0H96c0 6-7 6-7 0H48c0 4-5 4-5 0H10Z"/></svg>',
    barbacoa: '<svg viewBox="0 0 200 14"><path class="ink f-blue" d="M10 3h180v4h-38c0 5-6 5-6 0H96c0 6-7 6-7 0H48c0 4-5 4-5 0H10Z"/></svg>',
    pollo: '<svg viewBox="0 0 200 32"><path class="ink f-soft" d="M14 11c4-5 10-3 14-6 6-3 12 1 18-1s12 2 20-1 12 3 20 0 12 2 20-1 12 3 20 0 14 2 20-1 12 3 18 1c8 1 12 7 9 11 3 5-1 11-8 11-6 3-12-1-18 2s-12-2-20 1-12-3-20 0-12-2-20 1-12-3-20 0-12-2-18 0c-8-1-12-6-9-10-4-4-1-9 4-9Z"/><g class="dots-ink"><circle cx="40" cy="14" r="1.7"/><circle cx="70" cy="20" r="1.7"/><circle cx="96" cy="12" r="1.7"/><circle cx="124" cy="20" r="1.7"/><circle cx="150" cy="13" r="1.7"/><circle cx="172" cy="19" r="1.7"/></g></svg>'
  };

  function layersFor(it) {
    var p = P[it.id];
    if (!p || !p.capas) return null;
    var quitar = it.quitar || [];
    var out = [{ k: 'pan-abajo', t: 'pan-abajo' }];
    p.capas.forEach(function (c) {
      if (c === 'CARNES') {
        for (var i = 1; i <= (it.carnes || 1); i++) {
          out.push({ k: 'carne-' + i, t: 'carne' });
          out.push({ k: 'queso-' + i, t: p.carnes.queso });
        }
      } else if (quitar.indexOf(c) === -1) {
        out.push({ k: c, t: c });
      }
    });
    (it.extras || []).forEach(function (x) { if (X[x] && X[x].capa) out.push({ k: 'x-' + x, t: X[x].capa }); });
    out.push({ k: 'pan-arriba', t: 'pan-arriba' });
    return out;
  }

  function renderStack(el, layers, animate) {
    if (!el || !layers) return;
    var animateNow = animate && !reduceMotion;
    var existing = {};
    $$('.layer', el).forEach(function (n) { existing[n.dataset.k] = n; });
    var first = {};
    if (animateNow) Object.keys(existing).forEach(function (k) { first[k] = existing[k].getBoundingClientRect().top; });
    var keep = {};
    layers.forEach(function (l) { keep[l.k] = true; });
    Object.keys(existing).forEach(function (k) { if (!keep[k]) existing[k].remove(); });
    var prev = null;
    layers.forEach(function (l) {
      var n = existing[l.k];
      if (!n) {
        n = document.createElement('span');
        n.className = 'layer';
        n.dataset.k = l.k;
        n.innerHTML = LAYERS[l.t] || '';
        if (animateNow) {
          n.classList.add('is-in');
          n.addEventListener('animationend', function () { n.classList.remove('is-in'); }, { once: true });
        }
      }
      if (prev) { if (prev.nextSibling !== n) prev.after(n); }
      else if (el.firstChild !== n) el.prepend(n);
      prev = n;
    });
    if (animateNow && el.animate) {
      Object.keys(first).forEach(function (k) {
        var n = existing[k];
        if (!keep[k] || !n.isConnected || !n.animate) return;
        var dy = first[k] - n.getBoundingClientRect().top;
        if (Math.abs(dy) > 1) {
          n.animate([{ transform: 'translateY(' + dy + 'px)' }, { transform: 'none' }], { duration: 480, easing: 'cubic-bezier(.34,1.4,.64,1)' });
        }
      });
    }
  }

  function stackEl(cls) {
    var s = document.createElement('div');
    s.className = 'stack' + (cls ? ' ' + cls : '');
    s.setAttribute('role', 'img');
    return s;
  }

  function stackLabel(it) {
    return 'Así queda: ' + [itemTitle(it)].concat(itemLines(it)).join(', ');
  }

  /* ------------------------------------------------------------ hojas (dialog) */
  var openers = new WeakMap();

  function openSheet(d) {
    if (!d.open) {
      openers.set(d, document.activeElement);
      d.showModal();
    }
    html.classList.add('is-locked');
  }

  function closeSheet(d, cb) {
    if (!d || !d.open) { if (cb) cb(); return; }
    var done = function () {
      d.classList.remove('is-closing');
      d.close();
      if (!$$('dialog[open]').length) html.classList.remove('is-locked');
      var o = openers.get(d);
      if (o && o.isConnected && typeof o.focus === 'function') o.focus({ preventScroll: true });
      if (cb) cb();
    };
    if (reduceMotion) return done();
    d.classList.add('is-closing');
    setTimeout(done, 220);
  }

  $$('dialog.sheet').forEach(function (d) {
    d.addEventListener('cancel', function (e) { e.preventDefault(); closeSheet(d); });
    d.addEventListener('click', function (e) {
      if (e.target === d) closeSheet(d);
      var c = e.target.closest('[data-close]');
      if (c && d.contains(c)) closeSheet(d);
    });
  });

  /* ------------------------------------------------------------ toast */
  var toastTimer;
  function toast(msg, actionLabel, action) {
    var t = $('#toast');
    t.innerHTML = icon('check') + '<span>' + esc(msg) + '</span>' + (actionLabel ? '<button type="button">' + esc(actionLabel) + '</button>' : '');
    if (actionLabel) $('button', t).addEventListener('click', function () { hideToast(); action(); });
    t.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 3600);
  }
  function hideToast() { $('#toast').classList.remove('is-on'); }

  /* ------------------------------------------------------------ carta */
  function priceTag(p, cls) {
    var label = '', value = p.precio;
    if (p.carnes && p.destaque) { label = 'la ' + sizeName(2); value = p.precio + (2 - p.carnes.incluidas) * C.carneExtra; }
    else if (p.carnes) label = 'desde';
    else if (p.precioEtiqueta) label = p.precioEtiqueta;
    return '<span class="price-tag' + (cls ? ' ' + cls : '') + '">' + (label ? '<small>' + esc(label) + '</small>' : '') + '<b>' + money(value) + '</b></span>';
  }

  function noteHTML(text) {
    return '<p class="hand dish-note note-arrow" aria-hidden="true">' + esc(text) + '<svg class="hand-arrow"><use href="#i-arrow"/></svg></p>';
  }

  function dishBody(p, btnCls) {
    var verb = p.carnes ? 'Armala' : 'Agregar';
    return '<div class="dish-body">' +
      '<h4 class="dish-name">' + esc(p.nombre) + '</h4>' +
      (p.banner ? '<p class="banner-label' + (p.destaque ? ' is-white' : '') + '">' + esc(p.banner) + '</p>' : '') +
      '<p class="dish-desc">' + esc(p.descripcion) + '</p>' +
      '<button class="btn ' + btnCls + '" type="button" data-customize="' + p.id + '" aria-label="' + verb + ' ' + esc(p.nombre) + '">' + verb + '</button>' +
    '</div>';
  }

  function renderMenu() {
    var n = 0;
    $('.dishes[data-cat="burgers"]').innerHTML = C.productos.filter(function (p) { return p.categoria === 'burgers'; }).map(function (p) {
      var img = '<img class="dish-img" src="' + p.foto + '" alt="' + esc("Charly's " + p.nombre) + '" width="560" height="400" loading="lazy" decoding="async">';
      if (p.destaque) {
        return '<article class="dish dish--feature" id="dish-' + p.id + '">' +
          '<div class="dish-stage"><span class="dish-band" aria-hidden="true"></span>' + img +
            (p.nota ? noteHTML(p.nota) : '') + priceTag(p, 'is-white') + '</div>' +
          dishBody(p, 'btn-light') +
        '</article>';
      }
      var flip = n++ % 2 === 1;
      return '<article class="dish dish--burger' + (flip ? ' is-flip' : '') + '" id="dish-' + p.id + '">' +
        '<div class="dish-stage"><span class="checker dish-band" aria-hidden="true"></span>' + img +
          '<span class="checker dish-floor" aria-hidden="true"></span>' + priceTag(p) + '</div>' +
        dishBody(p, 'btn-blue') +
      '</article>';
    }).join('');

    $('.dishes[data-cat="pollo"]').innerHTML = C.productos.filter(function (p) { return p.categoria === 'pollo'; }).map(function (p) {
      var framed = !!p.limitado;
      return '<article class="dish dish--photo' + (framed ? ' dish--framed' : '') + '" id="dish-' + p.id + '">' +
        '<div class="dish-stage">' +
          '<img class="dish-img" src="' + p.foto + '" alt="' + esc("Charly's " + p.nombre) + '" width="400" height="300" loading="lazy" decoding="async">' +
          (p.nota ? noteHTML(p.nota) : '') +
          (framed ? '<div class="seal" aria-hidden="true"><b>Limitado</b><span>por noche</span></div>' : '') +
          priceTag(p, framed ? 'is-alt' : '') +
        '</div>' +
        dishBody(p, 'btn-blue') +
        (framed ? '<p class="visually-hidden">' + esc(p.limitado) + '</p>' : '') +
      '</article>';
    }).join('');

    $('.sides[data-cat="extras"]').innerHTML = C.productos.filter(function (p) { return p.categoria === 'extras'; }).map(function (p) {
      return '<li class="side">' +
        '<div><h4>' + esc(p.nombre) + '</h4><p>' + esc(p.descripcion) + '</p></div>' +
        '<span class="side-price">' + money(p.precio) + '</span>' +
        '<button class="add-btn" type="button" data-add="' + p.id + '" aria-label="Agregar ' + esc(p.nombre) + '">' + icon('plus') + '</button>' +
      '</li>';
    }).join('');
  }

  /* ------------------------------------------------------------ armador (hoja) */
  var draft = null, editKey = null;

  function newDraft(id, preset) {
    var p = P[id];
    preset = preset || {};
    return {
      id: id,
      carnes: p.carnes ? Math.min(p.carnes.max, preset.carnes || p.carnes.incluidas) : null,
      extras: [], quitar: [], nota: '',
      opcion: p.opciones ? (preset.opcion || p.opciones.valores[0]) : null,
      qty: preset.qty || 1
    };
  }

  function openCustomizer(id, opts) {
    opts = opts || {};
    var p = P[id];
    editKey = opts.editKey || null;
    var base = editKey ? cart.filter(function (c) { return c.key === editKey; })[0] : null;
    draft = base ? JSON.parse(JSON.stringify(base)) : newDraft(id);
    var body = $('#customBody');
    var parts = [];
    parts.push('<h2 class="sheet-title" id="customTitle">' + esc(p.nombre) + '</h2>');
    parts.push('<p class="sheet-sub">' + esc(p.descripcion) + '</p>');
    if (p.capas) {
      parts.push('<div class="builder-stage"><span class="hand" aria-hidden="true">así va quedando</span><span class="price-tag builder-price"><b id="builderPrice"></b></span><div class="stack" id="builderStack"></div></div>');
    } else if (p.foto) {
      parts.push('<div class="builder-photo"><img src="' + p.foto + '" alt=""></div>');
    }
    if (p.carnes) {
      var rows = [];
      for (var n = 1; n <= p.carnes.max; n++) {
        rows.push('<label class="size-opt"><input type="radio" name="carnes" value="' + n + '"' + (draft.carnes === n ? ' checked' : '') + '>' +
          '<span>' + sizeName(n) + '<small>' + n + (n === 1 ? ' carne' : ' carnes') + '</small></span></label>');
      }
      parts.push('<fieldset class="opt-group"><legend class="opt-legend">Carnes <small>carne extra ' + money(C.carneExtra) + ' c/u</small></legend><div class="size-row">' + rows.join('') + '</div></fieldset>');
    }
    if (p.opciones) {
      parts.push('<fieldset class="opt-group"><legend class="opt-legend">' + esc(p.opciones.titulo) + '</legend><div class="check-list">' +
        p.opciones.valores.map(function (v) {
          return '<label class="check-opt"><input type="radio" name="opcion" value="' + esc(v) + '"' + (draft.opcion === v ? ' checked' : '') + '>' +
            '<span class="row"><span class="box"></span>' + esc(v) + '</span></label>';
        }).join('') + '</div></fieldset>');
    }
    if (p.extras && p.extras.length) {
      parts.push('<fieldset class="opt-group"><legend class="opt-legend">Sumale <small>opcional</small></legend><div class="check-list">' +
        p.extras.map(function (x) {
          var e = X[x]; if (!e) return '';
          return '<label class="check-opt"><input type="checkbox" name="extras" value="' + x + '"' + (draft.extras.indexOf(x) > -1 ? ' checked' : '') + '>' +
            '<span class="row"><span class="box">' + icon('check') + '</span>' + esc(e.nombre) + '<span class="price">+' + money(e.precio) + '</span></span></label>';
        }).join('') + '</div></fieldset>');
    }
    if (p.quitar && p.quitar.length) {
      parts.push('<fieldset class="opt-group"><legend class="opt-legend">Sacale <small>tocá lo que no va</small></legend><div class="chips">' +
        p.quitar.map(function (q) {
          return '<label class="chip"><input type="checkbox" name="quitar" value="' + q.id + '"' + (draft.quitar.indexOf(q.id) > -1 ? ' checked' : '') + '><span>' + esc(q.nombre) + '</span></label>';
        }).join('') + '</div></fieldset>');
    }
    parts.push('<div class="opt-group"><label class="opt-legend" for="noteField">Aclaración <small>opcional</small></label>' +
      '<textarea class="note-field" id="noteField" maxlength="140" placeholder="Ej: bien cocida, cortada al medio">' + esc(draft.nota || '') + '</textarea></div>');
    body.innerHTML = parts.join('');
    body.scrollTop = 0;

    $('#customFoot').innerHTML =
      '<div class="foot-row">' +
        '<div class="stepper" role="group" aria-label="Cantidad">' +
          '<button type="button" data-q="-1" aria-label="Una menos">' + icon('minus') + '</button>' +
          '<output class="val" id="customQty" aria-live="polite">' + draft.qty + '</output>' +
          '<button type="button" data-q="1" aria-label="Una más">' + icon('plus') + '</button>' +
        '</div>' +
        '<button class="btn btn-blue" type="button" id="customAdd"><span>' + (editKey ? 'Guardar' : 'Agregar') + '</span><span id="customTotal"></span></button>' +
      '</div>';

    updateCustomizer(false);
    openSheet($('#customSheet'));
  }

  function updateCustomizer(animate) {
    var u = unitPrice(draft);
    var bp = $('#builderPrice');
    if (bp) bp.textContent = money(u);
    $('#customTotal').textContent = money(u * draft.qty);
    $('#customQty').textContent = draft.qty;
    $('[data-q="-1"]', $('#customFoot')).disabled = draft.qty <= 1;
    var st = $('#builderStack');
    if (st) {
      renderStack(st, layersFor(draft), animate);
      st.setAttribute('aria-label', stackLabel(draft));
    }
  }

  $('#customBody').addEventListener('change', function (e) {
    var t = e.target;
    if (!draft) return;
    if (t.name === 'carnes') draft.carnes = +t.value;
    else if (t.name === 'opcion') draft.opcion = t.value;
    else if (t.name === 'extras') {
      draft.extras = $$('input[name="extras"]:checked', this).map(function (i) { return i.value; });
    } else if (t.name === 'quitar') {
      draft.quitar = $$('input[name="quitar"]:checked', this).map(function (i) { return i.value; });
    }
    updateCustomizer(true);
  });
  $('#customBody').addEventListener('input', function (e) {
    if (e.target.id === 'noteField' && draft) draft.nota = e.target.value;
  });
  $('#customFoot').addEventListener('click', function (e) {
    var q = e.target.closest('[data-q]');
    if (q && draft) {
      draft.qty = Math.max(1, Math.min(20, draft.qty + (+q.dataset.q)));
      updateCustomizer(false);
      return;
    }
    if (e.target.closest('#customAdd') && draft) {
      var it = draft, wasEdit = editKey;
      if (wasEdit) replaceItem(wasEdit, it); else addItem(it);
      closeSheet($('#customSheet'), function () {
        if ($('#cartSheet').open) return;
        toast((wasEdit ? 'Actualizaste ' : 'Sumaste ') + it.qty + '× ' + itemTitle(it), 'Ver pedido', openCart);
      });
    }
  });

  function quickAdd(id) {
    var p = P[id];
    if (p.opciones || (p.extras && p.extras.length) || (p.quitar && p.quitar.length) || p.carnes) return openCustomizer(id);
    var it = newDraft(id);
    addItem(it);
    toast('Sumaste 1× ' + p.nombre, 'Ver pedido', openCart);
  }

  /* ------------------------------------------------------------ carrito (hoja) */
  function ticket(inner) {
    var when = '';
    try {
      when = new Intl.DateTimeFormat('es-AR', { timeZone: C.local.zonaHoraria, day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })
        .format(new Date()).replace(',', ' ·');
    } catch (e) { /* sin zona horaria */ }
    return '<div class="ticket-wrap"><div class="comanda">' +
      '<div class="comanda-head"><img src="img/cut/logo-blue.png" alt="" width="348" height="137">' +
        '<div><b>Comanda</b><span>' + esc(when) + ' · pedido web</span></div></div>' +
      inner + '</div></div>';
  }

  function comandaItems(withActions) {
    return '<ul class="comanda-list">' + cart.map(function (it) {
      var lines = itemLines(it);
      return '<li class="comanda-item" data-key="' + it.key + '">' +
        '<h3><span class="qty">' + it.qty + '×</span> ' + esc(itemTitle(it)) + '</h3>' +
        '<span class="comanda-price">' + money(unitPrice(it) * it.qty) + '</span>' +
        (lines.length ? '<ul class="comanda-lines">' + lines.map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ul>' : '') +
        (withActions ?
          '<div class="comanda-actions">' +
            '<div class="stepper is-small" role="group" aria-label="Cantidad de ' + esc(itemTitle(it)) + '">' +
              '<button type="button" data-step="-1" aria-label="Una menos"' + (it.qty === 1 ? ' disabled' : '') + '>' + icon('minus') + '</button>' +
              '<span class="val">' + it.qty + '</span>' +
              '<button type="button" data-step="1" aria-label="Una más">' + icon('plus') + '</button>' +
            '</div>' +
            '<span class="spacer"></span>' +
            (P[it.id].capas || P[it.id].opciones || (P[it.id].extras || []).length ? '<button class="link-btn" type="button" data-edit>' + icon('edit') + 'Cambiar</button>' : '') +
            '<button class="link-btn" type="button" data-remove>' + icon('trash') + 'Quitar</button>' +
          '</div>' : '') +
      '</li>';
    }).join('') + '</ul>';
  }

  function renderCart() {
    var body = $('#cartBody'), foot = $('#cartFoot');
    if (!cart.length) {
      body.innerHTML = '<h2 class="sheet-title visually-hidden" id="cartTitle">Tu pedido</h2>' +
        '<div class="empty"><div class="stack is-small" id="emptyStack" aria-hidden="true"></div>' +
        '<h3>Todavía está vacío</h3><p>Elegí algo de la carta o dejá que el asistente te arme el pedido.</p>' +
        '<div class="btns"><button class="btn btn-blue" type="button" data-open-chat>' + icon('chat') + 'Armar con el asistente</button>' +
        '<a class="btn btn-ghost" href="#carta" data-close>Ver la carta</a></div></div>';
      renderStack($('#emptyStack'), [{ k: 'a', t: 'pan-abajo' }, { k: 'b', t: 'pan-arriba' }], false);
      foot.innerHTML = '';
      return;
    }
    var t = totals();
    body.innerHTML = '<h2 class="sheet-title" id="cartTitle">Tu pedido</h2>' +
      ticket(comandaItems(true) +
        '<div class="totals"><div class="grand"><span>Subtotal</span><span>' + money(t.sub) + '</span></div>' +
        (C.entrega.delivery.activo ? '<div><span>Si es delivery</span><span>+' + money(C.entrega.delivery.costo) + '</span></div>' : '') +
        '</div>') +
      (C.preciosDeEjemplo ? '<p class="demo-note cart-body-note">Precios de ejemplo, a confirmar por el local.</p>' : '');
    foot.innerHTML = '<div class="cart-foot">' +
      '<button class="btn btn-blue btn-block" type="button" id="checkoutBtn"><span>Elegir entrega y pago</span><span>' + money(t.sub) + '</span></button>' +
      '<button class="btn btn-ghost btn-block" type="button" data-close>Seguir pidiendo</button></div>';
  }

  function openCart() {
    renderCart();
    openSheet($('#cartSheet'));
  }

  $('#cartBody').addEventListener('click', function (e) {
    var li = e.target.closest('.comanda-item');
    if (!li) return;
    var key = li.dataset.key;
    var it = cart.filter(function (c) { return c.key === key; })[0];
    if (!it) return;
    var step = e.target.closest('[data-step]');
    if (step) { setQty(key, it.qty + (+step.dataset.step)); return; }
    if (e.target.closest('[data-remove]')) { setQty(key, 0); return; }
    if (e.target.closest('[data-edit]')) openCustomizer(it.id, { editKey: key });
  });
  $('#cartFoot').addEventListener('click', function (e) {
    if (e.target.closest('#checkoutBtn')) {
      closeSheet($('#cartSheet'), function () { openChat({ checkout: true }); });
    }
  });

  /* ------------------------------------------------------------ asistente */
  var chat = { started: false, token: 0, expect: null, draft: null, live: null, lastReplies: null, order: store.get('charlys.cliente') || {} };
  var log = $('#chatLog'), repliesEl = $('#chatReplies'), input = $('#chatInput');
  var queue = Promise.resolve();
  var DEFAULT_PH = 'Escribí, por ejemplo: 2 crunchy dobles';

  function scrollLog() { log.scrollTop = log.scrollHeight; }

  function addMsg(who, content, cls) {
    var d = document.createElement('div');
    d.className = 'msg ' + who + (cls ? ' ' + cls : '');
    if (typeof content === 'string') d.innerHTML = content;
    log.appendChild(d);
    scrollLog();
    return d;
  }

  function botSay(content, cls) {
    var tok = chat.token;
    queue = queue.then(function () {
      return new Promise(function (res) {
        if (tok !== chat.token) return res(null);
        var typing = addMsg('bot', '<span class="typing"><i></i><i></i><i></i></span>', 'is-typing');
        typing.setAttribute('aria-hidden', 'true');
        typing.style.padding = '0';
        var len = typeof content === 'string' ? content.replace(/<[^>]+>/g, '').length : 60;
        var delay = reduceMotion ? 60 : Math.min(950, 320 + len * 5);
        setTimeout(function () {
          typing.remove();
          if (tok !== chat.token) return res(null);
          var m = addMsg('bot', typeof content === 'string' ? content : '', cls);
          if (typeof content === 'function') content(m);
          scrollLog();
          res(m);
        }, delay);
      });
    });
    return queue;
  }

  function you(text) { addMsg('user', esc(text)); }

  function act() {
    chat.token++;
    queue = Promise.resolve();
    $$('.msg.is-typing', log).forEach(function (n) { n.remove(); });
    clearReplies();
    expectFree();
  }

  function clearReplies() { repliesEl.innerHTML = ''; }

  /* list: [{label, sub, primary, wa, href, icon, onPick, echo, pressed}] */
  function ask(list, opts) {
    var tok = chat.token;
    opts = opts || {};
    queue.then(function () {
      if (tok !== chat.token) return;
      chat.lastReplies = { list: list, opts: opts };
      renderReplies(list, opts);
    });
  }

  function renderReplies(list, opts) {
    repliesEl.innerHTML = '';
    list.forEach(function (r) {
      var el = document.createElement(r.href ? 'a' : 'button');
      el.className = 'reply' + (r.primary ? ' primary' : '') + (r.wa ? ' wa' : '');
      if (r.href) { el.href = r.href; el.target = '_blank'; el.rel = 'noopener'; }
      else el.type = 'button';
      if (r.toggle) el.setAttribute('aria-pressed', r.pressed ? 'true' : 'false');
      el.innerHTML = (r.toggle ? icon('check', 'reply-check') : '') + (r.icon ? icon(r.icon) : '') + '<span>' + esc(r.label) + '</span>' + (r.sub ? ' <small>' + esc(r.sub) + '</small>' : '');
      el.addEventListener('click', function (e) {
        if (r.toggle) {
          var on = el.getAttribute('aria-pressed') !== 'true';
          el.setAttribute('aria-pressed', on ? 'true' : 'false');
          r.onToggle(on, el);
          return;
        }
        var echo = r.echo !== undefined ? r.echo : r.label;
        var go = function () {
          act();
          if (echo) you(echo);
          if (r.onPick) r.onPick();
        };
        if (r.href) setTimeout(go, 0);
        else { e.preventDefault(); go(); }
      });
      repliesEl.appendChild(el);
    });
    if (opts.focus !== false && !opts.noFocus) {
      var firstBtn = repliesEl.querySelector('.reply');
      if (firstBtn && $('#chatSheet').open && document.activeElement !== input) firstBtn.focus({ preventScroll: true });
    }
    scrollLog();
  }

  function expect(cfg) {
    chat.expect = cfg;
    input.placeholder = cfg.placeholder || DEFAULT_PH;
    input.setAttribute('inputmode', cfg.numeric ? 'numeric' : 'text');
    input.setAttribute('autocomplete', cfg.autocomplete || 'off');
    $('#chatInputLabel').textContent = cfg.label || 'Escribí tu respuesta';
    if (cfg.focus && window.matchMedia('(hover: hover)').matches) setTimeout(function () { input.focus(); }, 50);
  }

  function expectFree() {
    chat.expect = null;
    input.placeholder = DEFAULT_PH;
    input.setAttribute('inputmode', 'text');
    input.setAttribute('autocomplete', 'off');
    $('#chatInputLabel').textContent = 'Escribí tu mensaje';
  }

  $('#chatForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var v = input.value.trim();
    if (!v) return;
    input.value = '';
    var handler = chat.expect;
    act();
    you(v);
    if (handler) handler.onText(v);
    else interpret(v);
  });

  $('#chatCart').addEventListener('click', openCart);

  /* --------- flujo */
  function greet() {
    var s = openState();
    botSay('¡Hola! Soy el asistente de pedidos de <strong>Charly\'s</strong>. Te armo el pedido acá y lo mandás por WhatsApp con un toque.');
    if (!s.open) botSay('Ahora estamos cerrados: abrimos ' + esc(s.when) + ' a ' + laHora(C.horario.abre) + '. Igual podés dejar el pedido armado y mandarlo.');
  }

  function mainMenu(prompt) {
    if (prompt !== false) botSay(prompt || (cart.length ? '¿Qué más te preparamos?' : '¿Qué te preparamos?'));
    var last = store.get('charlys.ultimo');
    var list = [];
    if (last && last.items && last.items.length && !cart.length) {
      list.push({ label: 'Repetir mi último pedido', icon: 'repeat', primary: true, onPick: repeatLast });
    }
    list.push({ label: 'Burgers', onPick: function () { showCategory('burgers'); } });
    list.push({ label: 'Pollo', onPick: function () { showCategory('pollo'); } });
    list.push({ label: 'Papas y bebidas', onPick: function () { showCategory('extras'); } });
    if (cart.length) list.push({ label: 'Terminar pedido', sub: money(totals().sub), primary: true, onPick: checkout });
    ask(list);
  }

  function showCategory(cat) {
    var items = C.productos.filter(function (p) { return p.categoria === cat; });
    var intro = { burgers: 'Estas son las burgers. Todas con pan de papa y carne de 100 g:', pollo: 'Lo de pollo, extra crocante:', extras: 'Para acompañar:' }[cat];
    botSay(function (m) {
      m.classList.add('wide');
      m.innerHTML = '<p>' + intro + '</p><div class="pick-row">' + items.map(function (p) {
        var img = p.foto ? '<span class="pick-img' + (p.fotoTipo === 'foto' ? ' is-photo' : '') + '"><img src="' + p.foto + '" alt="" loading="lazy"></span>' : '';
        return '<button class="pick" type="button" data-pick="' + p.id + '">' + img + '<b>' + esc(p.nombre) + '</b><span>' + (p.carnes ? 'desde ' : '') + money(p.precio) + '</span></button>';
      }).join('') + '</div>';
      $$('.pick', m).forEach(function (b) {
        b.addEventListener('click', function () {
          act();
          you(P[b.dataset.pick].nombre);
          startProduct(b.dataset.pick);
        });
      });
    });
    ask([{ label: 'Volver', onPick: function () { mainMenu(); } }], { noFocus: true });
  }

  function startProduct(id, preset) {
    preset = preset || {};
    var p = P[id];
    chat.draft = newDraft(id, preset);
    chat.presetQty = !!preset.qty;
    chat.live = null;
    if (p.carnes && !preset.carnes) return askCarnes();
    stepAfterCarnes(preset);
  }

  function stepAfterCarnes(preset) {
    var p = P[chat.draft.id];
    if (p.opciones && !(preset && preset.opcion)) return askOpcion();
    if (p.extras && p.extras.length) return askExtras();
    if (p.quitar && p.quitar.length) return askQuitar();
    askQty();
  }

  function askCarnes() {
    var p = P[chat.draft.id];
    botSay('¿Cómo querés la <strong>' + esc(p.nombre) + '</strong>?');
    var list = [];
    for (var n = 1; n <= p.carnes.max; n++) {
      (function (n) {
        var price = p.precio + (n - p.carnes.incluidas) * C.carneExtra;
        list.push({ label: sizeName(n).charAt(0).toUpperCase() + sizeName(n).slice(1), sub: money(price), onPick: function () { chat.draft.carnes = n; stepAfterCarnes(); } });
      })(n);
    }
    ask(list);
  }

  function askOpcion() {
    var p = P[chat.draft.id];
    botSay('¿' + esc(p.opciones.titulo) + '?');
    ask(p.opciones.valores.map(function (v) {
      return { label: v, onPick: function () { chat.draft.opcion = v; stepAfterOpcion(); } };
    }));
  }

  function stepAfterOpcion() {
    var p = P[chat.draft.id];
    if (p.extras && p.extras.length) return askExtras();
    if (p.quitar && p.quitar.length) return askQuitar();
    askQty();
  }

  function liveBubble(text) {
    botSay(function (m) {
      m.innerHTML = '<p>' + text + '</p>';
      if (P[chat.draft.id].capas) {
        var wrap = document.createElement('div');
        wrap.className = 'msg-stack';
        var s = stackEl('is-small');
        wrap.appendChild(s);
        m.appendChild(wrap);
        chat.live = s;
        renderStack(s, layersFor(chat.draft), false);
        s.setAttribute('aria-label', stackLabel(chat.draft));
      }
    });
  }

  function updateLive() {
    if (chat.live && chat.live.isConnected) {
      renderStack(chat.live, layersFor(chat.draft), true);
      chat.live.setAttribute('aria-label', stackLabel(chat.draft));
      scrollLog();
    }
  }

  function askExtras() {
    var p = P[chat.draft.id], d = chat.draft;
    liveBubble((p.carnes ? 'Buenísimo, ' + esc(itemTitle(d)) + '. ' : '') + '¿Le sumamos algo? Tocá todo lo que quieras.');
    var list = p.extras.filter(function (x) { return X[x]; }).map(function (x) {
      return {
        label: X[x].nombre, sub: '+' + money(X[x].precio), toggle: true, pressed: d.extras.indexOf(x) > -1,
        onToggle: function (on) {
          d.extras = d.extras.filter(function (y) { return y !== x; });
          if (on) d.extras.push(x);
          updateLive();
          var btn = repliesEl.querySelector('.reply.primary span');
          if (btn) btn.textContent = d.extras.length ? 'Listo, sumar ' + d.extras.length : 'Así está bien';
        }
      };
    });
    list.push({
      label: 'Así está bien', primary: true, echo: null,
      onPick: function () {
        you(d.extras.length ? 'Con ' + d.extras.map(function (x) { return X[x].nombre.toLowerCase(); }).join(', ') : 'Así está bien');
        stepAfterExtras();
      }
    });
    ask(list);
  }

  function stepAfterExtras() {
    var p = P[chat.draft.id];
    if (p.quitar && p.quitar.length) return askQuitar();
    askQty();
  }

  function askQuitar() {
    var p = P[chat.draft.id], d = chat.draft;
    botSay('¿Le sacamos algo?');
    var list = p.quitar.map(function (q) {
      return {
        label: 'Sin ' + q.nombre, toggle: true, pressed: d.quitar.indexOf(q.id) > -1,
        onToggle: function (on) {
          d.quitar = d.quitar.filter(function (y) { return y !== q.id; });
          if (on) d.quitar.push(q.id);
          updateLive();
          var btn = repliesEl.querySelector('.reply.primary span');
          if (btn) btn.textContent = d.quitar.length ? 'Listo' : 'No, va completa';
        }
      };
    });
    list.push({
      label: 'No, va completa', primary: true, echo: null,
      onPick: function () {
        you(d.quitar.length ? d.quitar.map(function (id) {
          return 'Sin ' + p.quitar.filter(function (q) { return q.id === id; })[0].nombre;
        }).join(', ') : 'Va completa');
        askQty();
      }
    });
    ask(list);
  }

  function askQty() {
    if (chat.presetQty) { chat.presetQty = false; return addFromChat(); }
    botSay('¿Cuántas querés?');
    ask([1, 2, 3, 4].map(function (n) {
      return { label: String(n), onPick: function () { chat.draft.qty = n; addFromChat(); } };
    }));
    expect({
      placeholder: 'Escribí la cantidad', numeric: true, label: 'Cantidad',
      onText: function (v) {
        var n = parseInt(v.replace(/\D/g, ''), 10);
        if (!n || n < 1 || n > 20) { botSay('Decime un número del 1 al 20.'); return askQty(); }
        chat.draft.qty = n;
        addFromChat();
      }
    });
  }

  function addFromChat() {
    var d = chat.draft;
    addItem(d);
    var lines = itemLines(d);
    botSay('Listo, sumé <strong>' + d.qty + '× ' + esc(itemTitle(d)) + '</strong>' +
      (lines.length ? ' (' + esc(lines.join(', ').toLowerCase()) + ')' : '') + ' · ' + money(unitPrice(d) * d.qty) + '.');
    afterAdd();
  }

  function afterAdd() {
    botSay('¿Algo más?');
    ask([
      { label: 'Terminar pedido', sub: money(totals().sub), primary: true, onPick: checkout },
      { label: 'Otra burger', onPick: function () { showCategory('burgers'); } },
      { label: 'Pollo', onPick: function () { showCategory('pollo'); } },
      { label: 'Papas o bebida', onPick: function () { showCategory('extras'); } }
    ]);
  }

  /* --------- checkout */
  function miniTicket(meta) {
    var o = chat.order, t = totals(meta ? o.modo : null);
    var h = comandaItems(false) + '<div class="totals">';
    if (meta && o.modo === 'delivery') {
      h += '<div><span>Subtotal</span><span>' + money(t.sub) + '</span></div><div><span>Envío</span><span>' + money(t.envio) + '</span></div>';
    }
    h += '<div class="grand"><span>' + (meta ? 'Total' : 'Subtotal') + '</span><span>' + money(t.total) + '</span></div></div>';
    if (meta) {
      h += '<div class="comanda-meta">' +
        '<div><b>Entrega:</b> ' + (o.modo === 'delivery' ? 'delivery a ' + esc(o.direccion) + (o.referencia ? ' (' + esc(o.referencia) + ')' : '') : 'retiro en el local') + '</div>' +
        '<div><b>Nombre:</b> ' + esc(o.nombre) + '</div>' +
        '<div><b>Pago:</b> ' + esc(payLine(t.total)) + '</div></div>' +
        '<p class="comanda-foot">¡gracias por pedir!</p>';
    }
    return ticket(h);
  }

  function sayTicket(intro, meta, after) {
    if (intro) botSay(intro);
    botSay(function (m) {
      m.classList.add('wide', 'is-ticket');
      m.innerHTML = miniTicket(meta) + (after || '');
    });
  }

  function payLine(total) {
    var o = chat.order;
    var pago = C.pagos.filter(function (p) { return p.id === o.pago; })[0];
    if (!pago) return '';
    if (pago.id === 'efectivo') {
      return o.pagaCon && o.pagaCon > total ? 'efectivo, paga con ' + money(o.pagaCon) + ' (vuelto ' + money(o.pagaCon - total) + ')' : 'efectivo, paga justo';
    }
    return pago.nombre.toLowerCase() + (pago.alias ? ' (alias ' + pago.alias + ')' : '');
  }

  function checkout() {
    if (!cart.length) {
      botSay('Todavía no sumaste nada. ¿Arrancamos por una burger?');
      return mainMenu(false);
    }
    sayTicket('Este es tu pedido hasta ahora:', false);
    askMode();
  }

  function askMode() {
    botSay('¿Te lo llevamos o lo retirás?');
    var list = [];
    if (C.entrega.delivery.activo) list.push({ label: 'Delivery', sub: '+' + money(C.entrega.delivery.costo), icon: 'moto', onPick: function () { chat.order.modo = 'delivery'; askAddress(); } });
    if (C.entrega.retiro.activo) list.push({ label: 'Retiro en el local', icon: 'store', onPick: function () { chat.order.modo = 'retiro'; askName(); } });
    list.push({ label: 'Cambiar el pedido', onPick: openCartFromChat });
    ask(list);
  }

  function openCartFromChat() {
    botSay('Te abro el pedido para que lo cambies. Cuando esté, tocá <strong>Elegir entrega y pago</strong>.');
    queue.then(openCart);
  }

  function askAddress(force) {
    var o = chat.order;
    if (o.direccion && !force) {
      botSay('¿Te lo llevamos a <strong>' + esc(o.direccion) + '</strong>?');
      ask([
        { label: 'Sí, ahí', primary: true, onPick: function () { askName(); } },
        { label: 'Otra dirección', onPick: function () { askAddress(true); } }
      ]);
      return;
    }
    botSay('¿A qué dirección? Calle, número y barrio.');
    expect({
      placeholder: 'Ej: San Martín 450, barrio Centro', autocomplete: 'street-address', label: 'Dirección de entrega', focus: true,
      onText: function (v) {
        if (v.length < 5) { botSay('Me falta un poco más de detalle: calle y número.'); return askAddress(true); }
        o.direccion = v;
        askRef();
      }
    });
  }

  function askRef() {
    botSay('¿Alguna referencia para encontrarte? Color de la casa, portón, piso…');
    ask([{ label: 'Sin referencia', onPick: function () { chat.order.referencia = ''; askName(); } }], { noFocus: true });
    expect({
      placeholder: 'Ej: casa de rejas verdes', label: 'Referencia', focus: true,
      onText: function (v) { chat.order.referencia = v; askName(); }
    });
  }

  function askName(force) {
    var o = chat.order;
    if (o.nombre && !force) {
      botSay('¿A nombre de <strong>' + esc(o.nombre) + '</strong>?');
      ask([
        { label: 'Sí', primary: true, onPick: askPay },
        { label: 'Otro nombre', onPick: function () { askName(true); } }
      ]);
      return;
    }
    botSay('¿A nombre de quién va el pedido?');
    expect({
      placeholder: 'Tu nombre', autocomplete: 'name', label: 'Nombre', focus: true,
      onText: function (v) {
        if (v.length < 2) { botSay('¿Me pasás tu nombre?'); return askName(true); }
        o.nombre = v.slice(0, 40);
        askPay();
      }
    });
  }

  function askPay() {
    botSay('¿Cómo pagás?');
    ask(C.pagos.map(function (p) {
      return {
        label: p.nombre, icon: p.id === 'efectivo' ? 'cash' : null,
        onPick: function () {
          chat.order.pago = p.id;
          if (p.id === 'efectivo') return askCash();
          if (p.alias) botSay('Alias: <strong>' + esc(p.alias) + '</strong>. Cuando te confirmemos el pedido por WhatsApp, mandá el comprobante por ahí.');
          review();
        }
      };
    }));
  }

  function askCash() {
    var total = totals(chat.order.modo).total;
    botSay('Son <strong>' + money(total) + '</strong>. ¿Con cuánto pagás? Así te llevamos el vuelto.');
    var opts = [];
    [1000, 5000, 10000, 20000].forEach(function (step) {
      var v = Math.ceil(total / step) * step;
      if (v > total && opts.indexOf(v) === -1) opts.push(v);
    });
    if (opts.indexOf(20000) === -1 && 20000 > total) opts.push(20000);
    opts = opts.sort(function (a, b) { return a - b; }).slice(0, 3);
    var list = [{ label: 'Pago justo', onPick: function () { chat.order.pagaCon = null; review(); } }];
    opts.forEach(function (v) {
      list.push({ label: money(v), onPick: function () { chat.order.pagaCon = v; review(); } });
    });
    ask(list);
    expect({
      placeholder: 'Otro monto, ej: 15000', numeric: true, label: 'Monto con el que pagás',
      onText: function (v) {
        var n = parseInt(v.replace(/\D/g, ''), 10);
        if (!n) { botSay('No entendí el monto. Escribilo solo con números.'); return askCash(); }
        if (n < total) { botSay('Con ' + money(n) + ' no alcanza: el total es ' + money(total) + '.'); return askCash(); }
        chat.order.pagaCon = n === total ? null : n;
        review();
      }
    });
  }

  function review() {
    if (!cart.length) { botSay('Tu pedido quedó vacío.'); return mainMenu(false); }
    var s = openState();
    sayTicket('<strong>¡Listo!</strong> Revisá que esté todo bien:', true,
      !s.open ? '<p class="warn">Ahora estamos cerrados. Te respondemos apenas abramos, ' + esc(s.when) + ' a ' + laHora(C.horario.abre) + '.</p>' : '');
    var url = sendOrder(chat.order);
    ask([
      { label: 'Enviar por WhatsApp', icon: 'wa', wa: true, href: url, echo: null, onPick: sent },
      { label: 'Cambiar algo', onPick: askChange }
    ]);
  }

  function askChange() {
    botSay('¿Qué querés cambiar?');
    ask([
      { label: 'Productos', onPick: openCartFromChat },
      { label: 'Entrega', onPick: askMode },
      { label: 'Nombre', onPick: function () { askName(true); } },
      { label: 'Pago', onPick: askPay },
      { label: 'Nada, está bien', primary: true, onPick: review }
    ]);
  }

  /* PUNTO DE INTEGRACIÓN — hoy el pedido sale como mensaje de WhatsApp que el
     cliente envía con un toque. Para que entre solo al chat del local (API de
     WhatsApp Business u otra integración), reemplazá esta función por un envío
     a ese servicio y devolvé el link de confirmación. */
  function sendOrder(order) {
    return 'https://wa.me/' + C.local.whatsapp + '?text=' + encodeURIComponent(buildMessage(order));
  }

  function buildMessage(o) {
    var t = totals(o.modo), L = [];
    L.push('¡Hola Charly\'s! Quiero hacer un pedido:');
    L.push('');
    cart.forEach(function (it) {
      L.push('• ' + it.qty + 'x ' + itemTitle(it) + ' — ' + money(unitPrice(it) * it.qty));
      itemLines(it).forEach(function (l) { L.push('    ' + l); });
    });
    L.push('');
    if (o.modo === 'delivery') {
      L.push('Subtotal: ' + money(t.sub));
      L.push('Envío: ' + money(t.envio));
    }
    L.push('*Total: ' + money(t.total) + '*');
    L.push('');
    if (o.modo === 'delivery') {
      L.push('*Delivery* a: ' + o.direccion);
      if (o.referencia) L.push('Referencia: ' + o.referencia);
    } else {
      L.push('*Retiro en el local*');
    }
    L.push('*Nombre:* ' + o.nombre);
    var pl = payLine(t.total);
    L.push('*Pago:* ' + pl.charAt(0).toUpperCase() + pl.slice(1));
    return L.join('\n');
  }

  function sent() {
    var url = sendOrder(chat.order);
    var o = chat.order;
    store.set('charlys.cliente', { nombre: o.nombre, direccion: o.direccion, referencia: o.referencia, modo: o.modo, pago: o.pago });
    store.set('charlys.ultimo', { items: cart.map(cleanItem), fecha: Date.now() });
    cart = [];
    saveCart(false);
    renderRepeat();
    botSay('¡Pedido armado! Se abrió WhatsApp con todo escrito: <strong>solo falta que toques enviar</strong>. Te confirmamos por ahí.');
    botSay('Si WhatsApp no se abrió, <a href="' + esc(url) + '" target="_blank" rel="noopener">tocá acá para abrirlo de nuevo</a>.');
    ask([
      { label: 'Hacer otro pedido', onPick: function () { mainMenu(); } },
      { label: 'Cerrar', onPick: function () { closeSheet($('#chatSheet')); } }
    ], { noFocus: true });
  }

  function repeatLast() {
    var last = store.get('charlys.ultimo');
    if (!last || !last.items || !last.items.length) { return mainMenu('No encontré un pedido anterior en este teléfono. ¿Arrancamos uno nuevo?'); }
    last.items.forEach(function (it) { if (P[it.id]) addItem(it); });
    sayTicket('Sumé tu último pedido:', false);
    var o = chat.order;
    if (o.modo && o.nombre && o.pago && (o.modo === 'retiro' || o.direccion)) {
      var entrega = o.modo === 'delivery' ? 'delivery a ' + o.direccion : 'retiro en el local';
      var pago = (C.pagos.filter(function (p) { return p.id === o.pago; })[0] || {}).nombre || '';
      botSay('¿Igual que la otra vez? <strong>' + esc(entrega) + '</strong>, a nombre de ' + esc(o.nombre) + ', pago con ' + esc(pago.toLowerCase()) + '.');
      ask([
        { label: 'Sí, igual', primary: true, onPick: function () { if (o.pago === 'efectivo') askCash(); else review(); } },
        { label: 'Cambiar datos', onPick: askMode },
        { label: 'Sumar algo más', onPick: function () { mainMenu(); } }
      ]);
    } else {
      afterAdd();
    }
  }

  /* --------- respuestas a texto libre */
  function interpret(text) {
    var t = norm(text);
    var words = { un: 1, una: 1, uno: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5 };
    var m = t.match(/\b(\d{1,2})\b/), qty = m ? +m[1] : null;
    if (!qty) Object.keys(words).some(function (w) { if (new RegExp('\\b' + w + '\\b').test(t)) { qty = words[w]; return true; } return false; });
    var carnes = /cuadrupl/.test(t) ? 4 : /tripl/.test(t) ? 3 : /dobl/.test(t) ? 2 : /simpl/.test(t) ? 1 : null;
    var keys = [['clasic', 'clasica'], ['cheese', 'cheese'], ['chees', 'cheese'], ['crunch', 'crunchy'], ['bbq', 'bbq'], ['barbacoa', 'bbq'],
      ['chicken', 'chicken'], ['box', 'box'], ['papas cheddar', 'papas-cheddar'], ['papas con cheddar', 'papas-cheddar'], ['papa', 'papas'],
      ['gaseosa', 'gaseosa'], ['coca', 'gaseosa'], ['sprite', 'gaseosa'], ['fanta', 'gaseosa'], ['agua', 'agua']];
    for (var i = 0; i < keys.length; i++) {
      if (t.indexOf(keys[i][0]) > -1 && P[keys[i][1]]) {
        var id = keys[i][1], preset = { qty: qty && qty <= 20 ? qty : null, carnes: P[id].carnes ? carnes : null };
        if (P[id].opciones) {
          var op = P[id].opciones.valores.filter(function (v) { return t.indexOf(norm(v).split(' ')[0]) > -1 && norm(v).split(' ')[0] !== 'con'; });
          if (/zero/.test(t)) op = ['Coca-Cola Zero'];
          if (op.length && P[id].opciones.valores.indexOf(op[0]) > -1) preset.opcion = op[0];
        }
        return startProduct(id, preset);
      }
    }
    if (/pollo/.test(t)) return showCategory('pollo');
    if (/hamburg|burger/.test(t)) return showCategory('burgers');
    if (/bebida|tomar|gaseo/.test(t)) return showCategory('extras');
    if (/horari|abiert|abren|cierra|hora|cerrad/.test(t)) {
      botSay('Abrimos de martes a domingo de ' + C.horario.abre + ' a ' + C.horario.cierra + '. Los lunes cerramos. Ahora: ' + esc(statusLine(openState()).toLowerCase()) + '.');
      return restoreReplies();
    }
    if (/donde|direcci|ubicac|queda/.test(t)) {
      botSay('Estamos en ' + esc(C.local.ciudad) + '. Podés retirar en el local o pedir delivery.');
      return restoreReplies();
    }
    if (/delivery|envio|envian|llevan/.test(t)) {
      botSay('Sí, hacemos delivery en Famaillá. El envío cuesta ' + money(C.entrega.delivery.costo) + ' y lo elegís al terminar el pedido.');
      return restoreReplies();
    }
    if (/pago|pagar|transfer|mercado|efectivo|alias|tarjeta/.test(t)) {
      botSay('Podés pagar con ' + C.pagos.map(function (p) { return p.nombre.toLowerCase(); }).join(', ').replace(/, ([^,]*)$/, ' o $1') + '. Lo elegís al final.');
      return restoreReplies();
    }
    if (/termin|finaliz|confirm|listo|enviar|nada mas|eso es todo|es todo/.test(t)) return checkout();
    if (/pedido|carrito|total|cuanto/.test(t)) {
      if (!cart.length) { botSay('Tu pedido está vacío por ahora.'); return mainMenu(false); }
      sayTicket('Esto llevás:', false);
      return afterAdd();
    }
    if (/gracias/.test(t)) { botSay('¡De nada! Acá estoy si necesitás algo más.'); return restoreReplies(); }
    if (/^(hola|buenas|buen dia|buenas noches|hey|que tal)/.test(t)) return mainMenu('¡Hola! ¿Qué te preparamos?');
    if (/menu|carta|que tienen|que hay|opciones/.test(t)) return mainMenu('Esto es lo que tenemos:');
    botSay('No te entendí bien. Tocá una opción o escribí algo como <em>“2 crunchy dobles”</em>, <em>“papas”</em> o <em>“terminar”</em>.');
    restoreReplies();
  }

  function restoreReplies() {
    if (chat.lastReplies) ask(chat.lastReplies.list, chat.lastReplies.opts);
    else mainMenu(false);
  }

  function openChat(opts) {
    opts = opts || {};
    var d = $('#chatSheet');
    var run = function () {
      openSheet(d);
      if (!chat.started) {
        chat.started = true;
        greet();
        if (!opts.checkout && !opts.repeat) return mainMenu();
      }
      if (opts.checkout) { act(); checkout(); }
      else if (opts.repeat) { act(); repeatLast(); }
      else if (!repliesEl.children.length && !chat.expect) mainMenu();
    };
    var other = $$('dialog.sheet[open]').filter(function (x) { return x !== d; })[0];
    if (other) closeSheet(other, run); else run();
  }

  /* ------------------------------------------------------------ repetir (hero) */
  function renderRepeat() {
    var last = store.get('charlys.ultimo');
    var card = $('#repeatCard');
    if (!last || !last.items || !last.items.length) { card.hidden = true; return; }
    var items = last.items.filter(function (it) { return P[it.id]; });
    if (!items.length) { card.hidden = true; return; }
    $('#repeatSummary').textContent = items.map(function (it) { return it.qty + '× ' + itemTitle(it); }).join(', ');
    card.hidden = false;
  }

  /* ------------------------------------------------------------ dock */
  var heroVisible = true;
  function updateDock() {
    $('#dock').classList.toggle('is-visible', cart.length > 0 || !heroVisible);
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting;
      updateDock();
    }, { rootMargin: '0px 0px -40px 0px' }).observe($('.hero-actions'));

    var tabs = $$('.tab');
    var catObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        tabs.forEach(function (tb) { tb.classList.toggle('is-active', tb.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('.cat').forEach(function (c) { catObs.observe(c); });
  } else {
    heroVisible = false;
  }

  /* ------------------------------------------------------------ eventos globales */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-open-chat]');
    if (t) { e.preventDefault(); openChat(); return; }
    var c = e.target.closest('[data-customize]');
    if (c) { openCustomizer(c.dataset.customize); return; }
    var a = e.target.closest('[data-add]');
    if (a) { quickAdd(a.dataset.add); return; }
  });
  $('#cartBtn').addEventListener('click', openCart);
  $('#dockBtn').addEventListener('click', function () { if (cart.length) openCart(); else openChat(); });
  $('#repeatBtn').addEventListener('click', function () { openChat({ repeat: true }); });

  /* ------------------------------------------------------------ visor 3D */
  /* La foto fija (póster) se ve desde el primer momento. El visor y el modelo (1,7 MB)
     se cargan después de que la página terminó de cargar, y no se cargan si el teléfono
     tiene activado el ahorro de datos o la conexión es 2G. */
  var MODEL_VIEWER_SRC = 'https://cdn.jsdelivr.net/npm/@google/model-viewer@4.1.0/dist/model-viewer.min.js';
  var model = $('#heroModel');
  if (model) {
    if (reduceMotion) model.removeAttribute('auto-rotate');
    model.addEventListener('load', function () {
      try {
        var pbr = model.model.materials[0].pbrMetallicRoughness;
        pbr.setMetallicFactor(0);       // es comida, no metal
        pbr.setRoughnessFactor(0.85);
      } catch (e) { /* modelo sin materiales editables */ }
      var note = $('#heroNote');
      if (note) note.firstChild.nodeValue = '¡girala!';
    });
    var conn = navigator.connection || {};
    var lightData = conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '');
    if (!lightData) {
      var load3D = function () {
        if (window.customElements && customElements.get('model-viewer')) return;
        var sc = document.createElement('script');
        sc.type = 'module';
        sc.src = MODEL_VIEWER_SRC;
        document.head.appendChild(sc);
      };
      var later = function () {
        if ('requestIdleCallback' in window) requestIdleCallback(load3D, { timeout: 2500 });
        else setTimeout(load3D, 800);
      };
      if (document.readyState === 'complete') later();
      else window.addEventListener('load', later, { once: true });
    }
  }

  /* ------------------------------------------------------------ inicio */
  renderMenu();
  renderStatus();
  renderCartUI(false);
  renderRepeat();
  $('#year').textContent = new Date().getFullYear();
  $('#demoNote').hidden = !C.preciosDeEjemplo;
  if (C.entrega.delivery.activo) $('#infoDelivery').textContent = 'Famaillá · ' + money(C.entrega.delivery.costo);
  $('#infoPagos').textContent = C.pagos.map(function (p) { return p.nombre; }).join(', ').replace(/, ([^,]*)$/, ' o $1');
  setInterval(renderStatus, 60000);
})();
