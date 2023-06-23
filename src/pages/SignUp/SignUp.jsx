import React, { useState } from 'react';
import "./SignUp.scss";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import signUp from "../../assets/images/sign3.svg";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import InputMask from 'react-input-mask'

const SignUp = () => {
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
        <div className="sign-field py-4 container">
            <div className="row">
                <div className="smartphone skeleton-loader col-12 col-lg-6">
                    <img className='w-100 h-100' src={signUp} alt="signUp" />
                </div>
                <div className="col-12 col-lg-6 py-3 py-lg-0">
                    <form action="">
                        <h3 className='py-2'>Qeydiyyat</h3>
                        <div className="row">
                            <div className="form-element col-12 col-md-6"><input type="text" placeholder='Ad' name="name" className='sign-inputs' required /></div>
                            <div className="form-element col-12 col-md-6"><input type="text" placeholder='Soyad' name="surname" className='sign-inputs' required /></div>
                            <div className="form-element col-12"><input type="text" placeholder='İstifadəçi adı' name="username" className='sign-inputs' required /></div>
                            <div className="form-element col-12"><input type="email" placeholder='E-poçt' name="email" className='sign-inputs' required /></div>
                            <div className="form-element col-12">
                                <InputMask
                                    className='sign-inputs'
                                    mask="+999\-99-999-99-99"
                                    placeholder="+XXX-XX-XXX-XX-XX"
                                    value={tel}
                                    onChange={(e) => setTel(e.target.value)}
                                ></InputMask>
                                <button type="button" className='clean-button tel-info btn-show'><AiOutlineInfoCircle /></button>
                                <div className="tel-modal">Şifrənizi itirdiyiniz zaman sizə doğrulama kodu göndərməyimiz üçün vacibdir.</div> </div>
                            <div className="form-element col-12">
                                <input type={showPass ? "text" : "password"} placeholder='Şifrə' name="password" className='pe-5 sign-inputs' required />
                                <button onClick={() => setShowPass(!showPass)} type='button' className='clean-button btn-show'>{showPass ? (<FaRegEyeSlash />) : (<FaRegEye />)}</button>
                            </div>
                        </div>
                        <div className="sign-buttons">
                            <button className='btn-blue'>Qeydiyyatı tamamla</button>
                            <button onClick={() => navigate("/sign-in")} className="clean-button">Zatən bir profilin var?</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;