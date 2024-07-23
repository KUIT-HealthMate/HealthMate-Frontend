import React, { useEffect, useState } from 'react';
import styles from "./DailyCheck.module.scss";
import dailyCheckBackground from "../../assets/dailCheckBackground.svg";
import dailyCheckStartIcon from "../../assets/dailyCheckStart.svg";
import { useGlobalStore } from '../../store/store';
import { useNavigate } from 'react-router-dom';


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

    const navigate = useNavigate();


    return (
        <div className={styles.startPage}>
            <div className={styles.startIcons}>
                <img src={dailyCheckBackground} className={styles.startBackgroundIcon} ></img>
                <img src={dailyCheckStartIcon} className={styles.startIcon}></img>
            </div>
            <div style={{ height: `44px` }}></div>
            <h1 className={styles.startTitle} >건강진단을 시작해볼까요?</h1>

            <div className={styles.startText}>간단한 답변으로</div>
            <div className={styles.startText}>쿠잇 님의 <div className={styles.startGreeText}>생활 습관</div>을 알아보고 싶어요.</div>

            <button className={styles.startButton} onClick={() => { navigate('/dailycheck') }}>생활 습관 진단 시작하기</button>
        </div>
    )
};

export default DailyCheckStart;