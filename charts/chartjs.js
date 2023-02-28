import Chart from "chart.js/auto";
// https://www.chartjs.org/docs/latest/getting-started/usage.html

export function bar({ width, height }) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  console.log("bar", width, height, canvas);
  new Chart(canvas, {
    type: "bar",
    data: {
      labels: data.map((row) => row.year),
      datasets: [
        {
          label: "Acquisitions by year",
          data: data.map((row) => row.count),
        },
      ],
    },
    options: {
      animation: false,
    },
  });

  return canvas;
}

export function polarArea({ width, height }) {
  const data = {
    labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
    datasets: [
      {
        label: "My First Dataset",
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  };
  const config = {
    type: "polarArea",
    data,
    options: {
      animation: false,
    },
  };

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  new Chart(canvas, config);
  return canvas;
}

export function scatter({ width, height }) {
  // https://www.chartjs.org/docs/latest/charts/scatter.html
  const data = {
    datasets: [
      {
        label: "Scatter Dataset",
        data: [
          {
            x: -10,
            y: 0,
          },
          {
            x: 0,
            y: 10,
          },
          {
            x: 10,
            y: 5,
          },
          {
            x: 0.5,
            y: 5.5,
          },
        ],
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  const config = {
    type: "scatter",
    data: data,
    options: {
      scales: {
        x: {
          type: "linear",
          position: "bottom",
        },
      },
      animation: false,
    },
  };
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  new Chart(canvas, config);
  return canvas;
}

export function radar({ width, height }) {
  // https://www.chartjs.org/docs/latest/charts/radar.html
  const data = {
    labels: [
      "Eating",
      "Drinking",
      "Sleeping",
      "Designing",
      "Coding",
      "Cycling",
      "Running",
    ],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "My Second Dataset",
        data: [28, 48, 40, 19, 96, 27, 100],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  };
  const config = {
    type: "radar",
    data: data,
    options: {
      elements: {
        line: {
          borderWidth: 3,
        },
      },
      animation: false,
    },
  };
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  new Chart(canvas, config);
  return canvas;
}
