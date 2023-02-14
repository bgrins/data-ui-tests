// import northwind_create from "/sample_data/northwind.js";
let db = null;
export let total_sql_time = 0;

export function init() {
  if (db) {
    return db;
  }
  db = new Promise(async (resolve) => {
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
        let northwind_create = await fetch("create.sql").then((r) => r.text());
        await promiser("open", {
          filename: "northwind.db",
        });

        async function exec(sql) {
          let s = performance.now();
          let result = await promiser("exec", {
            sql,
            resultRows: [],
            columnNames: [],
          });
          total_sql_time += performance.now() - s;
          console.log(
            `Query ${sql.substring(0, 100)} took`,
            performance.now() - s
          );
          return result;
        }

        await exec(northwind_create);

        resolve(exec);
      },
    };

    const promiser = self.sqlite3Worker1Promiser(config);
  });
  return db;
}
