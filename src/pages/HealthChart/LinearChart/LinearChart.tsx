import React from "react";
import LinearChartSetting from "./LinearChartSetting";
import s from "./LinearChart.module.scss";
import changeChartButton from "../../../assets/changChartButton.svg";
import { ChartDataType } from "../../../test/mock/mockupForChart";

const dates = [11, 12, 13, 14, 15, 16, 17];
const myScores = [80, 60, 100, 80, 75, 80, 55];
const averageScores = [40, 20, 45, 70, 15, 46, 55];

export interface ChartProps {
  data: ChartDataType;
  barOrLine: () => void;
}
//차트입니다 차트
export default function LinearChart({ data, barOrLine }: ChartProps) {
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
      <div className={s.chartAndColumns}>
        <div className={s.linearChartContainer}>
          <LinearChartSetting
            dates={dates}
            myScores={myScores}
            averageScores={averageScores}
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

      <div className={s.xContainer}>
        <div className={s.xAxis}>
          {dates.map((date) => (
            <div className={s.xAtom}>{`${date}일`}</div>
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
    </div>
  );
}
