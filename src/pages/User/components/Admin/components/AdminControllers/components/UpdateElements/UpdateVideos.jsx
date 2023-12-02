import { addDoc, collection } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { db } from "../../../../../../../../firebase/config";
import UpdateHashtags from "./UpdateHashtags";
import toast from "react-hot-toast";

const UpdateVideos = () => {
  const [title, setTitle] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [newHashtag, setNewHashtag] = useState("");
  const [group, setGroup] = useState("");
  const [demo, setDemo] = useState("");
  const [url, setUrl] = useState("");

  const parseVideoIdFromLink = (link) => {
    const url = new URL(link);
    const videoId = url.searchParams.get("v");
    return videoId;
  };
  const disabledIf =
    title?.length === 0 ||
    hashtags?.length === 0 ||
    url?.length === 0 ||
    demo === "";

  const videosCollectionRef = useRef(collection(db, "videos"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const videoId = parseVideoIdFromLink(url);
      if (demo === "true") {
        const newBlogRef = await addDoc(videosCollectionRef.current, {
          title,
          hashtags,
          url: videoId,
          demo,
        });
        toast.success(`Yeni video bu ID ilə əlavə edildi: ${newBlogRef.id}`);
      } else {
        const newVideoRef = await addDoc(videosCollectionRef.current, {
          title,
          hashtags,
          url: videoId,
          demo,
          group,
        });
        toast.success(`Yeni video bu ID ilə əlavə edildi: ${newVideoRef.id}`);
      }
      setDemo("");
      setTitle("");
      setHashtags([]);
      setGroup("");
      setDemo("");
      setUrl("");
    } catch (error) {
      console.error("Error adding video: ", error);
      toast.error("Xəta baş verdi!");
    }
  };

  return (
    <>
      <h3 className="py-2">Yeni dərs əlavə et</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <select
            defaultValue={"default"}
            className="col-6 m-0 py-2"
            onChange={(e) => setDemo(e.target.value)}
            name="users"
          >
            <option value="default" disabled hidden>
              Pulsuz videodur?
            </option>
            <option value="true">Bəli</option>
            <option value="false">Xeyr</option>
          </select>
          <div className="form-element col-12 col-md-6">
            <input
              value={title}
              type="text"
              placeholder="Video başlığı"
              name="title"
              className="sign-inputs"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-element col-12 col-md-6">
            <input
              value={url}
              type="text"
              placeholder="Video linki"
              name="url"
              className="sign-inputs"
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div className="form-element col-12 col-md-6">
            {demo !== "true" ? (
              <input
                value={group}
                type="text"
                placeholder="Video aid olduğu grup"
                name="title"
                className="sign-inputs"
                onChange={(e) => setGroup(e.target.value)}
                required
              />
            ) : (
              ""
            )}
          </div>
          <button
            type="submit"
            className={disabledIf ? "btn-disabled" : "btn-blue"}
            disabled={disabledIf}
          >
            Təsdiqlə
          </button>
        </div>
      </form>
      <UpdateHashtags
        state={newHashtag}
        setState={setNewHashtag}
        generalState={hashtags}
        setGeneralState={setHashtags}
      />
      {disabledIf ? (
        <p className="text-danger">Bütün hissələri doldurun.</p>
      ) : (
        ""
      )}
    </>
  );
};

export default UpdateVideos;
