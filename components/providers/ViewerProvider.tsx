import {
  GetViewerQueryResult,
  useGetViewerQuery,
  User,
} from '../../graphql/types.generated'
import { createContext, ReactNode, useContext, useMemo } from 'react'

const ViewerContext = createContext<GetViewerQueryResult>(null as any)

const ViewerProvider = ({ children }: { children: ReactNode }) => {
  const queryResult = useGetViewerQuery()

  return (
    <ViewerContext.Provider value={queryResult}>
      {children}
    </ViewerContext.Provider>
  )
}

export const useViewer = () => {
  return useContext(ViewerContext)
}

export default ViewerProvider
