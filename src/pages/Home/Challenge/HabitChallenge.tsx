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
// import habitInfo from "../../../store/habitInfo";

//api 관련
import { putHabitCheck } from "../../../APIs/home/homeApi";
import { habitDto } from "../../../dtos/home/homeDto";

SwiperCore.use([Pagination, Navigation]);

interface HabitChallengeProps {
  habits: habitDto[];
}

export default function HabitChallenge(props: HabitChallengeProps) {
  console.log("HabitChallenge: ", props.habits);
  const { HabitInfo, getExecutionRecord } =
    useHabitInfoStore();

  const splitHabits = (array: habitDto[]) => {
    const result = [];
    for (let i = 0; i < array.length; i += 4) {
      result.push(array.slice(i, i + 4));
    }
    return result;
  };

  const [newHabits, setNewHabits] = useState<habitDto[][]>([props.habits]);

  useEffect(() => {
    const chunks = splitHabits(props.habits);
    setNewHabits(chunks);
  }, [HabitInfo]);


  function HabitCheck(habitId: number) {
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
          console.log("chunk:", chunk)
          return (
            <SwiperSlide>

              {chunk.map((habit, habitIndex) => {
                return (
                  <div className={styles.HabitInfo}>
                    <p className={styles.HabitName}>{habit.challengeName}</p>
                    <img
                      className={styles.HabitCheckmark}
                      onClick={() => {
                        HabitCheck(habitIndex);
                        // setExecutionRecord(habit.id);
                        // console.log(habit.id + habit.executionRecord);
                      }}
                      //src={hello(habitIndex)}
                      src={habit.achievementStatus === true ? checkmark : uncheckmark}
                      alt="check_uncheck"
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
