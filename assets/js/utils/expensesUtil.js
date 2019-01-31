import moment from 'moment'
import {
  parseToMoment,
  diffDaysStr,
  diffDaysMoment,
  diffDaysTime,
  isRangeDateStrIntersectingAtRangeDateStr,
  isRangeTimeIntersectingAtRangeTime,
  isTimeBetweenRangeTime
} from './dateUtil'

/**
 * Calculate average of price per day for all invoices:
 * addAll(prices) / days(max(to) - min(from))
 * @param invoices
 * @return {number}
 */
export function calcAveragePricePerDay (invoices) {
  if (invoices === undefined || invoices === null || invoices.length === 0) {
    throw Error('invoices must not be null or empty')
  }

  let totalPrice = 0
  let minMoment = null
  let maxMoment = null
  for (let invoice of invoices) {
    totalPrice += Number(invoice.price)
    minMoment = minMoment == null
      ? parseToMoment(invoice.from)
      : moment.min([minMoment, parseToMoment(invoice.from)])
    maxMoment = maxMoment == null
      ? parseToMoment(invoice.to)
      : moment.max([maxMoment, parseToMoment(invoice.to)])
  }

  return totalPrice / diffDaysMoment(minMoment, maxMoment)
}

/**
 * Sum all invoices prices
 * @param invoices
 * @return {number}
 */
export function sumPrices (invoices) {
  let sum = 0
  for (let invoice of invoices) {
    sum += Number(invoice.price)
  }
  return sum
}

/**
 * Calculate price / day for invoice
 * @param invoice
 * @return {number}
 */
export function calcPricePerDay (invoice) {
  if (invoice === undefined || invoice === null) {
    throw Error('invoice must not be null')
  }

  return Number(invoice.price) / diffDaysStr(invoice.from, invoice.to)
}

/**
 * Calculate total cost of all invoices
 * @param invoices
 * @return {number}
 */
export function calcCostByInvoices (invoices) {
  if (invoices === undefined || invoices === null || invoices.length === 0) {
    throw Error('invoices must not be null or empty')
  }

  let total = 0
  for (let invoice of invoices) {
    let cost = Number(invoice.price)
    if (cost > 0) {
      total += cost
    }
  }
  return total
}

/**
 * Calculate total cost for all guests and invoices
 * @param guests {Array}
 * @param invoices {Array}
 * @return {number}
 */
export function calcCostByAllGuests (guests, invoices) {
  if (invoices === undefined || invoices === null || invoices.length === 0) {
    throw Error('invoices must not be null or empty')
  }
  if (guests === undefined || guests === null || guests.length === 0) {
    throw Error('guests must not be null or empty')
  }

  let cost = 0
  for (let guest of guests) {
    cost += calcCostByGuest(guest, invoices, guests)
  }
  return cost
}

/**
 * Calculate the cost per guest by sum each invoice cost
 * @param guest
 * @param invoice
 * @param guests
 * @return {number}
 */
export function calcCostByGuest (guest, invoices, guests) {
  if (invoices === undefined || invoices === null || invoices.length === 0) {
    throw Error('invoices must not be null or empty')
  }
  if (guests === undefined || guests === null || guests.length === 0) {
    throw Error('guests must not be null or empty')
  }
  if (guest === undefined || guest === null) {
    throw Error('guest must not be null')
  }

  let total = 0
  for (let invoice of invoices) {
    let cost = calcCostByGuestAndInvoice(guest, invoice, guests)
    if (cost > 0) {
      total += cost
    }
  }
  return total
}

/**
 * Calculate the cost per guest by (invoicePriceByDay * guestDaysIntoInvoiceTimeRange) / numGuestsIntoInvoiceTimeRange
 * @param guest
 * @param invoice
 * @param guests
 * @return {number}
 */
