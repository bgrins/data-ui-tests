import "/style.css";
import * as db from "./db.js";
import lit_table from "./tables/lit.js";
import vanilla_table from "./tables/lit.js";
import revo from "./tables/revo.js";
import handsontable from "./tables/handsontable.js";

let exportedResults = (window.exportedResults = []);
let results = document.querySelector("#results");
let statuses = [];
const DEFAULT_SHEET = new URLSearchParams(window.location.search).get("sheet");
const DEFAULT_GRID = new URLSearchParams(window.location.search).get("grid");
const DEFAULT_STEP = parseInt(
  new URLSearchParams(window.location.search).get("step")
);
const RAF = new URLSearchParams(window.location.search).has("raf");
let AUTORUN = new URLSearchParams(window.location.search).has("autorun");

const logDialog = document.querySelector("#logs");
if (!isNaN(DEFAULT_STEP)) {
  document.querySelector("#step").value = DEFAULT_STEP;
}
if (DEFAULT_GRID) {
  try {
    document.querySelector(`[name=grid][value=${DEFAULT_GRID}]`).checked = true;
  } catch (e) {
    console.error(e);
  }
}

function noop() {}
const queryOptions = () => [...document.querySelectorAll(`[name="query"]`)];
const gridOptions = () => [...document.querySelectorAll(`[name="grid"]`)];
const currentGrid = () => {
  switch (document.querySelector(`[name="grid"]:checked`)?.value) {
    case "none":
      return noop;
    case "lit":
      return lit_table;
    case "vanilla":
      return vanilla_table;
    case "revo":
      return revo;
    case "handsontable":
      return handsontable;
    default:
      return null;
  }
};
const currentStep = () => parseInt(document.querySelector("#step").value);
const currentSheet = () =>
  sheets.find(
    (el) =>
      el.title == document.querySelector("input[name=query]:checked")?.value
  );
function setStatus(text) {
  document.querySelector("#status").textContent = text;
  statuses.push(text);
  document.querySelector("#logs pre").textContent = statuses.join("\n");
  console.log(text);
}

