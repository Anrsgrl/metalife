import React, { useState } from 'react';
import "./SignUp.scss";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import signUp from "../../assets/images/sign3.svg";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SignUp = () => {
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
    }, []);
    return (
        <div className="sign-field py-4 container">
            <div className="row">
                <div className="smartphone skeleton-loader col-12 col-lg-6">
                    <img className='w-100 h-100' src={signUp} alt="signUp" />
                </div>
                <div className="col-12 col-lg-6 py-3 py-lg-0">
                    <form action="">
                        <h3 className='py-2'>Register</h3>
                        <div className="row">
                            <div className="form-element col-12 col-md-6"><input type="text" placeholder='Name' name="name" className='sign-inputs' required /></div>
                            <div className="form-element col-12 col-md-6"><input type="text" placeholder='Surname' name="surname" className='sign-inputs' required /></div>
                            <div className="form-element col-12"><input type="text" placeholder='Username' name="username" className='sign-inputs' required /></div>
                            <div className="form-element col-12"><input type="email" placeholder='Email' name="email" className='sign-inputs' required /></div>
                            <div className="form-element col-12"><input type="tel" placeholder='Number (XX-XXX-XX-XX)' className='pe-5 sign-inputs' name="phone"
                                pattern="[0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
                                required /> <button type="button" className='clean-button tel-info btn-show'><AiOutlineInfoCircle /></button> <div className="tel-modal">Between the numbers in the phone number - it is mandatory to use</div> </div>
                            <div className="form-element col-12">
                                <input type={showPass ? "text" : "password"} placeholder='Password' name="password" className='pe-5 sign-inputs' required />
                                <button onClick={() => setShowPass(!showPass)} type='button' className='clean-button btn-show'>{showPass ? (<FaRegEyeSlash />) : (<FaRegEye />)}</button>
                            </div>
                        </div>
                        <div className="sign-buttons">
                            <button className='btn-blue'>Sign Up</button>
                            <button onClick={() => navigate("/sign-in")} className="clean-button">Already have an account?</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;