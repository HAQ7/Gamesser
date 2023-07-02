export class modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style>
        p {
          width: 100%;
        }
        .holder {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(90vw, 500px);
          height: 200px;
          background-color: black;
          text-align: center;
          border-radius: 30px 30px 0 0;
          animation: opa 0.5s;
          margin-top: 10px;
        }
        
        h2 {
          background-color: hsl(0, 0%, 15%);
          height: 20%;
          margin: 0;
          border-radius: 30px 30px 0 0;
          padding: 0.5em;
          font-size: clamp(1.5rem,8vw,2rem)
          display: flex;
        }

        .text {
          height: 80%;
          background-color: hsl(0, 0%, 10%);
          padding: 0.5em;
          border-radius: 0 0 30px 30px;
          font-size: 1.2rem;
        }

        .title {
          display: grid;
          place-items: center;
        }

        .backdrop {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          background: black;
          opacity: 45%;
          animation: opa2 0.5s;
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
          border: hsl(120, 22%, 31%) 3px solid;
      }

        @keyframes opa {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        @keyframes opa2 {
          from {
              opacity: 0;
          }

          to {
              opacity: 45%;
          }
      } 

        @keyframes ropa {
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

        @keyframes ropa2 {
          0% {
              opacity: 45%;
          }

          50% {
              opacity: 0;
          } 

          100% {
            opacity: 0;
          }
      }
    </style>
    <section class='modal'>
    <div class='backdrop'></div>
    <div class='holder'>
      <h2><slot name="title"></slot></h1>
      <div class='text'>
        <slot name="description"></slot>
        <button>Sure</button>
      </div>
    </div>
    </section>
    
    `;
    document.body.style = 'overflow-y: hidden;'
    this.backdrop = this.shadowRoot.querySelector('.backdrop');
    this.holder = this.shadowRoot.querySelector('.holder');
    }
    connectedCallback() {
      this.backdrop.addEventListener('click', this._removeModal.bind(this));
      this.shadowRoot.querySelector('button').addEventListener('click', this._removeModal.bind(this));
    }

    _removeModal() {
      this.backdrop.style = 'animation: ropa2 0.500s';
      this.holder.style = 'animation: ropa 0.500s';
      setTimeout(() => {        
        document.body.removeChild(document.querySelector('hq7-modal'));
        document.body.style = 'overflow-y: initial;'
      }, 400);
    }
}

customElements.define("hq7-modal", modal);
