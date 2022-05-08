import { useUpdatePostMutation } from '../../graphql/types.generated'
import { Remirror, useHelpers, useKeymap, useRemirror } from '@remirror/react'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import {
  BoldExtension,
  ItalicExtension,
  UnderlineExtension,
  MarkdownExtension,
} from 'remirror/extensions'
import 'remirror/styles/all.css'

interface RemirrorPostEditorProps {
  text: string
  slug: string
}

const RemirrorPostEditor = (props: RemirrorPostEditorProps) => {
  const { text, slug } = props

  const [updatePost] = useUpdatePostMutation()

  const hooks = [
    () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { getMarkdown } = useHelpers()

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const handleSaveShortcut = useCallback(
        ({ state }) => {
          console.log(`Save to backend: ${getMarkdown(state)}`)

          updatePost({
            variables: {
              slug,
              text: getMarkdown(state),
            },
          })

          toast.success('Saved!')

          return true // Prevents any further key handlers from being run.
        },
        [getMarkdown]
      )

      // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useKeymap('Mod-s', handleSaveShortcut)
    },
  ]

  const { manager, state } = useRemirror({
    extensions: () => [
      new BoldExtension(),
      new ItalicExtension(),
      new UnderlineExtension(),
      new MarkdownExtension(),
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
      <Remirror hooks={hooks} initialContent={state} manager={manager} />
    </div>
  )
}

export default RemirrorPostEditor
function useParams<T>(): [any] {
  throw new Error('Function not implemented.')
}
