import styles from "../Home.module.scss";

import clampR from "../../../assets/clampR.svg";
import habitIcon from "../../../assets/habiticon.svg";
import checkmark from "../../../assets/checkmark.svg";
import uncheckmark from "../../../assets/uncheckmark.svg";

import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';


export default function HabitChallenge() {

    const [habits, sethabits] = useState([
        { id: 0, habitname: "10분 파워 워킹", isSuccess: true },
        { id: 1, habitname: "스트레칭", isSuccess: true },
        { id: 2, habitname: "계단 오르기", isSuccess: false },
        { id: 3, habitname: "스쿼트", isSuccess: false }
    ]);

    const [doHabit, setDoHabit] = useState(habits.map(habit => habit.isSuccess));
    console.log(doHabit);

    function changeDoHabit(habitId: number) {
        console.log("클릭")
        setDoHabit(prevState => {
            const newState = [...prevState];
            newState[habitId] = !newState[habitId];
            console.log(newState)
            return newState;
        })
    }

    useEffect(() => { console.log(doHabit); }, [doHabit]);

    return (
        <div className={styles.HabitChallenge}>
            <div className={styles.HabitChallengeTitle}>
                <img src={habitIcon} className={styles.HabitImg}></img>
                <h1 className={styles.HabitText}>습관 챌린지</h1>
                <Link to="/habitChallengeEdit" className={styles.HabitEdit}>편집하기<img src={clampR} className={styles.clampR}></img></Link>
            </div>
            {
                habits.map((habit, index) => {
                    return (
                        <div className={styles.HabitInfo}>
                            <p className={styles.HabitName}>{habit.habitname}</p>
                            <img className={styles.HabitCheckmark} onClick={() => changeDoHabit(index)}
                                src={doHabit[index] ? checkmark : uncheckmark}
                            ></img>
                        </div>
                    )
                })
            }
        </div>
    )
}

//export default HabbitChallenge;