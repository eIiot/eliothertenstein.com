import ActiveLink from '../ActiveLink'
import { ReactNode, useEffect, useState } from 'react'
import { ArrowUpRight, Music } from 'react-feather'

interface SpotifyLinkProps {
  setIsHidden: (isHidden: boolean) => void
  setBgHighlightTranslate: (translate: number) => void
}

const SpotifyLink = (props: SpotifyLinkProps) => {
  const { setIsHidden, setBgHighlightTranslate } = props

  const [spotifyData, setSpotifyData] = useState<any>(null)

  useEffect(() => {
    fetch('/api/spotify')
      .then((res) => res.json())
      .then((data) => {
        setSpotifyData(data)
      })
  }, [])

  return (
    <a
      className="justify-left group z-10 flex flex-1 cursor-pointer items-center rounded-md px-2 py-1.5 transition duration-200"
      href={
        spotifyData && spotifyData.item
          ? spotifyData.item.external_urls.spotify
          : null
      }
      onClick={() => {
        setIsHidden(true)
      }}
      onMouseEnter={() => {
        setBgHighlightTranslate(163)
      }}
      rel="noreferrer"
      target="_blank"
    >
      <Music className="mr-3 inline-block flex-none" />

      {spotifyData && spotifyData.item ? (
        <span className="relative flex flex-1 overflow-x-hidden whitespace-nowrap">
          <span className="animate-marquee">
            <span>
              {spotifyData.item.name} - {spotifyData.item.album.name}
            </span>
            <span>
              {spotifyData.item.name} - {spotifyData.item.album.name}
            </span>
          </span>
        </span>
      ) : (
        <span className="">Not Listening</span>
      )}
    </a>
  )
}

export default SpotifyLink
