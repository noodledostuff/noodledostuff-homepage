// Snowbreak 1.8, Settings/item/upgrade_exp.txt, CardNeedExp through the first level cap.
const levelCosts = [400,600,800,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300,2400,2500];
export const records = [
  { name: 'Beginner', exp: 600, cost: 150, color: '#a2abb3' },
  { name: 'Normal', exp: 1200, cost: 300, color: '#6ca181' },
  { name: 'Good', exp: 3000, cost: 750, color: '#709caf' },
  { name: 'Elite', exp: 9000, cost: 2250, color: '#a378b0' }
];
export function progress(total) {
  let level = 1;
  for (const cost of levelCosts) {
    if (total < cost) return { level, exp: total, next: cost };
    total -= cost;
    level++;
  }
  return { level, exp: 0, next: 0 };
}
export function recordTotals(selected) {
  return selected.reduce((sum, count, i) => ({
    exp: sum.exp + records[i].exp * count,
    cost: sum.cost + records[i].cost * count
  }), { exp: 0, cost: 0 });
}
