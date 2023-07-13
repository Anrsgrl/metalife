import { addDoc, collection } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { db } from '../../../../../../../../firebase';

const UpdateVideos = () => {
    const [title, setTitle] = useState()
    const [hashtags, setHashtags] = useState([])
    const [newHashtag, setNewHashtag] = useState()
    const [group, setGroup] = useState()
    const [demo, setDemo] = useState(false)
    const [url, setUrl] = useState()


    const disabledIf = title?.length === 0 || hashtags?.length === 0 || group?.length === 0 || url?.length === 0;

    const handleHashtagsSubmit = (e) => {
        e.preventDefault();
        if (newHashtag !== "") {
            setHashtags([...hashtags, newHashtag]);;
        }
        setNewHashtag("")
    };

    const videosCollectionRef = useRef(collection(db, "videos"));

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (demo) {
                const newBlogRef = await addDoc(videosCollectionRef.current, {
                    title,
                    hashtags,
                    url,
                    demo,
                });
                alert(`Yeni blog bu ID ilə əlavə edildi: ${newBlogRef.id}`);
            } else {
                const newVideoRef = await addDoc(videosCollectionRef.current, {
                    title,
                    hashtags,
                    url,
                    demo,
                    group,
                });
                alert(`Yeni video bu ID ilə əlavə edildi: ${newVideoRef.id}`);
            }
            setTitle("")
            setHashtags([])
            setGroup("")
            setDemo("")
            setUrl("")


        } catch (error) {
            console.error("Error adding blog: ", error);
        }
    };

    return (
        <>
            <h3 className='py-2'>Yeni dərs əlavə et</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="row">
                    <select className='col-6 m-0 py-2' onChange={(e) => setDemo(e.target.value)} name="users">
                        <option value="" selected disabled hidden>Pulsuz videodur?</option>
                        <option value="true">Bəli</option>
                        <option value="false">Xeyr</option>
                    </select>
                    <div className="form-element col-12 col-md-6">
                        <input value={title} type="text" placeholder='Video başlığı' name="title" className='sign-inputs' onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="form-element col-12 col-md-6">
                        <input value={url} type="text" placeholder='Video linki' name="url" className='sign-inputs' onChange={(e) => setUrl(e.target.value)} required />
                    </div>
                    <div className="form-element col-12 col-md-6">
                        <input value={demo !== "true" ? group : ""} disabled={demo === "true"} type="text" placeholder='Video aid olduğu grup' name="title" className='sign-inputs' onChange={(e) => setGroup(e.target.value)} required />
                    </div>
                    <button type='submit' className={disabledIf ? "btn-disabled" : "btn-blue"} disabled={disabledIf}>Submit</button>
                </div>
            </form>
            <form className='py-3 col-12' onSubmit={(e) => handleHashtagsSubmit(e)}>
                <h3 className='py-2'>Hashtag əlavə etmə</h3>
                <input
                    onChange={(e) => setNewHashtag(e.target.value)}
                    type="text"
                    placeholder="hashtags"
                    name="hashtags"
                    className="sign-inputs m-0"
                    value={newHashtag}
                    required
                />
                {hashtags && <p className='text-muted'>{hashtags?.map((tag) => `#${tag}`).join(", ")}</p>}
                <div className="d-flex">
                    <button className='btn-blue' type="submit">Əlavə et</button>
                    <button className='btn-white ms-2' type="button" onClick={() => setHashtags([])}>Hamısını sil</button>
                </div>
            </form>
            {disabledIf && <p className='text-danger'>Bütün hissələri doldurun.</p>}
        </>

    )
}

export default UpdateVideos;