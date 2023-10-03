import React from "react";
import "./AdminControllers.scss";
import UpdateUserLessons from "./components/UpdateElements/UpdateUserLessons";
import UpdateTeachers from "./components/UpdateElements/UpdateTeachers";
import UpdateVideos from "./components/UpdateElements/UpdateVideos";
import UpdateBlog from "./components/UpdateElements/UpdateBlog";
import RemoveItems from "./components/UpdateElements/RemoveItems";
import UpdateCodes from "./components/UpdateElements/UpdateCodes";
import {
  useUsersList,
  useVideosList,
} from "../../../../../../firebase/getFunctions";

const AdminControllers = (props) => {
  const userData = useUsersList();
  const videos = useVideosList();

  const { user, teacher, video, blog, trash, code } = props;
  const filteredData = userData?.filter(
    (e) => e.userKey !== process.env.REACT_APP_ADMIN_KEY
  );

  return (
    <div className="admin-controllers py-3">
      {teacher && <UpdateTeachers filteredData={filteredData} />}
      {user && (
        <UpdateUserLessons videos={videos} filteredData={filteredData} />
      )}
      {video && <UpdateVideos />}
      {blog && <UpdateBlog />}
      {trash && <RemoveItems />}
      {code && <UpdateCodes />}
    </div>
  );
};

export default AdminControllers;
