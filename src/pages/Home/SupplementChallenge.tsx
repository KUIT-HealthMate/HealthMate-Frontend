import styles from "./Home.module.scss";
import pillIcon from "../../assets/pill.svg";
import clampR from "../../assets/clampR.svg";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function SupplementChallenge() {

    const [pillInfo, setPillInfo] = useState([
        { id: 0, name: '베아제', info: "식후 30분 이내", times: ["아침", "점심", "저녁"] },
        { id: 1, name: '루테인', info: "식후 1시간 이내", times: ["아침", "점심", "저녁"] },
        { id: 2, name: '비타민', info: "식후 30분 이내", times: ["아침", "저녁"] }
    ]);

    const [timebtnActive, setTimebtnActive] = useState(pillInfo.map(pill => Array(pill.times.length).fill(false)));
    //   console.log(timebtnActive.length)

    function changeTimebtn(pillId: number, idx: number) {
        console.log("클릭됨");
        console.log(timebtnActive[pillId][idx])
        // console.log("이전" + timebtnActive);
        // timebtnActive(idx)
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

                                                    <div key={idx} className={styles.PillInfoTimeButton} onClick={() => changeTimebtn(pill.id, idx)} style={timebtnActive[pill.id][idx] ?
                                                        { background: `#F5F6F8`, border: `1px solid #B3B3B3`, color: `#B3B3B3` }
                                                        : { background: `rgba(14, 148, 148, 0.1)`, border: `px solid #0E9494;`, color: `#0B7575` }}>{time}</div>

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