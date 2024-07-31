import React, { useEffect, useState } from 'react';
import styles from "./DailyCheck.module.scss";
import dailyCheckBackground from "../../assets/dailCheckBackground.svg";
import dailySleepCheckStart from "../../assets/dailySleepCheckStart.svg";
import { useGlobalStore } from '../../store/store';
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

            <div className={styles.startSleepCheck}>
                <h1 className={styles.startTitle} style={{ marginTop: `0` }}>거의 다 왔어요!</h1>
                <div className={styles.startText}>이번에는 쿠잇 님의 <div className={styles.startGreeText}>수면 패턴</div>을 알아보려고 해요.</div>
                <div className={styles.startText}>조금만 더 힘내서 답변해봐요:)</div>
            </div>

            <div className={styles.startSleepIcons}>
                <img src={dailyCheckBackground} className={styles.startSleepBackgroundIcon}></img>
                <img src={dailySleepCheckStart} className={styles.startSleepIcon}></img>
            </div>

            <button className={styles.startButton} onClick={() => { navigate('/dailycheck') }}>수면 패턴 진단 시작하기</button>
        </div>
    )
};

export default DailyMealCheckStart;