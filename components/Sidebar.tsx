import ActiveLink from './ActiveLink'
import { useUser } from '@auth0/nextjs-auth0'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Code, HomeSimple, User } from 'iconoir-react'
import Image from 'next/image'

const Sidebar = () => {
  const { user, error, isLoading } = useUser()
  return (
    <div className="3xl:w-80 absolute z-30 flex h-full max-h-screen min-h-screen w-3/4 flex-none -translate-x-full transform flex-col overflow-y-auto border-r border-neutral-100 bg-white pb-10 transition duration-200 ease-in-out sm:w-1/2 sm:pb-0 md:w-1/3 lg:relative lg:z-auto lg:w-56 lg:translate-x-0 2xl:w-72">
      <div className="flex-0 sticky top-0 z-10 w-full bg-white py-2 px-3">
        <span className="text-normal inline-block w-full text-center font-normal">
          Eliot Hertenstein
        </span>
      </div>
      <ScrollArea.Root className="w-full flex-grow">
        <ScrollArea.Viewport className="flex-col">
          <div className="flex h-full flex-1 flex-col space-y-2 p-3">
            <ActiveLink
              activeClassName="!bg-black !text-white"
              className="justify-left flex flex-1 cursor-pointer items-center rounded-md  px-2 py-1.5 transition duration-200 hover:bg-neutral-100"
              href="/"
            >
              <HomeSimple className="mr-3 inline-block" />
              <span className="">Home</span>
            </ActiveLink>
            <ActiveLink
              activeClassName="!bg-black !text-white"
              className="justify-left flex flex-1 cursor-pointer items-center rounded-md  px-2 py-1.5 transition duration-200 hover:bg-neutral-100"
              href="/posts"
            >
              <Code className="mr-3 inline-block" />
              <span className="">Posts</span>
            </ActiveLink>
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar className="flex w-1 touch-none select-none">
          <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-[#7b7b7b] opacity-70 before:absolute before:top-1/2 before:left-1/2 before:h-full before:w-full before:-translate-x-1/2 before:-translate-y-1/2" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
      <div className="flex-0 sticky bottom-0 z-10 w-full bg-white px-3 py-2">
        {!user && (
          // eslint-disable-next-line @next/next/no-html-link-for-pages
          <a className="justify-self-end" href="/api/auth/login">
            <div className="justify-left flex flex-1 cursor-pointer items-center rounded-md  px-2 py-1.5 transition duration-200 hover:bg-neutral-100">
              <User className="mr-3 inline-block" />
              <span className="">Login</span>
            </div>
          </a>
        )}
        {user && (
          <div className="grid grid-cols-5">
            <div className="col-span-1 h-full w-full">
              <a
                className="h-full w-full items-center justify-center"
                href="/profile"
              >
                <Image
                  alt="Profile"
                  className="rounded-full"
                  height={32}
                  src={user.picture}
                  width={32}
                />
              </a>
            </div>
            <div className="col-span-2 flex h-full w-full items-center justify-center">
              <span className="text-normal inline-block w-full text-center font-normal">
                {user.name}
              </span>
            </div>
            <div className="col-span-2 h-full w-full">
              <span className="flex w-full items-center justify-center">
                <a
                  className="rounded-md px-3 py-2 shadow-xl"
                  href="/api/auth/logout"
                >
                  Logout
                </a>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
