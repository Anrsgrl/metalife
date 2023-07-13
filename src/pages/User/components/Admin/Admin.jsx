import React, { useState } from 'react';
import BlogForm from "../../../Blogs/components/BlogForm/BlogForm";
import AdminPanel from './components/AdminPanel.jsx/AdminPanel';

const Admin = ({ user }) => {
    const [password, setPassword] = useState();
    const [level, setLevel] = useState("")
    const checkPass = (e) => {
        e.preventDefault();
        if (password === process.env.REACT_APP_ADMIN_PASS) {
            setLevel("admin")
        } else if (password === process.env.REACT_APP_TEACHER_PASS) {
            setLevel("teacher")
        } else {
            setLevel("false")
        }
    }
    return (
        <div className="admin-panel py-5 px-5 col-12 col-lg-8">
            {level === "admin" ? (
                <BlogForm />
            ) : level === "teacher" ? (
                <AdminPanel />
            ) : (
                <form onSubmit={(e) => checkPass(e)}>
                    <h2 className='pb-2'>Admin panel</h2>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Şifrə' name="password" className='col-6 sign-inputs' required />
                    {level === "false" && <p className='text-danger'>Şifrə yanlışdır.</p>}
                    <button className='btn-blue' type="submit">Giriş et</button>
                </form>
            )}
        </div>
    )
}

export default Admin;
