import React from "react";
import { VscAccount } from "react-icons/vsc";
import { Aside } from "../Aside";
import { auth } from "../../firebase/config";
import { NavLink } from "react-router-dom";

const AccountAside = ({ isOpen, closeAside, loggedUser, userSignOut }) => {
  return (
    <Aside isOpen={isOpen} closeAside={() => closeAside()} pos="right">
      <div className="user-image">
        {auth?.currentUser?.photoURL ? (
          <img
            className="border rounded-circle"
            src={auth?.currentUser?.photoURL}
            alt="logo"
          />
        ) : (
          <VscAccount className="main-color" />
        )}
      </div>
      <ul className="aside-ul pt-2 align-items-center">
        {auth?.currentUser ? (
          <>
            <li>
              <NavLink
                className="main-color"
                to={`/user/${loggedUser?.username}`}
                onClick={() => closeAside()}
              >
                {loggedUser?.username}
              </NavLink>
            </li>
            <li>
              <button onClick={userSignOut} className="clean-button">
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
                onClick={() => closeAside()}
              >
                Qeydiyyat
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sign-in"
                className="main-color"
                onClick={() => closeAside()}
              >
                Giriş
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </Aside>
  );
};

export default AccountAside;
