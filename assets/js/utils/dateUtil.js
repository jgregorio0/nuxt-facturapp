import moment from 'moment'

export function formatTimeMillis (t) {
  return formatMoment(moment(t))
}

export function formatMoment (m) {
  return m.format('YYYY-MM-DD')
}

export function inputFmtDate (m) {
  return m.format('YYYY-MM-DD')
}

export function initDateFrom () {
  let m = moment().month(moment().month() - 1)
  return inputFmtDate(m)
}

export function initDateTo () {
  let m = moment()
  return inputFmtDate(m)
}

export function parseToMoment (dateStr) {
  return moment(dateStr)
}

/**
 * Calculate difference of days between two dates with string format
 * @param fromStr
 * @param toStr
 * @return {number}
 */
export function diffDaysStr (fromStr, toStr) {
  let from = parseToMoment(fromStr)
  let to = parseToMoment(toStr)
  return diffDaysMoment(from, to)
}

/**
 * Calculate difference of days between two timemillis
 * @param from {number}
 * @param to {number}
 * @return {number}
 */
export function diffDaysTime (from, to) {
  return diffDaysMoment(moment(from), moment(to))
}

/**
 * Calculate difference of days between two moments
 * @param from {Moment}
 * @param to {Moment}
 * @return {number}
 */
export function diffDaysMoment (from, to) {
  return to.diff(from, 'days')
}

/**
 * Minimum date from found in invoices array
 * @param invoices
 * @return {Moment}
 */
export function minFrom (invoices) {
  let froms = invoices.map((invoice) => {
    return parseToMoment(invoice.from)
  })
  console.log('froms: ' + froms)
  return moment.min(froms)
}

/**
 * Maximum date from found in invoices array
 * @param invoices
 * @return {String}
 */
export function minFromStr (invoices) {
  return formatMoment(minFrom(invoices))
}

/**
 * Maximum date from found in invoices array
 * @param invoices
 * @return {number|*|{type, default}}
 */
export function maxTo (invoices) {
  let tos = invoices.map((invoice) => {
    return parseToMoment(invoice.to)
  })
  console.log('tos: ' + tos)
  return moment.max(tos)
}

/**
 * Maximum date from found in invoices array
 * @param invoices
 * @return {String}
 */
export function maxToStr (invoices) {
  return formatMoment(maxTo(invoices))
}

/**
 * Maximum date from and maximum date to found in invoices array
 * @param invoices {Array<*>}
 * @return {minFrom: Moment, maxTo: Moment}
 */
export function minFromMaxTo (invoices) {
  let minFrom = null
  let maxTo = null
  for (let invoice of invoices) {
    minFrom = minFrom == null
      ? parseToMoment(invoice.from)
      : moment.min([minFrom, parseToMoment(invoice.from)])
    maxTo = maxTo == null
      ? parseToMoment(invoice.to)
      : moment.max([maxTo, parseToMoment(invoice.to)])
  }
  return {minFrom: minFrom, maxTo: maxTo}
}

/**
 * Generate array of each day between to dates
 * @param from {Moment}
 * @param to {Moment}
 * @return {Array<Moment>}
 */
export function arrayDaysMoment (from, to) {
  let days = []
  let day = from
  while (day.isBefore(to)) {
    days.push(day)
    day.add(1, 'd')
  }
  days.push(to)
  return days
}

/**
 * Check if [F1, T1] is between [F2, T2] range:
 * (F1 <= F2 && T1 >= F2) || (F1 >= F2 && F1 <= T2)
 * @param dateStrFrom1 {String}
 * @param dateStrTo1 {String}
 * @param dateStrFrom2 {String}
 * @param dateStrTo2 {String}
 * @return {boolean}
 */
export function isRangeDateStrIntersectingAtRangeDateStr (dateStrFrom1, dateStrTo1, dateStrFrom2, dateStrTo2) {
  let dateFrom1 = parseToMoment(dateStrFrom1).valueOf()
  let dateTo1 = parseToMoment(dateStrTo1).valueOf()
  let dateFrom2 = parseToMoment(dateStrFrom2).valueOf()
  let dateTo2 = parseToMoment(dateStrTo2).valueOf()
  return isRangeTimeIntersectingAtRangeTime(dateFrom1, dateTo1, dateFrom2, dateTo2)
}

/**
 * Check if [F1, T1] is between (F2, T2) range (exclusive):
 * (F1 <= F2 && T1 >= F2) || (F1 >= F2 && F1 < T2)
 * @param from1 {Number}
 * @param to1 {Number}
 * @param from2 {Number}
 * @param to2 {Number}
 * @return {boolean}
 */
export function isRangeTimeIntersectingAtRangeTime (from1, to1, from2, to2) {
  return (((from1 <= from2) && (to1 >= from2)) ||
    ((from1 >= from2) && (from1 < to2)))
}

/**
 * Check if D is between [F, T] range:
 * D >= F && D <= F
 * @param t {Number}
 * @param from {Number}
 * @param to {Number}
 * @return {boolean}
 */
export function isTimeBetweenRangeTime (t, from, to, inclusiveFrom, inclusiveTo) {
  return (inclusiveFrom ? t >= from : t > from) &&
    (inclusiveTo ? t <= to : t < to)
}
