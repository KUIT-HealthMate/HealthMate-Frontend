import styles from "../Home.module.scss";

import clampR from "../../../assets/clampR.svg";
import habitIcon from "../../../assets/habiticon.svg";
import checkmark from "../../../assets/checkmark.svg";
import uncheckmark from "../../../assets/uncheckmark.svg";

import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useHabitInfoStore from "../../../store/useHabitInfoStore";

export default function HabitChallenge() {
  const {
    HabitInfo,
    setHabitInfo,
    setExecutionRecord,
    getExecutionRecord,
  } = useHabitInfoStore();

  const hello = (habitid: string) => {
    console.log(getExecutionRecord(habitid));
    return getExecutionRecord(habitid) ? checkmark : uncheckmark;
  }

  return (
    <div className={styles.HabitChallenge}>
      <div className={styles.HabitChallengeTitle}>
        <img src={habitIcon} className={styles.HabitImg}></img>
        <h1 className={styles.HabitText}>습관 챌린지</h1>
        <Link to="/ChallengeEdit" className={styles.HabitEdit}>
          편집하기<img src={clampR} className={styles.clampR}></img>
        </Link>
      </div>
      {HabitInfo.map((habit, index) => {
        return (
          <div className={styles.HabitInfo}>
            <p className={styles.HabitName}>{habit.name}</p>
            <img
              className={styles.HabitCheckmark}
              onClick={() => {setExecutionRecord(habit.id); console.log(habit.id + habit.executionRecord)}}
              src={hello(habit.id)
              }
            ></img>
          </div>
        );
      })}
    </div>
  );
}

//export default HabbitChallenge;
