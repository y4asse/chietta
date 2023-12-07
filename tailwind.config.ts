import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors: {
      primary: '#FF8383',
      gray: '#65717b',
      pink: '#fff2f2',
      main: '#fffafa',
      focus: '#fdcaca',
      lightGray: '#d6d6d6'
    },
    extend: {
      backgroundImage: {
        cat: "url('/img/cat.png')",
        'cat-book': "url('/img/catBook.png')"
      }
    }
  },
  plugins: []
}
export default config
