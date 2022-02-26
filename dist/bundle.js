/*
    @h0rn0chse/night-sky - dist/bundle.js
    version 1.0.5 - built at 2022-02-26T19:15:22.140Z
    @license MIT
*/
(function () {
    'use strict';

    const styleTemplate = document.createElement("template");
    // eslint-disable-next-line quotes
    styleTemplate.innerHTML = `<style>#container {
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
    overflow: hidden;
}</style>`;

    function calculateStyles (options) {
        let styles = "";

        options.layers.forEach((layer, index, arr) => {
            const starSize = options.layers.length - index;
            const boxShadow = layer.reduce((result, pos, index, arr) => {
                result += `${pos.x}px ${pos.y}px ${options.starColor}${index < arr.length -1 ? "," : ""}\n`;
                return result;
            }, "");

            styles += `
        #stars${index} {
            width: ${starSize}px;
            height: ${starSize}px;
            background: transparent;
            box-shadow: ${boxShadow};
            animation: animStar ${options.baseSpeed * (index + 1)}s linear infinite;
        }
        #stars${index}:after {
            content: " ";
            position: absolute;
            top: ${options.height}px;
            width: ${starSize}px;
            height: ${starSize}px;
            background: transparent;
            box-shadow: ${boxShadow};
        }
        `;
        });

        styles += `
    @keyframes animStar {
        from {
            transform: translateY(${ options.velocity > 0 ? 0 : -options.height }px);
        }
        to {
            transform: translateY(${ options.velocity > 0 ? -options.height : 0 }px);
        }
    }
    `;

        return styles;
    }

    class NightSky extends HTMLElement {
        static get observedAttributes() {
            return [
                "layers",
                "density",
                "starcolor",
                "velocity",
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
                case "starcolor":
                    this.setAttribute(name, newValue);
                    break;
                case "layers":
                case "density":
                case "velocity":
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
                starColor: this.getAttribute("starcolor") || "#FFF",
                layerCount: parseInt(this.getAttribute("layers"), 10) || 3,
                layers: [],
                density: parseInt(this.getAttribute("density"), 10) || 50,
                velocity: parseInt(this.getAttribute("velocity"), 10) || 60,
                width: parseInt(this._container.clientWidth, 10),
                height: parseInt(this._container.clientHeight, 10),
            };

            // we want to have ~ options.density stars on a regular screen with 1920x1080
            let starCount = ((options.width * options.height) / (1920 * 1080)) * options.density;

            for (let i=0; i < options.layerCount; i++) {
                starCount = starCount * 2;
                const layer = [];
                for (let k=0; k < starCount; k++) {
                    const starPos = {
                        x: Math.round(Math.random() * options.width),
                        y: Math.round(Math.random() * options.height),
                    };
                    layer.push(starPos);
                }
                options.layers.push(layer);
            }

            options.baseSpeed = options.height * ( 1 / Math.abs(options.velocity) );

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

            this._container.querySelectorAll(".stars").forEach((star) => {
                star.remove();
            });

            for (let i=0; i < options.layerCount; i++) {
                const star = document.createElement("div");
                star.id = `stars${i}`;
                star.classList.add("stars");
                this._container.appendChild(star);
            }
        }
    }

    window.customElements.define("night-sky", NightSky);

})();
