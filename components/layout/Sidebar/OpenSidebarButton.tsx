import { Menu } from 'react-feather'

interface OpenSidebarButtonProps {
  isSidebarHidden: boolean
  setIsSidebarHidden: (isSidebarHidden: boolean) => void
}

const OpenSidebarButton = (props: OpenSidebarButtonProps) => {
  const { isSidebarHidden, setIsSidebarHidden } = props
  return (
    <button
      className="absolute left-0 top-0 m-3 block rounded-md p-2 text-black hover:bg-neutral-100 lg:hidden"
      onClick={() => setIsSidebarHidden(!isSidebarHidden)}
      type="button"
    >
      <Menu size={18} />
    </button>
  )
}

export default OpenSidebarButton
