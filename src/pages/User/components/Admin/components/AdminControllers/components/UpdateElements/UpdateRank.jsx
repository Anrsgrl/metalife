import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../../../../../../firebase/config";
import toast from "react-hot-toast";

const UpdateTeachers = ({ filteredData }) => {
  const [selectedUser, setSelectedUser] = useState("");

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

  return (
    <form onSubmit={addTeacher}>
      <h3 className="py-2">Rütbə əlavə et</h3>
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
          {filteredData?.map((item) => (
            <option key={item?.name} value={item?.id}>
              {item?.username}
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
  );
};

export default UpdateTeachers;
