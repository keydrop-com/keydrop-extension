import { JSX, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { TableVirtuoso } from 'react-virtuoso'

import Loader from '@/components/Loader'
import { cn } from '@/utils/styles'

export interface TableColumnInterface<T> {
  header: string
  accessor: keyof T
  cellRenderer: (cellValue: T[keyof T], row: T) => JSX.Element
}

interface TableInterface<T> {
  columns: TableColumnInterface<T>[]
  data: T[]
  itemHeight?: number
  allLoaded?: boolean
  noData?: boolean
  height?: number
  onLoadMore?: () => void
  classNames?: {
    main?: string
    thWrapper?: string
    th?: string
    tdWrapper?: string
    grid?: string
  }
}

export const Table = <T = unknown,>({
  columns,
  data,
  itemHeight = 70,
  height = 430,
  onLoadMore,
  classNames,
  allLoaded = true,
  noData = false,
}: TableInterface<T>): JSX.Element => {
  const { t } = useTranslation('common')
  const scrollContainerRef = useRef<HTMLElement | Window | null>(null)

  const renderCellValue = (row: T, column: TableColumnInterface<T>): JSX.Element | string => {
    if (column.cellRenderer) return column.cellRenderer(row[column.accessor], row)
    return String(row[column.accessor])
  }

  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0 })
  }, [])

  if (noData) {
    return (
      <div style={{ height }} className="flex w-full items-center justify-center">
        <p>{t('noItemsFound')}</p>
      </div>
    )
  }

  return (
    <TableVirtuoso
      scrollerRef={(ref) => (scrollContainerRef.current = ref)}
      data={data}
      style={{ height }}
      endReached={onLoadMore}
      fixedItemHeight={itemHeight}
      className={cn('scrollbar-gold !overflow-y-scroll', classNames?.main)}
      increaseViewportBy={{ top: itemHeight * 2, bottom: itemHeight * 2 }}
      fixedFooterContent={
        allLoaded ? null : () => <Loader height={30} width={25} iconClassName="text-gold" />
      }
      fixedHeaderContent={() => (
        <tr style={{ height: itemHeight }} className={cn(classNames?.thWrapper, classNames?.grid)}>
          {columns.map((column, index) => (
            <th key={index} className={cn(classNames?.th)}>
              {column.header}
            </th>
          ))}
        </tr>
      )}
      components={{
        Table: ({ style, ...props }) => (
          <table className="table w-full bg-navy-750" style={style} {...props} />
        ),
        TableRow: ({ style, ...props }) => {
          const { item, ...restProps } = props
          return (
            <tr
              className={cn('group', classNames?.tdWrapper, classNames?.grid)}
              style={{ ...style, height: itemHeight }}
              {...restProps}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="p-0">
                  <div className="flex h-full items-center justify-center">
                    {renderCellValue(item, column)}
                  </div>
                </td>
              ))}
            </tr>
          )
        },
        TableFoot: ({ style, ...props }) => (
          <tfoot
            className="w-full"
            style={{ ...style, position: 'relative', height: itemHeight }}
            {...props}
          />
        ),
      }}
    />
  )
}
