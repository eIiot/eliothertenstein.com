import { Post } from '../../../graphql/types.generated'
import * as Dialog from '@radix-ui/react-dialog'

interface EditorSaveDialogProps {
  onOpenChange: (open: boolean) => void
  handleSave: (event: any) => void
  isSaveDialogOpen: boolean
  isSaving: boolean
  post: Post | null | undefined
}

const EditorSaveDialog = (props: EditorSaveDialogProps) => {
  const {
    onOpenChange: onSaveDialogChange,
    handleSave,
    isSaveDialogOpen,
    isSaving,
    post,
  } = props
  return (
    <Dialog.Root onOpenChange={onSaveDialogChange} open={isSaveDialogOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 flex items-center justify-center bg-transparent">
          <Dialog.Content className="items-left relative flex max-w-sm flex-col rounded-lg bg-white p-8 shadow-xl">
            <Dialog.Title className="text-lg font-bold">Save Post</Dialog.Title>
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
                    Excerpt
                  </label>
                  <textarea
                    className="inline-block flex-1 rounded-lg p-2 ring-1 ring-black"
                    defaultValue={post?.excerpt || ''}
                    name="excerpt"
                    placeholder="Excerpt"
                  />
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
  )
}

export default EditorSaveDialog
