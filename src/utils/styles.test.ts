import theme from '@/styles/theme'

import { getRarityColor } from './styles'

describe('getRarityColor function', () => {
  it('should return color if color is defined in theme', () => {
    expect(getRarityColor('blue')).toBe(theme.colors['blue'].DEFAULT)
    expect(getRarityColor('red')).toBe(theme.colors['red'].DEFAULT)
  })

  it("should return 'gray' if defined color in theme is undefined", () => {
    expect(getRarityColor('greeeeeen')).toBe('gray')
  })
})
