import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/Button'
import { MouseParallax } from '@/components/MouseParallax'
import { SvgIcon } from '@/components/SvgIcon'
import { KEYDROP } from '@/constants/urls'

export const LoginView: FC = () => {
  const { t } = useTranslation('loginView')

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
      <MouseParallax className="absolute left-[80%] top-1/2 -translate-x-1/2 -translate-y-1/2">
        <SvgIcon
          iconName="keydrop-signet"
          className="h-[878px] w-[719px] -rotate-[16deg] text-white opacity-[0.02]"
        />
      </MouseParallax>
    </>
  )
}
