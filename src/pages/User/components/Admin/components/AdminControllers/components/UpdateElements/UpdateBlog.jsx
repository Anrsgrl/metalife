import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';
import React, { useRef, useState } from 'react';
import { db, useAuth } from '../../../../../../../../firebase';
import { frontendHashtags, backendHashtags, fullstackHashtags, uidesignHashtags, interiorDesignHashtags, threeDHashtags } from '../../../../../../../../data/updateHashtags';

const UpdateBlog = () => {
    const { currentUser, loggedUser } = useAuth();
    const [errorMsg, setErrorMsg] = useState(false);
    const [hashtags, setHashtags] = useState([]);
    const [newHashtag, setNewHashtag] = useState("")
    const [showHelperHash, setShowHelperHash] = useState(false)
    const [checkEnt, setCheckEnt] = useState(false)

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
                setErrorMsg(false)
            }

            const storage = getStorage();
            const fileRef = storageRef(storage, 'blog-images/' + file.name);
            await uploadBytes(fileRef, file);
            const photoURL = await getDownloadURL(fileRef);
            setBlogData({ ...blogData, blog_image: photoURL });
        }
    };

    const handleHashtagsSubmit = (e) => {
        e.preventDefault();
        if (newHashtag !== "") {
            setHashtags([...hashtags, newHashtag.replace(/\s/g, '')]);;
        }
        setNewHashtag("")
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
                hashtags: hashtags
            });

            alert(`Yeni blog bu ID ilə əlavə edildi: ${newBlogRef.id}`);

            // Reset form data
            setBlogData({
                author: "",
                author_image: "",
                blog_image: "",
                title: "",
                content: ""
            });
            setHashtags([]);
        } catch (error) {
            console.error("Error adding blog: ", error);
        }
    };

    const checkEnter = (event) => {
        if (event.key === 'Enter' && checkEnt) {
            setBlogData({ ...blogData, content: event.target.value + "<p></p>" })
        }
    }

    const disabledIf = title?.length === 0 || hashtags?.length === 0 || content?.length === 0 || !blog_image

    return (
        <div className="blog-write row">
            <form className='py-3 col-12' onSubmit={handleHashtagsSubmit}>
                <h3 className='py-2'>Hashtag əlavə etmə</h3>
                <input
                    onChange={(e) => setNewHashtag(e.target.value.toLocaleLowerCase())}
                    type="text"
                    placeholder="hashtags"
                    name="hashtags"
                    className="sign-inputs m-0"
                    value={newHashtag}
                    required
                />
                {hashtags && <p className='text-muted'>{hashtags?.map((tag) => `#${tag}`).join(", ")}</p>}
                <div className="hashtags-controllers col-12">
                    <button className='btn-blue' type="submit">Əlavə et</button>
                    <button className='btn-blue' type="button" onClick={() => setHashtags([])}>Hamısını sil</button>
                    <button className={showHelperHash ? "btn-white" : "btn-blue"} type="button" onClick={() => setShowHelperHash(!showHelperHash)}>{showHelperHash ? "Köməkçi tagları gizlət" : "Köməkçi tagları göstər"}</button>
                </div>
                {showHelperHash &&
                    <div className="helper-hashtags col-12 py-2">
                        <button type='button' className='btn-white' onClick={() => setHashtags(frontendHashtags)}>Frontend hashtags</button>
                        <button type='button' className='btn-white' onClick={() => setHashtags(backendHashtags)}>Backend hashtags</button>
                        <button type='button' className='btn-white' onClick={() => setHashtags(fullstackHashtags)}>Fullstack hashtags</button>
                        <button type='button' className='btn-white' onClick={() => setHashtags(uidesignHashtags)}>UI/UIX hashtags</button>
                        <button type='button' className='btn-white' onClick={() => setHashtags(interiorDesignHashtags)}>Interior hashtags</button>
                        <button type='button' className='btn-white' onClick={() => setHashtags(threeDHashtags)}>3D Modelling hashtags</button>
                    </div>
                }
            </form>
            <form className='col-12 py-4' onSubmit={handleSubmit}>
                <h3>Blog barədə məlumatlar</h3>
                <label htmlFor="blogImg">Blog şəkli -- </label>
                <input
                    type="file"
                    accept=".PNG, .JPEG, .JPG"
                    id='blogImg'
                    onChange={handleImageUpload}
                    required
                    className='py-2'
                />
                {errorMsg && <p className='text-danger'>Seçilən şəklin ölçüsü 500 kilobaytdan az olmalıdır.</p>}
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
                    <button type='button' className='btn-white' onClick={() => setBlogData({ ...blogData, content: blogData.content + "<h3 class='py-2'></h3>" })}>Başlıq əlavə et</button>
                    <button type='button' className='btn-white' onClick={() => setBlogData({ ...blogData, content: blogData.content + "<h5 class='py-2'></h5>" })}>Altbaşlıq əlavə et</button>
                    <button type='button' className='btn-white' onClick={() => setBlogData({ ...blogData, content: blogData.content + "<p></p>" })}>Paragraf əlavə et</button>
                </div>
                <div className="pb-2 check-enter">
                    <p className='m-0'>Enter basıldıqda paragraf əlavə etmə:</p>
                    <button type='button' className='clean-button' onClick={() => setCheckEnt(!checkEnt)}>{checkEnt ? "Açıq" : "Bağlı"}</button>
                </div>
                <textarea
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
                {disabledIf && <p className='text-danger'>Bütün hissələri doldurun.</p>}
            </form>
        </div>
    );
};

export default UpdateBlog;


