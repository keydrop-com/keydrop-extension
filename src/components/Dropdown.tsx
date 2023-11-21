import { Menu, Portal, Transition } from '@headlessui/react'
import React, { FC, Fragment, JSX, useEffect, useRef, useState } from 'react'
import { usePopper } from 'react-popper'

import { OptionType } from '@/types/common'
import { cn } from '@/utils/styles'

export type DropdownProps = {
  initialValue?: string
  options: OptionType[]
  onChange?(value: string, label: string | null): void
  className?: string
  buttonClassName?: string
  renderSelectedLabel?: (selectedValue: string, selectedLabel: string) => JSX.Element
  listClassName?: string
  listItemClassName?: string
  title?: string
  hideOnMobile?: boolean
  hideOnDesktop?: boolean
}

export const Dropdown: FC<DropdownProps> = ({
  className = '',
  buttonClassName = '',
  listItemClassName = '',
  listClassName = '',
  initialValue,
  options,
  onChange,
  renderSelectedLabel,
  title,
  hideOnMobile = false,
  hideOnDesktop = false,
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
    <Menu
      as="div"
      className={cn(
        'z-0 grid place-content-center',
        hideOnMobile && '!hidden lg:!grid',
        hideOnDesktop && '!grid lg:!hidden',
        className,
      )}
    >
      {({ open }) => (
        <>
          <Menu.Button
            ref={setTargetElement}
            title={title}
            className={cn(
              'flex h-[47px] items-center gap-1 rounded-lg px-4',
              open && 'bg-light-500',
              buttonClassName,
            )}
          >
            {renderSelectedLabel?.(selectedValue, selectedLabel || '') || (
              <span className="whitespace-nowrap font-bold">{selectedLabel}</span>
            )}
            {/*<SvgIcon*/}
            {/*  iconName=""*/}
            {/*  className={cn('transition-transform', open ? 'rotate-180' : 'rotate-0')}*/}
            {/*/>*/}
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
                    'bg-light-400 mt-2 w-full origin-top-right overflow-hidden rounded-lg shadow-lg',
                    listClassName,
                  )}
                >
                  {options.map(({ value, label }: OptionType) => (
                    <Menu.Item key={value}>
                      {({ active }) => (
                        <div
                          onClick={() => selectValue(value, label)}
                          className={cn(
                            'hover:bg-light-500 cursor-pointer px-4 py-2 font-bold transition-colors',
                            (active || value === selectedValue) && 'bg-light-500',
                            listItemClassName,
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