document.addEventListener("click", (e) => {
  console.log(e, e.target, logDialog);
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

db.emitter.addEventListener("execcomplete", (e) => {
  if (!running) {
    setStatus(e.detail.message);
  }
  document.querySelector("#total-db-ms").textContent = `${Math.round(
    db.total_sql_time
  )} total ms in db`;
});

const sheets = [
  { title: "Categories", sql: "select * from [Categories];" },
  { title: "Customers", sql: "select * from [Customers];" },
  {
    title: "EmployeeTerritories",
    sql: "select * from [EmployeeTerritories];",
  },
  { title: "Employees", sql: "select * from [Employees];" },
  { title: "OrderDetails", sql: "select * from [Order Details];" },
  {
    title: "OrderDetailsByProduct",
    sql: "select ProductID, COUNT(*) num, AVG(UnitPrice) average_price, AVG(Quantity) average_quantity from [Order Details] GROUP BY ProductID ORDER BY num DESC",
  },
  { title: "Orders", sql: "select * from [Orders];" },
  { title: "Products", sql: "select * from [Products];" },
  { title: "Regions", sql: "select * from [Regions];" },
  { title: "Shippers", sql: "select * from [Shippers];" },
  { title: "Suppliers", sql: "select * from [Suppliers];" },
  { title: "Territories", sql: "select * from [Territories];" },
];

for (let { title, sql } of sheets) {
  let input = document.createElement("input");
  input.type = "radio";
  input.name = "query";
  input.value = title;
  input.id = `query-${title}`;
  input.checked = title === DEFAULT_SHEET;
  let label = document.createElement("label");
  label.textContent = title;
  label.htmlFor = `query-${title}`;
  document.querySelector("#query-options").append(input, label);
}

document.addEventListener("change", (e) => {
  if (e.target.name === "query") {
    setStatus(`Sheet changed to ${e.target.value}`);
    runQueryAndRender();
  }
  if (e.target.name === "grid") {
    setStatus(`Grid changed to ${e.target.value}`);
    runQueryAndRender();
  }
});

let running = false;
document.querySelector("#run").addEventListener("click", async () => {
  if (running) {
    console.log("Currently running, ignoring request");
    return;
  }
  running = true;

  let step = currentStep();
  let totalStepTime = 0;

  let permutations = [];
  for (let grid of gridOptions()) {
    for (let query of queryOptions()) {
      permutations.push([grid, query]);
    }
  }

  let allMeasurements = [];

  setStatus(
    `Autorun started with ${permutations.length} permutations and step ${step}ms`
  );
  performance.mark(`autorun-started`);
  for (let [grid, query] of permutations) {
    // Not actually clicking the option radios because we don't want it to respond
    // to events, we're going to drive it ourselves
    grid.checked = true;
    query.checked = true;

    let sheet = currentSheet();
    performance.mark(`step-started: ${query.value} - ${grid.value}`);
    let results = await runQuery(sheet);
    performance.mark(`query-complete: ${query.value} - ${grid.value}`);
    render(results);
    performance.mark(`render-complete: ${query.value} - ${grid.value}`);

    // TODO - the test seems more inconsistent and doesn't seem to paint cross-browser without this.
    // With revo it doesn't seem to actually render without this (or the `step` option which
    // slows things down
    if (RAF) {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    performance.mark(`raf-complete: ${query.value} - ${grid.value}`);

    // Todo - is there a way to accurately measure something like
    // el.scrollTop = el.scrollTopMax
    if (step) {
      let stepStart = performance.now();
      await new Promise((resolve) => setTimeout(resolve, step));
      let stepTime = performance.now() - stepStart;
      totalStepTime += stepTime;
      // if (stepTime > step) {
      //   console.log(
      //     `Timeout took ${stepTime}ms, longer than the setTimeout ${step}ms`
      //   );
      // }
    }

    const queryMeasure = Math.round(
      performance.measure(
        `query-duration: ${query.value} - ${grid.value}`,
        `step-started: ${query.value} - ${grid.value}`,
        `query-complete: ${query.value} - ${grid.value}`
      ).duration
    );

    const renderMeasure = Math.round(
      performance.measure(
        `render-duration: ${query.value} - ${grid.value}`,
        `query-complete: ${query.value} - ${grid.value}`,
        `render-complete: ${query.value} - ${grid.value}`
      ).duration
    );
    const rafMeasure = Math.round(
      performance.measure(
        `raf-duration: ${query.value} - ${grid.value}`,
        `render-complete: ${query.value} - ${grid.value}`,
        `raf-complete: ${query.value} - ${grid.value}`
      ).duration
    );
    allMeasurements.push([queryMeasure, renderMeasure, rafMeasure]);
    const measurements = [
      `${query.value} - ${grid.value}`,
      `query: ${queryMeasure}ms`,
      `render: ${renderMeasure}ms`,
      `raf: ${rafMeasure}ms`,
    ].map((s, i) => s.padEnd(i == 0 ? 50 : 15, " "));
    if (!RAF) {
      measurements.pop();
    }

    setStatus(measurements.join(" "));
  }
  performance.mark(`autorun-complete`);

  const totalMeasurements = [
    `Totals`,
    `query: ${allMeasurements.reduce((acc, [val]) => acc + val, 0)}ms`,
    `render: ${allMeasurements.reduce((acc, [, val]) => acc + val, 0)}ms`,
    `raf: ${allMeasurements.reduce((acc, [, , val]) => acc + val, 0)}ms`,
  ];
  if (!RAF) {
    totalMeasurements.pop();
  }
  setStatus(
    "-------\n" +
      totalMeasurements
        .map((s, i) => s.padEnd(i == 0 ? 50 : 15, " "))
        .join(" ") +
      "\n-------"
  );
  setStatus(
    `Autorun took ${Math.round(
      performance.measure(`autorun-complete`, `autorun-started`).duration -
        totalStepTime
    )} ms${
      totalStepTime > 0
        ? `. There were also ${Math.round(
            totalStepTime
          )}ms of actual timeouts between steps with ${
            step * permutations.length
          }ms expected.`
        : ""
    }`
  );
  running = false;
  document.querySelector("#show-logs").click();
});

// When a manual change happens we can just grab the current values, perform the query,
// and render. The individual functions are needed for autorun to get finer grained
// timing.
async function runQueryAndRender() {
  let sheet = currentSheet();
  let result = await runQuery(sheet);
  render(result, sheet);
}

async function runQuery(sheet) {
  let exec = await db.init();
  let result = await exec(sheet.sql);
  return result.result;
}

function render({ resultRows, columnNames }, title) {
  let step = performance.now();

  results.textContent = "";
  if (resultRows.length === 0) {
    return;
  }
  const container = document.createElement("div");
  results.append(container);
  const data = [columnNames, ...resultRows];
  let renderer = currentGrid();
  renderer({ container, data });
  if (title && renderer !== noop) {
    setStatus(
      `Grid creation for ${title}: ${Math.round(performance.now() - step)} ms`
    );
  }
}

if (currentSheet()) {
  runQueryAndRender();
}

setStatus("Initializing database");
db.init();
if (AUTORUN) {
  (async function () {
    await db.init();
    document.querySelector("#run").click();
  })();
}
