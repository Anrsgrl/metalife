import React, { useState } from "react";
import { collection } from "firebase/firestore";
import { db } from "../../../../../../../../firebase/config";
import {
  useBlogsList,
  useUsersList,
  useVideosList,
} from "../../../../../../../../firebase/getFunctions";
import { removeItem } from "../../../../../../../../firebase/controllers";

const RemoveItems = () => {
  const [selectedItemId, setSelectedItemId] = useState("");
  const blogs = useBlogsList();
  const videos = useVideosList();
  const { userData } = useUsersList();
  const blogsCollectionRef = collection(db, "blogs");
  const videosCollectionRef = collection(db, "videos");
  const usersCollectionRef = collection(db, "users");

  return (
    <div className="remove-items-field py-5">
      <h2 className="py-3">Məlumatları silmək</h2>
      <div className="remove-items">
        <div className="row remove-blogs">
          <select
            defaultValue={"default"}
            onChange={(e) => setSelectedItemId(e.target.value)}
            className="col-12 col-md-5"
          >
            <option value="default" disabled hidden>
              Bir blog seçin
            </option>
            {blogs?.map((e) => (
              <option key={e?.id} value={e?.id}>
                {e?.title}
              </option>
            ))}
          </select>
          <button
            disabled={!selectedItemId}
            onClick={() => removeItem(blogsCollectionRef, selectedItemId)}
            className="btn btn-danger col-12 col-md-5"
          >
            sil
          </button>
        </div>

        <div className="row remove-videos">
          <select
            defaultValue={"default"}
            onChange={(e) => setSelectedItemId(e.target.value)}
            className="col-12 col-md-5"
          >
            <option value="default" disabled hidden>
              Bir video seçin
            </option>
            {videos?.map((e) => (
              <option key={e?.id} value={e?.id}>
                {e?.title}
              </option>
            ))}
          </select>
          <button
            disabled={!selectedItemId}
            onClick={() => removeItem(videosCollectionRef, selectedItemId)}
            className="btn btn-danger col-12 col-md-5"
          >
            sil
          </button>
        </div>

        <div className="row remove-users">
          <select
            defaultValue={"default"}
            onChange={(e) => setSelectedItemId(e.target.value)}
            className="col-12 col-md-5"
          >
            <option value="default" disabled hidden>
              Bir istifadəçi seçin
            </option>
            {userData
              ?.filter((e) => e?.userKey !== process.env.REACT_APP_ADMIN_KEY)
              .map((user) => (
                <option key={user?.id} value={user?.id}>
                  {user?.name} {user?.surname}
                </option>
              ))}
          </select>
          <button
            disabled={!selectedItemId}
            onClick={() => removeItem(usersCollectionRef, selectedItemId)}
            className="btn btn-danger col-12 col-md-5"
          >
            sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveItems;
