import React, { useEffect, useState } from 'react';
import styles from "./DailyCheck.module.scss";
import symptomIcon from "../../assets/symptompage.svg"
import { useGlobalStore } from '../../store/store';
import { useNavigate } from 'react-router-dom';

const DailySymptomCheckStart = () => {
    const setShowBottomBar = useGlobalStore((state) => state.setShowBottomBar);
    useEffect(() => {
        console.log("마운트됨")
        setShowBottomBar();
        return () => {
            setShowBottomBar();
        };
    }, [setShowBottomBar]
    );

    const navigate = useNavigate();
    return (
        <div className={styles.startPage}>
            <img src={symptomIcon} className={styles.startIcon}></img>
            <h1 className={styles.startTitle}>마지막이에요</h1>
            <div className={styles.startText}>마지막으로 쿠잇님의</div>
            <div className={styles.startText}><div className={styles.startGreeText}>오늘 느낀 이상증상</div>을 알아보고 싶어요.</div>

            <button className={styles.startButton} onClick={() => { navigate('/dailysymptomcheck') }}>이상증상 체크 시작하기</button>
        </div>
    )
};

export default DailySymptomCheckStart;
