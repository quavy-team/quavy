import { PrismaClient } from "@prisma/client"
import { NextApiHandler } from "next"
import handle from "zuwarten"

const api: NextApiHandler = async ({ query }, res) => {
  const prisma = new PrismaClient()
  const promise = prisma.draft.findUnique({ where: query })
  const [draft, err] = await handle(promise)
  if (draft) res.status(200).json(draft)
  else if (err) res.status(500).send(err)
  else res.status(404)
}

export default api
