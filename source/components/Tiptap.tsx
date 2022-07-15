import { Button, styled } from "@nextui-org/react"
import bold from "@tiptap/extension-bold"
import code from "@tiptap/extension-code"
import document from "@tiptap/extension-document"
import paragraph from "@tiptap/extension-paragraph"
import text from "@tiptap/extension-text"
import {
  BubbleMenu,
  EditorContent,
  EditorOptions,
  useEditor,
} from "@tiptap/react"

const Code = code.extend({
  excludes: "code",
  inclusive: false,
})

const Bold = bold.extend({
  inline: true,
  group: "inline",
  draggable: true,
  inclusive: false,
})

const Content = styled(EditorContent, {
  outline: "none",
  "& p": { margin: 0 },
  "code:nth-child(3n+1)": {
    color: "$primary",
    bg: "$primaryLight",
  },
  "code:nth-child(3n+2)": {
    color: "$success",
    bg: "$successLight",
  },
  "code:nth-child(3n+3)": {
    color: "$error",
    bg: "$errorLight",
  },
})

export default function Tiptap(props: Partial<EditorOptions>) {
  const editor = useEditor({
    ...props,
    extensions: [document, text, paragraph, Code, Bold],
  }, [props])

  return (
    <>
      <Content editor={editor} />
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <Button.Group size="xs" flat>
            <Button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={editor.isActive("code") ? "is-active" : ""}>
              Oración
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}>
              Acorde
            </Button>
          </Button.Group>
        </BubbleMenu>
      )}
    </>
  )
}
