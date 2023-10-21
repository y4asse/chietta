const list = [
  { url: 'https://developers.cyberagent.co.jp', name: 'Cyber Agent' },
  { url: 'https://engineering.mercari.com', name: 'mercari' },
  { url: 'https://techblog.lycorp.co.jp', name: 'LINEヤフー' },
  { url: 'https://blog.cybozu.io', name: 'Cybozu' },
  { url: 'https://developers.freee.co.jp', name: 'freee' },
  { url: 'https://engineering.dena.com', name: 'DeNA' }
]

export const displayCompanyName = (url: string) => {
  const company = list.find((company) => url.startsWith(company.url))
  if (company) {
    return company.name
  } else {
    return null
  }
}
