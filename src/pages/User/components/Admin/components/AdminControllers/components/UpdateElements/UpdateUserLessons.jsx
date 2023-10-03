import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../../../../../../firebase/config";

const UpdateUserLessons = ({ filteredData, videos }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedLesson, setSelectedLesson] = useState();
  const [error, setError] = useState("");

  const updateUserLessons = async (e) => {
    e.preventDefault();
    try {
      const singleUserRef = doc(db, "users", selectedUser);
      const userDoc = await getDoc(singleUserRef);
      const userData = userDoc.data();
      const currentLessons = userData.lessons || [];
      const newLessons = [...currentLessons, selectedLesson];
      if (!currentLessons?.includes(selectedLesson)) {
        await updateDoc(singleUserRef, {
          lessons: newLessons,
        });
        setError("Əlavə olundu!");
      } else {
        setError("Bu dərs istifadəçidə mövcuddur!");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const getUniqueGroups = (videos) => {
    const uniqueGroups = {};
    videos
      ?.filter((e) => e?.group)
      .forEach((item) => {
        uniqueGroups[item.group] = item;
      });
    return Object.values(uniqueGroups);
  };
  return (
    <form onSubmit={updateUserLessons}>
      <h3 className="py-2">İstifadəçiyə dərs əlavə et</h3>
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
        <select
          defaultValue={"default"}
          className="col-6 m-0"
          onChange={(e) => setSelectedLesson(e.target.value)}
          name="videos"
        >
          <option value="default" disabled hidden>
            Grupu seçin
          </option>
          {getUniqueGroups(videos).map((item) => (
            <option key={item?.title} value={item?.group}>
              {item?.group}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className={
            !selectedUser || !selectedLesson
              ? "btn-disabled col-6 my-2"
              : "btn-blue col-6 my-2"
          }
          disabled={!selectedUser || !selectedLesson}
        >
          {" "}
          Təsdiqlə{" "}
        </button>
        {!selectedUser || !selectedLesson ? (
          <p className="text-danger">İstifadəçini və Grupu seçməlisiniz</p>
        ) : null}
        {error && (
          <p
            className={
              error === "Əlavə olundu!" ? "text-success" : "text-danger"
            }
          >
            {error}
          </p>
        )}
      </div>
    </form>
  );
};

export default UpdateUserLessons;
