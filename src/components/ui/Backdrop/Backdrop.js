import React from 'react';
import styles from './Backdrop.module.css'

const Backdrop = ({ show, click }) => {
    return (
        <>
            {show && <div onClick={click} className={styles.back_drop}></div>}
        </>


    )
}

export default Backdrop