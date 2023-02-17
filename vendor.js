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

async function get_revenue_by_music_format_data() {
  // https://observablehq.com/@mbostock/revenue-by-music-format-1973-2018
  // From https://observablehq.com/@observablehq/plot
  const RESOURCE =
    "https://static.observableusercontent.com/files/bc1d6e93fd1c8625c67a7afb0406aa0e6d956c0719b8b6f0b0348dc86f9f8f1423e1e157dcda317c9d13622598699a0b3feca27b361f934033ce302f88230607?response-content-disposition=attachment%3Bfilename*%3DUTF-8%27%27music.csv";
  console.log(`Downloading revenue csv from ${RESOURCE}`);
  let resp = await fetch(RESOURCE);
  let text = await resp.text();
  await Deno.writeTextFile("sample_data/revenue_by_music_format.csv", text);
  const f = await Deno.open("sample_data/revenue_by_music_format.csv");
  let data = [];
  for await (const obj of readCSVObjects(f)) {
    data.push(obj);
  }
  await Deno.writeTextFile(
    "sample_data/revenue_by_music_format.js",
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

async function get_ribbon_data() {
  const RESOURCE =
    "https://raw.githubusercontent.com/plotly/datasets/master/3d-ribbon.json";
  let resp = await fetch(RESOURCE);
  let text = await resp.text();
  await Deno.writeTextFile(
    "sample_data/3d_ribbon.js",
    `export default ${JSON.stringify(JSON.parse(text))}`
  );
}

await get_athlete_data();
await get_revenue_by_music_format_data();
await get_northwind_data();
await get_ribbon_data();
