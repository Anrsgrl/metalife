import React, { useState, useEffect } from 'react';
import UserAside from './components/UserAside/UserAside';
import { useNavigate, useParams } from 'react-router-dom';
import UserProducts from './components/UserProducts/UserProducts';
import { useAuth } from '../../firebase';
import FadeLoader from 'react-spinners/FadeLoader';
import Admin from './components/Admin/Admin';

const User = () => {
  const { loggedUser } = useAuth();
  const { userName } = useParams();
  const [show, setShow] = useState(false);
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  console.log(process.env.REACT_APP_ADMIN_KEY)
  console.log(loggedUser?.userKey)

  useEffect(() => {
    if (loggedUser?.userKey === process.env.REACT_APP_ADMIN_KEY) {
      setAdmin(true)
    } else {
      setAdmin(false)
    }
    if (loggedUser !== null) {
      if (loggedUser === undefined) {
        setShow(false);
      } else if (loggedUser.username !== userName) {
        navigate('/*');
      } else {
        setShow(true);
      }
    }
  }, [loggedUser, navigate, userName]);


  if (loggedUser === undefined) {
    return <div className="container py-5">
      <FadeLoader color="#4A4AB5" />
    </div>
  }

  return (
    <div className="user container py-5">
      <div className="row">
        {show && (
          <>
            <UserAside user={loggedUser} />
            {admin ? <Admin user={loggedUser} /> : <UserProducts user={loggedUser} />}
          </>
        )}
      </div>
    </div>
  );
};

export default User;
