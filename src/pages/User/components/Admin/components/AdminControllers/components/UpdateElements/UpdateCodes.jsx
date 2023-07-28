import { collection, addDoc } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { db } from '../../../../../../../../firebase';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const UpdateCodes = () => {
    const [errorMsg, setErrorMsg] = useState(false);
    const [checkEnt, setCheckEnt] = useState(false)
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
        if (!title || !content) {
            setErrorMsg(true);
            return;
        }
        try {
            const codesRef = await addDoc(codesCollectionRef.current, {
                codeName: lang,
                title,
                content,
            });

            alert(`Yeni kod bu ID ilə əlavə edildi: ${codesRef.id}`);

            setCodeData({
                codeName: "",
                title: "",
                content: ""
            });
        } catch (error) {
            console.error("Xəta: ", error);
        }
    };

    const checkEnter = (event) => {
        if (event.key === 'Enter' && checkEnt) {
            setCodeData({ ...codeData, content: event.target.value + "<p></p>" })
        }
    }
    const addCodeTag = (tag) => {
        if (!tag) return;
        const textarea = textareaRef.current;
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;

        let newContent;
        if (tag === "li") {
            newContent = codeData.content.slice(0, startPos) + `<${tag}></${tag}>` + codeData.content.slice(endPos);
        } else {
            newContent = codeData.content.slice(0, startPos) + `<code>&lt;${tag}&gt;</code>` + codeData.content.slice(endPos);
        }

        setCodeData({ ...codeData, content: newContent });
        setTimeout(() => {
            textarea.selectionStart = startPos + (tag === "li" ? tag.length + 2 : 18);
            textarea.selectionEnd = startPos + (tag === "li" ? tag.length + 2 : 18);
        }, 0);
    };
    const disabledIf = title?.length === 0 || content?.length === 0 || !lang
    return (
        <div className="blog-write row">
            <form className='col-12 py-4' onSubmit={handleSubmit}>
                <select value={lang} onChange={(e) => setLang(e.target.value)} name="programming-lang" id="programming-lang">
                    <option value="" hidden>Programlaşdırma dilini seçin</option>
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
                    <button type='button' className='btn-white' onClick={() => setCodeData({ ...codeData, content: codeData.content + "<h3 class='py-2'></h3>" })}>Başlıq əlavə et</button>
                    <button type='button' className='btn-white' onClick={() => setCodeData({ ...codeData, content: codeData.content + "<h5 class='py-2'></h5>" })}>Altbaşlıq əlavə et</button>
                    <button type='button' className='btn-white' onClick={() => setCodeData({ ...codeData, content: codeData.content + "<p></p>" })}>Paragraf əlavə et</button>
                    <button type='button' className='btn-white' onClick={() => addCodeTag("code")}>Kod əlavə et</button>
                    <button type='button' className='btn-white' onClick={() => setCodeData({ ...codeData, content: codeData.content + "<ul style='list-style: circle;'></ul>" })}>ul əlavə et</button>
                    <button type='button' className='btn-white' onClick={() => addCodeTag("li")}>List əlavə et</button>
                </div>
                <div className="pb-2 check-enter">
                    <p className='m-0'>Enter basıldıqda paragraf əlavə etmə:</p>
                    <button type='button' className='clean-button' onClick={() => setCheckEnt(!checkEnt)}>{checkEnt ? "Açıq" : "Bağlı"}</button>
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
                <button className={disabledIf ? "btn-disabled" : 'btn-blue'} type="submit" disabled={disabledIf}>Təsdiqlə</button>
                {errorMsg && <p className='text-danger py-2'>Bütün hissələri doldurun.</p>}

                <div className="preview">
                    <h2 className='py-2'>Önizləmə: <button type='button' className='clean-button' onClick={() => setPreview(!preview)}>{preview ? <AiFillEye /> : <AiFillEyeInvisible />}</button></h2>
                    {preview && <div style={{ wordWrap: 'break-word' }} className="py-5 blog-content" dangerouslySetInnerHTML={{ __html: codeData.content }} />}
                </div>
            </form>
        </div>
    );
};

export default UpdateCodes;
