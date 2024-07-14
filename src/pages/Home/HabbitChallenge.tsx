import styles from "./Home.module.scss";

import clampR from "../../assets/clampR.svg";
import habbitIcon from "../../assets/habbiticon.svg";

const HabbitChallenge = () => (
    <div className={styles.HabbitChallenge}>
        <div className={styles.HabbitChallengeTitle}>
            <img src={habbitIcon} className={styles.HabbitImg}></img>
            <h1 className={styles.HabbitText}>습관 챌린지</h1>
            <h3 className={styles.HabbitEdit}>편집하기<img src={clampR} className={styles.clampR}></img></h3>
        </div>
    </div>
)

export default HabbitChallenge;