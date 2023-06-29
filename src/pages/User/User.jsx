import React, { useState } from 'react';
import UserAside from './components/UserAside/UserAside';
import { useNavigate, useParams } from 'react-router-dom';
import UserProducts from './components/UserProducts/UserProducts';
import { useEffect } from 'react';


const User = ({ loggedUser }) => {
  const { userName } = useParams();
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  // *
  // ? asgjkagsj
  // ! 
  // TODO - DO IT FIRST

  useEffect(() => {
    if (loggedUser?.username !== userName) {
      navigate("/*")
    } else {
      setShow(true)
    }
  }, [])

  return (
    <div className="user container py-5">
      <div className="row">
        {!show && <div>cant find</div>}
        {show && <>
          <UserAside user={loggedUser} />
          <UserProducts user={loggedUser} />
        </>}
      </div>
    </div>
  )
}

export default User;