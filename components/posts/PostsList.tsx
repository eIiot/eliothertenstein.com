import { useGetPostsQuery } from '../../graphql/types.generated'
import ActiveLink from '../ActiveLink'
import MenuBarGhost from '../effects/MenuBarGhost'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import moment from 'moment'
import { Loader, Menu } from 'react-feather'
import { toast } from 'react-hot-toast'

interface PostsListProps {
  isSidebarHidden?: boolean
  setIsSidebarHidden?: (isSidebarHidden: boolean) => void
}

const PostsList = (props: PostsListProps) => {
  const { isSidebarHidden, setIsSidebarHidden } = props
  const { data, loading, error } = useGetPostsQuery()

  if (error) {
    console.error(error)
    toast.error(error.message)
  }

  return (
    <ScrollArea.Root className="h-full w-full">
      <div className="text-normal relative w-full pt-3 text-center font-normal">
        <button
          className="absolute left-0 block px-3 lg:hidden"
          onClick={() => setIsSidebarHidden(!isSidebarHidden)}
          type="button"
        >
          <Menu size={24} />
        </button>
        Posts
      </div>
      <ScrollArea.Viewport className="h-full">
        <div className="flex flex-col space-y-2 p-3">
          {!loading ? (
            data && data.posts ? (
              data.posts.map((post) =>
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
            </>
          )}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="flex w-1 touch-none select-none">
        <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-[#7b7b7b] opacity-70 before:absolute before:top-1/2 before:left-1/2 before:h-full before:w-full before:-translate-x-1/2 before:-translate-y-1/2" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}

PostsList.defaultProps = {
  isSidebarHidden: false,
  setIsSidebarHidden: () => {},
}

export default PostsList
