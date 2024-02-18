import { post_page } from "./pages/post.page.ts";
import { actor_page } from "./pages/actor.page.ts";

import { get_actor } from "./actor.ts";
import { get_post } from "./post.ts";
import { json_headers } from "./utils.ts";

Deno.serve(async (req: Request) => {
    const url = new URL(req.url), pathname = url.pathname;
    if (pathname === "/favicon.ico") return Response.redirect("https://bsky.app/static/favicon-32x32.png", 301);
    if (pathname === "/style.css") {
        const res = await Deno.readFile("./pages/style.css");
        return new Response(res, { headers: { "content-type": "text/css" }});
    }
    if (pathname === "/" || pathname === "/index.html") {
        const res = await Deno.readFile("./pages/index.html");
        return new Response(res, { headers: { "content-type": "text/html" }})
    };

    if (pathname.includes("/json/")) {
        const split = pathname.split("/");
        const actor = split[3], rkey = split[5];

        if (actor && rkey && split.length === 6) {
            const post = await get_post(actor, rkey);
            return new Response(JSON.stringify(post, null, 2), json_headers);
        } else if (actor && split.length === 4) {
            const user = await get_actor(actor);
            return new Response(JSON.stringify(user, null, 2), json_headers);
        } else return new Response(JSON.stringify({ error: "not found" }), json_headers);
    }

    if (pathname === "/resources/avatar.png") {
        return new Response(await Deno.readFile("./resources/avatar.png"), { headers: { "Content-Type": "image/png" } });
    }
    if (pathname === "/resources/banner.png") {
        return new Response(await Deno.readFile("./resources/banner.png"), { headers: { "Content-Type": "image/png" } });
    }

    const split = pathname.split("/");
    const actor = split[2], rkey = split[4];

    if (actor && rkey) {
        return post_page(actor, rkey, pathname);
    } else if (actor) {
        return actor_page(actor, pathname);
    } else return new Response("Not found", { status: 404 });
});