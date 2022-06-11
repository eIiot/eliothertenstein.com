import { Post } from '../../../graphql/types.generated'
import * as Dialog from '@radix-ui/react-dialog'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { toast } from 'react-hot-toast'

interface EditorSaveDialogProps {
  onOpenChange: (open: boolean) => void
  handleSave: (event: any) => Promise<void>
  setIsSaveDialogOpen: (open: boolean) => void
  isSaveDialogOpen: boolean
  post: Post | null | undefined
}

const EditorSaveDialog = (props: EditorSaveDialogProps) => {
  const {
    onOpenChange: onSaveDialogChange,
    handleSave,
    setIsSaveDialogOpen,
    isSaveDialogOpen,
    post,
  } = props

  return (
    <Dialog.Root onOpenChange={onSaveDialogChange} open={isSaveDialogOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 flex items-center justify-center bg-transparent">
          <Dialog.Content className="items-left relative flex max-w-sm flex-col rounded-lg bg-white p-8 shadow-xl">
            <Dialog.Title className="text-lg font-bold">Save Post</Dialog.Title>
            <Dialog.Description className="flex flex-col space-y-4 text-sm font-normal">
              <span className="pb-3">
                Make changes to the post attributes here. Click save when
                you&apos;re done.
              </span>
              <Formik
                initialValues={{
                  title: post?.title ?? '',
                  excerpt: post?.excerpt ?? '',
                  slug: post?.slug ?? '',
                  draft: false,
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleSave(values)
                    .then(() => {
                      toast.success(values.draft ? 'Saved!' : 'Published!')
                      setSubmitting(false)
                      setIsSaveDialogOpen(false)
                      setTimeout(() => {
                        if (!post) {
                          window.location.href = `/posts/${values.slug}`
                        }
                      }, 1000)
                    })
                    .catch((error) => {
                      setSubmitting(false)
                      console.error(error)
                      toast.error(error.message)
                      return false
                    })
                }}
                validate={(values) => {
                  const errors: { [key: string]: any } = {}

                  if (!values.title) {
                    errors.title = 'Required'
                  }

                  // make sure slug can be used as a URL
                  const slug = values.slug
                    .toLowerCase()
                    .replace(/ /g, '-')
                    .replace(/[^a-z0-9-]/g, '')

                  if (!slug) {
                    errors.slug = 'Required'
                  }

                  return errors
                }}
              >
                {({ isSubmitting, errors, submitForm, setFieldValue }) => (
                  <Form className="space-y-4">
                    <fieldset className="flex w-full flex-row items-center justify-center space-x-3">
                      <label className="h-min w-16 flex-none text-right text-sm font-bold">
                        Title
                      </label>
                      <Field
                        className="inline-block flex-1 rounded-lg p-2 outline-none ring-2"
                        // defaultValue={post?.title || ''}
                        name="title"
                        placeholder="Title"
                        style={{
                          animation: errors.title
                            ? 'shake 0.5s ease-in-out'
                            : 'none',
                          '--tw-ring-color': errors.title
                            ? 'rgb(239 68 68)'
                            : '#000000',
                        }}
                        type="text"
                      />
                      {/* <label className="text-sm font-bold">Description</label> */}
                    </fieldset>
                    <fieldset className="flex w-full flex-row items-center justify-center space-x-3">
                      <label className="h-min w-16 flex-none text-right text-sm font-bold">
                        Excerpt
                      </label>
                      <Field
                        className="inline-block flex-1 rounded-lg p-2 outline-none ring-2 ring-black"
                        // defaultValue={post?.excerpt || ''}
                        name="excerpt"
                        placeholder="Excerpt"
                      />
                    </fieldset>
                    <fieldset className="flex w-full flex-row items-center justify-center space-x-3">
                      <label className="h-min w-16 flex-none text-right text-sm font-bold">
                        Slug
                      </label>
                      <Field
                        className={
                          'inline-block flex-1 rounded-lg p-2 outline-none ring-2' +
                          (post?.slug ? ' text-neutral-400' : '')
                        }
                        disabled={!!post?.slug}
                        name="slug"
                        placeholder="Slug"
                        style={{
                          animation: errors.slug
                            ? 'shake 0.5s ease-in-out'
                            : 'none',
                          '--tw-ring-color': errors.slug
                            ? 'rgb(239 68 68)'
                            : '#000000',
                        }}
                        type="text"
                        value={post?.slug}
                      />
                    </fieldset>

                    <div className="flex flex-row items-center justify-end space-x-3">
                      <button
                        aria-label="Close"
                        className="animate-hover-grow inline-block rounded-lg bg-green-700 px-3 py-2 text-white"
                        disabled={isSubmitting}
                        type="submit"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            Saving...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            Save
                          </span>
                        )}
                      </button>
                      <button
                        aria-label="Close"
                        className="animate-hover-grow inline-block rounded-lg bg-blue-700 px-3 py-2 text-white"
                        disabled={isSubmitting}
                        onClick={() => {
                          setFieldValue('draft', true)
                          submitForm()
                        }}
                        type="button"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            Saving...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            Draft
                          </span>
                        )}
                      </button>
                      <Dialog.Close
                        aria-label="Cancel"
                        className="animate-hover-grow inline-block rounded-lg bg-neutral-800 px-3 py-2 text-white"
                        type="submit"
                      >
                        Cancel
                      </Dialog.Close>
                    </div>
                  </Form>
                )}
              </Formik>
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default EditorSaveDialog
