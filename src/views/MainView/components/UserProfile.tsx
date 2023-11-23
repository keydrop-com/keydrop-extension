import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { RefillButton } from '@/components/RefillButton'
import { SvgIcon } from '@/components/SvgIcon'
import { BONUS_AMOUNT, BONUS_CODE } from '@/constants/refill'
import { KEYDROP } from '@/constants/urls'
import { InitUserDataResponse } from '@/types/API/http/profile'
import { Balance } from '@/views/MainView/components/Balance'

interface UserProfileInterface {
  initUserData: InitUserDataResponse
  steamId: string
  balanceValue: null | number
  isCounterAnimationEnabled: boolean
}

export const UserProfile: FC<UserProfileInterface> = ({
  initUserData,
  steamId,
  balanceValue,
  isCounterAnimationEnabled,
}) => {
  const { t } = useTranslation('main', { keyPrefix: 'userView' })
  const { avatar, userName, currency } = initUserData

  return (
    <div className="relative grid grid-cols-[150px,1fr] gap-10 overflow-hidden rounded-[15px] bg-[#1F1F27] px-8 py-9">
      <Avatar src={avatar} alt={userName} href={KEYDROP.profile} variant="large" />
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-3xl font-semibold uppercase">{userName}</h1>
          <Button
            href={KEYDROP.publicProfile(steamId)}
            className="h-fit p-0 text-sm font-medium uppercase text-[#B8BCD0] underline"
          >
            {t('profile.keydrop.label')}
          </Button>
        </div>
        <hr className="w-[250px] border-dashed border-[#2E3244]" />
        <div className="flex items-center justify-between">
          <Balance
            currency={currency}
            value={balanceValue}
            isCounterAnimationEnabled={isCounterAnimationEnabled}
          />
          <RefillButton code={BONUS_CODE} bonus={BONUS_AMOUNT} />
        </div>
      </div>
      <SvgIcon
        iconName="keydrop-signet"
        className="absolute left-[88%] top-1/2 z-0 h-[447px] w-[366px] -translate-x-1/2 -translate-y-1/2 -rotate-[16deg] text-white opacity-[0.01]"
      />
    </div>
  )
}
