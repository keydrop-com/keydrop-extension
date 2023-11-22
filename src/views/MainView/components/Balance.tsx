import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { SvgIcon } from '@/components/SvgIcon'
import { DEFAULT_MOTION } from '@/constants/common'
import { AnimatedCounter } from '@/views/MainView/components/AnimatedCounter'

interface BalanceInterface {
  value: null | number
  currency: string
  isCounterAnimationEnabled: boolean
}

export const Balance: FC<BalanceInterface> = ({ value, currency, isCounterAnimationEnabled }) => {
  const { t } = useTranslation('mainView')
  const isBalanceLoaded = typeof value === 'number'

  return (
    <div className="grid grid-cols-[50px,1fr] items-center gap-6">
      <div className="grid h-[50px] w-[50px] place-items-center overflow-hidden rounded-lg bg-lightgreen-750">
        <SvgIcon iconName="wallet-fill" className="h-6 w-6 text-lightgreen" />
      </div>
      <div>
        <p className="text-xl font-semibold text-lightgreen">
          <AnimatePresence mode="wait">
            <motion.span key={isBalanceLoaded ? 'loading' : 'balance'} {...DEFAULT_MOTION}>
              {isBalanceLoaded ? (
                <AnimatedCounter
                  format
                  from={0}
                  to={value}
                  currency={currency}
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
