import "./style.css";
// import "./sqlite_wasm/jswasm/sqlite3-worker1-promiser.js";

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
const config = {
  debug: false
    ? undefined
    : (...args) => console.debug("worker debug", ...args),
  onunhandled: function (ev) {
    console.error("Unhandled worker message:", ev.data);
  },
  onerror: function (ev) {
    console.error("worker error:", ev);
  },
  onready: async function () {
    let createScript = await fetch("create.sql").then((r) => r.text());
    await promiser("open", {
      filename: "northwind.db",
    });
    let total_sql_time = 0;

    async function exec(sql, container) {
      let s = performance.now();
      let result = await promiser("exec", {
        sql,
        resultRows: [],
        columnNames: [],
      });
      total_sql_time += performance.now() - s;
      console.log(`Query ${sql.substring(0, 100)} took`, performance.now() - s);
      return result;
    }

    await exec(createScript);

    if (lazy) {
      document.documentElement.classList.add("flexed");
      for (let sheet of sheets) {
        let button = document.createElement("button");
        button.innerText = sheet.title;
        button.onclick = async () => {
          document
            .querySelector("#sheets button.current")
            ?.classList.remove("current");
          button.classList.add("current");
          document.querySelector("main").innerHTML = "";
          let result = await exec(sheet.sql);
          create_grid(result.result.resultRows, result.result.columnNames);
        };
        document.querySelector("#sheets").append(button);
      }

      document.querySelector("#sheets button").click();

      return;
    }

    let result;
    result = await exec("select * from [Categories];");
    create_grid(result.result.resultRows, result.result.columnNames);
    result = await exec("select * from [CustomerCustomerDemo];");
    create_grid(result.result.resultRows, result.result.columnNames);
    result = await exec("select * from [CustomerDemographics];");
    create_grid(result.result.resultRows, result.result.columnNames);
    result = await exec("select * from [Customers];");
    create_grid(result.result.resultRows, result.result.columnNames);
    result = await exec("select * from [EmployeeTerritories];");
    create_grid(result.result.resultRows, result.result.columnNames);
    result = await exec("select * from [Employees];");
    create_grid(result.result.resultRows, result.result.columnNames);
    result = await exec("select * from [Order Details];");
    create_grid(result.result.resultRows, result.result.columnNames);
    result = await exec("select * from [Orders];");
    create_grid(result.result.resultRows, result.result.columnNames);
    result = await exec("select * from [Products];");
    create_grid(result.result.resultRows, result.result.columnNames);
    result = await exec("select * from [Regions];");
    create_grid(result.result.resultRows, result.result.columnNames);
    result = await exec("select * from [Shippers];");
    create_grid(result.result.resultRows, result.result.columnNames);
    result = await exec("select * from [Suppliers];");
    create_grid(result.result.resultRows, result.result.columnNames);
    result = await exec("select * from [Territories];");
    create_grid(result.result.resultRows, result.result.columnNames);

    console.log("Total sql time", total_sql_time);
  },
};

const promiser = self.sqlite3Worker1Promiser(config);

function create_grid(rows, columns) {
  const container = document.createElement("div");
  document.querySelector("#app").appendChild(container);
  const data = [columns, ...rows];
  console.log(data);
  // const hot = new Handsontable(container, {
  //   data,
  //   rowHeaders: true,
  //   colHeaders: true,
  //   licenseKey: "non-commercial-and-evaluation", // for non-commercial use only
  // });
}
