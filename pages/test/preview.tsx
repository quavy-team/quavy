import { Card } from "@nextui-org/react"
import { Draft } from "@prisma/client"
import { JSONContent } from "@tiptap/react"
import axios from "axios"
import Web from "@layouts/web"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useSWR from "swr"

interface Data extends Draft {
  lyrics: {
    title: string
    role: string
    strum: { [key: string]: string }
    json: JSONContent
  }[]
}

export default function Preview() {
  const [data, $data] = useState<Data>()
  const router = useRouter()
  const { id } = router.query
  const { data: d, error } = useSWR(`/api/drafts/${id}`)
  console.log(d, error)

  useEffect(() => {
    axios(`/api/drafts/${id}`).then((res) => $data(res.data))
  }, [id])

  if (!data) return null

  return (
    <>
      {data.lyrics.map((section, i) => (
        <Card key={`card:${i}`}>
          <Card.Body>
            {section.json.content.map((para, j) => (
              <p key={`${i}:${j}`}>
                {para.content.map((span, k) => {
                  if (!span.marks) return span.text
                  const end = para.content.findIndex(
                    (val, i) => i >= k && !val.marks
                  )
                  const nodes = para.content.splice(k, end - k)
                  return (
                    <span key={`${i}:${j}:${k}`}>
                      {nodes.map((node, m) => {
                        const types = node.marks.map((mark) => mark.type)
                        if (!types.includes("bold")) return node.text
                        return (
                          <strong key={`${i}:${j}:${k}:${m}`}>
                            {node.text}
                          </strong>
                        )
                      })}
                    </span>
                  )
                })}
              </p>
            ))}
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

Preview.Layout = Web
