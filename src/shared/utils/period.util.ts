export type PeriodPolicy = 'month' | 'week' | 'forever';

export function makePeriodKey(policy: PeriodPolicy = 'month', d = new Date()) {
  if (policy === 'forever') return 'forever';
  if (policy === 'week') {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = (date.getUTCDay() + 6) % 7; // 0..6 (Mon..Sun)
    date.setUTCDate(date.getUTCDate() - dayNum + 3);
    const firstThursday = new Date(Date.UTC(date.getUTCFullYear(), 0, 4));
    const week =
      1 +
      Math.round(
        ((date.getTime() - firstThursday.getTime()) / 86400000 -
          3 +
          ((firstThursday.getUTCDay() + 6) % 7)) /
          7,
      );
    return `${date.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
  }
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}
