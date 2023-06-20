import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import login from "../../assets/images/login.svg";
import forget from "../../assets/images/forgot-pass.svg";
import { useEffect } from 'react';

const SignIn = () => {
    const [showPass, setShowPass] = useState(false);
    const [forgot, setForgot] = useState(false);
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
    }, []);
    return (
        <div className="sign-field py-4 container">
            {!forgot ? (
                <div className="row">
                    <div className="smartphone col-12 col-lg-6">
                        <img className='w-100 h-100' src={login} alt="signIn" />
                    </div>
                    <div className="col-12 col-lg-6 py-3 py-lg-0">
                        <form action="">
                            <h3 className='py-2'>Login</h3>
                            <div className="row">
                                <div className="form-element col-12"><input type="text" placeholder='Username' name="username" className='sign-inputs' required /></div>
                                <div className="form-element col-12">
                                    <input type={showPass ? "text" : "password"} placeholder='Password' name="password" className='pe-5 sign-inputs' required />
                                    <button onClick={() => setShowPass(!showPass)} type='button' className='clean-button btn-show'>{showPass ? (<FaRegEyeSlash />) : (<FaRegEye />)}</button>
                                </div>
                            </div>
                            <div className="sign-buttons">
                                <button className='btn-blue'>Login</button>
                                <button onClick={() => setForgot(true)} type='button' className="clean-button">Forgot your password?</button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="smartphone col-12 col-lg-6">
                        <img className='w-100 h-100' src={forget} alt="forget" />
                    </div>
                    <div className="col-12 col-lg-6 py-3 py-lg-0">
                        <form action="">
                            <h3 className='py-2'>Forgot password</h3>
                            <div className="row">
                                <div className="form-element col-12"><input type="email" placeholder='Email' name="email" className='sign-inputs' required /></div>
                            </div>
                            <div className="sign-buttons">
                                <button className='btn-blue'>Send email</button>
                                <button onClick={() => setForgot(false)} type='button' className="clean-button">Go back to login page</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SignIn;