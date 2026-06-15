(() => {
  const localOrigin = window.location.origin;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

  const skillVisuals = {
    "Unreal Engine": { icon: "unreal-engine.svg", level: 96, type: "Software", accent: "#4d9bff" },
    "nDisplay": { icon: "ndisplay.svg", level: 92, type: "Workflow", accent: "#29d1c4" },
    "LED Walls": { icon: "led-walls.svg", level: 91, type: "Hardware", accent: "#ff7d5c" },
    "Camera Tracking": { icon: "camera-tracking.svg", level: 88, type: "Hardware", accent: "#f0bd5a" },
    "Lens Calibration": { icon: "lens-calibration.svg", level: 86, type: "Workflow", accent: "#86bdff" },
    "OCIO": { icon: "ocio.svg", level: 84, type: "Workflow", accent: "#ffb18f" },
    "Timecode & Genlock": { icon: "timecode-genlock.svg", level: 87, type: "Hardware", accent: "#29d1c4" },
    "LiveLink": { icon: "livelink.svg", level: 89, type: "Workflow", accent: "#4d9bff" },
    "NDI": { icon: "ndi.svg", level: 92, type: "Software", accent: "#29d1c4" },
    "Blackmagic Ultimatte": { icon: "blackmagic-ultimatte.svg", level: 82, type: "Hardware", accent: "#ff7d5c" },
    "Blackmagic DeckLink": { icon: "blackmagic-decklink.svg", level: 86, type: "Hardware", accent: "#f0bd5a" },
    "Spout": { icon: "spout.svg", level: 80, type: "Workflow", accent: "#86bdff" },
    "Rokoko": { icon: "rokoko.svg", level: 83, type: "Hardware", accent: "#29d1c4" },
    "CHINGMU": { icon: "chingmu.svg", level: 80, type: "Hardware", accent: "#ff7d5c" },
    "AI Visual Mocap": { icon: "ai-visual-mocap.svg", level: 82, type: "AI", accent: "#f0bd5a" },
    "Virtual Camera": { icon: "virtual-camera.svg", level: 90, type: "Hardware", accent: "#4d9bff" },
    "LiveLink Face": { icon: "livelink-face.svg", level: 86, type: "Software", accent: "#29d1c4" },
    "MetaHuman": { icon: "metahuman.svg", level: 82, type: "Software", accent: "#86bdff" },
    "DaVinci Resolve": { icon: "davinci-resolve.svg", level: 90, type: "Software", accent: "#4d9bff" },
    "Adobe Premiere Pro": { icon: "adobe-premiere-pro.svg", level: 90, type: "Software", accent: "#7c8cff" },
    "Adobe After Effects": { icon: "adobe-after-effects.svg", level: 86, type: "Software", accent: "#a98bff" },
    "Photoshop": { icon: "photoshop.svg", level: 84, type: "Software", accent: "#4d9bff" },
    "Illustrator": { icon: "illustrator.svg", level: 80, type: "Software", accent: "#ff9d45" },
    "Fusion": { icon: "fusion.svg", level: 78, type: "Software", accent: "#f0bd5a" },
    "Blender": { icon: "blender.svg", level: 82, type: "Software", accent: "#ff7d5c" },
    "Lightroom": { icon: "lightroom.svg", level: 80, type: "Software", accent: "#4d9bff" },
    "Camera Operation & Lighting": { icon: "camera-lighting.svg", level: 90, type: "Craft", accent: "#f0bd5a" },
    "Resolume Arena": { icon: "resolume-arena.svg", level: 82, type: "Software", accent: "#ff7d5c" },
    "vMix": { icon: "vmix.svg", level: 84, type: "Software", accent: "#4d9bff" },
    "HiRender": { icon: "hirender.svg", level: 78, type: "Software", accent: "#86bdff" },
    "Projection Mapping": { icon: "projection-mapping.svg", level: 84, type: "Workflow", accent: "#f0bd5a" },
    "Dante": { icon: "dante.svg", level: 76, type: "Hardware", accent: "#29d1c4" },
    "Sonobus": { icon: "sonobus.svg", level: 74, type: "Software", accent: "#86bdff" },
    "Avolites": { icon: "avolites.svg", level: 76, type: "Hardware", accent: "#f0bd5a" },
    "DMX": { icon: "dmx.svg", level: 82, type: "Workflow", accent: "#ff7d5c" },
    "TouchDesigner": { icon: "touchdesigner.svg", level: 78, type: "Software", accent: "#29d1c4" },
    "Unity": { icon: "unity.svg", level: 80, type: "Software", accent: "#86bdff" },
    "SteamVR / Vive": { icon: "steamvr-vive.svg", level: 78, type: "Hardware", accent: "#4d9bff" },
    "Go": { icon: "go.svg", level: 84, type: "Software", accent: "#29d1c4" },
    "C++": { icon: "cpp.svg", level: 78, type: "Software", accent: "#4d9bff" },
    "JavaScript": { icon: "javascript.svg", level: 86, type: "Software", accent: "#f0bd5a" },
    "Python": { icon: "python.svg", level: 86, type: "Software", accent: "#86bdff" },
    "C#": { icon: "csharp.svg", level: 76, type: "Software", accent: "#a98bff" },
    "Linux CLI": { icon: "linux-cli.svg", level: 86, type: "Infrastructure", accent: "#f0bd5a" },
    "Networking": { icon: "networking.svg", level: 88, type: "Infrastructure", accent: "#29d1c4" },
    "Docker": { icon: "docker.svg", level: 82, type: "Infrastructure", accent: "#4d9bff" },
    "Proxmox": { icon: "proxmox.svg", level: 80, type: "Infrastructure", accent: "#ff7d5c" },
    "TrueNAS": { icon: "truenas.svg", level: 78, type: "Infrastructure", accent: "#29d1c4" },
    "Git / Perforce": { icon: "git-perforce.svg", level: 86, type: "Software", accent: "#ff7d5c" },
    "ComfyUI": { icon: "comfyui.svg", level: 80, type: "AI", accent: "#a98bff" },
    "Stable Diffusion / Flux": { icon: "stable-diffusion-flux.svg", level: 82, type: "AI", accent: "#f0bd5a" },
    "Kling": { icon: "kling.svg", level: 74, type: "AI", accent: "#ff7d5c" },
    "LLMs": { icon: "llms.svg", level: 86, type: "AI", accent: "#86bdff" },
    "Agentic Development": { icon: "agentic-development.svg", level: 84, type: "AI", accent: "#29d1c4" },
  };

  const skillGroups = {
    en: {
      vp: "Virtual production",
      capture: "Capture",
      media: "Media & post",
      events: "Events",
      software: "Software",
      ai: "AI",
    },
    zh: {
      vp: "虛擬製作",
      capture: "捕捉",
      media: "媒體與後期",
      events: "活動",
      software: "軟件",
      ai: "AI",
    },
  };

  const skillUi = {
    en: {
      active: "Visible",
      assets: "Local SVG assets",
      copied: "Copied",
      copy: "Copy summary",
      featured: "Featured stack",
      level: "Production fluency",
      random: "Spotlight",
      related: "Related stack",
      reset: "Reset",
      selected: "Selected",
      total: "Tools",
    },
    zh: {
      active: "顯示中",
      assets: "本機 SVG 素材",
      copied: "已複製",
      copy: "複製摘要",
      featured: "焦點技術",
      level: "製作熟練度",
      random: "聚焦",
      related: "相關技術",
      reset: "重設",
      selected: "已選",
      total: "工具",
    },
  };

  const featuredSkills = [
    "Unreal Engine",
    "NDI",
    "DaVinci Resolve",
    "Adobe After Effects",
    "Blender",
    "TouchDesigner",
    "Docker",
    "ComfyUI",
  ];

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

    const locale = document.documentElement.lang.toLowerCase().startsWith("zh") ? "zh" : "en";
    const labels = skillUi[locale];
    const groupLabels = skillGroups[locale];
    const stylesheet = document.querySelector('link[rel="stylesheet"]')?.getAttribute("href") || "assets/css/site.css";
    const iconBase = stylesheet.replace(/assets\/css\/site\.css$/, "assets/skill-icons/");
    const input = root.querySelector("[data-skill-search]");
    const filters = Array.from(root.querySelectorAll("[data-skill-filter]"));
    const cards = Array.from(root.querySelectorAll("[data-skill-card]"));
    const count = root.querySelector("[data-skill-count]");
    const empty = root.querySelector("[data-skill-empty]");
    const inspectorTitle = root.querySelector("[data-skill-title]");
    const inspectorCopy = root.querySelector("[data-skill-copy]");
    const allLabel = root.getAttribute("data-all-label") || "All";
    let activeFilter = "all";
    let selectedCard = null;
    let userSelected = false;

    const normalize = (value) => (value || "").trim().toLowerCase();

    const getSkillName = (card) => card.dataset.skillName || card.querySelector(".skill-name")?.textContent.trim() || card.textContent.trim();
    const getGroups = (card) => (card.dataset.groups || "").split(/\s+/).filter(Boolean);
    const getMeta = (card) => skillVisuals[getSkillName(card)] || { icon: "agentic-development.svg", level: 72, type: "Workflow", accent: "#86bdff" };
    const getIconSrc = (card) => iconBase + getMeta(card).icon;

    const enhanceHero = () => {
      const hero = document.querySelector(".hero--compact");
      const heroInner = hero?.querySelector(".hero-inner");
      if (!hero || !heroInner || heroInner.querySelector("[data-skill-orbit]")) return;

      hero.classList.add("skill-hero-enhanced");
      heroInner.classList.add("skill-hero-inner");

      const stage = document.createElement("div");
      stage.className = "skill-hero-stage";
      stage.setAttribute("aria-label", labels.featured);

      const ring = document.createElement("div");
      ring.className = "skill-orbit";
      ring.dataset.skillOrbit = "";

      featuredSkills.forEach((name, index) => {
        const meta = skillVisuals[name];
        const button = document.createElement("button");
        button.className = "skill-orbit__item";
        button.type = "button";
        button.dataset.skillOrbitName = name;
        button.style.setProperty("--orbit-index", index);
        button.style.setProperty("--skill-accent", meta.accent);
        button.setAttribute("aria-label", `${labels.selected}: ${name}`);
        button.innerHTML = `<img src="${iconBase + meta.icon}" alt="" loading="lazy" width="38" height="38">`;
        ring.appendChild(button);
      });

      const readout = document.createElement("div");
      readout.className = "skill-hero-readout";
      readout.innerHTML = `
        <span>${labels.featured}</span>
        <strong data-skill-hero-title>${featuredSkills[0]}</strong>
        <button class="skill-random-button" type="button" data-skill-random>${labels.random}</button>
      `;

      stage.append(ring, readout);
      heroInner.appendChild(stage);
    };

    const enhanceControls = () => {
      if (root.querySelector(".skill-dashboard")) return;
      const controls = root.querySelector(".skill-controls");
      const dashboard = document.createElement("div");
      dashboard.className = "skill-dashboard";
      dashboard.innerHTML = `
        <div class="skill-stat-pill"><span>${labels.total}</span><strong data-skill-total>${cards.length}</strong></div>
        <div class="skill-stat-pill"><span>${labels.active}</span><strong data-skill-visible>${cards.length}</strong></div>
        <div class="skill-stat-pill"><span>${labels.assets}</span><strong>${cards.length}</strong></div>
        <button class="skill-random-button" type="button" data-skill-random>${labels.random}</button>
        <button class="skill-reset-button" type="button" data-skill-reset>${labels.reset}</button>
      `;
      controls?.before(dashboard);
    };

    const enhanceInspector = () => {
      const inspector = root.querySelector(".skill-inspector");
      if (!inspector || inspector.querySelector("[data-skill-inspector-icon]")) return;
      inspector.innerHTML = `
        <div class="skill-inspector__top">
          <div class="skill-inspector__icon"><img data-skill-inspector-icon alt="" width="72" height="72"></div>
          <div>
            <p class="eyebrow">${labels.selected}</p>
            <h2 id="skill-detail-title" data-skill-title></h2>
            <p class="skill-inspector__kind" data-skill-kind></p>
          </div>
        </div>
        <div class="skill-meter" aria-label="${labels.level}">
          <span data-skill-meter></span>
        </div>
        <p data-skill-copy></p>
        <ul class="skill-inspector__tags" data-skill-tags></ul>
        <div class="skill-related">
          <p>${labels.related}</p>
          <div data-skill-related></div>
        </div>
        <div class="skill-inspector__actions">
          <button class="skill-reset-button" type="button" data-skill-copy-summary>${labels.copy}</button>
        </div>
        <p class="skill-toast" data-skill-toast aria-live="polite"></p>
      `;
    };

    const enhanceCards = () => {
      cards.forEach((card, index) => {
        const meta = getMeta(card);
        const name = getSkillName(card);
        card.classList.add("skill-card--enhanced");
        card.style.setProperty("--skill-accent", meta.accent);
        card.style.setProperty("--skill-index", index);
        card.dataset.skillType = meta.type;
        card.dataset.skillLevel = String(meta.level);

        if (!card.querySelector(".skill-card__icon")) {
          const icon = document.createElement("span");
          icon.className = "skill-card__icon";
          icon.innerHTML = `<img src="${getIconSrc(card)}" alt="" loading="lazy" width="34" height="34">`;
          card.prepend(icon);
        }

        if (!card.querySelector(".skill-card__meta")) {
          const metaLine = document.createElement("span");
          metaLine.className = "skill-card__meta";
          metaLine.innerHTML = `<span>${meta.type}</span><span>${meta.level}</span>`;
          card.appendChild(metaLine);
        }

        card.setAttribute("aria-label", name);
      });
    };

    const setFilterCounts = () => {
      filters.forEach((button) => {
        if (button.querySelector(".skill-filter__count")) return;
        const filter = button.dataset.skillFilter || "all";
        const total = filter === "all" ? cards.length : cards.filter((card) => getGroups(card).includes(filter)).length;
        const badge = document.createElement("span");
        badge.className = "skill-filter__count";
        badge.textContent = total;
        button.appendChild(badge);
      });
    };

    const revealCards = () => {
      cards.forEach((card) => card.classList.add("is-ready"));
      if (reducedMotion.matches || !("IntersectionObserver" in window)) {
        cards.forEach((card) => card.classList.add("is-revealed"));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12 }
      );
      cards.forEach((card) => observer.observe(card));
    };

    const addTilt = () => {
      if (reducedMotion.matches || !canHover.matches) return;
      cards.forEach((card) => {
        card.addEventListener("pointermove", (event) => {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          card.style.setProperty("--tilt-x", `${x * 6}deg`);
          card.style.setProperty("--tilt-y", `${y * -6}deg`);
        });
        card.addEventListener("pointerleave", () => {
          card.style.removeProperty("--tilt-x");
          card.style.removeProperty("--tilt-y");
        });
      });
    };

    const updateHero = (card) => {
      const title = document.querySelector("[data-skill-hero-title]");
      if (title) title.textContent = getSkillName(card);
      document.querySelectorAll("[data-skill-orbit-name]").forEach((button) => {
        button.classList.toggle("is-active", button.dataset.skillOrbitName === getSkillName(card));
      });
    };

    const renderRelated = (card) => {
      const related = root.querySelector("[data-skill-related]");
      if (!related) return;
      const groups = getGroups(card);
      const current = getSkillName(card);
      const matches = cards
        .filter((item) => getSkillName(item) !== current && getGroups(item).some((group) => groups.includes(group)))
        .slice(0, 5);
      related.innerHTML = "";
      matches.forEach((item) => {
        const button = document.createElement("button");
        button.className = "skill-related__button";
        button.type = "button";
        button.textContent = getSkillName(item);
        button.addEventListener("click", () => {
          userSelected = true;
          updateInspector(item);
          item.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "center" });
        });
        related.appendChild(button);
      });
    };

    const updateInspector = (card) => {
      selectedCard = card;
      const meta = getMeta(card);
      const title = root.querySelector("[data-skill-title]") || inspectorTitle;
      const copy = root.querySelector("[data-skill-copy]") || inspectorCopy;
      const icon = root.querySelector("[data-skill-inspector-icon]");
      const kind = root.querySelector("[data-skill-kind]");
      const meter = root.querySelector("[data-skill-meter]");
      const tags = root.querySelector("[data-skill-tags]");

      cards.forEach((item) => item.setAttribute("aria-pressed", String(item === card)));
      if (title) title.textContent = getSkillName(card);
      if (copy) copy.textContent = card.dataset.detail || "";
      if (icon) icon.src = getIconSrc(card);
      if (kind) kind.textContent = `${meta.type} / ${meta.level}`;
      if (meter) meter.style.width = `${meta.level}%`;
      if (tags) {
        tags.innerHTML = "";
        getGroups(card).forEach((group) => {
          const item = document.createElement("li");
          item.textContent = groupLabels[group] || group;
          tags.appendChild(item);
        });
      }
      updateHero(card);
      renderRelated(card);
    };

    const applyFilters = () => {
      const query = normalize(input?.value || "");
      let visible = 0;
      let firstVisible = null;

      cards.forEach((card) => {
        const groups = (card.dataset.groups || "").split(/\s+/);
        const haystack = normalize(`${getSkillName(card)} ${card.textContent} ${card.dataset.search || ""} ${card.dataset.detail || ""} ${getMeta(card).type}`);
        const matchesGroup = activeFilter === "all" || groups.includes(activeFilter);
        const matchesQuery = !query || haystack.includes(query);
        const show = matchesGroup && matchesQuery;
        card.classList.toggle("is-hidden", !show);
        if (show) {
          visible += 1;
          if (!firstVisible) firstVisible = card;
        }
      });

      if (count) {
        count.textContent = `${visible} / ${cards.length} ${allLabel}`;
      }
      const visibleStat = root.querySelector("[data-skill-visible]");
      if (visibleStat) visibleStat.textContent = visible;
      if (empty) {
        empty.classList.toggle("is-visible", visible === 0);
      }
      if (visible > 0 && (!selectedCard || selectedCard.classList.contains("is-hidden")) && !userSelected) {
        updateInspector(firstVisible);
      }
    };

    const resetFilters = () => {
      activeFilter = "all";
      if (input) input.value = "";
      filters.forEach((item) => item.setAttribute("aria-pressed", String((item.dataset.skillFilter || "all") === "all")));
      userSelected = false;
      applyFilters();
      if (cards[0]) updateInspector(cards[0]);
    };

    const spotlight = () => {
      const visibleCards = cards.filter((card) => !card.classList.contains("is-hidden"));
      const pool = visibleCards.length ? visibleCards : cards;
      const card = pool[Math.floor(Math.random() * pool.length)];
      if (!card) return;
      userSelected = true;
      updateInspector(card);
      card.classList.add("is-spotlighted");
      window.setTimeout(() => card.classList.remove("is-spotlighted"), 900);
      card.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "center" });
    };

    const copySummary = async () => {
      if (!selectedCard) return;
      const text = `${getSkillName(selectedCard)} - ${selectedCard.dataset.detail || ""}`;
      const toast = root.querySelector("[data-skill-toast]");
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.className = "sr-only";
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        area.remove();
      }
      if (toast) {
        toast.textContent = labels.copied;
        window.setTimeout(() => {
          toast.textContent = "";
        }, 1800);
      }
    };

    enhanceHero();
    enhanceControls();
    enhanceInspector();
    enhanceCards();
    setFilterCounts();
    revealCards();
    addTilt();

    filters.forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.skillFilter || "all";
        userSelected = false;
        filters.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
        applyFilters();
      });
    });

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        userSelected = true;
        updateInspector(card);
      });
    });

    input?.addEventListener("input", () => {
      userSelected = false;
      applyFilters();
    });
    root.querySelectorAll("[data-skill-random]").forEach((button) => button.addEventListener("click", spotlight));
    document.querySelectorAll(".skill-hero-stage [data-skill-random]").forEach((button) => button.addEventListener("click", spotlight));
    root.querySelectorAll("[data-skill-reset]").forEach((button) => button.addEventListener("click", resetFilters));
    root.querySelector("[data-skill-copy-summary]")?.addEventListener("click", copySummary);
    document.querySelectorAll("[data-skill-orbit-name]").forEach((button) => {
      button.addEventListener("click", () => {
        const card = cards.find((item) => getSkillName(item) === button.dataset.skillOrbitName);
        if (!card) return;
        userSelected = true;
        updateInspector(card);
        card.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "center" });
      });
    });

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
