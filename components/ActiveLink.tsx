import Link from 'next/link'
import { useRouter } from 'next/router'

interface ActiveLinkProps {
  children: React.ReactNode
  href: string
  className?: string
  activeClassName?: string
  inactiveClassName?: string
}

const ActiveLink = (props: ActiveLinkProps) => {
  const { children, href, className, activeClassName, inactiveClassName } =
    props
  const router = useRouter()
  const isActive = router.asPath.includes(href + '/') || router.asPath === href
  const classNames = isActive
    ? className + ' ' + activeClassName
    : className + ' ' + inactiveClassName
  return (
    <Link href={href} passHref>
      <div className={classNames}>{children}</div>
    </Link>
  )
}

ActiveLink.defaultProps = {
  activeClassName: '',
  className: '',
  inactiveClassName: '',
}

export default ActiveLink
