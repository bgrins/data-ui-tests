// https://github.com/revolist/revogrid/blob/7d3f626f66056f68b3b3ed37b4b1387091bfe27f/docs/indexmodule.md
import { defineCustomElements } from "@revolist/revogrid/loader/index.es2017.js";
defineCustomElements();

// https://github.com/revolist/revogrid

export default function ({ data, container }) {
  const grid = document.createElement("revo-grid");
  grid.classList.add("grid-component");
  // console.log(data);

  const columns = data[0].map((key) => ({
    prop: key,
    name: key,
    cellTemplate: (createElement, props) => {
      // console.log("Calling cell template");
      if (props.data[props.rowIndex][props.prop] instanceof Uint8Array) {
        let url = URL.createObjectURL(
          new Blob([props.data[props.rowIndex][props.prop]], {
            type: "image/png",
          })
        );
        return createElement("img", {
          src: url,
        });
      }
      return createElement("div", null, props.model[props.prop] || "");
    },
  }));
  const items = data.slice(1).map((row) => {
    const item = {};
    for (let i = 0; i < row.length; i++) {
      item[data[0][i]] = row[i];
    }
    return item;
  });

  grid.columns = columns;
  grid.source = items;
  container.append(grid);

  return {
    scrollToBottom() {

    },
    scrollToTop() {

    }
  }
}
