import { CSSProperties, JSX, ReactNode } from 'react'

export type TwComponent<CustomProps = unknown> = (
  props: {
    style?: CSSProperties
    className?: string
    children?: ReactNode
  } & CustomProps,
) => JSX.Element

export type OptionType = {
  value: string
  label: string | JSX.Element
  link?: string
  icon?: string
}
