import prisma from "@prisma"
import to from "await-to-js"
import { NextApiHandler } from "next"

const api: NextApiHandler = async (req, res) => {
  const params = { where: req.query, data: req.body }
  const promise = prisma.draft.update(params)
  const [err, data] = await to(promise)
  if (err) res.status(500).send(err)
  if (!data) res.status(404).send("Not found")
  res.status(200).json(data)
}

export default api
