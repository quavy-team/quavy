import { NextApiHandler } from "next"
import until from "zuwarten"
import { PrismaClient } from "@prisma/client"

const handler: NextApiHandler = async (req, res) => {
  const prisma = new PrismaClient()
  const promise = prisma.draft.findMany({ where: req.query })
  const [drafts, err] = await until(promise)
  if (drafts) res.status(200).json(drafts)
  else if (err) res.status(500).send(err)
  else res.status(404)
}

export default handler
