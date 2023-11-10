import { CSSProperties, JSX, ReactNode } from 'react'

export type TwComponent<CustomProps = unknown> = (
  props: {
    style?: CSSProperties
    className?: string
    children?: ReactNode
  } & CustomProps,
) => JSX.Element
