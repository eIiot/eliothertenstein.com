import { getLayout } from '../../components/layouts/SiteLayout'
import PostsList from '../../components/posts/PostsList'
import ListView from '../../components/views/ListView'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { Edit } from 'react-feather'

const Posts = () => {
  return (
    <>
      <Link href="posts/new/edit">
        <a className="absolute right-0 top-0 m-3 rounded-lg bg-white p-3 text-black shadow-lg hover:bg-neutral-100">
          <Edit />
        </a>
      </Link>
      <NextSeo description="Posts" title="Posts" />
    </>
  )
}

Posts.getLayout = (page: React.ReactNode) =>
  getLayout(<ListView detail={page} list={<PostsList />} showDetail />)

export default Posts
