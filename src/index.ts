import { RSS_MIME_TYPES, RssSource } from './types'
import { getDomainName, getHtmlBody, guessRSSfromUrl, newRssSource } from './utils'

import type { HTMLElement } from 'node-html-parser'
import { parse } from 'node-html-parser'

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
  const rssSources: RssSource[] = []
  for (const type of RSS_MIME_TYPES) {
    const domain = getDomainName(html)
    for (const search of html.querySelectorAll(`*[type="${type}"]`)) {
      const { title, href } = search.attrs

      if(domain){
        let url = ''
        try {
          new URL(href)
          url = href
        } catch (error) {
          url = new URL(href, domain).toString()
        }

        rssSources.push(newRssSource({
          name: title,
          url
        }))
      } else {
        rssSources.push(newRssSource({
          name: title,
          url: href
        }))
      }
    }
  }
  
  return rssSources
}
