import styles from './ProgressBar.module.scss'
import { useState } from 'react'
import { useGlobalStoreSurvey } from '../../../store/storeSurvey'

const ProgressBar = () => {

    const { progressPercent } = useGlobalStoreSurvey((state) => ({
        progressPercent: state.progressPercent
    }));

    console.log("progressPercent: " + progressPercent);


    return (
        <div className={styles.progressBarWrap}>
            <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: `${progressPercent}%` }}></div>
            </div>
        </div>
    )

}

export default ProgressBar;