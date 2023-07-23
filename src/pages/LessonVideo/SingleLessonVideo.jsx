import React, { useState } from 'react';
import { BiTime } from 'react-icons/bi';
import YouTube from 'react-youtube';

const SingleLessonVideo = (props) => {
    const { title, url } = props;
    const [videoDuration, setVideoDuration] = useState(null);
    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    const onPlayerReady = (event) => {
        const player = event.target;
        const duration = player.getDuration();
        setVideoDuration(duration);
    };
    return (
        <div className='single-video-part col-12 col-md-9 col-lg-6'>
            <YouTube videoId={url} className={"w-100 h-100"} iframeClassName={"w-100 h-100"} onReady={onPlayerReady} />
            <div className="video-info px-3 py-2">
                <h6>{title}</h6>
                {videoDuration !== null && <p className='video-time'><BiTime /> {formatTime(videoDuration)}</p>}
            </div>
        </div>
    )
}

export default SingleLessonVideo;