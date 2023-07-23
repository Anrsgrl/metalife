import { addDoc, collection } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { db } from '../../../../../../../../firebase';
import { backendHashtags, frontendHashtags, fullstackHashtags, interiorDesignHashtags, threeDHashtags, uidesignHashtags } from '../../../../../../../../data/updateHashtags';

const UpdateVideos = () => {
    const [title, setTitle] = useState()
    const [hashtags, setHashtags] = useState([])
    const [newHashtag, setNewHashtag] = useState()
    const [group, setGroup] = useState()
    const [demo, setDemo] = useState("")
    const [url, setUrl] = useState()
    const [showHelperHash, setShowHelperHash] = useState(false)

    const parseVideoIdFromLink = (link) => {
        const url = new URL(link);
        const videoId = url.searchParams.get("v");
        return videoId;
    };
    const disabledIf = title?.length === 0 || hashtags?.length === 0 || group?.length === 0 || url?.length === 0 || demo === "";

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
            const videoId = parseVideoIdFromLink(url);
            if (demo) {
                const newBlogRef = await addDoc(videosCollectionRef.current, {
                    title,
                    hashtags,
                    url: videoId,
                    demo,
                });
                alert(`Yeni video bu ID ilə əlavə edildi: ${newBlogRef.id}`);
            } else {
                const newVideoRef = await addDoc(videosCollectionRef.current, {
                    title,
                    hashtags,
                    url: videoId,
                    demo,
                    group,
                });
                alert(`Yeni video bu ID ilə əlavə edildi: ${newVideoRef.id}`);
            }
            setDemo("")
            setTitle("")
            setHashtags([])
            setGroup("")
            setDemo("")
            setUrl("")


        } catch (error) {
            alert("Error adding video: ", error.message);
        }
    };

    return (
        <>
            <h3 className='py-2'>Yeni dərs əlavə et</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="row">
                    <select defaultValue={"default"} className='col-6 m-0 py-2' onChange={(e) => setDemo(e.target.value)} name="users">
                        <option value="default" disabled hidden>Pulsuz videodur?</option>
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
                        {demo !== "true" && (
                            <input
                                value={group}
                                type="text"
                                placeholder='Video aid olduğu grup'
                                name="title"
                                className='sign-inputs'
                                onChange={(e) => setGroup(e.target.value)}
                                required
                            />
                        )}
                    </div>
                    <button type='submit' className={disabledIf ? "btn-disabled" : "btn-blue"} disabled={disabledIf}>Təsdiqlə</button>
                </div>
            </form>
            <form className='py-3 col-12' onSubmit={(e) => handleHashtagsSubmit(e)}>
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
                <div className="hashtags-controllers col-12 row m-0">
                    <button className='btn-blue col-12 col-md-4' type="submit">Əlavə et</button>
                    <button className='btn-blue col-12 col-md-4' type="button" onClick={() => setHashtags([])}>Hamısını sil</button>
                    <button className={`${showHelperHash ? "btn-white" : "btn-blue"} col-12 col-md-4`} type="button" onClick={() => setShowHelperHash(!showHelperHash)}>{showHelperHash ? "Köməkçi tagları gizlət" : "Köməkçi tagları göstər"}</button>
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
            {disabledIf && <p className='text-danger'>Bütün hissələri doldurun.</p>}
        </>

    )
}

export default UpdateVideos;