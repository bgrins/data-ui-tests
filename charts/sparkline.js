import sparkline from "@fnando/sparkline";

// https://github.com/fnando/sparkline
// https://codepen.io/fnando/full/KyZLLV/

const colors = {
  red: "#dc2b33",
  blue: "#3d85de",
  green: "#4c9b4c",
  gray: "#777",
  orange: "#e36023",
  purple: "#573585",
  yellow: "#fdd700",
  pink: "#db3b9e",
};

const series_one = [
  17, 12, 6, 17, 18, 23, 20, 15, 17, 14, 5, 20, 23, 6, 6, 23, 19, 6, 17, 12, 8,
  22, 6, 9, 18, 23, 16, 20, 25, 12, 7, 14, 16, 12, 17, 21, 18, 13, 8, 8, 22, 17,
  9, 19, 13, 6, 23, 11, 11, 9, 22, 16,
];
const series_two = [
  25, 21, 13, 10, 19, 10, 24, 20, 8, 21, 23, 9, 9, 6, 23, 16, 9, 8, 22, 20, 17,
  20, 18, 22, 11, 14, 18, 23, 16, 20, 17, 19, 9, 9, 8, 7, 17, 16, 22, 14, 8, 21,
  6, 9, 19, 5, 9, 12, 20, 11, 8, 24,
];
// function randNumbers() {
//   var numbers = [];

//   for (var i = 0; i < 52; i += 1) {
//     numbers.push(Math.round(Math.random() * 20 + 5));
//   }

//   return numbers;
// }

function spark({ width, height }, series, color) {
  // var keys = Object.keys(colors);
  // let color = keys[Math.floor(Math.random() * keys.length)];
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("stroke-width", "3");
  svg.setAttribute("stroke", color);
  svg.setAttribute("fill", color);
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("class", "sparkline");

  sparkline(svg, series);
  return svg;
}
export function one({ width, height }) {
  return spark({ width, height }, series_one, colors.blue);
}
export function two({ width, height }) {
  return spark({ width, height }, series_two, colors.red);
}

// setInterval(function() {
//   document.querySelectorAll(".sparkline").forEach(function(svg) {
//     sparkline.sparkline(svg, randNumbers());
//   });
// }, 1000);
