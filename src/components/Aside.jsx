import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

export const Aside = ({ isOpen, closeAside, children, pos }) => {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        backgroundRef.current &&
        backgroundRef.current.contains(event.target)
      ) {
        closeAside();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [closeAside]);

  const variants = {
    hidden: {
      opacity: 0,
      [pos === "left" ? "left" : "right"]: -700,
    },
    visible: {
      opacity: 1,
      [pos === "left" ? "left" : "right"]: 0,
    },
  };

  return (
    <div className="hamburger-nav">
      <AnimatePresence>
        {isOpen && (
          <>
            <div ref={backgroundRef} className="aside-background"></div>
            <motion.aside
              key={isOpen}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={variants}
              transition={{
                duration: 0.4,
                opacity: { ease: "linear" },
              }}
            >
              <button
                className="close-button clean-button"
                onClick={closeAside}
              >
                <AiOutlineCloseCircle />
              </button>
              <div className="aside-content align-items-center">{children}</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
