import React, { useState } from 'react';
import AdminPanel from './components/AdminPanel.jsx/AdminPanel';

const Admin = ({ level, setLevel }) => {
    const [password, setPassword] = useState();
    const [error, setError] = useState(false)
    const checkPass = (e) => {
        e.preventDefault();
        if (password === process.env.REACT_APP_ADMIN_PASS) {
            setError(false)
            setLevel("admin")
        } else if (password === process.env.REACT_APP_TEACHER_PASS) {
            setError(false)
            setLevel("teacher")
        } else {
            setError(true)
        }
    }
    return (
        <div className={`admin-panel py-5 px-5 col-12 ${level === "" && "col-lg-8"}`}>
            {level === "admin" ? (
                <AdminPanel isAdmin={true} />
            ) : level === "teacher" ? (
                <AdminPanel isAdmin={false} />
            ) : (
                <form onSubmit={(e) => checkPass(e)}>
                    <h2 className='pb-2'>Admin panel</h2>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Şifrə' name="password" className='col-6 sign-inputs' required />
                    {error && <p className='text-danger'>Şifrə yanlışdır.</p>}
                    <button className='btn-blue' type="submit">Giriş et</button>
                </form>
            )}
        </div>
    )
}

export default Admin;
