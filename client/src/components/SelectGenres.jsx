import React from 'react'
import { useDispatch } from 'react-redux'
import { getMoviesByGenres } from '../store';
import styles from '../styles/selectGenres.module.css';

const SelectGenres = ({ genres, type }) => {
    const dispatch = useDispatch();

    return (
        <div className={styles.select}>
            <select name="genres" onChange={(e) => dispatch(getMoviesByGenres({ genre: e.target.value, type }))}>
                {genres.map(genre => <option className={styles.option} value={genre.id} key={genres.id}>{genre.name}</option>)}
            </select>
        </div>
    )
}

export default SelectGenres