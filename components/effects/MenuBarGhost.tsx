const MenuBarGhost = ({ height }: { height: `${string}px` }) => {
  return (
    <div
      className={`animate-shimmer h-[${height}] w-full rounded-lg bg-gradient-to-r from-neutral-50 via-neutral-100 to-neutral-50 bg-[length:400%_100%]`}
    />
  )
}

export default MenuBarGhost
