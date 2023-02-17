// https://echarts.apache.org/handbook/en/basics/import
import * as echarts from "echarts";

export function bar({ width, height }) {
  // Create the echarts instance
  const container = document.createElement("div");
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;

  var myChart = echarts.init(container);

  // Draw the chart
  myChart.setOption({
    title: {
      text: "ECharts Getting Started Example",
    },
    tooltip: {},
    xAxis: {
      data: ["shirt", "cardigan", "chiffon", "pants", "heels", "socks"],
    },
    yAxis: {},
    series: [
      {
        name: "sales",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });

  return container;
}
