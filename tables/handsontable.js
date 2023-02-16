// https://codesandbox.io/s/handsontable-javascript-data-grid-hello-world-app-forked-33g8wu?file=/src/index.js:384-1564

import Handsontable from "handsontable";
import "handsontable/dist/handsontable.min.css";

// Adapted from https://handsontable.com/docs/5.0.2/demo-custom-renderers.html
// https://handsontable.com/docs/6.0.0/frameworks-wrapper-for-vue-custom-renderer-example.html
function cellRenderer(instance, td, row, col, prop, value, cellProperties) {
  var escaped = Handsontable.helper.stringify(value),
    img;

  if (escaped.indexOf("blob") === 0) {
    img = document.createElement("IMG");
    img.src = value;

    Handsontable.dom.addEvent(img, "mousedown", function (e) {
      e.preventDefault(); // prevent selection quirk
    });

    Handsontable.dom.empty(td);
    td.appendChild(img);
  } else {
    // render as text
    Handsontable.renderers.TextRenderer.apply(this, arguments);
  }

  return td;
}

export default function ({ data, container }) {
  let headers = data[0];
  data = data.slice(1).map((row) => {
    row = row.map((value) => {
      if (value instanceof Uint8Array) {
        return URL.createObjectURL(new Blob([value], { type: "image/png" }));
      }
      return value;
    });
    return row;
  });

  new Handsontable(container, {
    data,
    rowHeaders: true,
    colHeaders: headers,
    columns: headers.map((_) => ({ renderer: cellRenderer })),
    multiColumnSorting: true,
    filters: true,
    manualRowMove: true,
    licenseKey: "non-commercial-and-evaluation", // for non-commercial use only
  });
}
