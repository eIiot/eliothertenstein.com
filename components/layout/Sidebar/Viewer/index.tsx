import LoggedIn from './LoggedIn'
import MenuBarGhost from '../../../animations/MenuBarGhost'
import { useViewer } from '../../../providers/ViewerProvider'
import { Settings as UserIcon } from 'react-feather'

interface ViewerProps {
  setIsHidden: (isHidden: boolean) => void
}

const Viewer = (props: ViewerProps) => {
  const { setIsHidden } = props
  const { data, loading, error } = useViewer()
  return (
    <div className="flex-0 sticky bottom-0 z-10 w-full bg-neutral-50 px-3 py-2">
      {!loading ? (
        data?.viewer ? (
          <LoggedIn setIsHidden={setIsHidden} viewer={data.viewer} />
        ) : (
          // eslint-disable-next-line @next/next/no-html-link-for-pages
          <a className="justify-self-end" href="/api/auth/login">
            <div className="justify-left flex flex-1 cursor-pointer items-center rounded-md  px-2 py-1.5 transition duration-200 hover:bg-neutral-100">
              <UserIcon className="mr-3 inline-block" />
              <span className="">Login</span>
            </div>
          </a>
        )
      ) : null}
    </div>
  )
}

export default Viewer
