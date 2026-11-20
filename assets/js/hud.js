(() => {
  const stage = document.querySelector('.rooftop');
  const zh = document.documentElement.lang.startsWith('zh');
  const asset = new URL('../', document.currentScript.src);
  const tr = (en, tc) => zh ? tc : en;
  const icon = name => `<svg aria-hidden="true"><use href="${asset}lobby-icons.svg#${name}"></use></svg>`;
  const shots = [['turn','Turn','轉身'], ['lean','Lean in','探身'], ['gaze','Gaze','凝望'], ['rear','Reverse','回望']];
  const shortcuts = [
    ['missions','mission','Credits','製作名單','credits-title'],
    ['missions','review','Motion capture','動作捕捉','mocap-title'],
    ['contact','contact','Contact','聯絡'],
    ['news','news','Practice','創作實務']
  ];
  const tiles = [
    ['skills','tree','Skill tree','技能樹'], ['scout','target','Camera','鏡頭'],
    ['story','book','Profile','簡介'], ['archive','bag','Downloads','下載']
  ];
  const compactLabels={skills:'Skills',scout:'Shots',story:'Bio',archive:'Files'};
  function menuItem([panel,symbol,en,tc,record]) {
    return `<button type="button" data-panel="${panel}" ${record ? `data-record="${record}"` : ''} aria-label="${tr(en,tc)}">
      <i>${icon(symbol)}</i><span><b lang="zh-HK">${tc}</b><small lang="en">${compactLabels[panel] ? `<span class="full-label">${en}</span><span class="short-label">${compactLabels[panel]}</span>` : en}</small></span></button>`;
  }
  const photoLabel = tr('Save a rooftop photo','儲存天台照片');
  const visibilityLabel = tr('Show or hide interface','顯示或隱藏介面');
  stage.innerHTML = `
    <canvas class="city-canvas" aria-hidden="true"></canvas>
    <div class="frame hud" aria-hidden="true"></div>
    <header class="commander hud">
      <button type="button" data-panel="story" aria-label="${tr('NoodleDoStuff profile','NoodleDoStuff 個人簡介')}">
        <i>${icon('brand')}</i><span><small>${tr('Creator profile','創作者檔案')}</small><strong>NoodleDoStuff</strong></span>
      </button>
    </header>
    <div class="sector hud">${icon('pin')} <span lang="zh-HK">旺角</span> / Mong Kok</div>
    <div class="resources hud">
      <button type="button" data-panel="skills">${icon('gem')} ${tr('54 tools','54 款工具')}</button>
      <button type="button" data-panel="archive">${icon('mission')} CV / PDF</button>
      <button type="button" data-panel="settings" aria-label="${tr('Settings and language','設定及語言')}" title="${tr('Settings and language','設定及語言')}">${icon('settings')}</button>
    </div>
    <nav class="rail hud" aria-label="${tr('Portfolio shortcuts','作品集捷徑')}">${shortcuts.map(menuItem).join('')}</nav>
    <nav class="operations hud" aria-label="${tr('Explore portfolio','瀏覽作品集')}">
      <button class="featured" type="button" data-panel="missions" data-record="vp-title">
        <small>${tr('Featured case','精選個案')}</small><strong>${tr('LED ICVFX stage','LED ICVFX 虛擬影棚')}</strong>
        <span>${tr('Virtual production','虛擬製作')}</span>
      </button>
      <button class="work-index" type="button" data-panel="missions" aria-label="${tr('Selected work','精選作品')}">
        <i>${icon('play')}</i><span><small>NoodleDoStuff</small><strong lang="zh-HK">作品</strong><b lang="en">Selected work</b></span>
        <em aria-hidden="true">»</em>
      </button>
      <div class="tiles">${tiles.map(menuItem).join('')}</div>
    </nav>
    <section class="identity hud">
      <small>${tr('Technical director & filmmaker','技術總監及影像創作人')}</small>
      <h1>Timothy Yu</h1>
      <div class="shot-list" role="group" aria-label="${tr('Camera views','鏡頭視角')}">
        ${shots.map(([mode,en,tc],i) => `<button type="button" data-stance="${mode}" aria-pressed="${i===0}">${tr(en,tc)}</button>`).join('')}
      </div>
    </section>
    <div class="view-tools">
      <button type="button" class="photo hud" title="${photoLabel}" aria-label="${photoLabel}">${icon('frame')}</button>
      <button type="button" class="eye" title="${visibilityLabel}" aria-label="${visibilityLabel}" aria-pressed="false">${icon('eye')}</button>
    </div>
    <footer class="ticker hud"><button type="button" data-panel="missions" data-record="film-title"><b>${tr('On file','檔案')}</b><span>${tr('Filmmaking, VFX & post-production','電影、視覺特效及後期製作')}</span></button><time data-hk-time>HKT</time></footer>
    <dialog class="game-panel" aria-labelledby="panel-title">
      <div class="panel-head"><h2 id="panel-title"></h2><button type="button" class="close" aria-label="${tr('Return to lobby','返回大廳')}">×</button></div>
      <div class="panel-body"></div>
    </dialog>
    <button type="button" data-pause hidden disabled aria-pressed="false">${tr('Still view','靜態畫面')}</button>
  `;
})();