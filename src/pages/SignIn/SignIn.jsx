import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import login from "../../assets/images/login.svg";
import forget from "../../assets/images/forgot-pass.svg";
import { useEffect } from 'react';
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const SignIn = ({ loggedUser }) => {
    const [showPass, setShowPass] = useState(false);
    const [forgot, setForgot] = useState(false);
    const [errorType, setErrorType] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
        if (loggedUser) {
            navigate('/')
        }
    }, [loggedUser, navigate]);

    console.log("ss", loggedUser?.username)
    console.log("error", errorType)

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User signed in");
            navigate('/');
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setErrorType("user");
            } else if (error.code === "auth/invalid-email") {
                alert("Invalid email address.");
            } else if (error.code === "auth/wrong-password") {
                setErrorType("pass");
            } else if (error.code === "auth/too-many-requests") {
                setErrorType("temporary")
            } else {
                console.log("An error occurred:", error);
            }
        }
    };


    return (
        <div className="sign-field py-4 container">
            {!forgot ? (
                <div className="row">
                    <div className="smartphone skeleton-loader col-12 col-lg-6">
                        <img className='w-100 h-100' src={login} alt="signIn" />
                    </div>
                    <div className="col-12 col-lg-6 py-3 py-lg-0">
                        <h3 className='py-2'>Giriş</h3>
                        <form onSubmit={(e) => { handleSignIn(e) }} action="">
                            <div className="row">
                                <div className="form-element col-12">
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='E-poçt' name="email" className='sign-inputs' required />
                                </div>
                                <div className="form-element col-12">
                                    <input onChange={(e) => setPassword(e.target.value)} type={showPass ? "text" : "password"} placeholder='Şifrə' name="password"
                                        className={errorType === "pass" ? 'pe-5 sign-inputs mb-2 border-danger' : 'pe-5 sign-inputs'} required />
                                    {errorType === "pass" && <p className='text-danger'>Şifrəniz yanlışdır.</p>}
                                    {errorType === "pass" && <p className='text-danger'>Çox yanlış kod girdiyiniz üçün, profiliniz keçici olaraq bloklanmışdır.</p>}
                                    {errorType === "user" && <p className='text-danger'>Qeyd etdiyiniz məlumatlar heç bir istifadəçi ilə uymur. Zəhmət olmasa <Link to="/register">qeydiyyatdan</Link> keçin</p>}
                                    <button onClick={() => setShowPass(!showPass)} type='button' className='clean-button btn-show'>{showPass ? (<FaRegEyeSlash />) : (<FaRegEye />)}</button>
                                </div>
                            </div>
                            <div className="sign-buttons">
                                <button type='submit' className='btn-blue'>Giriş</button>
                                <button onClick={() => setForgot(true)} type='button' className="clean-button">Şifrəni unuttun?</button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="smartphone skeleton-loader col-12 col-lg-6">
                        <img className='w-100 h-100' src={forget} alt="forget" />
                    </div>
                    <div className="col-12 col-lg-6 py-3 py-lg-0">
                        <form action="">
                            <h3 className='py-2'>Şifrəmi unuttum</h3>
                            <div className="row">
                                <div className="form-element col-12"><input type="email" placeholder='E-poçt' name="email" className='sign-inputs' required /></div>
                            </div>
                            <div className="sign-buttons">
                                <button className='btn-blue'>E-poçt göndər</button>
                                <button onClick={() => setForgot(false)} type='button' className="clean-button">Giriş səhifəsinə geri dön</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SignIn;