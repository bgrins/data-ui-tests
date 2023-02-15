import * as d3 from "d3";
import revenue_by_music_format from "../sample_data/revenue_by_music_format.js";
const data = revenue_by_music_format.map((r) => {
  return {
    name: r.Format,
    year: +r.Year,
    value: +r["Revenue (Inflation Adjusted)"],
  };
});

console.log(d3);

export function pie({
  data = { a: 9, b: 20, c: 30, d: 8, e: 12 },
  querySelector,
  width = 450,
  height = 450,
  margin = 40,
}) {
  console.log(data, querySelector, width, height, margin);
}

function formatRevenue() {
  return (x) =>
    +(x / 1e9).toFixed(2) >= 1
      ? `${(x / 1e9).toFixed(2)}B`
      : `${(x / 1e6).toFixed(0)}M`;
}
export function musicRevenue({ querySelector, width, height }) {
  // https://observablehq.com/@mbostock/revenue-by-music-format-1973-2018
  // ISC license

  const colors = new Map([
    ["LP/EP", "#2A5784"],
    ["Vinyl Single", "#43719F"],
    ["8 - Track", "#5B8DB8"],
    ["Cassette", "#7AAAD0"],
    ["Cassette Single", "#9BC7E4"],
    ["Other Tapes", "#BADDF1"],
    ["Kiosk", "#E1575A"],
    ["CD", "#EE7423"],
    ["CD Single", "#F59D3D"],
    ["SACD", "#FFC686"],
    ["DVD Audio", "#9D7760"],
    ["Music Video (Physical)", "#F1CF63"],
    ["Download Album", "#7C4D79"],
    ["Download Single", "#9B6A97"],
    ["Ringtones & Ringbacks", "#BE89AC"],
    ["Download Music Video", "#D5A5C4"],
    ["Other Digital", "#EFC9E6"],
    ["Synchronization", "#BBB1AC"],
    ["Paid Subscription", "#24693D"],
    ["On-Demand Streaming (Ad-Supported)", "#398949"],
    ["Other Ad-Supported Streaming", "#61AA57"],
    ["SoundExchange Distributions", "#7DC470"],
    ["Limited Tier Paid Subscription", "#B4E0A7"],
  ]);
  const margin = { top: 20, right: 30, bottom: 30, left: 30 };
  function color() {
    console.log(d3.scaleOrdinal);
    return d3.scaleOrdinal().domain(colors.keys()).range(colors.values());
  }
  function xAxis(height, margin) {
    return (g) =>
      g.attr("transform", `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(x)
          .tickValues(d3.ticks(...d3.extent(x().domain()), width / 80))
          .tickSizeOuter(0)
      );
  }
  function yAxis(margin, y) {
    return (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickFormat((x) => (x / 1e9).toFixed(0)))
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .select(".tick:last-of-type text")
            .clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(data.y)
        );
  }

  function x(width) {
    return d3
      .scaleBand()
      .domain(data.map((d) => d.year))
      .rangeRound([margin.left, width - margin.right]);
  }

  function y(height) {
    return d3
      .scaleLinear()
      .domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1]))])
      .nice()
      .range([height - margin.bottom, margin.top]);
  }

  let series = d3
    .stack()
    .keys(colors.keys())
    .value((group, key) => group.get(key).value)
    .order(d3.stackOrderReverse)(
      d3
        .rollup(
          data,
          ([d]) => d,
          (d) => d.year,
          (d) => d.name
        )
        .values()
    )
    .map((s) => (s.forEach((d) => (d.data = d.data.get(s.key))), s));

  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

  svg
    .append("g")
    .selectAll("g")
    .data(series)
    .join("g")
    .attr("fill", ({ key }) => color(key))
    .call((g) =>
      g
        .selectAll("rect")
        .data((d) => d)
        .join("rect")
        .attr("x", (d) => x(d.data.year))
        .attr("y", (d) => y(d[1]))
        .attr("width", x().bandwidth() - 1)
        .attr("height", (d) => y(d[0]) - y(d[1]))
        .append("title")
        .text(
          (d) => `${d.data.name}, ${d.data.year}
${formatRevenue(d.data.value)}`
        )
    );

  svg.append("g").call(xAxis);

  svg.append("g").call(yAxis);

  let node = svg.node();
  document.querySelector(querySelector).appendChild(node);
  // return svg.node();
}
