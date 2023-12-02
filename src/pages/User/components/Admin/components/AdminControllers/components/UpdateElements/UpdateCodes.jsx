import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { db } from "../../../../../../../../firebase/config";
import { editItems } from "../../../../../../../../data/editItems";
import toast from "react-hot-toast";

const UpdateCodes = () => {
  const [preview, setPreview] = useState(false);
  const [lang, setLang] = useState("");
  const textareaRef = useRef(null);

  const [codeData, setCodeData] = useState({
    title: "",
    codeName: "",
    content: "",
  });

  const codesCollectionRef = useRef(collection(db, "codes"));

  const { title, content } = codeData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCodeData({ ...codeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const codesRef = await addDoc(codesCollectionRef.current, {
        time: serverTimestamp(),
        codeName: lang,
        title,
        content,
      });

      toast.success(`Yeni kod bu ID ilə əlavə edildi: ${codesRef.id}`);

      setCodeData({
        codeName: "",
        title: "",
        content: "",
      });
    } catch (error) {
      console.error("Xəta: ", error);
      toast.error("Xəta baş verdi!");
    }
  };

  const addTagAndContent = (tag, className) => {
    if (!tag) return;
    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = textarea.value.substring(startPos, endPos);

    // Special case for pre tag with code inside
    if (tag === "pre") {
      const newContent =
        codeData.content.slice(0, startPos) +
        `<${tag} class="${className}"><code class='p-3' style='background: #f5f5f5ab; color:#333 !important'>${selectedText}</code></${tag}>` +
        codeData.content.slice(endPos);

      setCodeData({ ...codeData, content: newContent });
      setTimeout(() => {
        textarea.selectionStart = startPos;
        textarea.selectionEnd = endPos + 25 + selectedText.length;
      }, 0);
    } else {
      const newContent =
        codeData.content.slice(0, startPos) +
        (className ? `<${tag} class="${className}">` : `<${tag}>`) +
        `${selectedText}</${tag}>` +
        codeData.content.slice(endPos);

      setCodeData({ ...codeData, content: newContent });
      setTimeout(() => {
        textarea.selectionStart = startPos;
        textarea.selectionEnd = endPos + tag.length * 2 + 5;
      }, 0);
    }
  };

  const disabledIf =
    codeData.title?.length === 0 || content?.length === 0 || !lang;

  return (
    <div className="blog-write row">
      <form className="col-12 py-4" onSubmit={handleSubmit}>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          name="programming-lang"
          id="programming-lang"
        >
          <option value="" hidden>
            Programlaşdırma dilini seçin
          </option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="js">JS</option>
        </select>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Başlıq"
          name="title"
          className="sign-inputs"
          value={title}
          required
        />
        <div className="updateContent">
          <h3 className="py-2">Kontent əlavə etmə</h3>
          <div className="blog-tools py-3">
            {editItems.map((item) => (
              <button
                key={item.tag}
                type="button"
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
                    <h1 className="section-heading py-2">{title}</h1>
                    <div
                      style={{ wordWrap: "break-word" }}
                      className="py-3 blog-content"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
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

export default UpdateCodes;
