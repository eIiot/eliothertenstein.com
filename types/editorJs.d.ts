interface EditorJSOutput {
  time: string
  blocks: EditorJSBlock[]
}

interface EditorJSBlock {
  id: string
  type: string
  data: EditorJSBlockData
}

interface EditorJSBlockData {
  [key: string]: any
}
