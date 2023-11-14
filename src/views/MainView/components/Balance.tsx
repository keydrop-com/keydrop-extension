import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { SvgIcon } from '@/components/SvgIcon'
import { DEFAULT_MOTION } from '@/constants/app'
import { BalanceResponse } from '@/types/API/http/profile'
import { AnimatedCounter } from '@/views/MainView/components/AnimatedCounter'

interface BalanceInterface {
  userBalance: null | BalanceResponse
  isCounterAnimationEnabled: boolean
}

export const Balance: FC<BalanceInterface> = ({ userBalance, isCounterAnimationEnabled }) => {
  const { t } = useTranslation('mainView')

  return (
    <div className="grid grid-cols-[50px,1fr] items-center gap-6">
      <div className="grid h-[50px] w-[50px] place-items-center overflow-hidden rounded-lg bg-lightgreen-750">
        <SvgIcon iconName="wallet-fill" className="h-6 w-6 text-lightgreen" />
      </div>
      <div>
        <p className="text-xl font-semibold text-lightgreen">
          <AnimatePresence mode="wait">
            <motion.span key={userBalance?.pkt ? 'balance' : 'loading'} {...DEFAULT_MOTION}>
              {userBalance?.pkt ? (
                <AnimatedCounter
                  format
                  from={0}
                  to={userBalance.pkt}
                  isEnabled={isCounterAnimationEnabled}
                />
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
  )
}
