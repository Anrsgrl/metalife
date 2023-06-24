import React from 'react';
import InputMask from 'react-input-mask'
import { useState } from 'react';
import { TfiReload } from "react-icons/tfi";

const OrderPrice = () => {
    const [tel, setTel] = useState();
    const [change, setChange] = useState(false);
    return (
        <div className="order-price container py-3">
            <h2 className='py-4'>Qiymət təklifinin alınması</h2>
            <form action="">
                <div className="row">
                    <div className="form-element col-12">
                        <textarea placeholder='Necə bir sayt istəyirsiniz?' className='sign-text-area' name="describe" cols="30" rows="10"></textarea>
                    </div>
                    <div className="form-element col-12 col-md-6"><input type="text" placeholder='Adınız' name="name" className='sign-inputs' required /></div>
                    <div className="form-element col-12 col-md-6"><input type="text" placeholder='Şirkətin adı' name="company" className='sign-inputs' required /></div>
                    {change ? (<div className="form-element col-12 col-md-6">
                        <InputMask
                            className='sign-inputs'
                            mask="+999\-99-999-99-99"
                            placeholder="+XXX-XX-XXX-XX-XX"
                            value={tel || ''}
                            onChange={(e) => setTel(e.target.value)}
                            required
                        ></InputMask>
                        <button onClick={() => setChange(!change)} type='button' className='clean-button btn-show'>{change ? (<TfiReload />) : (<TfiReload />)}</button>
                    </div>) : (<div className="form-element col-12 col-md-6">
                        <div className="form-element col-12"><input type="email" placeholder='E-poçt' name="email" className='sign-inputs' required /></div>
                        <button onClick={() => setChange(!change)} type='button' className='clean-button btn-show'>{change ? (<TfiReload />) : (<TfiReload />)}</button>
                    </div>)}
                    <div className="col-md-6 form-element">
                        <button className='btn-blue sign-inputs'>Qiymət təklifi al</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default OrderPrice;