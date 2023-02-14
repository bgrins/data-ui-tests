import "./style.css";
import * as db from "./db.js";
console.log(db);

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

(async () => {
  let exec = await db.init();
  for (let { title, sql } of sheets) {
    let result = await exec(sql);
    console.log(title, result, db.total_sql_time);
    create_grid(result.result.resultRows, result.result.columnNames);
  }
})();

function create_grid(rows, columns) {
  const container = document.createElement("div");
  document.querySelector("#app").appendChild(container);
  const data = [columns, ...rows];
  console.log(data);
  container.textContent = JSON.stringify(data, null, 2);
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
