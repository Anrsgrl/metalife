import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const CodeTitles = ({ filteredData, url }) => {
  const [hamburger, setHamburger] = useState();
  const openHamburger = () => {
    setHamburger(true);
    document.body.style.overflow = "hidden";
  };

  const closeHamburger = () => {
    setHamburger(false);
    document.body.style.overflow = "unset";
  };
  const sortedData = filteredData?.sort((a, b) => a.time - b.time);
  return (
    <div className="code-title-field container py-3 col-3 col-lg-2">
      {url && (
        <h3 className="pb-2 d-none d-lg-block">{url?.toUpperCase()} Kodları</h3>
      )}
      <ul className="code-title custom-scroll p-0 m-0">
        {filteredData?.map((code) => (
          <li key={code.id}>
            <NavLink
              to={`/code/${url}/${code?.title
                ?.toLowerCase()
                .split(" ")
                .join("-")}`}
              className="p-2"
            >
              {code.title}
            </NavLink>
          </li>
        ))}
      </ul>
      {url && (
        <div className="d-flex align-items-center">
          <button
            type="button"
            className="clean-button hamburger-menu"
            onClick={() => openHamburger()}
          >
            <RxHamburgerMenu />
          </button>
          <span className="pt-1 hamburger-menu" style={{ color: "#4A4AB5" }}>
            Mövzular
          </span>
        </div>
      )}
      <AnimatePresence>
        {hamburger && (
          <>
            <div className="aside-background"></div>
            <motion.aside
              key={hamburger}
              style={{ left: 0 }}
              initial={{ left: -200, opacity: 0 }}
              animate={{ left: 0, opacity: 1 }}
              exit={{ left: -200, opacity: 0 }}
              transition={{
                duration: 0.3,
                opacity: { ease: "linear" },
              }}
            >
              <button
                className="close-button clean-button"
                onClick={() => closeHamburger()}
              >
                <AiOutlineCloseCircle />
              </button>
              <div className="aside-content">
                {url && <h3 className="pb-2">{url?.toUpperCase()} Kodları</h3>}
                <ul className="code-title-hamburger custom-scroll p-0 m-0">
                  {sortedData?.map((code) => (
                    <li onClick={() => closeHamburger()} key={code.id}>
                      <NavLink
                        to={`/code/${url}/${code?.title
                          ?.toLowerCase()
                          .split(" ")
                          .join("-")}`}
                        className="p-2"
                      >
                        {code.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CodeTitles;
