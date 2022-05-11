import { EDITOR_JS_TOOLS } from './tools'
import {
  Post,
  useDeletePostMutation,
  useUpsertPostMutation,
} from '../../../graphql/types.generated'
import { EditorConfig } from '@editorjs/editorjs'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as Dialog from '@radix-ui/react-dialog'
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
        tools={EDITOR_JS_TOOLS}
      />
      <Dialog.Root onOpenChange={onSaveDialogChange} open={isSaveDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-10 flex items-center justify-center bg-transparent">
            <Dialog.Content className="items-left relative flex max-w-sm flex-col rounded-lg bg-white p-8 shadow-xl">
              <Dialog.Title className="text-lg font-bold">
                Save Post
              </Dialog.Title>
              <Dialog.Description className="flex flex-col space-y-4 text-sm font-normal">
                <span className="pb-3">
                  Make changes to the post attributes here. Click save when
                  you&apos;re done.
                </span>
                <form className="space-y-4" onSubmit={handleSave}>
                  <fieldset className="flex w-full flex-row items-center justify-center space-x-3">
                    <label className="h-min w-16 flex-none text-right text-sm font-bold">
                      Title
                    </label>
                    <input
                      className="inline-block flex-1 rounded-lg p-2 ring-1 ring-black"
                      defaultValue={post?.title || ''}
                      name="title"
                      placeholder="Title"
                      type="text"
                    />
                    {/* <label className="text-sm font-bold">Description</label> */}
                  </fieldset>
                  <fieldset className="flex w-full flex-row items-center justify-center space-x-3">
                    <label className="h-min w-16 flex-none text-right text-sm font-bold">
                      Exerpt
                    </label>
                    <textarea
                      className="inline-block flex-1 rounded-lg p-2 ring-1 ring-black"
                      defaultValue={post?.excerpt || ''}
                      name="excerpt"
                      placeholder="Exerpt"
                    />
                    {/* <label className="text-sm font-bold">Description</label> */}
                  </fieldset>
                  <fieldset className="flex w-full flex-row items-center justify-center space-x-3">
                    <label className="h-min w-16 flex-none text-right text-sm font-bold">
                      Slug
                    </label>
                    <input
                      className={
                        'inline-block flex-1 rounded-lg p-2 ring-1 ring-black' +
                        (post?.slug ? ' text-neutral-400' : '')
                      }
                      disabled={!!post?.slug}
                      name="slug"
                      placeholder="Slug"
                      type="text"
                      value={post?.slug}
                    />
                    {/* <label className="text-sm font-bold">Description</label> */}
                  </fieldset>

                  <div className="flex flex-row items-center justify-end space-x-3">
                    <button
                      aria-label="Close"
                      className="animate-button-hover inline-block rounded-lg bg-green-700 px-3 py-2 text-white"
                      type="submit"
                    >
                      {isSaving ? (
                        <span className="flex items-center justify-center">
                          Saving...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          Save
                        </span>
                      )}
                    </button>
                    <Dialog.Close
                      aria-label="Cancel"
                      className="animate-button-hover inline-block rounded-lg bg-neutral-800 px-3 py-2 text-white"
                      type="submit"
                    >
                      Cancel
                    </Dialog.Close>
                  </div>
                </form>
              </Dialog.Description>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
      <AlertDialog.Root
        onOpenChange={onDeleteDialogChange}
        open={isDeleteDialogOpen}
      >
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 z-10 flex items-center justify-center bg-transparent">
            <AlertDialog.Content className="items-left relative flex max-w-sm flex-col rounded-lg bg-white p-8 shadow-xl">
              <AlertDialog.Title className="text-lg font-bold">
                Delete Post
              </AlertDialog.Title>
              <AlertDialog.Description className="flex flex-col space-y-4 text-sm font-normal">
                <span className="pb-3">
                  Are you sure you want to delete this post?
                </span>
                <span className="flex flex-row items-center justify-evenly space-x-3">
                  <AlertDialog.Action
                    className="animate-button-hover rounded-md bg-red-700 px-3 py-2 text-white"
                    onClick={handleDelete}
                  >
                    {isDeleting ? (
                      <span className="flex items-center justify-center">
                        Deleting...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Delete
                      </span>
                    )}
                  </AlertDialog.Action>
                  <AlertDialog.Cancel className="animate-button-hover rounded-md bg-neutral-800 px-3 py-2 text-white">
                    Cancel
                  </AlertDialog.Cancel>
                </span>
              </AlertDialog.Description>
            </AlertDialog.Content>
          </AlertDialog.Overlay>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  )
}

EditorJSPostEditor.defaultProps = {
  content: undefined,
  post: undefined,
}

export default EditorJSPostEditor
