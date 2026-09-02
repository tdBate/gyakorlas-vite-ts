import './style.css';

const URL_LINK: string = "https://retoolapi.dev/4vkBhL/data";
let data;

function printData() {
  const table:HTMLTableElement = (document.getElementById("table") as HTMLTableElement);
  table.innerHTML = "";

  const row:HTMLTableRowElement = document.createElement("tr");


}

async function loadData() {
  const response:Response = await fetch(URL_LINK);
  data = await JSON.parse(await response.text());

  printData();
};

function init() {
  loadData();
}

document.addEventListener("DOMContentLoaded", init);