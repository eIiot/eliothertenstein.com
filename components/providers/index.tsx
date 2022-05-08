import client from '../../lib/apollo'
import { ApolloProvider, useApolloClient } from '@apollo/client'
import { UserProvider } from '@auth0/nextjs-auth0'
import { Toaster } from 'react-hot-toast'

const Providers = ({ pageProps, children }) => {
  const apolloClient = useApolloClient(client)
  return (
    <>
      <Toaster position="top-left" reverseOrder={false} />
      <ApolloProvider client={apolloClient}>
        <UserProvider>{children}</UserProvider>
      </ApolloProvider>
    </>
  )
}

export default Providers
