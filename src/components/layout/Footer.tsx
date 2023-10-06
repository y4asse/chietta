import Link from "next/link";
import React from "react";

const Footer = () => {
  const lists = [
    { link: "about", text: "Chiettaとは" },
    { link: "trivia/4fbf9651-ccdb-433e-9118-e48770ca29b6", text: "雑学" },
  ];
  return (
    <div className=" bg-pink p-10">
      <span className="text-xl">Chietta</span>
      <ul className="mt-3 text-gray">
        {lists.map((list, index) => (
          <li key={index}>
            <Link href={`/${list.link}`}>{list.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
