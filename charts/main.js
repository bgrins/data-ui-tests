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

const DEFAULT_WIDTH = new URLSearchParams(window.location.search).get("width");
let AUTORUN = new URLSearchParams(window.location.search).has("autorun");

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

function setStatus(text) {
  document.querySelector("#status").textContent = text;
  statuses.push(text);
  document.querySelector("#logs pre").textContent = statuses.join("\n");
  console.log(text);
}

document.addEventListener("click", (e) => {
  // When the dialog is open, clicks outside of it will have the dialog as the target,
  // and any click within will be consumed by the dialog-click-capture element.
  if (e.target === logDialog) {
    logDialog.close();
  }
});

document.addEventListener("keypress", (e) => {
  if (e.key === "l") {
    document.querySelector("#show-logs").click();
  }
});

document.querySelector("#show-logs").addEventListener("click", () => {
  logDialog.showModal();
});

const logDialog = document.querySelector("#logs");
let running = false;
document.querySelector("#run").addEventListener("click", async () => {
  if (running) {
    console.log("Currently running, ignoring request");
    return;
  }
  running = true;

  for (let size of [100, 200, 400, 800, 1000, 400]) {
    await new Promise((r) => requestAnimationFrame(r));
    document.querySelector("#chart-size").value = size;
    setChartSize();
    await new Promise((r) =>
      requestAnimationFrame(() => {
        setTimeout(r, 1000);
      })
    );
  }

  // let step = currentStep();
  // let totalStepTime = 0;

  // let permutations = [];
  // for (let grid of gridOptions()) {
  //   for (let query of queryOptions()) {
  //     permutations.push([grid, query]);
  //   }
  // }

  // let allMeasurements = [];

  // setStatus(
  //   `Autorun started with ${permutations.length} permutations and step ${step}ms`
  // );
  // performance.mark(`autorun-started`);
  // for (let [grid, query] of permutations) {
  //   // Not actually clicking the option radios because we don't want it to respond
  //   // to events, we're going to drive it ourselves
  //   grid.checked = true;
  //   query.checked = true;

  //   let sheet = currentSheet();
  //   performance.mark(`step-started: ${query.value} - ${grid.value}`);
  //   let results = await runQuery(sheet);
  //   performance.mark(`query-complete: ${query.value} - ${grid.value}`);
  //   render(results);
  //   performance.mark(`render-complete: ${query.value} - ${grid.value}`);

  //   // TODO - the test seems more inconsistent and doesn't seem to paint cross-browser without this.
  //   // With revo it doesn't seem to actually render without this (or the `step` option which
  //   // slows things down
  //   if (RAF) {
  //     await new Promise((resolve) => requestAnimationFrame(resolve));
  //   }
  //   performance.mark(`raf-complete: ${query.value} - ${grid.value}`);

  //   // Todo - is there a way to accurately measure something like
  //   // el.scrollTop = el.scrollTopMax
  //   if (step) {
  //     let stepStart = performance.now();
  //     await new Promise((resolve) => setTimeout(resolve, step));
  //     let stepTime = performance.now() - stepStart;
  //     totalStepTime += stepTime;
  //     // if (stepTime > step) {
  //     //   console.log(
  //     //     `Timeout took ${stepTime}ms, longer than the setTimeout ${step}ms`
  //     //   );
  //     // }
  //   }

  //   const queryMeasure = Math.round(
  //     performance.measure(
  //       `query-duration: ${query.value} - ${grid.value}`,
  //       `step-started: ${query.value} - ${grid.value}`,
  //       `query-complete: ${query.value} - ${grid.value}`
  //     ).duration
  //   );

  //   const renderMeasure = Math.round(
  //     performance.measure(
  //       `render-duration: ${query.value} - ${grid.value}`,
  //       `query-complete: ${query.value} - ${grid.value}`,
  //       `render-complete: ${query.value} - ${grid.value}`
  //     ).duration
  //   );
  //   const rafMeasure = Math.round(
  //     performance.measure(
  //       `raf-duration: ${query.value} - ${grid.value}`,
  //       `render-complete: ${query.value} - ${grid.value}`,
  //       `raf-complete: ${query.value} - ${grid.value}`
  //     ).duration
  //   );
  //   allMeasurements.push([queryMeasure, renderMeasure, rafMeasure]);
  //   const measurements = [
  //     `${query.value} - ${grid.value}`,
  //     `query: ${queryMeasure}ms`,
  //     `render: ${renderMeasure}ms`,
  //     `raf: ${rafMeasure}ms`,
  //   ].map((s, i) => s.padEnd(i == 0 ? 50 : 15, " "));
  //   if (!RAF) {
  //     measurements.pop();
  //   }

  //   setStatus(measurements.join(" "));
  // }
  // performance.mark(`autorun-complete`);

  // const totalMeasurements = [
  //   `Totals`,
  //   `query: ${allMeasurements.reduce((acc, [val]) => acc + val, 0)}ms`,
  //   `render: ${allMeasurements.reduce((acc, [, val]) => acc + val, 0)}ms`,
  //   `raf: ${allMeasurements.reduce((acc, [, , val]) => acc + val, 0)}ms`,
  // ];
  // if (!RAF) {
  //   totalMeasurements.pop();
  // }
  // setStatus(
  //   "-------\n" +
  //     totalMeasurements
  //       .map((s, i) => s.padEnd(i == 0 ? 50 : 15, " "))
  //       .join(" ") +
  //     "\n-------"
  // );
  // setStatus(
  //   `Autorun took ${Math.round(
  //     performance.measure(`autorun-complete`, `autorun-started`).duration -
  //       totalStepTime
  //   )} ms${
  //     totalStepTime > 0
  //       ? `. There were also ${Math.round(
  //           totalStepTime
  //         )}ms of actual timeouts between steps with ${
  //           step * permutations.length
  //         }ms expected.`
  //       : ""
  //   }`
  // );
  running = false;
  // document.querySelector("#show-logs").click();
});

if (DEFAULT_WIDTH) {
  document.querySelector("#chart-size").value = DEFAULT_WIDTH;
}
setChartSize();

if (AUTORUN) {
  document.querySelector("#run").click();
}
