import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { FC, useEffect, useRef } from 'react'

import { formatCurrency } from '@/utils/numbers'

type CounterProps = {
  from: number
  to: number
  format?: boolean
  isEnabled?: boolean
}

const getFormattedValue = (value: number, format: boolean): string => {
  return format ? formatCurrency(value) : String(Math.round(value))
}

export const AnimatedCounter: FC<CounterProps> = ({
  from,
  to,
  format = false,
  isEnabled = true,
}) => {
  const ref = useRef(null)
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => getFormattedValue(latest, format))

  useEffect(() => {
    if (!isEnabled) return
    animate(count, to, { duration: 1 })
  }, [count, to])

  return (
    <span>
      <motion.span ref={ref}>{isEnabled ? rounded : getFormattedValue(to, format)}</motion.span>
    </span>
  )
}
