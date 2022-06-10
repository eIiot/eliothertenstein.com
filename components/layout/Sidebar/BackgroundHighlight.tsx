interface BackgroundHighlightProps {
  isHidden: boolean
  translate: number
  backgroundColor: string
  duration: number
}

const BackgroundHighlight = (props: BackgroundHighlightProps) => {
  const { isHidden, translate, backgroundColor, duration } = props
  return (
    <div
      className="absolute top-[20px] h-9 w-full rounded-md bg-neutral-100 px-2"
      style={{
        transform: `translateY(${translate}px)`,
        display: isHidden ? 'none' : 'block',
        transition: `transform ${duration}ms ease-in-out, background-color ${
          duration * 2
        }ms ease-in-out`,
        backgroundColor: backgroundColor,
      }}
    />
  )
}
export default BackgroundHighlight
