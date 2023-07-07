export class Guide extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style> 
            
        </style>
        <section class='background'>
            <div class='main'>
                <div class='leftArrow'></div>
                <div class='middlePart'>
                    <div class='guideBody'>
                    <img src="" alt="" />
                    </div>
                    <div class='dots'></div>
                </div>
                <div class='rightArrow'></div>
            </div>
        </section>
`;
    }
}

customElements.define("hq7-guide", Guide);
