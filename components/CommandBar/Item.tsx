import Link from 'next/link'

export interface ItemProps {
  title: string
  tags: string[]
  icon: React.ReactNode
  href: string
}

interface CompItemProps extends ItemProps {
  onMouseMove: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

const Item = (props: CompItemProps) => {
  const { title, tags, icon, href, onMouseMove } = props

  if (href.startsWith('http')) {
    return (
      <a
        className="DISABLEDoutline-none z-10 flex flex-row space-y-2 p-3"
        href={href}
        onMouseMove={onMouseMove}
      >
        <span className="flex flex-none flex-row items-center justify-center space-x-2">
          {icon}
          <span className="text-lg">{title}</span>
        </span>
      </a>
    )
  } else {
    return (
      <Link href={href} passHref>
        <a
          className="DISABLEDoutline-none z-10 flex flex-row space-y-2 p-3"
          onMouseMove={onMouseMove}
        >
          <span className="flex flex-none flex-row items-center justify-center space-x-2">
            {icon}
            <span className="text-lg">{title}</span>
          </span>
        </a>
      </Link>
    )
  }
}

export default Item
