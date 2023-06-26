import React from 'react';
import "./LessonVideo.scss";
import { videos } from '../../data/Videos';
import { useNavigate, useParams } from 'react-router-dom';
import { TiArrowBack } from "react-icons/ti";
import ReactPlayer from 'react-player';

const LessonVideo = () => {
    const params = useParams();
    const navigate = useNavigate();
    const video = videos.filter((e) => e.category === params.lessonPath && e.demo === true)
    console.log(video)
    return (
        <div className="lesson-videos container py-3">
            <button onClick={() => navigate(-1)} type="button" className='clean-button back'><TiArrowBack /></button>
            <div className="demo-videos-field py-2">
                <h3 className='pb-2'>Pulsuz videolar</h3>
                <div className="demo-videos py-3">
                    {video.length === 0 && <h5 className='py-2'>Yaxın zamanda əlavə olunacaq...</h5>}
                    {video && video.map((e) => (
                        <ReactPlayer light={<img src={e.image} alt='Thumbnail' />} url={e.url} controls={true} className="single-video" />
                    ))}
                </div>
            </div>
            <div className="paid-videos pt-5">
                <h3 className='pb-2'>Ödənişli videolar</h3>
                <div className="paid-video py-2">
                    <h5>Ödənişli dərsləri almaq üçün</h5>
                    <button type="button" className='btn-blue'>Dərsi al</button>
                </div>
            </div>
        </div>
    )
}

export default LessonVideo;