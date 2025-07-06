import { calculateStyles, styleTemplate } from "./styles.js";

export class NightSky extends HTMLElement {
    static get observedAttributes() {
        return [
            "layers",
            "density",
            "velocity-x",
            "velocity-y",
            "star-shape",
            "star-color",
            "background-color",
        ];
    }

    connectedCallback() {
        // Create a shadow root
        this.attachShadow({ mode: "open" });
        // add private styles
        this.shadowRoot.appendChild(styleTemplate.content.cloneNode(true));
        this._styles = document.createElement("style");
        this.shadowRoot.appendChild(this._styles);

        // add container
        this._container = document.createElement("div");
        this._container.id = "container";
        this.shadowRoot.appendChild(this._container);

        // calculate styles
        this.recalculateStyles();

        this._observer = new ResizeObserver(this._handleResize.bind(this));
        this._observer.observe(this._container);
    }

    _handleResize () {
        if (this._timer) {
            clearTimeout(this._timer);
        }
        this._timer = setTimeout(() => {
            this._timer = null;
            this.recalculateStyles();
        }, 200);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue == undefined || oldValue === newValue) {
            return;
        }

        switch (name) {
            case "star-color":
                this.setAttribute(name, newValue);
                break;
            case "background-color":
                if (["", "transparent"].includes(newValue)) {
                    this.setAttribute(name, newValue);
                } else {
                    throw new Error(`The color ${newValue} is not supported`);
                }
                break;
            case "star-shape":
                if (!["circle", "square"].includes(newValue)) {
                    console.error(`The star shape ${newValue} is not supported, defaulting to square`);
                    this.setAttribute(name, "square");
                } else {
                    this.setAttribute(name, newValue);
                }
                break;
            case "layers":
            case "density":
            case "velocity-x":
            case "velocity-y":
                this.setAttribute(name, parseInt(newValue, 10));
                break;
            default:
                throw new Error(`The property ${name} is not supported`);
        }

        if (this.shadowRoot) {
            this.recalculateStyles();
        }
    }

    getOptions () {
        const options = {
            starColor: this.getAttribute("star-color") || "#FFF",
            layerCount: parseInt(this.getAttribute("layers"), 10) || 3,
            layers: [],
            density: parseInt(this.getAttribute("density"), 10) || 50,
            velocityX: parseInt(this.getAttribute("velocity-x") ?? "60", 10),
            velocityY: parseInt(this.getAttribute("velocity-y") ?? "60", 10),
            width: parseInt(this._container.clientWidth, 10),
            height: parseInt(this._container.clientHeight, 10),
            backgroundColor: this.getAttribute("background-color") ?? "",
            starShape: this.getAttribute("star-shape") || "square",
        };

        // we want to have ~ options.density stars on a regular screen with 1920x1080
        let starCount = ((options.width * options.height) / (1920 * 1080)) * options.density;

        for (let i=0; i < options.layerCount; i++) {
            starCount = starCount * 2;
            const layer = [];
            for (let k=0; k < starCount; k++) {
                const x = Math.round(Math.random() * options.width);
                const y = Math.round(Math.random() * options.height);
                
                // Actual position
                layer.push({
                    x,
                    y,
                });

                // Replications to prevent gaps in animation
                layer.push({
                    x: x + options.width,
                    y: y + options.height,
                });
                layer.push({
                    x: x + options.width,
                    y: y,
                });
                layer.push({
                    x: x,
                    y: y + options.height,
                });
            }
            options.layers.push(layer);
        }

        // calculate base speed to have screen independent speed
        options.baseSpeedX = options.width * ( 1 / Math.abs(options.velocityX) );
        options.baseSpeedY = options.height * ( 1 / Math.abs(options.velocityY) );

        return options;
    }

    recalculateStyles () {
        const options = this.getOptions();

        const temp = JSON.parse(JSON.stringify(options));
        delete temp.layers;
        if (JSON.stringify(temp) === JSON.stringify(this._lastOptions)) {
            // nothing changed
            return;
        }
        this._lastOptions = temp;

        this._styles.innerHTML = calculateStyles(options);

        this._container.querySelectorAll(".star").forEach((star) => {
            star.remove();
        });

        this._container.classList.toggle("transparent", options.backgroundColor === "transparent");

        for (let i=0; i < options.layerCount; i++) {
            const starOuter = document.createElement("div");
            starOuter.id = `star_${i}`;
            starOuter.classList.add("star");

            const starInner = document.createElement("div");
            starInner.classList.add("star", "inner");

            starOuter.appendChild(starInner);
            this._container.appendChild(starOuter);
        }
    }
}
