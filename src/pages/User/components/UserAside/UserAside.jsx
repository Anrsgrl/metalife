import React, { useState } from "react";
import "./UserAside.scss";
import { auth } from "../../../../firebase";
import boy from "../../../../assets/images/boy.png";
import { useNavigate } from "react-router-dom";

const UserAside = ({ user }) => {
  const { name, surname, username } = user;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  return (
    <div className="user-aside px-5 px-md-2 col-12 col-lg-4">
      <div className="user-content row">
        <div className="user-image col-12">
          {loading && <div className="skeleton" />}
          {auth?.currentUser?.photoURL ? (
            <img
              onLoad={() => setLoading(false)}
              src={auth?.currentUser?.photoURL}
              alt="profile"
            />
          ) : (
            <img src={boy} alt="profile" />
          )}
        </div>
        <h3 className="col-12 py-1">
          {name} {surname}
        </h3>
        <h4 className="col-12 text-muted">{username}</h4>
        <button
          onClick={() => navigate("/settings")}
          type="button"
          className="btn-white col-12"
        >
          Edit profile
        </button>
      </div>
    </div>
  );
};

export default UserAside;
