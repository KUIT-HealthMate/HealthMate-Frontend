import styles from "./Chart.module.scss";
import BarGarph from "./BarGraph";
import changeChartButton from "../../../assets/changChartButton.svg";
import { ChartProps } from "../LinearChart/LinearChart";

export default function Chart({
  data,
  avgData,
  barOrLine,
  xAxisVal,
}: ChartProps) {
  const myScore: number[] = [];
  data.forEach((val) => {
    myScore.push(Number(val.toFixed()));
  });

  const avgScore: number[] = [];
  avgData.forEach((val) => {
    avgScore.push(Number(val.toFixed()));
  });

  const chartData = xAxisVal.map((label, index) => ({
    date: label,
    myScore: myScore[index],
    avgScore: avgScore[index],
  }));

  return (
    <div className={styles.chart}>
      <div className={styles.chartTop}>
        <div className={styles.chartText}>차트보기</div>
        <img
          className={styles.changeChartBtn}
          src={changeChartButton}
          alt="BarChart"
          onClick={barOrLine}
        />
      </div>
      <BarGarph data={chartData} />
      <div className={styles.chartBottom}>
        <div className={styles.legend}>
          <div className={styles.legendColor}></div>{" "}
          <div className={styles.legendText}>내 점수</div>
        </div>
        <div className={styles.legend}>
          <div
            className={styles.legendColor}
            style={{ backgroundColor: `#F97F59` }}
          ></div>{" "}
          <div className={styles.legendText}>사용자 평균</div>
        </div>
      </div>
    </div>
  );
}
