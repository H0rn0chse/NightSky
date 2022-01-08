export const styleTemplate = document.createElement("template");
// eslint-disable-next-line quotes
styleTemplate.innerHTML = `STYLE_TEMPLATE`;

export function calculateStyles (options) {
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
            animation: animStar ${options.baseSpeed * (arr.length - index)}s linear infinite;
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
