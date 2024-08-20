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
import { Cookies } from 'react-cookie';

import { usePillInfoStore } from '../../store/usePillInfoStore';
import useHabitInfoStore from '../../store/useHabitInfoStore';

const cookies = new Cookies();

export const getCookie = (name: string) => {
  console.log("cookie: ", name);
  return cookies.get(name);
}

const Home = () => {
  const navigate = useNavigate();

  const { initializePills } = usePillInfoStore();
  const { initializeHabits } = useHabitInfoStore();

  useEffect(() => {
    console.log("home")
    // 컴포넌트가 마운트될 때 데이터 가져오기

    //로그인X->로그인 페이지로
    const JWT_TOKEN = localStorage.getItem('jwtToken');
    console.log("JWT_TOKEN: ", JWT_TOKEN)
    if (JWT_TOKEN === null) {
      navigate('/login')
    }

    initializePills();
    initializeHabits();
    gethomeInfoMutation.mutate();
    // eslint-disable-next-line
  }, []);

  const [habits, setHabits] = useState<habitDto[]>([]);
  const [supplements, setSupplements] = useState<supplementDto[]>([]);

  const [achievementRate, setAchievementRate] = useState<number>(0);

  const gethomeInfoMutation = useMutation(gethomeInfo, {
    onSuccess: (response) => {
      console.log('홈 정보 가져오기 성공:', response.result);

      setAchievementRate(response.result.achievementRate);
      setSupplements(response.result.supplement);
      setHabits(response.result.habit);
    },
    onError: (error) => {
      console.error('홈정보 가져오기 실패:', error);
    },
  })




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
