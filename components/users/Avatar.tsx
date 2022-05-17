import * as RadixAvatar from '@radix-ui/react-avatar'

interface AvatarProps {
  image?: string
  name: string
}

const Avatar = (props: AvatarProps) => {
  const { image, name } = props
  return (
    <RadixAvatar.Root className="h-8 w-8 cursor-pointer rounded-full bg-neutral-100">
      <RadixAvatar.Image alt="Profile" className="rounded-full" src={image} />
      <RadixAvatar.Fallback className="color-red-500 content-center items-center">
        {name.charAt(0)}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}

Avatar.defaultProps = {
  image: undefined,
}

export default Avatar
