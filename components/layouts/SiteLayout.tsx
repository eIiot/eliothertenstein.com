import { withProviders } from '../providers/withProviders'
import Sidebar from '../Sidebar'
import { useState, cloneElement, ReactElement } from 'react'
import { Menu } from 'react-feather'

interface LayoutProps {
  children: ReactElement
}

const SiteLayout = (props: LayoutProps) => {
  const { children } = props
  const [isSidebarHidden, setIsSidebarHidden] = useState(true)

  // pass isSidebarHidden, setIsSidebarHidden to children
  const childrenWithProps = cloneElement(children, {
    isSidebarHidden,
    setIsSidebarHidden,
  })
  return (
    <div className="absolute inset-0 flex flex-row">
      <Sidebar isHidden={isSidebarHidden} setIsHidden={setIsSidebarHidden} />
      <main className="relative flex h-screen w-full flex-col overflow-y-auto bg-white">
        {childrenWithProps}
      </main>
    </div>
  )
}

export const getLayout = withProviders((page: ReactElement) => (
  <SiteLayout>{page}</SiteLayout>
))

export default SiteLayout
