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

const cookies = new Cookies();

export const getCookie = (name: string) => {
  console.log("cookie: ", name);
  return cookies.get(name);
}

const Home = () => {
  const navigate = useNavigate();

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

  useEffect(() => {
    console.log("home")
    //local 스토리지에 token 넣어주기 (로그인에서 진행되어야할 부분임)
    // localStorage.setItem("jwtToken", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNjQ5NjU4MTQzIiwiaWF0IjoxNzIzMDg1ODA4LCJleHAiOjE3MjY2ODU4MDgsInVzZXJJZCI6MX0.0y4fkQBnXqIXNJEPt9RZRpCI0HDBCE50KOPeHjelCw8");

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
