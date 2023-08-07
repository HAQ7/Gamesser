import { randomGamePicker } from "./gameCreator.js";
import { checkCookie, createTutorialCookie } from "./cookies.js";

const guessBtn = document.querySelector("button");
const infoHolder = document.querySelector(".infoWrap");
const details = document.querySelectorAll(".details");
const backdrop = document.querySelector("hq7-backdrop");
const header = document.querySelector('header')
let gameName;


const animationDetails = () => {
    details[0].classList.toggle("detailsUp");
    details[1].classList.toggle("detailsStay");
    details[2].classList.toggle("detailsDown");
};

const openDetails = () => {
    header.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    infoHolder.removeEventListener('click', openDetails)
    document.querySelector('.detailsWrap').style = 'visibility: visible;';   
    document.querySelectorAll(".info").forEach(element => {
        element.style.opacity = `0`;
    });
    setTimeout(() => {
        animationDetails()
        backdrop.addEventListener("click", closeDetails);
        backdrop.addBackdrop();
    }, 210);
}

const closeDetails = () => {
    backdrop.removeEventListener('click', closeDetails)
    backdrop.removeBackdrop();
    animationDetails()
    setTimeout(()=> {
        document.querySelectorAll(".info").forEach(element => {
            element.style.opacity = `1`;
                    document.querySelector('.detailsWrap').style = 'visibility: hidden;';
                });
            }, 210)
            document.querySelectorAll(".info").forEach(element => {
                element.style.opacity = `1`;
            });
            infoHolder.addEventListener("click", openDetails);
}

const createTutorial = () => {
    import("./components/Tutorial.js").then(() => {
        import("./components/Modal.js").then(() => {
            document.querySelector('.contentWrapWrap').appendChild(document.createElement('hq7-tutorial'));    
        })
    })
}
 
const app = async () => {
    if (document.cookie)  {
        if (checkCookie()) {
            return;
        }   
    } if (!document.cookie) {
        createTutorial();
        createTutorialCookie();
    }
    gameName = await randomGamePicker();
    guessBtn.style = "display: block;";
};

app();

document.querySelector('header svg').addEventListener('click', createTutorial)

infoHolder.addEventListener("click", openDetails);
guessBtn.addEventListener("click", () => {
    import("./turn.js").then(file => {
        file.startScan(gameName);
    });
});
