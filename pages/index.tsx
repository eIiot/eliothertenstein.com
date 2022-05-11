import CustomImage from '../components/articles/CustomImage'
import CustomGridLayout from '../components/home/CustomGridLayout'
import SiteLayout, { getLayout } from '../components/layouts/SiteLayout'
import Link from 'next/link'
import type { NextPage } from 'next'
// import Head from 'next/head'
// import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 pb-10 md:px-8">
      <p className="py-12" />

      <CustomGridLayout title="">
        <p className="pb-3">
          Hi! I&apos;m Eliot, a student and developer based in Berkeley, CA.
          I&apos;m most well known for{' '}
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
            <Link
              href="
            https://twitter.com/eiioth"
              target="_blank"
            >
              @eiioth
            </Link>
          </div>
          <div className="flex justify-between">
            <span>Github</span>
            <Link
              href="
            https://twitter.com/eiioth"
              target="_blank"
            >
              @eiiot
            </Link>
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

Home.getLayout = (page) => getLayout(page)

export default Home
