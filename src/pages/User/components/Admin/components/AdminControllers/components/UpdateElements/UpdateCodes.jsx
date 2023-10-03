import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { db } from "../../../../../../../../firebase/config";

const UpdateCodes = () => {
  const [errorMsg, setErrorMsg] = useState(false);
  const [checkEnt, setCheckEnt] = useState(false);
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
    if (!title || !content || !lang) {
      setErrorMsg(true);
      return;
    }
    try {
      const codesRef = await addDoc(codesCollectionRef.current, {
        time: serverTimestamp(),
        codeName: lang,
        title,
        content,
      });

      alert(`Yeni kod bu ID ilə əlavə edildi: ${codesRef.id}`);

      setCodeData({
        codeName: "",
        title: "",
        content: "",
      });
    } catch (error) {
      console.error("Xəta: ", error);
    }
  };

  const checkEnter = (event) => {
    if (event.key === "Enter" && checkEnt) {
      setCodeData({ ...codeData, content: event.target.value + "<p></p>" });
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
        <div className="blog-tools py-3">
          <button
            type="button"
            className="btn-white"
            onClick={() => addTagAndContent("h3", "py-2")}
          >
            Başlıq əlavə et
          </button>
          <button
            type="button"
            className="btn-white"
            onClick={() => addTagAndContent("h5", "py-2")}
          >
            Altbaşlıq əlavə et
          </button>
          <button
            type="button"
            className="btn-white"
            onClick={() => addTagAndContent("p")}
          >
            Abzas əlavə et
          </button>
          <button
            type="button"
            className="btn-white"
            onClick={() => addTagAndContent("code")}
          >
            Kod əlavə et
          </button>
          <button
            type="button"
            className="btn-white"
            onClick={() => addTagAndContent("pre")}
          >
            Kod arxaplanı əlavə et
          </button>
          <button
            type="button"
            className="btn-white"
            onClick={() => addTagAndContent("ul")}
          >
            Ul əlavə et
          </button>
          <button
            type="button"
            className="btn-white"
            onClick={() => addTagAndContent("li")}
          >
            Li əlavə et
          </button>
          <button
            type="button"
            className="btn-white"
            onClick={() => addTagAndContent("strong")}
          >
            Tünd yazı əlavə et
          </button>
        </div>
        <div className="pb-2 check-enter">
          <p className="m-0">Enter basıldıqda paragraf əlavə etmə:</p>
          <button
            type="button"
            className="clean-button"
            onClick={() => setCheckEnt(!checkEnt)}
          >
            {checkEnt ? "Açıq" : "Bağlı"}
          </button>
        </div>
        <textarea
          ref={textareaRef}
          onChange={handleChange}
          placeholder="Kontent"
          name="content"
          className="sign-text-area"
          value={content}
          required
          style={{ resize: "vertical" }}
          onKeyDown={checkEnter}
        ></textarea>
        <button
          className={disabledIf ? "btn-disabled" : "btn-blue"}
          type="submit"
          disabled={disabledIf}
        >
          Təsdiqlə
        </button>
        {errorMsg && (
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
              {preview ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </h2>
          {preview && (
            <div
              style={{ wordWrap: "break-word" }}
              className="py-5 blog-content"
              dangerouslySetInnerHTML={{ __html: codeData.content }}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateCodes;
