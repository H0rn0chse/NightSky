/*
    @h0rn0chse/night-sky - dist/bundle.js
    version 1.0.5 - built at 2024-03-09
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
}

.star {
    background: transparent;
}

.star.inner {
    /* display: none; */
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
        #star_${index} {
            animation: animStar_x ${options.baseSpeedX * (index + 1)}s linear infinite;
            // animation: animStar 3s linear infinite;
        }
        #star_${index} .inner {
            width: ${starSize}px;
            height: ${starSize}px;
            box-shadow: ${boxShadow};
            animation: animStar_y ${options.baseSpeedY * (index + 1)}s linear infinite;
            // animation: animStar 3s linear infinite;
        }
        // #star_${index}:after {
        //     content: " ";
        //     position: absolute;
        //     top: ${options.height}px;
        //     left: ${options.width}px;
        //     width: ${starSize}px;
        //     height: ${starSize}px;
        //     background: transparent;
        //     // box-shadow: ${boxShadow};
        // }
        `;
        });

        let fromX = 0;
        let fromY = 0;
        let toX = 0;
        let toY = 0;

        if (options.velocityX > 0) {
            toX = -options.width;
        } else if (options.velocityX < 0) {
            fromX = -options.width;
        }

        if (options.velocityY > 0) {
            toY = -options.height;
        } else if (options.velocityY < 0) {
            fromY = -options.height;
        }

        styles += `
    @keyframes animStar_x {
        from {
            transform: translateX(${ fromX }px);
        }
        to {
            transform: translateX(${ toX }px);
        }
    }
    @keyframes animStar_y {
        from {
            transform: translateY(${ fromY }px);
        }
        to {
            transform: translateY(${ toY }px);
        }
    }
    `;

        // styles += `
        // @keyframes animStar {
        //     from {
        //         transform: translateY(${ options.velocityY > 0 ? 0 : -options.height }px)
        //                    translateX(${ options.velocityX > 0 ? 0 : -options.width }px);
        //     }
        //     to {
        //         transform: translateY(${ options.velocityY > 0 ? -options.height : 0 }px) 
        //                    translateX(${ options.velocityX > 0 ? -options.width : 0 }px);
        //     }
        // }
        // `;
        

        return styles;
    }

    class NightSky extends HTMLElement {
        static get observedAttributes() {
            return [
                "layers",
                "density",
                "starcolor",
                "velocity-x",
                "velocity-y",
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
                starColor: this.getAttribute("starcolor") || "#FFF",
                layerCount: parseInt(this.getAttribute("layers"), 10) || 3,
                layers: [],
                density: parseInt(this.getAttribute("density"), 10) || 50,
                velocityX: parseInt(this.getAttribute("velocity-x") ?? "60", 10),
                velocityY: parseInt(this.getAttribute("velocity-y") ?? "60", 10),
                width: parseInt(this._container.clientWidth, 10),
                height: parseInt(this._container.clientHeight, 10),
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

    window.customElements.define("night-sky", NightSky);

})();
