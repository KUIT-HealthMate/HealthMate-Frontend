import styles from "./Home.module.scss";

const TodaysChallenge = () => (
    <div className={styles.TodaysChallenge}>
        <h2 className={styles.HomeHeader}>오늘의 챌린지</h2>
        <p className={styles.HomeText}>오늘 진행할 건강 챌린지 리스트와<br></br>진행 현황을 확인해보세요!</p>

        <button className={styles.Statistics}></button>
    </div>
)

export default TodaysChallenge;