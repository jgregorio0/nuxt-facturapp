import Jspdf from 'jspdf'
import autotable from 'jspdf-autotable'
/* import html2canvas from 'html2canvas' */

/**
 * Initialize JS PDF object
 * @param orientiation orientation {String/Object} Orientation of the first page.
 * Possible values are "portrait" or "landscape" (or shortcuts "p" (Default), "l"). Can also be an options object.
 * @param unit {String}  Measurement unit to be used when coordinates are specified.
 * Possible values are "pt" (points), "mm" (Default), "cm", "in" or "px".
 * @param format {String/Array} The format of the first page.
 * Can be [a0, a10], [b0, b10], [c0, c10], dl, letter, government-letter, legal, junior-legal, ledger, tabloid, credit-card
 * Default is "a4". If you want to use your own format just pass instead of one of the above predefined formats
 * the size as an number-array , e.g. [595.28, 841.89]
 * @return {Jspdf}
 */
export function initPDF (orientiation, unit, format) {
  // orientation Possible values are "portrait" or "landscape" (or shortcuts "p" (Default), "l")
  // , unit, format
  return new Jspdf('p', 'mm', 'a4')
}

/**
 * Initializa PDF a4 portrait using milimeter units
 */
export function initPDFa4 () {
  // orientation portrait p
  // unit milimeter mm
  // format a4
  return this.initPDF('p', 'mm', 'a4')
}

/*
/!**
 * Find current HTML element by id "getElementById", transform to canvas by html2canvas and add to PDF.
 * If lastElement then save/download pdf
 * @param elementId Id of HTML element in document
 * @param pdf {Jspdf} JS PDF object initialized
 * @param pdfName {String} PDF file name. Only required for the last element to trigger save/download
 * @param counter {Int} counter in case
 *!/
export function addElementAsCanvasImage (elementId, pdf, pdfName) {
  html2canvas(document.getElementById(elementId))
    .then(function (canvas) {
      // let pdf = new Jspdf('p', 'mm', 'a4')
      let wPdf = pdf.internal.pageSize.width
      let xMargin = 15
      let yMargin = 2

      // create image
      let image = canvas.toDataURL('image/jpeg,1.0')

      // Adjust width and height to pdf size
      let wCanvas = (canvas.width * 20) / 240
      let hCanvas = (canvas.height * 20) / 240

      let wImg = wPdf - (xMargin * 2)
      let hImg = hCanvas * (wImg / wCanvas)

//            imageData, format, x, y, w, h, alias, compression, rotation
      pdf.addImage(image, 'JPEG', xMargin, yMargin, wImg, hImg)
      download(pdf, pdfName)
    })
}
*/

/**
 * Save pdf execute download
 * @param pdf
 * @param pdfName
 */
export function download (pdf, pdfName) {
  pdf.save(pdfName)
}

/*
 export function generatePDFCanvasImg (elementId, pdfName) {
  let pdf = this.initPDFa4()
  addElementAsCanvasImage(elementId, pdf, pdfName)
}
*/

export function addTable (doc, table) {
  let y = doc.autoTable.previous ? doc.autoTable.previous.finalY : 0
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)

  if (table.title) {
    // title
    doc.setFontSize(22)
    doc.text(table.title, 50, y + 50)
    doc.setFontSize(12)
  }

  // table
  doc.autoTable(table.header, table.body, {
    startY: y + 60
  })

  if (table.footer) {
    y = doc.autoTable.previous ? doc.autoTable.previous.finalY : 0
    doc.setFontSize(18)
    doc.setTextColor(255, 0, 0)
    doc.text(table.footer, 50, y + 20)
  }
}

export function generatePDFTable (table, pdfName) {
  // Only pt supported (not mm or in)
  var doc = new Jspdf('p', 'pt')

  addTable(doc, table)

  doc.save(pdfName)
}

export function generatePDFTables (tables, pdfName) {
  // Only pt supported (not mm or in)
  var doc = new Jspdf('p', 'pt')

  for (let table of tables) {
    addTable(doc, table)
  }

  doc.save(pdfName)
}
