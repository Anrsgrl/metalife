import React from 'react';
import "./Portfolio.scss";
import PortfolioItem from './PortfolioItem';
import { PortfolioItems } from './PortfolioItems';
import { useEffect } from 'react';

const Portfolio = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
    }, []);
    return (
        <div className="portfolio py-5 container">
            <div className="row">
                {PortfolioItems.map((imageList) => (
                    <PortfolioItem key={imageList.id} logo={imageList.logo} desktop={imageList.desktop} mobile={imageList.mobile} live={imageList.live} alt={imageList.name} />
                ))}
            </div>
        </div>
    )
}

export default Portfolio;