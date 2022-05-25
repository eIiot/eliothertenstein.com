import { Global } from '@emotion/core'
import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { configure, GlobalHotKeys, HotKeys } from 'react-hotkeys'

interface SearchProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Search = (props: SearchProps) => {
  const { onChange } = props
  return (
    <input
      className="z-10 mb-2 inline-block h-[52px] flex-1 rounded-md bg-transparent p-2 text-2xl outline-none ring-2 ring-neutral-100"
      onChange={onChange}
      type="text"
    />
  )
}

interface ItemProps {
  title: string
  tags: string[]
  icon: React.ReactNode
  href: string
}

interface CompItemProps extends ItemProps {
  onMouseMove: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  onMouseLeave: () => void
}

const Item = (props: CompItemProps) => {
  const { title, tags, icon, href, onMouseMove, onMouseEnter, onMouseLeave } =
    props

  if (href.startsWith('http')) {
    return (
      <a
        className="z-10 flex flex-row space-y-2 p-3 outline-none"
        href={href}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
      >
        <span className="flex flex-none flex-row items-center justify-center space-x-2">
          {icon}
          <span className="text-lg">{title}</span>
        </span>
      </a>
    )
  } else {
    return (
      <Link
        href={href}
        // legacyBehavior={false}
        passHref
      >
        <a
          className="z-10 flex flex-row space-y-2 p-3 outline-none"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
        >
          <span className="flex flex-none flex-row items-center justify-center space-x-2">
            {icon}
            <span className="text-lg">{title}</span>
          </span>
        </a>
      </Link>
    )
  }
}

interface CommandBarProps {
  items: ItemProps[]
}

const CommandBar = (props: CommandBarProps) => {
  const { items } = props

  const router = useRouter()

  const [searchItems, setSearchItems] = useState(items)

  const [bgHighlightTranslate, setBgHighlightTranslate] = useState(0)
  const [bgHighlightHeight, setBgHighlightHeight] = useState(0)
  const [displayBgHighlight, setDisplayBgHighlight] = useState(false)
  const [bgHighlightAnimationDuration, setBgHighlightAnimationDuration] =
    useState(0)

  const [highlightedItem, setHighlightedItem] = useState<HTMLElement | null>(
    null
  )

  const [isOpen, setIsOpen] = useState(false)

  const itemsRef = React.useRef<HTMLDivElement>(null)

  const handlers = {
    DOWN: (event: any) => {
      event.preventDefault()
      setHighlightedItem((prevState) => {
        const nextItem = prevState?.nextElementSibling as HTMLElement
        if (!prevState) {
          return itemsRef.current?.children[1] as HTMLElement
        }
        if (nextItem) {
          return nextItem
        } else {
          return itemsRef.current?.children[0] as HTMLElement
        }
      })
    },
    UP: (event: any) => {
      event.preventDefault()
      setHighlightedItem((prevState) => {
        const prevItem = prevState?.previousElementSibling as HTMLElement
        if (prevItem) {
          return prevItem
        } else {
          return itemsRef.current?.lastElementChild as HTMLElement
        }
      })
    },
    CLOSE: () => {
      setIsOpen(false)
    },
    ENTER: () => {
      if (highlightedItem) {
        highlightedItem.click()
      }
    },
  }

  const keyMap = {
    DOWN: 'down',
    UP: 'up',
    CLOSE: 'escape',
    ENTER: 'enter',
  }

  const globalKeyMap = {
    OPEN: ['command+k', 'ctrl+k'],
  }

  configure({
    ignoreTags: ['INPUT', 'TEXTAREA'],
  })

  const globalHandlers = {
    OPEN: (event: any) => {
      event.preventDefault()

      setSearchItems(items)
      setIsOpen(true)
      // console.log(itemsRef.current)
      // setHighlightedItem(itemsRef.current?.children[0] as HTMLElement)
    },
  }

  useEffect(() => {
    if (highlightedItem) {
      // highlightedItem.focus()
      setDisplayBgHighlight(true)
      setBgHighlightAnimationDuration(150)
      // get top of element relative to the parent
      const elementTop = highlightedItem.getBoundingClientRect().top
      // get top of parent
      const parentTop = highlightedItem.parentElement?.getBoundingClientRect()
        .top as number

      setBgHighlightTranslate(elementTop - parentTop ?? 0)

      // get height of element
      const elementHeight = highlightedItem.getBoundingClientRect().height
      setBgHighlightHeight(elementHeight)
    } else {
      setDisplayBgHighlight(false)
      setBgHighlightAnimationDuration(0)
    }
  }, [highlightedItem])

  useEffect(() => {
    setIsOpen(false)
  }, [router.asPath])

  return (
    <HotKeys handlers={handlers} keyMap={keyMap}>
      <GlobalHotKeys handlers={globalHandlers} keyMap={globalKeyMap} />
      <Dialog.Root onOpenChange={setIsOpen} open={isOpen}>
        <Dialog.Overlay className="fixed inset-0 z-10 flex justify-center bg-neutral-400/30 pt-[20vh]">
          <Dialog.Content
            className="absolute bottom-0 flex !h-[66vh] w-full flex-col overflow-auto rounded-lg bg-white p-2 ring-2 ring-neutral-300 transition-all duration-100 md:relative md:!h-min md:max-h-[50vh] md:w-2/5 md:min-w-[500px]"
            onOpenAutoFocus={() => {
              setHighlightedItem(itemsRef.current?.children[0] as HTMLElement)
            }}
            style={{
              height: `${searchItems.length * 52 + 64}px`,
            }}
          >
            <div
              className="absolute w-[calc(100%-16px)] rounded-md bg-neutral-100 transition-transform duration-100"
              style={{
                height: `${bgHighlightHeight}px`,
                transform: `translateY(${bgHighlightTranslate}px)`,
                display: displayBgHighlight ? 'block' : 'none',
                transition: `transform ${bgHighlightAnimationDuration}ms ease-in-out`,
              }}
            />

            <div className="inset-0 flex flex-col" ref={itemsRef}>
              <Search
                onChange={(e) => {
                  const newItems = items.filter((item) => {
                    const title = item.title.toLowerCase()
                    return title
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  })

                  if (items.length > newItems.length) {
                    setHighlightedItem(
                      itemsRef.current?.children[0] as HTMLElement
                    )
                  }

                  setSearchItems(newItems)
                }}
              />
              {searchItems.map((item, index) => {
                const { title, tags, icon, href } = item
                return (
                  <Item
                    {...item}
                    key={title}
                    onMouseEnter={(
                      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                    ) => {
                      setHighlightedItem(e.currentTarget)
                    }}
                    onMouseLeave={() => {
                      setHighlightedItem(null)
                    }}
                    onMouseMove={(
                      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                    ) => {
                      setHighlightedItem(e.currentTarget)
                    }}
                  />
                )
              })}
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Root>
    </HotKeys>
  )
}

export default CommandBar
