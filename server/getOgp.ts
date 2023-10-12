import ogs from 'open-graph-scraper'

export const getOgp = async (url: string) => {
  try {
    const { result } = await ogs({ url, timeout: 20 })
    return result
  } catch (error) {
    return null
  }
}
