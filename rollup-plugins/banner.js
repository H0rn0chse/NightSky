import { createRequire } from "module";
const require = createRequire(import.meta.url);

const pkg = require("../package.json");

export function getBanner (filename) {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    const libname = pkg.name;
    const version = pkg.version;
    const license = pkg.license;

    return `/*
    ${libname} - ${filename}
    version ${version} - built at ${dateString}
    @license ${license}
*/`;
}
