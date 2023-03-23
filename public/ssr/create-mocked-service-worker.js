// Node script to take a directory like simple/content, and morph it into a file like sw.js
// node create-mocked-service-worker.js simple/content simple/test-sw.js

import path, { resolve } from "path";
import fs, { promises } from "fs";
import mime from "mime-types";
const { readdir } = promises;
async function getFiles(dir) {
  let dirs = await readdir(dir, { withFileTypes: true });
  dirs = dirs.filter((dir) => {
    if (dir.name.startsWith(".")) {
      return false;
    }
    return true;
  });
  const files = await Promise.all(
    dirs.map((dirent) => {
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
  if (!RESPONSES.has(path) && path.endsWith("/")) {
    path += "index.html";
  }
  if (RESPONSES.has(path)) {
    let resp = new Response(RESPONSES.get(path), { status: 200 });
    event.respondWith(resp);
  }
});
`;

for (const file of files) {
  let relativePath = path.relative(dir, file);
  let type = mime.lookup(file);
  let data = {
    base64: fs.readFileSync(file).toString("base64"),
    type,
  };

  script += `
RESPONSES.set("/mocked/${relativePath}", b64toBlob("${data.base64}", "${data.type}"));
`;
}

fs.writeFileSync(out, script);
