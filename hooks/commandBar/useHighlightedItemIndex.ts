import { RefObject, useEffect, useState } from 'react'

const useHighlightedItemIndex = (itemsRef: RefObject<HTMLDivElement>) => {
  const [highlightedItemIndex, setHighlightedItemIndex] = useState<number>(-1)
  const [bgHighlightTranslate, setBgHighlightTranslate] = useState(0)
  const [bgHighlightHeight, setBgHighlightHeight] = useState(0)
  const [displayBgHighlight, setDisplayBgHighlight] = useState(false)

  useEffect(() => {
    if (itemsRef.current?.children?.length) {
      if (highlightedItemIndex < 0) {
        setHighlightedItemIndex(itemsRef.current?.children?.length - 1)
      }

      if (highlightedItemIndex >= itemsRef.current?.children?.length) {
        setHighlightedItemIndex(0)
      }

      const highlightedItem = itemsRef.current?.children[highlightedItemIndex]

      highlightedItem &&
        highlightedItem.scrollIntoView({
          // behavior: 'smooth',
          block: 'center',
        })

      setDisplayBgHighlight(true)
      // get top of element relative to the parent
      const elementTop = highlightedItem?.getBoundingClientRect().top ?? 0
      // get top of parent
      const parentTop =
        highlightedItem?.parentElement?.parentElement?.getBoundingClientRect()
          .top as number

      setBgHighlightTranslate(elementTop - parentTop - 8)

      // get height of element
      const elementHeight = highlightedItem?.getBoundingClientRect().height
      setBgHighlightHeight(elementHeight ?? 0)
    } else {
      setDisplayBgHighlight(false)
    }
  }, [highlightedItemIndex, itemsRef])

  return {
    setHighlightedItemIndex,
    setDisplayBgHighlight,
    bgHighlightTranslate,
    bgHighlightHeight,
    displayBgHighlight,
  }
}

export default useHighlightedItemIndex
