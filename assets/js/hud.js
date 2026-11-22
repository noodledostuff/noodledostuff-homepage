(() => {
  const stage = document.querySelector('.rooftop');
  const zh = document.documentElement.lang.startsWith('zh');
  const asset = new URL('../', document.currentScript.src);
  const tr = (en, tc) => zh ? tc : en;
  const icon = name => `<svg aria-hidden="true"><use href="${asset}lobby-icons.svg#${name}"></use></svg>`;
  const skills=[
    ['cinema','frame','Cinematography / Photography','電影及攝影','film-title'],
    ['edit','review','Editing / VFX','剪接及特效','film-title'],
    ['model','layer','Real-time 3D','即時三維製作','vp-title'],
    ['mocap','target','Motion capture','動作捕捉','mocap-title'],
    ['live','news','Live events','現場活動','event-title']
  ];
  const compactSkills={cinema:tr('Camera','攝影'), edit:tr('Post','後期'), model:tr('3D','三維'), mocap:tr('Mocap','動捕'), live:tr('Live','現場')};
  const visibilityLabel = tr('Show or hide interface','顯示或隱藏介面');
  stage.innerHTML = `
    <canvas class="city-canvas" aria-hidden="true"></canvas>
    <div class="frame hud" aria-hidden="true"></div>
    <div class="hud-grid"><header class="commander hud">
      <button type="button" data-panel="story" aria-label="${tr('NoodleDoStuff profile','NoodleDoStuff 個人簡介')}">
        <i>${icon('brand')}</i><span><small>${tr('Creator profile','創作者檔案')}</small><strong>NoodleDoStuff</strong></span>
      </button>
    </header>

    <div class="resources hud">
      <button type="button" data-panel="settings" aria-label="${tr('Settings and language','設定及語言')}" title="${tr('Settings and language','設定及語言')}">${icon('settings')}</button>
    </div>
    <nav class="rail hud" aria-label="${tr('Production disciplines','製作範疇')}"><small class="rail-title">${tr('Disciplines','製作範疇')}</small>${skills.map(([id,symbol,en,tc,record])=>`<button type="button" data-kit="${id}" data-panel="discipline" data-record="${id}" data-case="${record}" aria-haspopup="dialog" aria-controls="portfolio-panel" aria-expanded="false" aria-label="${tr(en,tc)}"><i>${icon(symbol)}</i><span class="full-label">${tr(en,tc).replace('Cinematography / Photography','Cinematography<br><small>Photography</small>')}</span><span class="compact-label">${compactSkills[id]}</span></button>`).join('')}</nav>
    <nav class="operations hud" aria-label="${tr('Explore portfolio','瀏覽作品集')}">
      <button class="work-index" type="button" data-panel="missions">
        <span><small>${tr('Portfolio','作品集')}</small><strong>${tr('Selected work','精選作品')}</strong></span>
        <em aria-hidden="true">${icon('arrow')}</em>
      </button>
      <button class="skill-command" type="button" data-panel="skills">${icon('tree')}<span>${tr('Skill tree','技能樹')}</span>${icon('arrow')}</button>
      <button class="contact-command" type="button" data-panel="contact">${icon('contact')}<span>${tr('Contact & downloads','聯絡及下載')}</span>${icon('arrow')}</button>
    </nav>
    <section class="identity hud">
      <small>${tr('Technical director & filmmaker','技術總監及影像創作人')}</small>
      <h1>Timothy Yu</h1>
    </section>
    <div class="view-tools">
      <button type="button" class="eye" title="${visibilityLabel}" aria-label="${visibilityLabel}" aria-pressed="false">${icon('eye')}</button>
    </div>
    <footer class="ticker hud"><span>${tr('Hong Kong','香港')} <span aria-hidden="true">/</span> ${tr('Mong Kok','旺角')}</span><time data-hk-time>HKT</time></footer></div>
    <dialog id="portfolio-panel" class="game-panel" aria-labelledby="panel-title">
      <div class="panel-head"><h2 id="panel-title" tabindex="-1"></h2><select class="kit-picker" aria-label="${tr('Production discipline','製作範疇')}"><option value="" disabled>${tr('Disciplines','製作範疇')}</option>${skills.map(([id,,en,tc])=>`<option value="${id}">${tr(en,tc)}</option>`).join('')}</select><button type="button" class="close" aria-label="${tr('Return to lobby','返回大廳')}">×</button></div>
      <nav class="skill-map" hidden aria-label="${tr('Skill tree branches','技能樹分支')}"></nav>
      <nav class="inspection" hidden aria-label="${tr('Discipline view','製作範疇檢視')}">
        ${[['work','frame','Work','作品'],['technique','target','Technique','手法'],['equipment','layer','Equipment','器材']].map(([key,symbol,en,tc])=>`<button type="button" data-inspection="${key}" aria-pressed="false">${icon(symbol)}${tr(en,tc)}</button>`).join('')}
      </nav>
      <div class="panel-body"></div>
    </dialog>
    <div data-scene-controls hidden>
      <button type="button" data-pause disabled aria-pressed="false">${tr('Still view','靜態畫面')}</button>
      <button type="button" data-switch-scene hidden></button>
    </div>
  `;
})();
