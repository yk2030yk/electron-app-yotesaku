export function isDefined(v) {
  return v !== undefined && v !== null
}

export function isUndefined(v) {
  return v === undefined || v === null
}

/* 正の整数かチェックします */
export function isPositiveInteger(v) {
  return Number.isInteger(v) && v >= 0
}

const STRINGS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&=~/*-+'
export function createRandomString(length = 8) {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += STRINGS.charAt(Math.floor(Math.random() * STRINGS.length))
  }
  return result
}

export function createUniqueId() {
  return (new Date()).getTime() + '-' + createRandomString()
}