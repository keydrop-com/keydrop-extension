import { FC, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/Button'
import { Table, TableColumnInterface } from '@/components/Table'
import { ViewBar } from '@/components/ViewBar'
import { KEYDROP } from '@/constants/urls'
import { useAppContext } from '@/context/AppContext'
import { useInventoryContext } from '@/context/InventoryContext'
import useIsWindowFocused from '@/hook/useIsWindowFocused'
import { ActiveView } from '@/types/app'
import { InventoryItemRow } from '@/types/inventory'
import { ActionsCellRender } from '@/views/InventoryView/components/Table/ActionsCellRender'
import { DateCellRender } from '@/views/InventoryView/components/Table/DateCellRender'
import { ItemsDetailsCellRender } from '@/views/InventoryView/components/Table/ItemsDetailsCellRender'
import { StatusCellRender } from '@/views/InventoryView/components/Table/StatusCellRender'

export const InventoryView: FC = () => {
  const { t } = useTranslation('main', { keyPrefix: 'inventoryView' })

  const isFocused = useIsWindowFocused(false)
  const { appSend } = useAppContext()
  const { inventoryState, inventorySend } = useInventoryContext()

  const { context, matches } = inventoryState
  const { data } = context

  const tableData: InventoryItemRow[] = useMemo(() => {
    return data.map((item) => ({
      itemDetails: item.ref,
      actions: item.ref,
      date: item.ref,
      status: item.ref,
    }))
  }, [data])

  const columns: TableColumnInterface<InventoryItemRow>[] = useMemo(() => {
    return [
      {
        header: 'Item details',
        accessor: 'itemDetails',
        cellRenderer: ItemsDetailsCellRender,
      },
      {
        header: 'Status',
        accessor: 'status',
        cellRenderer: StatusCellRender,
      },
      {
        header: 'Date',
        accessor: 'date',
        cellRenderer: DateCellRender,
      },
      {
        header: 'Actions',
        accessor: 'actions',
        cellRenderer: ActionsCellRender,
      },
    ]
  }, [])

  const handleOnBackClick = (): void => {
    appSend({ type: 'ACTIVE_VIEW_CHANGE', value: ActiveView.MAIN })
  }

  const handleOnLoadMore = (): void => {
    inventorySend('LOAD_MORE')
  }

  useEffect(() => {
    if (!isFocused) return
    inventorySend('HARD_INVENTORY_REFRESH')
  }, [isFocused])

  return (
    <div className="grid grid-rows-[35px,430px] gap-[5px]">
      <div className="px-5">
        <ViewBar title={t('title')} onBackClick={handleOnBackClick} />
      </div>
      <Table<InventoryItemRow>
        data={tableData}
        columns={columns}
        onLoadMore={handleOnLoadMore}
        allLoaded={matches('loadedAllItems')}
        noData={matches('noData')}
        noDataJSX={
          <div className="flex w-full flex-col items-center justify-center gap-1">
            <p className="text-lg">{t('noActiveItems')}</p>
            <Button
              href={KEYDROP.main}
              label={t('openCases')}
              className="rounded-none p-0 text-base font-bold normal-case text-gold-400 hover:text-white"
            />
          </div>
        }
        classNames={{
          main: 'pr-[18px]',
          grid: 'grid grid-cols-[42%,13%,19%,25%]',
          tdWrapper: 'h-[70px] bg-[#1F1F27] hover:bg-[#292933] transition-colors mt-1',
          thWrapper: 'h-[56px] bg-navy-750/[.9] place-items-center backdrop-blur-sm shadow-sm',
          th: 'text-xs font-medium text-[#B8BCD0] uppercase',
        }}
      />
    </div>
  )
}
