import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
  useContext,
} from 'react'
import { createConnection } from 'net'

const SidebarControlContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>(null as any)

const SidebarControlProvider = ({ children }: { children: ReactNode }) => {
  // eslint-disable-next-line react/hook-use-state
  const stateResult = useState(true)

  return (
    <SidebarControlContext.Provider value={stateResult}>
      {children}
    </SidebarControlContext.Provider>
  )
}

export const useSidebarControl = () => {
  return useContext(SidebarControlContext)
}

export default SidebarControlProvider
