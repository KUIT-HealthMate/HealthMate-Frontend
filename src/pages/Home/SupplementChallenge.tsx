import styles from "./Home.module.scss";
import pillIcon from "../../assets/pill.svg";
import clampR from "../../assets/clampR.svg";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import usePillInfoStore from "../../store/usePillInfoStore";



export default function SupplementChallenge() {


    const { PillInfo, setPillInfo, printIntakeTime, printMealTime} = usePillInfoStore();

    const [timebtnActive, setTimebtnActive] = useState<boolean[][]>(PillInfo.map(pill => Array(pill.dailyIntakePeriod.length).fill(false)));

    function changeTimebtn(pillId: number, idx: number) {
        console.log(timebtnActive[pillId][idx])

        setTimebtnActive(prevState => {
            const newState = prevState.map(arr => [...arr]);
            newState[pillId][idx] = !newState[pillId][idx];
            console.log(newState);
            return newState;
        });

    }

    useEffect(() => { console.log(timebtnActive); }, [timebtnActive]);


    return (

        < div className={styles.PillChallenge} >
            <div className={styles.PillChallengeTitle}>
                <img src={pillIcon} className={styles.PillImg}></img>
                <h1 className={styles.PillText}>영양제 챌린지</h1>
                <Link to="/supplementChallengeEdit" className={styles.PillEdit}  >편집하기<img src={clampR} className={styles.clampR}></img></Link>
            </div>

            <div>
                {
                    PillInfo.map((pill, index) => {
                        return (
                            <div className={styles.PillInfo}>
                                <div className={styles.PillInfoHeader}>
                                    <h1 className={styles.PillInfoName}>{pill.name}</h1> <h5 className={styles.PillInfoInfo}>{printIntakeTime(pill)}</h5>
                                </div>
                                <div>
                                    <div className={styles.PillInfoTimes}>
                                        {
                                            pill.dailyIntakePeriod.map((time, idx) => {
                                                return (

                                                    <div key={idx} className={styles.PillInfoTimeButton} onClick={() => changeTimebtn(pill.id, idx)} style={timebtnActive[pill.id][idx] ?
                                                        { background: `rgba(14, 148, 148, 0.1)`, border: `1px solid #0E9494`, color: `#0B7575` }
                                                        : { background: `#F5F6F8`, border: `1px solid #B3B3B3`, color: `#B3B3B3` }
                                                    }>{printMealTime(idx)}</div>

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