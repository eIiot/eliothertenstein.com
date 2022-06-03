import { NextSeo } from 'next-seo'
import { User } from 'react-feather'

const profileCatchAll = () => {
  return (
    <>
      <NextSeo
        description="Profiles coming soon!"
        robotsProps={{
          noarchive: true,
        }}
        title="User Profile"
      />
      <div className="inset-0 flex h-full flex-col items-center justify-center">
        <User size={64} />
        <h1>Profiles coming soon™️</h1>
      </div>
    </>
  )
}

export default profileCatchAll
