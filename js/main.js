// ============================================================================
// main.js — all interactive behavior for the portfolio site.
// No build step, no dependencies beyond what's already loaded via CDN.
// ============================================================================

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Accent palette cycled across skill-card top borders and project thumbnails.
// EDIT: change these to re-theme every colored accent across the site.
const ACCENTS = ["#e2725b", "#e7b34c", "#4f9a94", "#4f90c8"]; // coral, mustard, teal, blue

// ---------------------------------------------------------------------------
// SKILLS DATA
// EDIT: adjust items/groups freely — the renderer below handles both a flat
// `items` array and a grouped `groups` object (used for "Web Development").
// Mark an item as { name, primary: true } to flag it as your main tool in
// that category (renders with a small ★ indicator).
// ---------------------------------------------------------------------------
const skills = [
  {
    category: "Web Development",
    icon: "💻",
    wide: true, // spans both grid columns on md+ screens
    groups: {
      "Backend": ["PHP", "Laravel", "Node.js", "Vanilla JS"],
      "Databases": ["MySQL", "PostgreSQL"],
      "Frontend": ["HTML", "Blade", "Vanilla CSS", "Tailwind", "Vanilla JS"],
      "Deployment": [{ name: "Docker", primary: true }, "Laragon", "XAMPP"],
      "APIs": ["REST API"],
    },
  },
  {
    category: "Automation",
    icon: "⚙️",
    items: ["n8n", "REST APIs", "Google Workspace Integration", "Telegram Bot Integration", "SQL Integration"],
  },
  {
    category: "Multimedia",
    icon: "🎬",
    items: ["Adobe Premiere Pro", "After Effects", "OBS"],
  },
  {
    category: "Editing / Design",
    icon: "🎨",
    items: ["Photoshop", "Illustrator", "Canva"],
  },
  {
    category: "GIS / CAD",
    icon: "🗺️",
    items: ["QGIS", "AutoCAD"],
  },
  {
    category: "AI (Cloud)",
    icon: "☁️",
    items: ["Claude", "Codex", "Groq", "Gemini"],
  },
  {
    category: "AI (Local)",
    icon: "🖥️",
    items: ["Ollama", "Qwen", "Groq"],
  },
];

// ---------------------------------------------------------------------------
// PROJECTS DATA
// EDIT: replace with your real projects. `live` and `repo` are both optional —
// leave as "#" (or delete the key) and the renderer will just skip the link.
// `icon` is just a placeholder emoji shown on the thumbnail block — swap the
// whole thumbnail for a real screenshot by replacing the block with an <img>.
// ---------------------------------------------------------------------------
const projects = [
  {
    title: "[EDIT: Project 1 Name]",
    category: "Web App",
    icon: "🗂️",
    desc: "[EDIT: One or two sentences on what it does and the problem it solves.]",
    tags: ["Laravel", "MySQL", "Docker"],
    live: "#",
    repo: "#",
  },
  {
    title: "Gov Mail — Incoming Email Automation",
    category: "Automation",
    icon: "📧",
    image: "assets/email-automation-workflow.png",
    desc: "An n8n workflow that monitors a Gmail inbox every minute, logs every unread email to Google Sheets with a unique auto-generated control number, and saves any attachments to disk. An LLM (Groq) reads the email body and returns a structured assessment — urgency level, category, a summary, and a recommended forwarding/reply message — which is parsed and pushed instantly to Telegram via the Bot API for quick action.",
    tags: ["n8n", "Gmail API", "Google Sheets", "Groq LLM", "Telegram Bot API"],
    live: "#",
    repo: "#",
  },
  {
    title: "[EDIT: Project 3 Name]",
    category: "Web App",
    icon: "🌐",
    desc: "[EDIT: One or two sentences on what it does and the problem it solves.]",
    tags: ["Node.js", "Vanilla JS", "Tailwind"],
    live: "#",
    repo: "#",
  },
  {
    title: "[EDIT: Project 4 Name]",
    category: "GIS / CAD",
    icon: "🗺️",
    desc: "[EDIT: e.g. a GIS mapping project or CAD drafting piece — swap the 'Live' label below to 'Details' if it's not a hosted web app.]",
    tags: ["QGIS", "AutoCAD"],
    live: "#",
    repo: "#",
  },
];

// ---------------------------------------------------------------------------
// RENDER: Skills
// ---------------------------------------------------------------------------
function badge(item) {
  const name = typeof item === "string" ? item : item.name;
  const primary = typeof item === "object" && item.primary;
  return `<span class="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 ${primary ? "ring-1 ring-slate-900 dark:ring-white font-medium" : ""
    }">${primary ? "★ " : ""}${name}</span>`;
}

