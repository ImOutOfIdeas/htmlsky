import { html_headers } from "../utils.ts";

export function index(): Response {
  const html = `
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no" />
    <title>bsky.html</title>
    <meta name="theme-color" content="#0084ff">
    <style>
      body {
        line-height: 1.2;
        padding: 0 10px;
        margin: 10px auto;
        max-width: 650px;
      }

      img {
        padding: 10px 0;
        position: initial;
        max-width: 100%;
      }

      nav {
        margin-bottom: 10px;
      }

      table, td, th {
        border: 1px solid black;
        padding: 0.5em;
      }
      table {
        border-collapse: collapse;
      }
    </style>
  </head>
  <body>
    <h1>bsky.html proxy</h1>
    <p>This is an html-only proxy for Bluesky posts (and accounts) so that people without an account can still read posts and view profiles.</p>
    <p>Check out an account: <a href="/profile/jordanreger.com">@jordanreger.com</a></p>
    <p>Check out a text post: <a href="/profile/jordanreger.com/post/3k6g32rfszr2x">text post</a></p>
    <p>Check out an image post: <a href="/profile/jordanreger.com/post/3k656mhl57g2t">image post</a>
    <p>Check out an image <i>and</i> text post: <a href="/profile/jordanreger.com/post/3k653xilwqc2m">image <i>and</i> text post</a></p>
    <p>Check out a post with a script in it: <a href="/profile/jordanreger.com/post/3k6mmypp2fj2d">post with a script in it</a></p>
    <p>Check out a <i>quote</i> post (with a script in it): <a href="/profile/jordanreger.com/post/3k6nvzasujl2v">quote post (with a script in it)</a></p>
    <p>Check out an image post with an alt text on it: <a href="profile/jordanreger.com/post/3k6nxt74trf2o">image post with alt text</a></p>
    <p>This will not only allow people to view Bluesky posts from an embed but will also allow people with slow internet or no-JS clients to view posts. Mention me in a post if you've got any questions or comments! <a href="https://bsky.app/profile/jordanreger.com">@jordanreger.com</a></p>
    <p>Source: <a href="https://sr.ht/~jordanreger/bsky">sr.ht/~jordanreger/bsky</a></p>
    <hr/>
    <p>Built by <a href="https://jordanreger.com">Jordan Reger</a>.</p>
  </body>
  `
  return new Response(html, html_headers);
}
