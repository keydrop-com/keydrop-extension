import { round } from '@/utils/numbers'

describe('numbers utils functions', () => {
  it('should return rounded number', () => {
    const number = 21.3742
    const result = round(number)
    expect(result).toBe(21.37)
  })
})
