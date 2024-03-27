import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../../../../../../firebase/config";
import toast from "react-hot-toast";
import { IoIosRemoveCircle } from "react-icons/io";

const UpdateTeachers = ({ filteredData, teachers }) => {
  const [selectedUser, setSelectedUser] = useState("");

  console.log(teachers);
  const addTeacher = async (e) => {
    e.preventDefault();
    try {
      const singleUserRef = doc(db, "users", selectedUser);
      await updateDoc(singleUserRef, {
        userKey: process.env.REACT_APP_ADMIN_KEY,
      });
      toast.success("Əlavə olundu!");
    } catch (error) {
      toast.error("Xəta baş verdi!");
    }
  };

  const removeTeacher = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm("Əminsən?");

    if (!isConfirmed) {
      return;
    }
    try {
      const singleUserRef = doc(db, "users", selectedUser);
      await updateDoc(singleUserRef, {
        userKey: "",
      });
      toast.success("Müəllimliyi silindi!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error("Xəta baş verdi!");
    }
  };

  return (
    <>
      <form onSubmit={addTeacher}>
        <h3 className="py-2">Müəllim et</h3>
        <div className="row">
          <select
            defaultValue={"default"}
            className="col-6 m-0"
            onChange={(e) => setSelectedUser(e.target.value)}
            name="users"
          >
            <option value="default" disabled hidden>
              İstifadəçini seçin
            </option>
            {filteredData?.map((e) => (
              <option key={e?.name} value={e?.id}>
                {e.name + e.surname} | {e.username}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className={
              !selectedUser ? "btn-disabled col-6 my-2" : "btn-blue col-6 my-2"
            }
            disabled={!selectedUser}
          >
            {" "}
            Təsdiqlə{" "}
          </button>
        </div>
      </form>
      {teachers.length > 0 && (
        <form className="teachers" onSubmit={removeTeacher}>
          <h3 className="py-2">Müəllimlər</h3>
          <div className="list">
            {teachers?.map((e) => (
              <button
                className="btn btn-danger"
                onClick={() => setSelectedUser(e.id)}
                type="submit"
              >
                {e.name + e.surname} | {e.username} <IoIosRemoveCircle />
              </button>
            ))}
          </div>
        </form>
      )}
    </>
  );
};

export default UpdateTeachers;
