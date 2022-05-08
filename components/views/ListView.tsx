import { ReactNode } from 'react'

interface ListViewProps {
  list: ReactNode
  detail?: ReactNode
  showDetail: boolean
}

const ListView = (props: ListViewProps) => {
  const { list, detail, showDetail } = props
  return (
    <div className="bg-grid-pattern flex h-full flex-row">
      <div
        className={
          'z-30 h-full max-h-screen min-h-screen w-full flex-none flex-col overflow-y-auto border-r border-neutral-100 bg-white pb-10 transition duration-200 ease-in-out  lg:relative lg:z-auto lg:flex lg:w-80 lg:translate-x-0' +
          (showDetail ? ' hidden' : 'relative')
        }
      >
        {list}
      </div>
      <main
        className={
          'flex h-full max-h-screen w-full flex-col overflow-y-auto bg-white' +
          (showDetail ? ' relative' : ' hidden')
        }
      >
        {detail ? detail : null}
      </main>
    </div>
  )
}

ListView.defaultProps = {
  detail: null,
}

export default ListView
