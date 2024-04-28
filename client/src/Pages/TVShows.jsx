import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGenres, getMovies } from '../store';
import { firebaseAuth } from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import NotAvailable from '../components/NotAvailable';
import styles from '../styles/movies.module.css';
import SelectGenres from '../components/SelectGenres';

const TVShows = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genresLoaded = useSelector(state => state.netflix.genresLoaded);
  const movies = useSelector(state => state.netflix.movies);
  const genres = useSelector(state => state.netflix.genres);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }

  useEffect(() => {
    console.log(genresLoaded);
    if (genresLoaded) dispatch(getMovies({ type: "tv" }));
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
      <div>
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className={styles.hero}>
        <SelectGenres genres={genres} type={'tv'} />
        {movies?.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </div>
  )
}

export default TVShows;