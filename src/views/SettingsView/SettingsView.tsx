import { useMachine } from '@xstate/react'
import { FC, JSX, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { Button } from '@/components/Button'
import { CircleLoader } from '@/components/CircleLoader'
import { Dropdown } from '@/components/Dropdown'
import { ViewBar } from '@/components/ViewBar'
import { SUPPORTED_CURRENCIES } from '@/constants/currency'
import { SUPPORTED_LANGUAGES } from '@/constants/lang'
import { useAppContext } from '@/context/AppContext'
import { LangCurrencyMachine } from '@/machines/LangCurrencyMachine/LangCurrency.machine'
import { ActiveView } from '@/types/app'

const renderLangLabel = (value: string, label?: string): JSX.Element => (
  <div className="flex w-full items-center gap-3.5">
    <span className="h-5 w-5 overflow-hidden rounded-full">
      <img alt={value} src={`flags/${value?.toLowerCase()}.svg`} className="h-5 w-5" />
    </span>
    <span className="text-sm">{label || value.toUpperCase()}</span>
  </div>
)

export const SettingsView: FC = () => {
  const { t } = useTranslation('main', { keyPrefix: 'settingsView' })
  const { appState, appSend } = useAppContext()
  const { langList, currencyList, lang: _lang, currency: _currency } = appState.context.initUserData

  const [state, send] = useMachine(LangCurrencyMachine, {
    context: {
      langList,
      currencyList,
      language: _lang,
      currency: _currency,
      draft: {
        language: _lang,
        currency: _currency,
      },
    },
    services: {
      failToast: () => {
        toast.success(t('toast.fail'))
        return Promise.resolve()
      },
    },
  })

  const { context, matches } = state
  const { currency, language } = context

  const isLoading = useMemo(() => matches('saving'), [state.value])

  const langOptions = useMemo(() => {
    return Object.entries(langList || SUPPORTED_LANGUAGES).map(([key, label]) => ({
      value: key,
      label: renderLangLabel(key, label),
    }))
  }, [langList])

  const currencyOptions = useMemo(
    () => (currencyList || SUPPORTED_CURRENCIES).map((value) => ({ value, label: value })),
    [currencyList],
  )

  const handleOnBackClick = (): void => {
    appSend({ type: 'ACTIVE_VIEW_CHANGE', value: ActiveView.MAIN })
  }

  const renderCurrentLangLabel = (selectedValue: string): JSX.Element => {
    const option = langOptions?.find(({ value }) => selectedValue.toUpperCase() === value)
    if (!option) return renderLangLabel(language)
    return option.label
  }

  const handleOnLangChange = (value: string): void => {
    send({ type: 'CHANGE_LANGUAGE', value })
  }

  const handleOnCurrencyChange = (value: string): void => {
    send({ type: 'CHANGE_CURRENCY', value })
  }

  const handleOnSubmit = (): void => {
    send('SAVE')
  }

  return (
    <div className="grid grid-rows-[35px,430px] gap-[30px] px-5">
      <ViewBar title={t('title')} onBackClick={handleOnBackClick} />
      <div className="grid h-full grid-rows-[310px,50px] gap-6">
        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-2.5">
            <p className="text-xs font-medium uppercase text-[#B8BCD0]">{t('lang.label')}</p>
            <Dropdown
              options={langOptions}
              className="w-full"
              onChange={handleOnLangChange}
              initialValue={language || 'en'}
              renderSelectedLabel={(v) => renderCurrentLangLabel(v)}
              disabled={isLoading}
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <p className="text-xs font-medium uppercase text-[#B8BCD0]">{t('currency.label')}</p>
            <Dropdown
              options={currencyOptions}
              className="w-full"
              onChange={handleOnCurrencyChange}
              initialValue={currency || 'USD'}
              disabled={isLoading}
            />
          </div>
        </div>
        <Button className="button--primary h-[50px]" disabled={isLoading} onClick={handleOnSubmit}>
          {isLoading ? <CircleLoader className="h-4 w-4" /> : t('save')}
        </Button>
      </div>
    </div>
  )
}
