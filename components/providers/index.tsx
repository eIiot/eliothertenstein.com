import SidebarControlProvider from './SidebarControlProvider'
import ViewerProvider from './ViewerProvider'
import client from '../../lib/apollo'
import { ApolloProvider, useApolloClient } from '@apollo/client'
import { UserProvider } from '@auth0/nextjs-auth0'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

const Providers = ({ children }: { children: ReactNode }) => {
  const apolloClient = useApolloClient(client)
  return (
    <>
      <Toaster position="top-left" reverseOrder={false} />
      <ApolloProvider client={apolloClient}>
        <UserProvider>
          <ViewerProvider>
            <SidebarControlProvider>{children}</SidebarControlProvider>
          </ViewerProvider>
        </UserProvider>
      </ApolloProvider>
    </>
  )
}

export default Providers
