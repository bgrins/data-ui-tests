import "./modulepreload-polyfill-8f47ac2a.js";
let urls = [
  "es5.html",
  "es5_expand.html",
  "es6.html",
  "es6_expand.html",
  "es2016plus.html",
  "es2016plus_expand.html",
  "html.html",
  "mdn.html",
  "mdn_html.html",
  "blog_cc.html",
  "wiki_web_standards.html",
  "noop.html"
];
let table = document.querySelector("#results table");
for (let url of urls) {
  let row = document.createElement("tr");
  let cell = document.createElement("td");
  let iframe = document.createElement("iframe");
  iframe.src = "../pages/" + url;
  cell.appendChild(iframe);
  row.appendChild(cell);
  table.appendChild(row);
}
document.querySelector("#run").addEventListener("click", async () => {
  const results = document.querySelector("#results");
  const iframes = results.querySelectorAll("iframe");
  for (const iframe of iframes) {
    iframe.contentDocument.body.click();
    await new Promise(
      (resolve) => iframe.contentWindow.requestAnimationFrame(resolve)
    );
    await new Promise((resolve) => setTimeout(resolve, 100));
    await new Promise(
      (resolve) => iframe.contentWindow.requestAnimationFrame(resolve)
    );
  }
  console.log("All done");
});
