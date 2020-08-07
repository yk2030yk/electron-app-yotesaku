export function isHoliday(date) {
  const day = date.getDay()
  return day === 0 || day === 6
}

export function isToday(date) {
  const t = getToday()
  return isSameYear(t, date) && isSameMonth(t, date) && isSameDate(t, date)
}

export function isSameYear(dateA, dateB) {
  return dateA.getFullYear() === dateB.getFullYear()
}

export function isSameMonth(dateA, dateB) {
  return dateA.getMonth() === dateB.getMonth()
}

export function isSameDate(dateA, dateB) {
  return dateA.getDate() === dateB.getDate()
}

export function getToday() {
  return new Date()
}

export function getYearOfToday() {
  return getToday().getFullYear()
}

export function getMonthOfToday() {
  return getToday().getMonth() + 1
}

export function getDateOfToday() {
  return getToday().getDate()
}

export function getFirstDate(y , m) {
  return new Date(y, m - 1, 1)
}

export function getLastDate(y, m) {
  return new Date(y, m, 0)
}