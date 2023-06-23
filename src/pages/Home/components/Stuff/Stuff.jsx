import React from 'react';
import "./Stuff.scss";
import StuffItem from './StuffItem';
import { stuffList } from '../../../../data/StuffList';

const Stuff = () => {
    return (
        <div className="stuff container pt-3 pb-5">
            <div className="stuff-content row">
                <h2 data-aos="fade-up" className='section-heading py-3'>Komandamız</h2>
                {stuffList.map((item) => (
                    <StuffItem
                        key={item.id}
                        name={item.name}
                        position={item.position}
                        image={item.image}
                        github={item.github}
                        linkedin={item.linkedin}
                        behance={item.behance}
                        instagram={item.instagram}
                        twitter={item.twitter}
                    />
                ))}
            </div>
        </div>
    )
}

export default Stuff;