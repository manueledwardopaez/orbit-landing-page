import { motion } from "motion/react";
import type { ReactNode } from "react";

export default function ScrollBlur({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ filter: 'blur(14px)', opacity: 0, y: 16 }}
      whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
