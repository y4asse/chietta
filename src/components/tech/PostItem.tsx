import React, { useEffect, useState } from "react";
import { OGP, PostOgp } from "~/pages";
import { format } from "date-fns";
import { Post } from "@prisma/client";
import { getOGP } from "~/utils/getOGP";

const PostItem = ({ post }: { post: Post }) => {
  const [ogp, setOgp] = useState<OGP | null>(null);
  useEffect(() => {
    getOGP(post.url).then((ogp: OGP) => {
      setOgp(ogp);
    });
  }, [post]);
  if (!ogp) return;
  if (!ogp.image) return;
  return (
    <div className="w-screen overflow-hidden  px-5 py-5 text-left">
      <div className="overflow-hidden rounded-xl border-2 border-[#e6e6e6] bg-[white]">
        <a href={post.url} target="_blank">
          <img src={ogp.image} className=" border-b-2 border-[#e6e6e6]" />
          <div className="px-[16px] py-[10px]">
            <h1 className="font-bold">{ogp.title}</h1>
            <div className="text-right">
              <time>{format(post.createdAt, "yyyy/MM/dd HH:mm")}</time>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default PostItem;
