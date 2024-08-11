import styles from "./Home.module.scss";
import TodaysChallenge from "./TodayChallenge";
import SupplementChallenge from "./Challenge/SupplementChallenge";

import HabitChallenge from "./Challenge/HabitChallenge";
import TopBar from "../../components/organs/Bars/TopBar";

import { useNavigate } from "react-router-dom";

import home from "../../apis/home";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <TopBar></TopBar>
      <div className={styles.Header}></div>
      <TodaysChallenge></TodaysChallenge>
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
