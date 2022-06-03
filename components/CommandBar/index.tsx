import Item, { ItemProps } from './Item'
import ItemsList from './ItemsList'
import Search from './Search'
import {
  Post,
  useGetPostQuery,
  useGetPostsQuery,
} from '../../graphql/types.generated'
import * as Dialog from '@radix-ui/react-dialog'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Book, GitHub, Home } from 'react-feather'
import { configure, GlobalHotKeys, HotKeys } from 'react-hotkeys'

const CommandBar = () => {
  const router = useRouter()

  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
  } = useGetPostsQuery()

  const pages = [
    {
      title: 'Home',
      tags: [],
      icon: <Home />,
      href: '/',
    },
    {
      title: 'Posts',
      tags: [],
      icon: <Book />,
      href: '/posts',
    },
    {
      title: 'Github',
      tags: [],
      icon: <GitHub />,
      href: 'https://www.github.com/eiiot',
    },
  ]

  const [items, setItems] = useState(pages)

  const [searchPosts, setSearchPosts] = useState<ItemProps[]>([])

  const postItems = useMemo(() => {
    if (postsData && postsData.posts && !postsLoading) {
      const postItems = postsData.posts.map((post) => ({
        title: post?.title ?? '',
        // tags: post?.tags,
        icon: <Book />,
        href: `/posts/${post?.slug}`,
      }))
      setSearchPosts(postItems)
      return postItems
    } else {
      return []
    }
  }, [postsData, postsLoading])

  const [searchItems, setSearchItems] = useState(items)

  const [bgHighlightTranslate, setBgHighlightTranslate] = useState(0)
  const [bgHighlightHeight, setBgHighlightHeight] = useState(0)
  const [displayBgHighlight, setDisplayBgHighlight] = useState(false)

  const [isOpen, setIsOpen] = useState(false)

  const itemsRef = useRef<HTMLDivElement>(null)

  const [highlightedItemIndex, setHighlightedItemIndex] = useState<number>(-1)

  useEffect(() => {
    if (itemsRef.current?.children?.length) {
      if (highlightedItemIndex < 0) {
        setHighlightedItemIndex(itemsRef.current?.children?.length - 1)
      }

      if (highlightedItemIndex >= itemsRef.current?.children?.length) {
        setHighlightedItemIndex(0)
      }

      const highlightedItem = itemsRef.current?.children[highlightedItemIndex]

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

      setSearchItems(newItems)

      const newPosts = postItems.filter((item) => {
        const title = item.title.toLowerCase()
        return title.toLowerCase().includes(searchTerm.toLowerCase())
      })

      setSearchPosts(newPosts)

      setHighlightedItemIndex(
        newItems.length > 0 || postItems?.length > 0 ? 0 : -1
      )

      if (newPosts.length === 0 && newItems.length === 0) {
        setDisplayBgHighlight(false)
      } else {
        setDisplayBgHighlight(true)
      }
    },
    [items, postItems]
  )

  useEffect(() => {
    // close the dialog when the user navigates to a new page
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

                {searchPosts &&
                  searchPosts.map((item, index) => {
                    const { title, icon, href } = item
                    return (
                      <Item
                        {...item}
                        className={
                          index === 0 && searchItems.length > 0
                            ? 'mt-2 before:absolute before:h-[2px] before:w-[calc(40vw-16px)] before:min-w-[484px] before:-translate-y-[17px] before:-translate-x-[12px] before:rounded-sm before:bg-neutral-100'
                            : ''
                        }
                        key={title}
                        onMouseMove={(
                          e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                        ) => {
                          setHighlightedItemIndex(searchItems.length + index)
                        }}
                      />
                    )
                  })}
              </div>
              <span className="flex w-full justify-between pt-1 text-sm">
                <span>
                  <span className="text-blue-500">↑</span> and{' '}
                  <span className="text-blue-500">↓</span> to navigate
                </span>
                <span>
                  <span className="text-blue-500">esc</span> to close
                </span>
              </span>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Root>
      </HotKeys>
    </>
  )
}

export default CommandBar
