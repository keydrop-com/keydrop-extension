import { round } from '@/utils/numbers'

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
