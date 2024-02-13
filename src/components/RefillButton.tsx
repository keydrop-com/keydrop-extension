import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/Button'
import { SvgIcon } from '@/components/SvgIcon'
import { KEYDROP_URLS } from '@/constants/urls'
import { useAppContext } from '@/context/AppContext'

interface RefillButtonInterface {
  bonus: number
  code: string
}

export const RefillButton: FC<RefillButtonInterface> = ({ bonus, code }) => {
  const { t } = useTranslation('main', { keyPrefix: 'common' })
  const { appState } = useAppContext()

  const { mirrorUrl } = appState.context

  return (
    <Button
      href={KEYDROP_URLS.refillBalanceWithCode(mirrorUrl, code)}
      className="group relative flex h-[50px] min-w-[200px] items-center justify-center gap-2 overflow-hidden rounded-lg border border-[#92FFB1] bg-[#001A07] px-4"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-lightgreen-100/25 bg-[length:100%_100%] transition-[background-size] duration-200 group-hover:bg-[length:150%_150%]" />
      <SvgIcon iconName="wallet-fill" className="relative z-10 h-5 w-5 text-lightgreen" />
      <p className="relative z-10 flex gap-1.5 text-sm font-semibold uppercase">
        <span className="text-white">{t('refill')}</span>
        <span className="text-[#92FFB1]">+{bonus}%</span>
      </p>
      <div className="absolute right-0 z-10 block rotate-[30deg] text-6xl font-bold leading-none text-lightgreen-200 opacity-5 transition-transform duration-200 group-hover:-translate-x-6 group-hover:translate-y-3 group-hover:rotate-[30deg] group-hover:scale-125 group-hover:duration-[400ms] group-hover:ease-[cubic-bezier(0.03,0.69,0.15,0.86)]">
        $
      </div>
    </Button>
  )
}
