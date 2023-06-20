import React from 'react';
import "./Portfolio.scss";
import website1 from "../../assets/images/website-azpellet.png";
import website2 from "../../assets/images/website-shakhriyar.png";
import website3 from "../../assets/images/website-nafta.png";
import PortfolioItem from './PortfolioItem';

const Portfolio = () => {
    return (
        <div className="portfolio py-5 container">
            <div className="row">
                <PortfolioItem image={website1} />
                <PortfolioItem image={website2} />
                <PortfolioItem image={website3} />
            </div>
        </div>
    )
}

export default Portfolio;