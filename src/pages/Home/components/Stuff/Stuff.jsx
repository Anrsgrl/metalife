import React from 'react';
import "./Stuff.scss";
import boy from "../../../../assets/images/boy.png";
import girl from "../../../../assets/images/girl.png";
import StuffItem from './StuffItem';

const Stuff = () => {
    return (
        <div className="stuff container pt-3 pb-5">
            <div className="stuff-content row">
                <h2 data-aos="fade-up" className='section-heading py-3'>Our team</h2>
                <StuffItem
                    name="Nazir Nadirov"
                    position="Founder, Director"
                    image={boy}
                />
                <StuffItem
                    name="Elvin Namazov"
                    position="Marketing Manager"
                    image={boy}
                />
                <StuffItem
                    name="Seymur Seferov"
                    position="Human Resource"
                    image={boy}
                />
                <StuffItem
                    name="Anar Asgarli"
                    position="Frontend Developer"
                    image={boy}
                    github="https://github.com/Anrsgrl"
                />
                <StuffItem
                    name="Lala Asgarova"
                    position="Frontend Developer"
                    image={girl}
                    github="https://github.com/lolaaskerova"
                />
                <StuffItem
                    name="Aynura Qaniyeva"
                    position="Frontend Dev Teacher"
                    image={girl}
                    github="https://github.com/aynura12"
                />
                <StuffItem
                    name="Qeybulla"
                    position="Backend Dev"
                    image={boy}
                    github="https://github.com/aynura12"
                />
                <StuffItem
                    name="Fuad Beybutov"
                    position="Designer"
                    image={boy}
                    github="https://github.com/aynura12"
                />
            </div>
        </div>
    )
}

export default Stuff;