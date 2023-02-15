import {
  dot as plotDot,
  rect as plotRect,
  plot as plotPlot,
  rectY as plotRectY,
  ruleY,
  bin,
  binX,
} from "@observablehq/plot";

import athletes from "/sample_data/athletes.js";
// From https://observablehq.com/@observablehq/plot
// https://observablehq.com/@observablehq/plot-cheatsheets-layouts
let athletes_plot_data = athletes.map((d) => ({
  ...d,
  weight: +d.weight,
  height: +d.height,
  gold: +d.gold,
  silver: +d.silver,
  bronze: +d.bronze,
}));

export function dot({ width, height }) {
  return plotDot(athletes_plot_data, {
    x: "weight",
    y: "height",
    stroke: "sex",
  }).plot({
    width,
    height,
  });
}

export function rect({ width, height }) {
  return plotRect(
    athletes_plot_data,
    bin({ fillOpacity: "count" }, { x: "weight", y: "height", fill: "sex" })
  ).plot({
    width,
    height,
  });
}

export function rectY({ width, height }) {
  return plotRectY(
    athletes_plot_data,
    binX({ y: "count" }, { x: "weight", fill: "sex" })
  ).plot({
    width,
    height,
  });
}
export function plot({ width, height }) {
  return plotPlot({
    grid: true,
    width,
    height,
    marks: [
      plotRectY(
        athletes_plot_data,
        binX({ y: "count" }, { x: "weight", fill: "sex", fy: "sex" })
      ),
      ruleY([0]),
    ],
  });
}
