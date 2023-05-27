import { LetterInput } from "./LetterInput.js";

const api = "f4f38cf257144c4798846f1ae1884446";
let game;

export const randomGamePicker = async () => {
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
  return game.slug
};

const imgRenderer = () => {
  const imgElement = document.querySelector("img");
  imgElement.src = game.background_image;
};

const getLetterSize = () => {
  let LargestWordLength = 0;
  const words = game.slug.split("-");
  words.forEach(word => {
    LargestWordLength =
      word.length > LargestWordLength ? word.length : LargestWordLength;
  });
  return LargestWordLength + words.length;
};

const focusNextInput = event => {
  const element = event.target;
  const elementNextSibling = element.nextElementSibling;
  const elementNextCousin = element.parentElement.nextElementSibling
    ? element.parentElement.nextElementSibling.firstElementChild
    : null;
  if (event.inputType == "insertText") {
    if (elementNextSibling) {
      elementNextSibling.focusElement();
      return;
    }
    if (elementNextCousin) {
      elementNextCousin.focusElement();
    }
  }
  focusPrevInput(event);
};

const focusPrevInput = event => {
  const element = event.target;
  const elementPrevSibling = element.previousElementSibling;
  const elementPrevCousin = element.parentElement.previousElementSibling
    ? element.parentElement.previousElementSibling.lastElementChild
    : null;
  if (event.inputType == "deleteContentBackward") {
    if (elementPrevSibling) {
      elementPrevSibling.focusElement();
      return;
    }
    if (elementPrevCousin) {
      elementPrevCousin.focusElement();
    }
  }
};

const createInput = () => {
  const textField = document.querySelector(".textField");
  const sizeOfElement = textField.getClientRects()[0].width / getLetterSize();
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
    newLetter.addEventListener("input", focusNextInput);
    row.appendChild(newLetter);
  }
  textField.appendChild(row);
};
