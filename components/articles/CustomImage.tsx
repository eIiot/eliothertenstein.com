import { MapPin } from 'react-feather'

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
        alt={alt}
        className={`${className} w-full rounded-lg`}
        src={src}
        {...rest}
      />
      {caption && (
        <div className="mt-2 text-right text-neutral-400">
          <MapPin
            className="relative bottom-[0.125em] mr-2 inline-block"
            height={16}
            width={16}
          />
          {caption}
        </div>
      )}
    </div>
  )
}

CustomImage.defaultProps = {
  caption: '',
  className: '',
}

export default CustomImage
