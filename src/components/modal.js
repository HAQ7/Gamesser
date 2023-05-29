export class modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style>
        .holder {
          position: relative;
          width: min(90vw, 500px);
          height: 200px;
          background-color: black;
          text-align: center;
          border-radius: 30px 30px 0 0;
          animation: scaling 0.5s;
          margin-top: 10px;
        }
        
        h2 {
          background-color: hsl(0, 0%, 15%);
          height: 30%;
          margin: 0;
          border-radius: 30px 30px 0 0;
          padding: 0.5em;
          font-size: clamp(1.5rem,8vw,2rem)
        }

        .holder div {
          height: 70%;
          background-color: hsl(0, 0%, 10%);
          padding: 0.5em;
          border-radius: 0 0 30px 30px;
          font-size: 1.2rem;
        }

        .holder * {
          display: grid;
          place-items: center;
        }

        @keyframes scaling {
            from {
                transform: scale(0);
            }

            to {
                transform: scale(1);
            }
        }
    </style>
    <div class='holder'>
    <h2><slot name="title"></slot></h1>
    <div><slot name="description"></slot></div>
    </div>`;
    }
}

customElements.define("hq7-modal", modal);
