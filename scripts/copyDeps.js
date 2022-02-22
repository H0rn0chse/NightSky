import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.join(__dirname, "../");

const dependencies = [[
    "/dist", "/libs/night-sky"
], [
    "/node_modules/wc-github-corners/dist", "/libs/wc-github-corners"
]];

// copy dependencies to gh-pages
dependencies.forEach((dep) => {
    const pathFrom = path.join(projectDir, dep[0]);
    const pathTo = path.join(projectDir, "gh-pages", dep[1]);
    copyRecursiveSync(pathFrom, pathTo);
});

// Copy demo to gh-pages
const pathFrom = path.join(projectDir, "demo");
const pathTo = path.join(projectDir, "gh-pages");
copyRecursiveSync(pathFrom, pathTo);

// https://stackoverflow.com/a/22185855/14887710
function copyRecursiveSync (src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}
