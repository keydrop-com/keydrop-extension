import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Table, TableColumnInterface } from '@/components/Table'
import { ViewBar } from '@/components/ViewBar'
import { useApp } from '@/context/AppContext'
import { ActiveView } from '@/types/app'

type InventoryItemRow = {
  itemDetails: string
  status: string
  date: string
  actions: string[]
}

const el: InventoryItemRow = {
  itemDetails: 'AWP Dragon Lore',
  status: 'SOLD',
  date: '2023-08-19',
  actions: ['up', 'sell', 'coll'],
}

const data: InventoryItemRow[] = Array.from({ length: 50 }, (_, index) => ({
  ...el,
  ID: index,
}))

const columns: TableColumnInterface<InventoryItemRow>[] = [
  {
    header: 'Item details',
    accessor: 'itemDetails',
  },
  {
    header: 'Status',
    accessor: 'status',
  },
  {
    header: 'Date',
    accessor: 'date',
  },
  {
    header: 'Actions',
    accessor: 'actions',
    cellRenderer: (cellValue) => (
      <div className="flex items-center gap-2">
        <div className="flex h-[35px] w-[35px] items-center justify-center bg-gold-400">
          {cellValue[0]}
        </div>
        <div className="flex h-[35px] w-[90px] items-center justify-center bg-gold-400">
          {cellValue[1]}
        </div>
        <div className="flex h-[35px] w-[90px] items-center justify-center bg-gold-400">
          {cellValue[2]}
        </div>
      </div>
    ),
  },
]

export const InventoryView: FC = () => {
  const { t } = useTranslation('inventoryView')
  const { dispatch } = useApp()

  const handleOnBackClick = (): void => {
    dispatch({ type: 'SET_ACTIVE_VIEW', value: ActiveView.MAIN })
  }

  // useEffect(() => {
  //   InventoryClient.getUserItems({
  //     weaponType: '',
  //     type: CATEGORY_FILTER.ALL,
  //     current_page: '0',
  //     per_page: '12',
  //     sort: SORTING_VARIANT.NEWEST,
  //     state: STATE_FILTER.ALL,
  //   }).then((res) => console.log('getUserItems', res))
  // }, [])
  //
  // useEffect(() => {
  //   InventoryClient.getUserItemsMarketData().then((res) =>
  //     console.log('getUserItemsMarketData', res),
  //   )
  // }, [])
  //
  // useEffect(() => {
  //   InventoryClient.getUserItemsEqValue().then((res) => console.log('getUserItemsEqValue', res))
  // }, [])

  return (
    <div className="grid grid-rows-[35px,430px] gap-[5px]">
      <div className="px-5">
        <ViewBar title={t('title')} onBackClick={handleOnBackClick} />
      </div>
      <Table<InventoryItemRow>
        data={data}
        columns={columns}
        classNames={{
          grid: 'grid grid-cols-[36%,14%,14%,36%]',
          tdWrapper: 'h-[70px] bg-navy-750',
          thWrapper: 'h-[56px] bg-[#1F1F27] place-items-center',
        }}
      />
    </div>
  )
}
