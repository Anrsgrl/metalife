import React, { useState } from 'react';
import AdminControllers from '../AdminControllers/AdminControllers';
const AdminPanel = ({ isAdmin }) => {
    const [panel, setPanel] = useState("blog")
    return (
        <div className="admin-panel">
            <div className="panel-buttons row">
                <button type="button" className={panel === "blog" ? "btn-blue col-6" : "btn-white col-6"} onClick={() => setPanel("blog")}>Blog</button>
                {isAdmin && <button type="button" className={panel === "teacher" ? "btn-blue col-6" : "btn-white col-6"} onClick={() => setPanel("teacher")}>Teacher</button>}
                <button type="button" className={panel === "user" ? "btn-blue col-6" : "btn-white col-6"} onClick={() => setPanel("user")}>User</button>
                <button type="button" className={panel === "videos" ? "btn-blue col-6" : "btn-white col-6"} onClick={() => setPanel("videos")}>Videos</button>
            </div>
            <div className="panel-items">
                {panel === "blog" && <AdminControllers user={false} teacher={false} video={false} blog={true} />}
                {panel === "user" && <AdminControllers user={true} teacher={false} video={false} blog={false} />}
                {panel === "teacher" && <AdminControllers user={false} teacher={true} video={false} blog={false} />}
                {panel === "videos" && <AdminControllers user={false} teacher={false} video={true} blog={false} />}
            </div>
        </div>
    )
}

export default AdminPanel;