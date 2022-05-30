// user framer-motion to scroll the div onto screen after we've scrolled for 100 pixels

import { motion, MotionValue, transform, useTransform } from 'framer-motion'

interface PostTitleToastProps {
  isOnScreen: boolean
  title: string
}

const PostTitleToast = (props: PostTitleToastProps) => {
  const { isOnScreen, title } = props

  return (
    <div
      className="pointer-events-none absolute left-0 right-0 z-10 mx-auto mt-3 flex items-center justify-center font-semibold transition-transform duration-100 ease-in-out"
      // y: useTransform(scrollYProgress, (scrollYProgress) => {
      //   return scrollYProgress > 0.06 ? '0' : '-100px'
      // })
      style={{
        // translate y -100px if isOnScreen is false
        transform: !isOnScreen ? 'translateY(0)' : 'translateY(-100px)',
      }}
    >
      <span className="rounded-lg bg-white px-3 py-2 text-sm shadow-lg">
        {title}
      </span>
    </div>
  )
}

export default PostTitleToast
