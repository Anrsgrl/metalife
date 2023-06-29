import React, { useState } from 'react';
import "./LessonVideo.scss";
import { useNavigate, useParams } from 'react-router-dom';
import { TiArrowBack } from "react-icons/ti";
import ReactPlayer from 'react-player';
import { useEffect } from 'react';
import { db } from "../../firebase";
import {
    collection,
    getDocs,
} from "firebase/firestore";

const LessonVideo = () => {
    const params = useParams();
    const navigate = useNavigate();
    // const video = videos.filter((e) => e.category === params.lessonPath && e.demo === true)
    const videosCollectionRef = collection(db, "videos");
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const getVideos = async () => {
            const data = await getDocs(videosCollectionRef);
            setVideos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getVideos();
    }, []);

    const paidVideos = videos.filter((e) => e.category === params.lessonPath && e.demo === false);
    console.log(paidVideos)

    return (
        <div className="lesson-videos container py-3">
            <button onClick={() => navigate(-1)} type="button" className='clean-button back'><TiArrowBack /></button>
            <div className="demo-videos-field py-2">
                <h3 className='pb-2'>Pulsuz videolar</h3>
                <div className="demo-videos py-3">
                    {videos.filter((e) => e.category === params.lessonPath && e.demo === true).length === 0 && <h5 className='py-2'>Yaxın zamanda əlavə olunacaq...</h5>}
                    {videos.filter((e) => e.category === params.lessonPath && e.demo === true) &&
                        videos.filter((e) => e.category === params.lessonPath && e.demo === true).map((e) => (
                            <ReactPlayer key={e.id} url={e.url} controls={true} className="single-video" config={{
                                playerOptions: {
                                    playsinline: true
                                }
                            }} />
                        ))
                    }
                </div>
            </div>
            <div className="paid-videos pt-5">
                <h3 className='pb-2'>Ödənişli videolar</h3>
                {paidVideos.length === 0 && <div className="paid-video py-2">
                    <h5>Ödənişli dərsləri almaq üçün</h5>
                    <button type="button" className='btn-blue'>Dərsi al</button>
                </div>}
                {paidVideos && videos.filter((e) => e.category === params.lessonPath && e.demo === false).map((e) => (
                    <ReactPlayer key={e.id} url={e.url} controls={true} className="single-video" config={{
                        playerOptions: {
                            playsinline: true
                        }
                    }} />
                ))}
            </div>
        </div>
    )
}

export default LessonVideo;