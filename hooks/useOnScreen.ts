import { useEffect, useState } from 'react'

export default function useOnScreen(ref: any, rootMargin = '0px') {
  const [isIntersecting, setIsIntersecting] = useState(false)

  const observer = new IntersectionObserver(([entry]) =>
    setIsIntersecting(entry.isIntersecting)
  )

  useEffect(() => {
    observer.observe(ref.current)
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect()
    }
  }, [])

  return isIntersecting
}
