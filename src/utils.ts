import {
  COMMON_URLS,
  RSS_MIME_TYPES,
  RssSource
} from './types'

import type {
  HTMLElement
} from 'node-html-parser'

function getBaseUrl(url: string): string | undefined {
  try {
    const { protocol, hostname } = new URL(url)
    return `${protocol}//${hostname}`
  }
  catch (error) {
    console.log(error)
    return undefined
  }
}

export function newRssSource({ name, url }: RssSource): RssSource {
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
  const baseUrl = getBaseUrl(url)

  for (const url of COMMON_URLS) {
    urls.push(`${baseUrl}${url}`)
  }

  return urls
}

export async function guessRSSfromUrl(url: string): Promise<RssSource[]> {
  const rssFeed: RssSource[] = []

  for (const guessUrl of generateGuesses(url)) {
    const request = await fetch(guessUrl, { method: 'HEAD' })
    if (request.status == 200) {
      const contentType = request.headers.get('content-type')?.toLowerCase()
      for (const mimeType of RSS_MIME_TYPES) {
        if (contentType?.includes(mimeType)) {
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
  let baseUrl = html.querySelector(`link[rel="canonical"]`)?.attrs.href
  if (baseUrl) {
    return getBaseUrl(baseUrl)
  }

  baseUrl = html.querySelector(`meta[property="og:url"]`)?.attrs.content
  if (baseUrl) {
    return getBaseUrl(baseUrl)
  }

  return undefined
}

export async function analyzeSitemap(
  url: string
): Promise<RssSource | undefined> {
  const baseUrl = getBaseUrl(url)
  const robotsUrl = (new URL('robots.txt', baseUrl)).toString()
  const text = await getHtmlBody(robotsUrl)
  const existsSitemap = /^Sitemap: (.+)$/s.exec(text)

  if (existsSitemap) {
    return {
      name: 'Sitemap',
      url: existsSitemap[1].trim(),
    }
  }

  return undefined
}
