import { ReactChildren } from 'react'
import Sidebar from '../Sidebar'

interface LayoutProps {
  children: React.ReactChildren
}

const SiteLayout = (props: LayoutProps) => {
  const { children } = props
  return (
    <div className="absolute inset-0 flex flex-row">
      <Sidebar />
      <main className="relative flex max-h-screen w-full flex-col overflow-y-auto bg-white">
        {children}
      </main>
    </div>
  )
}

export const getLayout = (page: JSX.Element) => <SiteLayout>{page}</SiteLayout>

export default SiteLayout
