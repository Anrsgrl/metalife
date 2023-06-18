import React from 'react';
import "./Stuff.scss";
import boy from "../../../../assets/images/boy.png";
import girl from "../../../../assets/images/girl.png";
import StuffItem from './StuffItem';

const Stuff = () => {
    return (
        <div className="stuff container py-5">
            <div className="stuff-content row">
                <h2 className='text-center py-3'>Our team</h2>
                <StuffItem
                    name="Nazir"
                    position="CEO"
                    image={boy}
                />
                <StuffItem
                    name="Anar Asgarli"
                    position="Web Developer"
                    image={boy}
                    github="https://github.com/Anrsgrl"
                />
                <StuffItem
                    name="Lala Asgarova"
                    position="Web Developer"
                    image={girl}
                    github="https://github.com/lolaaskerova"
                />
                <StuffItem
                    name="Aynura Qaniyeva"
                    position="Web Instructor"
                    image={girl}
                    github="https://github.com/aynura12"
                />
            </div>
        </div>
    )
}

export default Stuff;