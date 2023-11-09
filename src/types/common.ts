import { ComponentProps, CSSProperties, ElementType, JSX } from 'react'

export type TwComponent<CustomProps = unknown> = <As extends ElementType>(
  props: {
    as?: As
    style?: CSSProperties
    className?: string
  } & ComponentProps<As> &
    CustomProps,
) => JSX.Element
