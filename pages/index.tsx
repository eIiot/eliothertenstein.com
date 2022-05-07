import { ArrowRight } from 'iconoir-react'
import type { NextPage } from 'next'
import CustomGridLayout from '../components/home/CustomGridLayout'
import SiteLayout from '../components/layouts/SiteLayout'
import StyledLink from '../components/articles/StyledLink'
import CustomImage from '../components/articles/CustomImage'
// import Head from 'next/head'
// import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 pb-10 md:px-8">
      <p className="py-12" />

      <CustomGridLayout title="">
        <p className="pb-3">
          Hi! I'm Eliot, a student and developer based in Berkeley, CA. I'm most
          well known for{' '}
          <StyledLink href="https://www.therailmap.com" target="_blank">
            The Rail Map
          </StyledLink>
          , a hobby project of mine that visualizes railroads throughout the
          world, and helps people track their trains.
        </p>

        <p className="pb-3">
          As you might have guessed, I'm decently into transit, including all
          things trains, planes, busses etc. I also enjoy cycling, photography,
          and writing bad takes on twitter, all in my much-too-limited free
          time.
        </p>
      </CustomGridLayout>
      <CustomGridLayout title="Social">
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between">
            <span>Twitter</span>
            <StyledLink
              href="
            https://twitter.com/eiioth"
              target="_blank"
            >
              @eiioth
            </StyledLink>
          </div>
          <div className="flex justify-between">
            <span>Github</span>
            <StyledLink
              href="
            https://twitter.com/eiioth"
              target="_blank"
            >
              @eiiot
            </StyledLink>
          </div>
        </div>
      </CustomGridLayout>
      <CustomGridLayout title="Location">
        <CustomImage
          src="https://brianlovin.com/_next/image?url=%2Fstatic%2Fimg%2Fsf.png&w=1920&q=100"
          alt="map"
          caption="San Francisco, CA"
        />
      </CustomGridLayout>
    </div>
  )
}

export default Home
