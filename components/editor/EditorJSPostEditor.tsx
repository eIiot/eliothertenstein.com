import { EDITOR_JS_TOOLS } from './tools'
import { useUpsertPostMutation } from '../../graphql/types.generated'
import { EditorConfig } from '@editorjs/editorjs'
import { SaveActionFloppy } from 'iconoir-react'
import { useCallback, useRef } from 'react'
import { createReactEditorJS } from 'react-editor-js'
import { toast } from 'react-hot-toast'
import { useHotkeys } from 'react-hotkeys-hook'

const ReactEditorJS = createReactEditorJS()

interface EditorJSPostEditorProps {
  slug: string
  content: string
}

interface EditorCore {
  destroy(): Promise<void>

  clear(): Promise<void>

  save(): Promise<EditorConfig>

  render(data: EditorConfig): Promise<void>
}

const EditorJSPostEditor = (props: EditorJSPostEditorProps) => {
  const { slug, content } = props
  const editorCore = useRef<EditorCore | null>(null)

  const jsonContent = JSON.parse(content)

  console.log('jsonContent', jsonContent)

  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance
  }, [])

  const [upsertPost] = useUpsertPostMutation()

  const handleSave = useCallback(() => {
    editorCore.current?.save().then((savedJsonContent) => {
      const content = JSON.stringify(savedJsonContent)
      upsertPost({
        variables: {
          slug,
          content,
        },
      })
        .then(() => {
          toast.success('Saved!')
        })
        .catch((error) => {
          toast.error(error.message)
        })
    })
  }, [slug, upsertPost])

  useHotkeys(
    'command+s, control+s',
    (k) => {
      k.preventDefault()
      console.log('Saved')
      handleSave()
    },
    {
      enableOnContentEditable: true,
    }
  )

  return (
    <>
      <span
        className="absolute right-0 top-0 m-3 cursor-pointer rounded-lg p-3 text-black shadow-lg hover:bg-neutral-100"
        onClick={handleSave}
      >
        <SaveActionFloppy />
      </span>
      <ReactEditorJS
        defaultValue={jsonContent}
        onInitialize={handleInitialize}
        tools={EDITOR_JS_TOOLS}
      />
    </>
  )
}

export default EditorJSPostEditor
