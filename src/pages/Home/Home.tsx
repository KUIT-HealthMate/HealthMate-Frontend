import styles from "./Home.module.scss";
import TodaysChallenge from "./TodayChallenge";
import SupplementChallenge from "./Challenge/SupplementChallenge";

import HabitChallenge from "./Challenge/HabitChallenge";
import TopBar from "../../components/organs/Bars/TopBar";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';

import { gethomeInfo } from "../../APIs/home/homeApi";
import { useMutation } from 'react-query';
import { habitDto, supplementDto } from "../../dtos/home/homeDto";

const Home = () => {
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  //const [habits, setHabits] = useState<habitDto[]>([]);
  // const [supplements, setSupplements] = useState<supplementDto[]>([]);
  const [achievementRate, setAchievementRate] = useState<number>(0);



  const gethomeInfoMutation = useMutation(gethomeInfo, {
    onSuccess: (data) => {
      console.log('다른사용자 게시물 리스트 성공:', data);
      setAchievementRate(data.status)
      //setHabits(data);
    },
    onError: (error) => {
      console.error('다른사용자 게시물 실패:', error);
    },
  })

  useEffect(() => {
    gethomeInfoMutation.mutate();
  }, []);


  return (
    <div>
      <TopBar></TopBar>
      <div className={styles.Header}></div>

      <TodaysChallenge achievementRate={achievementRate}></TodaysChallenge>

      <SupplementChallenge></SupplementChallenge>
      <div className={styles.gap}></div>
      <HabitChallenge></HabitChallenge>
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
