import React, { useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styles from '../styles/cardSlider.module.css';
import Card from "./Card";

export default React.memo(function CardSlider({ data, title }) {
    const listRef = useRef();
    const [sliderPosition, setSliderPosition] = useState(0);
    const [showControls, setShowControls] = useState(false);

    const handleDirection = (direction) => {
        let distance = listRef.current.getBoundingClientRect().x - 70;
        if (direction === "left" && sliderPosition > 0) {
            listRef.current.style.transform = `translateX(${275 + distance}px)`;
            setSliderPosition(sliderPosition - 1);
        }
        if (direction === "right" && sliderPosition < 4) {
            listRef.current.style.transform = `translateX(${-235 + distance}px)`;
            setSliderPosition(sliderPosition + 1);
        }
    };

    return (
        <div
            className={`${styles.container} flex column`}
            showControls={showControls}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <h1>{title}</h1>
            <div className={styles.wrapper}>
                <div
                    className={`${styles.slider_action} ${styles.left} ${!showControls ? `${styles.none}` : ""
                        } flex j-center a-center`}
                >
                    <div className={`${styles.svg} flex j-center a-center`} onClick={() => handleDirection("left")} >
                        <AiOutlineLeft />
                    </div>
                </div>
                <div className={`${styles.slider} flex`} ref={listRef}>
                    {data.map((movie, index) => {
                        return <Card movie={movie} index={index} key={movie.id} />;
                    })}
                </div>
                <div
                    className={`${styles.slider_action} ${styles.right} ${!showControls ? `${styles.none}` : ""
                        } flex j-center a-center`}
                >
                    <div className={`${styles.svg} flex j-center a-center`} onClick={() => handleDirection("right")} >
                        <AiOutlineRight />
                    </div>
                </div>
            </div>
        </div>
    );
});