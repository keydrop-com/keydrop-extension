import { FC } from 'react'

const LoginView: FC = () => {
  return (
    <div className="h-full w-full">
      <h1 className="text-gold-600">Login View</h1>
      <svg role="img">
        <use xlinkHref={`images/keydrop-signet.svg`} />
      </svg>
    </div>
  )
}

export default LoginView
