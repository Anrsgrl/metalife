import React from 'react';

const SingleOrderInfo = (props) => {
    const { svg, title, content, smth } = props;
    return (
        <div data-aos="fade-right" className="single-order-info pb-2 col-12 col-md-6 col-lg-4">
            {svg}
            <h4>{title}</h4>
            <p>{content}</p>
            {smth}
        </div>
    )
}

export default SingleOrderInfo;