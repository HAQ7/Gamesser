import { randomGamePicker } from "./gameCreator.js";

const guessBtn = document.querySelector("button");
let gameName;

const app = async () => {
    gameName = await randomGamePicker();
    guessBtn.style = "display: block;";
};

app();

guessBtn.addEventListener("click", () => {
    import("./turn.js").then(file => {
        file.startScan(gameName);
    });
});
