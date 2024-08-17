import styles from "../Home.module.scss";

import clampR from "../../../assets/clampR.svg";
import habitIcon from "../../../assets/habiticon.svg";
import checkmark from "../../../assets/checkmark.svg";
import uncheckmark from "../../../assets/uncheckmark.svg";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import useHabitInfoStore from "../../../store/useHabitInfoStore";

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


  // const [habitStatus, setHabitStatus] = useState<boolean[]>([]);
  //useState(props.habits.map(habit => habit.achievementStatus));


  // console.log("habitStatus: ", habitStatus);


  const splitHabits = (array: habitDto[]) => {
    console.log("splitHabits: ", array)
    const result = [];
    for (let i = 0; i < array.length; i += 4) {
      result.push(array.slice(i, i + 4));
    }
    console.log("habit result: ", result)
    return result;
  };

  const [newHabits, setNewHabits] = useState<habitDto[][]>([props.habits]);

  useEffect(() => { //처음 페이지 진입시
    console.log("habit useEffect")
    const chunks = splitHabits(props.habits);
    setNewHabits(chunks);
    // setHabitStatus(props.habits.map(habit => habit.achievementStatus));
  }, [props.habits]);

  useEffect(() => {
    console.log("색 바꿔: ", newHabits)

  }, [newHabits])


  const today = new Date();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const date = (today.getDate()).toString().padStart(2, '0');
  const todayDate = `${today.getFullYear()}-${month}-${date}`;

  function HabitCheck(habitId: number, habitIndex: number, chunkIndex: number) {

    // 체크하면 서버 전송 & 로컬에서 변경
    putHabitCheck(todayDate, habitId);

    const newNewHabits = JSON.parse(JSON.stringify(newHabits));
    newNewHabits[chunkIndex][habitIndex].achievementStatus = !newHabits[chunkIndex][habitIndex].achievementStatus
    setNewHabits(newNewHabits);

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
                        HabitCheck(habit.challengeId, habitIndex, chunkIndex);
                      }}
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
