import { PinAlt } from 'iconoir-react'

interface CustomImageProps {
  src: string
  alt: string
  className?: string
  caption?: string
  [key: string]: any
}

const CustomImage = (props: CustomImageProps) => {
  const { src, alt, className, caption, ...rest } = props
  return (
    <div>
      <img
        src={src}
        alt={alt}
        className={`${className} w-full rounded-lg`}
        {...rest}
      />
      {caption && (
        <div className="mt-2 text-right text-neutral-400">
          <PinAlt
            className="relative bottom-[0.125em] mr-2 inline-block"
            width={16}
            height={16}
          />
          {caption}
        </div>
      )}
    </div>
  )
}

export default CustomImage
