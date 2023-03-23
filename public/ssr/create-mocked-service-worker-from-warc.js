import { WARCParser } from "warcio";
import fs from "fs";

// Generate a WARC like:
// docker run -v $PWD/crawls:/crawls/ -it webrecorder/browsertrix-crawler crawl --depth 0 --url "https://developer.mozilla.org/" --collection mdn --combineWARC
// docker pull webrecorder/browsertrix-crawler

// Then call with
// node create-mocked-service-worker.js crawls/collections/mdn/mdn_0.warc.gz layouts/test-mdn-sw.js

const warc = process.argv[2];
const out = process.argv[3];

let script = `
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
  if (RESPONSES.has(path)) {
    let resp = new Response(RESPONSES.get(path), { status: 200 });
    event.respondWith(resp);
  }
});
`;

async function readWARC() {
  const nodeStream = fs.createReadStream(warc);

  const parser = new WARCParser(nodeStream);

  for await (const record of parser) {
    if (record.warcType === "response") {
      const payload = await record.readFully(true);
      var base64 = Buffer.from(payload).toString("base64");
      let data = {
        base64,
        type: record.getResponseInfo().headers.get("content-type"),
      };
      script += `
    RESPONSES.set(${JSON.stringify(record.warcTargetURI)}, b64toBlob("${
        data.base64
      }", "${data.type}"));
    `;
    }
  }

  fs.writeFileSync(out, script);
}

readWARC();
