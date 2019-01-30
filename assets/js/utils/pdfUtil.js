/**
 * Generate PDF content
 * @param {String} header 'Facturas'
 * @param {Array<String>} tableHeaders ['Tipo', 'Importe', ...]
 * @param {Array<Array<String>>} tableRows [['GAS', ...],['LUZ', ...], ...]
 * @param {String} tableFooter
 */
export function pdfTable (
  header,
  tableHeaders,
  tableRows,
  tableFooter,
  content
) {
  content = content || []

  // add header
  content.push({ text: header, style: 'header' })

  // add table rows
  let trs = []
  // add table header row
  let ths = []
  for (const th of tableHeaders) {
    ths.push({
      text: th, style: 'tableHeader', alignment: 'center', fillColor: '#00BBFF'})
  }
  trs.push(ths)
  // trs : [[{text:'Tipo'...},{text:'Importe'...}...]]

  trs = trs.concat(tableRows)
  // trs : [[{text:'Tipo'...},{text:'Importe'...}...], ['GAS', ...], ['LUZ', ...]]

  // add table footer row
  trs.push([
    {
      colSpan: tableHeaders.length,
      fillColor: '#D14141',
      text: tableFooter
    }
  ])
  // trs : [[{text:'Tipo'...},{text:'Importe'...}...], ['GAS', ...], ['LUZ', ...], [{ colSpan: 6, ...}]]

  // full width
  let widths = []
  for (let i = 0; i < tableHeaders.length; i++) {
    widths.push('*')
  }

  // add invoices table
  content.push({
    style: 'tableExample',
    table: {
      widths: widths,
      body: trs
    },
    layout: {
      fillColor: function (rowIndex, node, columnIndex) {
        return (rowIndex % 2 === 0) ? '#CCCCCC' : null
      }
    }
  })
  return content
}

export function pdfTableStyles () {
  // styles
  return {
    header: {
      fontSize: 24,
      bold: true,
      margin: [0, 10, 0, 10]
    },
    tableHeader: {
      bold: true,
      fontSize: 13,
      color: 'black'
    }
  }
}

export function pdfDefinition (content, styles) {
  styles = styles || pdfTableStyles()
  return {
    content: content,
    styles: styles
  }
}

export default {
  pdfTable,
  pdfTableStyles,
  pdfDefinition
}
