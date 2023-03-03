import * as d3 from "d3";
import { hexbin as d3Hexbin } from "d3-hexbin";

async function fetchUrl(file) {
  const url = new URL(`./data/${file}`, import.meta.url).href;
  return fetch(url);
}

async function fetchData(file) {
  const res = await fetchUrl(file);
  return res.text();
}

const datasets = await (async function () {
  // This looks complicated but will make it possible to parallely fetch
  // additional data in the future.
  // Just add more fetch operations to the array if needed.
  const [diamonds] = await Promise.all(["diamonds.csv"].map(fetchData));
  return {
    diamonds,
  };
})();

export async function diamonds({ container, width, height }) {
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const radius = 8;

  const data = Object.assign(
    d3.csvParse(datasets.diamonds, ({ carat, price }) => ({
      x: +carat,
      y: +price,
    })),
    { x: "Carats", y: "$ Price" }
  );
  const xAxis = (g) =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80, ""))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", width - margin.right)
          .attr("y", -4)
          .attr("fill", "currentColor")
          .attr("font-weight", "bold")
          .attr("text-anchor", "end")
          .text(data.x)
      );

  const yAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, ".1s"))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", 4)
          .attr("y", margin.top)
          .attr("dy", ".71em")
          .attr("fill", "currentColor")
          .attr("font-weight", "bold")
          .attr("text-anchor", "start")
          .text(data.y)
      );

  const x = d3
    .scaleLog()
    .domain(d3.extent(data, (d) => d.x))
    .rangeRound([margin.left, width - margin.right]);
  const y = d3
    .scaleLog()
    .domain(d3.extent(data, (d) => d.y))
    .rangeRound([height - margin.bottom, margin.top]);

  const hexbin = d3Hexbin()
    .x((d) => x(d.x))
    .y((d) => y(d.y))
    .radius((radius * width) / (height - 1))
    .extent([
      [margin.left, margin.top],
      [width - margin.right, height - margin.bottom],
    ]);

  const bins = hexbin(data);

  const color = d3
    .scaleSequential(d3.interpolateBuPu)
    .domain([0, d3.max(bins, (d) => d.length) / 2]);

  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

  svg.append("g").call(xAxis);

  svg.append("g").call(yAxis);

  svg
    .append("g")
    .attr("stroke", "#000")
    .attr("stroke-opacity", 0.1)
    .selectAll("path")
    .data(bins)
    .join("path")
    .attr("d", hexbin.hexagon())
    .attr("transform", (d) => `translate(${d.x},${d.y})`)
    .attr("fill", (d) => color(d.length));

  container.append(svg.node());
}
