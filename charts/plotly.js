// Seems broken with
/* 

✘ [ERROR] Could not resolve "buffer/"

    node_modules/plotly.js/src/traces/image/helpers.js:5:21:
      5 │ var Buffer = require('buffer/').Buffer;  // note: the trailing slash is important!
        ╵                      ~~~~~~~~~

  You can mark the path "buffer/" as external to exclude it from the bundle, which will remove this
  error. You can also surround this "require" call with a try/catch block to handle this failure at
  run-time instead of bundle-time.

  */

// Installing plotly directly is broken with vite ([ERROR] Could not resolve "buffer/"), so use plotly.js-dist-min
// See https://community.plotly.com/t/how-to-initiate-and-build-a-plotly-js-project-using-vite/65701/2

import figure from "/sample_data/3d_ribbon.js";
import Plotly from "plotly.js-dist-min";

// https://plotly.com/javascript/ribbon-plots/

export function ribbon({ container, width, height }) {
  var trace1 = {
    x: figure.data[0].x,
    y: figure.data[0].y,
    z: figure.data[0].z,

    name: "",

    colorscale: figure.data[0].colorscale,

    type: "surface",

    showscale: false,
  };

  var trace2 = {
    x: figure.data[1].x,
    y: figure.data[1].y,
    z: figure.data[1].z,

    name: "",

    colorscale: figure.data[1].colorscale,

    type: "surface",

    showscale: false,
  };

  var trace3 = {
    x: figure.data[2].x,
    y: figure.data[2].y,
    z: figure.data[2].z,

    colorscale: figure.data[2].colorscale,

    type: "surface",

    showscale: false,
  };

  var trace4 = {
    x: figure.data[3].x,
    y: figure.data[3].y,
    z: figure.data[3].z,

    colorscale: figure.data[3].colorscale,

    type: "surface",

    showscale: false,
  };

  var trace5 = {
    x: figure.data[4].x,
    y: figure.data[4].y,
    z: figure.data[4].z,

    colorscale: figure.data[4].colorscale,

    type: "surface",

    showscale: false,
  };

  var trace6 = {
    x: figure.data[5].x,
    y: figure.data[5].y,
    z: figure.data[5].z,

    colorscale: figure.data[5].colorscale,

    type: "surface",

    showscale: false,
  };

  var trace7 = {
    x: figure.data[6].x,
    y: figure.data[6].y,
    z: figure.data[6].z,

    name: "",

    colorscale: figure.data[6].colorscale,

    type: "surface",

    showscale: false,
  };

  var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7];

  var layout = {
    title: "Ribbon Plot",

    showlegend: false,
    autosize: true,

    width,

    height,

    scene: {
      xaxis: { title: "Sample #" },

      yaxis: { title: "Wavelength" },

      zaxis: { title: "OD" },
    },
  };

  Plotly.newPlot(container, data, layout);
}
