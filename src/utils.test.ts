import {
  describe,
  expect,
  test
} from '@jest/globals'

import {
  generateGuesses
} from './utils'

jest.setTimeout(1_000_000_000)

describe('URLS guess generator', () => {
  const URLs = [
    'https://www.lostiempos.com/asdasdd2ko123po21/2312323',
    'https://www.lavoz.com.ar/politica/la-recaudacion-de-cordoba-no-se-sostiene-y-pierde-con-la-inflacion/'
  ]
  URLs.forEach((url) => {
    test(url, () => {
      const urls = generateGuesses(url)
      // console.log(urls)
      expect(urls.length).toBeGreaterThan(0)
    })
  })
})
