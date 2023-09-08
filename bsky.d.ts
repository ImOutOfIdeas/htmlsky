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
