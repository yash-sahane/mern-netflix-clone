import React from 'react'
import styles from '../styles/notAvailable.module.css'

const NotAvailable = () => {
    return (
        <div className={styles.main}>
            <h1>No Movies avaialble for the selected genre. Please select a different
                genre.</h1>
        </div>
    )
}

export default NotAvailable