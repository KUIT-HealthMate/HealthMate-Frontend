import styles from "./Home.module.scss";

import clampR from "../../assets/clampR.svg";
import habitIcon from "../../assets/habiticon.svg";
import checkmark from "../../assets/checkmark.svg";

import React, { useEffect, useState } from 'react';


export default function HabitChallenge() {

    const [habits, sethabits] = useState([
        { id: 1, habitname: "10분 파워 워킹", isSuccess: true },
        { id: 2, habitname: "스트레칭", isSuccess: true },
        { id: 3, habitname: "계단 오르기", isSuccess: false },
        { id: 4, habitname: "스쿼트", isSuccess: false }
    ]);


    return (
        <div className={styles.HabitChallenge}>
            <div className={styles.HabitChallengeTitle}>
                <img src={habitIcon} className={styles.HabitImg}></img>
                <h1 className={styles.HabitText}>습관 챌린지</h1>
                <h3 className={styles.HabitEdit}>편집하기<img src={clampR} className={styles.clampR}></img></h3>
            </div>
            {
                habits.map((habit, index) => {
                    return (
                        <div className={styles.HabitInfo}>
                            <p className={styles.HabitName}>{habit.habitname}</p><img src={checkmark} className={styles.HabitCheckmark}></img>
                        </div>
                    )
                })
            }
        </div>
    )
}

//export default HabbitChallenge;