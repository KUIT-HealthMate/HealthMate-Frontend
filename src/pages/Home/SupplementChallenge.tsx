import styles from "./Home.module.scss";
import pillIcon from "../../assets/pill.svg";
import clampR from "../../assets/clampR.svg";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import usePillInfoStore from "../../store/usePillInfoStore";

// export interface PillInfo {
//     id: number;
//     name: string; // 알약 이름
//     intakeTime: [number, number]; // 섭취 시간 (식전 1 식후 2, 분 number로)
//     dailyIntakePeriod: [boolean, boolean, boolean]; // 일 섭취 시기 (아침, 점심, 저녁)
//     weeklyIntakeFrequency: [
//       boolean,
//       boolean,
//       boolean,
//       boolean,
//       boolean,
//       boolean,
//       boolean
//     ]; // 주 섭취 횟수 (월 ~ 일)
//     notificationTime: [number, number][]; // 팝업 알림 시간 (19:30 이면 19, 30)
// }

// const initialPillInfo: PillInfo[] = [
// {
//     id: 0,
//     name: "베아제",
//     intakeTime: [2, 30],
//     dailyIntakePeriod: [true, true, true],
//     weeklyIntakeFrequency: [true, true, true, true, true, true, true],
//     notificationTime: [
//     [7, 30],
//     [12, 0],
//     [18, 0],
//     ],
// },
// {
//     id: 1,
//     name: "비타민",
//     intakeTime: [2, 30],
//     dailyIntakePeriod: [true, true, true],
//     weeklyIntakeFrequency: [true, false, true, false, true, false, false],
//     notificationTime: [
//     [7, 35],
//     [12, 5],
//     [18, 5],
//     ],
// },
// {
//     id: 2,
//     name: "루테인",
//     intakeTime: [2, 30],
//     dailyIntakePeriod: [true, false, true],
//     weeklyIntakeFrequency: [true, false, true, true, true, false, true],
//     notificationTime: [
//     [7, 40],
//     [12, 10],
//     [18, 10],
//     ],
// },
// ];

// function printIntakeTime (pill: PillInfo):string {
//     const isBeforeOrAfterMeal:string = (pill.intakeTime[0] == 1) ? "식전" : "식후"
//     const howMuchMinutes:string = pill.intakeTime[1] + "분 이내";

//     return isBeforeOrAfterMeal + howMuchMinutes;
// }

// function printMealTime (idx: number):string {
//     switch(idx){
//         case 0:
//             return "아침";
//         case 1:
//             return "점심";
//         case 2:
//             return "저녁";
//         default:
//             return "";
//     }
// }

export default function SupplementChallenge() {

    // const [PillInfo, setPillInfo] = useState([
    //     { id: 1, name: '베아제', info: "식후 30분 이내", times: ["아침", "점심", "저녁"] },
    //     { id: 2, name: '루테인', info: "식후 1시간 이내", times: ["아침", "점심", "저녁"] }
    // ]);

    //const [PillInfo, setPillInfo] = useState<PillInfo[]>(initialPillInfo);

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