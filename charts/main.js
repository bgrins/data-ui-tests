import "/style.css";
// import { musicRevenue } from "/charts/revenue_by_music_format.js";
import * as plot from "/charts/plot.js";
import * as sparkline from "/charts/sparkline.js";
import * as chartjs from "/charts/chartjs.js";
import * as echarts from "/charts/echarts.js";
import * as recharts from "/charts/recharts.jsx";
import * as plotly from "/charts/plotly.js";

let results = document.querySelector("#results");
const RATIO = 0.625;

// Todo this should actually recreate all the charts since the size is set in SVG
const setChartSize = () => {
  const { width, height } = getChartWidthHeight();
  results.style.setProperty("--chart-width", `${width}px`);
  results.style.setProperty("--chart-height", `${height}px`);
  results.textContent = "";
  createCharts();
};
const getChartSize = () => document.querySelector("#chart-size").value;
const getChartWidthHeight = () => ({
  width: Math.floor(getChartSize()),
  height: Math.floor(getChartSize() * RATIO),
});
document.addEventListener("input", (e) => {
  if (e.target.id === "chart-size") {
    setChartSize();
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
    charts: [sparkline.one, sparkline.two],
  },
  {
    mod: chartjs,
    charts: [chartjs.bar, chartjs.polarArea, chartjs.radar, chartjs.scatter],
  },
  { mod: echarts, charts: [echarts.bar] },
  {
    mod: recharts,
    charts: [recharts.line, recharts.treemap, recharts.bubble],
  },
  { mod: plotly, charts: [plotly.ribbon] },
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

setChartSize();
