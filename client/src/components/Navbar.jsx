import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";
import styles from '../styles/navbar.module.css';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from '../utils/firebase-config';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const links = [
    { id: 1, name: 'Home', url: '/' },
    { id: 2, name: 'TV Shows', url: '/shows' },
    { id: 3, name: 'Movies', url: '/movies' },
    { id: 4, name: 'My List', url: '/likedMovies' },
]

const Navbar = ({ isScrolled }) => {
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const logoutHandler = () => {
        signOut(firebaseAuth).then(() => {
            toast.success('Logout Successful');
        }).catch((error) => {
            toast.error(e.message);
            console.log(error);
        });
    }

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
        <div className={`${styles.navbar} ${isScrolled && styles.scroll}`}>
            <div className={styles.logo_links}>
                <div className={styles.logo}>
                    <img src={logo} alt="" />
                </div>
                <nav className={styles.links}>
                    {links.map((link, id) => <Link key={id} to={link.url}>{link.name}</Link>)}
                </nav>
            </div>
            <div className={styles.right}>
                {showSearch && <div className={styles.searchInput}>
                    <input type="text" />
                </div>}
                <div className={styles.searchIcon}><FaSearch /></div>
                <div className={styles.logoutIcon} onClick={logoutHandler}>
                    <FaPowerOff />
                </div>
            </div>
        </div>
    )
}

export default Navbar