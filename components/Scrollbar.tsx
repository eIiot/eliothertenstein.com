import * as ScrollArea from '@radix-ui/react-scroll-area'

const ScrollBar = () => {
  return (
    <ScrollArea.Scrollbar className="flex w-1 touch-none select-none">
      <ScrollArea.Thumb className="relative z-30 flex-1 rounded-lg bg-[#7b7b7b] opacity-70 before:absolute before:top-1/2 before:left-1/2 before:h-full before:w-full before:-translate-x-1/2 before:-translate-y-1/2" />
    </ScrollArea.Scrollbar>
  )
}

export default ScrollBar
