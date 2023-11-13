import { LayoutType } from '@/types/layout'

export const BaseLayout: LayoutType = ({ children }) => {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {children}
    </div>
  )
}
