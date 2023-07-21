import { focusPrevInput } from './gameCreator.js';
const letters = document.querySelectorAll('hq7-letter');
const guessBtn = document.querySelector('button');
const img = document.querySelector('img');
let imgBlur = 60;
let trys = 1;
let correctLetterNum = 0;
let letterNum = 0;
let gameName;
let gameNamewithDash;

const checkWinCondition = () => {
  if (correctLetterNum === gameName.length) {
    import('./cookies.js').then((file) => {
      file.createCookie(true, gameNamewithDash, img.getAttribute('src'), trys);
    });
    win();
    return true;
  }
  if (trys === 5) {
    import('./cookies.js').then((file) => {
      file.createCookie(false, gameNamewithDash, img.getAttribute('src'), trys);
    });
    lose();
    return true;
  }
  return false;
};

export const win = (savedGameName = gameNamewithDash, savedTrys = trys) => {
  endAnimation(
    `You got it!`,
    `In ${savedTrys}/5 trys, game name: ${savedGameName}`
  );
};

export const lose = (savedGameName = gameNamewithDash) => {
  endAnimation(
    `Better luck next time...`,
    `You ran out of trys :( game name: ${savedGameName}`
  );
};

const endTry = () => {
  trys++;
  document.querySelector('.try').textContent = `${trys}/5`;
  imgBlur = trys <= 3 ? imgBlur - 20 : imgBlur - 5;
  img.style = `filter: blur(${imgBlur}px);`;
};

const endScan = () => {
  if (checkWinCondition()) {
    return;
  }
  endTry();
  guessBtn.disabled = false;
  letterNum = 0;
  letters.forEach((letter) => {
    letter.enableInput();
  });
};

const scanLetter = (letter) => {
  if (letter.letterValue == gameName[letterNum]) {
    letter.changeState('correct');
    letter.setAttribute('isItCorrect', 'true');
    correctLetterNum++;
  } else if (gameName.includes(letter.letterValue) && letter.letterValue) {
    letter.changeState('semiCorrect');
  } else {
    letter.changeState('incorrect');
    letter.addEventListener('beforeinput', focusPrevInput);
  }
  letterNum++;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
};

const endAnimation = (title, description) => {
  const textField = document.querySelector('.textField');
  const content = document.querySelector('.contentWrap');
  document.querySelector('img').style = 'filter: blur(0px);'
  textField.classList.add('gone')
  guessBtn.classList.add('gone');
  setTimeout(() => {
    content.removeChild(textField);
    const element = document.createElement('div');
    const classState =
      title == 'You got it!' ? 'titleEnd win' : 'titleEnd lose';
    element.classList.add('endText');
    element.innerHTML = `
            <div class='${classState}'>${title}</div>
            <div class="disEnd">${description}</div>
            `;
    content.appendChild(element);
  }, 700);
};

export const startScan = async (name) => {
  gameNamewithDash = name;
  gameName = name.replace(/-/gi, '');
  guessBtn.disabled = true;
  letters.forEach((letter) => {
    letter.disableInput();
  });
  for (const letter of letters) {
    if (letter.getAttribute('isItCorrect') == 'true') {
      letterNum++;
      continue;
    }
    await scanLetter(letter);
  }
  endScan();
};
