import { useSidebarControl } from '../../providers/SidebarControlProvider'
import { Dispatch, SetStateAction } from 'react'
import { Menu } from 'react-feather'

interface OpenSidebarButtonProps {
  className?: string
}

const OpenSidebarButton = (props: OpenSidebarButtonProps) => {
  const { className } = props
  const [isSidebarHidden, setIsSidebarHidden] = useSidebarControl()
  return (
    <button
      className={
        'left-0 top-0 m-3 block rounded-md bg-white p-2 text-black first-letter:absolute hover:bg-neutral-100 lg:hidden' +
        (className ? ' ' + className : '')
      }
      onClick={() => setIsSidebarHidden((prev: boolean) => !prev)}
      type="button"
    >
      <Menu size={18} />
    </button>
  )
}

OpenSidebarButton.defaultProps = {
  className: '',
}

export default OpenSidebarButton
