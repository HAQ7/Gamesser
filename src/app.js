const api = "f4f38cf257144c4798846f1ae1884446";

const RandomGamePicker = async () => {
  const randomPageNum = Math.floor(Math.random() * 10) + 1;
  const randomGameNum = Math.floor(Math.random() * 20);
  console.log(randomPageNum, randomGameNum);
  const game = await fetch(
    `https://api.rawg.io/api/games?key=${api}&dates=2015-01-01,2023-01-01&ordering=-added&page=${randomPageNum}`
  )
    .then(result => result.json())
    .then(result => result.results[randomGameNum]);
    console.log(game);
    if (game.name.length > 15) {
      return
    }
  imgRenderer(game.background_image);
  createInput(game.name);
};

const imgRenderer = gameImg => {
  const imgElement = document.querySelector("img");
  imgElement.src = gameImg;
};

const createInput = gameName => {
  const textField = document.querySelector(".textField");
  for (let i = 0; i < gameName.length; i++) {
    const textElement = document.createElement("input");
    textElement.setAttribute("type", "text");
    textField.appendChild(textElement);
  }
};

RandomGamePicker();
