import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
  const prisma = new PrismaClient()
  const { email } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  res.status(user ? 200 : 500).json(user)
}
