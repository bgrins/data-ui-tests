import * as d3 from "d3";

export function pie({
  data = { a: 9, b: 20, c: 30, d: 8, e: 12 },
  querySelector,
  width = 450,
  height = 450,
  margin = 40,
}) {
  console.log(data, querySelector, width, height, margin);
}
