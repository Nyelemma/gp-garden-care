/* ===========================================================
   GP Garden Care - script.js
   - Mobile nav toggle
   - Sticky header shadow on scroll
   - Before/After slider (drag, range, keyboard)
   - Scroll reveal animations
   - Contact form -> mailto handler
   - Footer year
   =========================================================== */
(function () {
  "use strict";

  /* ----- Footer year ----- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----- Mobile nav ----- */
  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("main-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* ----- Sticky header shadow ----- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 20) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ----- Before / After slider ----- */
  document.querySelectorAll(".ba-slider").forEach(function (slider) {
    var before = slider.querySelector(".ba-before");
    var beforeImg = slider.querySelector(".ba-before img");
    var handle = slider.querySelector(".ba-handle");
    var range = slider.querySelector(".ba-range");
    if (!before || !handle) return;

    var syncBeforeImageWidth = function () {
      if (!beforeImg) return;
      var w = slider.offsetWidth;
      if (w > 0) beforeImg.style.width = w + "px";
    };

    var setPosition = function (percent) {
      var p = Math.max(0, Math.min(100, percent));
      before.style.width = p + "%";
      handle.style.left = p + "%";
      handle.setAttribute("aria-valuenow", Math.round(p));
      if (range) range.value = p;
    };

    syncBeforeImageWidth();
    window.addEventListener("resize", syncBeforeImageWidth, { passive: true });
    if ("ResizeObserver" in window) {
      new ResizeObserver(syncBeforeImageWidth).observe(slider);
    }

    if (range) {
      range.addEventListener("input", function () {
        setPosition(parseFloat(range.value));
      });
    }

    var dragging = false;
    var moveFromEvent = function (clientX) {
      var rect = slider.getBoundingClientRect();
      setPosition(((clientX - rect.left) / rect.width) * 100);
    };

    slider.addEventListener("pointerdown", function (e) {
      dragging = true;
      slider.setPointerCapture(e.pointerId);
      moveFromEvent(e.clientX);
    });
    slider.addEventListener("pointermove", function (e) {
      if (dragging) moveFromEvent(e.clientX);
    });
    slider.addEventListener("pointerup", function () {
      dragging = false;
    });
    slider.addEventListener("pointercancel", function () {
      dragging = false;
    });

    handle.addEventListener("keydown", function (e) {
      var current = parseFloat(handle.getAttribute("aria-valuenow")) || 50;
      if (e.key === "ArrowLeft") {
        setPosition(current - 4);
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        setPosition(current + 4);
        e.preventDefault();
      }
    });

    setPosition(50);
  });

  /* ----- Scroll reveal ----- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ----- Contact form -> mailto ----- */
  var form = document.getElementById("contact-form");
  var hint = document.getElementById("contact-email-hint");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var to = (form.getAttribute("data-contact-email") || "").trim();
      var name = (document.getElementById("contact-name").value || "").trim();
      var from = (document.getElementById("contact-email").value || "").trim();
      var phone = (document.getElementById("contact-phone").value || "").trim();
      var message = (document.getElementById("contact-message").value || "").trim();

      if (!name || !from || !message) {
        if (hint) {
          hint.textContent = "Please add your name, email and a short message.";
          hint.style.color = "#a13b2a";
        }
        return;
      }
      if (!to) {
        if (hint) {
          hint.textContent =
            "Email not configured yet. Please reach us on WhatsApp or call 07981 234504.";
          hint.style.color = "#a13b2a";
        }
        return;
      }

      var subject = encodeURIComponent("Garden enquiry from " + name);
      var body = encodeURIComponent(
        "Name: " +
          name +
          "\nEmail: " +
          from +
          (phone ? "\nPhone: " + phone : "") +
          "\n\n" +
          message
      );
      window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;

      if (hint) {
        hint.textContent = "Opening your email app… if nothing happens, email us directly.";
        hint.style.color = "";
      }
    });
  }
})();
