import { Actor } from "./bsky.d.ts";
import { get_handle, get_did, sanitize } from "./utils.ts";

export async function get_actor (handle: string): Actor {
  let did;
  if (handle.includes("did:")) {
    did = handle;
    handle = await get_handle(handle);
  } else {
    did = await get_did(handle);
  }

  const res = await fetch(`https://api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${did}`)
    .then(res => res.json());

  if (res.error) return res;

  const record = res;

  let avatar, banner;

  if (record.avatar) {
    avatar = record.avatar ?
    record.avatar :
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Minecraft_missing_texture_block.svg/2048px-Minecraft_missing_texture_block.svg.png";
  } else {
    avatar = "/resources/avatar.png";
  }

  if (record.banner) {
    banner = record.banner ?
    record.banner :
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Minecraft_missing_texture_block.svg/2048px-Minecraft_missing_texture_block.svg.png";
  } else {
    banner = "/resources/banner.png";
  }

  const name = record.displayName ? sanitize(record.displayName) : handle;

  let description;
  if (record.description !== "") {
    description = sanitize(record.description);
  } else {
    description = "";
  }


  const actor: Actor = {
    avatar: avatar,
    banner: banner,
    name: name,
    description: description,
    handle: handle,
    follows: record.followsCount,
    followers: record.followersCount,
    posts: record.postsCount,
  };

  return actor;
}
