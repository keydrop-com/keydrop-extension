import Decimal from 'decimal.js'

export const round = (value: number | string, decimalPlaces?: number): number => {
  return new Decimal(value).toDecimalPlaces(decimalPlaces || 2).toNumber()
}
