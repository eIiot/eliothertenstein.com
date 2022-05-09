import { getLayout } from '../../../components/layouts/SiteLayout'
import SettingsTabs from '../../../components/SettingsTabs'
import * as Tabs from '@radix-ui/react-tabs'
import Router, { useRouter } from 'next/router'

const onValueChange = (value: string) => {
  // push to next/router
  Router.push('/me/settings/' + value)
}

const Settings = () => {
  // get tab from router
  const router = useRouter()
  const { tab } = router.query as { tab: string }
  return (
    <Tabs.Root
      className="fixed bottom-0 mb-auto h-3/4 w-full px-5"
      onValueChange={onValueChange}
      orientation="horizontal"
      value={tab}
    >
      <Tabs.List aria-label="tabs" className="space-x-3">
        <Tabs.Trigger
          className="rounded-lg py-2 px-3 shadow-inner radix-state-active:shadow-xl"
          value="tab1"
        >
          Profile
        </Tabs.Trigger>
        <Tabs.Trigger
          className="rounded-lg py-2 px-3  shadow-inner radix-state-active:shadow-xl"
          value="tab2"
        >
          Settings
        </Tabs.Trigger>
        <Tabs.Trigger
          className="rounded-lg py-2 px-3  shadow-inner radix-state-active:shadow-xl"
          value="tab3"
        >
          Manage
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Tab one content</Tabs.Content>
      <Tabs.Content value="tab2">Tab two content</Tabs.Content>
      <Tabs.Content value="tab3">Tab three content</Tabs.Content>
    </Tabs.Root>
  )
}

Settings.getLayout = (page: React.ReactNode) => getLayout(page)

export default Settings
