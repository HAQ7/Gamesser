class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style>
        p {
          width: 100%;
        }
        .holder {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(90vw, 500px);
          text-align: center;
          border-radius: 30px 30px 0 0;
          animation: addOpacity 0.5s;
          margin-top: 10px;
          z-index: 2;
          background-color: hsl(0, 0%, 10%);
          border-radius: 30px 30px 30px 30px;
        }
        
        h2 {
          background-color: hsl(0, 0%, 15%);
          height: 20%;
          margin: 0;
          border-radius: 30px 30px 0 0;
          padding: 0.5em;
          font-size: clamp(1.3rem,7vw,2rem);
          text-align: center;
        }

        .text {
          height: 80%;
          padding: 0.5em;
          font-size: clamp(0.9rem,4vw,1.2rem);
        }

        .title {
          display: grid;
          place-items: center;
        }

        button {
          margin: 10px;
          width: 100px;
          height: 40px;
          border-radius: 15%;
          background-color: rgb(82, 128, 82);
          box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
          color: white;
          border: 0;
          font-family: "Fjalla One", sans-serif;
          font-size: 1.2rem;
          cursor: pointer;
          transition: 0.2s;
        }

        button:hover {
          transform: scale(110%);
          background-color: hsl(120, 22%, 35%);
      } 

      .addOpacity {
        animation: addOpacity 0.5s;
        opacity: 1;
      }

        @keyframes addOpacity {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        .removeOpacity {
          animation: removeOpacity 0.5s;
        opacity: 0;
        }

        @keyframes removeOpacity {
          0% {
                opacity: 100%;
            }

            50%  {
                opacity: 0;
            }

            100% {
              opacity: 0;
            }
        }
      }
    </style>
    <section class='modal'>
    <div class='holder'>
      <h2><slot name="title"></slot></h2>
      <div class='text'>
        <slot name="description"></slot>
        <button>Got it !</button>
      </div>
    </div>
    </section>
    
    `;
        this.backdrop = document.querySelector("hq7-backdrop");
        this.holder = this.shadowRoot.querySelector(".holder");
    }
    connectedCallback() {
        this.backdrop.addBackdrop();
        this.shadowRoot
            .querySelector("button")
            .addEventListener("click", this._removeModal.bind(this));
    }

    _removeModal() {
        this.shadowRoot.querySelector("button").disabled = true;
        this.backdrop.removeBackdrop();
        this.holder.classList.add("removeOpacity");
        setTimeout(() => {
          if(document.querySelector('hq7-modal')) {
            document.querySelector('hq7-modal').remove();
            return;
          }
          document.querySelector('hq7-tutorial').remove();
        },400)
    }
    buttonAdd() {
        this.shadowRoot.querySelector("button").classList.add(".addOpacity");
    }
}

customElements.define("hq7-modal", Modal);
