const letters = document.querySelectorAll("hq7-letter");
const guessBtn = document.querySelector("button");
const img = document.querySelector("img");
let imgBlur = 60;
let trys = 1;
let correctLetterNum = 0;
let letterNum = 0;
let gameName;
let gameNamewithDash;

const checkWinCondition = () => {
    if (correctLetterNum === gameName.length) {
        endAnimation(
            `You got it!`,
            `In ${trys}/5 trys, game name: ${gameNamewithDash}`
        );
        return true;
    }
    if (trys === 5) {
        endAnimation(
            `Better luck next time...`,
            `You ran out of trys :( game name: ${gameNamewithDash}`
        );
        return true;
    }
    return false;
};

const endTry = () => {
    console.log(trys);
    trys++;
    document.querySelector(".try").textContent = `${trys}/5`;
    imgBlur = trys <= 3 ? imgBlur - 20 : imgBlur - 5;
    console.log(imgBlur);
    img.style = `filter: blur(${imgBlur}px);`;
};

const endScan = () => {
    if (checkWinCondition()) {
        return;
    }
    endTry();
    guessBtn.disabled = false;
    letterNum = 0;
    correctLetterNum = 0;
    letters.forEach(letter => {
        letter.enableInput();
    });
};

const scanLetter = letter => {
    if (letter.letterValue == gameName[letterNum]) {
        letter.changeState("correct");
        correctLetterNum++;
    } else if (gameName.includes(letter.letterValue) && letter.letterValue) {
        letter.changeState("semiCorrect");
    } else {
        letter.changeState("incorrect");
    }
    letterNum++;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 300);
    });
};

const endAnimation = (title, description) => {
    import("./components/modal.js").then(file => {
        const textField = document.querySelector(".textField");
        const rows = document.querySelectorAll(".row");
        img.style = "filter: blur(0);";
        let x = 0;
        rows.forEach(row => {
            if (x % 2 == 0) {
                row.classList.add("moveRight");
            } else {
                row.classList.add("moveLeft");
            }
            ++x;
        });
        guessBtn.classList.add("gone");
        setTimeout(() => {
            textField.innerHTML = "";
            const element = document.createElement("hq7-modal");
            element.innerHTML = `
        <div slot="title">${title}</div> 
        <div slot="description">${description}</div>
        `;
            textField.appendChild(element);
        }, 1000);
    });
};

export const startScan = async name => {
    gameNamewithDash = name;
    gameName = name.replace(/-/gi, "");
    guessBtn.disabled = true;
    letters.forEach(letter => {
        letter.disableInput();
    });
    for (const letter of letters) {
        await scanLetter(letter);
    }
    endScan();
};
