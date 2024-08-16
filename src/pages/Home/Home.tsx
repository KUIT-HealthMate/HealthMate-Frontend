import styles from "./Home.module.scss";
import TodaysChallenge from "./TodayChallenge";
import SupplementChallenge from "./Challenge/SupplementChallenge";

import HabitChallenge from "./Challenge/HabitChallenge";
import TopBar from "../../components/organs/Bars/TopBar";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { gethomeInfo } from "../../APIs/home/homeApi";
import { useMutation } from 'react-query';
import { habitDto, supplementDto } from "../../dtos/home/homeDto";

const Home = () => {
  const navigate = useNavigate();

  const [habits, setHabits] = useState<habitDto[]>([]);
  const [supplements, setSupplements] = useState<supplementDto[]>([]);

  const [achievementRate, setAchievementRate] = useState<number>(0);

  const gethomeInfoMutation = useMutation(gethomeInfo, {
    onSuccess: (response) => {
      console.log('홈 정보 가져오기 성공:', response.result);
      console.log('홈 정보 습관:', response.result.habit);
      console.log('홈 정보 알약:', response.result.supplement);
      console.log('홈 정보 퍼센트:', response.result.achievementRate);

      //가져온 값들로 set
      //setHabits(response.result.habit); //일단 값 없으니까 주석처리
      // 영양제도 마찬가지로 주석처리
      setAchievementRate(response.result.achievementRate);
      setSupplements(response.result.supplement);
      setHabits(response.result.habit);
    },
    onError: (error) => {
      console.error('홈정보 가져오기 실패:', error);
    },
  })

  useEffect(() => {
    // 컴포넌트가 마운트될 때 데이터 가져오기
    gethomeInfoMutation.mutate();
    // eslint-disable-next-line 
  }, []);


  return (
    <div>
      <TopBar></TopBar>
      <div className={styles.Header}></div>
      <TodaysChallenge achievementRate={achievementRate}></TodaysChallenge>
      <SupplementChallenge supplements={supplements}></SupplementChallenge>
      <div className={styles.gap}></div>
      <HabitChallenge habits={habits}></HabitChallenge>
      <button
        className={styles.dailyCheckButton}
        onClick={() => {
          navigate("/dailycheckstart");
        }}
      >
        일일 건강진단하기
      </button>
    </div>
  );
};

export default Home;
