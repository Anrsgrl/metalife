import React, { useState } from "react";
import "./Header.scss";
import logo from "../../assets/images/logo3.png";
import { BiMenuAltLeft } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "../Nav/Nav";
import AccountAside from "../AccountAside/AccountAside";
import { auth } from "../../firebase/config";
import { signOut } from "@firebase/auth";
import { useUsersList } from "../../firebase/getFunctions";

const Header = () => {
  const { currentUser, loggedUser } = useUsersList();
  const navigate = useNavigate();
  const [hamburger, setHamburger] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dropdownLessons, setDropdownLesson] = useState(false);
  const [dropdownCode, setDropdownCode] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const openHamburger = () => {
    setHamburger(true);
    document.body.style.overflow = "hidden";
  };

  const closeHamburger = () => {
    setHamburger(false);
    setDropdown(false);
    setDropdownLesson(false);
    document.body.style.overflow = "unset";
  };

  const openProfile = () => {
    setProfileMenu(true);
    document.body.style.overflow = "hidden";
  };

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const openDropdown = (a, b, c) => {
    setDropdown(a);
    setDropdownLesson(b);
    setDropdownCode(c);
  };

  return (
    <header className="px-2">
      <div className="container px-0 py-2">
        <div className="header-content">
          <button
            type="button"
            onClick={() => openHamburger()}
            className="hamburger mobile clean-button p-0"
          >
            <BiMenuAltLeft />
          </button>
          <div className="header-left p-0">
            <button
              onClick={() => navigate("/")}
              className="logo-button p-0 clean-button"
            >
              <img src={logo} alt="logo" />
            </button>
            <div className="hamburger-nav">
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
                        <ul className="aside-ul pt-2">
                          <li>
                            <NavLink to="/" onClick={() => closeHamburger()}>
                              Ana səhifə
                            </NavLink>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                openDropdown(false, false, !dropdownCode)
                              }
                              className="pb-1 clean-button open-dropdown p-0"
                            >
                              Dərslər{" "}
                              <span
                                className={dropdownCode ? "rotate-arrow" : ""}
                              >
                                <MdKeyboardArrowDown />
                              </span>
                            </button>
                            <ul
                              className={
                                dropdownCode
                                  ? "aside-dropdown open"
                                  : "aside-dropdown"
                              }
                            >
                              <li>
                                <NavLink
                                  onClick={() => closeHamburger()}
                                  to="/lessons"
                                >
                                  Bütün dərslər
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  onClick={() => closeHamburger()}
                                  to="/code/html"
                                >
                                  Kodları öyrən
                                </NavLink>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                openDropdown(!dropdown, false, false)
                              }
                              className="pb-1 clean-button open-dropdown p-0"
                            >
                              Sayt Sifarişi{" "}
                              <span className={dropdown ? "rotate-arrow" : ""}>
                                <MdKeyboardArrowDown />
                              </span>
                            </button>
                            <ul
                              className={
                                dropdown
                                  ? "aside-dropdown open"
                                  : "aside-dropdown"
                              }
                            >
                              <li>
                                <NavLink
                                  onClick={() => closeHamburger()}
                                  to="/order"
                                >
                                  Sifariş et
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  onClick={() => closeHamburger()}
                                  to="/portfolio"
                                >
                                  İşlərimiz
                                </NavLink>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                openDropdown(false, !dropdownLessons, false)
                              }
                              className="pb-1 clean-button open-dropdown p-0"
                            >
                              Pulsuz Dərslər{" "}
                              <span
                                className={
                                  dropdownLessons ? "rotate-arrow" : ""
                                }
                              >
                                <MdKeyboardArrowDown />
                              </span>
                            </button>
                            <ul
                              className={
                                dropdownLessons
                                  ? "aside-dropdown open2"
                                  : "aside-dropdown"
                              }
                            >
                              <li>
                                <NavLink
                                  onClick={() => closeHamburger()}
                                  to="/lessons/fullstack/videos"
                                >
                                  Fullstack
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  onClick={() => closeHamburger()}
                                  to="/lessons/frontend/videos"
                                >
                                  Frontend
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  onClick={() => closeHamburger()}
                                  to="/lessons/backend/videos"
                                >
                                  Backend
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  onClick={() => closeHamburger()}
                                  to="/lessons/ui-designer/videos"
                                >
                                  UI/UX
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  onClick={() => closeHamburger()}
                                  to="/lessons/interior-designer/videos"
                                >
                                  İnteryer
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  onClick={() => closeHamburger()}
                                  to="/lessons/3d-modelling/videos"
                                >
                                  3D Modelləmə
                                </NavLink>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <NavLink
                              to="/blogs?page=1"
                              onClick={() => closeHamburger()}
                            >
                              Bloq
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/contact"
                              onClick={() => closeHamburger()}
                            >
                              Əlaqə
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </motion.aside>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
          <ul className="header-menu desktop m-0 ps-4">
            <li>
              <NavLink to="/">Ana səhifə</NavLink>
            </li>
            <li className="dropdownn">
              Dərslər
              <ul className="dropdown-menuu">
                <li>
                  <NavLink to="/lessons">Bütün dərslər</NavLink>
                </li>
                <li>
                  <NavLink to="/code/html">Kodları öyrən</NavLink>
                </li>
              </ul>
            </li>
            <li className="dropdownn">
              Sayt Sifarişi
              <ul className="dropdown-menuu">
                <li>
                  <NavLink to="order">Sifariş et</NavLink>
                </li>
                <li>
                  <NavLink to="portfolio">İşlərimiz</NavLink>
                </li>
              </ul>
            </li>
            <li className="dropdownn">
              Pulsuz Dərslər
              <ul className="dropdown-menuu">
                <li>
                  <NavLink to="/lessons/fullstack/videos">Fullstack</NavLink>
                </li>
                <li>
                  <NavLink to="/lessons/frontend/videos">Frontend</NavLink>
                </li>
                <li>
                  <NavLink to="/lessons/backend/videos">Backend</NavLink>
                </li>
                <li>
                  <NavLink to="/lessons/ui-designer/videos">UI/UX</NavLink>
                </li>
                <li>
                  <NavLink to="/lessons/interior-designer/videos">
                    İnteryer
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/lessons/3d-modelling/videos">
                    3D Modelləmə
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/blogs?page=1">Bloq</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Əlaqə</NavLink>
            </li>
          </ul>
          <div className="header-profile">
            <button
              onClick={() => openProfile()}
              className="account mobile clean-button p-0"
            >
              {auth?.currentUser?.photoURL ? (
                <img src={auth?.currentUser?.photoURL} alt="logo" />
              ) : (
                <VscAccount />
              )}
            </button>
            <AccountAside
              loggedUser={loggedUser}
              profileMenu={profileMenu}
              setProfileMenu={setProfileMenu}
              userSignOut={userSignOut}
            />
            <div className="desktop-buttons desktop profile-part">
              {currentUser === null ? (
                <>
                  <button
                    onClick={() => navigate("/sign-in")}
                    className="sign-in px-3 clean-button"
                  >
                    Giriş
                  </button>
                  <button
                    onClick={() => navigate("/sign-up")}
                    className="clean-button sign-up hover-animation p-2"
                  >
                    Qeydiyyat
                  </button>
                </>
              ) : (
                <div className="username-part">
                  <Link to={`/user/${loggedUser?.username}`} className="px-2">
                    {loggedUser?.username}
                  </Link>
                  <button
                    onClick={() => userSignOut()}
                    className="clean-button"
                  >
                    {" "}
                    <FiLogOut />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Nav />
    </header>
  );
};

export default Header;
