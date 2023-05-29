export class LetterInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style> 
        input {
          text-transform: uppercase;
          width: 95%;
          aspect-ratio: 0.5;
          border-radius: 10%;
          background-color: rgb(37, 37, 37);
          border: none;
          box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
          color: white;
          text-align: center;
          padding: 0;
          transiton: 0.2s;
          font-family: 'Fjalla One', sans-serif;
          font-size: 100%;
        }
        input:focus-within {
          outline: none;
        }

        section {
          position: relative;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        div {
          background: rgb(82, 128, 82);
          width: 5px;
          height: 10px;
          border-radius: 10px;
          opacity: 0;
          position: absolute;
        }
        .right {
          right: 0;
        }

        .left {
          left: 0;
        }

        .up {
          animation: moveu-Ani 0.25s;
        }

        .down {
          animation: moved-Ani 0.25s;
        }

        @keyframes moveu-Ani {
          1% {
            opacity: 1;
          }
          100% {
            opacity 0;
            transform: translateY(-20px);
          }
        }

        @keyframes moved-Ani {
          1% {
            opacity: 1;
          }
          100% {
            opacity 0;
            transform: translateY(10px);
          }
        }

        .shake {
          animation: shakeMove 0.5s;
        }

        @keyframes shakeMove {
          1% {
          }
          50% {
            transform: translateY(5px);
          }

          100% {
            transform: translateY(0);
          }
        }

        .rotate {
          animation: rotateMove 0.5s;
        }

        @keyframes rotateMove {
          1% {
          }
          20% {
            transform: rotate(25deg);
          }
          40% {
            transform: rotate(-25deg);
          }
          60% {
            transform: rotate(25deg);
          }
          80 {
            transform: rotate(-25deg);
          }

          100% {
            transform: rotate(0);
          }
        }

        </style>


        <section class="upper">
        <div class="left"></div><div></div><div class="right"></div>
        </section>
        <input type="text" maxlength="1"> 
        </input>
        <section class="lower">
        <div class="left"></div><div></div><div class="right"></div>
        </section>`;

        this.particles = this.shadowRoot.querySelectorAll("div");
        this.letterBox = this.shadowRoot.querySelector("input");
        this.correctLetters = document.querySelector(".correctLetters");
        this.shouldDisable = false;
    }

    _incorrectAnimation() {
        this.letterBox.classList.toggle("rotate");
        setTimeout(() => {
            this.letterBox.classList.toggle("rotate");
        }, 1000);
        this.letterBox.value = "";
    }

    _updateCorrectLetters() {
        this.correctLetters.textContent = this.correctLetters.textContent
            .slice(15)
            .includes(this.letterBox.value.toUpperCase())
            ? this.correctLetters.textContent
            : this.correctLetters.textContent +
              this.letterBox.value.toUpperCase();
    }

    _changeInputColor(state) {
        if (state == "semiCorrect") {
            this._updateCorrectLetters();
            this.letterBox.style = "background: rgb(163, 149, 86);";
            return;
        }

        if (state == "incorrect") {
            this.letterBox.style = "background-color: rgb(37, 37, 37);";
            return;
        }

        this._updateCorrectLetters();
        this.shouldDisable = true;
        this.letterBox.style = "background: rgb(82, 128, 82);"; //hsl(120, 22%, 21%);
    }

    _changeParticlesColor(state) {
        this.particles.forEach(particle => {
            if (state == "semiCorrect") {
                particle.style = "background: rgb(163, 149, 86);";
                return;
            }
            particle.style = "background: rgb(82, 128, 82);";
        });
    }

    changeState(state) {
        this._changeInputColor(state);
        if (state != "incorrect") {
            this._changeParticlesColor(state);
        } else {
            this._incorrectAnimation();
            return;
        }
        this._toggleAnimation();
        setTimeout(() => {
            this._toggleAnimation();
        }, 1000);
    }

    _toggleAnimation() {
        this.particles.forEach(particle => {
            if (particle.parentElement.classList.contains("upper")) {
                particle.classList.toggle("up");
            } else {
                particle.classList.toggle("down");
            }
        });
        this.letterBox.classList.toggle("shake");
    }

    focusElement() {
        this.shadowRoot.querySelector("input").focus();
    }

    get letterValue() {
        return this.letterBox.value.toLowerCase();
    }

    set letterValue(val) {}

    disableInput() {
        this.letterBox.disabled = true;
    }

    enableInput() {
        this.letterBox.disabled = this.shouldDisable ? true : false;
    }
}

customElements.define("hq7-letter", LetterInput);
