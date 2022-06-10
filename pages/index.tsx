import ScrollBar from '../components/elements/Scrollbar'
import ChangeLogButton from '../components/home/ChangeLogButton'
import GridLayout from '../components/home/GridLayout'
import MyMap from '../components/home/MyMap'
import OpenSidebarButton from '../components/layout/Sidebar/OpenSidebarButton'
import { getLayout } from '../components/layout/SiteLayout'
import { useSidebarControl } from '../components/providers/SidebarControlProvider'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { Menu, Minus, Plus } from 'react-feather'
// import Head from 'next/head'
// import Image from 'next/image'

const Home = () => {
  const [mapZoom, setMapZoom] = useState(10)
  return (
    <>
      <NextSeo
        description="Hi! I'm Eliot, a software developer and Journalist from Berkeley California. Welcome to my personal website!"
        title="Eliot Hertenstein"
      />
      <ScrollArea.Root className="h-full w-full">
        <ScrollArea.Viewport className="h-full w-full">
          <div className="mx-auto w-full max-w-3xl px-4 py-12 pb-10 md:px-8">
            <OpenSidebarButton className="absolute" />
            <p className="py-12" />

            <GridLayout title="">
              <p className="pb-3">Hi! 👋</p>
              <p className="pb-3">
                My name is Eliot, I&apos;m a student and developer based in
                Berkeley, CA. I&apos;m best known for{' '}
                <a
                  className="animate-link"
                  href="https://www.therailmap.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  The Rail Map
                </a>
                , a hobby project of mine that visualizes railroads throughout
                the world, and helps people track their trains.
              </p>

              <p className="pb-3">
                As you might have guessed, I&apos;m decently into transit,
                including all things trains, planes, busses etc. I also enjoy
                cycling, photography, and art history!
              </p>
              <div className="h-max py-3">
                <ChangeLogButton />
              </div>
            </GridLayout>
            <GridLayout title="Social">
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
            </GridLayout>
            <GridLayout title="Location">
              <div className="relative h-[400px] w-full">
                <MyMap zoom={mapZoom} />
                <div className="absolute left-[50%] top-[50%] flex h-8 w-8">
                  <span className="absolute -top-4 -left-4 h-8 w-8 animate-ping rounded-full bg-blue-200 opacity-75 shadow-lg" />
                  <span className="ring-3 relative -top-4 -left-4 h-8 w-8 rounded-full border-[5px] border-white bg-blue-500" />
                </div>
                {mapZoom > 2 && (
                  <button
                    className="animate-hover-grow absolute bottom-0 left-0 m-2 rounded-full bg-white p-2 text-sm "
                    onClick={() => setMapZoom(mapZoom - 3)}
                    type="button"
                  >
                    <Minus size={16} />
                  </button>
                )}
                {mapZoom < 10 && (
                  <button
                    className="animate-hover-grow absolute bottom-0 right-0 m-2 rounded-full bg-white p-2 text-sm"
                    onClick={() => setMapZoom(mapZoom + 3)}
                    type="button"
                  >
                    <Plus size={16} />
                  </button>
                )}
              </div>
            </GridLayout>
          </div>
        </ScrollArea.Viewport>
        <ScrollBar />
      </ScrollArea.Root>
    </>
  )
}

Home.getLayout = (page: ReactNode) => getLayout(page)

export default Home
