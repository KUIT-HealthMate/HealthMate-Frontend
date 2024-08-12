import styles from "../Home.module.scss";

import clampR from "../../../assets/clampR.svg";
import habitIcon from "../../../assets/habiticon.svg";
import checkmark from "../../../assets/checkmark.svg";
import uncheckmark from "../../../assets/uncheckmark.svg";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useHabitInfoStore from "../../../store/useHabitInfoStore";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import habitInfo from "../../../store/habitInfo";

//api 관련
import { putHabitCheck } from "../../../APIs/home/homeApi";

SwiperCore.use([Pagination, Navigation]);

export default function HabitChallenge() {
  const { HabitInfo, setExecutionRecord, getExecutionRecord } =
    useHabitInfoStore();

  const splitHabits = (array: habitInfo[]) => {
    const result = [];
    for (let i = 0; i < array.length; i += 4) {
      result.push(array.slice(i, i + 4));
    }
    return result;
  };

  const [newHabits, setNewHabits] = useState<habitInfo[][]>([]);

  useEffect(() => {
    const chunks = splitHabits(HabitInfo);
    setNewHabits(chunks);
  }, [HabitInfo]);

  const hello = (habitid: string) => {
    console.log(getExecutionRecord(habitid));
    return getExecutionRecord(habitid) ? checkmark : uncheckmark;
  };


  function HabitCheck(habitId: string) {
    setExecutionRecord(habitId);
    // 체크하면 서버 전송
    putHabitCheck("2024-08-10");
  }

  return (
    <div className={styles.HabitChallenge}>
      <div className={styles.HabitChallengeTitle}>
        <img src={habitIcon} className={styles.HabitImg} alt="habit"></img>
        <h1 className={styles.HabitText}>습관 챌린지</h1>
        <Link to="/ChallengeEdit" className={styles.HabitEdit}>
          편집하기<img src={clampR} className={styles.clampR} alt="clamp"></img>
        </Link>
      </div>

      <Swiper
        className={styles.swiper}
        style={{ height: `352px` }}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {newHabits.map((chunk, chunkIndex) => {
          return (
            <SwiperSlide>
              {chunk.map((habit, habitIndex) => {
                return (
                  <div className={styles.HabitInfo}>
                    <p className={styles.HabitName}>{habit.name}</p>
                    <img
                      className={styles.HabitCheckmark}
                      onClick={() => {
                        HabitCheck(habit.id);
                        // setExecutionRecord(habit.id);
                        console.log(habit.id + habit.executionRecord);
                      }}
                      src={hello(habit.id)}
                      alt="hello"
                    ></img>
                  </div>
                );
              })}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

//export default HabbitChallenge;
