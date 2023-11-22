import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { FC, useEffect, useRef } from 'react'

import { formatCurrency } from '@/utils/numbers'

type CounterProps = {
  from: number
  to: number
  format?: boolean
  currency?: string
  isEnabled?: boolean
}

const getFormattedValue = (value: number, format: boolean, currency: string): string => {
  return format ? formatCurrency(value, currency) : String(Math.round(value))
}

export const AnimatedCounter: FC<CounterProps> = ({
  from,
  to,
  format = false,
  currency = 'USD',
  isEnabled = true,
}) => {
  const ref = useRef(null)
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => getFormattedValue(latest, format, currency))

  useEffect(() => {
    if (!isEnabled) return
    animate(count, to, { duration: 1 })
  }, [count, to])

  return (
    <span>
      <motion.span ref={ref}>
        {isEnabled ? rounded : getFormattedValue(to, format, currency)}
      </motion.span>
    </span>
  )
}
