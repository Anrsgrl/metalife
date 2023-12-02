import React from "react";
import { collection } from "firebase/firestore";
import { db } from "../../../../../../../../firebase/config";
import {
  useBlogsList,
  useCodeList,
  useVideosList,
} from "../../../../../../../../firebase/getFunctions";
import RemoveSingleItem from "./RemoveSingleItem";

const RemoveItems = ({ filteredData }) => {
  const blogs = useBlogsList();
  const videos = useVideosList();
  const codes = useCodeList();
  const blogsCollectionRef = collection(db, "blogs");
  const videosCollectionRef = collection(db, "videos");
  const usersCollectionRef = collection(db, "users");
  const codesCollectionRef = collection(db, "codes");

  return (
    <div className="remove-items-field py-5">
      <h2 className="py-3">Məlumatları silmək</h2>
      <div className="remove-items">
        <RemoveSingleItem
          name="bloq"
          colRef={blogsCollectionRef}
          array={blogs}
        />
        <RemoveSingleItem
          name="video"
          colRef={videosCollectionRef}
          array={videos}
        />
        <RemoveSingleItem
          name="kod"
          colRef={codesCollectionRef}
          array={codes}
        />
        <RemoveSingleItem
          name="istifadəçi"
          colRef={usersCollectionRef}
          array={filteredData}
        />
      </div>
    </div>
  );
};

export default RemoveItems;
