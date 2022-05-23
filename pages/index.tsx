import CustomGridLayout from '../components/home/CustomGridLayout'
import CustomImage from '../components/home/CustomImage'
import SiteLayout, { getLayout } from '../components/layouts/SiteLayout'
import { Page } from '../types/page'
import Link from 'next/link'
import { ReactNode } from 'react'
import { Menu } from 'react-feather'
// import Head from 'next/head'
// import Image from 'next/image'

interface HomeProps {
  isSidebarHidden: boolean
  setIsSidebarHidden: (isSidebarHidden: boolean) => void
}

const Home = (props: HomeProps) => {
  const { isSidebarHidden, setIsSidebarHidden } = props
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 pb-10 md:px-8">
      <button
        className="absolute left-0 top-0 block p-3 lg:hidden"
        onClick={() => setIsSidebarHidden(!isSidebarHidden)}
        type="button"
      >
        <Menu size={24} />
      </button>
      <p className="py-12" />

      <CustomGridLayout title="">
        <p className="pb-3">Hi! 👋</p>
        <p className="pb-3">
          My name is Eliot, I&apos;m a student and developer based in Berkeley,
          CA. I&apos;m most well known for{' '}
          <Link href="https://www.therailmap.com" target="_blank">
            The Rail Map
          </Link>
          , a hobby project of mine that visualizes railroads throughout the
          world, and helps people track their trains.
        </p>

        <p className="pb-3">
          As you might have guessed, I&apos;m decently into transit, including
          all things trains, planes, busses etc. I also enjoy cycling,
          photography, and writing bad takes on twitter, all in my
          much-too-limited free time.
        </p>
      </CustomGridLayout>
      <CustomGridLayout title="Social">
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between">
            <span>Twitter</span>
            <a
              className="animate-link-hover"
              href="
            https://twitter.com/eiioth"
              target="_blank"
            >
              @eiioth
            </a>
          </div>
          <div className="flex justify-between">
            <span>Github</span>
            <a
              className="animate-link-hover"
              href="
            https://github.com/eiiot"
              target="_blank"
            >
              @eiiot
            </a>
          </div>
        </div>
      </CustomGridLayout>
      <CustomGridLayout title="Location">
        <CustomImage
          alt="map"
          caption="San Francisco, CA"
          src="https://brianlovin.com/_next/image?url=%2Fstatic%2Fimg%2Fsf.png&w=1920&q=100"
        />
      </CustomGridLayout>
    </div>
  )
}

Home.getLayout = (page: ReactNode) => getLayout(page)

export default Home
