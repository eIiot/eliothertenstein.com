import { withProviders } from '../providers/withProviders'
import Sidebar from '../Sidebar'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const SiteLayout = (props: LayoutProps) => {
  const { children } = props
  return (
    <div className="absolute inset-0 flex flex-row">
      <Sidebar />
      <main className="relative flex h-screen w-full flex-col overflow-y-auto bg-white">
        {children}
      </main>
    </div>
  )
}

export const getLayout = withProviders((page: React.ReactNode) => (
  <SiteLayout>{page}</SiteLayout>
))

export default SiteLayout
