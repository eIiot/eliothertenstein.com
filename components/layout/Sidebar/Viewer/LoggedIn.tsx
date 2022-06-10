import { User } from '../../../../graphql/types.generated'
import * as Avatar from '@radix-ui/react-avatar'
import Link from 'next/link'
import { Settings } from 'react-feather'

interface LoggedInProps {
  viewer: User
  setIsHidden: (isHidden: boolean) => void
}

const LoggedIn = (props: LoggedInProps) => {
  const { viewer, setIsHidden } = props
  const { avatar, name, username } = viewer
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1 flex h-full w-full items-center justify-center">
        <Link className="" href="/profile/me">
          <Avatar.Root className="h-8 w-8 cursor-pointer rounded-full bg-neutral-100">
            <Avatar.Image
              alt="Profile"
              className="rounded-full"
              src={avatar ?? undefined}
            />
            <Avatar.Fallback className="color-red-500 content-center items-center">
              {name
                ? name
                    .split(' ')
                    .map((word) => word[0])
                    .join('')
                : username[0]}
            </Avatar.Fallback>
          </Avatar.Root>
        </Link>
      </div>
      <div className="col-span-3 flex h-full w-full items-center justify-center">
        <span className="text-normal inline-block w-full overflow-hidden text-ellipsis whitespace-nowrap pl-2 text-left font-normal">
          {name ? name.split(' ')[0] : username[0]}
        </span>
      </div>
      <div className="col-span-1 h-full w-full">
        <span className="flex h-full w-full items-center justify-center overflow-hidden">
          <Link href="/me/settings" passHref>
            <a
              className="cursor-pointer rounded-md hover:bg-neutral-100"
              onClick={() => {
                setIsHidden(true)
              }}
            >
              <Settings className="m-2 inline-block" size={18} />{' '}
            </a>
          </Link>
        </span>
      </div>
    </div>
  )
}

export default LoggedIn
