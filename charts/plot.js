import * as Plot from "@observablehq/plot";
import athletes from "/sample_data/athletes.js";

export function dotplot() {
  console.log(Plot, athletes);
  let dotplot = Plot.dot(athletes, {x: "weight", y: "height", stroke: "sex"}).plot()
  // Plot.rect(athletes, Plot.bin({fillOpacity: "count"}, {x: "weight", y: "height", fill: "sex"})).plot()
  // Plot.rectY(athletes, Plot.binX({y: "count"}, {x: "weight", fill: "sex"})).plot()
  // Plot.plot({
  //   grid: true,
  //   marks: [
  //     Plot.rectY(athletes, Plot.binX({y: "count"}, {x: "weight", fill: "sex", fy: "sex"})),
  //     Plot.ruleY([0])
  //   ]
  // })
}