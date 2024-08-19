import LinearChartSetting from "./LinearChartSetting";
import s from "./LinearChart.module.scss";
import changeChartButton from "../../../assets/changChartButton.svg";
// import { notDayResult } from "../dataTypes";

export interface ChartProps {
  data: number[];
  avgData: number[];
  barOrLine: () => void;
  xAxisVal: string[];
}

export default function LinearChart({
  data,
  avgData,
  barOrLine,
  xAxisVal,
}: ChartProps) {
  const labels: number[] = [];
  xAxisVal.forEach((val, index) => {
    labels.push(index);
  });

  const myScore: number[] = [];
  data.forEach((val) => {
    myScore.push(Number(val.toFixed()));
  });

  const avgScore: number[] = [];
  avgData.forEach((val) => {
    avgScore.push(Number(val.toFixed()));
  });

  return (
    <div className={s.componentContainer}>
      <div className={s.top}>
        <div className={s.title}>차트보기</div>
        <img
          src={changeChartButton}
          alt="changeChart"
          className={s.change}
          onClick={barOrLine}
        />
      </div>
      {labels.length > data.length ? (
        <div className={s.problemOccured}>
          <div>차트데이터를 불러오는데</div>
          <div>문제가 발생했어요.</div>
        </div>
      ) : (
        <>
          <div className={s.chartAndColumns}>
            <div
              className={`${s.linearChartContainer} ${
                xAxisVal.length === 4 ? s.isMonthly : ""
              }`}
            >
              <LinearChartSetting
                dates={labels}
                myScores={myScore}
                averageScores={avgScore}
              />
            </div>
            <div className={s.columns}>
              <div className={s.lineContainer}>
                <div className={s.greyLine1} />
                <div className={s.greyLine1} />
                <div className={s.greyLine1} />
                <div className={s.greyLine2} />
              </div>
            </div>
          </div>

          <div
            className={`${s.xContainer} ${
              xAxisVal.length === 4 ? s.isMonthly : ""
            }`}
          >
            <div className={s.xAxis}>
              {xAxisVal.map((date) => (
                <div className={s.xAtom}>{`${date}`}</div>
              ))}
            </div>
          </div>
          <div className={s.bottom}>
            <div className={s.legend}>
              <div className={s.myScore}></div>
              <div className={s.text}>내 점수</div>
            </div>
            <div className={s.legend}>
              <div className={s.averageScore}></div>
              <div className={s.text}>사용자 평균</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
