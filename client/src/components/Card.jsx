// Card.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import video from '../assets/video.mp4';
import { IoPlayCircleSharp } from 'react-icons/io5';
import { RiThumbDownFill, RiThumbUpFill } from 'react-icons/ri';
import { BiChevronDown } from 'react-icons/bi';
import { BsCheck } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import styles from '../styles/card.module.css';
import toast from 'react-hot-toast';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { server } from '../main';
import { useDispatch } from 'react-redux';
import { removeFromLikedMovies } from '../store';

const Card = ({ movie, isLiked = false }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setEmail(user.email);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleLike = async () => {
        try {
            const { data } = await axios.post(`${server}/users/addToLike`, {
                email,
                data: movie
            })
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (e) {
            toast.error(e.message);
        }
    };

    return (
        <div
            className={`${styles.container}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img className={styles.outerImg}
                src={`https://image.tmdb.org/t/p/w500${movie.image}`}
                alt="card"
                onClick={() => navigate("/player")}
            />
            {isHovered && (
                <div className={styles.hover}>
                    <div className={styles.imageVideoContainer}>
                        <img
                            className={styles.innerImg}
                            src={`https://image.tmdb.org/t/p/w500${movie.image}`}
                            alt="card"
                            onClick={() => navigate("/player")}
                        />
                        <video className={styles.video} src={video} autoPlay={true} loop controls muted
                            onClick={() => navigate("/player")}
                        ></video>
                    </div>
                    <div className={`${styles.infoContainer} flex column`}>
                        <h3 onClick={() => navigate("/player")}>{movie.name}</h3>
                        <div className={`${styles.icons} flex j-between`}>
                            <div className={`${styles.controls} flex`}>
                                <IoPlayCircleSharp title="Play" onClick={() => navigate("/player")} />
                                <RiThumbUpFill title="Like" />
                                <RiThumbDownFill title="Dislike" />
                                {isLiked ? (
                                    <BsCheck title="Remove from List" onClick={() => dispatch(removeFromLikedMovies({ movieId: movie.id, email }))} />
                                ) : (
                                    <AiOutlinePlus title="Add to my list" onClick={handleLike} />
                                )}
                            </div>
                            <div>
                                <BiChevronDown title="More Info" />
                            </div>
                        </div>
                        <div className={`${styles.genres} flex`}>
                            <ul className="flex">
                                {movie.genres.map((genre, index) => (
                                    <li key={index}>{genre}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;