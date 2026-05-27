/**
 * main.js — Meridian Consulting
 * ─────────────────────────────────────────────────────────────
 * Modules:
 *  1. Navbar scroll state
 *  2. Hamburger / mobile menu toggle
 *  3. Close mobile menu on nav-link click
 *  4. FAQ accordion
 *  5. Contact form validation
 *  6. Footer year
 * ─────────────────────────────────────────────────────────────
 */

'use strict';

/* ============================================================
   UTILITY: Query helpers
============================================================ */
const qs  = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];


/* ============================================================
   1. NAVBAR — Add "scrolled" class on scroll for subtle shadow
============================================================ */
(function initNavbarScroll() {
  const header = qs('#site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 16);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // set correct state on load
})();


/* ============================================================
   2. HAMBURGER MENU — Toggle mobile nav open / closed
============================================================ */
(function initHamburger() {
  const btn        = qs('#hamburger-btn');
  const mobileMenu = qs('#mobile-menu');
  if (!btn || !mobileMenu) return;

  const openMenu = () => {
    btn.classList.add('is-open');
    mobileMenu.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-label', 'Close navigation menu');
  };

  const closeMenu = () => {
    btn.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-label', 'Open navigation menu');
  };

  btn.addEventListener('click', () => {
    const isOpen = btn.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  /* Close on Escape key */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.classList.contains('is-open')) {
      closeMenu();
      btn.focus();
    }
  });

  /* Export close function for use by other modules */
  window._closeMenu = closeMenu;
})();


/* ============================================================
   3. CLOSE MOBILE MENU on any mobile nav link click
============================================================ */
(function initMobileNavLinks() {
  const links = qsa('.mobile-nav-link, .mobile-cta');

  links.forEach(link => {
    link.addEventListener('click', () => {
      if (typeof window._closeMenu === 'function') {
        window._closeMenu();
      }
    });
  });
})();


/* ============================================================
   4. FAQ ACCORDION
   — Only one panel open at a time (single-open accordion)
   — Smooth max-height animation via CSS; JS manages classes
============================================================ */
(function initAccordion() {
  const items = qsa('.faq-item');
  if (!items.length) return;

  /**
   * Open a single accordion item.
   * @param {Element} trigger - The button element
   * @param {Element} panel   - The collapsible panel element
   */
  const openItem = (trigger, panel) => {
    trigger.setAttribute('aria-expanded', 'true');
    panel.classList.add('is-open');
  };

  /**
   * Close a single accordion item.
   * @param {Element} trigger
   * @param {Element} panel
   */
  const closeItem = (trigger, panel) => {
    trigger.setAttribute('aria-expanded', 'false');
    panel.classList.remove('is-open');
  };

  /** Close all accordion items. */
  const closeAll = () => {
    items.forEach(item => {
      const t = qs('.faq-trigger', item);
      const p = qs('.faq-panel',   item);
      if (t && p) closeItem(t, p);
    });
  };

  items.forEach(item => {
    const trigger = qs('.faq-trigger', item);
    const panel   = qs('.faq-panel',   item);
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      /* Close every item first (single-open behaviour) */
      closeAll();

      /* If it was closed, now open it */
      if (!isExpanded) {
        openItem(trigger, panel);
      }
    });

    /* Keyboard: Space and Enter already trigger click on <button>,
       but ensure consistency for other keys. */
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Home') {
        e.preventDefault();
        const firstTrigger = qs('.faq-trigger', items[0]);
        firstTrigger && firstTrigger.focus();
      }
      if (e.key === 'End') {
        e.preventDefault();
        const lastTrigger = qs('.faq-trigger', items[items.length - 1]);
        lastTrigger && lastTrigger.focus();
      }
    });
  });
})();


/* ============================================================
   5. CONTACT FORM VALIDATION
   — Validates on submit; shows per-field error messages
   — Simulates async submission with loading state
============================================================ */
(function initContactForm() {
  const form       = qs('#contact-form');
  if (!form) return;

  const submitBtn  = qs('#submit-btn', form);
  const successMsg = qs('#form-success', form);

  /* ── Validation rules ── */
  const rules = {
    name: {
      required: true,
      minLength: 2,
      errorId: 'name-error',
      label: 'Full name',
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorId: 'email-error',
      label: 'Email address',
    },
    message: {
      required: true,
      minLength: 10,
      errorId: 'message-error',
      label: 'Message',
    },
  };

  /* ── Helper: show an error on a field ── */
  const showError = (input, errorId, message) => {
    input.classList.add('is-error');
    input.setAttribute('aria-invalid', 'true');
    const errorEl = qs(`#${errorId}`, form);
    if (errorEl) errorEl.textContent = message;
  };

  /* ── Helper: clear error on a field ── */
  const clearError = (input, errorId) => {
    input.classList.remove('is-error');
    input.removeAttribute('aria-invalid');
    const errorEl = qs(`#${errorId}`, form);
    if (errorEl) errorEl.textContent = '';
  };

  /* ── Validate a single field, return true if valid ── */
  const validateField = (name) => {
    const rule  = rules[name];
    if (!rule) return true;

    const input = form.elements[name];
    if (!input) return true;

    const value = input.value.trim();

    /* Required */
    if (rule.required && !value) {
      showError(input, rule.errorId, `${rule.label} is required.`);
      return false;
    }

    /* Minimum length */
    if (rule.minLength && value.length < rule.minLength) {
      showError(
        input,
        rule.errorId,
        `${rule.label} must be at least ${rule.minLength} characters.`
      );
      return false;
    }

    /* Pattern (e.g. email) */
    if (rule.pattern && value && !rule.pattern.test(value)) {
      showError(input, rule.errorId, `Please enter a valid ${rule.label.toLowerCase()}.`);
      return false;
    }

    /* All good */
    clearError(input, rule.errorId);
    return true;
  };

  /* ── Validate entire form; return true if all valid ── */
  const validateAll = () => {
    return Object.keys(rules)
      .map(name => validateField(name))
      .every(Boolean); // true only if every field passes
  };

  /* ── Inline validation on blur for each ruled field ── */
  Object.keys(rules).forEach(name => {
    const input = form.elements[name];
    if (!input) return;

    input.addEventListener('blur', () => validateField(name));

    /* Clear error as soon as user starts correcting */
    input.addEventListener('input', () => {
      if (input.classList.contains('is-error')) {
        clearError(input, rules[name].errorId);
      }
    });
  });

  /* ── Submit handler ── */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateAll()) {
      /* Focus the first invalid field for accessibility */
      const firstError = qs('.form-input.is-error', form);
      firstError && firstError.focus();
      return;
    }

    /* Loading state */
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;

    try {
      /*
       * ─── REAL INTEGRATION POINT ─────────────────────────────
       * Replace the fake delay below with your actual fetch:
       *
       * await fetch('/api/contact', {
       *   method: 'POST',
       *   headers: { 'Content-Type': 'application/json' },
       *   body: JSON.stringify(Object.fromEntries(new FormData(form))),
       * });
       * ─────────────────────────────────────────────────────────
       */
      await new Promise(resolve => setTimeout(resolve, 1400)); // simulated delay

      /* Success state */
      form.reset();
      successMsg.classList.add('is-visible');
      submitBtn.style.display = 'none';

      /* Scroll success message into view */
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (err) {
      /* On failure, restore button and show a generic error */
      console.error('Form submission error:', err);
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
      alert('Something went wrong. Please try again or email us directly.');
    }
  });
})();


/* ============================================================
   6. FOOTER — Dynamic copyright year
============================================================ */
(function initYear() {
  const yearEl = qs('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
