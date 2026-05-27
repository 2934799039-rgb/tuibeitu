"use client";

import { motion } from "framer-motion";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
};

export function Card({
  children,
  className = "",
  hover = true,
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.3 } } : undefined}
      className={`mystic-card rounded-sm p-6 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
