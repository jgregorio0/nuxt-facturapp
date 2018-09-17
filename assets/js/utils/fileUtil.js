export function download (filename, json) {
  let element = document.createElement('a')

  let text = JSON.stringify(json)
  element.setAttribute('href',
    'data:application/json;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

export function readFile (file, encoding, callback) {
  // instantiate file reader
  var reader = new FileReader()
  reader.onload = (e) => {
    // execute callback function
    callback(reader.result)
  }

  // read file
  reader.readAsText(file, encoding)
}
