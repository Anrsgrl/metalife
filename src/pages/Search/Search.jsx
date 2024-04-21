import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import { FadeLoader } from "react-spinners";
import SingleBlog from "../../components/SingleBlog/SingleBlog";
import { BiTime } from "react-icons/bi";
import {
  useBlogsList,
  useUsersList,
  useVideosList,
} from "../../firebase/getFunctions";

const Search = () => {
  const location = useLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchParams = new URLSearchParams(location.search);

  const searchItemValue = searchParams?.get("searchItem")?.replace(/\s/g, "");
  const videos = useVideosList();
  const blogs = useBlogsList();
  const currentUser = useUsersList();
  const [videoDuration, setVideoDuration] = useState(null);
  const filteredVideos = videos.filter(
    (e) =>
      (e.demo === "true" && e.hashtags?.includes(searchItemValue)) ||
      e.title?.toLowerCase().includes(searchItemValue?.toLowerCase())
  );
  const filteredBlogs = blogs.filter(
    (e) =>
      e.hashtags?.includes(searchItemValue) ||
      e.title?.toLowerCase().includes(searchItemValue?.toLowerCase())
  );

  const onPlayerReady = (event) => {
    const player = event.target;
    const duration = player.getDuration();
    setVideoDuration(duration);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  useEffect(() => {
    document.title = `${searchParams.get(
      "searchItem"
    )} üzrə axtarış | Metalife`;
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [searchParams]);

  useEffect(() => {
    if (!searchParams.get("searchItem")) {
      window.location.href = "/";
    }
  }, [searchParams]);
  return (
    <div className="search container py-5">
      {searchItemValue ? (
        <>
          <h3 className="py-4 text-center">
            <span style={{ color: "#4A4AB5" }}>
              "{searchParams.get("searchItem")}"
            </span>{" "}
            üzrə axtarış
          </h3>
          <div className="lesson-videos">
            <div className="single-lesson-videos py-2">
              <h3 className="pb-2">Axtarışa uyğun videolar</h3>
              <div className="lesson-videos py-3 h-100 w-100">
                {currentUser ? (
                  <>
                    {filteredVideos.length === 0 && (
                      <h5 className="py-2">
                        Axtarışınıza uyğun video tapılmadı.
                      </h5>
                    )}
                    {filteredVideos &&
                      filteredVideos?.map((e, i) => (
                        <div
                          key={i}
                          className="single-video-part col-12 col-md-9 col-lg-6"
                        >
                          <YouTube
                            videoId={e.url}
                            className={"w-100 h-100"}
                            iframeClassName={"w-100 h-100"}
                            onReady={onPlayerReady}
                          />
                          <div className="video-info px-3 py-2">
                            <h6 className="text-overflow-clamp clamp-1">
                              {e.title}
                            </h6>
                            {filteredVideos !== null && (
                              <p className="video-time">
                                <BiTime /> {formatTime(videoDuration)}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                  </>
                ) : (
                  <p>
                    Pulsuz videoları izləmək üçün{" "}
                    <Link to="/sign-in">giriş</Link> etməlisiniz. Profiliniz
                    yoxdursa <Link to="/sign-up">qeydiyyatdan</Link> keçə
                    bilərsiniz.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="single-lesson-blogs py-5">
            <h3
              className="pb-2"
              style={{ color: "#4A4AB5", fontWeight: "600" }}
            >
              Axtarışa uyğun bloglar
            </h3>
            <div className="lesson-blogs py-3">
              {!blogs || blogs?.length === 0 ? (
                <FadeLoader color="#4A4AB5" />
              ) : filteredBlogs.length === 0 ? (
                <h5 className="py-2">Axtarışınıza uyğun blog tapılmadı.</h5>
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
        <p>
          Axtarışınız tapılmadı. Zəhmət olmasa yazdığınızı bir daha gözdən
          keçirdin.
        </p>
      )}
    </div>
  );
};

export default Search;
