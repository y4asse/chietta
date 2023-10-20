import Script from 'next/script'

const Gtag = () => {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-11RE6T6WGF" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-11RE6T6WGF');
        `}
      </Script>
    </>
  )
}

export default Gtag
