import { focusPrevInput } from "./gameCreator.js";
const letters = document.querySelectorAll("hq7-letter");
const guessBtn = document.querySelector("button");
const img = document.querySelector(".imgHolder img");
let imgBlur = 30;
let rotateAmount = 0;
let trys = 1;
let correctLetterNum = 0;
let letterNum = 0;
let gameName;
let gameNamewithDash;

const checkWinCondition = () => {
    if (correctLetterNum === gameName.length) {
        import("./cookies.js").then(file => {
            file.createEndCookie(
                true,
                gameNamewithDash,
                img.getAttribute("src"),
                trys
            );
        });
        win();
        return true;
    }
    if (trys === 5) {
        import("./cookies.js").then(file => {
            file.createEndCookie(
                false,
                gameNamewithDash,
                img.getAttribute("src"),
                trys
            );
        });
        lose();
        return true;
    }
    return false;
};

export const win = (savedGameName = gameNamewithDash, savedTrys = trys) => {
    document.querySelector(':root').style.setProperty('--c2', 'hsl(120, 5%, 12%)'); 
    endAnimation(
        `You got it!`,
        `In ${savedTrys}/5 trys.<br /> game name: ${savedGameName}`
    );
};

export const lose = (savedGameName = gameNamewithDash) => {
    document.querySelector(':root').style.setProperty('--c2', 'hsl(0, 19%, 12%)'); 
    endAnimation(
        `Better luck next time...`,
        `You ran out of trys :(<br />game name: ${savedGameName}`
    );
};

const endTry = () => {
    trys++;
    document.querySelector(
        ".info"
    ).firstElementChild.style = `transform: rotate(${(rotateAmount += 90)}deg);`;
    document.querySelector(".try").textContent = `Trys: ${trys}/5`;
    document.querySelectorAll(".try")[1].textContent = `${trys}/5`;
    imgBlur = imgBlur - 5
    img.style = `filter: blur(${imgBlur}px);`; // filter: blur(30px);
};

const endScan = () => {
    if (checkWinCondition()) {
        return;
    }
    endTry();
    guessBtn.disabled = false;
    letterNum = 0;
    letters.forEach(letter => {
        letter.enableInput();
    });
};

const scanLetter = letter => {
    if (letter.letterValue == gameName[letterNum]) {
        letter.changeState("correct");
        letter.setAttribute("isItCorrect", "true");
        correctLetterNum++;
    } else if (gameName.includes(letter.letterValue) && letter.letterValue) {
        letter.changeState("semiCorrect");
    } else {
        letter.changeState("incorrect");
        letter.addEventListener("beforeinput", focusPrevInput);
    }
    letterNum++;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 300);
    });
};

const endAnimation = (title, description) => {
    document.querySelector('header').scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
    });
    const textField = document.querySelector(".textField");
    const content = document.querySelector(".contentWrap");
    img.style = "filter: blur(0px);";
    textField.classList.add("gone");
    guessBtn.classList.add("gone");
    setTimeout(() => {
        content.removeChild(textField);
        const element = document.createElement("div");
        const classState =
            title == "You got it!" ? "titleEnd win" : "titleEnd lose";
        element.classList.add("endText");
        element.innerHTML = `
            <div class='${classState}'>${title}</div>
            <div class="disEnd">${description}</div>
            `;
        content.appendChild(element);
    }, 700);
};

export const startScan = async name => {
    gameNamewithDash = name;
    gameName = name.replace(/-/gi, "");
    guessBtn.disabled = true;
    letters.forEach(letter => {
        letter.disableInput();
    });
    for (const letter of letters) {
        if (letter.getAttribute("isItCorrect") == "true") {
            letterNum++;
            continue;
        }
        await scanLetter(letter);
    }
    endScan();
};
