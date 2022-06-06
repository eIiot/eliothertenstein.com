import ActiveLink from '../../elements/ActiveLink'
import { ReactNode } from 'react'

interface ItemProps {
  setIsHidden: (isHidden: boolean) => void
  updateBgHighlight: (changes: {
    translate?: number
    duration?: number
    backgroundColor?: string
    isHidden?: boolean
  }) => void
  icon: React.ReactElement
  activeIcon?: React.ReactElement
  translate: number
  bgColor: string
  children: ReactNode
  href: string
}

const Item = (props: ItemProps) => {
  const {
    setIsHidden,
    updateBgHighlight,
    icon,
    activeIcon = icon,
    translate,
    bgColor,
    children,
    href,
  } = props

  // check if the link is external or not

  if (href.startsWith('http')) {
    return (
      <a
        className="justify-left group z-10 flex flex-1 cursor-pointer items-center rounded-md bg-transparent px-2 py-1.5 text-black transition duration-200"
        href={href}
        onClick={() => {
          setIsHidden(true)
        }}
        onMouseEnter={() => {
          updateBgHighlight({
            translate: translate,
            backgroundColor: bgColor,
          })
        }}
        rel="noopener noreferrer"
        target="_blank"
      >
        {icon}
        {children}
      </a>
    )
  } else {
    return (
      <ActiveLink
        activeChildren={activeIcon}
        activeClassName="after:absolute after:right-0 after:h-9 after:w-1 after:translate-x-1/2 after:rounded-sm after:bg-black"
        className="justify-left group z-10 flex flex-1 cursor-pointer items-center rounded-md px-2 py-1.5 transition duration-200"
        href={href}
        inactiveChildren={icon}
        inactiveClassName="bg-transparent text-black"
        onClick={() => {
          setIsHidden(true)
        }}
        onMouseEnter={() => {
          updateBgHighlight({
            translate: translate,
            backgroundColor: bgColor,
          })
        }}
      >
        {children}
      </ActiveLink>
    )
  }
}

Item.defaultProps = {
  activeIcon: null,
}

export default Item
