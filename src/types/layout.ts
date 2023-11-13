import { FC, ReactNode } from 'react'

export type LayoutType<T = NonNullable<unknown>> = FC<{ children: ReactNode } & T>
