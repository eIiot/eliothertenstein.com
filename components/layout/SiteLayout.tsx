import Sidebar from './Sidebar'
import CommandBar from '../elements/CommandBar'
import { useSidebarControl } from '../providers/SidebarControlProvider'
import { withProviders } from '../providers/withProviders'
import React, { useState, cloneElement, ReactElement, Children } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const SiteLayout = (props: LayoutProps) => {
  const { children } = props

  const [isSidebarHidden, setIsSidebarHidden] = useSidebarControl()

  return (
    <>
      <CommandBar />
      <div className="absolute inset-0 flex flex-row bg-neutral-50">
        <Sidebar />
        <div
          className="absolute z-30 h-screen w-full bg-neutral-100/50"
          onClick={() => setIsSidebarHidden(true)}
          style={{
            opacity: isSidebarHidden ? 0 : 0.4,
            pointerEvents: isSidebarHidden ? 'none' : 'auto',
          }}
        />
        <main className="relative m-2 flex h-[calc(100vh-16px)] w-full flex-col overflow-hidden rounded-lg bg-white shadow-sm md:opacity-100">
          {children}
        </main>
      </div>
    </>
  )
}

export const getLayout = withProviders((page: React.ReactNode) => (
  <SiteLayout>{page}</SiteLayout>
))

export default SiteLayout
