import { Modal } from "./Modal.js";

export class Tutorial extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style>
        .tutorialImg {
            display: grid;
            place-items: center;
        }
        
        hq7-modal img {
            border-radius: 20px;
            width: min(70%, 200px);
            transition: 0.5s;
        }
        
        hq7-modal .text {
            background-color: #181818;
            border-radius: 20px;
            margin-top: 10px;
            display: grid;
            place-items: center;
        }
        
        .text div {
            border-radius: 20px;
            transition: 0.5s;
            /* padding: 3em; */
            margin: 2em;
        }

        .text svg {
            width: 20px;
        }
        hq7-modal img:nth-child(2),
        hq7-modal img:nth-child(3) {
            position: absolute;
            opacity: 0;
            transform: translate(150px);
        }
        
        .text div:nth-child(2),
        .text div:nth-child(3) {
            position: absolute;
            opacity: 0;
            transform: translate(150px);
        }
        
        .pageIndicator {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            margin: 10px 0;
        }
        
        .pageIndicator > svg {
            width: 15px;
            cursor: pointer;
            border-radius: 50%;
            padding: 5px;
            transition: 0.2s;
            border: 1px solid hsl(0, 0%, 10%);
        }
        
        .pageIndicator > svg:hover {
            border-color: white;
        }
        
        .pageIndicator svg:first-child {
            margin-right: 5px;
            opacity: 0;
        }
        .pageIndicator svg:last-child {
            margin-left: 5px;
        }
        
        .dot {
            border-radius: 50%;
            width: 15px;
            height: 15px;
            background-color: hsl(0, 0%, 70%);
            transition: 0.2s;
        }
        
        .selectedDot {
            background-color: white;
            width: 20px;
            height: 20px;
        }
        }
      }
    </style>
    <hq7-modal class="tutorial">
    <div slot="title">How to play !</div>
    <div slot="description">
        <div class="tutorialImg">
            <img src="./imgs/image.png" alt="" />
            <img src="./imgs/image2.png" alt="" />
            <img src="./imgs/image3.png" alt="" />
        </div>
        <div class="text">
            <div>
                Try to guess the the name of the blurred game.
                <br />
                Each square is a letter, while each line of squares
                represent a word.
            </div>
            <div>
                Green square means the letter is correct, while
                yellow means the letter is in the incorrect
                position,
                <br />
                if no color pop up then the letter is incorrect.
            </div>
            <div>
                You have five attempts to get it right, the blur
                effect will decrease with each attempt.
                <br />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clip-rule="evenodd"
                    />
                </svg>
                represent the correct letters, while
                <br />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        fill-rule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                        clip-rule="evenodd"
                    />
                </svg>
                represent the incorrect letters.
                Good luck..
                <br />
            </div>
        </div>
        <div></div>
        <div class="pageIndicator">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
            </svg>

            <div class="dot selectedDot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
            </svg>
        </div>
    </div>
</hq7-modal>
    `;
        this.textList = this.shadowRoot.querySelector(".text").children;
        this.imgList = this.shadowRoot.querySelector(".tutorialImg").children;
        this.dotList = this.shadowRoot.querySelectorAll(".dot");
        this.svgs = this.shadowRoot.querySelectorAll(".pageIndicator svg");
        this.activePage = 0;
    }
    connectedCallback() {
        this.svgs[0].addEventListener("click", this.prevPage.bind(this));
        this.svgs[1].addEventListener("click", this.nextPage.bind(this));
    }

    nextPage() {
        if (this.activePage == 2) {
            return;
        }
        this.dotList[this.activePage].classList.remove("selectedDot");
        this.dotList[this.activePage + 1].classList.add("selectedDot");
        this.imgList[this.activePage].style = "transform: translate(-150px); opacity: 0;";
        this.imgList[this.activePage + 1].style =
            "transform: translate(0px); opacity: 1;";
        this.textList[this.activePage].style =
            "transform: translate(-150px); opacity: 0;";
        this.textList[this.activePage + 1].style =
            "transform: translate(0px); opacity: 1;";
        this.activePage = this.activePage == 2 ? this.activePage : this.activePage + 1;
        if (this.activePage == 2) {
            this.svgs[1].style = "opacity: 0;";
            return;
        }
        this.svgs[0].style = "opacity: 100%;";
        this.svgs[1].style = "opacity: 100%;";
    }

    prevPage() {
        if (this.activePage == 0) {
            return;
        }
        this.dotList[this.activePage].classList.remove("selectedDot");
        this.dotList[this.activePage - 1].classList.add("selectedDot");
        this.imgList[this.activePage].style = "transform: translate(150px); opacity: 0;";
        this.imgList[this.activePage - 1].style =
            "transform: translate(0px); opacity: 1;";
        this.textList[this.activePage].style = "transform: translate(150px); opacity: 0;";
        this.textList[this.activePage - 1].style =
            "transform: translate(0px); opacity: 1;";
        this.activePage = this.activePage == 0 ? this.activePage : this.activePage - 1;
        if (this.activePage == 0) {
            this.svgs[0].style = "opacity: 0;";
            return;
        }
        this.svgs[0].style = "opacity: 100%;";
        this.svgs[1].style = "opacity: 100%;";
    }
}
customElements.define("hq7-tutorial", Tutorial);
