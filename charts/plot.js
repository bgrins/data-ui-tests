import * as Plot from "@observablehq/plot";
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
const RATIO = 0.625;

export function dot({ querySelector, size }) {
  let container = document.querySelector(querySelector);
  container.append(
    Plot.dot(athletes_plot_data, {
      x: "weight",
      y: "height",
      stroke: "sex",
    }).plot({
      width: size,
      height: size * RATIO,
    })
  );
}

export function rect({ querySelector, size }) {
  let container = document.querySelector(querySelector);
  container.append(
    Plot.rect(
      athletes_plot_data,
      Plot.bin(
        { fillOpacity: "count" },
        { x: "weight", y: "height", fill: "sex" }
      )
    ).plot({
      width: size,
      height: size * RATIO,
    })
  );
}

export function rectY({ querySelector, size }) {
  let container = document.querySelector(querySelector);
  container.append(
    Plot.rectY(
      athletes_plot_data,
      Plot.binX({ y: "count" }, { x: "weight", fill: "sex" })
    ).plot({
      width: size,
      height: size * RATIO,
    })
  );
}
export function plot({ querySelector, size = 640 }) {
  let container = document.querySelector(querySelector);
  container.append(
    Plot.plot({
      grid: true,
      width: size,
      height: size * RATIO,
      marks: [
        Plot.rectY(
          athletes,
          Plot.binX({ y: "count" }, { x: "weight", fill: "sex", fy: "sex" })
        ),
        Plot.ruleY([0]),
      ],
    })
  );
}
