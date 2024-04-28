import React, { useEffect } from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import video from '../assets/video.mp4';
import styles from '../styles/player.module.css';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';

const Player = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (!user) {
                navigate('/login');
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className={styles.player}>
            <div className={styles.back_icon_div} onClick={() => navigate(-1)}>
                <IoArrowBackOutline className={styles.backIcon} />
            </div>
            <video src={video} autoPlay loop controls muted></video>
        </div>
    )
}

export default Player