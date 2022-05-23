import * as Dialog from '@radix-ui/react-dialog'
import React, { useEffect, useState } from 'react'
import { GlobalHotKeys } from 'react-hotkeys'

interface SearchProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Search = (props: SearchProps) => {
  const { onChange } = props
  return (
    <input
      className="inline-block flex-1 rounded-md p-2 text-2xl outline-none"
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
  return (
    <a
      className="z-10 flex flex-row space-y-2 p-3"
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
}

interface CommandBarProps {
  items: ItemProps[]
}

const CommandBar = (props: CommandBarProps) => {
  const { items } = props

  const [searchItems, setSearchItems] = useState(items)

  const [bgHighlightTranslate, setBgHighlightTranslate] = useState(52)
  const [displayBgHighlight, setDisplayBgHighlight] = useState(false)
  const [bgHighlightAnimationDuration, setBgHighlightAnimationDuration] =
    useState(0)

  const [highlightedItem, setHighlightedItem] =
    useState<HTMLAnchorElement | null>(null)

  const [isOpen, setIsOpen] = useState(false)

  const itemsRef = React.useRef<HTMLDivElement>(null)

  const handlers = { SHOW_ALL_HOTKEYS: () => console.log('SHOW_ALL_HOTKEYS') }

  const keyMap = { SHOW_ALL_HOTKEYS: 'command+?' }

  // filter by search

  useEffect(() => {
    if (highlightedItem) {
      setDisplayBgHighlight(true)
      setBgHighlightAnimationDuration(100)
      // get top of element relative to the parent
      const elementTop = highlightedItem.getBoundingClientRect().bottom
      // get top of parent
      const parentTop = highlightedItem.parentElement?.getBoundingClientRect()
        .top as number

      setBgHighlightTranslate(elementTop - parentTop - 4 ?? 52)
    } else {
      setDisplayBgHighlight(false)
      setBgHighlightAnimationDuration(0)
    }
  }, [highlightedItem])

  return (
    <Dialog.Root open={isOpen}>
      <GlobalHotKeys handlers={handlers} keyMap={keyMap} />
      <Dialog.Overlay className="fixed inset-0 z-10 flex justify-center bg-neutral-400/30 pt-[20vh]">
        <Dialog.Content
          className="relative flex h-min max-h-[50vh] w-2/5 flex-col overflow-auto rounded-lg bg-white p-2 ring-2 ring-neutral-300 transition-all duration-100"
          style={{
            height: `${searchItems.length * 52 + 64}px`,
          }}
        >
          <div
            className="absolute h-[52px] w-[calc(100%-16px)] rounded-md bg-neutral-100 transition-transform duration-100"
            style={{
              transform: `translateY(${bgHighlightTranslate}px)`,
              display: displayBgHighlight ? 'block' : 'none',
              transition: `transform ${bgHighlightAnimationDuration}ms ease-in-out`,
            }}
          />
          <Search
            onChange={(e) => {
              const newItems = items.filter((item) => {
                const title = item.title.toLowerCase()
                return title
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              })

              if (newItems.length === 0) {
                setDisplayBgHighlight(false)
              } else if (newItems.length !== items.length) {
                setTimeout(() => {
                  setHighlightedItem(
                    itemsRef.current?.children[0] as HTMLAnchorElement
                  )
                }, 100)
              }

              setSearchItems(newItems)
            }}
          />
          <div className="inset-0 flex flex-col" ref={itemsRef}>
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
  )
}

export default CommandBar
