import OpenSidebarButton from '../../../components/buttons/OpenSidebarButton'
import { getLayout } from '../../../components/layouts/SiteLayout'
import { useDeleteUserMutation, User } from '../../../graphql/types.generated'
import prisma from '../../../lib/prisma'
import { AuthPage } from '../../../types/page'
import { getSession, Session, withPageAuthRequired } from '@auth0/nextjs-auth0'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { ReactElement, useState } from 'react'
import { ArrowLeft, Menu } from 'react-feather'
import { toast } from 'react-hot-toast'

interface SettingsPageProps {
  viewer: User
  isSidebarHidden: boolean
  setIsSidebarHidden: (isSidebarHidden: boolean) => void
}

const SettingsPage = withPageAuthRequired((props: SettingsPageProps) => {
  const { viewer, isSidebarHidden, setIsSidebarHidden } = props
  const [deleteUser] = useDeleteUserMutation()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onDeleteDialogChange = (open: boolean) => {
    setIsDeleteDialogOpen(open)
  }

  const onDeleteHandler = (id: string) => {
    setIsLoading(true)
    deleteUser({
      variables: {
        id,
      },
    })
      .then((user) => {
        window.location.href = '/api/auth/logout'
      })
      .catch((err) => {
        toast.error(err.message)
        console.error('Error while attempting to delete a user account: ' + err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  return (
    <>
      <NextSeo
        robotsProps={{
          noarchive: true,
        }}
        title="Settings"
      />
      <span className="mt-32 flex flex-col items-start space-y-3 px-9">
        <OpenSidebarButton
          isSidebarHidden={isSidebarHidden}
          setIsSidebarHidden={setIsSidebarHidden}
        />
        <h1 className="h-2xl font-bold">Account</h1>
        <Link href="/api/auth/logout" passHref>
          <a className="animate-hover-grow rounded-md border-[1px] border-neutral-300 px-3 py-2 shadow-sm ">
            Logout
          </a>
        </Link>

        <button
          className="animate-hover-grow rounded-md bg-red-700 px-3 py-2 text-white shadow-sm"
          onClick={() => {
            setIsDeleteDialogOpen(true)
          }}
          type="button"
        >
          Delete Account
        </button>
        <span className="text-sm text-neutral-600">
          Deleting your account will delete all data strored on our servers,
          including comments and profile information.
        </span>

        <AlertDialog.Root
          onOpenChange={onDeleteDialogChange}
          open={isDeleteDialogOpen}
        >
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="fixed inset-0 z-10 flex items-center justify-center bg-transparent">
              <AlertDialog.Content className="items-left relative flex max-w-sm flex-col rounded-lg bg-white p-8 shadow-xl">
                <AlertDialog.Title className="text-lg font-bold">
                  Delete Your Account
                </AlertDialog.Title>
                <AlertDialog.Description className="flex flex-col space-y-4 text-sm font-normal">
                  <span className="pb-3">
                    Are you sure you want to delete your account? All data will
                    be lost.
                  </span>
                  <span className="flex flex-row items-center justify-evenly space-x-3">
                    <AlertDialog.Action
                      className="animate-hover-grow rounded-md bg-red-700 px-3 py-2 text-white"
                      onClick={() => {
                        onDeleteHandler(viewer.id)
                      }}
                    >
                      <span className="flex items-center justify-center">
                        Delete
                      </span>
                    </AlertDialog.Action>
                    <AlertDialog.Cancel className="animate-hover-grow rounded-md border-[1px] border-neutral-300 px-3 py-2 ">
                      Cancel
                    </AlertDialog.Cancel>
                  </span>
                </AlertDialog.Description>
              </AlertDialog.Content>
            </AlertDialog.Overlay>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </span>
    </>
  )
}) as AuthPage

SettingsPage.getLayout = (page: ReactElement) => getLayout(page)

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/',
  async getServerSideProps(ctx) {
    const { user: viewer } = getSession(ctx.req, ctx.res) as Session
    const user = await prisma.user.findUnique({
      where: { id: viewer?.sub },
    })
    const isAdmin = user?.role === 'ADMIN'
    return {
      props: {
        viewer: {
          ...user,
          isAdmin,
        },
      },
    }
  },
})

export default SettingsPage
