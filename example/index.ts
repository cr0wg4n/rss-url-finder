import { getRssUrlsFromHtmlBody, getRssUrlsFromUrl } from 'rss-url-finder'

getRssUrlsFromUrl('https://cr0wg4n.medium.com/').then((
  rssUrls
)=>{
  console.log(rssUrls)
})


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
<script src="https://my.hellobar.com/e6f37be779b7dad9006dc743a8219cd9b5547f98.js" data-cookieconsent="ignore" charset="utf-8" async="async"></script>
</body>
</html>
`)

console.log(rssUrls)