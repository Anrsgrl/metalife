import React from 'react';
import { useAuth } from '../../../../../../firebase';
import "./AdminControllers.scss";
import UpdateUserLessons from './components/UpdateUserLessons/UpdateUserLessons';
import UpdateTeachers from './components/UpdateTeachers';
import UpdateVideos from './components/UpdateUserLessons/UpdateVideos';

const AdminControllers = (props) => {
    const { userData, videos } = useAuth();
    const { user, teacher, video } = props;
    const filteredData = userData?.filter((e) => e.key !== process.env.REACT_APP_ADMIN_KEY)


    return (
        <div className="admin-controllers py-3">
            {teacher && <UpdateTeachers filteredData={filteredData} />}
            {user && <UpdateUserLessons videos={videos} filteredData={filteredData} />}
            {video && <UpdateVideos />}
        </div>
    );
}

export default AdminControllers;