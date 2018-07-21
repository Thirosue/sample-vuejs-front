import encoding from 'encoding-japanese'

const createFile = async (name, mimeType, model, json) => {
  // 文字コード→SJIS、改行コード→CRLF、項目タイトルあり、BOM→無し
  const header = model.map(m => m.value)
  const headerKey = model.map(m => m.key)
  const body = []
  json.forEach(data => body.push(headerKey.map(key => data[key]).join(',')))
  const tmpfile = new Blob([header + "\r\n" + body.join('\r\n')], { type: mimeType });

  //SJIS変換
  const reader = new FileReader();
  reader.onload = (event) => {
    const codes = new Uint8Array(event.target.result)
    const codeArray = encoding.convert(codes, 'SJIS') //to SJIS
    const blob = new Blob([new Uint8Array(codeArray)], { type: mimeType })

    const a = document.createElement("a")
    a.download = name
    a.target = "_blank"
  
    if (window.navigator.msSaveBlob) {
      // for IE
      window.navigator.msSaveBlob(blob, name)
    } else if (window.URL && window.URL.createObjectURL) {
      // for Firefox
      a.href = window.URL.createObjectURL(blob)
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } else if (window.webkitURL && window.webkitURL.createObject) {
      // for Chrome
      a.href = window.webkitURL.createObjectURL(blob)
      a.click()
    }
  }
  reader.readAsArrayBuffer(tmpfile)
}

export default {
  createFile
}