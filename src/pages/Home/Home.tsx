import styles from "./Home.module.scss";
import TodaysChallenge from "./TodayChallenge";
import SupplementChallenge from "./SupplementChallenge";
import HabitChallenge from "./HabitChallenge";

import TopBar from "../../components/organs/TopBar";
import BottomBar from "../../components/organs/BottomBar";


const Home = () => (
    <div>
        <TopBar></TopBar>

        <div className={styles.Header}></div>
        <TodaysChallenge></TodaysChallenge>
        <SupplementChallenge></SupplementChallenge>
        <div className={styles.gap}></div>
        <HabitChallenge></HabitChallenge>
        <button className={styles.dailyCheckButton}>일일 건강진단하기</button>

        <BottomBar></BottomBar>

    </div>
)

export default Home;