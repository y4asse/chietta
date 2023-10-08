import Link from "next/link";
import React from "react";

const Footer = () => {
  const lists = [
    { link: "about", text: "Chiettaとは" },
    { link: "trivia/0757d92a-c15e-44f1-afe5-5509154e72b2", text: "雑学" },
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
