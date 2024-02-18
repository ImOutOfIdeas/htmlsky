import { html_headers, error_headers, format } from "../utils.ts";
import { get_embed } from "./utils.page.ts";
import { get_post } from "../post.ts";

export async function post_page(actor: string, rkey: string, pathname: string): Promise<Response> {
    const post = await get_post(actor, rkey);
    const embed = get_embed(post.embed, post.embed_type);

    const error_html = `
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no" />
    <title>Post not found</title>
    <meta name="theme-color" content="#0084ff">
    <link rel="stylesheet" href="/style.css">
    </head>
    <body>
    <h1>Post not found</h1>
    <p style="word-break: break-word">${post.message}</p>
    <footer style="position: relative; bottom: 0;">
    <hr/>
    <p style="float: right; margin: 0;"><a href="/">bsky.html</a></p>
    </body>
    `;

    if (post.error) return new Response(error_html, error_headers);

    const html = `
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no" />
    <title>${post.user.name}: "${post.text}"</title>
    <meta property="og:title" content='${post.user.name}: "${post.text}"' />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://bsky.deno.dev/profile/${post.user.handle}/post/${post.rkey}" />
    <meta name="twitter:card" content="summary_large_image">
    <meta property="og:image" content="${post.image}" />
    <meta property="og:description" content="${post.text}" />
    <meta name="theme-color" content="#0084ff">
    <link rel="stylesheet" href="/style.css">
    </head>
    <body>
    <div style="margin-bottom: 1em;">
        <img src="${post.user.avatar}" alt="avatar" style="width: 3.5em; border-radius: 50%; float: left; margin-right: 1em; padding: 0;">
        <div>
            <h1 style="margin-bottom: 0; margin-top: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"><a href="/profile/${post.user.handle}" style="color: inherit;">${post.user.name}</a></h1>
            <p style="margin-top: 0;">@${post.user.handle}</p>
        </div>
    </div>
    <p style="clear: both;">${format(post.text, post.facets)}</p>
    ${embed ? embed : ""}
    <time datetime="${post.createdAt}" style="margin-top: 1em;">${new Date(post.createdAt).toLocaleString()} UTC</time> &#8212; ${post.langs?.map((lang: string) => `<span>${lang}</span>`)}
    <footer style="position: relative; bottom: 0;">
    <hr/>
    <p style="float: left; margin: 0;"><a href="https://bsky.app${pathname}">View on Bluesky</a></p>
    <p style="float: right; margin: 0;"><a href="/">bsky.html</a></p>
    </body>
    `;
    return new Response(html, html_headers);
}
