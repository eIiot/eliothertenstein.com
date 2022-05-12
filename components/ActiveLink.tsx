import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

interface ActiveLinkProps {
  children: ReactElement
  href: string
  className?: string
  activeClassName?: string
  inactiveClassName?: string
  [x: string]: any
}

const ActiveLink = (props: ActiveLinkProps) => {
  const {
    children,
    href,
    className,
    activeClassName,
    inactiveClassName,
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
        {children}
      </a>
    </Link>
  )
}

ActiveLink.defaultProps = {
  activeClassName: '',
  className: '',
  inactiveClassName: '',
}

export default ActiveLink
