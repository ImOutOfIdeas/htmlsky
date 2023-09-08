import { Embed } from "./bsky.d.ts";

export function styles (): string {
    return `
    <style>
    body {
        position: relative;
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
    `;
}

export function get_embed (embed: Embed, embed_type: string): string | boolean {
    let res;

    if (embed_type === "record") {
        console.log(embed.embed);
        res = `
        <a href="/profile/${embed.user.handle}/post/${embed.rkey}" style="color: inherit; text-decoration: inherit;">
        <div style="border: 1px solid black; margin-bottom: 1em; padding-bottom: 0.5em;">
            <div style="margin-bottom: 1em; margin-left: 1em;">
                <img src="${embed.user.avatar}" alt="avatar" style="width: 2.5em; border-radius: 50%; float: left; margin-right: 1em; padding: 0;">
                <div>
                    <h3 style="margin-bottom: 0; margin-top: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${embed.user.name}</h3>
                    <p style="margin-top: 0;">@${embed.user.handle}</p>
                </div>
            </div>
            <p style="clear: both; margin-left: 1em;">${embed.text}</p>
            ${
                embed.embed_type === "images" ?
                `
                <img src="${embed.embed.link}" />
                `
                : ``
            }
            <time datetime="${embed.createdAt}" style="margin-top: 1em; margin-left: 1em;">${new Date(embed.createdAt).toLocaleString()} UTC</time>
        </div>
        </a>
        `;
    } else if (embed_type === "images" && embed.alt) {
        res = `
        <img src="${embed.link}" alt='${embed.alt}' />
        <details style="margin-bottom: 1em">
            <summary>alt text</summary>
            <p>${embed.alt}</p>
        </details>
        `;
    } else if (embed_type === "images" && !embed.alt) {
        res = `
        <img src="${embed.link}" />
        `;
    } else if (embed_type === "external") {
        res = `
        <a href="${embed.uri}" style="color: inherit; text-decoration: inherit;">
        <div style="border: 1px solid black; margin-bottom: 1em; padding-bottom: 0.5em;">
            <h3>${embed.title}</h3>
            <p>${embed.description}</p>
        </div>
        </a>
        `;
    }

    if (res === undefined) res = false;

    return res;
}