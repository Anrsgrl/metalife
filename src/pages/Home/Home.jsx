import React, { useEffect } from "react";
import Hero from "../Home/components/Hero/Hero";
import Lessons from "./components/Lessons/Lessons";
import Application from "./components/Application/Application";
// import Stuff from "./components/Stuff/Stuff";
import Partner from "./components/Partner/Partner";
import SingleLessonBlogs from "../SingleLesson/components/SingleLessonBlogs/SingleLessonBlogs";

const Home = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);
  return (
    <>
      <Hero />
      <Lessons show={true} />
      {/* <Stuff /> */}
      <Partner />
      <SingleLessonBlogs last={true} title="Son bloqlarımız" />
      <Application />
    </>
  );
};

export default Home;
