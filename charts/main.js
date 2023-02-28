import "/style.css";
// import { musicRevenue } from "/charts/revenue_by_music_format.js";
import * as plot from "/charts/plot.js";
import * as sparkline from "/charts/sparkline.js";
import * as chartjs from "/charts/chartjs.js";
import * as echarts from "/charts/echarts.js";
import * as recharts from "/charts/recharts.jsx";
import * as plotly from "/charts/plotly.js";

const LOG_DIALOG = document.querySelector("#logs");
const RESULTS_ELEMENT = document.querySelector("#results");
const CHART_WIDTH_HEIGHT_RATIO = 0.625;
const DEFAULT_LIB = new URLSearchParams(window.location.search).get("lib");
const DEFAULT_WIDTH = new URLSearchParams(window.location.search).get("width");
let AUTORUN = new URLSearchParams(window.location.search).has("autorun");

/**
 * List of all charts we want to draw.
 *
 * key: name of the library. This is used as a key in this script, but nothing more.
 * value: {
 *    charts: Array<ChartingFunction>
 * }
 *
 * ChartingFunction is a function: ({ width, height }) => HTMLElement
 * which configures a render operation and returning the HTML element where the
 * render happens.
 */
const ALL_CHARTS = {
  plot: {
    charts: [plot.rect, plot.dot, plot.rectY, plot.plot],
  },
  sparkline: {
    charts: Array(12)
      .fill(0)
      .map((_, i) => {
        return i % 2 ? sparkline.two : sparkline.one;
      }),
  },
  chartjs: {
    charts: [chartjs.bar, chartjs.polarArea, chartjs.radar, chartjs.scatter],
  },
  echarts: { charts: [echarts.bar] },
  recharts: {
    charts: [recharts.line, recharts.treemap, recharts.bubble],
  },
  // Todo is there a good way to attach simulated events to a given chart (like the ribbon chart, which
  // typically uses mouse interaction to zoom etc).
  plotly: { charts: [plotly.ribbon] },
};

const currentLib = () =>
  ALL_CHARTS[document.querySelector("input[name=lib]:checked")?.value];

async function renderCurrent() {
  const { width, height } = getChartWidthHeight();
  RESULTS_ELEMENT.style.setProperty("--chart-width", `${width}px`);
  RESULTS_ELEMENT.style.setProperty("--chart-height", `${height}px`);
  RESULTS_ELEMENT.textContent = "";

  let current = currentLib() ? [currentLib()] : Object.values(ALL_CHARTS);
  for (let { charts } of current) {
    for (let chart of charts) {
      createChartElement().append(
        await chart({
          ...getChartWidthHeight(),
        })
      );
    }
  }
}

function createChartElement() {
  createChartElement.id = (createChartElement.id || 0) + 1;
  const chart = document.createElement("div");
  chart.id = `chart${createChartElement.id}`;
  chart.classList.add("chart");
  RESULTS_ELEMENT.append(chart);
  return chart;
}

const getChartSize = () => document.querySelector("#chart-size").value;
const getChartWidthHeight = () => ({
  width: Math.floor(getChartSize()),
  height: Math.floor(getChartSize() * CHART_WIDTH_HEIGHT_RATIO),
});

const getChartingLibraries = () => [
  ...document.querySelectorAll(`[name="lib"]`),
];
const getSizes = () => {
  // Matches <input type="range" min="200" max="1000" value="200" step="200" id="chart-size" />
  return [200, 400, 600, 800];
};

const statuses = [];
function setStatus(text) {
  document.querySelector("#status").textContent = text;
  statuses.push(text);
  LOG_DIALOG.querySelector("pre").textContent = statuses.join("\n");
  console.log(text);
}

function createOptions() {
  if (DEFAULT_WIDTH) {
    document.querySelector("#chart-size").value = DEFAULT_WIDTH;
  }

  let libOptions = document.createElement("div");
  libOptions.id = "lib-options";
  libOptions.classList.add("options");
  document.querySelector("header").append(libOptions);

  for (let title in ALL_CHARTS) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "lib";
    input.value = title;
    input.id = `lib-${title}`;
    input.checked = title === DEFAULT_LIB;
    let label = document.createElement("label");
    label.textContent = title;
    label.htmlFor = `lib-${title}`;
    libOptions.append(input, label);
  }
}

let running = false;
async function run() {
  if (running) {
    console.log("Currently running, ignoring request");
    return;
  }
  running = true;

  let permutations = [];
  for (let library of getChartingLibraries()) {
    for (let size of getSizes()) {
      permutations.push([library, size]);
    }
  }
  performance.mark(`autorun-started`);

  for (let [library, size] of permutations) {
    await new Promise((r) => requestAnimationFrame(r));
    let libraryName = library.value;
    performance.mark(`autorun-${libraryName}-${size}-started`);
    document.querySelector("#chart-size").value = size;
    library.checked = true;
    await renderCurrent();
    performance.mark(`autorun-${libraryName}-${size}-complete`);
    setStatus(
      `${libraryName}-${size} took ${Math.round(
        performance.measure(
          `autorun-${libraryName}-${size}-complete`,
          `autorun-${libraryName}-${size}-started`
        ).duration
      )}ms`
    );

    await new Promise((r) => requestAnimationFrame(r));
  }

  performance.mark(`autorun-complete`);
  setStatus(
    `Autorun took ${Math.round(
      performance.measure(`autorun-complete`, `autorun-started`).duration
    )} ms`
  );
  running = false;
  document.querySelector("#show-logs").click();
}

document.addEventListener("change", (e) => {
  if (e.target.id === "chart-size") {
    setStatus(`Size changed to ${e.target.value}`);
    renderCurrent();
  }
  if (e.target.name === "lib") {
    setStatus(`Lib changed to ${e.target.value}`);
    renderCurrent();
  }
});

document.addEventListener("click", (e) => {
  // When the dialog is open, clicks outside of it will have the dialog as the target,
  // and any click within will be consumed by the dialog-click-capture element.
  if (e.target === LOG_DIALOG) {
    LOG_DIALOG.close();
  }
});

document.addEventListener("keypress", (e) => {
  if (e.key === "l") {
    document.querySelector("#show-logs").click();
  }
});

document.querySelector("#show-logs").addEventListener("click", () => {
  LOG_DIALOG.showModal();
});

document.querySelector("#run").addEventListener("click", run);

createOptions();

setTimeout(() => {
  if (AUTORUN) {
    document.querySelector("#run").click();
  } else {
    renderCurrent();
  }
}, 0);
