export function compareTime(from, to) {
  return new Date (`1999/01/01 ${to}`) >= new Date (`1999/01/01 ${from}`)
}

export function paddingTime(time, fix) {
  return parseFloat(time).toFixed(fix)
}