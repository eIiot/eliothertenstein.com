// user framer-motion to scroll the div onto screen after we've scrolled for 100 pixels

import { motion, MotionValue, useTransform } from 'framer-motion'

interface PostTitleToastProps {
  scrollYProgress: MotionValue<number>
  title: string
}

const PostTitleToast = (props: PostTitleToastProps) => {
  const { scrollYProgress, title } = props

  return (
    <motion.div
      className="pointer-events-none absolute left-0 right-0 z-10 mx-auto mt-3 flex items-center justify-center font-semibold"
      style={{
        y: useTransform(scrollYProgress, (scrollYProgress) => {
          console.log(scrollYProgress)
          return scrollYProgress > 0.06 ? '0' : '-100px'
        }),
        transition: 'transform 100ms ease-in-out',
      }}
    >
      <span className="rounded-lg bg-white px-3 py-2 text-sm shadow-lg">
        {title}
      </span>
    </motion.div>
  )
}

export default PostTitleToast
