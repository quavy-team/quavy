import prisma from "@prisma"
import to from "await-to-js"

const api = async (req, res) => {
  const { userId } = req.query
  const promise = prisma.draft.findMany({ where: { userId } })
  const [err, data] = await to(promise)
  if (err) res.status(500).send(err)
  if (!data) res.status(404).send("Not found")
  res.status(200).send(data)
}
