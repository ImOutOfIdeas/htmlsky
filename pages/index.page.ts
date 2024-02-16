import { html_headers } from "../utils.ts";
import { styles } from "./utils.page.ts";

export function index(): Response {
  const html = `
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no" />
    <title>bsky.html</title>
    <meta name="theme-color" content="#0084ff">
    ${styles()}
  </head>
  <body>
    <h1>bsky.html proxy</h1>
    <p>This is an html-only proxy for Bluesky posts (and accounts) so that people without an account can still read posts and view profiles.</p>
    <p>Check out a few posts/accounts that demonstrate certain features of bsky.html:</p>
    <ul>
    <li>account: <a href="/profile/jordanreger.com">@jordanreger.com</a></li>
    <li>text post: <a href="/profile/jordanreger.com/post/3k6g32rfszr2x">@jordanreger.com/3k6g32rfszr2x</a></li>
    <li>image post: <a href="/profile/jordanreger.com/post/3k656mhl57g2t">@jordanreger.com/3k656mhl57g2t</a></li>
    <li>image <i>and</i> text post: <a href="/profile/jordanreger.com/post/3k653xilwqc2m">@jordanreger.com/3k653xilwqc2m</a></li>
    <li>quote post: <a href="/profile/jordanreger.com/post/3k6nvzasujl2v">@jordanreger.com/3k6nvzasujl2v</a></li>
    <li>image post with alt text: <a href="/profile/jordanreger.com/post/3k6nxt74trf2o">@jordanreger.com/3k6nxt74trf2o</a></li>
    <li>multiple images with alt text: <a href="/profile/jordanreger.com/post/3k6vmo3x7li2j">@jordanreger.com/3k6vmo3x7li2j</a></li>
    <li>in-text links: <a href="/profile/jordanreger.com/post/3k6lpiyampl2g">@jordanreger.com/3k6lpiyampl2g</a></li>
    <li>mentions: <a href="/profile/jordanreger.com/post/3k65h725ggu2b">@jordanreger.com/3k65h725ggu2b</a></li>
    <li>account with default pfp/banner: <a href="/profile/atproto.deno.dev">@atproto.deno.dev</a></li>
    <!-- easter egg :) -->
    <!-- <li>account with legacy pfp/banner: <a href="/profile/cats.bsky.social">@cats.bsky.social</a></li> -->
    <li>post with external embed: <a href="/profile/jordanreger.com/post/3k6yxuvotky2j">@jordanreger.com/3k6yxuvotky2j</a></li>
    <li>post with multiple language tags: <a href="/profile/jordanreger.com/post/3k6z7qr7qma2h">@jordanreger.com/3k6z7qr7qma2h</a></li>
    </ul>
    <p>This will not only allow people to view Bluesky posts from an embed but will also allow people with slow internet or no-JS clients to view posts. Mention me in a post if you've got any questions or comments! <a href="https://bsky.deno.dev/profile/jordanreger.com">@jordanreger.com</a></p>
  </body>
  `
  return new Response(html, html_headers);
}
