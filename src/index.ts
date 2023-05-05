import { parse } from 'node-html-parser'
import type { HTMLElement } from 'node-html-parser'
import { RssSource, TYPES } from './types'
import { getHtmlBody, guessRSSfromUrl, newRssSource } from './utils'

export function getRssUrlsFromHtmlBody(body: string): RssSource[] {
  const html = parse(body)
  return findRss(html)
}

export async function getRssUrlsFromUrl(
  url: string, 
  options?: RequestInit
): Promise<RssSource[]> {
  let body = await getHtmlBody(url, options)
  const guessRssSources: RssSource[] = await guessRSSfromUrl(url)

  return [
    ...getRssUrlsFromHtmlBody(body),
    ...guessRssSources
  ]
}

function findRss(html: HTMLElement): RssSource[]{
  const rssFeed: RssSource[] = []
  for (const type of TYPES) {
    for (const search of html.querySelectorAll(`*[type="${type}"]`)) {
      const { title, href } = search.attrs

      let domain = html.querySelector(`link[rel="canonical"]`)?.attrs.href
      if(domain){
        const { hostname, protocol } = new URL(domain)
        domain = `${protocol}//${hostname}`
      }
      let url = ''
      try {
        new URL(href)
        url = href
      } catch (error) {
        url = new URL(href, domain).toString()
      }

      rssFeed.push(newRssSource({
        name: title,
        url
      }))
    }
  }
  
  return rssFeed
}
