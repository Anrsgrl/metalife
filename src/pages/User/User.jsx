import React from 'react';
import UserAside from './components/UserAside/UserAside';
import { useNavigate, useParams } from 'react-router-dom';
import { users } from '../../data/Users';
import UserProducts from './components/UserProducts/UserProducts';
import { useEffect } from 'react';

const User = () => {
  const { userName } = useParams();
  const navigate = useNavigate();
  const user = users.find((user) => user.username === userName);
  useEffect(() => {
    if (!user) {
      navigate('/*')
    }
  })
  return (
    <div className="user container py-5">
      <div className="row">
        {user && <>
          <UserAside user={user} />
          <UserProducts user={user} />
        </>}
      </div>
    </div>
  )
}

export default User;