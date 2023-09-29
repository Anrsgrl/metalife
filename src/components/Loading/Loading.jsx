import React from "react";
import HashLoader from "react-spinners/HashLoader";
import "./Loading.scss";
const Loading = () => {
  return (
    <div className="loading">
      {" "}
      <HashLoader color="#4A4AB5" />
    </div>
  );
};

export default Loading;
