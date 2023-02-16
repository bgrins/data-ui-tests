import sparkline from "@fnando/sparkline";

// https://github.com/fnando/sparkline
// https://codepen.io/fnando/full/KyZLLV/

/* 
svg + svg {
  margin-left: 20px;
}

.sparkline {
  fill: none;
}

.sparkline--red {
  stroke: #dc2b33;
}

.sparkline--red.sparkline--filled {
  fill: rgba(220, 43, 51, 0.3);
}

.sparkline--blue {
  stroke: #3d85de;
}

.sparkline--blue.sparkline--filled {
  fill: rgba(61, 133, 222, 0.3);
}

.sparkline--green {
  stroke: #4c9b4c;
}

.sparkline--green.sparkline--filled {
  fill: rgba(76, 155, 76, 0.3);
}

.sparkline--gray {
  stroke: #777;
}

.sparkline--gray.sparkline--filled {
  fill: rgba(119, 119, 119, 0.3);
}

.sparkline--orange {
  stroke: #e36023;
}

.sparkline--orange.sparkline--filled {
  fill: rgba(227, 96, 35, 0.3);
}

.sparkline--purple {
  stroke: #573585;
}

.sparkline--purple.sparkline--filled {
  fill: rgba(87, 53, 133, 0.3);
}

.sparkline--yellow {
  stroke: #fdd700;
}

.sparkline--yellow.sparkline--filled {
  fill: rgba(253, 215, 0, 0.3);
}

.sparkline--pink {
  stroke: #db3b9e;
}

.sparkline--pink.sparkline--filled {
  fill: rgba(219, 59, 158, 0.3);
}
*/

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

function randNumbers() {
  var numbers = [];

  for (var i = 0; i < 20; i += 1) {
    numbers.push(Math.random() * 50);
  }

  return numbers;
}

export function random({ width, height }) {

  var keys = Object.keys(colors);
  let color = keys[Math.floor(Math.random() * keys.length)];
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("stroke-width", "3");
  svg.setAttribute("stroke", color);
  svg.setAttribute("fill", color);
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("class", "sparkline");

  sparkline(svg, randNumbers());
  return svg;
  // return sparkline(
  //   sparkline(svg, width, height),
  //   randNumbers()
  // );
}

// setInterval(function() {
//   document.querySelectorAll(".sparkline").forEach(function(svg) {
//     sparkline.sparkline(svg, randNumbers());
//   });
// }, 1000);
