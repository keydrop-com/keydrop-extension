import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { Button } from '@/components/Button'
import { SvgIcon } from '@/components/SvgIcon'
import { DEFAULT_MOTION } from '@/constants/app'
import { KEYDROP } from '@/constants/urls'
import { BalanceResponse, ProfilePageResponse } from '@/types/API/http/profile'
import { formatCurrency } from '@/utils/numbers'

interface UserProfileInterface {
  userProfile: ProfilePageResponse
  steamId: string
  userBalance: null | BalanceResponse
}

export const UserProfile: FC<UserProfileInterface> = ({ userProfile, steamId, userBalance }) => {
  const { t } = useTranslation('mainView')
  const {
    user: { avatar, username },
  } = userProfile

  return (
    <div className="relative grid grid-cols-[150px,1fr] gap-10 overflow-hidden rounded-[15px] bg-[#1F1F27] px-8 py-9">
      <div className="overflow-hidden rounded-xl">
        <img src={avatar} className="h-[150px] w-[150px]" alt={username} />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-3xl font-semibold uppercase">{username}</h1>
          <Button
            href={KEYDROP.publicProfile(steamId)}
            className="h-fit p-0 text-sm font-medium uppercase text-[#B8BCD0] underline"
          >
            {t('profile.keydrop.label')}
          </Button>
        </div>
        <hr className="w-[250px] border-dashed border-[#2E3244]" />
        <div className="flex justify-between">
          <div className="grid grid-cols-[50px,1fr] items-center gap-6">
            <div className="grid h-[50px] w-[50px] place-items-center overflow-hidden rounded-lg bg-lightgreen-750">
              <SvgIcon iconName="wallet-fill" className="h-6 w-6 text-lightgreen" />
            </div>
            <div>
              <p className="text-xl font-semibold text-lightgreen">
                <AnimatePresence mode="wait">
                  <motion.span key={userBalance?.pkt ? 'balance' : 'loading'} {...DEFAULT_MOTION}>
                    {userBalance?.pkt ? (
                      <span>{formatCurrency(userBalance.pkt)}</span>
                    ) : (
                      <span>
                        <Trans i18nKey="loading" ns="common" />
                        ...
                      </span>
                    )}
                  </motion.span>
                </AnimatePresence>
              </p>
              <p className="text-sm font-semibold uppercase text-[#B8BCD0]">
                {t('wallet.balance.label')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <SvgIcon
        iconName="keydrop-signet"
        className="absolute left-[88%] top-1/2 h-[447px] w-[366px] -translate-x-1/2 -translate-y-1/2 -rotate-[16deg] text-white opacity-20 mix-blend-overlay"
      />
    </div>
  )
}
