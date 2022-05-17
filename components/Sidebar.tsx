import ActiveLink from './ActiveLink'
import { useUser } from '@auth0/nextjs-auth0'
import * as Avatar from '@radix-ui/react-avatar'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowUpRight,
  Book,
  BookOpen,
  GitHub,
  Home,
  Menu,
  Settings,
  User,
  X,
} from 'react-feather'

interface SidebarProps {
  isHidden: boolean
  setIsHidden: (isHidden: boolean) => void
}

const Sidebar = (props: SidebarProps) => {
  const { isHidden, setIsHidden } = props
  const { user, error, isLoading } = useUser()
  const [bgHighlightTranslate, setBgHighlightTranslate] = useState(0)
  const [displayBgHighlight, setDisplayBgHighlight] = useState(false)
  const [bgHighlightAnimationDuration, setBgHighlightAnimationDuration] =
    useState(0)

  return (
    <div
      className={
        '3xl:w-80 absolute z-40 flex h-full max-h-screen min-h-screen w-3/4 flex-none transform flex-col overflow-hidden overflow-y-auto border-r border-neutral-100 bg-white transition duration-200 ease-in-out sm:w-1/2 md:w-1/3 lg:relative lg:z-auto lg:w-56 lg:translate-x-0 2xl:w-72 ' +
        (isHidden ? '-translate-x-full' : 'translate-x-0')
      }
    >
      <div className="flex-0 sticky top-0 z-10 w-full bg-white py-2 px-3">
        <span className="text-normal relative inline-block w-full text-center font-normal">
          <button
            className="absolute left-0 top-0 block lg:hidden"
            onClick={() => setIsHidden(!isHidden)}
            type="button"
          >
            <X size={24} />
          </button>
          Eliot Hertenstein
        </span>
      </div>
      <ScrollArea.Root className="w-full flex-grow">
        <ScrollArea.Viewport className="min-h-full flex-col">
          <div
            className="m-3 flex h-full min-h-full flex-1 flex-col space-y-2"
            onMouseEnter={() => {
              setDisplayBgHighlight(true)
              setBgHighlightAnimationDuration(200)
            }}
            onMouseLeave={() => {
              setDisplayBgHighlight(false)
              setBgHighlightAnimationDuration(0)
            }}
          >
            <div
              className="absolute top-[20px] h-9 w-full rounded-md bg-neutral-100 px-2"
              style={{
                transform: `translateY(${bgHighlightTranslate}px)`,
                display: displayBgHighlight ? 'block' : 'none',
                transition: `transform ${bgHighlightAnimationDuration}ms ease-in-out`,
              }}
            />
            <ActiveLink
              activeClassName="after:absolute after:right-0 after:h-9 after:w-1 after:translate-x-1/2 after:rounded-sm after:bg-black"
              className="justify-left group z-10 flex flex-1 cursor-pointer items-center rounded-md px-2 py-1.5 transition duration-200"
              href="/"
              inactiveClassName="bg-transparent text-black"
              onClick={() => {
                setIsHidden(true)
              }}
              onMouseEnter={() => {
                setBgHighlightTranslate(0)
              }}
            >
              <>
                <Home className="mr-3 inline-block" />
                <span className="">Home</span>
              </>
            </ActiveLink>
            <ActiveLink
              activeChildren={<BookOpen className="mr-3 inline-block" />}
              activeClassName="after:absolute after:right-0 after:h-9 after:w-1 after:translate-x-1/2 after:rounded-sm after:bg-black"
              className="justify-left z-10 flex flex-1 cursor-pointer items-center rounded-md px-2 py-1.5 transition duration-200"
              href="/posts"
              inactiveChildren={<Book className="mr-3 inline-block" />}
              inactiveClassName="bg-transparent text-black"
              onClick={() => {
                setIsHidden(true)
              }}
              onMouseEnter={() => {
                setBgHighlightTranslate(44)
              }}
            >
              <span className="">Posts</span>
            </ActiveLink>
            <span className="z-10">Social</span>
            <a
              className="justify-left group z-10 flex flex-1 cursor-pointer items-center rounded-md px-2 py-1.5 transition duration-200"
              href="https://www.github.com/eiiot"
              onClick={() => {
                setIsHidden(true)
              }}
              onMouseEnter={() => {
                setBgHighlightTranslate(119)
              }}
              rel="noreferrer" target="_blank"
            >
              <GitHub className="mr-3 inline-block" />
              <span className="">GitHub</span>
              <ArrowUpRight
                className="transition-transform duration-100 ease-in-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                size={18}
              />
            </a>
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
            <div className="col-span-1 flex h-full w-full items-center justify-center">
              <Link className="" href="/profile/me">
                <Avatar.Root className="h-8 w-8 cursor-pointer rounded-full bg-neutral-100">
                  <Avatar.Image
                    alt="Profile"
                    className="rounded-full"
                    src={user.picture ?? undefined}
                  />
                  <Avatar.Fallback className="color-red-500 content-center items-center">
                    EH
                  </Avatar.Fallback>
                </Avatar.Root>
              </Link>
            </div>
            <div className="col-span-3 flex h-full w-full items-center justify-center">
              <span className="text-normal inline-block w-full pl-2 text-left font-normal">
                {user.name}
              </span>
            </div>
            <div className="col-span-1 h-full w-full">
              <span className="flex h-full w-full items-center justify-center">
                <Link href="/me/settings" passHref>
                  <a
                    className="cursor-pointer rounded-md hover:bg-neutral-100"
                    onClick={() => {
                      setIsHidden(true)
                    }}
                  >
                    <Settings className="m-2 inline-block" size={18} />{' '}
                  </a>
                </Link>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
