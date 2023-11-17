import { useMachine } from '@xstate/react'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Table, TableColumnInterface } from '@/components/Table'
import { ViewBar } from '@/components/ViewBar'
import { useAppContext } from '@/context/AppContext'
import InventoryMachine from '@/machines/InventoryMachine/Inventory.machine'
import { ActiveView } from '@/types/app'
import { INVENTORY_EVENT, InventoryItemRow } from '@/types/inventory'
import { ActionsCellRender } from '@/views/InventoryView/components/Table/ActionsCellRender'
import { DateCellRender } from '@/views/InventoryView/components/Table/DateCellRender'
import { ItemsDetailsCellRender } from '@/views/InventoryView/components/Table/ItemsDetailsCellRender'
import { StatusCellRender } from '@/views/InventoryView/components/Table/StatusCellRender'

export const InventoryView: FC = () => {
  const { t } = useTranslation('inventoryView')
  const { appSend } = useAppContext()
  const [state, send] = useMachine(InventoryMachine)

  const { data } = state.context

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
  }, [data])

  const handleOnBackClick = (): void => {
    appSend({ type: 'ACTIVE_VIEW_CHANGE', value: ActiveView.MAIN })
  }

  const handleOnLoadMore = (): void => {
    send(INVENTORY_EVENT.loadMore)
  }

  return (
    <div className="grid grid-rows-[35px,430px] gap-[5px]">
      <div className="px-5">
        <ViewBar title={t('title')} onBackClick={handleOnBackClick} />
      </div>
      <Table<InventoryItemRow>
        data={tableData}
        columns={columns}
        onLoadMore={handleOnLoadMore}
        classNames={{
          main: 'pr-[18px]',
          grid: 'grid grid-cols-[36%,14%,14%,36%]',
          tdWrapper: 'h-[70px] bg-[#1F1F27] mt-1',
          thWrapper: 'h-[56px] bg-navy-750/[.9] place-items-center backdrop-blur-sm shadow-sm',
          th: 'text-xs font-medium text-[#B8BCD0] uppercase',
        }}
      />
    </div>
  )
}
