import { start } from "repl";
import styles from "./DailyHealthChart.module.scss"
import DailyBar from "./DailyBar";

const detailInfos = [
    { id: 1, title: "생활 습관의 규칙성", avg: 35, score: 65 },
    { id: 2, title: "일에 대한 몰입도", avg: 40, score: 95 },
    { id: 3, title: "자세의 바른 정도", avg: 50, score: 45 }
]


const DailyHealthChart = () => {
    return (
        <div className={styles.chartDetailPage}>
            <div className={styles.chartDetailWrap}>
                <div className={styles.chartDetail}>

                    {detailInfos.map((detailInfo, idx) => {
                        console.log(detailInfo.avg)
                        return (
                            <DailyBar title={detailInfo.title} avg={detailInfo.avg} score={detailInfo.score} ></DailyBar>
                        );

                    })}
                </div>
            </div>

        </div>
    )
}

export default DailyHealthChart;
