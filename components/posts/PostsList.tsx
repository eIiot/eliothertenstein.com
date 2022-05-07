import * as ScrollArea from '@radix-ui/react-scroll-area'
import moment from 'moment'
import { useEffect, useState } from 'react'
import Posts from '../../pages/posts'
import ActiveLink from '../ActiveLink'

const PostsList = () => {
  // fetch feed from /api/posts

  const [feed, setFeed] = useState<
    {
      id: string
      title: string
      content: string
      published: boolean
      createdAt: string
    }[]
  >()

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        setFeed(data)
      })
  }, [])

  if (!feed) {
    return null
  }

  return (
    <ScrollArea.Root className="h-full w-full">
      <ScrollArea.Viewport className="h-full">
        <div className="text-normal w-full pt-3 text-center font-normal">
          Projects
        </div>
        <div className="flex flex-col space-y-2 p-3">
          {feed.map((post) => (
            <ActiveLink
              key={post.id}
              href={`/posts/${post.id}`}
              className="flex cursor-pointer flex-col rounded-md px-2 py-1.5 transition duration-200 hover:bg-neutral-100"
              activeClassName="!bg-black !text-white"
            >
              <span className="">{post.title}</span>
              <span className="text-neutral-600">
                {moment(post.createdAt).format('MMMM Do YYYY')}
              </span>
            </ActiveLink>
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="flex w-1 touch-none select-none">
        <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-[#7b7b7b] opacity-70 before:absolute before:top-1/2 before:left-1/2 before:h-full before:w-full before:-translate-x-1/2 before:-translate-y-1/2" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}

export default PostsList
