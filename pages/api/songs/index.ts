import { PrismaClient } from "@prisma/client"
import to from "await-to-js"
import { NextApiHandler } from "next"

const api: NextApiHandler = async (_req, res) => {
  const prisma = new PrismaClient()
  const [err, data] = await to(prisma.draft.findMany())
  if (err) res.status(500).json(err)
  if (data) res.status(200).json(data)
  res.status(404).send("Not found")
}

export default api
