import { progress, records, recordTotals } from './training.js';

const find = selector => document.querySelector(selector);
const number = value => value.toLocaleString('en-US');
const inventory = [12, 8, 4, 2];
const selected = [0, 0, 0, 0];
let experience = 0;
let balance = 12000;

// Lyfe – Wednesday, GrowupID 1003.
const attributes = {
  'Max HP': [1344,1523,1703,1885,2067,2251,2436,2623,2810,2999,3189,3380,3572,3765,3960,4156,4353,4551,4751,4951],
  ATK: [104,117,130,142,155,168,181,195,208,221,234,248,261,275,289,303,317,330,345,359],
  DEF: [52,59,66,73,80,88,95,102,109,116,124,131,139,146,154,161,169,177,184,192]
};

const recordButtons = records.map((record, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'record';
  button.style.setProperty('--quality', record.color);
  button.innerHTML = `<img alt="" src="assets/record-${index}.webp"><small>${record.name}</small><b></b>`;
  button.addEventListener('click', () => {
    selected[index]++;
    find('#training-result').textContent = '';
    updateTraining();
  });
  find('#records').append(button);
  return button;
});

function updateTraining() {
  const current = progress(experience);
  const totals = recordTotals(selected);
  const preview = progress(experience + totals.exp);
  const expBar = find('#exp-bar');
  expBar.max = preview.next || 1;
  expBar.value = preview.next ? preview.exp : 1;
  find('#rank').textContent = current.level;
  find('#projected').textContent = preview.level > current.level ? '→ Lv. ' + preview.level : '';
  find('#exp-value').textContent = preview.next ? number(preview.exp) + ' / ' + number(preview.next) : 'MAX';
  find('#stats').innerHTML = Object.entries(attributes).map(([name, values]) => {
    const gain = values[preview.level - 1] - values[current.level - 1];
    return `<div><dt>${name}</dt><dd>${number(values[current.level - 1])}${gain ? '<em>+' + number(gain) + '</em>' : ''}</dd></div>`;
  }).join('');
  recordButtons.forEach((button, i) => {
    const remaining = inventory[i] - selected[i];
    const record = records[i];
    button.disabled = !remaining || !preview.next || totals.cost + record.cost > balance;
    button.setAttribute('aria-pressed', String(selected[i] > 0));
    button.setAttribute('aria-label', `${record.name} Combat Record, ${number(record.exp)} EXP, ${remaining} available, ${selected[i]} selected`);
    button.title = `${record.name} Combat Record · ${number(record.exp)} EXP · ${number(record.cost)} Silverbuck`;
    button.querySelector('b').textContent = selected[i] ? selected[i] + ' / ' + inventory[i] : '×' + inventory[i];
  });
  document.querySelectorAll('[data-balance]').forEach(el => el.textContent = number(balance));
  find('#cost').textContent = number(totals.cost);
  find('#clear-records').disabled = find('#train').disabled = !totals.exp;
}
find('#clear-records').addEventListener('click', () => {
  selected.fill(0);
  updateTraining();
});
find('#train').addEventListener('click', () => {
  const totals = recordTotals(selected);
  if (!totals.exp) return;
  experience += totals.exp;
  balance -= totals.cost;
  selected.forEach((count, i) => inventory[i] -= count);
  selected.fill(0);
  updateTraining();
  const level = progress(experience).level;
  find('#training-result').textContent = level === 20 ? 'Level cap reached · Lv. 20' : `Training complete · Lv. ${level}`;
});

const abilities = [
  ["Raven’s Command", 'Lyfe deploys two more Ravens. The drones launch missiles that deal Electrical DMG.', 'Increases the continuous Ballistic DMG of Ravens.'],
  ['Gungnir', 'Lyfe calls down Thunder of Judgment, dealing Electrical DMG and paralyzing targets in the area.', 'Reduces the cooldown of Gungnir.'],
  ['From a Windy Tree', 'Lyfe throws Gungnir and creates a Realm of Nine Nights that calls down lightning.', 'Increases Thunder of Judgment DMG inside the Realm of Nine Nights.']
];
// Left and right branches follow the six PanelNode slots in uw_nerve_main.
const branches = [
  [0, 'Special', 18, 24.2], [0, 'Special', 18, 50], [1, 'Energy', 22, 76.3],
  [1, 'Range', 79.5, 24.2], [2, 'Duration', 78, 50], [2, 'Enhance', 75, 76.3]
];
const clusters = branches.map(([skill, type, x, y], index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'cluster';
  button.style.setProperty('--x', x + '%');
  button.style.setProperty('--y', y + '%');
  button.innerHTML = `<img alt="" src="assets/skill-${skill}.webp"><span>${type}</span>`;
  button.setAttribute('aria-label', 'Cluster ' + (index + 1) + ', ' + abilities[skill][0] + ', ' + type);
  button.addEventListener('click', () => selectCluster(index));
  find('#clusters').append(button);
  return button;
});
function selectCluster(index) {
  const [skill, type] = branches[index];
  const [name, description, effect] = abilities[skill];
  clusters.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  find('.skill-type').textContent = 'Cluster ' + (index + 1) + ' · ' + type;
  find('.skill-info h2').textContent = name;
  find('.skill-info p').textContent = description;
  find('.skill-info h3').textContent = 'Node 3 · Skill level +1';
  find('.skill-info .effect').textContent = effect;
}

function showView(moveFocus = false) {
  const hash = location.hash.slice(1);
  const view = ['level','skills'].includes(hash) ? hash : 'lobby';
  document.body.dataset.view = view;
  find('#lobby').hidden = view !== 'lobby';
  find('#operative').hidden = view === 'lobby';
  find('#level').hidden = view !== 'level';
  find('#skills').hidden = view !== 'skills';
  document.querySelectorAll('.mode-nav a').forEach(link => {
    if (link.hash === '#' + view) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  if (moveFocus) {
    const next = view === 'lobby' ? find('#open-operative') : find('.mode-nav [aria-current]');
    next.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
}
window.addEventListener('hashchange', () => showView(true));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.body.dataset.view !== 'lobby') location.hash = 'lobby';
});
selectCluster(0);
updateTraining();
showView();
