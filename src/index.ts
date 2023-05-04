import { parse } from 'node-html-parser'
import type { HTMLElement } from 'node-html-parser'
import { RssSource, TYPES } from './types'


function newRssSource({name, url}: RssSource): RssSource {
  return {
    name: name?.trim(),
    url: url?.trim(),
  }
}

async function getHtmlBody(url: string, options?: RequestInit) {
  const request = await fetch(url, options)
  return await request.text()
}

export function generateGuesses(url: string): string[] {
  const urls: string[] = []
  const commonUrls = ['/feed', '/rss', '/rss.xml', '/feed.xml'];

  const { hostname, protocol } = new URL(url)
  for (const url of commonUrls) {
    urls.push(`${protocol}//${hostname}${url}`)
  }
  return urls
}

export async function guessRSSfromUrl(url: string): Promise<RssSource[]> {
  const rssFeed: RssSource[] = []

  for (const guessUrl of generateGuesses(url)) {
    const request = await fetch(guessUrl, { method:'HEAD' })
    if (request.status == 200) {
      const contentType = request.headers.get('content-type')?.toLowerCase()
      for (const type of TYPES) {
        if (contentType?.includes(type)) {
          rssFeed.push(newRssSource({
            name: guessUrl,
            url: guessUrl
          }))
        }
        break
      }
    }
  }
  return rssFeed
}

export function getRssUrlsFromHtmlBody(body: string): RssSource[] {
  const html = parse(body)
  return findRss(html)
}

export async function getRssUrlsFromUrl(
  url: string, 
  options?: RequestInit
): Promise<RssSource[]> {
  let body = await getHtmlBody(url, options)
  return getRssUrlsFromHtmlBody(body)
}

function findRss(html: HTMLElement): RssSource[]{
  const rssFeed: RssSource[] = []
  
  for (const type of TYPES) {
    for (const search of html.querySelectorAll(`*[type="${type}"]`)) {
      const { title, href } = search.attrs
      rssFeed.push(newRssSource({
        name: title,
        url: href
      }))
    }
  }
  
  return rssFeed
}


guessRSSfromUrl('https://www.lostiempos.com/')