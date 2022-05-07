import {
  BoldExtension,
  ItalicExtension,
  UnderlineExtension,
  MarkdownExtension,
} from 'remirror/extensions'
import { Remirror, useHelpers, useKeymap, useRemirror } from '@remirror/react'
import 'remirror/styles/all.css'
import { useCallback } from 'react'

interface RemirrorEditorProps {
  text: string
  id: string | string[] | undefined
}

const RemirrorEditor = (props: RemirrorEditorProps) => {
  const { text, id } = props
  const hooks = [
    () => {
      const { getHTML } = useHelpers()

      const handleSaveShortcut = useCallback(
        ({ state }) => {
          console.log(`Save to backend`)

          fetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content: getHTML(state),
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data)
            })

          return true // Prevents any further key handlers from being run.
        },
        [getHTML]
      )

      // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
      useKeymap('Mod-s', handleSaveShortcut)
    },
  ]

  const { manager, state } = useRemirror({
    extensions: () => [
      new BoldExtension(),
      new ItalicExtension(),
      new UnderlineExtension(),
    ],

    // Set the initial content.
    content: text,

    // Place the cursor at the start of the document. This can also be set to
    // `end`, `all` or a numbered position.
    selection: 'start',

    // Set the string handler which means the content provided will be
    // automatically handled as html.
    // `markdown` is also available when the `MarkdownExtension`
    // is added to the editor.
    stringHandler: 'html',
  })

  return (
    <div className="remirror-theme">
      {/* the className is used to define css variables necessary for the editor */}
      <Remirror manager={manager} initialContent={state} hooks={hooks} />
    </div>
  )
}

export default RemirrorEditor
