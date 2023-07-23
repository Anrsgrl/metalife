import React, { useState } from 'react';
import "./LessonVideo.scss";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TiArrowBack } from "react-icons/ti";
import { useAuth } from "../../firebase";
import YouTube from 'react-youtube';
import { BiTime } from "react-icons/bi";

const LessonVideo = () => {
    const params = useParams();
    const { currentUser, loggedUser, videos } = useAuth();
    const [videoDuration, setVideoDuration] = useState(null);
    const navigate = useNavigate();

    const onPlayerReady = (event) => {
        const player = event.target;
        const duration = player.getDuration();
        setVideoDuration(duration);
    };

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const paidVideos = videos.filter((e) => e.hashtags?.includes(params.lessonPath) && e.demo === "false");
    const demoVideos = videos.filter((e) => e.hashtags?.includes(params.lessonPath) && e.demo === "true");
    const groupVideos = videos.filter((e) => e.hashtags?.includes(params.lessonPath) && e.demo === "false" && e?.group === loggedUser?.lessons[0]);
    return (
        <div className="lesson-videos container py-3">
            <button onClick={() => navigate(-1)} type="button" className='clean-button back'><TiArrowBack /></button>
            {groupVideos.length !== 0 &&
                <div className="group-videos py-5">
                    <h3 className='pb-2'>{loggedUser?.lessons[0]}</h3>
                    <>
                        {groupVideos.length === 0 && <h5 className='py-2'>Yaxın zamanda əlavə olunacaq...</h5>}
                        {groupVideos &&
                            groupVideos?.map((e) => (
                                <div className='single-video-part col-12 col-md-9 col-lg-6'>
                                    <YouTube videoId={e.url} className={"w-100 h-100"} iframeClassName={"w-100 h-100"} onReady={onPlayerReady} />
                                    <div className="video-info px-3 py-2">
                                        <h6>{e.title}</h6>
                                        {videoDuration !== null && <p className='video-time'><BiTime /> {formatTime(videoDuration)}</p>}
                                    </div>
                                </div>
                            ))
                        }
                    </>
                </div>}
            <div className="demo-videos-field py-2">
                <h3 className='pb-2'>Pulsuz videolar</h3>
                <div className="demo-videos py-3 h-100 w-100">
                    {currentUser ? (
                        <>
                            {demoVideos.length === 0 && <h5 className='py-2'>Yaxın zamanda əlavə olunacaq...</h5>}
                            {demoVideos &&
                                demoVideos?.map((e) => (
                                    <div className='single-video-part col-12 col-md-9 col-lg-6'>
                                        <YouTube videoId={e.url} className={"w-100 h-100"} iframeClassName={"w-100 h-100"} onReady={onPlayerReady} />
                                        <div className="video-info px-3 py-2">
                                            <h6>{e.title}</h6>
                                            {videoDuration !== null && <p className='video-time'><BiTime /> {formatTime(videoDuration)}</p>}
                                        </div>
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
                        <div className='single-video-part col-12 col-md-9 col-lg-6'>
                            <YouTube videoId={e.url} className={"w-100 h-100"} iframeClassName={"w-100 h-100"} onReady={onPlayerReady} />
                            <div className="video-info px-3 py-2">
                                <h6>{e.title}</h6>
                                {videoDuration !== null && <p className='video-time'><BiTime /> {formatTime(videoDuration)}</p>}
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default LessonVideo;