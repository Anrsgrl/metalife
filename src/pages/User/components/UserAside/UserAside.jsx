import React from 'react';
import "./UserAside.scss";
import { auth } from "../../../../firebase";
import { useNavigate } from 'react-router-dom';

const UserAside = ({ user }) => {
  const { name, surname, username } = user;
  const navigate = useNavigate()
  return (
    <div className='user-aside px-5 px-md-2 col-12 col-lg-4'>
      <div className="user-content row">
        <div className="user-image col-12">
          <img src={auth?.currentUser?.photoURL} alt="boy" />
        </div>
        <h3 className='col-12 py-1'>{name} {surname}</h3>
        <h4 className='col-12 text-muted'>{username}</h4>
        <button
          onClick={() => navigate('/settings')}
          type='button' className='btn-white col-12'>Edit profile</button>
      </div>
    </div>
  );
};

export default UserAside;
