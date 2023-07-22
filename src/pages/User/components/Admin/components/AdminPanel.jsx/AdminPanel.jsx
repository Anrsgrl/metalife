import React, { useState } from 'react';
import AdminControllers from '../AdminControllers/AdminControllers';
import { BsFillTrashFill } from "react-icons/bs";

const AdminPanel = ({ isAdmin }) => {
    const [panel, setPanel] = useState("blog")
    return (
        <div className="admin-panel">
            <div className="panel-buttons row">
                <button type="button" className={`${panel === "blog" ? "btn-blue" : "btn-white"} col-12 col-md-5 col-lg-2`} onClick={() => setPanel("blog")}>Blog</button>
                {isAdmin && <button type="button" className={`${panel === "teacher" ? "btn-blue" : "btn-white"} col-12 col-md-5 col-lg-2`} onClick={() => setPanel("teacher")}>Teacher</button>}
                <button type="button" className={`${panel === "user" ? "btn-blue" : "btn-white"} col-12 col-md-5 col-lg-2`} onClick={() => setPanel("user")}>User</button>
                <button type="button" className={`${panel === "videos" ? "btn-blue" : "btn-white"} col-12 col-md-5 col-lg-2`} onClick={() => setPanel("videos")}>Videos</button>
                <button type="button" style={{ height: "44px" }} className={`${panel === "trash" ? "btn btn-danger" : "btn-white text-danger"} col-12 col-md-5 col-lg-2`} onClick={() => setPanel("trash")}><BsFillTrashFill /></button>
            </div>
            <div className="panel-items">
                {panel === "blog" && <AdminControllers user={false} teacher={false} video={false} blog={true} trash={false} />}
                {panel === "user" && <AdminControllers user={true} teacher={false} video={false} blog={false} trash={false} />}
                {panel === "teacher" && <AdminControllers user={false} teacher={true} video={false} blog={false} trash={false} />}
                {panel === "videos" && <AdminControllers user={false} teacher={false} video={true} blog={false} trash={false} />}
                {panel === "trash" && <AdminControllers user={false} teacher={false} video={false} blog={false} trash={true} />}
            </div>
        </div>
    )
}

export default AdminPanel;