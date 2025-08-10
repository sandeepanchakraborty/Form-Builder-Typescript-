import React from "react";
import { motion } from "framer-motion";

interface AnimatedPageProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children, style }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{
        minHeight: "calc(100vh - 64px)",
        width: "100vw",
        background: "#111",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "48px 8px 0 8px",
        fontFamily: "Inter, Roboto, Arial",
        overflowX: "hidden",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
