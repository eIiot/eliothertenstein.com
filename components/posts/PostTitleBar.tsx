// user framer-motion to scroll the div onto screen after we've scrolled for 100 pixels

import {
  motion,
  MotionValue,
  ScrollMotionValues,
  useTransform,
} from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft } from 'react-feather'

interface PostTitleBarProps {
  isOnScreen: boolean
  title: string
  scrollY: MotionValue<number>
}

const PostTitleBar = (props: PostTitleBarProps) => {
  const { isOnScreen, title, scrollY } = props

  const shadow = useTransform(
    useTransform(scrollY, [0, 100], [0, 5]),
    (p) => `0px 0px ${p}px rgba(0, 0, 0, 0.1)`
  )

  const transform = useTransform(
    useTransform(scrollY, [50, 100], [40, 0]),
    (p) => `translateY(-${p}px)`
  )

  const opacity = useTransform(scrollY, [50, 80, 100], [0, 0.3, 1])

  return (
    <motion.div
      className="saturate absolute top-0 z-20 flex w-full items-center justify-start bg-white/80 p-3"
      style={{
        boxShadow: shadow,
      }}
    >
      <Link href="/posts">
        <a className="rounded-md p-2 hover:bg-neutral-100 lg:hidden">
          <ArrowLeft height={16} width={16} />
        </a>
      </Link>
      <motion.div
        className="pl-2 font-semibold text-black"
        style={{
          transform,
          opacity,
        }}
      >
        {title}
      </motion.div>
    </motion.div>
  )
}

export default PostTitleBar
