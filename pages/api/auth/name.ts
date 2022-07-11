import until from "zuwarten"
import { PrismaClient } from "@prisma/client"

const { user } = new PrismaClient()

export default async function handler(req, res) {
  const { email, name } = req.body
  const promise = user.update({ where: { email }, data: { name } })
  const [data, err] = await until(promise)
  if (data) res.status(200).json(data)
  else res.status(500).send(err)
}
