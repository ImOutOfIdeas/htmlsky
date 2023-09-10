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

  let avatar, banner;

  if (record.value.avatar) {
    avatar = record.value.avatar.ref ?
    `https://av-cdn.bsky.app/img/avatar/plain/${did}/${record.value.avatar.ref["$link"]}@jpeg` :
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Minecraft_missing_texture_block.svg/2048px-Minecraft_missing_texture_block.svg.png";
  } else {
    avatar = "/resources/avatar.png";
  }

  if (record.value.banner) {
    banner = record.value.banner.ref ?
    `https://av-cdn.bsky.app/img/banner/plain/${did}/${record.value.banner.ref["$link"]}@jpeg` :
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Minecraft_missing_texture_block.svg/2048px-Minecraft_missing_texture_block.svg.png";
  } else {
    banner = "/resources/banner.png";
  }

  const name = record.value.displayName ? sanitize(record.value.displayName) : handle;

  let description;
  if (record.value.description !== "") {
    description = sanitize(record.value.description);
  } else {
    description = "";
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
