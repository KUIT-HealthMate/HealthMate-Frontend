import { useState } from "react";
import LinearChart from "./LinearChart/LinearChart";
import HabbitScore from "../../components/organs/HabbitScore/HabbitScore";
import s from "./HealthChart.module.scss";
import dayjs from "dayjs";
import backWard from "../../assets/backward.svg";
import forWard from "../../assets/forward.svg";

export type periodName = "daily" | "weekly" | "monthly";

export default function HealthChart() {
  const [chart, setChart] = useState<boolean>(false);
  //차트(barChart/LineChart) 선택하는 state다.
  //차트에 쓸 데이터도 이 화면에서 가져와야됨
  const [period, setPeriod] = useState<periodName>("daily");

  const handlePeriod = (newPeriod: periodName) => {
    setPeriod(newPeriod);
  };

  const [today, setToday] = useState(dayjs());

  function formattingDate(period: periodName, today: dayjs.Dayjs): string {
    switch (period) {
      case "daily":
        return today.format("YYYY.MM.DD").toString();
      case "weekly":
        if (today.day() === 0) {
          const firstDate = today.subtract(6, "day");
          const lastDate = firstDate.add(6, "day");
          return `${firstDate.format("YYYY.MM.DD")} ~ ${lastDate.format(
            "MM.DD"
          )}`;
        } else {
          const firstDate = today.startOf("week").add(1, "day");
          const lastDate = firstDate.add(6, "day");
          return `${firstDate.format("YYYY.MM.DD")} ~ ${lastDate.format(
            "MM.DD"
          )}`;
        }
      case "monthly":
        return today.format("YYYY.MM");
    }
  }

  function increasingDate(period: periodName, today: dayjs.Dayjs) {
    switch (period) {
      case "daily":
        return setToday(today.add(1, "day"));
      case "weekly":
        return setToday(today.add(1, "week"));
      case "monthly":
        return setToday(today.add(1, "month"));
    }
  }

  function decreasingDate(period: periodName, today: dayjs.Dayjs) {
    switch (period) {
      case "daily":
        return setToday(today.subtract(1, "day"));
      case "weekly":
        return setToday(today.subtract(1, "week"));
      case "monthly":
        return setToday(today.subtract(1, "month"));
    }
  }

  return (
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
          <img
            src={forWard}
            alt="다음"
            className={s.arrow}
            onClick={() => increasingDate(period, today)}
          />
        </div>
        <div className={s.periodSelector}>
          <div
            className={`${s.linkButton} ${
              period === "daily" ? s.selected : ""
            }`}
            onClick={() => handlePeriod("daily")}
          >
            일간 현황
          </div>
          <div
            className={`${s.linkButton} ${
              period === "weekly" ? s.selected : ""
            }`}
            onClick={() => handlePeriod("weekly")}
          >
            주간 현황
          </div>
          <div
            className={`${s.linkButton} ${
              period === "monthly" ? s.selected : ""
            }`}
            onClick={() => handlePeriod("monthly")}
          >
            월간 현황
          </div>
        </div>
      </div>
      <LinearChart />
      <HabbitScore period={period} periodScore={80} averageScore={60} />
    </div>
  );
}
