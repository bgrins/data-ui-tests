// https://echarts.apache.org/handbook/en/basics/import
import * as vega from "vega";

async function fetchSpec(name) {
  const res = await fetch(`./vega-definitions/${name}.vg.json`);
  return res.json();
}

async function renderVega(json, renderer) {
  const container = document.createElement("div");
  const view = new vega.View(vega.parse(json), {
    renderer, // renderer (canvas or svg)
    container, // parent DOM container
    hover: true, // enable hover processing
  });
  await view.runAsync();
  return container;
}

export async function barCanvas({ width, height }) {
  const json = await fetchSpec("simplebars");
  json.width = width;
  json.height = height;
  const container = await renderVega(json, "canvas");

  return container;
}

export async function barSvg({ width, height }) {
  const json = await fetchSpec("simplebars");
  json.width = width;
  json.height = height;
  const container = await renderVega(json, "svg");
  return container;
}

export async function airportsSvg({ width, height }) {
  const json = await fetchSpec("airports");
  json.width = width;
  json.height = height;
  return renderVega(json, "svg");
}

export async function airportsCanvas({ width, height }) {
  const json = await fetchSpec("airports");
  json.width = width;
  json.height = height;
  return renderVega(json, "svg");
}
