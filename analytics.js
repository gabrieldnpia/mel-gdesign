/* =====================================================================
   Google Analytics 4 para mel.gdesign
   - Solo se activa si hay un ID de medición en analytics-config.js.
   - Pide permiso de cookies (Consent Mode v2): sin permiso no se guardan cookies.
   - No cuenta las visitas hechas con ?editar, con «No rastrear» activado ni las
     del propio equipo de Mel (marca que pone el panel /admin.html).
   - Eventos propios: whatsapp_click, formulario_iniciado, formulario_enviado,
     copiar_correo, click_red_social, ebook_click, cta_proyecto y una vista de
     página virtual por cada proyecto (/proyecto/<nombre>).
   ===================================================================== */
(function () {
  'use strict';
  var C = window.MEL_CONFIG || {};
  var ID = C.GA_MEASUREMENT_ID;
  var KEY = 'mel-cookies';
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  window.melTrack = function () {};
  var skip = /(^|[?&])editar(&|$)/.test(location.search) || get('mel-no-track') === '1' ||
             navigator.doNotTrack === '1' || window.doNotTrack === '1';
  if (!ID || !/^G-[A-Z0-9]+$/i.test(ID) || skip) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  var choice = get(KEY);
  gtag('consent', 'default', {
    analytics_storage: choice === 'yes' ? 'granted' : 'denied',
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500
  });
  var s = document.createElement('script');
  s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ID);
  document.head.appendChild(s);
  gtag('js', new Date());
  gtag('config', ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });

  window.melTrack = function (name, params) { gtag('event', name, params || {}); };

  /* ---- vistas de página (la web es de una sola página: cada proyecto cuenta como una vista) ---- */
  var base = location.origin + location.pathname.replace(/index\.html$/, '');
  var last = '';
  function view() {
    var m = location.hash.match(/^#proyecto\/([\w-]+)$/);
    var loc = m ? base.replace(/\/$/, '') + '/proyecto/' + m[1] : base;
    if (loc === last) return;
    last = loc;
    gtag('event', 'page_view', { page_location: loc, page_title: m ? document.title : 'Mel Baptista · Creadora de marcas' });
  }
  view();
  window.addEventListener('hashchange', function () { setTimeout(view, 60); });

  /* ---- eventos por clic ---- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a,button'); if (!a) return;
    var href = a.getAttribute('href') || '';
    if (/^https:\/\/wa\.me\//.test(href)) return melTrack('whatsapp_click');
    if (a.hasAttribute('data-copy')) return melTrack('copiar_correo');
    var red = /instagram\.com/.test(href) ? 'instagram' : /behance\.net/.test(href) ? 'behance' :
              /pinterest\.com/.test(href) ? 'pinterest' : '';
    if (red) return melTrack('click_red_social', { red: red });
    if (/subscribepage/.test(href)) return melTrack('ebook_click');
    if (a.classList.contains('case-cta')) return melTrack('cta_proyecto', { proyecto: (location.hash.split('/')[1] || '') });
  }, true);
  var started = false;
  document.addEventListener('focusin', function (e) {
    if (!started && e.target.closest && e.target.closest('#brief')) { started = true; melTrack('formulario_iniciado'); }
  });

  /* ---- aviso de cookies ---- */
  if (choice !== 'yes' && choice !== 'no') {
    var st = document.createElement('style');
    st.textContent = '.ck{position:fixed;left:16px;bottom:16px;z-index:95;max-width:min(380px,calc(100vw - 32px));padding:16px 18px;border:1.5px solid #221A1E;border-radius:20px;background:#FBF7F3;color:#221A1E;font:400 13.5px/1.45 Inter,system-ui,sans-serif;box-shadow:0 14px 34px rgba(34,26,30,.2)}' +
      '.ck p{margin:0 0 12px}.ck b{font-weight:700}.ck div{display:flex;gap:8px;flex-wrap:wrap}' +
      '.ck button{border:1.5px solid #221A1E;border-radius:999px;padding:8px 16px;font:600 13px/1 Inter,system-ui,sans-serif;cursor:pointer;background:transparent;color:#221A1E}' +
      '.ck button.y{background:#FF4FA3;border-color:#FF4FA3}.ck button:focus-visible{outline:3px solid #D91F77;outline-offset:2px}';
    document.head.appendChild(st);
    var box = document.createElement('div');
    box.className = 'ck'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Aviso de cookies');
    box.innerHTML = '<p><b>🍪 Cookies de estadísticas.</b> Uso Google Analytics para saber cuántas personas visitan la web y qué proyectos les gustan. Sin publicidad ni venta de datos.</p><div><button class="y" type="button" data-v="yes">Aceptar</button><button type="button" data-v="no">No, gracias</button></div>';
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      set(KEY, b.dataset.v);
      gtag('consent', 'update', { analytics_storage: b.dataset.v === 'yes' ? 'granted' : 'denied' });
      box.remove();
    });
    document.addEventListener('DOMContentLoaded', function () { document.body.appendChild(box); });
    if (document.readyState !== 'loading') document.body.appendChild(box);
  }
})();
