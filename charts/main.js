import "/style.css";
// import { musicRevenue } from "/charts/revenue_by_music_format.js";
import * as plot from "/charts/plot.js";
import * as sparkline from "/charts/sparkline.js";
import * as chartjs from "/charts/chartjs.js";

let results = document.querySelector("#results");
const RATIO = 0.625;

// Todo this should actually recreate all the charts since the size is set in SVG
const setChartSize = (size) => {
  results.style.setProperty("--chart-size", `${size}px`);
  results.textContent = "";
  createCharts();
};
const getChartSize = () => document.querySelector("#chart-size").value;
const getChartWidthHeight = () => ({
  width: getChartSize(),
  height: getChartSize() * RATIO,
});
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
  results.append(chart);
  return chart;
}

const ALL_CHARTS = [
  { mod: plot, charts: [plot.rect, plot.dot, plot.rectY, plot.plot] },
  {
    mod: sparkline,
    charts: [
      sparkline.random,
      sparkline.random,
    ],
  },
  { mod: chartjs, charts: [chartjs.bar, chartjs.polarArea, chartjs.radar, chartjs.scatter] },
];

function createCharts() {
  for (let { mod, charts } of ALL_CHARTS) {
    for (let chart of charts) {
      createChartElement().append(
        chart({
          ...getChartWidthHeight(),
        })
      );
    }
  }

  // This isn't working
  // musicRevenue({
  //   querySelector: `#${createChartElement().id}`,
  //   size: getChartSize(),
  //   ...getChartWidthHeight(),
  // })
}

setChartSize(document.querySelector("#chart-size").value);
