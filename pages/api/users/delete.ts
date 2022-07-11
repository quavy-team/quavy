import { PrismaClient } from "@prisma/client"
import { NextApiHandler } from "next"
import until from "zuwarten"

const handler: NextApiHandler = async (req, res) => {
  const prisma = new PrismaClient()
  const [user, err] = await until(prisma.user.delete({ where: req.query }))
  if (user) res.status(200).json(user)
  else res.status(500).send(err)
}

export default handler
