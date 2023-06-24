import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import InputMask from 'react-input-mask'

const Contact = () => {
    const [showPass, setShowPass] = useState(false)
    const [tel, setTel] = useState()
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
    }, []);
    return (
        <div className="contact container py-5">
            <form action="">
                <h3 className='py-2'>Əlaqə</h3>
                <div className="row">
                    <div className="form-element col-12 col-md-6"><input type="text" placeholder='Ad' name="name" className='sign-inputs' required /></div>
                    <div className="form-element col-12 col-md-6"><input type="text" placeholder='Soyad' name="surname" className='sign-inputs' required /></div>
                    <div className="form-element col-12 col-md-6"><input type="email" placeholder='E-poçt' name="email" className='sign-inputs' required /></div>
                    <div className="form-element col-12 col-md-6"><input type="text" placeholder='Mövzu' name="subject" className='sign-inputs' required /></div>
                    <div className="form-element col-12">
                        <textarea placeholder='Mesajınız' className='sign-text-area' name="comment" cols="30" rows="10"></textarea>
                    </div>
                </div>
                <div className="sign-buttons">
                    <button className='btn-blue'>E-poçt göndər</button>
                </div>
            </form>
        </div>
    )
}

export default Contact;