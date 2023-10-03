import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { auth } from "../../firebase/config";
import { VscAccount } from "react-icons/vsc";

const AccountAside = ({
  loggedUser,
  profileMenu,
  setProfileMenu,
  userSignOut,
}) => {
  const closeProfile = () => {
    setProfileMenu(false);
    document.body.style.overflow = "unset";
  };
  return (
    <div className="hamburger-nav">
      <AnimatePresence>
        {profileMenu && (
          <motion.aside
            key={profileMenu}
            style={{ right: 0 }}
            initial={{ right: -200, opacity: 0 }}
            animate={{ right: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              opacity: { ease: "linear" },
            }}
          >
            <button
              className="close-button clean-button"
              onClick={() => closeProfile()}
            >
              <AiOutlineCloseCircle />
            </button>
            <div className="aside-content align-items-center">
              {auth?.currentUser?.photoURL ? (
                <img
                  className="w-50 h-50 border rounded-circle"
                  style={{ aspectRatio: "1/1" }}
                  src={auth?.currentUser?.photoURL}
                  alt="logo"
                />
              ) : (
                <VscAccount
                  className="main-color"
                  style={{ width: "100%", height: "100%" }}
                />
              )}
              <ul className="aside-ul pt-2 align-items-center">
                {auth?.currentUser ? (
                  <>
                    <li>
                      <NavLink
                        className="main-color"
                        to={`/user/${loggedUser?.username}`}
                        onClick={() => closeProfile()}
                      >
                        {loggedUser?.username}
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={() => userSignOut()}
                        className="clean-button"
                      >
                        Çıxış
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink
                        to="/sign-up"
                        className="main-color"
                        onClick={() => closeProfile()}
                      >
                        Qeydiyyat
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/sign-in"
                        className="main-color"
                        onClick={() => closeProfile()}
                      >
                        Giriş
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountAside;
