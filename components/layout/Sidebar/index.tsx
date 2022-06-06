import BackgroundHighlight from './BackgroundHighlight'
import Item from './Item'
import Viewer from './Viewer'
import ScrollBar from '../../elements/Scrollbar'
import { useSidebarControl } from '../../providers/SidebarControlProvider'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useState } from 'react'
import {
  ArrowUpRight,
  Book,
  BookOpen,
  GitHub,
  Home,
  Twitter,
  X,
} from 'react-feather'

const Sidebar = () => {
  const [isHidden, setIsHidden] = useSidebarControl()

  const [bgHighLight, setBgHighLight] = useState({
    translate: 0,
    duration: 0,
    backgroundColor: 'rgb(245 245 245)',
    isHidden: false,
  })

  const updateBgHighlight = (changes: {
    translate?: number
    duration?: number
    backgroundColor?: string
    isHidden?: boolean
  }) => {
    setBgHighLight((state) => ({
      ...state,
      ...changes,
    }))
  }

  return (
    <div
      className={
        '3xl:w-80 absolute z-40 flex h-full max-h-screen min-h-screen w-3/4 flex-none transform flex-col overflow-hidden overflow-y-auto bg-neutral-50 transition duration-200 ease-in-out sm:w-1/2 md:w-1/3 lg:relative lg:w-56 lg:translate-x-0 2xl:w-72 ' +
        (isHidden ? '-translate-x-full' : 'translate-x-0')
      }
    >
      <div className="flex-0 sticky top-0 z-10 flex w-full items-center justify-start bg-neutral-50 px-3 pt-3 lg:hidden">
        <button
          className="block rounded-md p-2 text-black hover:bg-neutral-100 lg:hidden"
          onClick={() => setIsHidden(!isHidden)}
          type="button"
        >
          <X size={18} />
        </button>
      </div>
      <ScrollArea.Root className="w-full flex-grow">
        <ScrollArea.Viewport
          className="m-3 flex h-full min-h-full flex-1 flex-col space-y-2"
          onMouseEnter={() => {
            updateBgHighlight({
              duration: 150,
              backgroundColor: 'rgb(245 245 245)',
              isHidden: false,
            })
          }}
          onMouseLeave={() => {
            updateBgHighlight({
              isHidden: true,
              duration: 0,
            })
          }}
        >
          <div
            className="m-3 flex h-full min-h-full flex-1 flex-col space-y-2 first:m-0"
            onMouseEnter={() => {
              updateBgHighlight({
                duration: 150,
                backgroundColor: 'rgb(245 245 245)',
                isHidden: false,
              })
            }}
            onMouseLeave={() => {
              updateBgHighlight({
                isHidden: true,
                duration: 0,
              })
            }}
          >
            {/* TODO: Refactor into a hook, based off of the command palette implementation of this */}
            <BackgroundHighlight
              backgroundColor={bgHighLight.backgroundColor}
              duration={bgHighLight.duration}
              isHidden={bgHighLight.isHidden}
              translate={bgHighLight.translate}
            />

            <Item
              bgColor="rgb(245 245 245)"
              href="/"
              icon={<Home className="mr-3 inline-block" />}
              setIsHidden={setIsHidden}
              translate={0}
              updateBgHighlight={updateBgHighlight}
            >
              <span className="">Home</span>
            </Item>
            <Item
              activeIcon={<BookOpen className="mr-3 inline-block" />}
              bgColor="rgb(245 245 245)"
              href="/posts"
              icon={<Book className="mr-3 inline-block" />}
              setIsHidden={setIsHidden}
              translate={44}
              updateBgHighlight={updateBgHighlight}
            >
              <span className="">Posts</span>
            </Item>
            <span className="z-10 text-sm text-neutral-500">Social</span>
            <Item
              bgColor="rgb(245 245 245)"
              href="https://www.github.com/eiiot"
              icon={<GitHub className="mr-3 inline-block" />}
              setIsHidden={setIsHidden}
              translate={116}
              updateBgHighlight={updateBgHighlight}
            >
              <span className="">GitHub</span>{' '}
              <ArrowUpRight
                className="transition-transform duration-100 ease-in-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                size={18}
              />
            </Item>
            <Item
              bgColor="rgba(097,159,230,.1)"
              href="https://twitter.com/eiioth"
              icon={<Twitter className="mr-3 inline-block" />}
              setIsHidden={setIsHidden}
              translate={159}
              updateBgHighlight={updateBgHighlight}
            >
              <span className="">Twitter</span>{' '}
              <ArrowUpRight
                className="transition-transform duration-100 ease-in-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                size={18}
              />
            </Item>
          </div>
        </ScrollArea.Viewport>
        <ScrollBar />
      </ScrollArea.Root>
      <Viewer setIsHidden={setIsHidden} />
    </div>
  )
}

export default Sidebar
