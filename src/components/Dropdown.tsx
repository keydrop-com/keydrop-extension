import { Menu, Portal, Transition } from '@headlessui/react'
import React, { FC, Fragment, JSX, useEffect, useRef, useState } from 'react'
import { usePopper } from 'react-popper'

import { SvgIcon } from '@/components/SvgIcon'
import { OptionType } from '@/types/common'
import { cn } from '@/utils/styles'

export interface DropdownInterface {
  initialValue?: string
  options: OptionType[]
  onChange?(value: string, label: string | null): void
  renderSelectedLabel?: (selectedValue: string, selectedLabel: string) => JSX.Element
  title?: string
  className?: string
  classNames?: {
    button?: string
    list?: string
    listItem?: string
  }
}

export const Dropdown: FC<DropdownInterface> = ({
  className = '',
  initialValue,
  options,
  onChange,
  renderSelectedLabel,
  title,
  classNames,
}) => {
  const [selectedValue, setSelectedValue] = useState(initialValue || options[0]?.value)
  const [targetElement, setTargetElement] = React.useState<null | HTMLButtonElement>(null)
  const [popperElement, setPopperElement] = React.useState(null)

  const popperElRef = useRef(null)
  const { styles, attributes } = usePopper(targetElement, popperElement)

  const selectedOption = options.find(({ value }) => value === selectedValue)
  const selectedLabel = (selectedOption?.label as string) || (selectedOption?.value as string)

  const selectValue = (value: string, label: string | JSX.Element): void => {
    setSelectedValue(value)
    onChange?.(value, typeof label === 'string' ? label : null)
  }

  useEffect(() => {
    if (initialValue) setSelectedValue(initialValue)
    return () => setSelectedValue('')
  }, [initialValue])

  return (
    <Menu as="div" className={cn('z-0', className)}>
      {({ open }) => (
        <>
          <Menu.Button
            ref={setTargetElement}
            title={title}
            className={cn(
              'flex h-[60px] w-full items-center gap-1 rounded-[5px] bg-[#23232D] pl-3.5 pr-5',
              open && 'bg-red',
              classNames?.button,
            )}
          >
            {renderSelectedLabel?.(selectedValue, selectedLabel || '') || (
              <span className="w-full whitespace-nowrap text-left text-sm">{selectedLabel}</span>
            )}
            <SvgIcon
              iconName="arrow-down"
              className={cn(
                'h-[6px] w-[12px] transition-transform',
                open ? 'rotate-180' : 'rotate-0',
              )}
            />
          </Menu.Button>

          <Portal>
            <div
              ref={popperElRef}
              style={{ ...styles.popper, minWidth: targetElement?.offsetWidth, zIndex: 50 }}
              {...attributes.popper}
            >
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                beforeEnter={() => setPopperElement(popperElRef.current)}
                afterLeave={() => setPopperElement(null)}
              >
                <Menu.Items
                  static
                  className={cn(
                    'scrollbar-gold mt-2 max-h-[180px] w-full origin-top-right overflow-y-auto rounded-[5px] bg-[#23232D] shadow-lg',
                    classNames?.list,
                  )}
                >
                  {options.map(({ value, label }: OptionType) => (
                    <Menu.Item key={value}>
                      {({ active }) => (
                        <div
                          onClick={() => selectValue(value, label)}
                          className={cn(
                            'flex h-[60px] cursor-pointer items-center pl-3.5 pr-5 text-sm transition-colors hover:bg-red',
                            (active || value === selectedValue) && 'bg-red',
                            classNames?.listItem,
                          )}
                        >
                          {label || value}
                        </div>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </div>
          </Portal>
        </>
      )}
    </Menu>
  )
}
