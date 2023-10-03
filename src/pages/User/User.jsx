import React, { useState, useEffect } from "react";
import UserAside from "./components/UserAside/UserAside";
import { useNavigate, useParams } from "react-router-dom";
import UserProducts from "./components/UserProducts/UserProducts";
import FadeLoader from "react-spinners/FadeLoader";
import Admin from "./components/Admin/Admin";
import { useUsersList } from "../../firebase/getFunctions";
import Loading from "../../components/Loading/Loading";

const User = () => {
  const { loggedUser } = useUsersList();
  const { userName } = useParams();
  const [show, setShow] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [level, setLevel] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedUser?.userKey === process.env.REACT_APP_ADMIN_KEY) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
    if (loggedUser !== null) {
      if (loggedUser === undefined) {
        setShow(false);
      } else if (loggedUser.username !== userName) {
        navigate("/*");
      } else {
        setShow(true);
      }
    }
  }, [loggedUser, navigate, userName]);

  if (loggedUser === undefined) {
    return <Loading />;
  }

  return (
    <div className="user container py-5">
      <div className="row">
        {show && (
          <>
            {level === "" && <UserAside user={loggedUser} />}
            {admin ? (
              <Admin user={loggedUser} level={level} setLevel={setLevel} />
            ) : (
              <UserProducts user={loggedUser} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default User;
