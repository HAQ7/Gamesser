import { LetterInput } from "./components/LetterInput.js";
let game;

export const randomGamePicker = async () => {
    const randomPageNum = Math.floor(Math.random() * 10) + 1;
    const randomGameNum = Math.floor(Math.random() * 20);
    game = await fetch(
        `https://api.rawg.io/api/games?key=f4f38cf257144c4798846f1ae1884446&dates=2015-01-01,2023-01-01&page=${randomPageNum}`
    )
        .then(result => result.json())
        .then(result => result.results[randomGameNum])
        .catch(error => {
            import("./components/Modal.js").then(() => {
                const textField = document.querySelector(".textField");
                textField.innerHTML = "";
                const element = document.createElement("hq7-modal");
                element.innerHTML = `
                <div slot="title">Error</div>
                <p slot="description">Could not get the game, try to refresh the page</p>
            `;
                textField.appendChild(element);
            });
        });
    imgRenderer();
    document.querySelector(".spinner").remove();
    createInput();
    return game.slug;
};

const imgRenderer = () => {
    const imgElement = document.querySelector("section>img");
    imgElement.src = game.background_image;
};

const getLetterSize = () => {
    let LargestWordLength = 0;
    const words = game.slug.split("-");
    words.forEach(word => {
        LargestWordLength =
            word.length > LargestWordLength ? word.length : LargestWordLength;
    });
    return LargestWordLength + 5;
};

const focusNextInput = event => {
    let element = event.target;
    let elementNextSibling;
    let elementNextCousin;
    if (event.inputType == "insertText") {
        do {
            elementNextSibling = element.nextElementSibling;
            if (elementNextSibling) {
                element = elementNextSibling;
                continue;
            }
            elementNextCousin = element.parentElement.nextElementSibling
                ? element.parentElement.nextElementSibling.firstElementChild
                : null;
            if (elementNextCousin) {
                element = elementNextCousin;
                continue;
            }
            return;
        } while (element.getAttribute("isItCorrect") == "true");
        element.focusElement();
    }
};

export const focusPrevInput = event => {
    let element = event.target;
    let elementPrevSibling;
    let elementPrevCousin;
    if (event.inputType == "deleteContentBackward") {
        do {
            elementPrevSibling = element.previousElementSibling;
            if (elementPrevSibling) {
                element = elementPrevSibling;
                continue;
            }
            elementPrevCousin = element.parentElement.previousElementSibling
                ? element.parentElement.previousElementSibling.lastElementChild
                : null;
            if (elementPrevCousin) {
                element = elementPrevCousin;
                continue;
            }
            return;
        } while (element.getAttribute("isItCorrect") == "true");
        element.focusElement();
    }
};

const createInput = () => {
    const textField = document.querySelector(".textField");
    const sizeOfElement =
        document.body.getClientRects()[0].width / getLetterSize();
    let row = document.createElement("div");
    row.className = "row";
    for (let i = 0; i < game.slug.length; i++) {
        if (game.slug[i] == "-" || game.slug[i] == "_") {
            textField.insertBefore(row, document.querySelector("button"));
            row = document.createElement("div");
            row.className = "row";
            continue;
        }
        const newLetter = document.createElement("hq7-letter");
        newLetter.style = `width: min(${sizeOfElement}px,30px)`;
        newLetter.addEventListener("beforeinput", focusPrevInput);
        newLetter.addEventListener("input", event => {
            let changedEle = event.target;
            if (changedEle.letterValue != "") {
                changedEle.removeEventListener("beforeinput", focusPrevInput);
            }
            if (changedEle.letterValue == "") {
                changedEle.addEventListener("beforeinput", focusPrevInput);
            }
            focusNextInput(event);
        });
        row.appendChild(newLetter);
    }
    textField.insertBefore(row, document.querySelector("button"));
};
