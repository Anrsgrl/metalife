import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { hashtags } from "../../data/Hashtags";
import { Link, useNavigate } from "react-router-dom";

const DragMenu = ({ dragMenu, closeDragMenu }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchTerm(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeDragMenu();
    setSearchTerm("");
    navigate(`/search?searchItem=${searchTerm}`);
  };
  return (
    <div className={dragMenu ? "open-drag-menu" : "drag-menu"}>
      <div className="drag-menu-content container p-5">
        <button
          type="button"
          className="mb-4 p-1 close-button"
          onClick={() => closeDragMenu()}
        >
          <AiOutlineClose />
        </button>
        <form onSubmit={(e) => handleSubmit(e)} className="search-bar">
          <input
            value={searchTerm}
            onChange={(e) =>
              handleInputChange(e.target.value.toLocaleLowerCase())
            }
            type="text"
            placeholder="Axtarış..."
            name="search"
            className="ps-2 pe-4"
          />
          <button
            type="submit"
            className={!searchTerm && "cursor-not-allowed"}
            disabled={!searchTerm}
          >
            <BiSearchAlt />
          </button>
        </form>
        <ul className="p-0 mt-2">
          {hashtags.map((hashtag) => (
            <li key={hashtag} className="pt-2">
              <Link
                to={`/search?searchItem=${hashtag}`}
                onClick={() => closeDragMenu()}
              >
                #{hashtag}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DragMenu;
