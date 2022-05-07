import Link from 'next/link'
import { useRouter } from 'next/router'

interface ActiveLinkProps {
  children: React.ReactNode
  href: string
  className?: string
  activeClassName?: string
}

const ActiveLink = (props: ActiveLinkProps) => {
  const { children, href, className, activeClassName } = props
  const router = useRouter()
  const isActive = router.asPath.includes(href + '/') || router.asPath === href
  const classNames = isActive ? className + ' ' + activeClassName : className
  return (
    <Link href={href} passHref>
      <div className={classNames}>{children}</div>
    </Link>
  )
}

export default ActiveLink
