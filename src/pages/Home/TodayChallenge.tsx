import styles from "./Home.module.scss";
import React, { useEffect, useState } from 'react';

import goodIcon from "../../assets/good.svg";
import badIcon from "../../assets/bad.svg";
import bubleGreen from "../../assets/bubleG.svg";
import bubleOrange from "../../assets/bubleO.svg";


export default function TodaysChallenge() {

    const [percent, setPercent] = useState(0);

    //통신으로 percent값 가져오기
    useEffect(() => {
        setPercent(40);
    })

    const halfPercent = percent / 2;



    console.log(percent);
    return (
        <div className={styles.TodaysChallenge}>
            <h2 className={styles.HomeHeader}>오늘의 챌린지</h2>
            <p className={styles.HomeText}>오늘 진행할 건강 챌린지 리스트와<br></br>진행 현황을 확인해보세요!</p>
            <div className={styles.HomeMain}>
                <img src={percent >= 50 ? bubleGreen : bubleOrange} className={styles.HomeBuble}></img>
                <div className={styles.ChallengeCharWrap}>
                    <div className={styles.ChallengeChart} style={percent >= 50 ? {
                        background: `conic-gradient(#7ADCC5 0%, #0E9494 ${halfPercent}%, #05697F ${percent}%, #D9D9D9 ${percent}% 100%)`
                    } : {
                        background: `conic-gradient(#F5BE9D 0%, #F7A682 ${halfPercent}%, #F97F59 ${percent}%, #D9D9D9 ${percent}% 100%)`
                    }}>
                        <div className={styles.ChartCenter}>
                            <p className={styles.PercentText} data-percent={percent}
                                style={percent >= 50 ? { color: '#0E9494' } : { color: percent > 0 ? '#F8825C' : '#8F8F8F' }}>
                            </p>
                        </div>

                    </div>
                </div>
                {/* 목표치 달성시 멘트 추가수정해야됨 */}
                <div className={styles.ChallengeState} style={percent >= 50 ?
                    { background: 'rgba(122, 220, 197, 0.25)' } : { background: percent > 0 ? 'rgba(249, 129, 91, 0.2)' : '#EBEBEB' }}>
                    <p className={styles.ChallengeStateText} style={percent >= 50 ? { color: '#0B7575' } : { color: percent > 0 ? '#F8825C' : '#8F8F8F' }}>
                        {percent >= 50 ? '거의 다 진행하셨네요!' : percent > 0 ? '조금만 더 힘을 내볼까요?' : '건강 챌린지를 추가해보세요!'}
                        <img src={percent >= 50 ? goodIcon : percent > 0 ? badIcon : ''}></img>
                    </p>
                </div>
                <button className={styles.StatisticsButton}><p className={styles.StatisticsButtonText}>전체 챌린지 통계 보기</p></button>
            </div>
        </div >
    )
};