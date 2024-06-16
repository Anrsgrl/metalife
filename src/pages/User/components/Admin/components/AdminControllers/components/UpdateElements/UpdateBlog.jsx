import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import React, { useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useUsersList } from "../../../../../../../../firebase/getFunctions";
import { db } from "../../../../../../../../firebase/config";
import { MdDateRange } from "react-icons/md";
import { Link } from "react-router-dom";
import girl from "../../../../../../../../assets/images/girl.webp";
import UpdateHashtags from "./UpdateHashtags";
import { editItems } from "../../../../../../../../data/editItems";
import toast from "react-hot-toast";

const UpdateBlog = () => {
  const { currentUser, loggedUser } = useUsersList();
  const [errorMsg, setErrorMsg] = useState(false);
  const [hashtags, setHashtags] = useState([]);
  const [newHashtag, setNewHashtag] = useState("");
  const [preview, setPreview] = useState(false);
  const textareaRef = useRef(null);

  const [blogData, setBlogData] = useState({
    author: "",
    author_image: "",
    blog_image: "",
    title: "",
    content: "",
  });

  const blogsCollectionRef = useRef(collection(db, "blogs"));

  const { blog_image, title, content } = blogData;

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileSizeInBytes = file.size;
      const maxSizeInBytes = 512000;

      if (fileSizeInBytes > maxSizeInBytes) {
        e.target.value = null;
        setErrorMsg(true);
        return;
      } else {
        setErrorMsg(false);
      }

      const storage = getStorage();
      const fileRef = storageRef(storage, "blog-images/" + file.name);
      await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(fileRef);
      setBlogData({ ...blogData, blog_image: photoURL });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newBlogRef = await addDoc(blogsCollectionRef.current, {
        time: serverTimestamp(),
        author: `${loggedUser?.name} ${loggedUser?.surname}`,
        author_image: currentUser?.photoURL,
        blog_image,
        title,
        content,
        hashtags: hashtags,
      });

      toast.success(`Yeni blog bu ID ilə əlavə edildi: ${newBlogRef.id}`);

      // Reset form data
      setBlogData({
        author: "",
        author_image: "",
        blog_image: "",
        title: "",
        content: "",
      });
      setHashtags([]);
    } catch (error) {
      console.error("Error adding blog: ", error);
      toast.error("Xəta baş verdi!");
    }
  };

  const addTagAndContent = (tag, className) => {
    if (!tag) return;
    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = textarea.value.substring(startPos, endPos);

    if (tag === "pre") {
      const newContent =
        blogData.content.slice(0, startPos) +
        `<${tag} ${
          className ? `class="${className}` : ``
        }"><code class='p-3' style='background: #f5f5f5ab; color:#333 !important'>${selectedText}</code></${tag}>` +
        blogData.content.slice(endPos);

      setBlogData({ ...blogData, content: newContent });
      setTimeout(() => {
        textarea.selectionStart = startPos;
        textarea.selectionEnd = endPos + 25 + selectedText.length;
      }, 0);
    } else {
      const newContent =
        blogData.content.slice(0, startPos) +
        (className ? `<${tag} class="${className}">` : `<${tag}>`) +
        `${selectedText}</${tag}>` +
        blogData.content.slice(endPos);

      setBlogData({ ...blogData, content: newContent });
      setTimeout(() => {
        textarea.selectionStart = startPos;
        textarea.selectionEnd = endPos + tag.length * 2 + 5;
      }, 0);
    }
  };

  const disabledIf =
    title?.length === 0 ||
    hashtags?.length === 0 ||
    content?.length === 0 ||
    !blog_image;

  return (
    <div className="blog-write row">
      <UpdateHashtags
        state={newHashtag}
        setState={setNewHashtag}
        generalState={hashtags}
        setGeneralState={setHashtags}
      />
      <form className="col-12 py-2 blog-form" onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".webp, .JPEG, .JPG"
          id="imgInp"
          onChange={(e) => {
            handleImageUpload(e);
          }}
          required
        />
        {errorMsg && (
          <p className="text-danger">
            Seçilən şəklin ölçüsü 500 kilobaytdan az olmalıdır.
          </p>
        )}
        <input
          onChange={handleChange}
          type="text"
          placeholder="Başlıq"
          name="title"
          className="sign-inputs"
          value={title}
          required
        />
        <div className="updateContent pt-2">
          <h3 className="py-2">Kontent əlavə etmə</h3>
          <div className="blog-tools py-3">
            {editItems.map((item) => (
              <button
                type="button"
                key={item.tag}
                onClick={() => addTagAndContent(item.tag, item.class)}
              >
                {item.icon}
                <span className="description">{item.text}</span>
              </button>
            ))}
          </div>
          <textarea
            onChange={handleChange}
            ref={textareaRef}
            placeholder="Kontent"
            name="content"
            className="sign-text-area"
            value={content}
            required
            style={{ resize: "vertical" }}
          ></textarea>
          <button
            className={disabledIf ? "btn-disabled" : "btn-blue"}
            type="submit"
            disabled={disabledIf}
          >
            Təsdiqlə
          </button>
          {disabledIf && (
            <p className="text-danger py-2">Bütün hissələri doldurun.</p>
          )}
          <div className="preview">
            <h2 className="py-2">
              Önizləmə:{" "}
              <button
                type="button"
                className="clean-button"
                onClick={() => setPreview(!preview)}
              >
                {preview ? (
                  <AiFillEye className="animated" />
                ) : (
                  <AiFillEyeInvisible className="animated" />
                )}
              </button>
            </h2>
            {preview && (
              <div className="blog-detail container py-2 animated">
                <div className="row">
                  <div className="blog-left col-12 col-lg-9">
                    <img src={blog_image} className={`w-100 my-2`} alt="blog" />
                    <div className="blog-info">
                      <ul className="px-0 pt-1 m-0 hashtags">
                        {hashtags?.slice(0, 3).map((hashtag) => (
                          <li key={hashtag}>
                            <Link className="text-muted" to="#">
                              #{hashtag}
                            </Link>
                          </li>
                        ))}
                        {hashtags?.length === 0 && <li>#hashtags</li>}
                      </ul>
                      <div className="blog-time">
                        <MdDateRange />
                        XX.XX.XXXX
                      </div>
                    </div>
                    <h1 className="section-heading py-2">{title}</h1>
                    <div
                      style={{ wordWrap: "break-word" }}
                      className="py-3 blog-content"
                      dangerouslySetInnerHTML={{ __html: blogData.content }}
                    />
                    <div className="blog-footer pt-5">
                      <div className="author-side">
                        <img src={currentUser?.photoURL || girl} alt="" />
                        <div className="blog-footer-texts ps-2">
                          <h6>{loggedUser.name + " " + loggedUser.surname}</h6>
                          {loggedUser.name + loggedUser.surname ===
                            "NazirNadirov" && (
                            <p className="text-muted m-0">Qurucu, CEO</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
