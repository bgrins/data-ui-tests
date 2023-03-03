// https://echarts.apache.org/handbook/en/basics/import
import * as vega from "vega";

async function fetchSpec(name) {
  // URL is needed for vite builds to work https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
  const url = new URL(`./vega-definitions/${name}.vg.json`, import.meta.url)
    .href;
  const res = await fetch(url);
  return res.json();
}

// Note that we're mutating this datasets in the tests, but just for their width
// and height, so that's probably OK.
const datasets = await (async function () {
  // This looks complicated but will make it possible to parallely fetch
  // additional data in the future.
  // Just add more fetch operations to the array if needed.
  const [simplebars, airports] = await Promise.all(
    ["simplebars", "airports"].map(fetchSpec)
  );
  return {
    simplebars,
    airports,
  };
})();

async function renderVega(container, json, renderer) {
  const view = new vega.View(vega.parse(json), {
    renderer, // renderer (canvas or svg)
    container, // parent DOM container
    hover: true, // enable hover processing
  });
  await view.runAsync();
}

// https://vega.github.io/vega/tutorials/bar-chart/
export async function barCanvas({ container, width, height }) {
  const json = datasets.simplebars;
  json.width = width;
  json.height = height;
  await renderVega(container, json, "canvas");
}

// https://vega.github.io/vega/tutorials/bar-chart/
export async function barSvg({ container, width, height }) {
  const json = datasets.simplebars;
  json.width = width;
  json.height = height;
  await renderVega(container, json, "svg");
}

// modified https://vega.github.io/vega/tutorials/airports/
export async function airportsSvg({ container, width, height }) {
  const json = datasets.airports;
  json.width = width;
  json.height = height;
  await renderVega(container, json, "svg");
}

// modified https://vega.github.io/vega/tutorials/airports/
export async function airportsCanvas({ container, width, height }) {
  const json = datasets.airports;
  json.width = width;
  json.height = height;
  await renderVega(container, json, "svg");
}
