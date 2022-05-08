import { getLayout } from '../../components/layouts/SiteLayout'
import { useUser } from '@auth0/nextjs-auth0'
import React from 'react'

const Profile = () => {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    user && (
      <div>
        <img alt={user.name} src={user.picture} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  )
}

Profile.getLayout = (page: React.ReactNode) => getLayout(page)

export default Profile
