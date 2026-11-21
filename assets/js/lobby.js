(() => {
  const stage=document.querySelector('.rooftop');
  if (!stage) return;
  const zh=document.documentElement.lang.startsWith('zh'), tr=(en,tc)=>zh?tc:en;
  const entry=stage.dataset.entry, dialog=stage.querySelector('dialog'), body=dialog.querySelector('.panel-body');
  const pause=stage.querySelector('[data-pause]'), focusReturn=stage.querySelector('.work-index');
  const asset=new URL('../',document.currentScript.src);
  const files={missions:'work.html',story:'about.html',skills:'skillset.html',contact:'contact.html',lobby:'index.html'};
  const panels={
    missions:tr('Selected work','作品集'), skills:tr('Skill tree','技能樹'),
    story:tr('Profile','個人簡介'), contact:tr('Contact','聯絡'),
    archive:tr('Downloads & links','下載及連結'), discipline:tr('Discipline','製作範疇'),
    news:tr('Creative practice','創作實務'), settings:tr('Settings','設定')
  };
  const hashes={missions:'work',story:'profile',archive:'downloads',news:'practice'};
  const destinations=Object.fromEntries(Object.entries(hashes).map(([key,hash])=>[hash,key]));
  const panelShots={missions:'lean',story:'gaze',contact:'gaze',archive:'rear',news:'turn'};
  const pages=new Map([[entry,Promise.resolve(document.querySelector('#record-source').content)]]);
  let revision=0, lastControl=focusReturn, current='';
  function dataFor(key) {
    if (!pages.has(key)) {
      const task=fetch(files[key]).then(response=>{
        if (!response.ok) throw Error(response.status);
        return response.text();
      }).then(html=>new DOMParser().parseFromString(html,'text/html').querySelector('#record-source').content)
        .catch(error=>{pages.delete(key);throw error;});
      pages.set(key,task);
    }
    return pages.get(key);
  }
  function el(tag,text,cls) {
    const node=document.createElement(tag);
    if(text!=null)node.textContent=text;
    if(cls)node.className=cls;
    return node;
  }
  function action(label,fn,cls) {
    const b=el('button',label,cls);b.type='button';b.addEventListener('click',fn);return b;
  }
  function link(label,href) {
    const a=el('a',label,'record-link');a.href=href;return a;
  }
  function selectShot(mode) {
    stage.dataset.pose=mode;
    stage.dispatchEvent(new Event('posechange'));
  }
  const inspector=dialog.querySelector('.inspection');
  const picker=dialog.querySelector('.kit-picker');
  picker.addEventListener('change',()=>stage.querySelector('[data-kit="'+picker.value+'"]').click());
  const notes={
    cinema:[['Camera and lighting','攝影及燈光'],['Lens choice, framing and key-light placement on set.','現場鏡頭選擇、構圖與主燈位置。'],['Cinema camera · two LED panels on stands','電影攝影機 · 兩組腳架式 LED 燈']],
    edit:[['Picture review','畫面檢視'],['Check the shot on the handheld display against the edit timeline.','對照剪接時間軸，在手提顯示器上檢視鏡頭。'],['Review tablet · timeline monitor','預覽平板 · 時間軸顯示器']],
    model:[['Surface inspection','表面檢視'],['Inspect the silhouette, topology and surface response under a moving light.','在移動光源下檢視輪廓、拓撲與表面質感。'],['Stylus · wireframe display pedestal','觸控筆 · 線框模型展示台']],
    mocap:[['Marker tracking','標記追蹤'],['Sweep the marker cluster through the capture volume within sight of both sensors.','在兩台感應器的視野內移動標記組，檢視捕捉範圍。'],['Hand marker cluster · paired tracking sensors','手持標記組 · 雙追蹤感應器']],
    live:[['Show calling','現場調度'],['Raise the radio to call a cue, then check the levels at the console.','舉起對講機發出提示，再查看控制台上的訊號電平。'],['Production radio · mixing desk and level display','製作對講機 · 混音台及電平顯示器']]
  };
  function inspect(view){
    const note=body.querySelector('.practice-note');
    if(!note)return;
    stage.dataset.inspection=view;
    const [title,technique,equipment]=notes[stage.dataset.skill];
    const work=view==='work';
    stage.style.setProperty('--inspection-poster','url("'+new URL('media/main-street/'+stage.dataset.skill+'-'+view+'.webp',asset).href+'")');
    for(const child of body.children)child.hidden=child===note ? work : !work;
    note.replaceChildren(el('h3',view==='equipment'?tr('Production kit','製作器材'):tr(...title)),
      el('p',tr(...(view==='equipment'?equipment:technique))));
    for(const button of inspector.children)button.setAttribute('aria-pressed',String(button.dataset.inspection===view));
    stage.dispatchEvent(new Event('recordchange'));
  }
  for(const button of inspector.children)button.addEventListener('click',()=>inspect(button.dataset.inspection));
  const clock=stage.querySelector('time');
  const formatter=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Hong_Kong',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
  function time(){const now=new Date();clock.dateTime=now.toISOString();clock.textContent=formatter.format(now)+' HKT';}
  time();setInterval(time,30000);
  function flipHud(){
    const hidden=stage.toggleAttribute('data-clean');
    stage.querySelector('.eye').setAttribute('aria-pressed',String(hidden));
  }
  stage.querySelector('.eye').addEventListener('click',flipHud);
  const wide=matchMedia('(orientation:landscape)');
  function present(panel){
    const modal=!wide.matches;
    if(dialog.open && dialog.matches(':modal')!==modal)dialog.close();
    if(!dialog.open){if(modal)dialog.showModal();else dialog.show();}
  }
  wide.addEventListener('change',()=>{if(dialog.open)present(current);});
  function navigate(key,record='') {
    const fragment=(hashes[key]||key)+(record?'/'+encodeURIComponent(record):'');
    if(location.hash.slice(1)!==fragment){
      if(current==='discipline' && key===current)history.replaceState(history.state,'','#'+fragment);
      else history.pushState({from:current||'lobby'},'','#'+fragment);
    }
    renderRoute();
  }
  function back(){
    if(history.state?.from==='lobby')history.back();
    else {history.replaceState(null,'','#lobby');renderRoute();}
  }
  stage.querySelectorAll('[data-panel]').forEach(b=>b.addEventListener('click',()=>{lastControl=b;navigate(b.dataset.panel,b.dataset.record);}));
  dialog.querySelector('.close').addEventListener('click',back);
  dialog.addEventListener('cancel',e=>{e.preventDefault();back();});
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape' && dialog.open && !dialog.matches(':modal')){back();return;}
    if(e.altKey||e.metaKey||e.ctrlKey||dialog.open||e.target.matches('input,select,textarea'))return;
    if(e.key==='Escape'&&stage.hasAttribute('data-clean'))flipHud();
  });
  function records(source){
    return [...source.querySelectorAll('section.section[aria-labelledby]')].filter(s=>s.querySelector('h2')&&!s.querySelector('#work-index-title'));
  }
  function showWorkList(source){
    const list=el('div',null,'record-list project-list');
    records(source).forEach(section=>{
      const heading=section.querySelector('h2');
      const button=action(heading.textContent,()=>navigate('missions',heading.id));
      const original=section.querySelector('img');
      if(original){
        const preview=el('img');
        preview.src=original.getAttribute('src');
        preview.alt='';
        preview.loading='lazy';
        button.prepend(preview);
      }
      list.append(button);
    });
    body.append(list);
  }
  function showRecord(section) {
    const copy=section.cloneNode(true);
    copy.querySelectorAll('img').forEach(img=>img.loading='lazy');
    body.append(copy);
  }
  const skillLevels=new Map();
  function tree(source) {
    const filters=[...source.querySelectorAll('[data-skill-filter]')].filter(b=>b.dataset.skillFilter!=='all');
    const cards=[...source.querySelectorAll('[data-skill-card]')];
    const branches={
      vp:['layer',16,17], capture:['target',13,48], media:['frame',19,78],
      events:['news',81,17], software:['review',87,48], ai:['gem',81,78]
    };
    const types={Software:'軟件',Hardware:'硬件',Workflow:'流程',Infrastructure:'基建',Craft:'製作工藝',AI:'AI'};
    const initial={cinema:'media',edit:'media',model:'vp',mocap:'capture',live:'events'};
    const map=dialog.querySelector('.skill-map');
    map.hidden=false;
    map.innerHTML='<svg class="branch-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"></svg>';
    const lines=map.firstElementChild;
    body.innerHTML='<h3 class="branch-name"></h3><nav class="tree-types"></nav><div class="tree-leaves"></div><div class="node-detail" aria-live="polite"><img alt=""><div><strong></strong><p></p></div></div>';
    const groups=body.querySelector('.tree-types'), leaves=body.querySelector('.tree-leaves');
    const detail=body.querySelector('.node-detail'), rank=el('output',null,'skill-level');
    groups.setAttribute('aria-label',tr('Tool types','工具類型'));
    let skillKey;
    function updateLevel(){rank.textContent=tr('Lobby Lv. ','大廳等級 ')+(skillLevels.get(skillKey)||1);}
    const upgrade=action(tr('Level up','升級'),()=>{
      skillLevels.set(skillKey,(skillLevels.get(skillKey)||1)+1);
      updateLevel();stage.dispatchEvent(new Event('skilllevelup'));
    },'level-up');
    const controls=el('div',null,'level-controls');controls.append(rank,upgrade);body.append(controls);
    function select(button){
      for(const peer of button.parentElement.querySelectorAll(':scope > button'))
        peer.setAttribute('aria-pressed',String(peer===button));
    }
    function showTools(members){
      leaves.replaceChildren();
      for(const card of members){
        const key=card.dataset.skillName, name=card.querySelector('.skill-name').textContent;
        const img=el('img');img.alt='';img.src=new URL('skill-icons/'+window.skillVisuals[key].icon,asset);
        const leaf=action(name,()=>{
          select(leaf);skillKey=key;updateLevel();
          detail.querySelector('img').src=img.src;detail.querySelector('strong').textContent=name;
          detail.querySelector('p').textContent=card.dataset.detail;
        });
        leaf.prepend(img);leaves.append(leaf);
      }
      leaves.firstElementChild?.click();
    }
    for(const filter of filters){
      const branch=filter.dataset.skillFilter,label=filter.textContent.trim();
      const [symbol,x,y]=branches[branch];
      const line=document.createElementNS(lines.namespaceURI,'path');
      const side=x<50?-1:1;
      line.setAttribute('d',`M ${50+side*12} ${50+(y-50)*.37} L ${50+side*22} ${y} H ${x}`);
      lines.append(line);
      const button=action(null,()=>{
        select(button);
        for(const edge of lines.children)edge.classList.toggle('active',edge===line);
        body.querySelector('.branch-name').textContent=label;
        groups.replaceChildren();
        const byType=new Map();
        for(const card of cards.filter(c=>c.dataset.groups.split(/\s+/).includes(branch))){
          const type=window.skillVisuals[card.dataset.skillName]?.type;
          if(!type)continue;
          if(!byType.has(type))byType.set(type,[]);
          byType.get(type).push(card);
        }
        for(const [type,members] of byType){
          const group=action(zh?types[type]:type,()=>{select(group);showTools(members);});
          groups.append(group);
        }
        groups.firstElementChild?.click();
        body.scrollTop=0;
      },'branch-node');
      button.dataset.branch=branch;button.style.left=x+'%';button.style.top=y+'%';
      button.innerHTML=`<i><svg aria-hidden="true"><use href="${asset}lobby-icons.svg#${symbol}"></use></svg></i>`;
      button.append(el('span',label));map.append(button);
    }
    map.querySelector('[data-branch="'+(initial[stage.dataset.skill]||'vp')+'"]').click();
  }
  async function renderRoute() {
    const id=++revision;
    const [raw,encoded='']=location.hash.slice(1).split('/');
    let record='';
    try{record=decodeURIComponent(encoded);}catch{}
    const key=raw==='event'?'missions':['lobby','camera','scout'].includes(raw)?'lobby':Object.hasOwn(destinations,raw)?destinations[raw]:Object.hasOwn(panels,raw)?raw:entry;
    if(raw==='event')record='vp-title';
    else if(raw && !Object.hasOwn(panels,raw) && !Object.hasOwn(destinations,raw) && entry==='missions')record=raw;
    const nextView=key==='discipline' && current==='discipline' ? stage.dataset.inspection : 'work';
    inspector.hidden=true;delete stage.dataset.inspection;
    dialog.querySelector('.skill-map').hidden=true;
    stage.toggleAttribute('data-tree',key==='skills' && record!=='catalogue');
    dialog.dispatchEvent(new Event('panelchange'));
    if(pause.parentNode!==stage){pause.hidden=true;stage.append(pause);}
    stage.querySelectorAll('[data-kit]').forEach(b=>b.setAttribute('aria-expanded',String(key==='discipline' && b.dataset.kit===record)));
    if(key==='lobby'){
      if(dialog.open)dialog.close();
      stage.removeAttribute('data-open');stage.dispatchEvent(new Event('posechange'));
      stage.dispatchEvent(new Event('recordchange'));
      if(current)(lastControl.isConnected?lastControl:focusReturn).focus({preventScroll:true});current='';return;
    }
    const kit=key==='discipline' && [...stage.querySelectorAll('[data-kit]')].find(b=>b.dataset.kit===record);
    if(key==='discipline' && !kit){history.replaceState(null,'','#lobby');return renderRoute();}
    if(key==='missions')picker.value='';
    if(kit){
      stage.dataset.skill=kit.dataset.kit;picker.value=kit.dataset.kit;
      stage.style.setProperty('--kit-poster','url("'+new URL('media/main-street/'+kit.dataset.kit+'.webp',asset).href+'")');
      stage.querySelectorAll('[data-kit]').forEach(b=>b.classList.toggle('equipped',b===kit));
    }
    current=key;stage.dataset.open=key;stage.removeAttribute('data-clean');stage.querySelector('.eye').setAttribute('aria-pressed','false');
    dialog.querySelector('h2').textContent=kit?kit.getAttribute('aria-label'):panels[key];
    body.replaceChildren();stage.dispatchEvent(new Event('recordchange'));body.removeAttribute('aria-busy');body.scrollTop=0;
    present(key);
    if(kit)selectShot('turn');
    else if(panelShots[key])selectShot(panelShots[key]);
    else stage.dispatchEvent(new Event('posechange'));
    const actions=el('div',null,'record-list');
    try {
      if(['missions','story','skills','contact','archive','news','discipline'].includes(key)){
        const sourceKey={archive:'contact',news:'lobby',discipline:'missions'}[key]||key;
        body.setAttribute('aria-busy','true');
        const source=await dataFor(sourceKey);
        if(id!==revision)return;
        body.removeAttribute('aria-busy');
        if(kit){
          const section=records(source).find(item=>item.getAttribute('aria-labelledby')===kit.dataset.case);
          if(!section)throw Error('Missing discipline record');
          const cardImage={cinema:'filmmaking-camera-operator',edit:'filmmaking-mv-stage'}[record];
          const card=cardImage && section.querySelector('img[src*="'+cardImage+'"]')?.closest('article');
          const sourceCopy=card?.querySelector('.work-card-body') || section.querySelector('.split-copy');
          const photo=(card || section).querySelector('img')?.cloneNode();
          const heading=sourceCopy?.querySelector('h2,h3');
          const intro=heading?.nextElementSibling;
          if(photo && heading && intro){
            const preview=el('article',null,'discipline-record');
            photo.loading='eager';preview.append(photo,el('h3',heading.textContent),el('p',intro.textContent));
            body.append(preview);
          }else showRecord(card || section);
          body.append(action(tr('View full work record →','查看完整作品檔案 →'),()=>navigate('missions',kit.dataset.case),'tool-index'));
          body.append(action(tr('Explore skill tree','探索技能樹'),()=>navigate('skills'),'discipline-skills'));
          body.append(el('article',null,'practice-note'));
          inspector.hidden=false;inspect(nextView || 'work');
          return;
        }
        if(key==='skills'){
          if(record==='catalogue'){
            body.append(action(tr('‹ Skill tree','‹ 技能樹'),()=>navigate('skills'),'record-back'));
            showRecord(source.querySelector('[data-skillset]'));
            document.dispatchEvent(new Event('catalogueopen'));
          } else {
            tree(source);
            body.append(action(tr('Search all tools','搜尋全部工具'),()=>navigate('skills','catalogue'),'tool-index'));
          }
          return;
        }
        if(key==='missions'){
          const section=record && records(source).find(s=>s.querySelector('h2').id===record||s.id===record);
          if(section){body.append(action(tr('‹ All work','‹ 全部作品'),()=>navigate('missions'),'record-back'));showRecord(section);}
          else showWorkList(source);
        } else if(key==='archive'){
          source.querySelectorAll('a[href*=".pdf"]').forEach(a=>actions.append(link(a.textContent.trim(),a.getAttribute('href'))));
          actions.append(action(tr('Contact and profile links','聯絡及個人連結'),()=>navigate('contact')));body.append(actions);
        } else if(key==='news'){
          const sections=records(source);
          for(const section of sections)showRecord(section);
          if(!sections.length)body.append(el('p',tr('The Main street lobby is open.','街景大廳已開放。')));
        } else {
          for(const section of records(source))showRecord(section);
          if(key==='story')body.append(action(tr('Explore my practice','了解創作實務'),()=>navigate('news')));
        }
      } else {
        pause.hidden=false;body.append(pause);
        const locale=zh?'../':'zh-hk/';
        body.append(link(tr('Snowbreak 1.8 lobby','Snowbreak 1.8 大廳'),new URL('../snowbreak/',asset).href));
        body.append(link(zh?'English':'繁體中文',locale+(files[entry]||'index.html')+'#settings'));
        body.append(el('p',tr('Operative model and menu animation from Snowbreak: Containment Zone.','角色模型及選單動畫來自《塵白禁域》。')));
      }
    }catch(error){
      if(id!==revision)return;
      body.removeAttribute('aria-busy');body.replaceChildren(el('p',tr('This file could not be loaded.','未能載入此檔案。')),action(tr('Retry','重試'),renderRoute));
      console.warn('Lobby record unavailable',error);
    }
  }
  body.addEventListener('click',event=>{
    const a=event.target.closest('a[href]');
    if(!a || a.target || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)return;
    const page=Object.entries(files).find(([,file])=>new URL(file,location.href).pathname===a.pathname && a.origin===location.origin);
    if(page){event.preventDefault();navigate(page[0],a.hash.slice(1));}
  });
  window.addEventListener('hashchange',renderRoute);
  renderRoute();
})();