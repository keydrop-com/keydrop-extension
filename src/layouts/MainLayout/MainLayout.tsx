import { Navbar } from '@/components/Navbar'
import { LayoutType } from '@/types/layout'

export const MainLayout: LayoutType = ({ children }) => {
  return (
    <div className="grid h-full w-full grid-rows-[100px,1fr] gap-[30px] bg-navy-750">
      <div className="px-5 pt-5">
        <Navbar />
      </div>
      <div>{children}</div>
    </div>
  )
}
