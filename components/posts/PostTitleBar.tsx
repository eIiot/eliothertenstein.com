// user framer-motion to scroll the div onto screen after we've scrolled for 100 pixels

import useShadowTransform from '../../hooks/animations/useShadowTransform'
import { useViewer } from '../providers/ViewerProvider'
import {
  motion,
  MotionValue,
  ScrollMotionValues,
  useTransform,
} from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ArrowLeft, Edit } from 'react-feather'

interface PostTitleBarProps {
  isOnScreen: boolean
  title: string
  scrollY: MotionValue<number>
}

const PostTitleBar = (props: PostTitleBarProps) => {
  const { isOnScreen, title, scrollY } = props

  const {
    data: viewerData,
    loading: viewerLoading,
    error: viewerError,
  } = useViewer()

  const Router = useRouter()

  const shadow = useShadowTransform(scrollY)

  const transform = useTransform(
    useTransform(scrollY, [50, 100], [40, 0]),
    (p) => `translateY(-${p}px)`
  )

  const opacity = useTransform(scrollY, [50, 80, 100], [0, 0.3, 1])

  return (
    <motion.div
      className="absolute top-0 z-10 flex w-full items-center justify-start bg-white/80 p-3 backdrop-blur-lg backdrop-saturate-200"
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
      {viewerData && viewerData.viewer && viewerData.viewer.isAdmin && (
        <Link
          href={
            Router.asPath.replace(/#.*$/, '').replace(/\?.*$/, '') + '/edit'
          }
          passHref
        >
          <a className="ml-auto rounded-md p-2 hover:bg-neutral-100 lg:hidden">
            <Edit height={16} width={16} />
          </a>
        </Link>
      )}
    </motion.div>
  )
}

export default PostTitleBar
