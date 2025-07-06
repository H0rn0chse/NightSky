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
        #star_${index} {
            animation: animStar_x ${options.baseSpeedX * (index + 1)}s linear infinite;
        }
        #star_${index} .inner {
            width: ${starSize}px;
            height: ${starSize}px;
            box-shadow: ${boxShadow};
            animation: animStar_y ${options.baseSpeedY * (index + 1)}s linear infinite;
            border-radius: ${options.starShape === "circle" ? "50%" : "0"};
        }
        `;
    });

    // default to 0 for velocity 0
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

    return styles;
}
