import React, { useState } from 'react';
import "./DragElements.scss";
import { AnimatePresence, motion } from 'framer-motion';
import { BiSearchAlt2 } from "react-icons/bi";
import DragMenu from '../DragMenu/DragMenu';

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

    const [dragMenu, setDragMenu] = useState(false);
    const openDragMenu = () => {
        setDragMenu(true)
        document.body.style.overflow = 'hidden';
    }
    const closeDragMenu = () => {
        setDragMenu(false)
        document.body.style.overflow = 'unset';
    }
    return (
        <AnimatePresence>
            <motion.button
                drag
                dragElastic={false}
                dragConstraints={main}
                onClick={() => openDragMenu()}
                className={visible ? "drag-button" : "close-drag-button"}>
                <BiSearchAlt2 />
            </motion.button>
            <DragMenu dragMenu={dragMenu} closeDragMenu={closeDragMenu} />
        </AnimatePresence>
    )
}

export default DragButton;