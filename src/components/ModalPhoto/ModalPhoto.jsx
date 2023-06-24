import React from 'react';
import ModalImage from "react-modal-image";

const ModalPhoto = (props) => {
    const { image, alt } = props;
    return (
        <div data-aos="fade-up">
            <ModalImage
                alt={alt}
                small={image}
                medium={image}
                hideZoom={true}
                large={image}
            />
            <div className="div-modal"></div>
        </div>
    )
}

export default ModalPhoto;