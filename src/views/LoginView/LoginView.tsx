import { motion } from 'framer-motion'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/Button'
import { SvgIcon } from '@/components/SvgIcon'
import { KEYDROP } from '@/constants/urls'

export const LoginView: FC = () => {
  const { t } = useTranslation('login')

  return (
    <>
      <div className="relative z-10 flex w-[460px] flex-col gap-9">
        <div className="flex flex-col items-center justify-center gap-8">
          <SvgIcon iconName="keydrop-logo" className="h-[116px] w-[460px]" />
          <h1 className="relative left-[18px] w-fit text-xl font-semibold uppercase tracking-[36px] text-gold-400">
            EXTENSION
          </h1>
        </div>
        <hr className="w-[460px] border-dashed border-[#858DAD]" />
        <div className="w-full">
          <p className="text-center text-xl leading-[28px]">{t('description')}</p>
        </div>
        <div className="relative top-8 flex w-full justify-center">
          <Button
            href={KEYDROP.main}
            className="button--primary h-[70px] w-fit rounded-[15px] px-[80px] text-base"
            label={t('button.label')}
          />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <SvgIcon
          iconName="keydrop-signet"
          className="absolute left-[80%] top-1/2 h-[878px] w-[719px] -translate-x-1/2 -translate-y-1/2 -rotate-[16deg] text-white opacity-20 mix-blend-overlay"
        />
      </motion.div>
    </>
  )
}
