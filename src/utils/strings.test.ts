import { describe, expect, test } from '@jest/globals'

import { isStatTrak, skinNameWithoutStatTrak, splitHashName } from './strings'

describe('Function: isStatTrak', () => {
  test('should return true when the string includes "StatTrak™"', () => {
    const statTrakString = 'Item: Knife (StatTrak™)'
    expect(isStatTrak(statTrakString)).toBe(true)
  })

  test('should return false when the string does not include "StatTrak™"', () => {
    const nonStatTrakString = 'Item: Knife'
    expect(isStatTrak(nonStatTrakString)).toBe(false)
  })

  test('should return false for an undefined string', () => {
    const undefinedString: string | undefined = undefined
    expect(isStatTrak(undefinedString)).toEqual(false)
  })
})

describe('skinNameWithoutStatTrak function', () => {
  it('should remove "StatTrak™ " from the beginning of the hashName', () => {
    const hashName = 'StatTrak™ skinName'
    const result = skinNameWithoutStatTrak(hashName)
    expect(result).toBe('skinName')
  })

  it('should leave hashName unchanged if "StatTrak™ " is not at the beginning', () => {
    const hashName = 'skinName StatTrak™'
    const result = skinNameWithoutStatTrak(hashName)
    expect(result).toBe(hashName)
  })

  it('should return the same string if "StatTrak™ " is not present', () => {
    const hashName = 'skinName'
    const result = skinNameWithoutStatTrak(hashName)
    expect(result).toBe(hashName)
  })
})

describe('splitHashName function', () => {
  test('should correctly handle regular skins with condition input', () => {
    const hashName = 'M4A1-S | Fizzy POP (Well-Worn)'
    const result = splitHashName(hashName)
    expect(result).toEqual(['M4A1-S', 'Fizzy POP', '(Well-Worn)'])
  })

  test('should correctly handle regular skins without condition input', () => {
    const hashName = 'VOUCHER | 0.01$'
    const result = splitHashName(hashName)
    expect(result).toEqual(['VOUCHER', '0.01$', ''])
  })

  test('should correctly handle input where no match is found', () => {
    const hashName = 'Some random string'
    const result = splitHashName(hashName)
    expect(result).toEqual(['Some random string', '', ''])
  })
})
