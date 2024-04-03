import React, { useCallback, useEffect, useRef, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { hashtags } from "../../data/Hashtags";
import { Link, useNavigate } from "react-router-dom";

const DragMenu = ({ dragMenu, closeDragMenu, openDragMenu }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dragMenuRef = useRef(null);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeDragMenu();
    setSearchTerm("");
    navigate(`/search?searchItem=${searchTerm}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dragMenuRef.current && dragMenuRef.current.contains(event.target)) {
        closeDragMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [closeDragMenu]);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Escape") {
        closeDragMenu();
      } else if (event.ctrlKey && event.key === "b" && !dragMenu) {
        openDragMenu();
      } else if (event.ctrlKey && event.key === "b" && dragMenu) {
        closeDragMenu();
      }
    },
    [closeDragMenu, dragMenu, openDragMenu]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className={dragMenu ? "open-drag-menu" : "drag-menu"}>
      <div ref={dragMenuRef} className="dark-background"></div>
      <div className="drag-menu-content container">
        <h5>
          Sürətli axtarış!{" "}
          <kbd className="kbc-button kbc-button-xxs kbc-button-dark">Ctrl</kbd>{" "}
          +<kbd className="kbc-button kbc-button-xxs kbc-button-dark">B</kbd>
        </h5>
        <button
          type="button"
          className="mb-4 p-1 close-button"
          onClick={() => closeDragMenu()}
        >
          <AiOutlineClose />
        </button>
        <form onSubmit={(e) => handleSubmit(e)} className="search-bar">
          <input
            ref={inputRef}
            value={searchTerm}
            onChange={handleInputChange}
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
        <ul className="p-0 mt-2 mb-0">
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
