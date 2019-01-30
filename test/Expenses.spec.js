/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {
  calcCostByGuestAndInvoice,
  calcNumGuestsIntoInvoiceTimeRange,
  calcCostByGuest,
  calcCostByInvoices,
  isGuestBetweenInvoiceRange,
  expensesPeriods,
  calcNumGuestsBetweenRangeTime
} from '../assets/js/utils/expensesUtil'

import {
  parseToMoment,
  diffDaysStr,
  diffDaysMoment,
  diffDaysTime,
  isRangeDateStrIntersectingAtRangeDateStr,
  isRangeTimeIntersectingAtRangeTime,
  isTimeBetweenRangeTime
} from '../assets/js/utils/dateUtil'

const data = {
  invoices: [
    {
      type: 'GAS',
      from: '2018-05-29',
      to: '2018-07-29',
      price: '68.96',
      index: 0,
      pricePerDay: 1.1304918032786884
    },
    {
      type: 'GAS',
      from: '2018-07-29',
      to: '2018-09-29',
      price: '60.84',
      index: 1,
      pricePerDay: 0.9812903225806452
    },
    {
      type: 'LUZ',
      from: '2018-05-30',
      to: '2018-07-30',
      price: '104.53',
      index: 2,
      pricePerDay: 1.7136065573770491
    },
    {
      type: 'LUZ',
      from: '2018-07-30',
      to: '2018-09-30',
      price: '95.46',
      index: 3,
      pricePerDay: 1.5396774193548386
    },
    {
      type: 'AGUA',
      from: '2018-05-31',
      to: '2018-07-31',
      price: '60.13',
      index: 4,
      pricePerDay: 0.9857377049180328
    },
    {
      type: 'AGUA',
      from: '2018-07-31',
      to: '2018-09-30',
      price: '56.45',
      index: 5,
      pricePerDay: 0.9254098360655738
    }
  ],
  guests: [
    { name: 'Jesús', from: '2016-12-26', to: '2019-07-20', index: 0 },
    { name: 'Juan', from: '2018-01-18', to: '2018-07-30', index: 1 },
    { name: 'Julia', from: '2018-07-31', to: '2019-07-20', index: 2 }
  ]
}

const results = {
  calcNumGuestsIntoInvoiceTimeRange: {
    // 'GAS', 'from': '2018-05-29', 'to': '2018-07-29
    0: 2,
    // 'GAS', 'from': '2018-07-29', 'to': '2018-09-29'
    1: 3,
    // 'LUZ', 'from': '2018-05-30', 'to': '2018-07-30'
    2: 2,
    // 'LUZ', 'from': '2018-07-30', 'to': '2018-09-30'
    3: 3,
    // 'AGUA', 'from': '2018-05-31', 'to': '2018-07-31'
    4: 2,
    // 'AGUA', 'from': '2018-07-31', 'to': '2018-09-30'
    5: 2
  },
  calcCostByGuestAndInvoice: {
    // Jesús
    0: {
      // 'GAS', 'from': '2018-05-29', 'to': '2018-07-29
      0: 34.48,
      // 'GAS', 'from': '2018-07-29', 'to': '2018-09-29'
      1: 30.42,
      // 'LUZ', 'from': '2018-05-30', 'to': '2018-07-30'
      2: 52.265,
      // 'LUZ', 'from': '2018-07-30', 'to': '2018-09-30'
      3: 47.73,
      // 'AGUA', 'from': '2018-05-31', 'to': '2018-07-31'
      4: 30.065,
      // 'AGUA', 'from': '2018-07-31', 'to': '2018-09-30'
      5: 28.225
    },
    // Juan
    1: {
      // 'GAS', 'from': '2018-05-29', 'to': '2018-07-29
      0: 34.48,
      // 'GAS', 'from': '2018-07-29', 'to': '2018-09-29'
      1: 0.981290322580645,
      // 'LUZ', 'from': '2018-05-30', 'to': '2018-07-30'
      2: 52.265,
      // 'LUZ', 'from': '2018-07-30', 'to': '2018-09-30'
      3: 0.76983870968,
      // 'AGUA', 'from': '2018-05-31', 'to': '2018-07-31'
      4: 30.065,
      // 'AGUA', 'from': '2018-07-31', 'to': '2018-09-30'
      5: 0
    },
    // Julia
    2: {
      // 'GAS', 'from': '2018-05-29', 'to': '2018-07-29
      0: 0,
      // 'GAS', 'from': '2018-07-29', 'to': '2018-09-29'
      1: 29.4387096774194,
      // 'LUZ', 'from': '2018-05-30', 'to': '2018-07-30'
      2: 0,
      // 'LUZ', 'from': '2018-07-30', 'to': '2018-09-30'
      3: 46.9601612903226,
      // 'AGUA', 'from': '2018-05-31', 'to': '2018-07-31'
      4: 0,
      // 'AGUA', 'from': '2018-07-31', 'to': '2018-09-30'
      5: 28.225
    }
  },
  calcTotalCost: {
    // Jesús
    0: 223.185,
    // Juan
    1: 118.561129032258,
    // Julia
    2: 104.623870967742
  }
}

test('Por cada factura devuelve el numero de huespedes que deben pagar', () => {
  for (let invoice of data.invoices) {
    console.log(invoice)
    expect(calcNumGuestsIntoInvoiceTimeRange(invoice, data.guests)).toBe(
      results.calcNumGuestsIntoInvoiceTimeRange[invoice.index]
    )
  }
})

test('Calcula el precio por huesped y factura', () => {
  for (let guest of data.guests) {
    for (let invoice of data.invoices) {
      expect(
        calcCostByGuestAndInvoice(guest, invoice, data.guests).toFixed(6)
      ).toBe(
        results.calcCostByGuestAndInvoice[guest.index][invoice.index].toFixed(6)
      )
    }
  }
})

test('Comprueba que el gasto por separado es el total de las facturas', () => {
  // his.sumCalcCostByGuest
  let sumCostsByGuest = 0
  for (let guest of data.guests) {
    sumCostsByGuest += calcCostByGuest(guest, data.invoices, data.guests)
  }
  // this.sumCalcCostByInvoices
  let sumAllInvoices = calcCostByInvoices(data.invoices)
  expect(sumCostsByGuest.toFixed(6)).toBe(sumAllInvoices.toFixed(6))
})
