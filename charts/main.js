import "/style.css";
import * as d3 from "d3";
import { pie } from "/charts/d3.js";
import * as plot from "/charts/plot.js";

let results = document.querySelector("#results");

// Todo this should actually recreate all the charts since the size is set in SVG
const setChartSize = (size) => {
  results.style.setProperty("--chart-size", `${size}px`);
  results.textContent = "";
  createCharts();
};
const getChartSize = () => document.querySelector("#chart-size").value;
document.addEventListener("input", (e) => {
  if (e.target.id === "chart-size") {
    setChartSize(e.target.value);
  }
});

let chartID = 0;
function createChartElement() {
  const chart = document.createElement("div");
  chart.id = `chart${chartID++}`;
  chart.classList.add("chart");
  results.appendChild(chart);
  return chart;
}

function createCharts() {
  plot.rect({
    querySelector: `#${createChartElement().id}`,
    size: getChartSize(),
  });
  plot.dot({
    querySelector: `#${createChartElement().id}`,
    size: getChartSize(),
  });
  plot.rectY({
    querySelector: `#${createChartElement().id}`,
    size: getChartSize(),
  });
  plot.plot({
    querySelector: `#${createChartElement().id}`,
    size: getChartSize(),
  });
}

setChartSize(document.querySelector("#chart-size").value);
