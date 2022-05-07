interface StyledLinkProps {
  children: string
  href: string
  target?: string
}

const styledLink = (props: StyledLinkProps) => {
  const { children, href, target } = props
  return (
    <a
      className="relative text-blue-400 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:translate-y-1 after:bg-blue-300 after:opacity-0 after:transition after:duration-200 after:ease-in-out hover:after:translate-y-0 hover:after:opacity-100"
      href={href}
      target={target || ''}
    >
      {children}
    </a>
  )
}

export default styledLink
