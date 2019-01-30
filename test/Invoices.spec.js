/* eslint-disable no-undef */
import {
  calcPricePerDay,
  calcCostByInvoices,
  calcAveragePricePerDay
} from '../assets/js/utils/expensesUtil'
import { diffDaysStr } from '../assets/js/utils/dateUtil'

const data = {
  invoices: [
    {
      type: 'GAS',
      from: '2017-11-21',
      to: '2018-01-18',
      price: '25.14',
      index: 0,
      pricePerDay: 0.43344827586206897
    },
    {
      type: 'LUZ',
      from: '2017-12-13',
      to: '2018-02-04',
      price: '148.29',
      index: 1,
      pricePerDay: 2.7979245283018868
    },
    {
      type: 'AGUA',
      from: '2017-10-20',
      to: '2018-01-18',
      price: '98.75',
      index: 2,
      pricePerDay: 1.0972222222222223
    }
  ],
  guests: [
    {
      name: 'Jesús',
      from: '2015-12-26',
      to: '2019-01-26',
      index: 0
    },
    {
      name: 'Yan',
      from: '2015-01-16',
      to: '2020-02-16',
      index: 1
    },
    {
      name: 'Johns',
      from: '2018-01-18',
      to: '2018-07-18',
      index: 2
    }
  ]
}

const results = {
  diffDaysStr: {
    // GAS [2017-11-21, 2018-01-18]
    0: 58,
    // LUZ [2017-12-13, 2018-02-04]
    1: 53,
    // AGUA [2017-10-20, 2018-01-18]
    2: 90
  },
  calcPricePerDay: {
    // GAS [2017-11-21, 2018-01-18] 25.14
    0: 0.433448276,
    // LUZ [2017-12-13, 2018-02-04] 148.29
    1: 2.797924528,
    // AGUA [2017-10-20, 2018-01-18] 98.75
    2: 1.097222222
  },
  calcCost: 272.18,
  calcAveragePricePerDay: 2.543738318
}

test('diffDaysStr', () => {
  for (let invoice of data.invoices) {
    // console.log('INVOICE', invoice)
    expect(diffDaysStr(invoice.from, invoice.to)).toBe(
      results.diffDaysStr[invoice.index]
    )
  }
})

test('calcPricePerDay', () => {
  for (let invoice of data.invoices) {
    // console.log('INVOICE', invoice)
    expect(calcPricePerDay(invoice).toFixed(6)).toBe(
      results.calcPricePerDay[invoice.index].toFixed(6)
    )
  }
})

test('Total costs for invoices = 941.08', () => {
  expect(calcCostByInvoices(data.invoices)).toBe(results.calcCost)
})

test('Average cost per day', () => {
  expect(calcAveragePricePerDay(data.invoices).toFixed(6)).toBe(
    results.calcAveragePricePerDay.toFixed(6)
  )
})
