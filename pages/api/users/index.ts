import { PrismaClient } from "@prisma/client"
import { NextApiHandler } from "next"
import until from "zuwarten"

const handler: NextApiHandler = async (_req, res) => {
  const prisma = new PrismaClient()
  const [users, err] = await until(prisma.user.findMany())
  if (users) res.status(200).json(users)
  else res.status(500).send(err)
}

export default handler
