import { useGetPostsQuery } from '../../graphql/types.generated'
import useShadowTransform from '../../hooks/animations/useShadowTransform'
import MenuBarGhost from '../animations/MenuBarGhost'
import ActiveLink from '../elements/ActiveLink'
import ScrollBar from '../elements/Scrollbar'
import { useViewer } from '../providers/ViewerProvider'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { motion, useElementScroll, useTransform } from 'framer-motion'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
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

  const Router = useRouter()

  const shadow = useShadowTransform(scrollY)

  const {
    data: viewerData,
    loading: viewerLoading,
    error: viewerError,
  } = useViewer()

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
        className="text-normal absolute z-10 flex h-[58px] w-full items-center bg-white py-3 text-center font-normal"
        style={{
          boxShadow: shadow,
        }}
      >
        <button
          className="mx-3 block rounded-md p-2 hover:bg-neutral-100 lg:hidden"
          onClick={() => setIsSidebarHidden(!isSidebarHidden)}
          type="button"
        >
          <Menu size={18} />
        </button>
        <span className="lg:pl-5">Posts</span>
        {viewerData &&
          viewerData.viewer &&
          viewerData.viewer.isAdmin &&
          viewerData.viewer.isAdmin &&
          !Router.asPath.includes('edit') && (
            <Link
              href={
                Router.asPath.replace(/#.*$/, '').replace(/\?.*$/, '') + '/edit'
              }
              passHref
            >
              <a
                className="mx-3 ml-auto block rounded-md p-2 hover:bg-neutral-100"
                // href="edit/"
                type="button"
              >
                <Edit size={18} />
              </a>
            </Link>
          )}
      </motion.div>
      <ScrollArea.Root className="h-full w-full pt-12">
        <ScrollArea.Viewport className="h-full" ref={scrollRef}>
          <div className="flex flex-col space-y-2 p-3">
            {!postsLoading ? (
              postsData && postsData.posts ? (
                postsData.posts.map((post, index) =>
                  post ? (
                    <span
                      className={
                        index !== 0
                          ? 'border-t-[1px] border-neutral-100 pt-2'
                          : ''
                      }
                      key={post.id}
                    >
                      <ActiveLink
                        activeClassName="bg-black text-white hover:bg-neutral-700 child-a:text-neutral-400"
                        className="duration-20 child flex cursor-pointer flex-col rounded-md px-2 py-1.5  transition"
                        href={`/posts/${post.slug}`}
                        inactiveClassName="bg-white hover:bg-neutral-100 last-child:text-neutral-600 child-a:text-neutral-500"
                      >
                        <>
                          <span className="">{post.title}</span>
                          <span className="text-sm">
                            {moment(post.createdAt).format('MMMM Do YYYY')}
                          </span>
                        </>
                      </ActiveLink>
                    </span>
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
        <ScrollBar />
      </ScrollArea.Root>
    </>
  )
}

export default PostsList
