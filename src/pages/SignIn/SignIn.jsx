import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import login from "../../assets/images/login.svg";
import forget from "../../assets/images/forgot-pass.svg";
import { useEffect } from 'react';
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useNavigate } from 'react-router';

const SignIn = ({ loggedUser }) => {
    const [showPass, setShowPass] = useState(false);
    const [forgot, setForgot] = useState(false);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
    }, []);

    console.log("ss", loggedUser?.username)

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((e) => {
                console.log(e)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleSignIn = async (e) => {
        await signIn(e);
        console.log("a", loggedUser)
        navigate(`/`);
    }

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
                                    <input onChange={(e) => setPassword(e.target.value)} type={showPass ? "text" : "password"} placeholder='Şifrə' name="password" className='pe-5 sign-inputs' required />
                                    <button onClick={() => setShowPass(!showPass)} type='button' className='clean-button btn-show'>{showPass ? (<FaRegEyeSlash />) : (<FaRegEye />)}</button>
                                </div>
                            </div>
                            <div className="sign-buttons">
                                <button className='btn-blue'>Giriş</button>
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