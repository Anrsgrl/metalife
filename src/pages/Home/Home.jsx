import React, { useEffect } from 'react';
import Hero from "../Home/components/Hero/Hero";
import Lessons from './components/Lessons/Lessons';
import Application from './components/Application/Application';

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
            <Application />
        </>
    )
}

export default Home