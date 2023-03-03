// https://echarts.apache.org/handbook/en/basics/import
import * as vega from "vega";

async function fetchSpec(name) {
  // URL is needed for vite builds to work https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
  const url = new URL(`./vega-definitions/${name}.vg.json`, import.meta.url)
    .href;
  const res = await fetch(url);
  return res.json();
}

async function renderVega(container, json, renderer) {
  const view = new vega.View(vega.parse(json), {
    renderer, // renderer (canvas or svg)
    container, // parent DOM container
    hover: true, // enable hover processing
  });
  await view.runAsync();
}

export async function barCanvas({ container, width, height }) {
  const json = await fetchSpec("simplebars");
  json.width = width;
  json.height = height;
  await renderVega(container, json, "canvas");
}

export async function barSvg({ container, width, height }) {
  const json = await fetchSpec("simplebars");
  json.width = width;
  json.height = height;
  await renderVega(container, json, "svg");
}

export async function airportsSvg({ container, width, height }) {
  const json = await fetchSpec("airports");
  json.width = width;
  json.height = height;
  await renderVega(container, json, "svg");
}

export async function airportsCanvas({ container, width, height }) {
  const json = await fetchSpec("airports");
  json.width = width;
  json.height = height;
  await renderVega(container, json, "svg");
}
