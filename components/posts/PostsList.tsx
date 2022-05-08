import { useGetPostsQuery } from '../../graphql/types.generated'
import ActiveLink from '../ActiveLink'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import moment from 'moment'

const PostsList = () => {
  const { data, loading, error } = useGetPostsQuery()

  return (
    <ScrollArea.Root className="h-full w-full">
      <ScrollArea.Viewport className="h-full">
        <div className="text-normal w-full pt-3 text-center font-normal">
          Projects
        </div>
        <div className="flex flex-col space-y-2 p-3">
          {!loading ? (
            data.posts.map((post) => (
              <ActiveLink
                activeClassName="!bg-black !text-white"
                className="flex cursor-pointer flex-col rounded-md px-2 py-1.5 transition duration-200 hover:bg-neutral-100"
                href={`/posts/${post.slug}`}
                key={post.id}
              >
                <span className="">{post.title}</span>
                <span className="text-neutral-600">
                  {moment(post.createdAt).format('MMMM Do YYYY')}
                </span>
              </ActiveLink>
            ))
          ) : (
            <span>Loading</span>
          )}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="flex w-1 touch-none select-none">
        <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-[#7b7b7b] opacity-70 before:absolute before:top-1/2 before:left-1/2 before:h-full before:w-full before:-translate-x-1/2 before:-translate-y-1/2" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}

export default PostsList
