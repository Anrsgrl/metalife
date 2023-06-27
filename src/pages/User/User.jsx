import React from 'react';
import UserAside from './components/UserAside/UserAside';
import { useParams } from 'react-router-dom';
import { users } from '../../data/Users';

const User = () => {
    const { userName } = useParams();
    const user = users.find((user) => user.username === userName);
    console.log(userName)
    console.log(user)
  return (
    <div className="user container py-5">
        <div className="row">
            <UserAside user={user} />
        </div>
    </div>
  )
}

export default User;