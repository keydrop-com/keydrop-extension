import Decimal from 'decimal.js'

export const round = (value: number | string, decimalPlaces?: number): number => {
  if (isNaN(Number(value))) throw new Error(`Value is not a valid number: ${value}`)
  return new Decimal(value).toDecimalPlaces(decimalPlaces || 2).toNumber()
}
