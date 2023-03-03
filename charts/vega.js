// https://echarts.apache.org/handbook/en/basics/import
import * as vega from "vega";
import simplebarsDataset from "./vega-definitions/simplebars.vg.json";
import airportsDataset from "./vega-definitions/airports.vg.json";

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
  const json = simplebarsDataset;
  json.width = width;
  json.height = height;
  await renderVega(container, json, "canvas");
}

// https://vega.github.io/vega/tutorials/bar-chart/
export async function barSvg({ container, width, height }) {
  const json = simplebarsDataset;
  json.width = width;
  json.height = height;
  await renderVega(container, json, "svg");
}

// modified https://vega.github.io/vega/tutorials/airports/
export async function airportsSvg({ container, width, height }) {
  const json = airportsDataset;
  json.width = width;
  json.height = height;
  await renderVega(container, json, "svg");
}

// modified https://vega.github.io/vega/tutorials/airports/
export async function airportsCanvas({ container, width, height }) {
  const json = airportsDataset;
  json.width = width;
  json.height = height;
  await renderVega(container, json, "svg");
}
