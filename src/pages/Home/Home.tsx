import styles from "./Home.module.scss";
import TodaysChallenge from "./TodayChallenge";
import SupplementChallenge from "./SupplementChallenge";
import HabbitChallenge from "./HabbitChallenge";


const Home = () => (
    <div>
        <div className={styles.Header}></div>
        <TodaysChallenge></TodaysChallenge>
        <SupplementChallenge></SupplementChallenge>
        <div className={styles.gap}></div>
        <HabbitChallenge></HabbitChallenge>

    </div>
)

export default Home;