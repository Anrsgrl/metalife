import React from 'react';
import "./LessonVideo.scss";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TiArrowBack } from "react-icons/ti";
import ReactPlayer from 'react-player';
import { useAuth } from "../../firebase";

const LessonVideo = () => {
    const params = useParams();
    const { currentUser, videos } = useAuth();
    const navigate = useNavigate();

    const paidVideos = videos.filter((e) => e.hashtags?.includes(params.lessonPath) && e.demo === "false");
    const demoVideos = videos.filter((e) => e.hashtags?.includes(params.lessonPath) && e.demo === "true");
    return (
        <div className="lesson-videos container py-3">
            <button onClick={() => navigate(-1)} type="button" className='clean-button back'><TiArrowBack /></button>
            <div className="demo-videos-field py-2">
                <h3 className='pb-2'>Pulsuz videolar</h3>
                <div className="demo-videos py-3">
                    {currentUser ? (
                        <>
                            {demoVideos.length === 0 && <h5 className='py-2'>Yaxın zamanda əlavə olunacaq...</h5>}
                            {demoVideos &&
                                demoVideos?.map((e) => (
                                    <div className='single-video-part'>
                                        <ReactPlayer key={e.id} url={e.url} controls={true} className="single-video" config={{
                                            playerOptions: {
                                                playsinline: true
                                            }
                                        }} />
                                        <h6 className='pt-3'>{e.title}</h6>
                                    </div>
                                ))
                            }
                        </>
                    ) : (
                        <p>Pulsuz videoları izləmək üçün <Link to="/sign-in">giriş</Link> etməlisiniz. Profiliniz yoxdursa <Link to="/sign-up">qeydiyyatdan</Link> keçə bilərsiniz.</p>
                    )}
                </div>
            </div>
            <div className="paid-videos pt-5">
                <h3 className='pb-2'>Ödənişli videolar</h3>
                {paidVideos.length === 0 && <div className="paid-video py-2">
                    {currentUser?.emailVerified
                        ? (<><h5>Ödənişli dərsləri almaq üçün</h5><button type="button" className='btn-blue'>Dərsi al</button></>) : (<p>Dərsləri almaq üçün giriş etməli və emailin sizin olduğunu profil hissəsindən təstiqləməlisiniz.</p>)}
                </div>}
                {paidVideos && paidVideos.map((e) => (
                    <>
                        <ReactPlayer key={e.id} url={e.url} controls={true} className="single-video" config={{
                            playerOptions: {
                                playsinline: true
                            }
                        }} />
                    </>
                ))}
            </div>
        </div>
    )
}

export default LessonVideo;