function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;

  grid.innerHTML = skills
    .map((cat, i) => {
      const span = cat.wide ? "md:col-span-2" : "";
      const accent = ACCENTS[i % ACCENTS.length];

      let body;
      if (cat.groups) {
        body = Object.entries(cat.groups)
          .map(
            ([groupName, items]) => `
              <div class="mb-4 last:mb-0">
                <p class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-2">${groupName}</p>
                <div class="flex flex-wrap gap-2">${items.map(badge).join("")}</div>
              </div>`
          )
          .join("");
      } else {
        body = `<div class="flex flex-wrap gap-2">${cat.items.map(badge).join("")}</div>`;
      }

      return `
        <div class="hover-lift rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 pt-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all ${span}" style="border-top: 4px solid ${accent};">
          <h3 class="font-display text-sm mb-4 flex items-center gap-2 lowercase">
            <span aria-hidden="true">${cat.icon}</span> ${cat.category}
          </h3>
          ${body}
        </div>`;
    })
    .join("");
}

// ---------------------------------------------------------------------------
// RENDER: Projects ("Latest Work" cards)
// ---------------------------------------------------------------------------
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = projects
    .map((p, i) => {
      const accent = ACCENTS[i % ACCENTS.length];
      const links = [];
      if (p.live) {
        const attrs = p.live === "#" ? "" : ' target="_blank" rel="noopener noreferrer"';
        links.push(`<a href="${p.live}"${attrs} class="hover:underline">Live</a>`);
      }
      if (p.repo) {
        const attrs = p.repo === "#" ? "" : ' target="_blank" rel="noopener noreferrer"';
        links.push(`<a href="${p.repo}"${attrs} class="hover:underline">Code</a>`);
      }

      return `
        <div class="hover-lift group rounded-xl overflow-hidden bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
          <div class="h-32 flex items-center justify-center text-4xl overflow-hidden" style="background-color:${accent}22;">
            ${p.image
          ? `<img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover" />`
          : `<span aria-hidden="true">${p.icon}</span>`
        }
          </div>
          <div class="p-5">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">${p.category}</p>
            <h3 class="font-display text-base mb-2">${p.title}</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400">${p.desc}</p>
            <div class="mt-3 flex flex-wrap gap-1.5">
              ${p.tags.map((t) => `<span class="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">${t}</span>`).join("")}
            </div>
            <div class="mt-4 flex gap-4 text-sm font-medium">${links.join("")}</div>
          </div>
        </div>`;
    })
    .join("");
}

// ---------------------------------------------------------------------------
// THEME TOGGLE (light by default; choice persists in localStorage)
// The initial class is already set by the inline bootstrap script in
// index.html <head> — this just wires up the toggle button.
// ---------------------------------------------------------------------------
function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  if (!btn || !icon) return;

  const syncIcon = () => {
    const isDark = document.documentElement.classList.contains("dark");
    icon.textContent = isDark ? "🌙" : "☀️";
    btn.setAttribute("aria-pressed", String(isDark));
  };

  syncIcon();

  btn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    syncIcon();
  });
}

// ---------------------------------------------------------------------------
// MOBILE MENU
// ---------------------------------------------------------------------------
function initMobileMenu() {
  const menuBtn = document.getElementById("menuToggle");
  const menu = document.getElementById("mobileMenu");
  const iconOpen = document.getElementById("menuIconOpen");
  const iconClose = document.getElementById("menuIconClose");
  if (!menuBtn || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle("hidden", !open);
    iconOpen.classList.toggle("hidden", open);
    iconClose.classList.toggle("hidden", !open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  menuBtn.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");
    setOpen(!isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

// ---------------------------------------------------------------------------
// SCROLL REVEAL — fade/slide sections into view as they enter the viewport
// ---------------------------------------------------------------------------
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => io.observe(el));
}

// ---------------------------------------------------------------------------
// ACTIVE NAV HIGHLIGHT — highlight the nav link matching the section in view
// ---------------------------------------------------------------------------
function initActiveNavHighlight() {
  const navLinks = document.querySelectorAll(".nav-link, .nav-link-mobile");
  const sections = document.querySelectorAll("main section[id]");
  if (!sections.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((s) => sectionObserver.observe(s));
}

// ---------------------------------------------------------------------------
// BACK TO TOP — small floating button that appears after scrolling down
// ---------------------------------------------------------------------------
function initBackToTop() {
  const btn = document.createElement("button");
  btn.id = "backToTop";
  btn.type = "button";
  btn.setAttribute("aria-label", "Back to top");
  btn.className =
    "p-3 rounded-full bg-black text-white dark:bg-white dark:text-black shadow-lg hover:opacity-80 transition-opacity";
  btn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>';
  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("visible", window.scrollY > 500);
    },
    { passive: true }
  );
}

// ---------------------------------------------------------------------------
// INIT
// ---------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderProjects();
  initThemeToggle();
  initMobileMenu();
  initScrollReveal();
  initActiveNavHighlight();
  initBackToTop();

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
