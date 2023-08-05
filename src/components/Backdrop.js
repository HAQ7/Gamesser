class Backdrop extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style>
        .backdrop {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          background: black;
          opacity: 0%;
          z-index: -1;
        }

        .addOpacity {
          animation: addOpacity 0.5s;
          opacity: 45%;
          z-index: 1;
        }
      
        .removeOpacity {
          animation: removeOpacity 0.5s;
          opacity: 0%;
          z-index: -1;
        }
      
        @keyframes addOpacity {
          from {
              opacity: 0;
          }
      
          to {
              opacity: 45%;
          }
      } 

      @keyframes removeOpacity {
        0% {
            opacity: 45%;
        }

        50% {
            opacity: 0;
        } 

        100% {
          opacity: 0;
        }
    </style>
    <div class="backdrop"></div>
    `;

        this.backdrop = this.shadowRoot.querySelector(".backdrop");
    }

    addBackdrop() {
        document.querySelector(".contentWrapWrap").style = "overflow-y: hidden;";
        this.backdrop.classList.toggle("addOpacity");
    }

    removeBackdrop() {
        this.backdrop.classList.toggle("addOpacity");
        this.backdrop.classList.toggle("removeOpacity");
        setTimeout(() => {
            this.backdrop.classList.toggle("removeOpacity");
            document.querySelector(".contentWrapWrap").style =
                "overflow-y: initial;";
        }, 400);
    }
}

customElements.define("hq7-backdrop", Backdrop);
