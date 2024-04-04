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

const AdminPanel = ({ isAdmin, admin }) => {
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
      name: "Müəllim",
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
            className={`${
              panel === item.panelName ? "btn-blue" : "btn-white"
            } ${!item.isAdmin && "disabled"}`}
            onClick={() => setPanel(item.panelName)}
            disabled={!item.isAdmin}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </div>
      <div className="panel-items">
        <AdminControllers
          admin={
            panel === "user" || panel === "rank" || panel === "trash"
              ? admin
              : false
          }
          user={panel === "user"}
          teacher={panel === "rank"}
          video={panel === "video"}
          blog={panel === "blog"}
          trash={panel === "trash"}
          code={panel === "code"}
        />
      </div>
    </div>
  );
};

export default AdminPanel;
