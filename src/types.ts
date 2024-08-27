export interface RssSource {
  name?: string,
  url: string
}

export const RSS_MIME_TYPES = [
  'application/rss+xml',
  'application/atom+xml',
  'application/rdf+xml',
  'application/rss',
  'application/atom',
  'application/rdf',
  'text/rss+xml',
  'text/atom+xml',
  'text/rdf+xml',
  'text/rss',
  'text/atom',
  'text/rdf'
]

export const COMMON_URLS = [
  '/feed', '/rss', '/rss.xml', '/feed.xml'
]