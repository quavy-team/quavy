import { Credentials, PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import title from "title"
import until from "zuwarten"

interface Request extends NextApiRequest {
  body: Credentials & { email: string }
}

export default async function handler(req: Request, res: NextApiResponse) {
  const { user } = new PrismaClient()
  const { email, username, password } = req.body
  const name = title(username)
  const credentials = { create: { username, password } }
  // const promise = user.create({ data: { name, email, credentials } })
  // const [response, err] = await until(promise)
  // err && console.log(err)
  // if (response) res.status(200).json(response)
  // else res.status(500).send(err)
  const data = await user.create({ data: { name, email, credentials } }) 
  res.status(data ? 200 : 500).json(data)
}
