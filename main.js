import "/style.css";
import * as db from "./db.js";
import vanilla_table from "./tables/vanilla.js";

let results = document.querySelector("#results");
let statuses = [];
const DEFAULT_SHEET = new URLSearchParams(window.location.search).get("sheet");
let AUTORUN = new URLSearchParams(window.location.search).has("autorun");

function setStatus(text) {
  document.querySelector("#status").textContent = text;
  statuses.push(text);
  document.querySelector("#logs pre").textContent = statuses.join("\n");
}

document.addEventListener("keypress", (e) => {
  if (e.key === "l") {
    document.querySelector("#show-logs").click();
  }
});

document.querySelector("#show-logs").addEventListener("click", () => {
  document.querySelector("#logs").showModal();
});

db.emitter.addEventListener("execcomplete", (e) => {
  console.log(e.detail);
  setStatus(e.detail.message);
  document.querySelector(
    "#total-db-ms"
  ).textContent = `${db.total_sql_time} total ms in db`;
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

const activeSheet = () =>
  sheets.find(
    (el) =>
      el.title == document.querySelector("input[name=query]:checked")?.value
  );
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

document.querySelector("#query-options").addEventListener("change", (e) => {
  if (e.target.name === "query") {
    setStatus(`Sheet changed to ${e.target.value}`);
    runQuery(activeSheet());
  }
});

let running = false;
document.querySelector("#run").addEventListener("click", async () => {
  if (running) {
    console.log("Currently running, ignoring request");
    return;
  }
  running = true;
  setStatus(`Autorun started`);
  let start = performance.now();
  for (let option of document.querySelectorAll("#query-options input")) {
    option.checked = true;
    await runQuery(activeSheet());
  }
  setStatus(`All sheets rendered in ${Math.round(performance.now() - start)} ms`);
  running = false;
  // First time run should open logs immediately if autorunning
  if (AUTORUN) {
    document.querySelector("#show-logs").click();
    AUTORUN = false;
  }
});

function create_grid(rows, columns) {
  const container = document.createElement("div");
  results.append(container);
  const data = [columns, ...rows];
  vanilla_table({ container, data });
}
async function runQuery({ title, sql }) {
  results.textContent = "";
  let exec = await db.init();
  let result = await exec(sql);
  console.log(title, result);
  let { resultRows, columnNames } = result.result;
  if (resultRows.length === 0) {
    return;
  }
  let step = performance.now();
  let grid = create_grid(resultRows, columnNames);
  setStatus(
    `Grid creation for ${title}: ${Math.round(
      performance.now() - step
    )} ms`
  );
  return {
    result,
    grid,
  };
}

if (activeSheet()) {
  runQuery(activeSheet());
}

setStatus("Initializing database");
db.init();
if (AUTORUN) {
  (async function () {
    await db.init();
    document.querySelector("#run").click();
  })();
}
