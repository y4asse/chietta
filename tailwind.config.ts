import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#FF8383",
      gray: "#65717b",
      pink: "#fff2f2",
    },
    extend: {
      backgroundImage: {
        cat: "url('/img/cat.png')",
        "cat-book": "url('/img/catBook.png')",
      },
    },
  },
  plugins: [],
} satisfies Config;
