import { PrismaClient } from "@prisma/client"
import to from "await-to-js"
import { NextApiHandler } from "next"

const api: NextApiHandler = async (req, res) => {
  const prisma = new PrismaClient()
  const promise = prisma.draft.create({ data: req.body })
  const [err, draft] = await to(promise)
  if (err) res.status(500).json(err)
  else res.status(200).json(draft)
}

export default api
