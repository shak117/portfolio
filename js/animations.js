/**
 * Shashank Pawar — Developer Portfolio
 * Scroll reveal animations, smooth scrolling, scroll-spy, and back-to-top controls.
 * Respects prefers-reduced-motion at all times.
 */

(function () {
  "use strict";

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  function prefersReducedMotion() {
    return reducedMotionQuery.matches;
  }

  /**
   * Initialize progressive scroll-reveal animations using IntersectionObserver.
   */
  function initScrollReveal() {
    const revealItems = Array.from(document.querySelectorAll(".reveal"));
    if (revealItems.length === 0) return;

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      revealItems.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -36px 0px"
      }
    );

    revealItems.forEach((el) => observer.observe(el));
  }

  /**
   * Initialize smooth internal anchor scrolling with fixed-header awareness.
   */
  function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        if (
          anchor.hasAttribute("data-live-project") ||
          anchor.hasAttribute("data-repo-project") ||
          anchor.hasAttribute("data-eng-repo")
        ) {
          // Placeholder project buttons handle their own behavior when unconfigured
          if (anchor.getAttribute("href").startsWith("#")) {
            return;
          }
        }

        const targetId = anchor.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const targetEl = document.querySelector(targetId);
        if (!targetEl) return;

        event.preventDefault();
        targetEl.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start"
        });
      });
    });
  }

  /**
   * Update header scroll elevation, active nav indicator, and back-to-top visibility.
   */
  function initScrollObservers() {
    const header = document.getElementById("site-header");
    const backToTopBtn = document.getElementById("back-to-top");
    const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));

    const sectionIds = ["home", "about", "skills", "projects", "experience", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    let ticking = false;

    function updateOnScroll() {
      const scrollY = window.scrollY || window.pageYOffset;

      if (header) {
        header.classList.toggle("is-scrolled", scrollY > 24);
      }

      if (backToTopBtn) {
        backToTopBtn.hidden = scrollY < 420;
      }

      // Active section scroll-spy
      if (sections.length > 0 && navLinks.length > 0) {
        const headerHeight = header ? header.offsetHeight : 72;
        const probePosition = scrollY + headerHeight + 120;
        const nearBottom =
          window.innerHeight + scrollY >= document.documentElement.scrollHeight - 40;

        let activeId = sections[0].id;

        if (nearBottom) {
          activeId = sections[sections.length - 1].id;
        } else {
          for (const section of sections) {
            if (probePosition >= section.offsetTop) {
              activeId = section.id;
            }
          }
        }

        navLinks.forEach((link) => {
          const isMatch = link.getAttribute("data-nav-link") === activeId;
          link.classList.toggle("active", isMatch);
          if (isMatch) {
            link.setAttribute("aria-current", "page");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      }

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateOnScroll();

    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion() ? "auto" : "smooth"
        });
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
    initSmoothScroll();
    initScrollObservers();
  });
})();
