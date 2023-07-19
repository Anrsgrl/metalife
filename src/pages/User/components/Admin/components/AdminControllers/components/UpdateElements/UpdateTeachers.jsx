import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../../../../../../../firebase';

const UpdateTeachers = ({ filteredData }) => {
    const [selectedUser, setSelectedUser] = useState("");
    const [error, setError] = useState("")

    const addTeacher = async (e) => {
        e.preventDefault();
        try {
            const singleUserRef = doc(db, "users", selectedUser);
            await updateDoc(singleUserRef, {
                userKey: process.env.REACT_APP_ADMIN_KEY
            });
            setError("Əlavə olundu!")
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <form onSubmit={addTeacher}>
            <h3 className='py-2'>Müəllim əlavə et</h3>
            <div className="row">
                <select className='col-6 m-0' onChange={(e) => setSelectedUser(e.target.value)} name="users">
                    <option value="" selected disabled hidden>İstifadəçini seçin</option>
                    {filteredData?.map((item) => (
                        <option key={item?.name} value={item?.id}>{item?.username}</option>
                    ))}
                </select>
                <button type="submit" className={!selectedUser ? "btn-disabled col-6 my-2" : 'btn-blue col-6 my-2'} disabled={!selectedUser}> Təsdiqlə </button>
                {error && <p className={error === "Əlavə olundu!" ? "text-success" : "text-danger"}>{error}</p>}
            </div>
        </form>
    )
}

export default UpdateTeachers;