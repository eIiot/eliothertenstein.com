import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Code, HomeSimple } from 'iconoir-react'
import Link from 'next/link'
import ActiveLink from './ActiveLink'

const Sidebar = () => {
  return (
    <div className="3xl:w-80 absolute z-30 flex h-full max-h-screen min-h-screen w-3/4 flex-none -translate-x-full transform flex-col overflow-y-auto border-r border-neutral-100 bg-white pb-10 transition duration-200 ease-in-out sm:w-1/2 sm:pb-0 md:w-1/3 lg:relative lg:z-auto lg:w-56 lg:translate-x-0 2xl:w-72">
      <ScrollArea.Root className="h-full w-full">
        <ScrollArea.Viewport className="h-full">
          <div className="text-normal w-full pt-3 text-center font-normal">
            Eliot Hertenstein
          </div>
          <div className="flex flex-col space-y-2 p-3">
            <ActiveLink
              href="/"
              className="justify-left flex flex-1 cursor-pointer items-center rounded-md  px-2 py-1.5 transition duration-200 hover:bg-neutral-100"
              activeClassName="!bg-black !text-white"
            >
              <HomeSimple className="mr-3 inline-block" />
              <span className="">Home</span>
            </ActiveLink>
            <ActiveLink
              href="/posts"
              className="justify-left flex flex-1 cursor-pointer items-center rounded-md  px-2 py-1.5 transition duration-200 hover:bg-neutral-100"
              activeClassName="!bg-black !text-white"
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
    </div>
  )
}

export default Sidebar
