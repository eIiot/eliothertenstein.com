import React, { ReactElement, ReactNode } from 'react'

interface GridLayoutProps {
  title: string
  children: ReactNode
}

const GridLayout = (props: GridLayoutProps) => {
  const { title, children } = props
  return (
    <div className="grid grid-cols-1 pb-12 md:grid-cols-12">
      <div className="col-span-2 pr-3 pb-3 font-semibold md:text-right md:font-normal md:text-neutral-500">
        {title}
      </div>
      <div className="col-span-10">{children}</div>
    </div>
  )
}

export default GridLayout
