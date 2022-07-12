import { User } from "@prisma/client"
import { JSONContent } from "@tiptap/react"
import "next-auth"

declare module "next-auth" {
  interface Session {
    user?: User
  }
}

interface Section {
  title: string
  role: string
  strum: { [key: string]: string }
  json: JSONContent
}

declare module "@prisma-client" {
  interface Song {
    lyrics: Section[]
  }
}
