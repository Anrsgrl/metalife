import React, { useState } from 'react';
import "./DragButton.scss";
import { AnimatePresence, motion } from 'framer-motion';
import { BiSearchAlt2 } from "react-icons/bi";

const DragButton = ({ main }) => {
    const [visible, setVisible] = useState(false);
    const changeVisible = () => {
        if (window.scrollY >= 120) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };
    window.addEventListener('scroll', changeVisible)
    return (
        <AnimatePresence>
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: 200 }}
                exit={{ opacity: 0 }}
                drag
                dragElastic={false}
                dragConstraints={main}
                transition={{ duration: 2 }}
                className={visible ? "drag-button" : "close-drag-button"}>
                <BiSearchAlt2 />
            </motion.button>
        </AnimatePresence>
    )
}

export default DragButton;