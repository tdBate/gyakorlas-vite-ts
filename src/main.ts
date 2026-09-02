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
    dateCel.innerText = new Date(item.date).toLocaleDateString('en-GB');

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

async function newData() {
  const name:HTMLInputElement = document.getElementById("inpName") as HTMLInputElement;
  const score:HTMLInputElement = document.getElementById("inpScore") as HTMLInputElement;
  const date:HTMLInputElement = document.getElementById("inpDate") as HTMLInputElement;
  const retired:HTMLInputElement = document.getElementById("inpRetired") as HTMLInputElement;

  const s1:sportolo = {name:name.value, score:parseInt(score.value), date: new Date(date.value), retired:retired.checked};
  data.push(s1);
  printData();

  const response = await fetch(URL_LINK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(s1) 
    });

  if (response.ok) {console.log("POST succesful");}
}

function init() {
  (document.getElementById("btnSend") as HTMLButtonElement).addEventListener("click", newData);

  loadData();
}

document.addEventListener("DOMContentLoaded", init);