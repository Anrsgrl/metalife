import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import emailjs from '@emailjs/browser';


const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState(false)
    const [error, setError] = useState("")
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
    }, []);
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(process.env.REACT_APP_EMAIL_SERVICE_ID, "template_8vp460o", form.current, process.env.REACT_APP_PUBLIC_KEY)
            .then(() => {
                setStatus(true);
                setError(false);
                form.current.reset()
            })
            .catch((error) => {
                setStatus(false);
                setError(true);
                console.error("Xəta baş verdi:", error.message);
            });
    };
    return (
        <div className="contact container py-5">
            <form onSubmit={(e) => sendEmail(e)} ref={form} className='py-4'>
                <h3 className='py-2'>Əlaqə</h3>
                <div className="row">
                    <div className="form-element col-12 col-md-6"><input type="text" placeholder='Ad' name="from_name" className='sign-inputs' required /></div>
                    <div className="form-element col-12 col-md-6"><input type="text" placeholder='Soyad' name="from_surname" className='sign-inputs' /></div>
                    <div className="form-element col-12 col-md-6"><input type="email" placeholder='E-poçt' name="from_mail" className='sign-inputs' required /></div>
                    <div className="form-element col-12 col-md-6"><input type="text" placeholder='Mövzu' name="from_subject" className='sign-inputs' required /></div>
                    <div className="form-element col-12">
                        <textarea placeholder='Mesajınız' className='sign-text-area' name="message" cols="30" rows="10"></textarea>
                    </div>
                </div>
                <div className="sign-buttons">
                    <button className='btn-blue'>E-poçt göndər</button>
                </div>
                {status && <p className='text-success py-2'>E-poçt göndərildi!</p>}
                {error && <p className='text-danger'>Xəta baş verdi! Zəhmət olmasa daha sonra təzdən yoxlayın.</p>}
            </form>
        </div>
    )
}

export default Contact;