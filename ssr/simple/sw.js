
const RESPONSES = new Map();
const BASE_PATH = globalThis.location.pathname.replace("/sw.js", "");

const b64toBlob = (b64Data, contentType="", sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

self.addEventListener("fetch", (event) => {
  const { pathname } = new URL(event.request.url);
  let path = pathname.replace(BASE_PATH, "");
  console.log(
    "fetch",
    globalThis.location,
    event.request.url,
    path,
    RESPONSES.has(path)
  );
  if (RESPONSES.get(path)) {
    let start = performance.now();
    let response = RESPONSES.get(path)();
    console.log("fetch", performance.now() - start, response);
    event.respondWith(response);
  }
});

RESPONSES.set("/mocked/chart.svg",
  () => {
    var data = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLWNoYXJ0LWJhciIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSJvcmFuZ2UiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CiAgIDxwYXRoIHN0cm9rZT0ibm9uZSIgZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSI+PC9wYXRoPgogICA8cGF0aCBkPSJNMyAxMm0wIDFhMSAxIDAgMCAxIDEgLTFoNGExIDEgMCAwIDEgMSAxdjZhMSAxIDAgMCAxIC0xIDFoLTRhMSAxIDAgMCAxIC0xIC0xeiI+PC9wYXRoPgogICA8cGF0aCBkPSJNOSA4bTAgMWExIDEgMCAwIDEgMSAtMWg0YTEgMSAwIDAgMSAxIDF2MTBhMSAxIDAgMCAxIC0xIDFoLTRhMSAxIDAgMCAxIC0xIC0xeiI+PC9wYXRoPgogICA8cGF0aCBkPSJNMTUgNG0wIDFhMSAxIDAgMCAxIDEgLTFoNGExIDEgMCAwIDEgMSAxdjE0YTEgMSAwIDAgMSAtMSAxaC00YTEgMSAwIDAgMSAtMSAtMXoiPjwvcGF0aD4KICAgPHBhdGggZD0iTTQgMjBsMTQgMCI+PC9wYXRoPgo8L3N2Zz4=";
    var blob = b64toBlob(data, "image/svg+xml");
    return new Response(blob, { status: 200 });
  });

RESPONSES.set("/mocked/database.svg",
  () => {
    var data = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLWRhdGFiYXNlLWV4cG9ydCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSJvcmFuZ2UiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CiAgIDxwYXRoIHN0cm9rZT0ibm9uZSIgZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSI+PC9wYXRoPgogICA8cGF0aCBkPSJNMTIgNm0tOCAwYTggMyAwIDEgMCAxNiAwYTggMyAwIDEgMCAtMTYgMCI+PC9wYXRoPgogICA8cGF0aCBkPSJNNCA2djZjMCAxLjY1NyAzLjU4MiAzIDggM2ExOS44NCAxOS44NCAwIDAgMCAzLjMwMiAtLjI2N200LjY5OCAtMi43MzN2LTYiPjwvcGF0aD4KICAgPHBhdGggZD0iTTQgMTJ2NmMwIDEuNTk5IDMuMzM1IDIuOTA1IDcuNTM4IDNtOC40NjIgLTd2LTJtLTYgN2g3bS0zIC0zbDMgM2wtMyAzIj48L3BhdGg+Cjwvc3ZnPg==";
    var blob = b64toBlob(data, "image/svg+xml");
    return new Response(blob, { status: 200 });
  });

RESPONSES.set("/mocked/icon.png",
  () => {
    var data = "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";
    var blob = b64toBlob(data, "image/png");
    return new Response(blob, { status: 200 });
  });

RESPONSES.set("/mocked/layout.svg",
  () => {
    var data = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLWxheW91dC0yIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9Im9yYW5nZSIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4KICA8cGF0aCBzdHJva2U9Im5vbmUiIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICA8cGF0aCBkPSJNNCA0bTAgMmEyIDIgMCAwIDEgMiAtMmgyYTIgMiAwIDAgMSAyIDJ2MWEyIDIgMCAwIDEgLTIgMmgtMmEyIDIgMCAwIDEgLTIgLTJ6IiAvPgogIDxwYXRoIGQ9Ik00IDEzbTAgMmEyIDIgMCAwIDEgMiAtMmgyYTIgMiAwIDAgMSAyIDJ2M2EyIDIgMCAwIDEgLTIgMmgtMmEyIDIgMCAwIDEgLTIgLTJ6IiAvPgogIDxwYXRoIGQ9Ik0xNCA0bTAgMmEyIDIgMCAwIDEgMiAtMmgyYTIgMiAwIDAgMSAyIDJ2M2EyIDIgMCAwIDEgLTIgMmgtMmEyIDIgMCAwIDEgLTIgLTJ6IiAvPgogIDxwYXRoIGQ9Ik0xNCAxNW0wIDJhMiAyIDAgMCAxIDIgLTJoMmEyIDIgMCAwIDEgMiAydjFhMiAyIDAgMCAxIC0yIDJoLTJhMiAyIDAgMCAxIC0yIC0yeiIgLz4KPC9zdmc+CgoK";
    var blob = b64toBlob(data, "image/svg+xml");
    return new Response(blob, { status: 200 });
  });

RESPONSES.set("/mocked/nested/index.html",
  () => {
    var data = "Ck5lc3RlZCBpbmRleCBwYWdl";
    var blob = b64toBlob(data, "text/html");
    return new Response(blob, { status: 200 });
  });

RESPONSES.set("/mocked/page1.html",
  () => {
    var data = "PCFET0NUWVBFIGh0bWw+CjxodG1sPgogIDxoZWFkPgogICAgPHRpdGxlPkV4YW1wbGU8L3RpdGxlPgogICAgPG1ldGEgY2hhcnNldD0idXRmLTgiIC8+CiAgPC9oZWFkPgoKICA8Ym9keT4KICAgIDxkaXY+CiAgICAgIDxoMT5QYWdlIDE8L2gxPgogICAgICA8aW1nIHNyYz0iLi9jaGFydC5zdmciIC8+CiAgICAgIDxociAvPgogICAgICA8aW1nIHNyYz0iLi9pY29uLnBuZyIgd2lkdGg9IjMyIiAvPgogICAgPC9kaXY+CiAgPC9ib2R5Pgo8L2h0bWw+Cg==";
    var blob = b64toBlob(data, "text/html");
    return new Response(blob, { status: 200 });
  });

RESPONSES.set("/mocked/page2.html",
  () => {
    var data = "PCFET0NUWVBFIGh0bWw+CjxodG1sPgogIDxoZWFkPgogICAgPHRpdGxlPkV4YW1wbGU8L3RpdGxlPgogICAgPG1ldGEgY2hhcnNldD0idXRmLTgiIC8+CiAgPC9oZWFkPgoKICA8Ym9keT4KICAgIDxkaXY+CiAgICAgIDxoMT5QYWdlIDI8L2gxPgogICAgICA8aW1nIHNyYz0iLi9sYXlvdXQuc3ZnIiAvPgogICAgICA8aHIgLz4KICAgICAgPGltZyBzcmM9Ii4vaWNvbi5wbmciIHdpZHRoPSI2NCIgLz4KICAgIDwvZGl2PgogIDwvYm9keT4KPC9odG1sPgo=";
    var blob = b64toBlob(data, "text/html");
    return new Response(blob, { status: 200 });
  });

RESPONSES.set("/mocked/page3.html",
  () => {
    var data = "PCFET0NUWVBFIGh0bWw+CjxodG1sPgogIDxoZWFkPgogICAgPHRpdGxlPkV4YW1wbGU8L3RpdGxlPgogICAgPG1ldGEgY2hhcnNldD0idXRmLTgiIC8+CiAgPC9oZWFkPgoKICA8Ym9keT4KICAgIDxkaXY+CiAgICAgIDxoMT5QYWdlIDM8L2gxPgogICAgICA8aW1nIHNyYz0iLi9kYXRhYmFzZS5zdmciIC8+CiAgICAgIDxociAvPgogICAgICA8aW1nIHNyYz0iLi9pY29uLnBuZyIgd2lkdGg9IjEyOCIgLz4KICAgIDwvZGl2PgogIDwvYm9keT4KPC9odG1sPgo=";
    var blob = b64toBlob(data, "text/html");
    return new Response(blob, { status: 200 });
  });
