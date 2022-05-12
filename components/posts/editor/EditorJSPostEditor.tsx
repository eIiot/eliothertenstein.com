import EditorDeleteDialog from './EditorDeleteDialog'
import EditorSaveDialog from './EditorSaveDialog'
import { EDITOR_JS_TOOLS } from './tools'
import {
  Post,
  useDeletePostMutation,
  useUpsertPostMutation,
} from '../../../graphql/types.generated'
import { EditorConfig } from '@editorjs/editorjs'
import DragDrop from 'editorjs-drag-drop'
// @ts-ignore NO TYPING AVAILABLE
import Undo from 'editorjs-undo'
import { useCallback, useRef, useState } from 'react'
import { createReactEditorJS } from 'react-editor-js'
import { Save, Trash2 } from 'react-feather'
import { toast } from 'react-hot-toast'
import { useHotkeys } from 'react-hotkeys-hook'

const ReactEditorJS = createReactEditorJS()

interface EditorJSPostEditorProps {
  post?: Post | null
  content?: string
}

interface EditorCore {
  destroy(): Promise<void>

  clear(): Promise<void>

  save(): Promise<EditorConfig>

  render(data: EditorConfig): Promise<void>
}

const EditorJSPostEditor = (props: EditorJSPostEditorProps) => {
  const { post, content } = props

  const editorCore = useRef<EditorCore | null>(null)

  const jsonContent = content ? (JSON.parse(content) as EditorConfig) : null

  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance
  }, [])

  const handleReady = () => {
    const editor = editorCore.current._editorJS
    new Undo({ editor })
    new DragDrop(editor)
  }

  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [upsertPost] = useUpsertPostMutation()
  const [deletePost] = useDeletePostMutation()

  const onSaveDialogChange = (open: boolean) => {
    setIsSaveDialogOpen(open)
  }

  const onDeleteDialogChange = (open: boolean) => {
    setIsDeleteDialogOpen(open)
  }

  const handleSave = useCallback(
    (event) => {
      event.preventDefault()
      console.log(event.target.elements.slug)
      const slug = post?.slug || event.target.elements.slug.value
      const title = event.target.elements.title.value
      const excerpt = event.target.elements.excerpt.value
      editorCore.current?.save().then((savedJsonContent) => {
        const content = JSON.stringify(savedJsonContent)
        setIsSaving(true)
        upsertPost({
          variables: {
            slug,
            title,
            excerpt,
            content,
          },
        })
          .then(() => {
            setIsSaving(false)
            toast.success('Saved!')
            onSaveDialogChange(false)
            if (!post) {
              window.location.href = `/posts/${slug}`
            }
          })
          .catch((error) => {
            setIsSaving(false)
            console.error(error)
            toast.error(error.message)
          })
      })
    },
    [upsertPost]
  )

  const handleDelete = useCallback(() => {
    console.log('delete', post?.slug)
    setIsDeleting(true)
    deletePost({
      variables: {
        slug: post?.slug as string,
      },
    })
      .then(() => {
        setIsDeleting(false)
        toast.success('Deleted!')
        setTimeout(() => {
          window.location.href = '/posts' // force reload
        }, 500)
      })
      .catch((error) => {
        setIsDeleting(false)
        console.error(error)
        toast.error(error.message)
      })
  }, [deletePost, post])

  useHotkeys(
    'command+s, control+s',
    (k) => {
      k.preventDefault()
      console.log('Saved')
      onSaveDialogChange(true)
    },
    {
      enableOnContentEditable: true,
    }
  )

  return (
    <>
      <span
        className="peer absolute right-0 top-0 z-10 m-3 cursor-pointer rounded-lg bg-white p-3 text-black shadow-lg hover:bg-neutral-100"
        onClick={() => {
          onSaveDialogChange(true)
        }}
      >
        <Save />
      </span>
      {post && (
        <span
          className="duration-400 absolute right-0 top-0 m-3 cursor-pointer rounded-lg bg-white p-3 text-black shadow-lg transition-transform delay-1000 hover:translate-y-[calc(100%+0.75rem)] hover:bg-neutral-100 peer-hover:translate-y-[calc(100%+0.75rem)] peer-hover:delay-0"
          onClick={() => {
            onDeleteDialogChange(true)
          }}
        >
          <Trash2 />
        </span>
      )}
      <ReactEditorJS
        defaultValue={jsonContent}
        onInitialize={handleInitialize}
        onReady={handleReady}
        tools={EDITOR_JS_TOOLS}
      />
      <EditorSaveDialog
        handleSave={handleSave}
        isSaveDialogOpen={isSaveDialogOpen}
        isSaving={isSaving}
        onOpenChange={onSaveDialogChange}
        post={post}
      />
      <EditorDeleteDialog
        handleDelete={handleDelete}
        isDeleteDialogOpen={isDeleteDialogOpen}
        isDeleting={isDeleting}
        onDeleteDialogChange={onDeleteDialogChange}
      />
    </>
  )
}

EditorJSPostEditor.defaultProps = {
  content: undefined,
  post: undefined,
}

export default EditorJSPostEditor
