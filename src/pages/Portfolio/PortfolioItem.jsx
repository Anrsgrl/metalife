import React from 'react';
import ModalPhoto from '../../components/ModalPhoto/ModalPhoto';

const PortfolioItem = (props) => {
    const { logo, desktop, mobile, live, alt } = props;
    return (
        <div data-aos="fade-up" className="portfolio-website skeleton-loader col-12 col-md-6 p-4">
            <div className="portfolio-website-content row">
                <div className="logo-part col-6">
                    <img src={logo} alt={alt} />
                    {live && <button onClick={() => { window.open(live) }} className='btn-white'>Sayta keçid</button>}
                </div>
                <div className="col-6 d-flex flex-column">
                    <ModalPhoto image={desktop} alt={alt} />
                    <ModalPhoto image={mobile} alt={alt} />
                </div>
            </div>
        </div>
    )
}

export default PortfolioItem;