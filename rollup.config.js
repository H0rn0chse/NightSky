import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-porter";

// custom
import { replaceStyleTemplate } from "./rollup-plugins/replaceStyleTemplate.js";
import { getBanner } from "./rollup-plugins/banner.js";

export default [
    {
        input: "src/build/default.js",
        output: [
            {
                file: "dist/bundle.js",
                format: "iife",
                name: "darkModeToggle",
                banner: getBanner("dist/bundle.js"),
                plugins: [
                    replaceStyleTemplate({
                        src: "dist/bundle.css",
                        target: "dist/bundle.js"
                    }),
                ]
            },
            {
                file: "dist/bundle.min.js",
                format: "iife",
                name: "darkModeToggle",
                banner: getBanner("dist/bundle.min.js"),
                plugins: [
                    terser({
                        format: {
                            comments: (node, comment) => {
                                const text = comment.value;
                                return /@license/i.test(text);
                            }
                        }
                    }),
                    replaceStyleTemplate({
                        src: "dist/bundle.min.css",
                        target: "dist/bundle.min.js"
                    }),
                ]
            }
        ],
        plugins: [
            css({
                raw: "dist/bundle.css",
                minified: "dist/bundle.min.css",
            })
        ]
    }
];
