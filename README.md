# bsky.html
a bluesky html frontend

[bsky.deno.dev](https://bsky.deno.dev)

## roadmap
- [x] accounts
  - [x] fallback avatar & banner
- [x] text posts
- [x] images
  - [x] alt text dropdown
  - [x] multiple image support
- [x] embeds
  - [x] text
  - [x] image
  - [x] external
- [x] publish to sourcehut & github
- [x] rewrite in typescript
- [ ] threads
  - [ ] user
  - [ ] post

## api
if you want to get a useful representation of either an account or a post, instead of replacing [bsky.app](https://bsky.app) with [bsky.deno.dev](https://bsky.deno.dev), replace it with [bsky.deno.dev/json/](https://bsky.deno.dev/json/) and you'll receive a JSON object representing the corresponding account/post.