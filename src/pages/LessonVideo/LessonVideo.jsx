import React from 'react';
import "./LessonVideo.scss";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TiArrowBack } from "react-icons/ti";
import { useAuth } from "../../firebase";
import SingleLessonVideo from './SingleLessonVideo';

const LessonVideo = () => {
    const params = useParams();
    const { currentUser, loggedUser, videos } = useAuth();
    const navigate = useNavigate();

    const paidVideos = videos.filter((e) => e.hashtags?.includes(params.lessonPath) && e.demo === "false" && e?.paid === "paid");
    const demoVideos = videos.filter((e) => e.hashtags?.includes(params.lessonPath) && e.demo === "true");
    
    let groupVideos = [];
    if (loggedUser?.lessons && loggedUser.lessons.length > 0) {
        groupVideos = videos.filter((e) => e.hashtags?.includes(params.lessonPath) && e.demo === "false" && e?.group === loggedUser?.lessons[0]);
    }
    
    return (
        <div className="lesson-videos container py-3">
            <button onClick={() => navigate(-1)} type="button" className='clean-button back'><TiArrowBack /></button>
            {groupVideos.length !== 0 && currentUser &&
                <div className="videos-field">
                    <h3 className='pb-2'>{loggedUser?.lessons[0]}</h3>
                    <div className="videos-list py-3">
                        <>
                            {groupVideos.length === 0 && <h5 className='py-2'>Yaxın zamanda əlavə olunacaq...</h5>}
                            {groupVideos &&
                                groupVideos?.map((e) => (
                                    <SingleLessonVideo url={e?.url} title={e?.title} />
                                ))
                            }
                        </>
                    </div>
                </div>}
            <div className="videos-field">
                <h3 className='pb-2'>Pulsuz videolar</h3>
                <div className="videos-list">
                    {currentUser ? (
                        <>
                            {demoVideos.length === 0 && <h5 className='py-2'>Yaxın zamanda əlavə olunacaq...</h5>}
                            {demoVideos &&
                                demoVideos?.map((e) => (
                                    <SingleLessonVideo url={e?.url} title={e?.title} />
                                ))
                            }
                        </>
                    ) : (
                        <p>Pulsuz videoları izləmək üçün <Link to="/sign-in">giriş</Link> etməlisiniz. Profiliniz yoxdursa <Link to="/sign-up">qeydiyyatdan</Link> keçə bilərsiniz.</p>
                    )}
                </div>
            </div>
            <div className="videos-field">
                <h3 className='pb-2'>Ödənişli videolar</h3>
                {paidVideos.length === 0 && <div className="paid-video py-2">
                    {currentUser?.emailVerified
                        ? (<><h5>Ödənişli dərsləri almaq üçün</h5><button type="button" className='btn-blue'>Dərsi al</button></>) : (<p>Dərsləri almaq üçün giriş etməli və emailin sizin olduğunu profil hissəsindən təstiqləməlisiniz.</p>)}
                </div>}
                <div className="videos-list">
                    {paidVideos && paidVideos.map((e) => (
                        <>
                            <SingleLessonVideo url={e?.url} title={e?.title} />
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LessonVideo;
