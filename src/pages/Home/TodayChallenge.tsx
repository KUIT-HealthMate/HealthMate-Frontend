import styles from "./Home.module.scss";
import React, { useEffect, useState } from 'react';


export default function TodaysChallenge() {

    const [percent, setPercent] = useState(0);

    //통신으로 percent값 가져오기
    useEffect(() => {
        setPercent(80);
    })



    console.log(percent);
    return (
        <div className={styles.TodaysChallenge}>
            <h2 className={styles.HomeHeader}>오늘의 챌린지</h2>
            <p className={styles.HomeText}>오늘 진행할 건강 챌린지 리스트와<br></br>진행 현황을 확인해보세요!</p>
            <div className={styles.HomeMain}>
                <div className={styles.ChallengeCharWrap}>
                    <div className={styles.ChallengeChart} data-percent="80">
                        <div className={styles.ChartCenter}><p className={styles.PercentText} data-percent="80"></p></div>
                    </div>
                </div>
                <div className={styles.ChallengeState}><p className={styles.ChallengeStateText}>건강 챌린지를 추가해보세요!</p></div>
                <button className={styles.StatisticsButton}></button>
            </div>
        </div>
    )
};