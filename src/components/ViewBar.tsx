import { FC } from 'react'
import { Trans } from 'react-i18next'

import { Button } from '@/components/Button'

interface ViewBar {
  title: string
  onBackClick: () => void
}

export const ViewBar: FC<ViewBar> = ({ title, onBackClick }) => {
  return (
    <div className="relative flex h-[35px] w-full items-center justify-center">
      <Button
        onClick={onBackClick}
        className="uppercas absolute left-0 top-0 h-[35px] bg-[#23232D] px-8 py-0 text-2xs font-semibold hover:text-gold-400"
      >
        <Trans i18nKey="back" ns="common" />
      </Button>
      <h1 className="font-medium uppercase">{title}</h1>
    </div>
  )
}
