import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import { directionAtom, storyAtom } from "~/jotai/atoms";
import { api } from "~/utils/api";

const PageScroller = ({ children }: { children: ReactNode }) => {
  //サーバ側のデータ(マウント時に取得するからサーバー側ではundefined)
  //queryは初回のみ実行されるので、pathが変わった時は、useEffectで監視して、refetchする
  const router = useRouter();
  const id = router.query.id as string;
  api.trivia.setHistory.useQuery(id); //パスが変わっても毎回実行される(idが変わるから)
  const { data: nextIds, refetch } = api.trivia.getManyIds.useQuery(); //引数がないので、初回のみ実行されるから、useEffectで監視して、refetchする

  //クライアント側のデータ
  const [story, setStory] = useAtom(storyAtom);
  const divRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useAtom(directionAtom);
  const currentIndex =
    story.length > 0 ? story.findIndex((hid) => hid === id) : 0;
  const prevIndex = currentIndex === 0 ? null : currentIndex - 1;
  const nextIndex = currentIndex === story.length - 1 ? null : currentIndex + 1;

  //画面をタップした時の処理
  const clickHandler = useCallback(
    (e: MouseEvent) => {
      if (!divRef.current) return;

      if (
        e.clientY >= divRef.current.getBoundingClientRect().top &&
        e.clientY <= divRef.current.getBoundingClientRect().bottom
      ) {
        const touchLeft = e.clientX < window.innerWidth / 4;
        const touchRight = e.clientX > (window.innerWidth * 3) / 4;
        if (touchLeft) {
          if (prevIndex === null) return;
          setDirection("backward");
          void router.push(`/trivia/${story[prevIndex]}`, undefined, {
            scroll: false,
          });
        } else if (touchRight) {
          if (nextIndex === null) return;
          setDirection("forward");
          void router.push(`/trivia/${story[nextIndex]}`, undefined, {
            scroll: false,
          });
        }
      }
    },
    [story, id],
  );

  useEffect(() => {
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, [clickHandler]);

  //ページが表示された時の処理
  useEffect(() => {
    const isStoryEmpty = story.length === 0;
    if (isStoryEmpty) {
      setStory([id]);
    }
    const isTop = story.at(-1) === id;
    if (isTop) {
      void refetch();
    }
  }, [router.asPath]);

  useEffect(() => {
    if (nextIndex !== null && story?.length > 1)
      void router.prefetch(`/trivia/${story[nextIndex]}`);
  }, [story, nextIndex]);

  //nextIdを監視
  useEffect(() => {
    if (!nextIds) return;
    setStory((prev) => [...prev, ...nextIds]);
    // void router.prefetch(`/trivia/`);
  }, [nextIds]);

  return (
    <div className="overflow-hidden" ref={divRef}>
      {children}
    </div>
  );
};

export default PageScroller;
