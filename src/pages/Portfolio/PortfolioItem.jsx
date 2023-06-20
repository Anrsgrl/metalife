import React from 'react';

const PortfolioItem = (props) => {
    const { image } = props;
    return (
        <div className="portfolio-website col-12 col-md-6">
            <img className='w-100 h-100' src={image} alt="website" />
            {/* <div className="website-cover">
                <h4>{title}</h4>
                <a href={link}>azpellet.com</a>
            </div> */}
        </div>
    )
}

export default PortfolioItem;