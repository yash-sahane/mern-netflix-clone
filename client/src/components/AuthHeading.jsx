import React from 'react'
import styles from '../styles/register.module.css'

const AuthHeading = () => {
    return (
        <div className={styles.auth_heading}>
            <h1>Unlimited movies,</h1>
            <h1>TV shows and more</h1>
            <h3>Watch anywhere, cancel anytime.</h3>
            <h5>Ready to watch? Enter your email to create or restart membership</h5>
        </div>
    )
}

export default AuthHeading