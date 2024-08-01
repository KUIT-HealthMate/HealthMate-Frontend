import styles from "./OnBoarding.module.scss";
import ProgressBar from '../DailyCheck/survey/ProgressBar';
import purpose1 from "../../assets/onboarding/purpose1.svg";
import purpose2 from "../../assets/onboarding/purpose2.svg";
import purpose3 from "../../assets/onboarding/purpose3.svg";
import purpose4 from "../../assets/onboarding/purpose4.svg";
import purpose5 from "../../assets/onboarding/purpose5.svg";
import purpose6 from "../../assets/onboarding/purpose6.svg";
import { useGlobalStore } from '../../store/store';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const purposeButtons = [
    { icon: purpose1, text: "루틴" },
    { icon: purpose2, text: "질환 예방" },
    { icon: purpose3, text: "정보 공유" },
    { icon: purpose4, text: "건강상태 파악" },
    { icon: purpose5, text: "약 복용 관리" },
    { icon: purpose6, text: "생활습관 관리" },
]

const OnBoardingCheckPurpose = () => {

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
        <>
            <ProgressBar></ProgressBar>
            <div className={styles.purposeTop}>
                <div className={styles.purposeTitle}>어떤 목적으로</div>
                <div className={styles.purposeTitle}>헬스메이트를 찾아주셨나요?</div>

                <div className={styles.purposeText}>쿠잇 님의 목적에 맞는 건강 정보를 알려드려요</div>
            </div>

            <div className={styles.icons}>
                {

                    purposeButtons.map((purposeButton, idx) => {
                        return (
                            < div className={styles.iconBox}>
                                <div className={styles.iconWrap}>
                                    <img className={styles.iconImage} src={purposeButton.icon}></img>
                                </div>
                                <div className={styles.iconText}>{purposeButton.text}</div>
                            </div>
                        )
                    })

                }

            </div >

            <button className={styles.NextButton} style={{ position: `fixed`, bottom: `33px` }} onClick={() => (navigate('/'))}>
                <p className={styles.NextButtonText}>다음으로</p>
            </button>
        </>
    )
}

export default OnBoardingCheckPurpose;