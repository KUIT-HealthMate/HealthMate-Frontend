import styles from "./DailyBar.module.scss";
interface propsType {
    title: string;
    avg: number;
    score: number;
}


const DailyBar = (props: propsType) => {
    return (
        <div className={styles.progressBarWrap}>
            <div className={styles.chartDetailTop}>
                <div className={styles.chartDetailText}>{props.title}</div>
                <div className={styles.chartDetailScore}>
                    <div style={{ color: `#0E9494` }}>{props.score}</div><div style={{ color: `#B7B7B7` }}>/100</div>
                </div>
            </div>
            <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: `${props.score}%` }}>
                    <div className={styles.numZero}>0</div>
                    <div className={styles.circleZero} style={props.score >= props.avg ? { left: `${props.avg}%` } : { left: `${props.avg}%`, background: `#119695` }}></div>
                    <div className={styles.numScore}>{props.score}</div>
                </div>
                {props.score == 100 ? null : <div className={styles.fullScore}>100</div>}

                <p className={styles.numAvg} style={{ left: `calc(${props.avg}% - 20px)` }}>평균 {props.avg}점</p>
            </div>

        </div>
    )

}

export default DailyBar;