import * as AlertDialog from '@radix-ui/react-alert-dialog'

interface EditorDeleteDialogProps {
  onDeleteDialogChange: (open: boolean) => void
  handleDelete: () => void
  isDeleteDialogOpen: boolean
  isDeleting: boolean
}

const EditorDeleteDialog = (props: EditorDeleteDialogProps) => {
  const { onDeleteDialogChange, handleDelete, isDeleteDialogOpen, isDeleting } =
    props
  return (
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
                  className="animate-hover-grow rounded-md bg-red-700 px-3 py-2 text-white"
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
                <AlertDialog.Cancel className="animate-hover-grow rounded-md bg-neutral-800 px-3 py-2 text-white">
                  Cancel
                </AlertDialog.Cancel>
              </span>
            </AlertDialog.Description>
          </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

export default EditorDeleteDialog
