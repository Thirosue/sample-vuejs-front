import {TextEncoder} from 'text-encoding'

const createFile = (name, mimeType, model, json) => {
  // 文字コード→SJIS、改行コード→CRLF、項目タイトルあり、BOM→無し
  const header = model.map(m => m.value)
  const headerKey = model.map(m => m.key)
  const body = []
  json.forEach(data => body.push(headerKey.map(key => data[key]).join(',')));
  const data = header + "\r\n" + body.join('\r\n')

  const blob = new Blob([new TextEncoder("sjis", {NONSTANDARD_allowLegacyEncoding:true}).encode(data)], { type: mimeType })  //to SJIS
  const a = document.createElement("a");
  a.download = name;
  a.target = "_blank";

  if (window.navigator.msSaveBlob) {
    // for IE
    window.navigator.msSaveBlob(blob, name);
  } else if (window.URL && window.URL.createObjectURL) {
    // for Firefox
    a.href = window.URL.createObjectURL(blob);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else if (window.webkitURL && window.webkitURL.createObject) {
    // for Chrome
    a.href = window.webkitURL.createObjectURL(blob);
    a.click();
  } else {
    // for Safari
    window.open(
      "data:" + mimeType + ";base64," + window.Base64.encode(body),
      "_blank"
    );
  }
}

export default {
  createFile
}