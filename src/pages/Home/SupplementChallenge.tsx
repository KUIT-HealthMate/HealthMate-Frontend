import styles from "./Home.module.scss";
import pill from "../../assets/pill.svg";
import clampR from "../../assets/clampR.svg";


const SupplementChallenge = () => (
    <div className={styles.PillChallenge}>
        <div className={styles.PillChallengeTitle}>
            <img src={pill} className={styles.PillImg}></img>
            <h1 className={styles.PillText}>영양제 챌린지</h1>
            <h3 className={styles.PillEdit}>편집하기<img src={clampR} className={styles.clampR}></img></h3>
        </div>

    </div>
)

export default SupplementChallenge;