import { randomGamePicker } from "./gameCreator.js";

const guessBtn = document.querySelector("button");
let trys = 0;
let correctLetterNum = 0;
let letterNum = 0;
let letters;
let gameName;

const app = async () => {
    gameName = await randomGamePicker();
    gameName = gameName.replace(/-/i, "");
    letters = document.querySelectorAll("hq7-letter");
};

app();

const checkWinCondition = () => {
    if (correctLetterNum === gameName.length) {
        success();
        return;
    }
    if (trys === 6) {
        fail();
        return;
    }
};

const endTry = () => {
    trys++;
    document.querySelector(".try").textContent = `${trys}/6`;
};

const endScan = () => {
    checkWinCondition();
    endTry();
    guessBtn.disabled = false;
    letterNum = 0;
    letters.forEach(letter => {
        letter.enableInput();
    })
};

const scanLetter = letter => {
    if (letter.letterValue == gameName[letterNum++]) {
        letter.changeState("correct");
        correctLetterNum++;
        
    }
    else if (gameName.includes(letter.letterValue) && letter.letterValue) {
        letter.changeState("semiCorrect");
    } else {
        letter.changeState("incorrect");
    }
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
          }, 300);
    })
    
};

const startScan = async () => {
    guessBtn.disabled = true;
    letters.forEach(letter => {
        letter.disableInput();
    })
    for (const letter of letters) {
        await scanLetter(letter);
    }
    endScan();
};

const success = () => {};

const fail = () => {};

guessBtn.addEventListener("click", startScan);
