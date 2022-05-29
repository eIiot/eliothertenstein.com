import CustomGridLayout from '../components/home/CustomGridLayout'
import CustomImage from '../components/home/CustomImage'
import { getLayout } from '../components/layouts/SiteLayout'
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
          <a
            className="animate-link"
            href="https://www.therailmap.com"
            rel="noreferrer"
            target="_blank"
          >
            The Rail Map
          </a>
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
              className="animate-link"
              href="
            https://twitter.com/eiioth"
              target="_blank"
            >
              @eiioth
            </a>
          </div>
          <div className="flex justify-between">
            <span>GitHub</span>
            <a
              className="animate-link"
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
        <CustomImage alt="map" caption="Berkeley, CA" src="/map.png">
          <div className="absolute left-[50%] top-[50%] flex h-8 w-8 shadow-lg">
            <span className="absolute -top-4 -left-4 h-8 w-8 animate-ping rounded-full bg-blue-200 opacity-75" />
            <span className="ring-3 relative -top-4 -left-4 h-8 w-8 rounded-full border-[5px] border-white bg-blue-500" />
          </div>
        </CustomImage>
      </CustomGridLayout>
    </div>
  )
}

Home.getLayout = (page: ReactNode) => getLayout(page)

export default Home
