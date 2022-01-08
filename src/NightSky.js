import { styleTemplate } from "./styles.js";

export class NightSky extends HTMLElement {
    static get observedAttributes() {
        return [
            "width",
            "height",
            "theme",
        ];
    }

    connectedCallback() {
        // Create a shadow root
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(styleTemplate.content.cloneNode(true));

        /*this.attachShadow({ mode: "open" });

        const options = {
            width: this.getAttribute("width"),
            height: this.getAttribute("height"),
            theme: this.getAttribute("theme"),
            useThemeHandler: this.getAttribute("useThemeHandler") ?? true,
        };

        this.shadowRoot.appendChild(styleTemplate.content.cloneNode(true));
        this.button = new Button(this.shadowRoot, options);
        this.button.on("click", (evt) => {
            this.setAttribute("theme", evt.theme)
        })*/
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue == undefined || oldValue === newValue) {
            return;
        }

        switch (name) {
            case "width":
                this.setWidth(parseInt(newValue, 10));
                break;
            case "height":
                this.setHeight(parseInt(newValue, 10));
                break;
            default:
                throw new Error(`The property ${name} is not supported`);
        }
    }

    setWidth (width) {
        this.button?.setWidth(width);
        this.setAttribute("width", width);
        this.removeAttribute("height");
    }

    setHeight (height) {
        this.button?.setHeight(height);
        this.setAttribute("height", height);
        this.removeAttribute("width");
    }

    setTheme (theme, skipAnimation) {
        this.button?.setTheme(theme, skipAnimation);
        this.setAttribute("theme", theme);
    }
}

window.customElements.define("night-sky", NightSky);

globalThis.nightSky = {
};
