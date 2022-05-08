import { useUpdatePostMutation } from '../../graphql/types.generated'
import { useCallback, useRef } from 'react'
import { createReactEditorJS } from 'react-editor-js'
import toast from 'react-hot-toast'
import { useHotkeys } from 'react-hotkeys-hook'

const ReactEditorJS = createReactEditorJS()

interface EditorJSPostEditorProps {
  slug: string
  content: string
}

interface EditorCore {
  destroy(): Promise<void>

  clear(): Promise<void>

  save(): Promise<OutputData>

  render(data: OutputData): Promise<void>
}

const EditorJSPostEditor = (props: EditorJSPostEditorProps) => {
  const { slug, content } = props
  const editorCore = useRef(null)

  const jsonContent = JSON.parse(content)

  console.log('jsonContent', jsonContent)

  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance
  }, [])

  const [updatePost] = useUpdatePostMutation()

  const handleSave = useCallback(() => {
    editorCore.current.save().then((savedJsonContent) => {
      const content = JSON.stringify(savedJsonContent)
      updatePost({
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
  }, [])

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
    <ReactEditorJS defaultValue={jsonContent} onInitialize={handleInitialize} />
  )
}

export default EditorJSPostEditor
