const stage = document.querySelector('.rooftop');
const pause = stage.querySelector('[data-pause]');
const switchView = stage.querySelector('[data-switch-scene]');
const zh = document.documentElement.lang.startsWith('zh');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const saveData = navigator.connection?.saveData || matchMedia('(prefers-reduced-data: reduce)').matches;
const compact = matchMedia('(pointer: coarse), (max-width: 760px)').matches;
const url = new URL(location.href);
const requested = url.searchParams.get('scene');
let lightweight = requested === 'light' || (requested !== 'live' && (compact || saveData));

function setSwitchLabel() {
  switchView.hidden = false;
  switchView.textContent = lightweight
    ? (zh ? '開啟即時 3D' : 'Enable live 3D')
    : (zh ? '使用輕量模式' : 'Use lightweight view');
}
switchView.addEventListener('click', () => {
  // Reloading releases the WebGL context, its decoded textures and animation buffers.
  const next = new URL(location.href);
  next.searchParams.set('scene', lightweight ? 'live' : 'light');
  location.replace(next);
});

function startFilm() {
  let playing = !reduced.matches && !saveData;
  let film;
  function update() {
    stage.toggleAttribute('data-motion-paused', !playing);
    pause.disabled = false;
    pause.setAttribute('aria-pressed', String(!playing));
    pause.textContent = playing ? (zh ? '暫停動態' : 'Pause motion') : (zh ? '播放動態' : 'Resume motion');
    if (!playing || document.hidden || stage.dataset.open || stage.dataset.skill) {
      if (film) { film.pause(); film.hidden = true; }
      return;
    }
    if (!film) {
      film = document.createElement('video');
      film.className = 'street-film';
      film.setAttribute('aria-hidden', 'true');
      film.muted = film.defaultMuted = film.loop = film.playsInline = true;
      film.poster = new URL('../media/main-street/lobby' + (matchMedia('(orientation: portrait)').matches ? '-portrait' : '') + '.webp?v=street-studio-2', import.meta.url).href;
      film.src = new URL('../media/main-street/mobile-orbit.mp4', import.meta.url).href;
      stage.prepend(film);
    }
    film.hidden = false;
    if (film.paused) film.play().catch(error => {
      if (error.name === 'AbortError') return;
      playing = false;
      update();
    });
  }
  pause.addEventListener('click', () => { playing = !playing; update(); });
  reduced.addEventListener('change', () => { playing = !reduced.matches && !saveData; update(); });
  document.addEventListener('visibilitychange', update);
  stage.addEventListener('recordchange', update);
  update();
}

setSwitchLabel();
if (lightweight) {
  startFilm();
} else {
  import('./hong-kong-street.js?v=mobile-1')
    .then(({mountStreet}) => mountStreet(stage.querySelector('canvas'), stage, compact || saveData))
    .catch(error => {
      console.warn('Live street unavailable', error);
      lightweight = true;
      setSwitchLabel();
      startFilm();
    });
}
