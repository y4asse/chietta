import Footer from './Footer'
import Header from './Header'

export default function LayoutComponent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
