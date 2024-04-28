import React from 'react';
import logo from '../assets/logo.png';
import styles from '../styles/header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.header_wrapper}>
            <div className={styles.header}>
                <img src={logo} alt="" />
                <button className={styles.btn} onClick={() => { navigate('/login') }}>Sign In</button>
            </div>
        </div>
    )
}

export default Header