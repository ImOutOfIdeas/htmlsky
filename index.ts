import { index } from "./pages/index.page.ts";
import { post_page } from "./pages/post.page.ts";
import { actor_page } from "./pages/actor.page.ts";

import { get_actor } from "./actor.ts";
import { get_post } from "./post.ts";
import { json_headers } from "./utils.ts";

Deno.serve({ port: 80 }, async (req: Request) => {
    const url = new URL(req.url), pathname = url.pathname;
    if (pathname === "/favicon.ico") return Response.redirect("https://bsky.app/static/favicon-32x32.png", 301);
    if (pathname === "/" || pathname === "/index.html") return index();

    if (pathname === "/api/actor") {
        const params = url.searchParams;
        const handle = params.get("handle")!;

        if (handle) return new Response("?handle=${handle}", json_headers);
        
        const actor = await get_actor(handle);
        return new Response(JSON.stringify(actor, null, 2), json_headers);
    }

    if (pathname === "/api/post") {
        const params = url.searchParams;
        const handle = params.get("handle")!, rkey = params.get("rkey")!;

        if (!handle || !rkey) return new Response("?handle=${handle}", json_headers);
        
        const post = await get_post(handle, rkey);
        return new Response(JSON.stringify(post, null, 2), json_headers);
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