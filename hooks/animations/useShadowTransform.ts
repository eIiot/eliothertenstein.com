import { MotionValue, useTransform } from 'framer-motion'

const useShadowTransform = (scrollY: MotionValue<number>) => {
  const shadow = useTransform(
    useTransform(scrollY, [0, 100], [0, 0.125]),
    (p) => `0px 1px 3px rgba(0, 0, 0, ${p})`
  )
  return shadow
}

export default useShadowTransform
