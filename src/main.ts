import type { sportolo } from './sportolo';
import './style.css';

const URL_LINK: string = "https://retoolapi.dev/4vkBhL/data";
let data: sportolo[];

function printData() {
  const table: HTMLTableElement = (document.getElementById("table") as HTMLTableElement);
  table.innerHTML = `<tr>
    <th>Név</th>
    <th>Score</th>
    <th>Date</th>
    <th>Nyugdíjas</th>
  </tr>`;


  for (let i = 0; i < data.length; i++) {
    const item:sportolo = data[i];

    const row: HTMLTableRowElement = document.createElement("tr");

    const nameCel: HTMLTableCellElement = document.createElement("td");
    nameCel.innerText = item.name;

    const scoreCel: HTMLTableCellElement = document.createElement("td");
    scoreCel.innerText = item.score.toString();

    const dateCel: HTMLTableCellElement = document.createElement("td");
    dateCel.innerText = item.date.toString();

    const retiredCel: HTMLTableCellElement = document.createElement("td");
    retiredCel.innerText = (item.retired)? "igen":"nem";

    row.appendChild(nameCel);
    row.appendChild(scoreCel);
    row.appendChild(dateCel);
    row.appendChild(retiredCel);

    table.appendChild(row);
  }

}

async function loadData() {
  const response: Response = await fetch(URL_LINK);
  data = (await JSON.parse(await response.text())) as sportolo[];
  printData();
};

function init() {
  loadData();
}

document.addEventListener("DOMContentLoaded", init);