import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { firebaseAuth } from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { getLikedMovies } from '../store';
import Card from '../components/Card';
import styles from '../styles/likedMovies.module.css';
import Navbar from '../components/Navbar';

const LikedMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.netflix.movies);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        dispatch(getLikedMovies(user.email));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>My List</h1>
        <div className={styles.movies}>{movies.map(movie => <Card movie={movie} isLiked={true} />)}</div>
      </div>
    </>
  )
}

export default LikedMovies