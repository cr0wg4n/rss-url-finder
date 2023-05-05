import { RssSource, TYPES } from "./types";
import type { HTMLElement } from 'node-html-parser'

export function newRssSource({name, url}: RssSource): RssSource {
  return {
    name: name?.trim(),
    url: url?.trim(),
  }
}

export async function getHtmlBody(url: string, options?: RequestInit) {
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
            name: (new URL(guessUrl)).hostname,
            url: guessUrl
          }))
        }
        break
      }
    }
  }
  return rssFeed
}

export function getDomainName(html: HTMLElement): string | undefined {
  let domain = html.querySelector(`link[rel="canonical"]`)?.attrs.href
  if (domain) {
    try {
      const { hostname, protocol } = new URL(domain)
      domain = `${protocol}//${hostname}`
      return domain 
    } catch (error) {
      return undefined    
    }
  }
  return undefined
}