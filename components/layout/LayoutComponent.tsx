import Footer from './Footer'
import Header from './Header'

export default function LayoutComponent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  )
}
