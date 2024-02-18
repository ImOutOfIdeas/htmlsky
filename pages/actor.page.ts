import { html_headers, error_headers, format } from "../utils.ts";
import { get_actor } from "../actor.ts";
const RichText = await import("https://cdn.skypack.dev/@atproto/api").then(d => d.__moduleExports.RichText);

export async function actor_page(actor: string, pathname: string): Promise<Response> {
    const user = await get_actor(actor);

    // find and replace urls
    const rt = new RichText({ text: user.description });
    rt.detectFacetsWithoutResolution();

    const error_html = `
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no" />
    <title>Post not found</title>
    <meta name="theme-color" content="#0084ff">
    <link rel="stylesheet" href="/style.css">
    </head>
    <body>
    <h1>User not found</h1>
    <p style="word-break: break-word">${user.message}</p>
    <footer style="position: relative; bottom: 0;">
    <hr/>
    <p style="float: right; margin: 0;"><a href="/">bsky.html</a></p>
    </body>
    `;

    if (user.error) return new Response(error_html, error_headers);
    
    const html = `
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no" />
    <title>${user.name} (@${user.handle})</title>
    <meta property="og:title" content="${user.name} (@${user.handle})" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://bsky.deno.dev/profile/${user.handle}" />
    <meta property="og:image" content="${user.avatar}" />
    <meta property="og:description" content="${user.description}" />
    <meta name="theme-color" content="#0084ff">
    <link rel="stylesheet" href="/style.css">
    </head>
    <body>
    <div style="position: relative; margin-bottom: 2.5rem;">
        <img src="${user.banner}" alt="banner" style="position: relative; aspect-ratio: 3/1;" />
        <img src="${user.avatar}" alt="avatar" style="width: 5em; border-radius: 50%; position: absolute; left: 1em; bottom: -2.5em;" />
    </div>
    <h1 style="margin-bottom: 0;">${user.name}</h1>
    <p style="margin: auto 0;">@${user.handle}</p>
    <p style="margin: 10px 0;"><b>${user.followers}</b> followers <b>${user.follows}</b> following <b>${user.posts}</b> posts</p>
    <p style="white-space: pre-line">${format(user.description, rt.facets)}</p>
    <footer style="position: relative; bottom: 0; margin-top: 2em; margin-bottom: 1em;">
    <hr/>
    <p style="float: left; margin: 0;"><a href="https://bsky.app${pathname}">View on Bluesky</a></p>
    <p style="float: right; margin: 0;"><a href="/">bsky.html</a></p>
    </footer>
    </body>
    `;

    return new Response(html, html_headers);
}
