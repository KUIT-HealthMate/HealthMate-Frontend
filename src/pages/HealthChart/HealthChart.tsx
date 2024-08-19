import { useEffect, useState } from "react";
import LinearChart from "./LinearChart/LinearChart";
import HabbitScore from "./HabbitScore/HabbitScore";
import s from "./HealthChart.module.scss";
import dayjs from "dayjs";
import backWard from "../../assets/backward.svg";
import forWard from "../../assets/forward.svg";
import disabledForward from "../../assets/disabledForward.svg";
import Chart from "./BarGraph/Chart";
import ChartTopBar from "./ChartTopBar";
import DailyHealthChart from "./DailyHealthChart/DailyHealthChart";
import { getChartData } from "../../APIs/ChartDataAPI/getChartData";
import { dayResult, notDayResult } from "./dataTypes";
import { useNavigate } from "react-router-dom";
import {
  formattingDate,
  selectPeriod,
  setAverageChartData,
  setChartData,
  setHabbitScoreData,
} from "./functions";

export type periodName = "day" | "week" | "month";
export type chartDataType = "habbit" | "mealPattern" | "sleepingPattern";

export default function HealthChart() {
  const navigate = useNavigate();
  const [chartType, setChartType] = useState<boolean>(false);
  //차트(barChart/LineChart) 선택하는 state다. 기본적으로 false(barChart), 차트변경버튼 누르면 true(LineChart)
  //차트에 쓸 데이터도 이 화면에서 가져와야됨

  const [dayData, setDayData] = useState<dayResult | null>(null);
  const [noneDayData, setNoneDayData] = useState<notDayResult | null>(null);
  const [dataType, setDataType] = useState<chartDataType>("habbit");
  const [period, setPeriod] = useState<periodName>("day");
  const [today, setToday] = useState(dayjs());

  const handleChart = () => {
    setChartType(!chartType);
  };

  const handleChartDataType = (newChartDataType: chartDataType) => {
    setDataType(newChartDataType);
  };

  const handlePeriod = (newPeriod: periodName) => {
    setPeriod(newPeriod);
  };

  function increasingDate(period: periodName, today: dayjs.Dayjs) {
    switch (period) {
      case "day":
        return setToday(today.add(1, "day"));
      case "week":
        return setToday(today.add(1, "week"));
      case "month":
        return setToday(today.add(1, "month"));
    }
  }

  function decreasingDate(period: periodName, today: dayjs.Dayjs) {
    switch (period) {
      case "day":
        return setToday(today.subtract(1, "day"));
      case "week":
        return setToday(today.subtract(1, "week"));
      case "month":
        return setToday(today.subtract(1, "month"));
    }
  }

  const disableIncreaseButton = selectPeriod(period, today).isSame(
    selectPeriod(period, dayjs()),
    "dates"
  );

  function setXAxis(period: periodName) {
    const xAxisVal = ["첫째 주", "둘째 주", "셋째 주", "넷째 주"];
    if (period === "week") {
      while (xAxisVal.length > 0) xAxisVal.pop();
      for (let i = 0; i < 7; i++) {
        xAxisVal.push(selectPeriod(period, today).add(i, "day").format("DD일"));
      }
      return xAxisVal;
    } else return xAxisVal;
  }

  const xAxisVal = setXAxis(period);
  const habbitScoreData = setHabbitScoreData(dataType, dayData, noneDayData);
  const chartData = setChartData(dataType, noneDayData);
  const chartAverageData = setAverageChartData(dataType, noneDayData);

  useEffect(() => {
    getChartData(period, today).then((response) => {
      if (period === "day") {
        setDayData(response as dayResult);
        setNoneDayData(null);
      } else {
        setDayData(null);
        setNoneDayData(response as notDayResult);
      }
    });
  }, [period, today]);

  return (
    <div>
      <ChartTopBar
        chartDataType={dataType}
        setChartDataType={handleChartDataType}
      />
      <div className={s.healthChart}>
        <div className={s.selector}>
          <div className={s.dateSelector}>
            <img
              src={backWard}
              alt="이전"
              className={s.arrow}
              onClick={() => decreasingDate(period, today)}
            />
            <div className={s.date}>{formattingDate(period, today)}</div>
            {disableIncreaseButton ? (
              <img src={disabledForward} alt="다음" className={s.arrow} />
            ) : (
              <img
                src={forWard}
                alt="다음"
                className={s.arrow}
                onClick={() => increasingDate(period, today)}
              />
            )}
          </div>
          <div className={s.periodSelector}>
            <div
              className={`${s.linkButton} ${
                period === "day" ? s.selected : ""
              }`}
              onClick={() => handlePeriod("day")}
            >
              일간 현황
            </div>
            <div
              className={`${s.linkButton} ${
                period === "week" ? s.selected : ""
              }`}
              onClick={() => handlePeriod("week")}
            >
              주간 현황
            </div>
            <div
              className={`${s.linkButton} ${
                period === "month" ? s.selected : ""
              }`}
              onClick={() => handlePeriod("month")}
            >
              월간 현황
            </div>
          </div>
        </div>
        {period !== "day" && (
          <div>
            {chartType ? (
              <LinearChart
                data={chartData}
                avgData={chartAverageData}
                barOrLine={handleChart}
                xAxisVal={xAxisVal}
              />
            ) : (
              <Chart
                data={chartData}
                avgData={chartAverageData}
                barOrLine={handleChart}
                xAxisVal={xAxisVal}
              />
            )}
          </div>
        )}
        {habbitScoreData[0] && habbitScoreData[1] ? (
          <HabbitScore
            period={period}
            periodScore={Number(habbitScoreData[0].toFixed())}
            averageScore={Number(habbitScoreData[1].toFixed())}
            dataType={dataType}
          />
        ) : (
          <div className={s.noData}>
            <div>생활습관 점수를 확인할 수 있는</div>
            <div>데이터가 없어요.</div>
          </div>
        )}

        {period === "day" && (
          <DailyHealthChart dataType={dataType} data={dayData} />
        )}
      </div>
      <button
        className={s.dailyCheckButton}
        onClick={() => {
          navigate("/dailycheckstart");
        }}
      >
        일일 건강진단하기
      </button>
    </div>
  );
}
