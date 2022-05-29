import Item, { ItemProps } from './Item'
import Search from './Search'
import { Global } from '@emotion/core'
import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { configure, GlobalHotKeys, HotKeys } from 'react-hotkeys'

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

  const [isOpen, setIsOpen] = useState(false)

  const itemsRef = useRef<HTMLDivElement>(null)

  // const [highlightedItem, setHighlightedItem] = useState<HTMLElement | null>(
  //   null
  // )

  const [highlightedItemIndex, setHighlightedItemIndex] = useState<number>(-1)

  useEffect(() => {
    if (itemsRef.current?.children?.length) {
      if (highlightedItemIndex < 0) {
        setHighlightedItemIndex(itemsRef.current?.children?.length)
      }

      if (highlightedItemIndex >= itemsRef.current?.children?.length) {
        setHighlightedItemIndex(0)
      }

      const highlightedItem = itemsRef.current?.children[highlightedItemIndex]

      // highlightedItem.focus()
      setDisplayBgHighlight(true)
      // get top of element relative to the parent
      const elementTop = highlightedItem?.getBoundingClientRect().top ?? 0
      // get top of parent
      const parentTop =
        highlightedItem?.parentElement?.parentElement?.getBoundingClientRect()
          .top as number

      setBgHighlightTranslate(elementTop - parentTop - 8)

      // get height of element
      const elementHeight = highlightedItem?.getBoundingClientRect().height
      setBgHighlightHeight(elementHeight ?? 0)
    } else {
      setDisplayBgHighlight(false)
    }
  }, [highlightedItemIndex, searchItems])

  const onSearch = useCallback(
    (searchTerm: string) => {
      const newItems = items.filter((item) => {
        const title = item.title.toLowerCase()
        return title.toLowerCase().includes(searchTerm.toLowerCase())
      })

      if (newItems.length === 0) {
        setDisplayBgHighlight(false)
      } else {
        setDisplayBgHighlight(true)
      }

      setSearchItems(newItems)
      setHighlightedItemIndex(newItems.length > 0 ? 0 : -1)
    },
    [items]
  )

  useEffect(() => {
    setIsOpen(false)
  }, [router.asPath])

  const handlers = {
    DOWN: (event: any) => {
      event.preventDefault()
      setHighlightedItemIndex((index) => {
        return index + 1
      })
    },
    UP: (event: any) => {
      event.preventDefault()
      setHighlightedItemIndex((index) => {
        return index - 1
      })
    },
    CLOSE: () => {
      setIsOpen(false)
    },
    ENTER: () => {
      setHighlightedItemIndex((index) => {
        // click the item
        const item = itemsRef.current?.children[index] as HTMLElement
        item?.click()

        return index
      })
    },
  }

  const keyMap = {
    DOWN: ['down', 'tab'],
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

      setHighlightedItemIndex(0)
    },
  }

  return (
    <>
      <GlobalHotKeys handlers={globalHandlers} keyMap={globalKeyMap} />

      <HotKeys handlers={handlers} keyMap={keyMap}>
        <Dialog.Root onOpenChange={setIsOpen} open={isOpen}>
          <Dialog.Overlay className="fixed inset-0 z-40 flex justify-center bg-neutral-400/30 pt-[20vh]">
            <Dialog.Content
              className="absolute bottom-0 flex !h-[66vh] w-full flex-col overflow-auto rounded-lg bg-white p-2 ring-2 ring-neutral-300 transition-all duration-100 md:relative md:!h-min md:max-h-[50vh] md:w-2/5 md:min-w-[500px]"
              onOpenAutoFocus={() => {
                setHighlightedItemIndex(0)
              }}
              style={{
                height: `${searchItems.length * 52 + 64}px`,
              }}
            >
              <Search
                onInput={(e) => {
                  onSearch(e.target.value)
                }}
              />

              <div
                className="absolute w-[calc(100%-16px)] rounded-md bg-neutral-100 transition-transform duration-100"
                style={{
                  height: `${bgHighlightHeight}px`,
                  transform: `translateY(${bgHighlightTranslate}px)`,
                  display: `${displayBgHighlight ? 'block' : 'none'}`,
                  transition: `transform 100ms ease-in-out`,
                }}
              />

              <div className="relative inset-0 flex flex-col" ref={itemsRef}>
                {searchItems.map((item, index) => {
                  const { title, tags, icon, href } = item
                  return (
                    <Item
                      {...item}
                      key={title}
                      onMouseMove={(
                        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                      ) => {
                        setHighlightedItemIndex(index)
                      }}
                    />
                  )
                })}
              </div>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Root>
      </HotKeys>
    </>
  )
}

export default CommandBar
