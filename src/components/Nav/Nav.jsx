import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import "./Nav.scss";
import { hashtags } from "../../data/Hashtags";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Nav = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    setSearchTerm(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm("");
    navigate(`/search?searchItem=${searchTerm}`);
  };

  const hideNav = location.pathname.startsWith("/code");

  return (
    <div className={`navv p-0 container ${hideNav ? "d-none" : ""}`}>
      <form onSubmit={(e) => handleSubmit(e)} className="search-bar">
        <input
          onChange={(e) =>
            handleInputChange(e.target.value.toLocaleLowerCase())
          }
          value={searchTerm}
          type="text"
          placeholder="Axtarış..."
          name=""
          id=""
          className="ps-2 pe-4"
        />
        <button
          type="submit"
          className={!searchTerm ? "cursor-not-allowed" : ""}
          disabled={!searchTerm}
        >
          <BiSearchAlt />
        </button>
      </form>
      <ul className="px-0 pt-1 m-0 hashtags">
        {hashtags.map((hashtag, i) => (
          <li key={i}>
            <Link className="text-muted" to={`/search?searchItem=${hashtag}`}>
              #{hashtag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
