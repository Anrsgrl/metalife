import React, { useEffect } from "react";
import "./Code.scss";
import DragMenu from "../../components/DragMenu/DragMenu";
import { useState } from "react";
import CodeHeader from "./components/CodeHeader/CodeHeader";
import { useParams } from "react-router-dom";
import { useCodeList } from "../../firebase/getFunctions";
import CodeTitles from "./components/CodeTitles/CodeTitles";
import CodeContent from "./components/CodeContent/CodeContent";
const Code = () => {
  const params = useParams();
  const codes = useCodeList();
  useEffect(() => {
    document.title = "Kodlar | Metalife";
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);
  const filteredData = codes?.filter((e) => e.codeName === params.codeName);
  const filteredContent = codes?.find(
    (code) =>
      code?.title.replace("?", "").toLowerCase().split(" ").join("-") ===
      params.codeTitle
  );
  const [dragMenu, setDragMenu] = useState(false);
  const openDragMenu = () => {
    setDragMenu(true);
    document.body.style.overflow = "hidden";
  };
  const closeDragMenu = () => {
    setDragMenu(false);
    document.body.style.overflow = "unset";
  };
  return (
    <div className="codes py-1">
      <div className="codes-content container">
        <CodeHeader openDragMenu={openDragMenu} />
        <div className="row">
          <CodeTitles filteredData={filteredData} url={params.codeName} />
          <CodeContent filteredContent={filteredContent} />
        </div>
      </div>
      <DragMenu dragMenu={dragMenu} closeDragMenu={closeDragMenu} />
    </div>
  );
};

export default Code;
