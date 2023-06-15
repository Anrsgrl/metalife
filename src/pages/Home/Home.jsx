import React from 'react';
import Hero from "../Home/components/Hero/Hero";
import Lessons from './components/Lessons/Lessons';
import Application from './components/Application/Application';

const Home = () => {
    return (
        <>
            <Hero />
            <Lessons />
            <Application />
        </>
    )
}

export default Home