// deno run -A vendor.js

import { readCSVObjects } from "https://deno.land/x/csv/mod.ts";

async function get_athlete_data() {
  // From https://observablehq.com/@observablehq/plot
  const RESOURCE =
    "https://static.observableusercontent.com/files/31ca24545a0603dce099d10ee89ee5ae72d29fa55e8fc7c9ffb5ded87ac83060d80f1d9e21f4ae8eb04c1e8940b7287d179fe8060d887fb1f055f430e210007c?response-content-disposition=attachment%3Bfilename*%3DUTF-8%27%27athletes.csv";
  console.log(`Downloading athletes csv from ${RESOURCE}`);
  let resp = await fetch(RESOURCE);
  let text = await resp.text();
  await Deno.writeTextFile("sample_data/athletes.csv", text);
  const f = await Deno.open("sample_data/athletes.csv");

  let data = [];
  for await (const obj of readCSVObjects(f)) {
    data.push(obj);
  }

  await Deno.writeTextFile(
    "sample_data/athletes.json",
    JSON.stringify(data, null, 2)
  );
  await Deno.writeTextFile(
    "sample_data/athletes.js",
    `export default ${JSON.stringify(data, null, 2)}`
  );
}
async function get_northwind_data() {
  const RESOURCE =
    "https://raw.githubusercontent.com/jpwhite3/northwind-SQLite3/1c297ca0fb5fe36f9cd7b5a8afffece9a1f017d1/src/create.sql";
  console.log(`Downloading Northwind DB from ${RESOURCE}`);
  let resp = await fetch(RESOURCE);
  let text = await resp.text();
  await Deno.writeTextFile("public/create.sql", text);

  let create = Deno.readTextFileSync("public/create.sql");
  await Deno.writeTextFile(
    "sample_data/northwind.js",
    `export default ${JSON.stringify(create)}`
  );
}

await get_athlete_data();

await get_northwind_data();
