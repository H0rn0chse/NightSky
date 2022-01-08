import fs from "fs";

const placeholder = "STYLE_TEMPLATE";

export function replaceStyleTemplate (options) {
    return {
        name: "replaceStyleTemplate",
        writeBundle() {
            const styles = fs.readFileSync(options.src, "utf-8");
            const template = `<style>${styles}</style>`;
            let targetContent = fs.readFileSync(options.target, "utf-8");
            targetContent = targetContent.replaceAll(placeholder, template);
            fs.writeFileSync(options.target, targetContent, fs.w);
        }
    };
}
