import "./style.css";
import * as db from "./db.js";
import * as d3 from "d3";
import { pie } from "./charts/d3.js";
import { dotplot } from "./charts/plot.js";
import vanilla_table from "./tables/vanilla.js";

console.log(pie, dotplot);

let results = document.querySelector("#results");

let chartID = 0;
function createChartElement() {
  const chart = document.createElement("div");
  chart.id = `chart${chartID++}`;
  results.appendChild(chart);
  return chart;
}
pie({ querySelector: `#${createChartElement().id}` });

function setStatus(text) {
  document.querySelector("#status").textContent = text;
}

db.emitter.addEventListener("execcomplete", (e) => {
  setStatus(`Query took ${e.detail.time}ms`);
});

setStatus("Initializing database");
// select ProductID, COUNT(*) from [Order Details] GROUP BY ProductID

// if get param is set then don't eagerly load the worker
const lazy = new URLSearchParams(window.location.search).has("lazy");
const sheets = [
  { title: "Categories", sql: "select * from [Categories];" },
  {
    title: "CustomerCustomerDemo",
    sql: "select * from [CustomerCustomerDemo];",
  },
  {
    title: "CustomerDemographics",
    sql: "select * from [CustomerDemographics];",
  },
  { title: "Customers", sql: "select * from [Customers];" },
  {
    title: "EmployeeTerritories",
    sql: "select * from [EmployeeTerritories];",
  },
  { title: "Employees", sql: "select * from [Employees];" },
  { title: "Order Details", sql: "select * from [Order Details];" },
  { title: "Orders", sql: "select * from [Orders];" },
  { title: "Products", sql: "select * from [Products];" },
  { title: "Regions", sql: "select * from [Regions];" },
  { title: "Shippers", sql: "select * from [Shippers];" },
  { title: "Suppliers", sql: "select * from [Suppliers];" },
  { title: "Territories", sql: "select * from [Territories];" },
];

for (let { title, sql } of sheets) {
  // append to query-options
  let input = document.createElement("input");
  input.type = "radio";
  input.name = "query";
  input.value = sql;
  input.id = `query-${title}`;
  input.checked = title === "Categories";
  let label = document.createElement("label");
  label.textContent = title;
  label.htmlFor = `query-${title}`;
  document.querySelector("#query-options").append(input, label);
}

function create_grid(rows, columns) {
  const container = document.createElement("div");
  results.append(container);
  const data = [columns, ...rows];
  console.log(data);
  vanilla_table({ container, data });
}

// for (let sheet of sheets) {
//   let button = document.createElement("button");
//   button.innerText = sheet.title;
//   button.onclick = async () => {
//     document
//       .querySelector("#sheets button.current")
//       ?.classList.remove("current");
//     button.classList.add("current");
//     document.querySelector("main").innerHTML = "";
//     let result = await exec(sheet.sql);
//     create_grid(result.result.resultRows, result.result.columnNames);
//   };
//   document.querySelector("#sheets").append(button);
// }

// document.querySelector("#sheets button").click();

function runQueries() {
  (async () => {
    let exec = await db.init();
    for (let { title, sql } of sheets) {
      let result = await exec(sql);
      console.log(title, result, db.total_sql_time);
      let { resultRows, columnNames } = result.result;
      if (resultRows.length === 0) {
        continue;
      }
      create_grid(resultRows, columnNames);
    }
  })();
}

runQueries();
