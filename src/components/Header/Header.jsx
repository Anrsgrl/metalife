import React, { useMemo, useState } from "react";
import { auth } from "../../firebase/config";
import { BiMenuAltLeft } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { signOut } from "@firebase/auth";
import { useUsersList } from "../../firebase/getFunctions";
import AccountAside from "../AsideMenu/AccountAside";
import Nav from "../Nav/Nav";
import logo from "../../assets/images/logo.webp";
import "./Header.scss";
import { Aside } from "../Aside";

const Header = () => {
  const { currentUser, loggedUser, loading } = useUsersList();
  const memoizedValues = useMemo(() => {
    return { currentUser, loggedUser, loading };
  }, [currentUser, loggedUser, loading]);
  const navigate = useNavigate();
  const [hamburger, setHamburger] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dropdownLessons, setDropdownLesson] = useState(false);
  const [dropdownCode, setDropdownCode] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const openHamburger = () => {
    setHamburger(true);
    document.documentElement.style.overflow = "hidden";
  };

  const closeHamburger = () => {
    setHamburger(false);
    setDropdown(false);
    setDropdownLesson(false);
    setProfileMenu(false);
    document.documentElement.style.overflow = "unset";
  };

  const openProfile = () => {
    setProfileMenu(true);
    document.documentElement.style.overflow = "hidden";
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

  const lessonsDropdown = [
    { label: "Bütün dərslər", url: "/lessons" },
    { label: "Kodları öyrən", url: "/code/html" },
  ];

  const orderDropdown = [
    { label: "Sifariş et", url: "/order" },
    { label: "İşlərimiz", url: "/portfolio" },
  ];

  const freeLessonsDropdown = [
    { label: "Fullstack", url: "/lessons/fullstack/videos" },
    { label: "Frontend", url: "/lessons/frontend/videos" },
    { label: "Backend", url: "/lessons/backend/videos" },
    { label: "UI/UX", url: "/lessons/ui-designer/videos" },
    { label: "İnteryer", url: "/lessons/interior-designer/videos" },
    { label: "3D Modelləmə", url: "/lessons/3d-modelling/videos" },
  ];

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
            <Aside
              isOpen={hamburger}
              closeAside={() => closeHamburger()}
              pos="left"
            >
              <div className="aside-content">
                <ul className="aside-ul pt-2">
                  <li>
                    <NavLink to="/" onClick={() => closeHamburger()}>
                      Ana səhifə
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={() => openDropdown(false, false, !dropdownCode)}
                      className="pb-1 clean-button open-dropdown p-0"
                    >
                      Dərslər{" "}
                      <span className={dropdownCode ? "rotate-arrow" : ""}>
                        <MdKeyboardArrowDown />
                      </span>
                    </button>
                    <ul
                      className={
                        dropdownCode ? "aside-dropdown open" : "aside-dropdown"
                      }
                    >
                      {lessonsDropdown?.map((lesson, index) => (
                        <li>
                          <NavLink
                            key={index}
                            onClick={() => closeHamburger()}
                            to={lesson.url}
                          >
                            {lesson.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <button
                      onClick={() => openDropdown(!dropdown, false, false)}
                      className="pb-1 clean-button open-dropdown p-0"
                    >
                      Sayt Sifarişi{" "}
                      <span className={dropdown ? "rotate-arrow" : ""}>
                        <MdKeyboardArrowDown />
                      </span>
                    </button>
                    <ul
                      className={
                        dropdown ? "aside-dropdown open" : "aside-dropdown"
                      }
                    >
                      {orderDropdown?.map((lesson, index) => (
                        <li>
                          <NavLink
                            key={index}
                            onClick={() => closeHamburger()}
                            to={lesson.url}
                          >
                            {lesson.label}
                          </NavLink>
                        </li>
                      ))}
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
                      <span className={dropdownLessons ? "rotate-arrow" : ""}>
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
                      {freeLessonsDropdown?.map((lesson, index) => (
                        <li>
                          <NavLink
                            key={index}
                            onClick={() => closeHamburger()}
                            to={lesson.url}
                          >
                            {lesson.label}
                          </NavLink>
                        </li>
                      ))}
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
                    <NavLink to="/contact" onClick={() => closeHamburger()}>
                      Əlaqə
                    </NavLink>
                  </li>
                </ul>
              </div>
            </Aside>
          </div>
          <ul className="header-menu desktop m-0 ps-4">
            <li>
              <NavLink to="/">Ana səhifə</NavLink>
            </li>
            <li className="dropdownn">
              Dərslər
              <ul className="dropdown-menuu">
                {lessonsDropdown?.map((lesson, index) => (
                  <li>
                    <NavLink
                      key={index}
                      onClick={() => closeHamburger()}
                      to={lesson.url}
                    >
                      {lesson.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
            <li className="dropdownn">
              Sayt Sifarişi
              <ul className="dropdown-menuu">
                {orderDropdown?.map((lesson, index) => (
                  <li>
                    <NavLink
                      key={index}
                      onClick={() => closeHamburger()}
                      to={lesson.url}
                    >
                      {lesson.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
            <li className="dropdownn">
              Pulsuz Dərslər
              <ul className="dropdown-menuu">
                {freeLessonsDropdown?.map((lesson, index) => (
                  <li>
                    <NavLink
                      key={index}
                      onClick={() => closeHamburger()}
                      to={lesson.url}
                    >
                      {lesson.label}
                    </NavLink>
                  </li>
                ))}
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
              isOpen={profileMenu}
              closeAside={closeHamburger}
              userSignOut={userSignOut}
            />
            <div className="desktop-buttons desktop profile-part">
              {memoizedValues.currentUser && memoizedValues.loading ? (
                <p>Yüklənir...</p>
              ) : memoizedValues.currentUser === null ? (
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
                  {loggedUser && (
                    <>
                      <Link
                        to={`/user/${loggedUser?.username}`}
                        className="px-2"
                      >
                        {loggedUser?.username}
                      </Link>
                      <button
                        onClick={() => userSignOut()}
                        className="clean-button"
                      >
                        <FiLogOut />
                      </button>
                    </>
                  )}
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
