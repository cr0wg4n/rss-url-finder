import {describe, expect, test} from '@jest/globals'
import { generateGuesses, getRssUrlsFromUrl } from './index'

jest.setTimeout(1_000_000_000)

describe('get RSS from URLs', () => {
  const URLs = [
    'https://dev-academy.com/blog',
    'https://cr0wg4n.medium.com/',
    'https://lavozbolivia.com/'
  ]
  URLs.forEach((url) => {
    test(url, async () => {
      const rss = await getRssUrlsFromUrl(url)
      console.log(rss)
      expect(rss.length).toBeGreaterThan(0)
    })
  })
})


describe('URLS guess generator', () => {
  const URLs = [
    'https://www.lostiempos.com/asdasdd2ko123po21/2312323',
    'https://www.lavoz.com.ar/politica/la-recaudacion-de-cordoba-no-se-sostiene-y-pierde-con-la-inflacion/'
  ]
  URLs.forEach((url) => {
    test(url, ()=>{
      const urls = generateGuesses(url)
      // console.log(urls)
      expect(urls.length).toBeGreaterThan(0)
    })
  })
}) 