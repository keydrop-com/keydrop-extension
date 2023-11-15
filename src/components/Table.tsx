import { JSX, useEffect, useRef } from 'react'
import { TableVirtuoso } from 'react-virtuoso'

import { cn } from '@/utils/styles'

export interface TableColumnInterface<T> {
  header: string
  accessor: keyof T
  cellRenderer?: (cellValue: T[keyof T], row: T) => JSX.Element
}

interface TableInterface<T> {
  columns: TableColumnInterface<T>[]
  data: T[]
  defaultItemHeight?: number
  height?: number
  classNames?: {
    thWrapper?: string
    tdWrapper?: string
    grid?: string
  }
}

export const Table = <T = unknown,>({
  columns,
  data,
  defaultItemHeight = 70,
  height = 430,
  classNames,
}: TableInterface<T>): JSX.Element => {
  const scrollContainerRef = useRef<HTMLElement | Window | null>(null)

  const renderCellValue = (row: T, column: TableColumnInterface<T>): JSX.Element | string => {
    if (column.cellRenderer) return column.cellRenderer(row[column.accessor], row)
    return String(row[column.accessor])
  }

  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0 })
  }, [])

  return (
    <TableVirtuoso
      scrollerRef={(ref) => (scrollContainerRef.current = ref)}
      data={data}
      style={{ height }}
      defaultItemHeight={defaultItemHeight}
      increaseViewportBy={{ top: defaultItemHeight * 2, bottom: defaultItemHeight * 2 }}
      fixedHeaderContent={() => (
        <tr
          style={{ height: defaultItemHeight }}
          className={cn(classNames?.thWrapper, classNames?.grid)}
        >
          {columns.map((column, index) => (
            <th key={index} className={cn('group')}>
              {column.header}
            </th>
          ))}
        </tr>
      )}
      components={{
        Table: (props) => <table {...props} className="table w-full bg-navy-750" />,
        TableRow: (props) => {
          const { item, ...restProps } = props
          return (
            <tr
              {...restProps}
              style={{ height: defaultItemHeight }}
              className={cn(classNames?.tdWrapper, classNames?.grid)}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="border-t-2 border-transparent p-0">
                  <div className="flex h-full items-center justify-center">
                    {renderCellValue(item, column)}
                  </div>
                </td>
              ))}
            </tr>
          )
        },
      }}
    />
  )
}
