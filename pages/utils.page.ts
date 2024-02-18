import { Embed } from "../bsky.d.ts";

export function get_embed (embed: Embed, embed_type: string): string | boolean {
    if (embed?.error) {
        return `
        <div style="border: 1px solid; margin-bottom: 1em; padding-bottom: 0.5em;">
        <div style="margin-left: 1em;">
        <h1>Post not found</h1>
        <p style="word-break: break-word">${embed.message}</p>
        </div>
        </div>
        `;
    }

    let res;

    if (embed_type === "record" || embed_type === "recordWithMedia") {
        res = `
        <a href="/profile/${embed.user.handle}/post/${embed.rkey}" style="color: inherit; text-decoration: inherit;">
        <div style="border: 1px solid; margin-bottom: 1em; padding-bottom: 0.5em;">
            <div style="margin-bottom: 1em; margin-left: 1em;">
                <img src="${embed.user.avatar}" alt="avatar" style="width: 2.5em; border-radius: 50%; float: left; margin-right: 1em; padding: 0;">
                <div>
                    <h3 style="margin-bottom: 0; margin-top: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${embed.user.name}</h3>
                    <p style="margin-top: 0;">@${embed.user.handle}</p>
                </div>
            </div>
            <p style="clear: both; margin-left: 1em;">${embed.text}</p>
            <time datetime="${embed.createdAt}" style="margin-top: 1em; margin-left: 1em;">${new Date(embed.createdAt).toLocaleString()} UTC</time>
        </div>
        </a>
        `;
    } else if (embed_type === "images") {
        res = `
        <div styles="display: grid; grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, 1fr); grid-gap: 15px;">
        ${embed.images.map((image: Image) => `
        <img src='${image.link}' ${image.alt ? `alt='${image.alt}'` : ''} />
        ${
        image.alt ?
        `<details style="margin-bottom: 1em;">
        <summary>alt text</summary>
        <p>${image.alt}</p>
        </details>` : ``
        }
        `).join("")}
        </div>
        `;
    } else if (embed_type === "external") {
        res = `
        <a href="${embed.uri}" style="color: inherit; text-decoration: inherit;">
        <div style="border: 1px solid; margin-bottom: 1em;">
            <div style="margin: 1em">
                <h3>${embed.title}</h3>
                <p>${embed.description}</p>
            </div>
        </div>
        </a>
        `;
    }

    if (res === undefined) res = false;

    return res;
}
