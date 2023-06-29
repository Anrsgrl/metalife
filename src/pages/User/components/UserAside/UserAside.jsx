import React from 'react';
import "./UserAside.scss";
import boy from "../../../../assets/images/boy.png"

const UserAside = ({ user }) => {
  const { name, surname, username } = user;
  return (
    <div className='user-aside px-5 px-md-2 col-12 col-md-4'>
      <div className="user-content row">
        <div className="user-image col-12">
          <img src={boy} alt="boy" />
        </div>
        <h3 className='col-12 py-1'>{name} {surname}</h3>
        <h4 className='col-12 text-muted'>{username}</h4>
        <button type='button' className='btn-white col-12'>Edit profile</button>
      </div>
    </div>
  )
}

export default UserAside;