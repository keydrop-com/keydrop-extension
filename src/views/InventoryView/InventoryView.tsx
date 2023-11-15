import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ViewBar } from '@/components/ViewBar'
import { useApp } from '@/context/AppContext'
import InventoryClient from '@/services/http/InventoryClient'
import { CATEGORY_FILTER, SORTING_VARIANT, STATE_FILTER } from '@/types/API/http/inventory'
import { ActiveView } from '@/types/app'

export const InventoryView: FC = () => {
  const { t } = useTranslation('inventoryView')
  const { dispatch } = useApp()

  const handleOnBackClick = (): void => {
    dispatch({ type: 'SET_ACTIVE_VIEW', value: ActiveView.MAIN })
  }

  useEffect(() => {
    InventoryClient.getUserItems({
      weaponType: '',
      type: CATEGORY_FILTER.ALL,
      current_page: '0',
      per_page: '12',
      sort: SORTING_VARIANT.NEWEST,
      state: STATE_FILTER.ALL,
    }).then((res) => console.log('getUserItems', res))
  }, [])

  useEffect(() => {
    InventoryClient.getUserItemsMarketData().then((res) =>
      console.log('getUserItemsMarketData', res),
    )
  }, [])

  useEffect(() => {
    InventoryClient.getUserItemsEqValue().then((res) => console.log('getUserItemsEqValue', res))
  }, [])

  return (
    <>
      <div className="px-5">
        <ViewBar title={t('title')} onBackClick={handleOnBackClick} />
      </div>
    </>
  )
}
