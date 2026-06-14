(() => {
  const localOrigin = window.location.origin;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const ready = () => {
    document.body.classList.add("page-ready");

    if (!document.querySelector(".page-wipe")) {
      const wipe = document.createElement("div");
      wipe.className = "page-wipe";
      wipe.setAttribute("aria-hidden", "true");
      document.body.appendChild(wipe);
    }

    initSkillset();
  };

  const initSkillset = () => {
    const root = document.querySelector("[data-skillset]");
    if (!root) return;

    const input = root.querySelector("[data-skill-search]");
    const filters = Array.from(root.querySelectorAll("[data-skill-filter]"));
    const cards = Array.from(root.querySelectorAll("[data-skill-card]"));
    const count = root.querySelector("[data-skill-count]");
    const empty = root.querySelector("[data-skill-empty]");
    const inspectorTitle = root.querySelector("[data-skill-title]");
    const inspectorCopy = root.querySelector("[data-skill-copy]");
    const allLabel = root.getAttribute("data-all-label") || "All";
    let activeFilter = "all";

    const normalize = (value) => value.trim().toLowerCase();

    const updateInspector = (card) => {
      cards.forEach((item) => item.setAttribute("aria-pressed", String(item === card)));
      if (!inspectorTitle || !inspectorCopy) return;
      inspectorTitle.textContent = card.dataset.skillName || card.textContent.trim();
      inspectorCopy.textContent = card.dataset.detail || "";
    };

    const applyFilters = () => {
      const query = normalize(input?.value || "");
      let visible = 0;

      cards.forEach((card) => {
        const groups = (card.dataset.groups || "").split(/\s+/);
        const haystack = normalize(card.textContent + " " + (card.dataset.search || ""));
        const matchesGroup = activeFilter === "all" || groups.includes(activeFilter);
        const matchesQuery = !query || haystack.includes(query);
        const show = matchesGroup && matchesQuery;
        card.classList.toggle("is-hidden", !show);
        if (show) visible += 1;
      });

      if (count) {
        count.textContent = `${visible} / ${cards.length} ${allLabel}`;
      }
      if (empty) {
        empty.classList.toggle("is-visible", visible === 0);
      }
    };

    filters.forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.skillFilter || "all";
        filters.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
        applyFilters();
      });
    });

    cards.forEach((card) => {
      card.addEventListener("click", () => updateInspector(card));
    });

    input?.addEventListener("input", applyFilters);
    const firstCard = cards[0];
    if (firstCard) updateInspector(firstCard);
    applyFilters();
  };

  const shouldAnimate = (anchor) => {
    if (reducedMotion.matches) return false;
    if (anchor.target && anchor.target !== "_self") return false;
    if (anchor.hasAttribute("download")) return false;
    const href = anchor.getAttribute("href") || "";
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== localOrigin) return false;
    if (url.pathname.endsWith(".pdf")) return false;
    return url.href !== window.location.href;
  };

  document.addEventListener("DOMContentLoaded", ready);

  document.addEventListener("click", (event) => {
    const anchor = event.target.closest("a[href]");
    if (!anchor || !shouldAnimate(anchor)) return;

    event.preventDefault();
    document.body.classList.add("is-leaving");
    window.setTimeout(() => {
      window.location.href = anchor.href;
    }, 220);
  });

  window.addEventListener("pageshow", () => {
    document.body.classList.remove("is-leaving");
    document.body.classList.add("page-ready");
  });
})();