export function calcCostByGuestAndInvoice (guest, invoice, guests) {
  if (guest === undefined || guest === null) {
    throw Error('guest must not be null')
  }
  if (invoice === undefined || invoice === null) {
    throw Error('invoice must not be null')
  }
  if (guests === undefined || guests === null || guests.length === 0) {
    throw Error('guests must not be null or empty')
  }

  let cost = 0
  if (isGuestBetweenInvoiceRange(guest, invoice)) {
    // days to take into account
    let timemillis = daysSortedBetweenInvoiceRange(invoice, guests)

    // for each time range calculate cost = pricePerDay * days / num guests
    for (let i = 0; i + 1 < timemillis.length; i++) {
      let timeFrom = timemillis[i]
      let timeTo = timemillis[i + 1]

      // If guest stay into this period
      if (isRangeTimeIntersectingAtRangeTime(
        parseToMoment(guest.from).valueOf(),
        parseToMoment(guest.to).valueOf(),
        timeFrom,
        timeTo
      )) {
        let guestDaysIntoInvoiceTimeRange = diffDaysTime(timeFrom, timeTo)
        let numGuestsIntoInvoiceTimeRange = calcNumGuestsBetweenRangeTime(guests, timeFrom, timeTo)
        cost += (invoice.pricePerDay * guestDaysIntoInvoiceTimeRange) / numGuestsIntoInvoiceTimeRange
      }
    }
  }
  return cost
}

/**
 * Guest is between invoice time range if:
 * (GF <= IF && GT >= IF) || (GF >= IF && GF <= IT)
 * @param guest
 * @param invoice
 * @returns {boolean}
 */
export function isGuestBetweenInvoiceRange (guest, invoice) {
  if (guest === undefined || guest === null) {
    throw Error('guest must not be null')
  }
  if (invoice === undefined || invoice === null) {
    throw Error('invoice must not be null')
  }
  return isRangeDateStrIntersectingAtRangeDateStr(guest.from, guest.to, invoice.from, invoice.to)
}

/**
 * Guest is between invoice time range if:
 * (GF <= IF && GT >= IF) || (GF >= IF && GF <= IT)
 * @param guest
 * @param invoice
 * @returns {boolean}
 */
export function isGuestBetweenRangeDateStr (guest, fromStr, toStr) {
  if (guest === undefined || guest === null) {
    throw Error('guest must not be null')
  }

  return isRangeDateStrIntersectingAtRangeDateStr(guest.from, guest.to, fromStr, toStr)
}

/**
 * Calculate days of guest into invoice time range by:
 *  diffDays(max(GF, IF), min(GT, IT))
 * @param guest
 * @param invoice
 * @returns {number}
 */
export function calcGuestDaysIntoInvoiceTimeRange (guest, invoice) {
  if (guest === undefined || guest === null) {
    throw Error('guest must not be null')
  }
  if (invoice === undefined || invoice === null) {
    throw Error('invoice must not be null')
  }

  let guestFrom = parseToMoment(guest.from)
  let invFrom = parseToMoment(invoice.from)
  let from = moment.max([guestFrom, invFrom])

  let guestTo = parseToMoment(guest.to)
  let invTo = parseToMoment(invoice.to)
  let to = moment.min([guestTo, invTo])

  return diffDaysMoment(from, to)
}

/**
 * Calculate number of guests into invoice time range
 * @param invoice
 * @param guests
 * @returns {number}
 */
export function calcNumGuestsIntoInvoiceTimeRange (invoice, guests) {
  if (invoice === undefined || invoice === null) {
    throw Error('invoice must not be null')
  }
  if (guests === undefined || guests === null || guests.length === 0) {
    throw Error('guests must not be null or empty')
  }

  let total = 0
  for (let guest of guests) {
    if (isGuestBetweenInvoiceRange(guest, invoice)) {
      total++
    }
  }
  return total
}

/**
 * Calculate number of guests between time range
 * @param guests
 * @param from
 * @param to
 * @return {number}
 */
export function calcNumGuestsBetweenRangeTime (guests, from, to) {
  if (guests === undefined || guests === null || guests.length === 0) {
    throw Error('guests must not be null or empty')
  }
  if (Number.isNaN(from)) {
    throw Error('from must be number')
  }
  if (Number.isNaN(to)) {
    throw Error('to must be number')
  }

  let total = 0
  for (let guest of guests) {
    if (isRangeTimeIntersectingAtRangeTime(
      parseToMoment(guest.from).valueOf(), parseToMoment(guest.to).valueOf(), from, to)) {
      total++
    }
  }
  return total
}

/**
 * Return days array sorted
 * @param invoices
 * @return {Array.<Number>}
 */
export function daysSorted (invoices) {
  if (invoices === undefined || invoices === null || invoices.length === 0) {
    throw Error('invoices must not be null or empty')
  }

  let timemillis = new Set()

  for (let invoice of invoices) {
    timemillis.add(parseToMoment(invoice.from).valueOf())
    timemillis.add(parseToMoment(invoice.to).valueOf())
  }

  // turn set into sorted array
  const sortedTimeMillis = Array.from(timemillis).sort((a, b) => {
    return a - b
  })
  return sortedTimeMillis
}

