import React, { useEffect, useState } from 'react';
import styles from "./DailyCheck.module.scss";
import dailyMealCheckStarticon from "../../assets/dailyMealCheckStart.svg";
import { useGlobalStore } from '../../store/store';
import { useGlobalStoreSurvey, surveysMeal } from '../../store/storeSurvey';

const DailyMealCheckStart = () => {
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
            <img src={dailyMealCheckStarticon} className={styles.startIcon}></img>
            <h1 className={styles.startTitle}>잘 하고 있어요!</h1>
            <div className={styles.startText}>다음은 쿠잇님의</div>
            <div className={styles.startText}><div className={styles.startGreeText}>오늘 식사 패턴</div>을 알아보고 싶어요.</div>

            <button className={styles.startButton}>식사 패턴 진단 시작하기</button>
        </div>
    )
};

export default DailyMealCheckStart;