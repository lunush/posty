export const getRelativeDate = (unformattedDate: number) => {
  const now = new Date();
  const date = new Date(unformattedDate);

  const secondsDiff = Math.round((date.getTime() - now.getTime()) / 1000);
  const minutesDiff = Math.round(secondsDiff / 60);
  const hoursDiff = Math.round(minutesDiff / 60);
  const daysDiff = Math.round(hoursDiff / 24);
  const weeksDiff = Math.round(daysDiff / 7);
  const monthsDiff = Math.round(daysDiff / 30);
  const yearsDiff = Math.round(daysDiff / 365);

  const rtf = new (Intl as any).RelativeTimeFormat('en', {
    localeMatcher: 'best fit',
    numeric: 'auto',
    style: 'long',
  });

  // Past
  if (yearsDiff <= -1) return rtf.format(yearsDiff, 'year');
  if (monthsDiff <= -1) return rtf.format(monthsDiff, 'month');
  if (weeksDiff <= -1) return rtf.format(weeksDiff, 'week');
  if (daysDiff <= -1) return rtf.format(daysDiff, 'day');
  if (hoursDiff <= -1) return rtf.format(hoursDiff, 'hour');
  if (minutesDiff <= -1) return rtf.format(minutesDiff, 'minute');
  if (secondsDiff <= -1) return rtf.format(secondsDiff, 'second');

  // Future
  if (yearsDiff >= 1) return rtf.format(yearsDiff, 'year');
  if (monthsDiff >= 1) return rtf.format(monthsDiff, 'month');
  if (weeksDiff >= 1) return rtf.format(weeksDiff, 'week');
  if (daysDiff >= 1) return rtf.format(daysDiff, 'day');
  if (hoursDiff >= 1) return rtf.format(hoursDiff, 'hour');
  if (minutesDiff >= 1) return rtf.format(minutesDiff, 'minute');
  return rtf.format(secondsDiff, 'second');
};
