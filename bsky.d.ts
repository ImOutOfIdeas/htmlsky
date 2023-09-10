interface Actor {
  avatar: string,
  banner: string,
  name: string,
  description?: string,
  handle: string,
}

interface Post {
  rkey: string,
  user: Actor,
  text: string,
  embed?: External | Post | Array<Image>,
  embed_type?: string,
  createdAt: string,
  facets?: Array<Facet>,
  langs: Array<string>,
}

interface External {
  uri: string,
  title: string,
  description: string,
}

interface Image {
  link: string,
  alt?: string,
}

interface Facet {
  index: {
    byteStart: number,
    byteEnd: number,
  },
  features: Array<object>,
}
