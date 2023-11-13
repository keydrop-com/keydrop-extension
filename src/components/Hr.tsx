import { FC } from 'react'

interface HrProps {
  text?: string
}

export const Hr: FC<HrProps> = ({ text }) => {
  return (
    <div className="flex w-full items-center gap-7">
      <hr className="w-full border-[#2E3244]" />
      {text && (
        <>
          <p className="whitespace-nowrap text-sm font-medium uppercase text-[#B8BCD0]">{text}</p>
          <hr className="w-full border-[#2E3244]" />
        </>
      )}
    </div>
  )
}
