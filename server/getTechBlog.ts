import { load } from 'cheerio'

type Company = 'cyber' | 'mercari' | 'lineYahoo' | 'cybozu' | 'freee' | 'dena'

export const getTechBlog = async (company: Company) => {
  switch (company) {
    case 'cyber':
      return await getCyber()
    case 'mercari':
      return await getMercari()
    case 'lineYahoo':
      return await getLineYahoo()
    case 'cybozu':
      return await getCybozu()
    case 'freee':
      return await getFreee()
    case 'dena':
      return await getDena()
  }
}

const getCyber = async () => {
  const URL = 'https://developers.cyberagent.co.jp/blog/archives/category/engineer/'
  const res = await fetch(URL, {
    cache: 'no-cache'
  })
  const feedResponse = await res.text()
  const $ = load(feedResponse)
  const articles = [] as { url: string; createdAt: Date; title: string }[]
  $('.articleList__card').each((index, element) => {
    const url = $(element).find('a.card-caeng__thumblink').attr('href')
    const datetime = $(element).find('time.card__time').attr('datetime')
    const title = $(element).find('p.card__title').text()
    if (url === undefined) return
    if (datetime === undefined) return
    if (title === undefined) return
    const createdAt = new Date(datetime)
    articles.push({ url, createdAt, title })
  })
  return articles
}

const getMercari = async () => {
  const URL = 'https://engineering.mercari.com/blog/'
  const res = await fetch(URL, {
    cache: 'no-cache'
  })
  const feedResponse = await res.text()
  const $ = load(feedResponse)
  const articles = [] as { url: string; createdAt: Date; title: string }[]
  $('._post-list__item_18ime_18').each((index, element) => {
    const url = 'https://engineering.mercari.com' + $(element).find('a').attr('href')
    const datetime = $(element).find('time').attr('datetime')
    const title = $(element).find('h3').text()
    if (url === undefined) return
    if (datetime === undefined) return
    if (title === undefined) return
    const createdAt = new Date(datetime)
    articles.push({ url, createdAt, title })
  })
  return articles
}

const getLineYahoo = async () => {
  const URL = 'https://techblog.lycorp.co.jp/ja/blog'
  const res = await fetch(URL, {
    cache: 'no-cache'
  })
  const feedResponse = await res.text()
  const $ = load(feedResponse)
  const articles = [] as { url: string; createdAt: Date; title: string }[]
  $('.list_post')
    .find('li')
    .each((index, element) => {
      const url = 'https://techblog.lycorp.co.jp' + $(element).find('a').attr('href')
      const datetime = $(element).find('.update').text()
      const title = $(element).find('h2').text()
      if (url === undefined) return
      if (datetime === undefined) return
      if (title === undefined) return
      const createdAt = new Date(datetime)
      articles.push({ url, createdAt, title })
    })
  return articles
}

const getCybozu = async () => {
  const URL = 'https://blog.cybozu.io/'
  const res = await fetch(URL, {
    cache: 'no-cache'
  })
  const feedResponse = await res.text()
  const $ = load(feedResponse)
  const articles = [] as { url: string; createdAt: Date; title: string }[]
  $('.archive-entry').each((index, element) => {
    const url = $(element).find('.entry-title-link').attr('href')
    const datetime = $(element).find('time').attr('datetime')
    const title = $(element).find('.entry-title-link').text()
    if (url === undefined) return
    if (datetime === undefined) return
    if (title === undefined) return
    const createdAt = new Date(datetime)
    articles.push({ url, createdAt, title })
  })
  return articles
}

const getFreee = async () => {
  const URL = 'https://developers.freee.co.jp/archive'
  const res = await fetch(URL, {
    cache: 'no-cache'
  })
  const feedResponse = await res.text()
  const $ = load(feedResponse)
  const articles = [] as { url: string; createdAt: Date; title: string }[]
  $('.archive-entry').each((index, element) => {
    const url = $(element).find('.entry-title-link').attr('href')
    const datetime = $(element).find('time').attr('datetime')
    const title = $(element).find('.entry-title-link').text()
    if (url === undefined) return
    if (datetime === undefined) return
    if (title === undefined) return
    const createdAt = new Date(datetime)
    articles.push({ url, createdAt, title })
  })
  return articles
}
const getDena = async () => {
  const URL = 'https://engineering.dena.com/blog/categories/technology/'
  const res = await fetch(URL, {
    cache: 'no-cache'
  })
  const feedResponse = await res.text()
  const $ = load(feedResponse)
  const articles = [] as { url: string; createdAt: Date; title: string }[]
  $('li.flex-col').each((index, element) => {
    const url = 'https://engineering.dena.com' + $(element).find('section').find('a.text-xl').attr('href')
    const datetime = $(element).find('section').find('span.text-sm').text()
    const title = $(element).find('section').find('a.text-xl').text().replaceAll('\n', '').replaceAll(' ', '')
    if (url === undefined) return
    if (datetime === undefined) return
    if (title === undefined) return
    const createdAt = new Date(datetime)
    articles.push({ url, createdAt, title })
  })
  return articles
}
