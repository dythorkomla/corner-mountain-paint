/* Corner Mountain Paint — small progressive-enhancement helpers.
   No dependencies. Everything degrades gracefully without JS. */
(function () {
  "use strict";

  var FALLBACK_EMAIL = "sales@cornermountainpaint.com";

  /* ---------- mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- contact form -> background submit (Web3Forms / Formspree) ---------- */
  var cform = document.getElementById("contact-form");
  if (cform) {
    var status = document.getElementById("form-status");
    var submitBtn = cform.querySelector('button[type="submit"]');
    var FALLBACK = "We couldn’t send that just now. Please email " + FALLBACK_EMAIL + " instead.";

    var showStatus = function (msg, ok) {
      if (!status) return;
      status.textContent = msg;
      status.hidden = false;
      status.style.borderLeftColor = ok ? "var(--amber)" : "#b23b3b";
    };

    cform.addEventListener("submit", function (e) {
      e.preventDefault();

      // honeypots: if a bot filled these, silently drop
      var cb = cform.querySelector('input[name="botcheck"]');
      var gotcha = cform.querySelector('input[name="_gotcha"]');
      if ((cb && cb.checked) || (gotcha && gotcha.value)) return;

      // key not configured yet
      var key = cform.querySelector('input[name="access_key"]');
      if (key && /PASTE-WEB3FORMS/.test(key.value)) {
        showStatus("The message form isn’t finished being set up yet — please email " + FALLBACK_EMAIL + " for now.", false);
        return;
      }

      var original = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      showStatus("Sending…", true);

      fetch(cform.action, {
        method: "POST",
        body: new FormData(cform),
        headers: { "Accept": "application/json" }
      })
        .then(function (r) { return r.ok; })
        .then(function (ok) {
          if (ok) {
            cform.reset();
            showStatus("Thanks — your message is on its way. We’ll be in touch soon.", true);
          } else {
            showStatus(FALLBACK, false);
          }
        })
        .catch(function () { showStatus(FALLBACK, false); })
        .then(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = original;
        });
    });
  }

  /* ---------- photo lightbox ---------- */
  var gallery = document.querySelector(".gallery");
  if (!gallery) return;

  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Enlarged photo");
  box.innerHTML =
    '<button class="lightbox__close" type="button" aria-label="Close">&times;</button><img alt="">';
  document.body.appendChild(box);

  var boxImg = box.querySelector("img");
  var closeBtn = box.querySelector(".lightbox__close");
  var lastFocus = null;

  function open(src, alt) {
    lastFocus = document.activeElement;
    boxImg.src = src;
    boxImg.alt = alt || "";
    box.classList.add("is-open");
    closeBtn.focus();
    document.addEventListener("keydown", onKey);
  }
  function close() {
    box.classList.remove("is-open");
    boxImg.src = "";
    document.removeEventListener("keydown", onKey);
    if (lastFocus) lastFocus.focus();
  }
  function onKey(e) {
    if (e.key === "Escape") close();
  }

  gallery.addEventListener("click", function (e) {
    var btn = e.target.closest("button");
    if (!btn) return;
    var img = btn.querySelector("img");
    if (!img) return;
    open(img.getAttribute("data-full") || img.src, img.alt);
  });
  closeBtn.addEventListener("click", close);
  box.addEventListener("click", function (e) {
    if (e.target === box) close();
  });
})();
