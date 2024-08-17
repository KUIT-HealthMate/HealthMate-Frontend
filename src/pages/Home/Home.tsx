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

  const [habits] = useState<habitDto[]>([{ challengeName: "test1", achievementStatus: false }, { challengeName: "test2", achievementStatus: true }]);
  const [supplements] = useState<supplementDto[]>([
    {
      challengeName: "test1",
      breakfastSuccess: true,
      lunchSuccess: true,
      dinnerSuccess: true,
      breakfastRequired: false,
      lunchRequired: true,
      dinnerRequired: false,
      success: true
    },
    {
      challengeName: "test2",
      breakfastSuccess: true,
      lunchSuccess: true,
      dinnerSuccess: true,
      breakfastRequired: true,
      lunchRequired: true,
      dinnerRequired: true,
      success: true
    }]);
  const [achievementRate, setAchievementRate] = useState<number>(0);

  //zustand안쓰고 클릭마다 통신


  const gethomeInfoMutation = useMutation(gethomeInfo, {
    onSuccess: (response) => {
      console.log('홈 정보 가져오기 성공:', response.result);
      console.log('홈 정보 습관:', response.result.habit);
      console.log('홈 정보 퍼센트:', response.result.achievementRate);

      //가져온 값들로 set
      //setHabits(response.result.habit); //일단 값 없으니까 주석처리
      // 영양제도 마찬가지로 주석처리
      setAchievementRate(response.result.achievementRate);
    },
    onError: (error) => {
      console.error('홈정보 가져오기 실패:', error);
    },
  })

  useEffect(() => {
    // 컴포넌트가 마운트될 때 데이터 가져오기
    gethomeInfoMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
