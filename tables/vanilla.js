import { html, render } from "lit-html";

function template(data) {
  return html`
    <table class="vanilla">
      <thead>
        <tr>
          ${data[0].map((key) => html`<th>${key}</th>`)}
        </tr>
      </thead>
      <tbody>
        ${data.slice(1).map(
          (row) => html`
            <tr>
              ${Object.values(row).map((value) => {
                if (value instanceof Uint8Array) {
                  return html`<td>
                    <img
                      width="100"
                      src="${URL.createObjectURL(
                        new Blob([value], { type: "image/png" })
                      )}"
                    />
                  </td>`;
                }
                return html`<td>${value}</td>`;
              })}
            </tr>
          `
        )}
      </tbody>
    </table>
  `;
}

export default function ({ data, container }) {
  let table = document.createElement("table");
  table.className = "vanilla";
  let thead = document.createElement("thead");
  let tr = document.createElement("tr");
  data[0].forEach((key) => {
    let th = document.createElement("th");
    th.textContent = key;
    tr.appendChild(th);
  });
  thead.appendChild(tr);
  table.appendChild(thead);
  let tbody = document.createElement("tbody");
  data.slice(1).forEach((row) => {
    let tr = document.createElement("tr");
    Object.values(row).forEach((value) => {
      let td = document.createElement("td");
      if (value instanceof Uint8Array) {
        let img = document.createElement("img");
        img.width = 100;
        img.src = URL.createObjectURL(new Blob([value], { type: "image/png" }));
        td.appendChild(img);
      } else {
        td.textContent = value;
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.appendChild(table);
}
