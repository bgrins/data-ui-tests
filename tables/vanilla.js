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
                  return html`<td><img width="100" src="${URL.createObjectURL(
                    new Blob([value], { type: "image/png" })
                  )}" /></td>`;
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
  render(template(data), container);
}
