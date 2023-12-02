import React, { useState } from "react";
import AdminControllers from "../AdminControllers/AdminControllers";
import {
  BsFillFileEarmarkCodeFill,
  BsFillFileEarmarkExcelFill,
  BsFillFileEarmarkLock2Fill,
  BsFillFileEarmarkMedicalFill,
  BsFillFileEarmarkPersonFill,
  BsFillFileEarmarkPlayFill,
} from "react-icons/bs";

const AdminPanel = ({ isAdmin }) => {
  const [panel, setPanel] = useState("blog");

  const adminPages = [
    {
      panelName: "blog",
      name: "bloq",
      icon: <BsFillFileEarmarkMedicalFill />,
      isAdmin: true,
    },
    {
      panelName: "rank",
      name: "rütbə",
      icon: <BsFillFileEarmarkLock2Fill />,
      isAdmin: isAdmin,
    },
    {
      panelName: "user",
      name: "profil",
      icon: <BsFillFileEarmarkPersonFill />,
      isAdmin: true,
    },
    {
      panelName: "video",
      name: "video",
      icon: <BsFillFileEarmarkPlayFill />,
      isAdmin: true,
    },
    {
      panelName: "code",
      name: "kod",
      icon: <BsFillFileEarmarkCodeFill />,
      isAdmin: true,
    },
    {
      panelName: "trash",
      name: "sil",
      icon: <BsFillFileEarmarkExcelFill />,
      isAdmin: true,
    },
  ];

  return (
    <div className="admin-panel">
      <div className="panel-buttons pb-1">
        {adminPages.map((item) => (
          <button
            key={item.name}
            type="button"
            disabled={!item.isAdmin}
            className={`${
              panel === item.panelName ? "btn-blue" : "btn-white opacity-50"
            } ${!item.isAdmin && "d-none"}`}
            onClick={() => setPanel(item.panelName)}
          >
            {item.icon}
            {panel === item.panelName && item.name}
          </button>
        ))}
      </div>
      <div className="panel-items">
        {panel === "blog" && (
          <AdminControllers
            user={false}
            teacher={false}
            video={false}
            blog={true}
            trash={false}
            code={false}
          />
        )}
        {panel === "user" && (
          <AdminControllers
            user={true}
            teacher={false}
            video={false}
            blog={false}
            trash={false}
            code={false}
          />
        )}
        {panel === "rank" && (
          <AdminControllers
            user={false}
            teacher={true}
            video={false}
            blog={false}
            trash={false}
            code={false}
          />
        )}
        {panel === "video" && (
          <AdminControllers
            user={false}
            teacher={false}
            video={true}
            blog={false}
            trash={false}
            code={false}
          />
        )}
        {panel === "trash" && (
          <AdminControllers
            user={false}
            teacher={false}
            video={false}
            blog={false}
            trash={true}
            code={false}
          />
        )}
        {panel === "code" && (
          <AdminControllers
            user={false}
            teacher={false}
            video={false}
            blog={false}
            trash={false}
            code={true}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
