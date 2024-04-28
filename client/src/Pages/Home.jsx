import React, { useEffect, useState } from 'react'
import styles from '../styles/home.module.css';
import Navbar from '../components/Navbar';
import homeImg from '../assets/home2.jpg';
import homeTitle from '../assets/homeTitle2.png';
import { FaPlay } from "react-icons/fa6";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getMovies } from '../store';
import Slider from '../components/Slider';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';

const Home = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const genresLoaded = useSelector(state => state.netflix.genresLoaded);
    const movies = useSelector(state => state.netflix.movies);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }

    useEffect(() => {
        console.log(genresLoaded);
        if (genresLoaded) dispatch(getMovies({ type: "all" }));
    }, [genresLoaded]);

    useEffect(() => {
        dispatch(getGenres());
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
        <div className={styles.main}>
            <Navbar isScrolled={isScrolled} />
            <div className={styles.hero}>
                <div className={styles.homeImgWrapper}>
                    <img className={styles.homeImg} src={homeImg} alt="" />
                    <img className={styles.homeTitle} src={homeTitle} alt="" />
                    <button className={styles.btn} onClick={() => navigate('/player')}><FaPlay className={styles.playIcon} /> Play</button>
                    <button className={`${styles.btn} ${styles.infoBtn}`}><IoAlertCircleOutline className={styles.playIcon} /> More Info</button>
                </div>
                <Slider movies={movies} />
            </div>
        </div>
    )
}

export default Home