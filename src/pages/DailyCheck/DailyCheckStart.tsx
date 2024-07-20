import React, { useEffect, useState } from 'react';
import styles from "./DailyCheck.module.scss";
import GreenButton from '../../components/organs/GreenButton';

import dailyCheckStartIcon from "../../assets/dailyCheckStart.svg";
import { useGlobalStore } from '../../store/store';


const DailyCheckStart = () => {
    const setShowBottomBar = useGlobalStore((state) => state.setShowBottomBar);
    useEffect(() => {
        console.log("마운트됨")
        setShowBottomBar();
        return () => {
            setShowBottomBar();
        };
    }, [setShowBottomBar]
    );

    return (
        <div className={styles.startPage}>
            <img src={dailyCheckStartIcon} className={styles.startIcon}></img>
            <h1 className={styles.startTitle}>건강진단을 시작해볼까요?</h1>
            <div className={styles.startText}>간단한 답변으로</div>
            <div className={styles.startText}>쿠잇 님의 <div className={styles.startGreeText}>생활 습관</div>을 알아보고 싶어요.</div>

            <button className={styles.startButton}>생활 습관 진단 시작하기</button>
        </div>
    )
};

export default DailyCheckStart;