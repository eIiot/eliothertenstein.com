import CommandBar from '../CommandBar'
import { withProviders } from '../providers/withProviders'
import Sidebar from '../Sidebar'
import React, {
  useState,
  cloneElement,
  ReactElement,
  Children,
  useEffect,
  ReactNode,
} from 'react'
import {
  Book,
  Briefcase,
  Gift,
  GitHub,
  Globe,
  Heart,
  Home,
} from 'react-feather'

interface LayoutProps {
  children: React.ReactNode
}

const SiteLayout = (props: LayoutProps) => {
  const { children } = props
  const [isSidebarHidden, setIsSidebarHidden] = useState(true)

  // pass isSidebarHidden, setIsSidebarHidden to children
  const childrenWithProps = Children.map(children, (child) => {
    // add the props to the list element of the child

    return cloneElement(child as ReactElement, {
      isSidebarHidden,
      setIsSidebarHidden,
    })
  })

  return (
    <>
      <CommandBar />
      <div className="absolute inset-0 flex flex-row">
        <Sidebar isHidden={isSidebarHidden} setIsHidden={setIsSidebarHidden} />
        <div
          className="absolute z-30 h-screen w-full bg-neutral-100"
          style={{
            opacity: isSidebarHidden ? 0 : 0.4,
            pointerEvents: isSidebarHidden ? 'none' : 'auto',
          }}
        />
        <main className="relative flex h-screen w-full flex-col overflow-y-auto bg-white md:opacity-100">
          {childrenWithProps}
        </main>
      </div>
    </>
  )
}

export const getLayout = withProviders((page: React.ReactNode) => (
  <SiteLayout>{page}</SiteLayout>
))

export default SiteLayout
