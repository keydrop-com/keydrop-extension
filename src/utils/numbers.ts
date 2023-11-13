import Decimal from 'decimal.js'

export const round = (value: number | string, decimalPlaces?: number): number => {
  if (isNaN(Number(value))) throw new Error(`Value is not a valid number: ${value}`)
  return new Decimal(value).toDecimalPlaces(decimalPlaces || 2).toNumber()
}

export const formatCurrency = (
  value?: null | number,
  currency?: string,
  lang = 'en',
  options?: Intl.NumberFormatOptions,
): string => {
  if (typeof value !== 'number') return 'N/A'
  return new Intl.NumberFormat(lang, {
    style: 'currency',
    currency: currency || 'USD',
    ...options,
  })
    .format(value)
    .replace('zł', 'PLN')
}