/**
 * Return timemillis array sorted between invoice dates range
 * @param invoices
 * @return {Array.<Number>}
 */
export function daysSortedBetweenInvoiceRange (invoice, guests) {
  if (invoice === undefined || invoice === null) {
    throw Error('invoice must not be null')
  }
  if (guests === undefined || guests === null || guests.length === 0) {
    throw Error('guests must not be null or empty')
  }

  let timemillis = daysSorted([invoice].concat(guests))
    .filter((time) => {
      return isTimeBetweenRangeTime(
        time,
        parseToMoment(invoice.from).valueOf(),
        parseToMoment(invoice.to).valueOf(),
        true, true)
    })

  return timemillis
}

/**
 * Sum price per day and type into json
 * @param sum {*}
 * @param type {String}
 * @param day {Number}
 * @param pricePerDay {Number}
 */
export function sumPriceByDayAndType (sum, type, day, pricePerDay) {
  // console.log('sumPriceByDayAndType', sum, type, day, pricePerDay)
  if (!type) {
    throw new Error('type must not be empty')
  }
  if (!(Number(day) > 0)) {
    throw new Error('day milliseconds must be bigger than 0')
  }
  if (!(Number(pricePerDay) >= 0)) {
    throw new Error('pricePerDay must be bigger or equal than 0')
  }

  sum = sum || {}
  sum[type] = sum[type] || {}
  sum[type][day] = sum[type][day] || 0
  sum[type][day] = sum[type][day] + pricePerDay
}

/**
 * Sum price per day for all and each type and considered days
 * @param invoices {Array<*>}
 * @param days {Array<Number>}
 */
export function sumPricePerDayForAllAndTypes (invoices, days) {
  // console.log('sumPricePerDayForAllAndTypes', invoices, days)
  if (invoices === undefined || invoices === null || invoices.length === 0) {
    throw Error('invoices must not be empty')
  }
  if (days === undefined || days === null || days.length === 0) {
    throw Error('days must not be empty')
  }

  // initialize dataset for sum all types
  let sum = {}
  sum.all = {}

  // obtain days to take into account
  // let days = this.timeArrayDaysInvoicesSorted;

  // for each invoice add price per day
  for (let invoice of invoices) {
    // console.log('for invoice', invoice)

    // initialize dataset for type
    // sum[invoice.type] = sum[invoice.type] || {}

    // for each day to take into account sum price per day of invoice
    for (let day of days) {
      // day from and to converted to milliseconds
      let from = parseToMoment(invoice.from).valueOf()
      let to = parseToMoment(invoice.to).valueOf()

      // if day is between [from, to] invoice range
      if (isTimeBetweenRangeTime(day, from, to, true, false)) {
        /* // console.log('isTimeBetweenRangeTime', day, from, to)
         // console.log('isTimeBetweenRangeTime',
         formatTimeMillis(day), "[" + formatTimeMillis(from), formatTimeMillis(to) + ")") */

        // sum to all
        sumPriceByDayAndType(sum, 'all', day, invoice.pricePerDay)
        // console.log('sum all', day, invoice.pricePerDay)
        // sum to type
        sumPriceByDayAndType(sum, invoice.type, day, invoice.pricePerDay)
        // console.log('sum all', day, invoice.pricePerDay)
      } else {
        // init day dataset to 0
        sumPriceByDayAndType(sum, 'all', day, 0)
        sumPriceByDayAndType(sum, invoice.type, day, 0)
      }
    }
  }

  return sum
}

/**
 * Validate array is not undefined, null or empty
 * @param array {Array}
 * @return {boolean}
 */
export function validateArray (array) {
  return array !== undefined &&
    array !== null &&
    array.length !== 0
}

/**
 * Validate array is not undefined, null or empty
 * @param array {Array}
 * @return {boolean}
 */
export function validateObject (obj) {
  return obj !== undefined &&
    obj !== null
}


/**
 * Update index param from
 * @param list
 * @param rmIndex
 */
export function updateIndexes (list, rmIndex) {
  if (list[rmIndex] === undefined) {
    return
  }

  list[rmIndex].index = rmIndex
  updateIndexes(list, rmIndex + 1)
}
