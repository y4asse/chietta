import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { directionAtom } from "~/jotai/atoms";

const SlideAnimation = ({ children }: { children: ReactNode }) => {
  const [direction] = useAtom(directionAtom);
  const router = useRouter();
  return (
    <motion.div
      key={router.asPath}
      initial={{
        opacity: 0,
        translateX:
          direction === "forward"
            ? "50%"
            : direction === "backward"
            ? "-50%"
            : 0,
      }} // 初期状態
      animate={{ translateX: 0, opacity: 1 }} // マウント時
      transition={{ stiffness: 1000 }}
    >
      {children}
    </motion.div>
  );
};

export default SlideAnimation;
