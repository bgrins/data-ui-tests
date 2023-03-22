// Node script to take a directory like simple/content, and morph it into a file like sw.js
// node create-mocked-service-worker.js simple/content simple/test-sw.js

import path, { resolve } from "path";
import fs, { promises } from "fs";
import mime from "mime-types";
const { readdir } = promises;
async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}

const dir = process.argv[2]; //"simple/content/"; //
const out = process.argv[3]; //"simple/content/test-sw.js"; //

const files = await getFiles(dir);

console.log(dir, out);
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
  if (RESPONSES.get(path)) {
    let start = performance.now();
    let response = RESPONSES.get(path)();
    console.log("fetch", performance.now() - start, response);
    event.respondWith(response);
  }
});
`;

for (const file of files) {
  let relativePath = path.relative(dir, file);
  let type = mime.lookup(file);
  // Convert the file to a Blob

  let data = {
    base64: fs.readFileSync(file).toString("base64"),
    type,
  };

  script += `
RESPONSES.set("/mocked/${relativePath}",
  () => {
    var data = "${data.base64}";
    var blob = b64toBlob(data, "${data.type}");
    return new Response(blob, { status: 200 });
  });
`;
}

fs.writeFileSync(out, script);
