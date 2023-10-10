export const getOGP = async (url: string) => {
  /**
   * src/pages/api/proxy.ts につくったプロキシサーバーにリクエストを送る
   * ex) https://example.com/api/proxy?url=https://zenn.dev
   */
  const result = await fetch(`/api/proxy?url=${url}`);
  const html = await result.text();
  // DOM に変換する
  const dom = new DOMParser().parseFromString(html, "text/html");

  // head タグの子要素を配列に変換して og:title と og:image を取得する
  const data = Array.from(dom.head.children).reduce<{
    title: string;
    image: string;
    url: string;
  }>(
    (result, element) => {
      const property = element.getAttribute("property");
      if (property === "og:title") {
        // title を取得
        result.title = element.getAttribute("content") ?? "";
      }
      if (property === "og:image") {
        // image を取得
        result.image = element.getAttribute("content") ?? "";
      }
      if (property === "og:url") {
        // url を取得
        result.url = element.getAttribute("content") ?? "";
      }

      return result;
    },
    { title: "", image: "", url: "" },
  );

  return data;
};
