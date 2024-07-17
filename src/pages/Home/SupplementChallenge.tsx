import styles from "./Home.module.scss";
import pillIcon from "../../assets/pill.svg";
import clampR from "../../assets/clampR.svg";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function SupplementChallenge() {

    const [pillInfo, setPillInfo] = useState([
        { id: 1, name: '베아제', info: "식후 30분 이내", times: ["아침", "점심", "저녁"] },
        { id: 2, name: '루테인', info: "식후 1시간 이내", times: ["아침", "점심", "저녁"] }
    ]);

    return (

        < div className={styles.PillChallenge} >
            <div className={styles.PillChallengeTitle}>
                <img src={pillIcon} className={styles.PillImg}></img>
                <h1 className={styles.PillText}>영양제 챌린지</h1>
                <Link to="/supplementChallengeEdit" className={styles.PillEdit}>편집하기<img src={clampR} className={styles.clampR}></img></Link>
            </div>

            <div>
                {
                    pillInfo.map((pill, index) => {
                        return (
                            <div className={styles.PillInfo}>
                                <div className={styles.PillInfoHeader}>
                                    <h1 className={styles.PillInfoName}>{pill.name}</h1> <h5 className={styles.PillInfoInfo}>{pill.info}</h5>
                                </div>
                                <div>
                                    <div className={styles.PillInfoTimes}>
                                        {
                                            pill.times.map((time, idx) => {
                                                return (

                                                    <div className={styles.PillInfoTimeButton}>{time}</div>

                                                )

                                            })
                                        }
                                    </div>
                                </div>
                            </div >
                        )
                    })
                }
            </div>




        </div >)
};

//export default SupplementChallenge;