import { Actor } from "./bsky.d.ts";
import { get_handle, get_did, sanitize } from "./utils.ts";

export async function get_actor (handle: string): Actor {
  const is_did = handle.includes("did:");

  let did;
  if (is_did) {
    did = handle;
    handle = await get_handle(handle);
  } else {
    did = await get_did(handle);
  }

  const res = await fetch(`https://bsky.social/xrpc/com.atproto.repo.listRecords?repo=${handle}&collection=app.bsky.actor.profile`)
    .then(res => res.json());

  if (res.error) return res;

  const record = res.records[0];
  const avatar_ref = record.value.avatar.ref["$link"];
  const banner_ref = record.value.banner.ref["$link"];

  const avatar = record.value.avatar ?
  `https://av-cdn.bsky.app/img/avatar/plain/${did}/${avatar_ref}@jpeg` :
  "https://placehold.jp/0084ff/ffffff/500x500.jpg?text=user";

  const banner = record.value.banner ?
  `https://av-cdn.bsky.app/img/banner/plain/${did}/${banner_ref}@jpeg` :
  "https://placehold.jp/0084ff/0084ff/3000x1000.jpg";

  const name = record.value.displayName ? sanitize(record.value.displayName) : handle;

  let description;
  if (record.value.description) {
    description = sanitize(record.value.description);
  }

  const actor: Actor = {
    avatar: avatar,
    banner: banner,
    name: name,
    description: description,
    handle: handle,
  };

  return actor;
}
