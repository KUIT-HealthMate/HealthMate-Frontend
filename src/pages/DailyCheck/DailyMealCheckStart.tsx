import React, { useEffect, useState } from 'react';
import styles from "./DailyCheck.module.scss";
import dailyCheckBackground from "../../assets/dailCheckBackground.svg";
// import dailyCheckStartIcon from "../../assets/dailyMealCheckStart.svg";
import { useGlobalStore } from '../../store/store';
import { useGlobalStoreSurvey, surveysMeal } from '../../store/storeSurvey';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();
    return (
        <div className={styles.startPage}>
            <div className={styles.startIcons}>
                <img src={dailyCheckBackground} className={styles.startBackgroundIcon}></img>
                {/* <img src={dailyCheckStartIcon} className={styles.startIcon}></img> */}
            </div>
            <div style={{ height: `44px` }}></div>
            <h1 className={styles.startTitle}>잘 하고 있어요!</h1>
            <div className={styles.startText}>다음은 쿠잇님의</div>
            <div className={styles.startText}><div className={styles.startGreeText}>오늘 식사 패턴</div>을 알아보고 싶어요.</div>

            <button className={styles.startButton} onClick={() => { navigate('/dailymealcheck') }}>식사 패턴 진단 시작하기</button>
        </div>
    )
};

export default DailyMealCheckStart;