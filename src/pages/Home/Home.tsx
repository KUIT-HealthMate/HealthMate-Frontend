import styles from "./Home.module.scss";
import TodaysChallenge from "./TodayChallenge";
import SupplementChallenge from "./SupplementChallenge";
import HabitChallenge from "./HabitChallenge";
import TopBar from "../../components/organs/TopBar";


import { useNavigate } from "react-router-dom";

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
      <button className={styles.dailyCheckButton} onClick={() => { navigate('/dailycheckstart') }}>일일 건강진단하기</button>
    </div>
  )
};


export default Home;
