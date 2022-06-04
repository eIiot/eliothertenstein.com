import { User } from '../../graphql/types.generated'
import { cloneElement, ReactElement } from 'react'

interface ListViewProps {
  list: ReactElement
  detail?: ReactElement
  children?: ReactElement
  showDetail: boolean
  isSidebarHidden?: boolean
  setIsSidebarHidden?: (isSidebarHidden: boolean) => void
}

const ListView = (props: ListViewProps) => {
  const {
    list,
    detail,
    showDetail,
    isSidebarHidden,
    setIsSidebarHidden,
    children,
  } = props

  // add the isSidebarHidden and setIsSidebarHidden prop to the list component

  const listWithProps = cloneElement(list, {
    isSidebarHidden,
    setIsSidebarHidden,
  })

  return (
    <div className="bg-grid-pattern flex h-full flex-row">
      <div
        className={
          'z-20 h-full max-h-screen w-full flex-none flex-col overflow-y-auto border-r border-neutral-100 bg-white lg:relative lg:z-auto lg:flex lg:w-80 ' +
          (showDetail ? ' hidden' : 'relative')
        }
      >
        {listWithProps}
      </div>
      <main
        className={
          'flex h-full max-h-screen w-full flex-col overflow-y-auto ' +
          (showDetail ? ' relative' : ' hidden')
        }
      >
        {detail}
      </main>
      {children}
    </div>
  )
}

ListView.defaultProps = {
  children: null,
  detail: null,
  isSidebarHidden: false,
  setIsSidebarHidden: () => {},
}

export default ListView
