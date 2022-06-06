import type * as CSS from 'csstype'

const MenuBarGhost = ({ height }: { height: CSS.Property.Height }) => {
  return (
    <div
      className="w-full animate-shimmer rounded-lg bg-gradient-to-r from-neutral-50 via-neutral-100 to-neutral-50 bg-[length:400%_100%]"
      style={{
        height,
      }}
    />
  )
}

export default MenuBarGhost
