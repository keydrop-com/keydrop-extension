import { KD_API_BASE_URL } from '@/constants/API/common'
import { Params } from '@/types/API/http/helpers'

import { getApiUrl, URLWithParams } from './helpers'

describe('getApiUrl function', () => {
  it('should return a proper API URL with root base path', () => {
    const url = 'endpoint'
    expect(getApiUrl(url)).toEqual('https://key-drop.com/endpoint')
  })
})

describe('URLWithParams function', () => {
  it('should properly generate a URL with given pathname and parameters', () => {
    const params: Params = {
      testParam: 'testValue',
      testArrayParam: [1, 2, 3],
      testBooleanParam: true,
    }

    const expectedURL = `${KD_API_BASE_URL}testPath?testParam=testValue&testArrayParam=1&testArrayParam=2&testArrayParam=3&testBooleanParam=true`

    expect(URLWithParams('/testPath', params)).toEqual(expectedURL)
  })

  it('should not append parameters with undefined values', () => {
    const params: Params = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      testParam: undefined,
    }

    const expectedURL = `${KD_API_BASE_URL}testPath`

    expect(URLWithParams('/testPath', params)).toEqual(expectedURL)
  })
})
