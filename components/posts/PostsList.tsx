import {
  useGetPostsQuery,
  User,
  useGetViewerQuery,
} from '../../graphql/types.generated'
import ActiveLink from '../ActiveLink'
import MenuBarGhost from '../effects/MenuBarGhost'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { motion, useElementScroll, useTransform } from 'framer-motion'
import moment from 'moment'
import { useEffect, useRef } from 'react'
import { BookOpen, Edit, Loader, Menu } from 'react-feather'
import { toast } from 'react-hot-toast'

interface PostsListProps {
  isSidebarHidden: boolean
  setIsSidebarHidden: (isSidebarHidden: boolean) => void
}

const PostsList = (props: PostsListProps) => {
  const { isSidebarHidden, setIsSidebarHidden } = props
  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
  } = useGetPostsQuery()

  const scrollRef = useRef(null)

  const { scrollY } = useElementScroll(scrollRef)

  const shadow = useTransform(
    useTransform(scrollY, [0, 100], [0, 5]),
    (p) => `0px 0px ${p}px rgba(0, 0, 0, 0.1)`
  )

  const {
    data: viewerData,
    loading: viewerLoading,
    error: viewerError,
  } = useGetViewerQuery()

  if (postsError) {
    console.error(postsError)
    toast.error(postsError.message)
  }

  useEffect(() => {
    console.log(viewerData)
  }, [viewerData])

  return (
    <>
      <motion.div
        className="text-normal absolute z-10 flex w-full items-center bg-white py-3 text-center font-normal"
        style={{
          boxShadow: shadow,
        }}
      >
        <button
          className="mx-3 block rounded-md p-2 hover:bg-neutral-100 lg:hidden"
          onClick={() => setIsSidebarHidden(!isSidebarHidden)}
          type="button"
        >
          <Menu size={16} />
        </button>
        <span className="lg:pl-5">Posts</span>
        {viewerData && viewerData.viewer && viewerData.viewer.isAdmin && (
          <button
            className="mx-3 ml-auto block rounded-md p-2 hover:bg-neutral-100"
            onClick={() => {
              window.location.href += '/edit'
            }}
            type="button"
          >
            <Edit size={16} />
          </button>
        )}
      </motion.div>
      <ScrollArea.Root className="h-full w-full pt-12">
        <ScrollArea.Viewport className="h-full" ref={scrollRef}>
          <div className="flex flex-col space-y-2 p-3">
            {!postsLoading ? (
              postsData && postsData.posts ? (
                postsData.posts.map((post) =>
                  post ? (
                    <ActiveLink
                      activeClassName="bg-black text-white hover:bg-neutral-700 child-a:text-neutral-400"
                      className="duration-20 child flex cursor-pointer flex-col rounded-md px-2 py-1.5 transition"
                      href={`/posts/${post.slug}`}
                      inactiveClassName="bg-white hover:bg-neutral-100 last-child:text-neutral-600 child-a:text-neutral-500"
                      key={post.id}
                    >
                      <>
                        <span className="">{post.title}</span>
                        <span className="text-sm">
                          {moment(post.createdAt).format('MMMM Do YYYY')}
                        </span>
                      </>
                    </ActiveLink>
                  ) : null
                )
              ) : (
                <span>no posts</span>
              )
            ) : (
              <>
                <MenuBarGhost height="56px" />
                <MenuBarGhost height="56px" />
                <MenuBarGhost height="56px" />
                <MenuBarGhost height="56px" />
                <MenuBarGhost height="56px" />
                <MenuBarGhost height="56px" />
                <MenuBarGhost height="56px" />
                <MenuBarGhost height="56px" />
                <MenuBarGhost height="56px" />
                <MenuBarGhost height="56px" />
                <MenuBarGhost height="56px" />
              </>
            )}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar className="flex w-1 touch-none select-none">
          <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-[#7b7b7b] opacity-70 before:absolute before:top-1/2 before:left-1/2 before:h-full before:w-full before:-translate-x-1/2 before:-translate-y-1/2" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </>
  )
}

export default PostsList
