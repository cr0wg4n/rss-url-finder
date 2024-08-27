import {
  describe, expect, test
} from '@jest/globals'
import {
  getRssUrlsFromHtmlBody, getRssUrlsFromUrl
} from './index'

jest.setTimeout(1_000_000_000)

describe('get RSS from URLs', () => {
  const URLs = [
    'https://dev-academy.com/',
    'https://cr0wg4n.medium.com/',
    'https://www.lostiempos.com/',
  ]
  URLs.forEach((url) => {
    test(url, async () => {
      const rss = await getRssUrlsFromUrl(url)
      expect(rss.length).toBeGreaterThan(0)
    })
  })
})

describe('get RSS from HTML body', () => {
  const BODYs = [
    `
<!doctype html><html lang="en"><head><title data-rh="true">Mauricio Matias C. – Medium</title><meta data-rh="true" charset="utf-8"/><meta data-rh="true" name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1,maximum-scale=1"/><meta data-rh="true" name="theme-color" content="#000000"/><meta data-rh="true" name="twitter:app:name:iphone" content="Medium"/><meta data-rh="true" name="twitter:app:id:iphone" content="828256236"/><meta data-rh="true" property="al:ios:app_name" content="Medium"/><meta data-rh="true" property="al:ios:app_store_id" content="828256236"/><meta data-rh="true" property="al:android:package" content="com.medium.reader"/><meta data-rh="true" property="al:android:app_name" content="Medium"/><meta data-rh="true" property="fb:app_id" content="542599432471018"/><meta data-rh="true" property="og:site_name" content="Medium"/><meta data-rh="true" property="og:title" content="Mauricio Matias C. – Medium"/><meta data-rh="true" name="description" content="Read writing from Mauricio Matias C. on Medium. 🇧🇴 Software Developer 🔓 OSH / FLOSS lover and contributor cr0wg4n.github.io. Every day, Mauricio Matias C. and thousands of other voices read, write, and share important stories on Medium."/><meta data-rh="true" property="og:description" content="Read writing from Mauricio Matias C. on Medium. 🇧🇴 Software Developer 🔓 OSH / FLOSS lover and contributor cr0wg4n.github.io. Every day, Mauricio Matias C. and thousands of other voices read, write, and share important stories on Medium."/><meta data-rh="true" name="twitter:description" content="Read writing from Mauricio Matias C. on Medium. 🇧🇴 Software Developer 🔓 OSH / FLOSS lover and contributor cr0wg4n.github.io. Every day, Mauricio Matias C. and thousands of other voices read, write, and share important stories on Medium."/><meta data-rh="true" property="og:url" content="https://cr0wg4n.medium.com"/><meta data-rh="true" property="al:web:url" content="https://cr0wg4n.medium.com"/><meta data-rh="true" property="al:ios:url" content="medium://@cr0wg4n"/><meta data-rh="true" name="twitter:app:url:iphone" content="medium://@cr0wg4n"/><meta data-rh="true" property="al:android:url" content="medium://@cr0wg4n"/><meta data-rh="true" property="og:image" content="https://miro.medium.com/v2/resize:fit:2400/1*prYRWcUUZ9KhWOKIAHToiQ.jpeg"/><meta data-rh="true" name="twitter:image:src" content="https://miro.medium.com/v2/resize:fit:2400/1*prYRWcUUZ9KhWOKIAHToiQ.jpeg"/><meta data-rh="true" property="profile:username" content="cr0wg4n"/><meta data-rh="true" property="profile:first_name" content="Mauricio"/><meta data-rh="true" property="profile:last_name" content="Matias C."/><meta data-rh="true" property="og:type" content="profile"/><meta data-rh="true" name="twitter:card" content="summary"/><link data-rh="true" rel="icon" href="https://miro.medium.com/v2/1*m-R_BkNf1Qjr1YbyOIJY2w.png"/><link data-rh="true" rel="search" type="application/opensearchdescription+xml" title="Medium" href="/osd.xml"/><link data-rh="true" rel="apple-touch-icon" sizes="152x152" href="https://miro.medium.com/v2/resize:fill:152:152/1*sHhtYhaCe2Uc3IU0IgKwIQ.png"/><link data-rh="true" rel="apple-touch-icon" sizes="120x120" href="https://miro.medium.com/v2/resize:fill:120:120/1*sHhtYhaCe2Uc3IU0IgKwIQ.png"/><link data-rh="true" rel="apple-touch-icon" sizes="76x76" href="https://miro.medium.com/v2/resize:fill:76:76/1*sHhtYhaCe2Uc3IU0IgKwIQ.png"/><link data-rh="true" rel="apple-touch-icon" sizes="60x60" href="https://miro.medium.com/v2/resize:fill:60:60/1*sHhtYhaCe2Uc3IU0IgKwIQ.png"/><link data-rh="true" rel="mask-icon" href="https://cdn-static-1.medium.com/_/fp/icons/Medium-Avatar-500x500.svg" color="#171717"/><link data-rh="true" id="glyph_preload_link" rel="preload" as="style" type="text/css" href="https://glyph.medium.com/css/unbound.css"/><link data-rh="true" id="glyph_link" rel="stylesheet" type="text/css" href="https://glyph.medium.com/css/unbound.css"/><link data-rh="true" rel="canonical" href="https://cr0wg4n.medium.com"/><link data-rh="true" rel="alternate" href="android-app://com.medium.reader/https/medium.com/@cr0wg4n"/><link data-rh="true" id="feedLink" rel="alternate" type="application/rss+xml" title="RSS" href="https://medium.com/feed/@cr0wg4n"/><link data-rh="true" rel="me" href="https://twitter.com/cr0wg4n"/><link data-rh="true" rel="preload" href="https://miro.medium.com/v2/resize:fit:8320/1*JSbyNaJBvoWl23Bf_FxEYA.jpeg" as="image"/><style type="text/css" data-fela-rehydration="407" data-fela-type="STATIC">html{box-sizing:border-box;-webkit-text-size-adjust:100%}*, *:before, *:after{box-sizing:inherit}body{margin:0;padding:0;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;color:rgba(0,0,0,0.8);position:relative;min-height:100vh}h1, h2, h3, h4, h5, h6, dl, dd, ol, ul, menu, figure, blockquote, p, pre, form{margin:0}menu, ol, ul{padding:0;list-style:none;list-style-image:none}main{display:block}a{color:inherit;text-decoration:none}a, button, input{-webkit-tap-highlight-color:transparent}img, svg{vertical-align:middle}button{background:transparent;overflow:visible}button, input, optgroup, select, textarea{margin:0}:root{--reach-tabs:1;--reach-menu-button:1}#speechify-root{font-family:Sohne, sans-serif}div[data-popper-reference-hidden="true"]{visibility:hidden;pointer-events:none}
/*XCode style (c) Angel Garcia <angelgarcia.mail@gmail.com>*/.hljs {background: #fff;color: black;
}/* Gray DOCTYPE selectors like WebKit */
.xml .hljs-meta {color: #c0c0c0;
}.hljs-comment,
.hljs-quote {color: #007400;
}.hljs-tag,
.hljs-attribute,
.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-name {color: #aa0d91;
}.hljs-variable,
.hljs-template-variable {color: #3F6E74;
}.hljs-code,
.hljs-string,
.hljs-meta .hljs-string {color: #c41a16;
}.hljs-regexp,
.hljs-link {color: #0E0EFF;
}.hljs-title,
.hljs-symbol,
.hljs-bullet,
.hljs-number {color: #1c00cf;
}.hljs-section,
.hljs-meta {color: #643820;
}.hljs-title.class_,
.hljs-class .hljs-title,
.hljs-type,
.hljs-built_in,
.hljs-params {color: #5c2699;
}.hljs-attr {color: #836C28;
}.hljs-subst {color: #000;
}.hljs-formula {background-color: #eee;font-style: italic;
}.hljs-addition {background-color: #baeeba;
}.hljs-deletion {background-color: #ffc8bd;
}.hljs-selector-id,
.hljs-selector-class {color: #9b703f;
}.hljs-doctag,
.hljs-strong {font-weight: bold;
}.hljs-emphasis {font-style: italic;
}
</style>
</body></html>
`,
    `
<!doctype html>
<html lang="en" itemscope>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<link rel="canonical" href="https://dev-academy.com/blog/" />
<title>Dev-Academy.com - Web security | Testing &amp; automation | Application architecture</title>
<link rel="preload" href="/fonts/poppins-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/poppins-medium.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/poppins-semi-bold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/poppins-bold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/poppins-extra-bold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/source-code-pro.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/icofont.woff2" as="font" type="font/woff2" crossorigin>
<link as='style' href='https://d33wubrfki0l68.cloudfront.net/bundles/5cab5a71650a9fdebb1cf0984c087e9d8060a9f6.css' rel='preload' />
<link href='https://d33wubrfki0l68.cloudfront.net/css/4482b87dfcfa4e577b40fa88a725156db3cbf66b/css/styles.css' rel='stylesheet' />
<link href='https://d33wubrfki0l68.cloudfront.net/css/7c4fab1194591083e338abf2f3ecef46a8c7bb3d/css/desktop.css' media='(min-width: 420px)' rel='stylesheet' />
<link rel="icon" href="/img/favicon.png">
<meta name="description" content="Next-level in web development with angular, nodejs and more. Dev Academy is the place for full stack web developers where you will learn best practices.">
<meta property="og:type" content="website">
<meta property="og:title" content="Dev-Academy.com - Web security | Testing &amp; automation | Application architecture">
<meta property="og:url" content="https://dev-academy.com/blog/index.html">
<meta property="og:site_name" content="Dev-Academy.com - Web security | Testing &amp; automation | Application architecture">
<meta property="og:description" content="Next-level in web development with angular, nodejs and more. Dev Academy is the place for full stack web developers where you will learn best practices.">
<meta property="og:locale" content="en_US">
<meta property="og:image" content="https://dev-academy.com/blog/banner.png">
<meta property="article:author" content="Bartosz Pietrucha">
<meta property="article:tag" content="angular, rxjs, reactive, node, software architecture, testing, frontend, backend, fullstack web development">
<meta name="twitter:card" content="summary">
<meta name="twitter:image" content="https://dev-academy.com/blog/banner.png">
<script src='https://d33wubrfki0l68.cloudfront.net/js/2ee0b0662bffa2cfb2b0ce12aaef43d70a193155/js/cookie-bot.js'></script>
<meta name="generator" content="Hexo 5.4.2"><link rel="alternate" href="/atom.xml" title="Dev-Academy.com - Web security | Testing & automation | Application architecture" type="application/atom+xml">
<link rel="alternate" href="/rss2.xml" title="Dev-Academy.com - Web security | Testing & automation | Application architecture" type="application/rss+xml">
</head>
<body class="">
<noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-THK2B8H" height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<header class="header">
<div class="container">
<div class="header-bar">
<div class="header-title">
<a href="/web-security" class="header-logo" data-ph="header__logo">
<img src="https://d33wubrfki0l68.cloudfront.net/6c37831c46d34a6bc9e46fd315f1667fddd04897/ba9d9/img/dev-academy-logo.png" width="34" height="34" alt="Dev Academy Logo">
<span>Dev Academy</span>
</a>
</div>
<a class="button button-primary header-bar-start" href="/web-security" data-ph="header__start-button_mobile">Start here!</a>
<button class="header-nav-toggle" aria-label="Click here to open the mobile menu" data-ph="header-nav-toggle__button">
<img class="header-nav-toggle-menu" src="https://d33wubrfki0l68.cloudfront.net/e0e5463fb73406126b043f6025d2a2876dcce8f5/05c19/img/icons/menu.svg" width="24" height="24" alt="">
<img class="header-nav-toggle-close" src="https://d33wubrfki0l68.cloudfront.net/d729c3959275e7b6f6dbb6dee875fa33ff6aa49c/6f847/img/icons/close.svg" width="24" height="24" alt="">
</button>
</div>
<div class="header-menu">
<nav class="header-nav">
<ul>
<li class="header-nav-start"><a class="button button-primary" href="/web-security" data-ph="header__start-button_desktop">Start here!</a></li>
<li class="header-nav-submenu">
<a class="header-nav-link header-nav-link-submenu" href="#" data-ph="nav__link_academies">⭐ Academy</a>
<div class="header-nav-link-content">
<span class="header-nav-link-header border border-light border-small">Academy</span>
<ul>
<li>
<a class="header-nav-link" href="/web-security" rel="nofollow" data-ph="nav__link_academies_wsa">Web Security Dev Academy 🛡</a>
<div class="header-nav-link-description">All you need about full-stack Web security and much more!</div>
</li>
<li>
<a class="header-nav-link" target="_blank" href="https://fullstack-testing.com/" rel="nofollow noopener" data-ph="nav__link_academies_fta">Fullstack Testing Academy 🧪</a>
<div class="header-nav-link-description">All you need to know about full-stack Web application testing and automation!</div>
</li>
</ul>
</div>
</li>
<li><a class="header-nav-link" href="/web-security" rel="nofollow" data-ph="nav__link_courses">Courses</a></li>
<li><a class="header-nav-link header-nav-link-active" href="/blog" data-ph="nav__link_blog">Blog</a></li>
<li><a class="header-nav-link " href="/contributors" data-ph="nav__link_contributors">Contributors</a></li>
</ul>
</nav>
<ul class="header-socials">
<li>
<a class="header-social-link" target="_blank" href="https://www.youtube.com/channel/UCcJutJNPZVG5sbp_xaTmKEw" rel="nofollow noopener" aria-label="Go to Dev Academy Youtube channel" data-ph="nav__social-link_youtube">
<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28.7111 8.69978C28.7111 8.69978 28.4279 6.70037 27.5557 5.82244C26.4512 4.66697 25.2164 4.66131 24.65 4.59334C20.5945 4.29881 14.5057 4.29881 14.5057 4.29881H14.4943C14.4943 4.29881 8.40547 4.29881 4.35 4.59334C3.78359 4.66131 2.54883 4.66697 1.44434 5.82244C0.57207 6.70037 0.294531 8.69978 0.294531 8.69978C0.294531 8.69978 0 11.0504 0 13.3953V15.5929C0 17.9379 0.288867 20.2885 0.288867 20.2885C0.288867 20.2885 0.57207 22.2879 1.43867 23.1658C2.54316 24.3213 3.99316 24.2816 4.63887 24.4062C6.96113 24.6271 14.5 24.6951 14.5 24.6951C14.5 24.6951 20.5945 24.6838 24.65 24.3949C25.2164 24.3269 26.4512 24.3213 27.5557 23.1658C28.4279 22.2879 28.7111 20.2885 28.7111 20.2885C28.7111 20.2885 29 17.9435 29 15.5929V13.3953C29 11.0504 28.7111 8.69978 28.7111 8.69978ZM11.5037 18.2607V10.1101L19.3371 14.1996L11.5037 18.2607Z" fill="#FFFFFF" />
</svg>
</a>
</li>
<li>
<a class="header-social-link" target="_blank" href="https://discord.gg/tXrGY7ca43" rel="nofollow noopener" aria-label="Go to Dev Academy Discord" data-ph="nav__social-link_discord">
<svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.317 1.51312C18.7873 0.812761 17.147 0.296769 15.4319 0.00123971C15.4007 -0.00446392 15.3695 0.00978976 15.3534 0.0382978C15.1424 0.412697 14.9087 0.901132 14.7451 1.28504C12.9004 1.00947 11.0652 1.00947 9.25832 1.28504C9.09465 0.892598 8.85248 0.412697 8.64057 0.0382978C8.62449 0.0107409 8.59328 -0.00351276 8.56205 0.00123971C6.84791 0.295825 5.20756 0.811817 3.67693 1.51312C3.66368 1.51882 3.65233 1.52833 3.64479 1.54067C0.533392 6.17893 -0.31895 10.7032 0.0991801 15.1713C0.101072 15.1932 0.11337 15.2141 0.130398 15.2274C2.18321 16.7317 4.17171 17.6449 6.12328 18.2502C6.15451 18.2597 6.18761 18.2483 6.20748 18.2226C6.66913 17.5936 7.08064 16.9303 7.43348 16.2328C7.4543 16.1919 7.43442 16.1435 7.39186 16.1273C6.73913 15.8802 6.1176 15.579 5.51973 15.2369C5.47244 15.2094 5.46865 15.1419 5.51216 15.1096C5.63797 15.0155 5.76382 14.9176 5.88396 14.8188C5.90569 14.8007 5.93598 14.7969 5.96153 14.8083C9.88928 16.5977 14.1415 16.5977 18.023 14.8083C18.0485 14.796 18.0788 14.7998 18.1015 14.8178C18.2216 14.9167 18.3475 15.0155 18.4742 15.1096C18.5177 15.1419 18.5149 15.2094 18.4676 15.2369C17.8697 15.5856 17.2482 15.8802 16.5945 16.1264C16.552 16.1425 16.533 16.1919 16.5538 16.2328C16.9143 16.9293 17.3258 17.5926 17.7789 18.2217C17.7978 18.2483 17.8319 18.2597 17.8631 18.2502C19.8241 17.6449 21.8126 16.7317 23.8654 15.2274C23.8834 15.2141 23.8948 15.1941 23.8967 15.1723C24.3971 10.0066 23.0585 5.51946 20.3482 1.54162C20.3416 1.52833 20.3303 1.51882 20.317 1.51312ZM8.02002 12.4507C6.8375 12.4507 5.86313 11.3674 5.86313 10.037C5.86313 8.70664 6.8186 7.62336 8.02002 7.62336C9.23087 7.62336 10.1958 8.71615 10.1769 10.037C10.1769 11.3674 9.22141 12.4507 8.02002 12.4507ZM15.9947 12.4507C14.8123 12.4507 13.8379 11.3674 13.8379 10.037C13.8379 8.70664 14.7933 7.62336 15.9947 7.62336C17.2056 7.62336 18.1705 8.71615 18.1516 10.037C18.1516 11.3674 17.2056 12.4507 15.9947 12.4507Z" fill="#FFFFFF" />
</svg>
</a>
</li>
<li>
<a class="header-social-link" target="_blank" href="https://www.facebook.com/DevAcademyCom/" rel="nofollow noopener" aria-label="Go to Dev Academy Facebook" data-ph="nav__social-link_facebook">
<svg width="15" height="29" viewBox="0 0 15 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.07388 29V15.3924H0.5V10.493H4.07388V6.30822C4.07388 3.01983 6.18498 0 11.0494 0C13.0189 0 14.4753 0.190095 14.4753 0.190095L14.3606 4.76531C14.3606 4.76531 12.8753 4.75075 11.2545 4.75075C9.50031 4.75075 9.21926 5.56464 9.21926 6.91548V10.493H14.5L14.2702 15.3924H9.21926V29H4.07388Z" fill="#FFFFFF" />
</svg>
</a>
</li>
</ul>
</div>
</div>
</header>
<main>
<div class="posts-wrapper">
<div class="container">
<h2 class="posts-listing-header border border-light border-large"><span>Discover posts</span> by our elite team!</h2>


<div class="tag-list-all">
<ul class="tag-list" itemprop="keywords"><li class="tag-list-item"><a class="tag-list-link" href="/tags/angular/" rel="tag">angular</a></li><li class="tag-list-item"><a class="tag-list-link" href="/tags/architecture/" rel="tag">architecture</a></li><li class="tag-list-item"><a class="tag-list-link" href="/tags/career/" rel="tag">career</a></li><li class="tag-list-item"><a class="tag-list-link" href="/tags/design-patterns/" rel="tag">design patterns</a></li><li class="tag-list-item"><a class="tag-list-link" href="/tags/knowledge-pill/" rel="tag">knowledge pill</a></li><li class="tag-list-item"><a class="tag-list-link" href="/tags/node/" rel="tag">node</a></li><li class="tag-list-item"><a class="tag-list-link" href="/tags/oidc/" rel="tag">oidc</a></li><li class="tag-list-item"><a class="tag-list-link" href="/tags/performance/" rel="tag">performance</a></li><li class="tag-list-item"><a class="tag-list-link" href="/tags/react/" rel="tag">react</a></li><li class="tag-list-item"><a class="tag-list-link" href="/tags/routing/" rel="tag">routing</a></li><li class="tag-list-item"><a class="tag-list-link" href="/tags/rxjs/" rel="tag">rxjs</a></li><li class="tag-list-item"><a class="tag-list-link" href="/tags/security/" rel="tag">security</a></li><li class="tag-list-item"><a class="tag-list-link" href="/tags/vue/" rel="tag">vue</a></li><li class="tag-list-item"><a class="tag-list-link" href="/tags/xml/" rel="tag">xml</a></li></ul>
</div>
<section class="posts">
<article class="post">
<div class="post-content">
<a href="/angular-session-storage/" data-ph="post__link_angular-session-storage">
<figure>
<picture>
<source srcset="https://d33wubrfki0l68.cloudfront.net/282ffa101db47b9eafeec46a710e2193b0afdbfa/2e747/angular-session-storage/large_banner.webp" type="image/webp">
<img class="post-image" src="https://d33wubrfki0l68.cloudfront.net/a3a3e2fd4a45ff7cad43e2bbd659a3add0a34264/1363a/angular-session-storage/large_banner.png" loading="lazy" alt="Session Storage in Angular ⏳">
</picture>
</figure>
<header>
<h2 class="post-title">Session Storage in Angular ⏳</h2>
<div class="post-time">
<time datetime="2023-04-07T00:00:00.000Z">7 April 2023</time>
</div>
</header>
</a>
<footer>
<ul class="tag-list" itemprop="keywords"><li class="tag-list-item"><a class="tag-list-link" href="/tags/angular/" rel="tag">angular</a></li></ul>
</footer>
</div>
</article>
<article class="post">
<div class="post-content">
<a href="/angular-signals/" data-ph="post__link_angular-signals">
<figure>
<picture>
<source srcset="https://d33wubrfki0l68.cloudfront.net/e4081cd0fafca1f24269716a49ffc928bb2fa6da/08300/angular-signals/large_banner.webp" type="image/webp">
<img class="post-image" src="https://d33wubrfki0l68.cloudfront.net/c98f6cdfa19e414463302fc231ec4c78d519bd2c/290cc/angular-signals/large_banner.png" loading="lazy" alt="Angular Signals: Understanding a new Reactive Primitive">
</picture>
</figure>
<header>
<h2 class="post-title">Angular Signals: Understanding a new Reactive Primitive</h2>
<div class="post-time">
<span>Updated</span>
<time datetime="2023-03-25T00:00:00.000Z">25 March 2023</time>
</div>
</header>
</a>
<footer>
<ul class="tag-list" itemprop="keywords"><li class="tag-list-item"><a class="tag-list-link" href="/tags/angular/" rel="tag">angular</a></li><li class="tag-list-item"><a class="tag-list-link" href="/tags/performance/" rel="tag">performance</a></li></ul>
</footer>
</div>
</article>
<article class="post">
<div class="post-content">
<a href="/vue-design-patterns/" data-ph="post__link_vue-design-patterns">
<figure>
<picture>
<source srcset="https://d33wubrfki0l68.cloudfront.net/670babe03d15a34600b7ca0a3cce1250ead43dc9/5b292/vue-design-patterns/large_banner.webp" type="image/webp">
<img class="post-image" src="https://d33wubrfki0l68.cloudfront.net/66e81c7055bc7de425ca1a97b5a4b363f186cd1b/8a09b/vue-design-patterns/large_banner.png" loading="lazy" alt="Vue Design Patterns">
</picture>
</figure>
<header>
<h2 class="post-title">Vue Design Patterns</h2>
<div class="post-time">
<time datetime="2023-02-27T00:00:00.000Z">27 February 2023</time>
</div>
</header>
</a>
<footer>
<ul class="tag-list" itemprop="keywords"><li class="tag-list-item"><a class="tag-list-link" href="/tags/architecture/" rel="tag">architecture</a></li><li class="tag-list-item"><a class="tag-list-link" href="/tags/design-patterns/" rel="tag">design patterns</a></li><li class="tag-list-item"><a class="tag-list-link" href="/tags/vue/" rel="tag">vue</a></li></ul>
</footer>
</div>
</article>
<article class="post">
<div class="post-content">
<a href="/react-input-validation/" data-ph="post__link_react-input-validation">
<figure>
<picture>
<source srcset="https://d33wubrfki0l68.cloudfront.net/7ee8512e51a5cb11de2383a88e3dde80f538f779/0cdb2/react-input-validation/large_banner.webp" type="image/webp">
<img class="post-image" src="https://d33wubrfki0l68.cloudfront.net/f0438e32f02bab15220d82ec94c15fabb0b6710e/d8194/react-input-validation/large_banner.png" loading="lazy" alt="React Input Validation ✅ (easy to use)">
</picture>
</figure>
<header>
<h2 class="post-title">React Input Validation ✅ (easy to use)</h2>
<div class="post-time">
<time datetime="2023-02-13T00:00:00.000Z">13 February 2023</time>
</div>
</header>
</a>
<footer>
<ul class="tag-list" itemprop="keywords"><li class="tag-list-item"><a class="tag-list-link" href="/tags/react/" rel="tag">react</a></li><li class="tag-list-item"><a class="tag-list-link" href="/tags/security/" rel="tag">security</a></li></ul>
</footer>
</div>
</article>
<article class="post">
<div class="post-content">
<a href="/angular-input-validation/" data-ph="post__link_angular-input-validation">
<figure>
<picture>
<source srcset="https://d33wubrfki0l68.cloudfront.net/402ac77e3c3c0bf27c8c16ac20cf27c00f3cbb82/3f0af/angular-input-validation/large_banner.webp" type="image/webp">
<img class="post-image" src="https://d33wubrfki0l68.cloudfront.net/f3d085082efb228021f2ba61305313e21f2583a5/48c56/angular-input-validation/large_banner.png" loading="lazy" alt="Input Validation in Angular">
</picture>
</figure>
<header>
<h2 class="post-title">Input Validation in Angular</h2>
<div class="post-time">
<time datetime="2023-01-18T00:00:00.000Z">18 January 2023</time>
</div>
</header>
</a>
<footer>
<ul class="tag-list" itemprop="keywords"><li class="tag-list-item"><a class="tag-list-link" href="/tags/angular/" rel="tag">angular</a></li><li class="tag-list-item"><a class="tag-list-link" href="/tags/security/" rel="tag">security</a></li></ul>
</footer>
</div>
</article>
<article class="post">
<div class="post-content">
<a href="/react-firebase/" data-ph="post__link_react-firebase">
<figure>
<picture>
<source srcset="https://d33wubrfki0l68.cloudfront.net/aa21a195fef804af329f3386714c7c312c708c31/968f0/react-firebase/large_banner.webp" type="image/webp">
<img class="post-image" src="https://d33wubrfki0l68.cloudfront.net/93207bb419664e39a88359f2388721059baade23/ebe19/react-firebase/large_banner.png" loading="lazy" alt="Build a To-Do Application with React and Firebase">
</picture>
</figure>
<header>
<h2 class="post-title">Build a To-Do Application with React and Firebase</h2>
<div class="post-time">
<time datetime="2023-01-12T00:00:00.000Z">12 January 2023</time>
</div>
</header>
</a>
<footer>
<ul class="tag-list" itemprop="keywords"><li class="tag-list-item"><a class="tag-list-link" href="/tags/react/" rel="tag">react</a></li></ul>
</footer>
</div>
</article>
<article class="post">
<div class="post-content">
<a href="/react-localstorage/" data-ph="post__link_react-localstorage">
<figure>
<picture>
<source srcset="https://d33wubrfki0l68.cloudfront.net/76179502e8ed9b2243000a397a40742300119b06/7f89a/react-localstorage/large_banner.webp" type="image/webp">
<img class="post-image" src="https://d33wubrfki0l68.cloudfront.net/f2284b040a1f3bb89bcb926594a767fdf237c30e/214d6/react-localstorage/large_banner.png" loading="lazy" alt="Using localStorage with React Hooks">
</picture>
</figure>
<header>
<h2 class="post-title">Using localStorage with React Hooks</h2>
<div class="post-time">
<time datetime="2022-12-22T00:00:00.000Z">22 December 2022</time>
</div>
</header>
</a>
<footer>
<ul class="tag-list" itemprop="keywords"><li class="tag-list-item"><a class="tag-list-link" href="/tags/react/" rel="tag">react</a></li></ul>
</footer>
</div>
</article>
<article class="post">
<div class="post-content">
<a href="/secure-coding-training/" data-ph="post__link_secure-coding-training">
<figure>
<picture>
<source srcset="https://d33wubrfki0l68.cloudfront.net/a29cbde8aa8dc5dec7b51cf94d04012670a3bf94/bc286/secure-coding-training/large_banner.webp" type="image/webp">
<img class="post-image" src="https://d33wubrfki0l68.cloudfront.net/6c0663d8d26d57d3602b16ff70f10fab1cf8a5c6/6ab49/secure-coding-training/large_banner.png" loading="lazy" alt="Secure coding training 🛡️ 7 steps to secure Web apps">
</picture>
</figure>
<header>
<h2 class="post-title">Secure coding training 🛡️ 7 steps to secure Web apps</h2>
<div class="post-time">
<time datetime="2022-12-16T00:00:00.000Z">16 December 2022</time>
</div>
</header>
</a>
<footer>
<ul class="tag-list" itemprop="keywords"><li class="tag-list-item"><a class="tag-list-link" href="/tags/architecture/" rel="tag">architecture</a></li><li class="tag-list-item"><a class="tag-list-link" href="/tags/security/" rel="tag">security</a></li></ul>
</footer>
</div>
</article>
<article class="post">
<div class="post-content">
<a href="/running-angular-cli-over-https/" data-ph="post__link_running-angular-cli-over-https">
<figure>
<picture>
<source srcset="https://d33wubrfki0l68.cloudfront.net/73d2906c2c9595652eece47f240de165d4a362ff/85920/running-angular-cli-over-https/large_banner.webp" type="image/webp">
<img class="post-image" src="https://d33wubrfki0l68.cloudfront.net/16c14f1df1c7495b8103bd8875ec1a66cf8febfc/4aad3/running-angular-cli-over-https/large_banner.png" loading="lazy" alt="Running Angular CLI over HTTPS">
</picture>
</figure>
<header>
<h2 class="post-title">Running Angular CLI over HTTPS</h2>
<div class="post-time">
<time datetime="2022-12-11T00:00:00.000Z">11 December 2022</time>
</div>
</header>
</a>
<footer>
<ul class="tag-list" itemprop="keywords"><li class="tag-list-item"><a class="tag-list-link" href="/tags/angular/" rel="tag">angular</a></li><li class="tag-list-item"><a class="tag-list-link" href="/tags/security/" rel="tag">security</a></li></ul>
</footer>
</div>
</article>
</section>
<nav class="pagination">
<span class="page-number current">1</span><a class="page-number" href="/blog/page/2/">2</a><a class="page-number" href="/blog/page/3/">3</a><a class="page-number" href="/blog/page/4/">4</a><a class="extend next" rel="next" href="/blog/page/2/"><span class='next-icon'></span></a>
</nav>
<div class="post-idea-wrapper">
<div class="post-idea">
<img src="https://d33wubrfki0l68.cloudfront.net/433b5fecb7aed4c3b07793d3581484fdc21aa321/72649/img/ninja-post-idea.svg" loading="lazy" alt="">
<h5 class="post-idea-header">Have an idea for a post?</h5>
<a href="/contributors" class="button button-primary" data-ph="post-idea__link">Click and join us</a>
</div>
</div>
</div>
</div>
</main>
<footer class="footer">
<div class="footer-navigation">
<div class="container">
<div class="footer-navigation-columns">
<div class="footer-navigation-column">
<h4 class="border">Contact</h4>
<ul class="footer-navigation-contact">
<li>
<a href="https://bartosz.io" rel="noopener nofollow noreferrer" target="_blank" data-ph="footer-nav__link_contact_bartoszio">
<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M1 5.3335C1 4.22893 1.89543 3.3335 3 3.3335H19C20.1046 3.3335 21 4.22893 21 5.3335V15.5002C21 16.6047 20.1046 17.5002 19 17.5002H3C1.89543 17.5002 1 16.6047 1 15.5002V5.3335Z" stroke="#6E7191" stroke-width="2" stroke-linejoin="round" />
<path d="M2.42131 4.63636C1.91709 4.17416 2.24409 3.3335 2.9281 3.3335H19.0719C19.7559 3.3335 20.0829 4.17416 19.5787 4.63636L13.0272 10.6419C11.8802 11.6933 10.1198 11.6933 8.97283 10.6419L2.42131 4.63636Z" stroke="#6E7191" stroke-width="2" stroke-linejoin="round" />
</svg>
bartosz.io
</a>
</li>
<li>
<a href="https://twitter.com/bartosz_io" rel="noopener nofollow noreferrer" target="_blank" data-ph="footer-nav__link_contact_twitter">
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.55016 21.7502C16.6045 21.7502 21.5583 14.2469 21.5583 7.74211C21.5583 7.53117 21.5536 7.31554 21.5442 7.1046C22.5079 6.40771 23.3395 5.5445 24 4.55554C23.1025 4.95484 22.1496 5.21563 21.1739 5.32898C22.2013 4.71315 22.9705 3.74572 23.3391 2.60601C22.3726 3.1788 21.3156 3.58286 20.2134 3.80085C19.4708 3.01181 18.489 2.48936 17.4197 2.3143C16.3504 2.13923 15.2532 2.32129 14.2977 2.83234C13.3423 3.34339 12.5818 4.15495 12.1338 5.14156C11.6859 6.12816 11.5754 7.23486 11.8195 8.29054C9.86249 8.19233 7.94794 7.68395 6.19998 6.79834C4.45203 5.91274 2.90969 4.66968 1.67297 3.14976C1.0444 4.23349 0.852057 5.51589 1.13503 6.73634C1.418 7.95678 2.15506 9.02369 3.19641 9.72023C2.41463 9.69541 1.64998 9.48492 0.965625 9.10617V9.1671C0.964925 10.3044 1.3581 11.4068 2.07831 12.287C2.79852 13.1672 3.80132 13.7708 4.91625 13.9952C4.19206 14.1934 3.43198 14.2222 2.69484 14.0796C3.00945 15.0577 3.62157 15.9131 4.44577 16.5266C5.26997 17.14 6.26512 17.4808 7.29234 17.5015C5.54842 18.8714 3.39417 19.6144 1.17656 19.6109C0.783287 19.6103 0.390399 19.5861 0 19.5387C2.25286 20.984 4.87353 21.7516 7.55016 21.7502Z" fill="#6E7191" />
</svg>
bartosz_io
</a>
</li>
<li>
<a href="https://www.linkedin.com/in/bpietrucha/" rel="noopener nofollow noreferrer" target="_blank" data-ph="footer-nav__link_contact_linkedin">
<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM11.5216 19.8778H16.9605V36.2196H11.5216V19.8778ZM17.3188 14.8227C17.2835 13.2204 16.1377 12 14.277 12C12.4164 12 11.2 13.2204 11.2 14.8227C11.2 16.3918 12.3805 17.6473 14.2064 17.6473H14.2412C16.1377 17.6473 17.3188 16.3918 17.3188 14.8227ZM30.3131 19.4941C33.8922 19.4941 36.5754 21.8303 36.5754 26.8497L36.5752 36.2196H31.1365V27.4767C31.1365 25.2807 30.3494 23.7822 28.3805 23.7822C26.8779 23.7822 25.9829 24.7924 25.5898 25.7682C25.446 26.1178 25.4107 26.605 25.4107 27.0934V36.22H19.9711C19.9711 36.22 20.0428 21.4117 19.9711 19.8783H25.4107V22.1929C26.1325 21.0802 27.4254 19.4941 30.3131 19.4941Z" fill="#6E7191" />
</svg>
B. Pietrucha
</a>
</li>
</ul>
</div>
<div class="footer-navigation-column">
<h4 class="border">Academy ⭐</h4>
<ul>
<li><a href="/secure-coding-training" data-ph="footer-nav__link_academies_sct">Secure Coding Training 👨‍🏫</a></li>
<li><a target="_blank" rel="noopener" href="https://websecurity-academy.com/" data-ph="footer-nav__link_academies_wsa">Web Security Academy 🛡</a></li>
<li><a target="_blank" rel="noopener external nofollow noreferrer" href="https://fullstack-testing.com/" data-ph="footer-nav__link_academies_fta">Fullstack Testing Academy 🧪</a></li>
</ul>
</div>
<div class="footer-navigation-column">
<h4 class="border">Courses</h4>
<ul>
<li><a target="_blank" rel="noopener" href="https://courses.dev-academy.com/p/web-security-fundamentals" data-ph="footer-nav__link_courses_wsf">Web Security Fundamentals course</a></li>
<li><a target="_blank" rel="noopener" href="https://courses.dev-academy.com/p/web-e2e-testing" data-ph="footer-nav__link_courses_e2e">FREE Web e2e testing course</a></li>
</ul>
</div>
<div class="footer-navigation-column">
<h4 class="border">Blog</h4>
<ul>
<li><a href="/tags/security/" data-ph="footer-nav__link_blog_security">Security</a></li>
<li><a href="/tags/architecture/" data-ph="footer-nav__link_blog_architecture">Architecture</a></li>
<li><a href="/tags/angular/" data-ph="footer-nav__link_blog_angular">Angular</a></li>
</ul>
</div>
</div>
</div>
</div>
<div class="footer-privacy">
<div class="container">
<div class="footer-copyright"><span class="icofont-copyright"></span>2023 Dev-Academy.com</div>
<ul class="footer-privacy-navigation">
<li><a target="_blank" rel="noopener" href="https://courses.dev-academy.com/p/terms" data-ph="footer-nav__link_privacy_terms">Terms and Conditions</a></li>
<li><a target="_blank" rel="noopener" href="https://courses.dev-academy.com/p/privacy" data-ph="footer-nav__link_privacy_policy">Privacy policy</a></li>
<li><a onclick="window.CookieConsent.show()" data-ph="footer-nav__link_privacy_cookies">Cookie settings</a></li>
</ul>
</div>
</div>
</footer>
<form action="https://app.convertkit.com/forms/1921330/subscriptions" class="seva-form formkit-form" method="post" data-sv-form="1921330" data-uid="e4bf864ac2" data-format="modal" data-version="5" data-options="{&quot;settings&quot;:{&quot;after_subscribe&quot;:{&quot;action&quot;:&quot;redirect&quot;,&quot;success_message&quot;:&quot;Success! Now CHECK your email to CONFIRM your subscription.&quot;,&quot;redirect_url&quot;:&quot;https://dev-academy.com/thank-you/&quot;},&quot;analytics&quot;:{&quot;google&quot;:null,&quot;facebook&quot;:null,&quot;segment&quot;:null,&quot;pinterest&quot;:null,&quot;sparkloop&quot;:null,&quot;googletagmanager&quot;:null},&quot;modal&quot;:{&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:&quot;70&quot;,&quot;timer&quot;:&quot;3600&quot;,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:&quot;1&quot;},&quot;powered_by&quot;:{&quot;show&quot;:false,&quot;url&quot;:&quot;https://convertkit.com?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic&quot;},&quot;recaptcha&quot;:{&quot;enabled&quot;:false},&quot;return_visitor&quot;:{&quot;action&quot;:&quot;show&quot;,&quot;custom_content&quot;:&quot;&quot;},&quot;slide_in&quot;:{&quot;display_in&quot;:&quot;bottom_right&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;sticky_bar&quot;:{&quot;display_in&quot;:&quot;top&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15}},&quot;version&quot;:&quot;5&quot;}">
<div data-style="card">
<div data-element="column" class="formkit-column formkit-column-header">
<div class="formkit-background"></div>
<div class="formkit-header" data-element="header">
<h2>Subscribe to Dev <strong>Academy</strong></h2>
</div>
</div>
<div data-element="column" class="formkit-column formkit-column-body">
<div class="formkit-subheader" data-element="subheader">
<p>Join <strong>over 6000 subscribers </strong>that receive latest knowledge and tips!</p>
</div>
<ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
<div data-element="fields" class="seva-fields formkit-fields">
<div class="formkit-field">
<input class="formkit-input" aria-label="First Name" name="fields[first_name]" required="" placeholder="First Name" type="text">
</div>
<div class="formkit-field">
<input class="formkit-input" name="email_address" aria-label="Your email address" placeholder="Your email address" required="" type="email">
</div>
<button data-element="submit" class="formkit-submit formkit-submit button button-primary button-large button-block">
<span>Subscribe</span>
</button>
</div>
<div class="formkit-guarantee" data-element="guarantee"><p>By submitting this form you agree to receive emails with news, promotions and products and you accept Privacy Policy.</p></div>
</div>
</div>
</form>

<script src="https://my.hellobar.com/e6f37be779b7dad9006dc743a8219cd9b5547f98.js" data-cookieconsent="ignore" charset="utf-8" async="async"></script>
<script data-cookieconsent='ignore' defer src='https://d33wubrfki0l68.cloudfront.net/js/711edf361a39546a1c5915f073e9c5b4cf1efb00/js/main.js'></script>
<script defer src='https://d33wubrfki0l68.cloudfront.net/js/ff6fd4b9d601d2f61587ecf82d236a8fd4b0e6d2/js/gtm.js'></script>
<script data-cookieconsent='ignore' defer src='https://d33wubrfki0l68.cloudfront.net/bundles/7ebfb2ba3f703697fa333f5edbe90b7312918689.js'></script>
<script defer src="https://static.cloudflareinsights.com/beacon.min.js/v52afc6f149f6479b8c77fa569edb01181681764108816" integrity="sha512-jGCTpDpBAYDGNYR5ztKt4BQPGef1P0giN6ZGVUi835kFF88FOmmn8jBQWNgrNd8g/Yu421NdgWhwQoaOPFflDw==" data-cf-beacon='{"rayId":"7c23ceb43fb69522","version":"2023.4.0","r":1,"b":1,"token":"c6b9dd2073eb4555affb0b89af621109","si":100}' crossorigin="anonymous"></script>
</body>
</html>
`
  ]
  BODYs.forEach((body) => {
    test('body length: ' + body.length, async () => {
      const rss = await getRssUrlsFromHtmlBody(body)
      expect(rss.length).toBeGreaterThan(0)
    })
  })
})
