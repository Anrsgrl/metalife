import React from "react";
import "./AdminControllers.scss";
import UpdateUserLessons from "./components/UpdateElements/UpdateUserLessons";
import UpdateRank from "./components/UpdateElements/UpdateRank";
import UpdateVideos from "./components/UpdateElements/UpdateVideos";
import UpdateBlog from "./components/UpdateElements/UpdateBlog";
import RemoveItems from "./components/UpdateElements/RemoveItems";
import UpdateCodes from "./components/UpdateElements/UpdateCodes";
import {
  useUsersList,
  useVideosList,
} from "../../../../../../firebase/getFunctions";

const AdminControllers = (props) => {
  const { userData, loggedUser } = useUsersList();
  const videos = useVideosList();

  if (!Array.isArray(userData)) {
    return <p>Loading...</p>;
  }

  const { user, teacher, video, blog, trash, code } = props;
  const filteredData = userData?.filter(
    (e) =>
      e.userKey !== process.env.REACT_APP_ADMIN_KEY &&
      e.email !== loggedUser.email
  );

  return (
    <div className="admin-controllers py-3">
      {teacher && <UpdateRank filteredData={filteredData} />}
      {user && (
        <UpdateUserLessons videos={videos} filteredData={filteredData} />
      )}
      {video && <UpdateVideos />}
      {blog && <UpdateBlog />}
      {trash && <RemoveItems filteredData={filteredData} />}
      {code && <UpdateCodes />}
    </div>
  );
};

export default AdminControllers;
