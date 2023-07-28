import React, { useEffect } from 'react';
import Hero from "../Home/components/Hero/Hero";
import Lessons from './components/Lessons/Lessons';
import Application from './components/Application/Application';
import Stuff from './components/Stuff/Stuff';
import Partner from './components/Partner/Partner';

const Home = ({ handleContentLoad }) => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
    }, []);
    return (
        <>
            <Hero handleContentLoad={handleContentLoad} />
            <Lessons show={true} />
            <Stuff />
            <Partner />
            <Application />
        </>
    )
}

export default Home