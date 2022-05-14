// user framer-motion to scroll the div onto screen after we've scrolled for 100 pixels

import {
  motion,
  MotionValue,
  useElementScroll,
  useTransform,
  useViewportScroll,
} from 'framer-motion'

interface PostTitleToastProps {
  scrollYProgress: MotionValue<number>
  title: string
}

const PostTitleToast = (props: PostTitleToastProps) => {
  const { scrollYProgress, title } = props

  return (
    <motion.div
      className="absolute z-10 mt-3 flex w-full items-center justify-center font-semibold"
      style={{
        y: useTransform(
          useTransform(scrollYProgress, [0.2, 0], [0, -1]),
          (value) => `calc(100px * ${value})`
        ),
      }}
    >
      <span className="rounded-lg bg-white px-3 py-2 text-sm shadow-lg">
        {title}
      </span>
    </motion.div>
  )
}

export default PostTitleToast
