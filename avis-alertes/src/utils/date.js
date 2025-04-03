export function parseDate(strDate, timezone = 'EDT') {
  if (typeof strDate !== 'string') {
      console.warn("Date received is not a string.");
      return strDate;
  }

  return new Date(`${strDate.trim()} ${timezone}`);
}

export function compareDate(date1, date2) {
  const d1 = parseDate(date1);
  const d2 = parseDate(date2);

  if (isNaN(d1) || isNaN(d2)) {
      throw new Error("Invalid date format");
  }

  if (d2 > d1) return 1;
  if (d2 < d1) return -1;

  return 0;
}

export function isWithin(target, start, end) {
  return compareDate(start, target) <= 0 && compareDate(target, end) <= 0;
}

export function isBefore(date1, date2) {
  return compareDate(date1, date2) <= 0;
}

export function isAfter(date1, date2) {
  return compareDate(date1, date2) >= 0;
}

const Days = {
  fr: ['Dimande', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
}

const Months = {
  fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
}

const formatDate = {
  fr: (d) => `${Days.fr[d.getDay()]} ${d.getDate()} ${Months.fr[d.getMonth()]} ${d.getFullYear()}`
}

export function toDateString(strDate, lang = 'fr') {
  const date = parseDate(strDate);
  return formatDate[lang](date);
}

export function toTimeString(strDate, lang = 'fr') {
  const date = parseDate(strDate);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours} h ${minutes < 10 ? '0' : ''}${minutes}`;
}