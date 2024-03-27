import React, { useState } from "react";
import "./UserAside.scss";
import boy from "../../../../assets/images/boy.webp";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../../firebase/config";

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
            <img src={boy} onLoad={() => setLoading(false)} alt="profile" />
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
          Profili redaktə edin
        </button>
      </div>
    </div>
  );
};

export default UserAside;
