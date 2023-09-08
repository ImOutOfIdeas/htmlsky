import { Post, Image, External } from "./bsky.d.ts";
import { get_handle, get_did, sanitize, get_embedded_post } from "./utils.ts";
import { get_actor } from "./actor.ts";

export async function get_post (handle: string, rkey: string): Post {
  const is_did: boolean = handle.includes("did:");

  let did;
  if (is_did) {
    did = handle;
    handle = await get_handle(handle);
  } else {
    did = await get_did(handle);
  }

  const user = await get_actor(handle);

  const res = await fetch(`https://bsky.social/xrpc/com.atproto.repo.getRecord`
  + `?repo=${handle}`
  + `&collection=app.bsky.feed.post`
  + `&rkey=${rkey}`)
  .then(res => res.json());

  if (res.error) return res;

  const text = sanitize(res.value.text);

  let embed: External | Post | Image = {};
  let embed_type;
  
  if (res.value.embed) {
    embed_type = res.value.embed["$type"];
  }

  // post embed
  if (embed_type?.includes("record")) {
    embed_type = "record";
    const post: Post = await get_embedded_post(res.value.embed.record.uri);
    embed = post;
  }

  // external embed
  else if (embed_type?.includes("external")) {
    embed_type = "external";
    embed.uri = res.value.embed.external.uri;
    embed.title = res.value.embed.external.title;
    embed.description = res.value.embed.external.description;
  }

  // image embed
  else if (embed_type?.includes("images")) {
    embed_type = "images";
    embed.link = `https://av-cdn.bsky.app/img/feed_fullsize/plain/`
    + did + "/" +
    res.value.embed.images[0].image.ref["$link"]
    + `@jpeg`;
    embed.alt = res.value.embed.images[0].alt ? res.value.embed.images[0].alt : false;
  }
  
  if (embed.length === 0) {
    embed = null;
    embed_type = null;
  }

  const created_at = res.value.createdAt;

  const post: Post = {
    rkey: rkey,
    user: user,
    text: text,
    embed: embed,
    embed_type: embed_type,
    createdAt: created_at,
  };

  return post;
}
