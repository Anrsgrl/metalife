import React from 'react';

const PortfolioItem = (props) => {
    const { image } = props;
    return (
        <div data-aos="fade-up" className="portfolio-website skeleton-loader col-12 col-md-6">
            <img className='w-100 h-100' src={image} alt="website" />
        </div>
    )
}

export default PortfolioItem;