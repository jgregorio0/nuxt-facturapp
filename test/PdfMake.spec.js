/* eslint-disable no-undef */
import { pdfTable, pdfDefinition } from '../assets/js/utils/pdfUtil'

const data = {
  content: [
    { text: 'Facturas', style: 'header' },
    {
      style: 'tableExample',
      table: {
        widths: ['*', '*'],
        body: [
          [
            {
              text: 'Tipo',
              style: 'tableHeader',
              alignment: 'center',
              fillColor: '#00BBFF'
            },
            {
              text: 'Importe',
              style: 'tableHeader',
              alignment: 'center',
              fillColor: '#00BBFF'
            }
          ],
          ['GAS', 100],
          ['LUZ', 125.2],
          [{ colSpan: 2, fillColor: '#D14141', text: 'Locura' }]
        ]
      },
      'layout': {}
    }
  ],
  styles: {
    header: {
      header: { fontSize: 24, bold: true, margin: [0, 0, 0, 10] },
      tableHeader: { bold: true, fontSize: 13, color: 'black' }
    }
  }
}

// pdf table only
test('generate pdf table content', () => {
  expect(
    pdfTable(
      'Facturas',
      ['Tipo', 'Importe'],
      [['GAS', 100], ['LUZ', 125.2]],
      'Locura',
      null
    )
  ).toBe(data.content)
})

test('generate pdf full content', () => {
  expect(
    pdfDefinition(
      pdfTable(
        'Facturas',
        ['Tipo', 'Importe'],
        [['GAS', 100], ['LUZ', 125.2]],
        'Locura',
        null
      )
    )
  ).toBe(data)
})
