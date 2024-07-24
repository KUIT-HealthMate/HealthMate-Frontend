import React, { useEffect, useState } from 'react';
import styles from "./DailyCheck.module.scss";
import { useGlobalStore } from '../../store/store';
import dailyCheckBackground from "../../assets/dailCheckBackground.svg";
import dailyCheckStartIcon from "../../assets/stethoscope.svg";
import { useNavigate } from 'react-router-dom';

const DailyCheckDone = () => {
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
            <div className={styles.startIcons}>
                <img src={dailyCheckBackground} className={styles.startBackgroundIcon} ></img>
                <img src={dailyCheckStartIcon} className={styles.startIcon}></img>
            </div>
            <div style={{ height: `44px` }}></div>
            <h1 className={styles.startTitle}>건강 진단 완료!</h1>
            <div className={styles.startText}>마지막으로 쿠잇님의</div>
            <div className={styles.startText}><div className={styles.startGreeText}>오늘 느낀 이상증상</div>을 알아보고 싶어요.</div>

            <button className={styles.toHomeButton} onClick={() => { navigate('/') }}>홈으로</button>
            <button className={styles.startButton} >내 건강 진단 결과 확인하기</button>
        </div>
    )

}

export default DailyCheckDone