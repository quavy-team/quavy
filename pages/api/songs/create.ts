import { Song, Profile, User } from "@prisma/client"
import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import slug from "slug"
import until from "zuwarten"

interface Request extends NextApiRequest {
  body: Song & {
    authors: string[]
    mentions: User[]
  }
}

const api = async (req: Request, res: NextApiResponse) => {
  const prisma = new PrismaClient()
  const { authors, mentions, ...song } = req.body
  const [author] = authors
  const promise = prisma.song.create({
    data: {
      ...song,
      id: `${slug(author)}/${slug(song.title)}`,
      // path: [slug(author), slug(song.title)],
      authors: { connect: authors.map((name) => ({ name })) },
      mentions: { connect: mentions.map(({ id }) => ({ id })) },
    },
  })
  const [response, err] = await until(promise)
  if (response) res.status(200).json(response)
    else res.status(500).send(err)
    return {}
}

export default api
