import { formatCurrency, round } from '@/utils/numbers'

describe('numbers utils functions', () => {
  it('should return rounded number (from number)', () => {
    const number = 21.3742
    const result = round(number)
    expect(result).toBe(21.37)
  })

  it('should return rounded number (from string)', () => {
    const number = '21.3742'
    const result = round(number)
    expect(result).toBe(21.37)
  })

  it('should throw error', () => {
    const number = '21,3742'
    expect(() => round(number)).toThrow('Value is not a valid number: 21,3742')
  })
})

describe('formatCurrency function', () => {
  test('returns "N/A" when the input value is not a number', () => {
    expect(formatCurrency(null)).toBe('N/A')
    expect(formatCurrency(undefined)).toBe('N/A')
  })

  test('returns the correct format for USD when currency is undefined', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })

  test('returns the correct format for provided currency', () => {
    expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56')
  })

  test('returns the correct format according to provided language', () => {
    expect(formatCurrency(1234.56, 'EUR', 'de-DE')).toEqual('1.234,56\xa0€')
  })

  test('returns the correct format according to provided options', () => {
    expect(formatCurrency(1234, 'GBP', 'en-GB', { minimumFractionDigits: 0 })).toBe('£1,234')
  })

  test('returns the correct format when "PLN" is used as currency', () => {
    expect(formatCurrency(1234.56, 'PLN')).toContain('PLN')
  })
})
