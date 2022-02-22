import { startServer } from "@h0rn0chse/socket-server";

startServer({
    publicPaths: [[
        "/demo", "/"
    ], [
        "/dist", "/libs/night-sky"
    ], [
        "/node_modules/wc-github-corners/dist", "/libs/wc-github-corners"
    ]]
});
