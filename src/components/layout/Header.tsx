import React from "react";
import WrapContainer from "./WrapContainer";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="sticky top-0 z-10 bg-[white] shadow">
      <WrapContainer>
        <div className="flex items-center justify-between py-2">
          <Link className=" text-3xl font-extrabold" href="/">
            Chietta
          </Link>
          <div className="flex">
            <button>投稿する</button>
            <img src="/img/cat.png" alt="アイコン画像" width={34} />
          </div>
        </div>
      </WrapContainer>
    </nav>
  );
};

export default React.memo(Header);
