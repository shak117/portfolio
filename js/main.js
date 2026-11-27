/**
 * Shashank Pawar — Developer Portfolio
 * Core application configuration, interactive UI handlers, and placeholder management.
 */

/**
 * CENTRAL CONFIGURATION PLACEHOLDERS
 * Update these values once final assets, live URLs, resume PDF, or public repositories are ready.
 */
const PORTFOLIO_CONFIG = {
  email: "pawarshashank222@gmail.com",
  resume: {
    // Example when ready: "assets/Shashank_Pawar_Resume.pdf"
    url: "",
    filename: "Shashank_Pawar_Resume.pdf"
  },
  featuredProjects: {
    mamaPedhewale: {
      name: "Mama Pedhewale",
      liveUrl: "https://mama-pedhewale.vercel.app/",
      repoUrl: "https://github.com/shak117/mama_pedhewale",
      isRepoPublic: true,
      screenshot: "assets/screenshots/Screenshot 2026-11-27 102442.png",
      screenshotAlt: "Screenshot placeholder for Mama Pedhewale e-commerce website awaiting final capture"
    },
    skRelax: {
      name: "SK Relax",
      liveUrl: "https:/skrelaxbeautysalonandacademy.cloud",
      repoUrl: "https://github.com/shak117/sk-relax-studio",
      isRepoPublic: true,
      screenshot: "assets/screenshots/Screenshot 2026-11-27 112029.png",
      screenshotAlt: "Screenshot placeholder for SK Relax salon website awaiting final capture"
    },
    mahajanHospital: {
      name: "Mahajan Hospital",
      liveUrl: "",
      repoUrl: "https://github.com/shak117/mahajan_hospital",
      isRepoPublic: true,
      screenshot: "assets/screenshots/Screenshot 2026-11-27 121424.png",
      screenshotAlt: "Screenshot placeholder for Mahajan Hospital healthcare website awaiting final capture"
    }
  },
  engineeringProjects: {
    clinicSync: {
      name: "ClinicSync",
      repoUrl: "https://github.com/shashankpawar/clinic-sync-ml"
    },
    aiAttendance: {
      name: "AI Attendance System",
      repoUrl: "https://github.com/gitanjali-nooral-ai/AI_Attendance_System"
    },
    creditRisk: {
      name: "Credit Risk Stratification",
      repoUrl: "https://github.com/shak117/credit-risk-stratification-engine"
    },
    heartDisease: {
      name: "Heart Disease Prediction",
      repoUrl: "https://github.com/shak117/heart-disease-app"
    }
  }
};

