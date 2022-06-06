import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode } from 'react'

interface ActiveLinkProps {
  children: ReactNode
  href: string
  className?: string
  activeClassName?: string
  inactiveClassName?: string
  activeChildren?: ReactElement
  inactiveChildren?: ReactElement
  [x: string]: any
}

const ActiveLink = (props: ActiveLinkProps) => {
  const {
    children,
    href,
    className,
    activeClassName,
    inactiveClassName,
    activeChildren,
    inactiveChildren,
    ...rest
  } = props
  const router = useRouter()
  const isActive = router.asPath.includes(href + '/') || router.asPath === href
  const classNames = isActive
    ? className + ' ' + activeClassName
    : className + ' ' + inactiveClassName
  return (
    <Link href={href} passHref>
      <a {...rest} className={classNames}>
        {isActive ? activeChildren : inactiveChildren}
        {children}
      </a>
    </Link>
  )
}

ActiveLink.defaultProps = {
  activeChildren: null,
  activeClassName: '',
  className: '',
  inactiveChildren: null,
  inactiveClassName: '',
}

export default ActiveLink
