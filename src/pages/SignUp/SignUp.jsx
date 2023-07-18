import React, { useState, useEffect } from 'react';
import "./SignUp.scss";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import signUpp from "../../assets/images/sign3.svg";
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { db, auth, useAuth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const SignUp = () => {
    const { loggedUser } = useAuth();
    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState({
        mobile: null,
        name: "",
        surname: "",
        username: "",
        email: "",
        password: ""
    });
    const [errorType, setErrorType] = useState("");
    const userssCollectionRef = collection(db, "users");
    const navigate = useNavigate();

    const { mobile, name, surname, username, email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const checkUsernameAvailability = async (username) => {
        const q = query(userssCollectionRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        return querySnapshot.empty;
    };

    const signUp = async (e) => {
        e.preventDefault();

        const usernameAvailable = await checkUsernameAvailability(username);

        if (!usernameAvailable) {
            setErrorType("username");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("User created");
            addDoc(userssCollectionRef, { name, surname, username, email, mobile, password });
            updateProfile(auth.currentUser, {
                displayName: username
            });
            navigate('/');
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setErrorType("email");
            } else if (error.code === "auth/invalid-email") {
                alert("Invalid email address.");
            } else if (error.code === "auth/operation-not-allowed") {
                alert("Operation not allowed.");
            } else if (error.code === "auth/weak-password") {
                setErrorType("pass");
            } else {
                console.log("An error occurred:", error);
            }
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
        if (loggedUser) {
            navigate('/');
        }
    }, [loggedUser, navigate]);

    return (
        <div className="sign-field py-4 container">
            <div className="row">
                <div className="smartphone col-12 col-lg-6">
                    <img className='w-100 h-100' src={signUpp} alt="signUp" />
                </div>
                <div className="col-12 col-lg-6 py-3 py-lg-0">
                    <form onSubmit={signUp} action="">
                        <h3 className='py-2'>Qeydiyyat</h3>
                        <div className="row">
                            <div className="form-element col-12 col-md-6">
                                <input onChange={handleChange} type="text" placeholder='Ad' name="name" className='sign-inputs' required />
                            </div>
                            <div className="form-element col-12 col-md-6">
                                <input onChange={handleChange} type="text" placeholder='Soyad' name="surname" className='sign-inputs' required />
                            </div>
                            <div className="form-element col-12">
                                <input onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value.toLocaleLowerCase() })} type="text" placeholder='İstifadəçi adı' name="username" className={errorType === "username" ? 'sign-inputs mb-2 border-danger' : 'sign-inputs'} required />
                                {errorType === "username" && <p className='text-danger'>Bu istifadəçi adı artıq mövcuddur.</p>}
                            </div>
                            <div className="form-element col-12">
                                <input onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value.toLocaleLowerCase() })} type="email" placeholder='E-poçt' name="email" className={errorType === "email" ? 'sign-inputs mb-2 border-danger' : 'sign-inputs'} required />
                                {errorType === "email" && <p className='text-danger'>Bu emaildən istifadə olunmuşdur.</p>}
                            </div>
                            <div className="form-element col-12">
                                <InputMask className='sign-inputs' mask="+999\-99-999-99-99" placeholder="+XXX-XX-XXX-XX-XX" value={mobile || ''} onChange={handleChange} name="mobile" />
                                <button type="button" className='clean-button tel-info btn-show'><AiOutlineInfoCircle /></button>
                                <div className="tel-modal">Şifrənizi itirdiyiniz zaman sizə doğrulama kodu göndərməyimiz üçün vacibdir.</div>
                            </div>
                            <div className="form-element col-12">
                                <input onChange={handleChange} type={showPass ? "text" : "password"} placeholder='Şifrə' name="password" className={errorType === "pass" ? 'pe-5 sign-inputs mb-2 border-danger' : 'pe-5 sign-inputs'} required />
                                {errorType === "pass" && <p className='text-danger'>Şifrəniz çox zəifdir.</p>}
                                <button onClick={() => setShowPass(!showPass)} type='button' className='clean-button btn-show'>{showPass ? (<FaRegEyeSlash />) : (<FaRegEye />)}</button>
                            </div>
                        </div>
                        <div className="sign-buttons">
                            <button type='submit' className='btn-blue'>Qeydiyyatı tamamla</button>
                            <button onClick={() => navigate("/sign-in")} className="clean-button">Zatən bir profilin var?</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