(function () {
  "use strict";

  let toastTimer = null;
  let lastFocusedBeforeModal = null;
  let lastFocusedBeforeNav = null;

  /**
   * Show temporary live-region toast feedback.
   */
  function showToast(message) {
    const toast = document.getElementById("status-toast");
    if (!toast) return;

    toast.textContent = message;
    toast.hidden = false;

    if (toastTimer) {
      window.clearTimeout(toastTimer);
    }

    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 3000);
  }

  /**
   * Accessible Info Modal for placeholder assets (Resume, unconfigured Live URLs, optional Repos).
   */
  function createModalController() {
    const modal = document.getElementById("info-modal");
    const backdrop = document.getElementById("info-modal-backdrop");
    const closeBtn = document.getElementById("info-modal-close");
    const dismissBtn = document.getElementById("info-modal-dismiss");
    const eyebrowEl = document.getElementById("info-modal-eyebrow");
    const titleEl = document.getElementById("info-modal-title");
    const descEl = document.getElementById("info-modal-desc");
    const codeEl = document.getElementById("info-modal-code");
    const primaryActionEl = document.getElementById("info-modal-primary-action");

    if (!modal || !backdrop) {
      return { open: () => {}, close: () => {} };
    }

    function getFocusableElements() {
      return Array.from(
        modal.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hidden);
    }

    function open({ eyebrow, title, description, configSnippet, emailSubject, emailLabel }) {
      lastFocusedBeforeModal = document.activeElement;

      if (eyebrowEl) eyebrowEl.textContent = eyebrow || "Placeholder Configuration";
      if (titleEl) titleEl.textContent = title || "Asset Pending";
      if (descEl) descEl.textContent = description || "";
      if (codeEl) codeEl.textContent = configSnippet || "";

      if (primaryActionEl) {
        const subject = encodeURIComponent(
          emailSubject || "Portfolio Inquiry - Shashank Pawar"
        );
        primaryActionEl.href = `mailto:${PORTFOLIO_CONFIG.email}?subject=${subject}`;
        primaryActionEl.textContent = emailLabel || "Request via Email";
      }

      backdrop.hidden = false;
      modal.hidden = false;
      document.body.classList.add("modal-open");

      window.setTimeout(() => {
        if (closeBtn) closeBtn.focus();
      }, 0);
    }

    function close() {
      if (modal.hidden) return;
      modal.hidden = true;
      backdrop.hidden = true;
      document.body.classList.remove("modal-open");

      if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === "function") {
        lastFocusedBeforeModal.focus();
        lastFocusedBeforeModal = null;
      }
    }

    if (closeBtn) closeBtn.addEventListener("click", close);
    if (dismissBtn) dismissBtn.addEventListener("click", close);
    backdrop.addEventListener("click", close);

    document.addEventListener("keydown", (event) => {
      if (modal.hidden) return;

      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === "Tab") {
        const focusables = getFocusableElements();
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    return { open, close };
  }

  /**
   * Mobile navigation drawer with keyboard trap and clean close behavior.
   */
  function initMobileNavigation() {
    const toggleBtn = document.getElementById("menu-toggle");
    const closeBtn = document.getElementById("mobile-nav-close");
    const drawer = document.getElementById("mobile-nav-drawer");
    const backdrop = document.getElementById("mobile-nav-backdrop");

    if (!toggleBtn || !drawer || !backdrop) return;

    const navActionLinks = Array.from(
      drawer.querySelectorAll("a[href^='#']")
    );

    function getDrawerFocusable() {
      return Array.from(
        drawer.querySelectorAll('a[href], button:not([disabled])')
      );
    }

    function openMenu() {
      lastFocusedBeforeNav = document.activeElement;
      backdrop.hidden = false;
      drawer.hidden = false;
      drawer.setAttribute("aria-hidden", "false");
      toggleBtn.setAttribute("aria-expanded", "true");
      toggleBtn.setAttribute("aria-label", "Close navigation menu");
      document.body.classList.add("nav-open");

      window.setTimeout(() => {
        if (closeBtn) closeBtn.focus();
      }, 0);
    }

    function closeMenu(restoreFocus = true) {
      if (drawer.hidden) return;
      drawer.hidden = true;
      backdrop.hidden = true;
      drawer.setAttribute("aria-hidden", "true");
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.setAttribute("aria-label", "Open navigation menu");
      document.body.classList.remove("nav-open");

      if (restoreFocus && lastFocusedBeforeNav && typeof lastFocusedBeforeNav.focus === "function") {
        lastFocusedBeforeNav.focus();
        lastFocusedBeforeNav = null;
      }
    }

    toggleBtn.addEventListener("click", () => {
      if (drawer.hidden) {
        openMenu();
      } else {
        closeMenu(true);
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => closeMenu(true));
    }

    backdrop.addEventListener("click", () => closeMenu(true));

    navActionLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu(false);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (drawer.hidden) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key === "Tab") {
        const focusables = getDrawerFocusable();
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && !drawer.hidden) {
        closeMenu(false);
      }
    });
  }

  /**
   * Hero workspace code tab switcher (app.py / deploy.yml).
   */
  function initWorkspaceTabs() {
    const tabs = Array.from(document.querySelectorAll("[data-workspace-tab]"));
    const appPanel = document.getElementById("panel-app-py");
    const deployPanel = document.getElementById("panel-deploy-yml");
    const terminalCmd = document.getElementById("terminal-command-text");

    if (tabs.length === 0 || !appPanel || !deployPanel) return;

    function activateTab(tabKey) {
      tabs.forEach((tab) => {
        const isTarget = tab.getAttribute("data-workspace-tab") === tabKey;
        tab.classList.toggle("is-active", isTarget);
        tab.setAttribute("aria-selected", String(isTarget));
      });

      const showApp = tabKey === "app";
      appPanel.hidden = !showApp;
      deployPanel.hidden = showApp;
      appPanel.classList.toggle("is-active", showApp);
      deployPanel.classList.toggle("is-active", !showApp);

      if (terminalCmd) {
        terminalCmd.textContent = showApp
          ? "flask --app app run --host=0.0.0.0"
          : "git push origin main && gh workflow view deploy.yml";
      }
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        activateTab(tab.getAttribute("data-workspace-tab"));
      });

      tab.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          const nextIndex =
            event.key === "ArrowRight"
              ? (index + 1) % tabs.length
              : (index - 1 + tabs.length) % tabs.length;
          tabs[nextIndex].focus();
          activateTab(tabs[nextIndex].getAttribute("data-workspace-tab"));
        }
      });
    });
  }

  /**
   * Hydrate project links, screenshots, and placeholder triggers from PORTFOLIO_CONFIG.
   */
  function initProjectBindings(modal) {
    // Featured client projects
    Object.entries(PORTFOLIO_CONFIG.featuredProjects).forEach(([key, config]) => {
      const imgEl = document.querySelector(`[data-project-screenshot="${key}"]`);
      const badgeEl = document.querySelector(`[data-screenshot-badge="${key}"]`);
      const liveBtn = document.querySelector(`[data-live-project="${key}"]`);
      const repoBtn = document.querySelector(`[data-repo-project="${key}"]`);

      if (imgEl && config.screenshot) {
        imgEl.src = config.screenshot;
        if (config.screenshotAlt) {
          imgEl.alt = config.screenshotAlt;
        }
        if (badgeEl && !config.screenshot.includes("placeholder")) {
          badgeEl.hidden = true;
        }
      }

      if (liveBtn) {
        if (config.liveUrl) {
          liveBtn.href = config.liveUrl;
          liveBtn.target = "_blank";
          liveBtn.rel = "noopener noreferrer";
        } else {
          liveBtn.addEventListener("click", (event) => {
            event.preventDefault();
            modal.open({
              eyebrow: "Live Website Placeholder",
              title: `${config.name} — Live URL Pending`,
              description:
                "No fabricated URL is attached. Once the production URL is supplied, configure it in js/main.js or contact Shashank directly for a live walkthrough.",
              configSnippet: `PORTFOLIO_CONFIG.featuredProjects.${key}.liveUrl = "https://..."`,
              emailSubject: `Live Walkthrough Request - ${config.name}`,
              emailLabel: "Request Live Demo"
            });
          });
        }
      }

      // View Code button only shown when a public repository exists
      if (repoBtn) {
        if (config.isRepoPublic && config.repoUrl) {
          repoBtn.hidden = false;
          repoBtn.href = config.repoUrl;
          repoBtn.target = "_blank";
          repoBtn.rel = "noopener noreferrer";
        } else {
          repoBtn.hidden = true;
        }
      }
    });

    // Engineering & technical projects
    Object.entries(PORTFOLIO_CONFIG.engineeringProjects).forEach(([key, config]) => {
      const repoLink = document.querySelector(`[data-eng-repo="${key}"]`);
      if (!repoLink) return;

      if (config.repoUrl) {
        repoLink.href = config.repoUrl;
        repoLink.target = "_blank";
        repoLink.rel = "noopener noreferrer";
        repoLink.classList.remove("eng-repo-placeholder");
        const label = repoLink.querySelector("span");
        if (label) label.textContent = "GitHub";
      } else {
        repoLink.addEventListener("click", (event) => {
          event.preventDefault();
          modal.open({
            eyebrow: "GitHub Repository Placeholder",
            title: `${config.name} — Repository Pending`,
            description:
              "This project card uses a placeholder repository link until a public GitHub URL is added. You can configure it in js/main.js or request a code walkthrough via email.",
            configSnippet: `PORTFOLIO_CONFIG.engineeringProjects.${key}.repoUrl = "https://github.com/..."`,
            emailSubject: `Code Walkthrough Request - ${config.name}`,
            emailLabel: "Request Walkthrough"
          });
        });
      }
    });
  }

  /**
   * Bind Resume CTA buttons to configured PDF or placeholder info modal.
   */
  function initResumeDownload(modal) {
    const resumeButtons = document.querySelectorAll('[data-action="download-resume"]');

    resumeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (PORTFOLIO_CONFIG.resume.url) {
          const link = document.createElement("a");
          link.href = PORTFOLIO_CONFIG.resume.url;
          link.download = PORTFOLIO_CONFIG.resume.filename || "Shashank_Pawar_Resume.pdf";
          link.rel = "noopener noreferrer";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          showToast("Downloading resume...");
        } else {
          modal.open({
            eyebrow: "Resume Placeholder",
            title: "Resume PDF Not Yet Attached",
            description:
              "Place your PDF inside the assets folder and set PORTFOLIO_CONFIG.resume.url in js/main.js to enable direct download. Recruiters can also request a copy immediately via email.",
            configSnippet: 'PORTFOLIO_CONFIG.resume.url = "assets/Shashank_Pawar_Resume.pdf"',
            emailSubject: "Resume Request - Shashank Pawar",
            emailLabel: "Request Resume via Email"
          });
        }
      });
    });
  }

  /**
   * Copy-to-clipboard button for email address.
   */
  function initCopyControls() {
    const copyBtn = document.getElementById("copy-email-btn");
    if (!copyBtn) return;

    copyBtn.addEventListener("click", async () => {
      const value = copyBtn.getAttribute("data-copy-value") || PORTFOLIO_CONFIG.email;
      let copied = false;

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(value);
          copied = true;
        } catch (_err) {
          copied = false;
        }
      }

      if (!copied) {
        const helper = document.createElement("textarea");
        helper.value = value;
        helper.setAttribute("readonly", "");
        helper.style.position = "fixed";
        helper.style.opacity = "0";
        document.body.appendChild(helper);
        helper.select();
        try {
          copied = document.execCommand("copy");
        } catch (_err) {
          copied = false;
        }
        document.body.removeChild(helper);
      }

      if (copied) {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        showToast("Email copied to clipboard");
        window.setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      } else {
        showToast(`Email: ${value}`);
      }
    });
  }

  /**
   * Set current year dynamically in the footer.
   */
  function initFooterYear() {
    const yearEl = document.getElementById("current-year");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const modal = createModalController();
    initMobileNavigation();
    initWorkspaceTabs();
    initProjectBindings(modal);
    initResumeDownload(modal);
    initCopyControls();
    initFooterYear();
  });
})();
