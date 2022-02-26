import { createRequire } from "module";
const require = createRequire(import.meta.url);

const pkg = require("../package.json");

export function getBanner (filename) {
    const date = new Date().toISOString();
    const libname = pkg.name;
    const version = pkg.version;
    const license = pkg.license;

    return `/*
    ${libname} - ${filename}
    version ${version} - built at ${date}
    @license ${license}
*/`;
}
