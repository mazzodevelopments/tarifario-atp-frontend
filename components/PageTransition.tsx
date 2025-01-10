"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 30,
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
