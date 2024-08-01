import React, { useEffect, useState } from 'react';
import styles from "./DailyCheck.module.scss";
import dailyCheckBackground from "../../assets/dailCheckBackground.svg";
import dailyCheckStartIcon from "../../assets/symptompage.svg";
import { useGlobalStore } from '../../store/store';
import { useNavigate } from 'react-router-dom';

interface symptomStartProps {
    title1: string,
    text1: string,
    greentext: string,
    text2: string,
    buttonText: string,
    buttonNavigate: string,

}



const DailySymptomCheckStart = (props: symptomStartProps) => {

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
            <h1 className={styles.startTitle}>{props.title1}</h1>
            <div className={styles.startText}>{props.text1}</div>
            <div className={styles.startText}><div className={styles.startGreeText}>{props.greentext}</div>{props.text2}</div>

            <button className={styles.startButton} onClick={() => (navigate(props.buttonNavigate))}>{props.buttonText}</button>
        </div>
    )
};

export default DailySymptomCheckStart;
