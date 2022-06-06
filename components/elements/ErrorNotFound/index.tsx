import { AlertTriangle } from 'react-feather'

const ErrorNotFound = () => {
  return (
    <div className="relative inset-0 flex h-full flex-col items-center justify-center space-y-4">
      <AlertTriangle height={50} width={50} />
      <h2 className="text-2xl font-bold">Page not found</h2>
      <p className="text-xl">The page you are looking for does not exist :(</p>
    </div>
  )
}

export default ErrorNotFound
