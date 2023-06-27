import React, { useEffect } from 'react';
import "./Error.scss";
import error from "../../assets/images/error.svg";
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
        setTimeout(()=>{
            navigate('/')
        }, 5000)
    }, [navigate])
  return (
    <div className="not-found container p-5">
        <img src={error} alt="404" />
        <h2>Axtardığınız səhifə mövcud deyil.</h2>
        <p className='text-muted'>5 saniyə sonra ana səhifəyə yönləndiriləcəksiniz</p>
    </div>
  )
}

export default Error;