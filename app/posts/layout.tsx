const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" min-w-[300px] bg-main items-center py-10">
      <h1 className="text-center text-3xl font-bold my-5">タイムライン</h1>
      {children}
    </main>
  )
}

export default Layout
