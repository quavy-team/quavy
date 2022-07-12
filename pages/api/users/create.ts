import prisma from "@prisma"
import { to } from "await-to-js"
import { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, res) => {
  const [err, user] = await to(prisma.user.create({ data: req.body }))
  if (user) res.status(200).json(user)
  else res.status(500).send(err)
}

export default handler
