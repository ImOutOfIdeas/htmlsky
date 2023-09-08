import { get_post } from "./post.ts";

export async function get_did (handle: string) {
  const res = await fetch(`https://bsky.social/xrpc/com.atproto.identity.resolveHandle`
  + `?handle=${handle}`)
  .then(res => res.json());

  if (res.error) return res;

  return res.did;
}

export async function get_handle (did: string) {
  const res = await fetch(`https://plc.directory/${did}/data`)
  .then(res => res.json());

  if (res.message && res.message.includes("DID not registered:")) return res;
  
  return res.alsoKnownAs[0].replace("at://", "");
}

export function get_embedded_post (uri: string) {
  const split = uri.replace("at://", "").split("/"),
  did = split[0], rkey = split[2];
  const post = get_post(did, rkey);
  return post;
}

export function replace_url (text: string) {
  const regex = new RegExp(/(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/gi);
  return text.replace(regex, "<a href='$1'>$1</a>");
}

export function sanitize (text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const html_headers = {
  headers: {
    "Content-Type": "text/html; charset=utf-8"
  }
};

export const json_headers = {
  headers: {
    "Content-Type": "application/json"
  }
};