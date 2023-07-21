import React, { useRef } from 'react';
import InputMask from 'react-input-mask'
import { useState } from 'react';
import { TfiReload } from "react-icons/tfi";
import emailjs from '@emailjs/browser';

const OrderPrice = () => {
    const form = useRef();
    const [tel, setTel] = useState();
    const [change, setChange] = useState(false);
    const [status, setStatus] = useState(false);
    const [error, setError] = useState("");

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(process.env.REACT_APP_EMAIL_SERVICE_ID, "template_7cs7jeg", form?.current, process.env.REACT_APP_PUBLIC_KEY)
            .then(() => {
                setStatus(true);
                setError(false);
                form?.current?.reset();
                setTel("")
            })
            .catch((error) => {
                setStatus(false);
                setError(true);
                console.error("Xəta baş verdi:", error.message);
            });
    };


    return (
        <div className="order-price container py-3">
            <h2 data-aos="fade-up" className='py-4'>Qiymət təklifinin alınması</h2>
            <form ref={form} onSubmit={(e) => sendEmail(e)}>
                <div className="row">
                    <div data-aos="fade-right" className="form-element col-12">
                        <textarea placeholder='Necə bir sayt istəyirsiniz?' className='sign-text-area' name="describe" cols="30" rows="10"></textarea>
                    </div>
                    <div data-aos="fade-right" className="form-element col-12 col-md-6">
                        <input type="text" placeholder='Adınız' name="from_name" className='sign-inputs' required /></div>
                    <div data-aos="fade-right" className="form-element col-12 col-md-6">
                        <input type="text" placeholder='Şirkətin adı' name="from_company" className='sign-inputs' required />
                    </div>
                    <div data-aos="fade-right" className="form-element col-12 col-md-6">
                        {change ? (
                            <>
                                <InputMask
                                    name="from_number"
                                    className="sign-inputs"
                                    mask="+999\-99-999-99-99"
                                    placeholder="+XXX-XX-XXX-XX-XX"
                                    value={tel || ""}
                                    onChange={(e) => setTel(e.target.value)}
                                    required
                                />
                                <button
                                    onClick={() => setChange(!change)}
                                    type="button"
                                    className="clean-button btn-show"
                                >
                                    {change ? (
                                        <TfiReload className={change && "rotate-180"} />
                                    ) : (
                                        <TfiReload />
                                    )}
                                </button>
                            </>
                        ) : (
                            <>
                                <input
                                    type="email"
                                    placeholder="E-poçt"
                                    name="from_mail"
                                    className="sign-inputs"
                                    required
                                />
                                <button
                                    onClick={() => setChange(!change)}
                                    type="button"
                                    className="clean-button btn-show"
                                >
                                    {change ? <TfiReload /> : <TfiReload />}
                                </button>
                            </>
                        )}
                    </div>

                    <div data-aos="fade-right" className="col-md-6 form-element">
                        <button className='btn-blue sign-inputs'>Qiymət təklifi al</button>
                    </div>
                </div>
                {status && <p className='text-success py-2'>E-poçt göndərildi! Yaxın zamanda sizinlə əlaqə saxlanılacaq!</p>}
                {error && <p className='text-danger'>Xəta baş verdi! Zəhmət olmasa daha sonra təzdən yoxlayın.</p>}
            </form>
        </div>
    )
}

export default OrderPrice;