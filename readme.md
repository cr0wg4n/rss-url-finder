# RSS URL Finder

> A javascript/typescript library to search RSS feed via URL or HTML body 


## Installation

> ⚠️ For now, is only compatible with node >=18 vesions
```sh
npm install rss-url-finder
# or
pnpm install rss-url-finder
# or
yarn add rss-url-finder
```

## How to use
```js
import { getRssUrlsFromHtmlBody, getRssUrlsFromUrl } from 'rss-url-finder'

// If you need to search from URL
getRssUrlsFromUrl('https://cr0wg4n.medium.com/').then((
  rssUrls
)=>{
  console.log(rssUrls)
})
// Result: 
// [ 
//   { 
//     name: 'RSS', 
//     url: 'https://medium.com/feed/@cr0wg4n' 
//   } 
// ]

// If you need to search from HTML body
const rssUrls = getRssUrlsFromHtmlBody(`
<!doctype html>
<html lang="en" itemscope>
<head>
  <meta name="generator" content="Hexo 5.4.2"><link rel="alternate" href="/atom.xml" title="Dev-Academy.com - Web security | Testing & automation | Application architecture" type="application/atom+xml">
  <link rel="alternate" href="/rss2.xml" title="Dev-Academy.com - Web security | Testing & automation | Application architecture" type="application/rss+xml">
</head>
</figure>
<header>
  <div class="post-time">
    <time datetime="2022-12-22T00:00:00.000Z">22 December 2022</time>
  </div>
</header>
<body>
...... AND EXAMPLE OF HTML ...........
<script src="https://my.asdasdasd23123.com/2323323asdasdasdasdd.js" data-cookieconsent="ignore" charset="utf-8" async="async"></script>
</body>
</html>
`)
console.log(rssUrls)

// Result: 
// [
//   {
//     name: 'Dev-Academy.com - Web security | Testing & automation | Application architecture',
//     url: '/rss2.xml'
//   },
//   {
//     name: 'Dev-Academy.com - Web security | Testing & automation | Application architecture',
//     url: '/atom.xml'
//   }
// ]


```


Feel free to contribute in the [repository](https://github.com/cr0wg4n/rss-url-finder)


> Made with ❤️ by [cr0wg4n](cr0wg4n.github.io)
