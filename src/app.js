import { LetterInput } from "./LetterInput.js";

const api = "f4f38cf257144c4798846f1ae1884446";
let game;

const randomGamePicker = async () => {
  const randomPageNum = Math.floor(Math.random() * 10) + 1;
  const randomGameNum = Math.floor(Math.random() * 20);
  game = await fetch(
    `https://api.rawg.io/api/games?key=${api}&dates=2015-01-01,2023-01-01&ordering=-added&page=${randomPageNum}`
  )
    .then(result => result.json())
    .then(result => result.results[randomGameNum])
    .catch(error => {});
  console.log(game);

  imgRenderer();
  createInput();
};

const imgRenderer = () => {
  const imgElement = document.querySelector("img");
  imgElement.src = game.background_image;
};

const getLetterSize = () => {
  let LargestWordLength = 0;
  let numOfRow = 0;
  for (let i = 0; i < game.slug.length; i++) {
    let j = i;
    for (; j < game.slug.length; j++) {
      if (game.slug[j] == "-" || game.slug[j] == "_") {
        break;
      }
    }
    numOfRow++;
    j = j - i;
    LargestWordLength = j > LargestWordLength ? j : LargestWordLength;
    i = i + j;
  }
  return LargestWordLength + numOfRow;
};

const createInput = () => {
  const textField = document.querySelector(".textField");
  const sizeOfElement =
    textField.getClientRects()[0].width / getLetterSize();
  let row = document.createElement("div");
  row.className = "row";
  for (let i = 0; i < game.slug.length; i++) {
    if (game.slug[i] == "-" || game.slug[i] == "_") {
      textField.appendChild(row);
      row = document.createElement("div");
      row.className = "row";
      continue;
    }
    const newLetter = document.createElement("hq7-letter");
    newLetter.style = `width: min(${sizeOfElement}px,30px)`;
    row.appendChild(newLetter);
  }
  textField.appendChild(row);
};

randomGamePicker();
