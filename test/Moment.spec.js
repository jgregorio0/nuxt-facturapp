/* eslint-disable no-undef */
import moment from 'moment'
import { minFromStr, maxToStr } from '../assets/js/utils/dateUtil'

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
    },
    {
      type: 'LUZ',
      from: '2018-02-04',
      to: '2018-04-04',
      price: '130.86',
      index: 3,
      pricePerDay: 2.2179661016949157
    },
    {
      type: 'GAS',
      from: '2018-01-18',
      to: '2018-03-20',
      price: '66.74',
      index: 4,
      pricePerDay: 1.0940983606557375
    },
    {
      type: 'AGUA',
      from: '2018-01-18',
      to: '2018-04-20',
      price: '160.65',
      index: 5,
      pricePerDay: 1.746195652173913
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

test('Moment date diff', () => {
  /* let from = parseToMoment(fromStr)
  let to = parseToMoment(toStr)
  return diffDaysMoment(from, to) */

  let fromStr = '2017-10-20'
  let toStr = '2018-01-18'

  let fromMom = moment(fromStr)
  let toMom = moment(toStr)

  expect(toMom.diff(fromMom, 'days')).toBe(90)
})

test('Minimun from value of invoices', () => {
  let minFrom = minFromStr(data.invoices)
  expect(minFrom).toBe('2017-10-20')
})

test('Maximun to value of invoices', () => {
  let maxTo = maxToStr(data.invoices)
  expect(maxTo).toBe('2018-04-20')
})
