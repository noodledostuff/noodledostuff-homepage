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
    archive:tr('Downloads & links','下載及連結'), scout:tr('Camera views','鏡頭視角'),
    news:tr('Creative practice','創作實務'), settings:tr('Settings','設定')
  };
  const hashes={missions:'work',story:'profile',archive:'downloads',scout:'camera',news:'practice'};
  const destinations=Object.fromEntries(Object.entries(hashes).map(([key,hash])=>[hash,key]));
  const modes=['turn','lean','gaze','rear'];
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
    stage.querySelectorAll('[data-stance]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.stance===mode)));
    stage.dispatchEvent(new Event('posechange'));
  }
  const clock=stage.querySelector('time');
  const formatter=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Hong_Kong',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
  function time(){const now=new Date();clock.dateTime=now.toISOString();clock.textContent=formatter.format(now)+' HKT';}
  time();setInterval(time,30000);
  function flipHud(){
    const hidden=stage.toggleAttribute('data-clean');
    stage.querySelector('.eye').setAttribute('aria-pressed',String(hidden));
  }
  stage.querySelector('.eye').addEventListener('click',flipHud);
  stage.querySelector('.photo').addEventListener('click',()=>stage.dispatchEvent(new Event('photo')));
  stage.querySelectorAll('[data-stance]').forEach(b=>b.addEventListener('click',()=>selectShot(b.dataset.stance)));
  function navigate(key,record='') {
    const fragment=(hashes[key]||key)+(record?'/'+encodeURIComponent(record):'');
    if(location.hash.slice(1)!==fragment) history.pushState({from:current||'lobby'},'','#'+fragment);
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
    if(e.altKey||e.metaKey||e.ctrlKey||dialog.open||e.target.matches('input,select,textarea'))return;
    if(e.key==='Escape'&&stage.hasAttribute('data-clean'))flipHud();
    if(/^[1-4]$/.test(e.key))selectShot(modes[Number(e.key)-1]);
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
  function tree(source) {
    const filters=[...source.querySelectorAll('[data-skill-filter]')].filter(b=>b.dataset.skillFilter!=='all');
    const cards=[...source.querySelectorAll('[data-skill-card]')];
    body.innerHTML='<nav class="discipline-tabs"></nav><div class="constellation"><svg class="tree-lines" aria-hidden="true"></svg><div class="tree-root"><i aria-hidden="true">◇</i><strong></strong></div><div class="tree-types"></div><div class="tree-leaves"></div></div><div class="node-detail" aria-live="polite"><img alt=""><div><strong></strong><p></p></div></div>';
    const graph=body.querySelector('.constellation'),root=graph.querySelector('.tree-root');
    const tabs=body.querySelector('.discipline-tabs'),detail=body.querySelector('.node-detail');
    const types=graph.querySelector('.tree-types'),leaves=graph.querySelector('.tree-leaves'),lines=graph.querySelector('svg');
    tabs.setAttribute('aria-label',tr('Production discipline','製作範疇'));
    let activeType,activeLeaf,branch;
    const branchForKit={cinema:'media',edit:'media',model:'vp',mocap:'capture',live:'events'};
    for(const filter of filters){
      const tab=action(filter.textContent.trim(),()=>{
        branch=filter.dataset.skillFilter;
        for(const other of tabs.children)other.setAttribute('aria-pressed',String(other===tab));
        root.querySelector('strong').textContent=tab.textContent;
        grow();
      });
      tab.dataset.branch=filter.dataset.skillFilter;tabs.append(tab);
    }
    function drawEdges(){
      if(!graph.isConnected)return;
      const bounds=graph.getBoundingClientRect();
      lines.replaceChildren();
      function edge(from,to,on){
        const a=from.getBoundingClientRect(),b=to.getBoundingClientRect();
        const x=a.right-bounds.left,y=a.top+a.height/2-bounds.top;
        const tx=b.left-bounds.left,ty=b.top+b.height/2-bounds.top;
        const path=document.createElementNS('http://www.w3.org/2000/svg','path');
        const mid=x+(tx-x)*.5;
        path.setAttribute('d',`M ${x} ${y} H ${mid} V ${ty} H ${tx}`);
        if(on)path.classList.add('active');
        lines.append(path);
      }
      for(const button of types.children)edge(root.querySelector('i'),button,button===activeType);
      if(activeType)for(const button of leaves.children)edge(activeType,button,button===activeLeaf);
    }
    const typeNames={Software:'軟件',Hardware:'硬件',Workflow:'流程',Infrastructure:'基建',Craft:'製作工藝',AI:'AI'};
    function grow(){
      types.replaceChildren();leaves.replaceChildren();
      const groups=new Map();
      for(const card of cards.filter(c=>c.dataset.groups.split(/\s+/).includes(branch))){
        const meta=window.skillVisuals[card.dataset.skillName];
        if(!meta)continue;
        if(!groups.has(meta.type))groups.set(meta.type,[]);
        groups.get(meta.type).push(card);
      }
      groups.forEach((members,type)=>{
        const b=action(zh?typeNames[type]:type,()=>{
          activeType=b;
          for(const btn of types.children)btn.setAttribute('aria-pressed',String(btn===b));
          leaves.replaceChildren();
          members.forEach(card=>{
            const name=card.querySelector('.skill-name').textContent;
            const leaf=action(name,()=>{
              activeLeaf=leaf;
              for(const btn of leaves.children)btn.setAttribute('aria-pressed',String(btn===leaf));
              detail.querySelector('strong').textContent=name;
              detail.querySelector('img').src=img.src;
              detail.querySelector('p').textContent=card.dataset.detail;
              selectShot(type==='Hardware'?'lean':type==='Workflow'?'turn':'gaze');
              drawEdges();
            });
            const img=el('img');img.alt='';img.src=new URL('skill-icons/'+window.skillVisuals[card.dataset.skillName].icon,asset);
            leaf.prepend(img);leaves.append(leaf);
          });
          leaves.firstElementChild?.click();
        });
        const symbols={Software:'layer',Hardware:'idle',Workflow:'tree',Infrastructure:'shield',Craft:'frame',AI:'gem'};
        const glyph=document.createElementNS('http://www.w3.org/2000/svg','svg');
        glyph.setAttribute('aria-hidden','true');
        const use=document.createElementNS(glyph.namespaceURI,'use');use.setAttribute('href',asset+'lobby-icons.svg#'+(symbols[type]||'layer'));
        glyph.append(use);b.prepend(glyph);
        types.append(b);
      });
      types.firstElementChild?.click();
    }
    const initial=branchForKit[stage.dataset.skill] || 'vp';
    (tabs.querySelector('[data-branch="'+initial+'"]') || tabs.firstElementChild).click();
    const observer=new ResizeObserver(drawEdges);observer.observe(graph);
    dialog.addEventListener('panelchange',()=>observer.disconnect(),{once:true});
  }
  async function renderRoute() {
    const id=++revision;
    const [raw,encoded='']=location.hash.slice(1).split('/');
    let record='';
    try{record=decodeURIComponent(encoded);}catch{}
    const key=raw==='event'?'missions':raw==='lobby'?'lobby':Object.hasOwn(destinations,raw)?destinations[raw]:Object.hasOwn(panels,raw)?raw:entry;
    if(raw==='event')record='vp-title';
    else if(raw && !Object.hasOwn(panels,raw) && !Object.hasOwn(destinations,raw) && entry==='missions')record=raw;
    dialog.dispatchEvent(new Event('panelchange'));
    if(pause.parentNode!==stage){pause.hidden=true;stage.append(pause);}
    if(key==='lobby'){
      if(dialog.open)dialog.close();
      stage.removeAttribute('data-open');stage.dispatchEvent(new Event('posechange'));
      if(current)lastControl.focus({preventScroll:true});current='';return;
    }
    current=key;stage.dataset.open=key;stage.removeAttribute('data-clean');stage.querySelector('.eye').setAttribute('aria-pressed','false');
    dialog.querySelector('h2').textContent=panels[key];
    body.replaceChildren();body.removeAttribute('aria-busy');body.scrollTop=0;
    if(!dialog.open)dialog.showModal();
    if(panelShots[key])selectShot(panelShots[key]);
    else stage.dispatchEvent(new Event('posechange'));
    const actions=el('div',null,'record-list');
    try {
      if(['missions','story','skills','contact','archive','news'].includes(key)){
        const sourceKey={archive:'contact',news:'lobby'}[key]||key;
        body.setAttribute('aria-busy','true');
        const source=await dataFor(sourceKey);
        if(id!==revision)return;
        body.removeAttribute('aria-busy');
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
          actions.append(link(tr('Profile links','個人連結'),zh?'../links/?lang=zh':'links/'));body.append(actions);
        } else if(key==='news'){
          const sections=records(source);
          for(const section of sections)showRecord(section);
          if(!sections.length)body.append(el('p',tr('The rooftop lobby is open.','天台大廳已開放。')));
        } else {
          for(const section of records(source))showRecord(section);
          if(key==='story')body.append(action(tr('Explore my practice','了解創作實務'),()=>navigate('news')));
        }
      } else if(key==='scout'){
        stage.querySelectorAll('.shot-list button').forEach(b=>{
          const choice=action(b.textContent.trim(),()=>{selectShot(b.dataset.stance);navigate('lobby');});
          choice.setAttribute('aria-pressed',String(stage.dataset.pose===b.dataset.stance));actions.append(choice);
        });
        body.append(actions);
      } else {
        pause.hidden=false;body.append(pause);
        const locale=zh?'../':'zh-hk/';
        body.append(link(zh?'English':'繁體中文',locale+(files[entry]||'index.html')+'#settings'));
        body.append(el('p',tr('Character stand-in adapted from pixiv’s VRM1 Constraint Twist Sample.','角色替身改編自 pixiv 的 VRM1 Constraint Twist Sample。')));
      }
    }catch(error){
      if(id!==revision)return;
      body.removeAttribute('aria-busy');body.replaceChildren(el('p',tr('This file could not be loaded.','未能載入此檔案。')),action(tr('Retry','重試'),renderRoute));
      console.warn('Lobby record unavailable',error);
    }
  }
  window.addEventListener('hashchange',renderRoute);
  renderRoute();
})();