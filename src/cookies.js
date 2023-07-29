export const createEndCookie = (winVal, gameName, gameUrl, trys) => {
    document.cookie = `data=${JSON.stringify({
        hasHeWon: winVal,
        game: gameName,
        url: gameUrl,
        try: trys,
    })}; max-age=15`;
    console.log(document.cookie.split("; "));
};

export const createTutorialCookie = () => {
    document.cookie = `hasDoneTutorial=true;`;
}

export const checkCookie = () => {
    if (document.cookie.split("; ")[0].split("=")[0] != "data") {
        return false;
    }
    console.log("not inside");
    const element = document.createElement("hq7-modal");
    element.innerHTML = `
        <div slot="title">You have Already finished !</div>
        <p slot="description">Come again after 24 hours...</p>
        `;
    document.body.appendChild(element);
    import("./turn.js").then(file => {
        const data = JSON.parse(document.cookie.split("; ")[0].split("=")[1]);
        document.querySelector("img").src = data.url;
        document.querySelectorAll(".info")[1].remove();
        document.querySelectorAll(".info")[1].remove();
        if (data.hasHeWon == true) {
            document.querySelector(".try").textContent = `${data.try}/5`;
            file.win(data.game, data.try);
        }
        if (data.hasHeWon == false) {
            document.querySelector(".try").textContent = `5/5`;
            file.lose(data.game);
        }
    });
    return true;
};
