import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../firebase';
import ReactPlayer from 'react-player';
import { FadeLoader } from 'react-spinners';
import SingleBlog from '../../components/SingleBlog/SingleBlog';

const Search = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchItemValue = searchParams.get("searchItem");
    const { videos, blogs, currentUser } = useAuth()
    const filteredVideos = videos.filter((e) => e.demo === "true" && e.hashtags?.includes(searchItemValue));
    const filteredBlogs = blogs.filter((e) => e.hashtags?.includes(searchItemValue));

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
    }, []);
    return (
        <div className="search container py-5">
            {searchItemValue ? (
                <>
                    <h3 className='py-4 text-center'><span style={{ color: "#4A4AB5" }}>"{searchItemValue}"</span> üzrə axtarış</h3>
                    <div className="lesson-videos">
                        <div className="demo-videos-field py-2">
                            <h3 className='pb-2'>Axtarışa uyğun videolar</h3>
                            <div className="demo-videos py-3">
                                {currentUser ? (
                                    <>
                                        {!videos || videos?.length === 0 ? (
                                            <FadeLoader color="#4A4AB5" />
                                        ) : filteredVideos.length === 0 ? (
                                            <h5 className='py-2'>Axtarışınıza uyğun video tapılmadı.</h5>
                                        ) : (
                                            filteredVideos?.map((e) => (
                                                <div className='single-video-part'>
                                                    <ReactPlayer key={e.id} url={e.url} controls={true} className="single-video" config={{
                                                        playerOptions: {
                                                            playsinline: true
                                                        }
                                                    }} />
                                                    <h6 className='pt-3'>{e.title}</h6>
                                                </div>
                                            ))
                                        )}
                                    </>
                                ) : (
                                    <p>Pulsuz videoları izləmək üçün <Link to="/sign-in">giriş</Link> etməlisiniz. Profiliniz yoxdursa <Link to="/sign-up">qeydiyyatdan</Link> keçə bilərsiniz.</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="single-lesson-blogs py-5">
                        <h3 className='pb-2' style={{ color: "#4A4AB5", fontWeight: "600" }}>Bu mövzu barədə bəzi bloglar</h3>
                        <div className="lesson-blogs py-3">
                            {!blogs || blogs?.length === 0 ? (
                                <FadeLoader color="#4A4AB5" />
                            ) : filteredBlogs.length === 0 ? (
                                <h5 className='py-2'>Axtarışınıza uyğun blog tapılmadı.</h5>
                            ) : (
                                filteredBlogs.map((blog) => (
                                    <SingleBlog
                                        key={blog?.id}
                                        title={blog?.title}
                                        image={blog?.blog_image}
                                        hashtags={blog?.hashtags}
                                        size={true}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <p>Axtarışınız tapılmadı. Zəhmət olmasa yazdığınızı bir daha gözdən keçirdin.</p>
            )}
        </div>
    )
}

export default Search;