import { User } from '../../../graphql/types.generated'
import { cloneElement, Dispatch, ReactElement, SetStateAction } from 'react'

interface ListViewProps {
  list: ReactElement
  detail?: ReactElement
  children?: ReactElement
  showDetail: boolean
}

const ListView = (props: ListViewProps) => {
  const { list, detail, showDetail, children } = props

  return (
    <div className="bg-pattern-grid flex h-full flex-row">
      <div
        className={
          'z-20 h-full max-h-screen w-full flex-none flex-col overflow-y-auto border-r border-neutral-100 bg-white lg:relative lg:flex lg:w-80 ' +
          (showDetail ? ' hidden' : 'relative')
        }
      >
        {list}
      </div>
      <article
        className={
          'flex h-full max-h-screen w-full flex-col' +
          (showDetail ? ' relative' : ' hidden')
        }
      >
        {detail}
      </article>
      {children}
    </div>
  )
}

ListView.defaultProps = {
  children: null,
  detail: null,
}

export default ListView
