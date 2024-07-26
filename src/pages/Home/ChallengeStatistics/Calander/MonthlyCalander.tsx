import dayjs from "dayjs";
import { useEffect, useState } from "react";
import s from "./MonthlyCalander.module.scss";
import DailyDetails from "../DailyDetails";
import { CalanderDataType } from "./WeeklyCalander";

interface CalanderProps {
  periodSelect: dayjs.Dayjs;
}

export default function MonthlyCalander({ periodSelect }: CalanderProps) {
  const monthlyCalanderFormat: Array<Array<CalanderDataType>> = [
    [],
    [],
    [],
    [],
    [],
    [],
  ]; //한달에 최대 6주차까지 있을 수 있음
  const weekName: Array<string> = ["월", "화", "수", "목", "금", "토", "일"];
  const [selectedDay, setSelectedDay] = useState<null | dayjs.Dayjs>(null);

  const handleSelectedDay = (day: null | dayjs.Dayjs) => {
    setSelectedDay(day);
  };

  useEffect(() => {
    setSelectedDay(null);
  }, [periodSelect]);

  switch (periodSelect.startOf("month").format("dddd")) {
    case "월요일":
      break;
    case "화요일":
      for (let i = 0; i < 1; i++) {
        monthlyCalanderFormat[0].push(null);
      }
      break;
    case "수요일":
      for (let i = 0; i < 2; i++) {
        monthlyCalanderFormat[0].push(null);
      }
      break;
    case "목요일":
      for (let i = 0; i < 3; i++) {
        monthlyCalanderFormat[0].push(null);
      }
      break;
    case "금요일":
      for (let i = 0; i < 4; i++) {
        monthlyCalanderFormat[0].push(null);
      }
      break;
    case "토요일":
      for (let i = 0; i < 5; i++) {
        monthlyCalanderFormat[0].push(null);
      }
      break;
    case "일요일":
      for (let i = 0; i < 6; i++) {
        monthlyCalanderFormat[0].push(null);
      }
      break;
  }
  let i = periodSelect.startOf("month");

  for (let j = 0; i.month() < periodSelect.month() + 1; j++) {
    console.log(j);
    for (i; monthlyCalanderFormat[j].length !== 7; i = i.add(1, "day")) {
      if (i.month() !== periodSelect.month()) break;
      monthlyCalanderFormat[j].push(i);
    }
  }

  for (
    let j = monthlyCalanderFormat.length - 1;
    monthlyCalanderFormat[j].length < 7;
    j--
  ) {
    if (monthlyCalanderFormat[j].length === 0) {
      monthlyCalanderFormat.pop();
    } else {
      while (monthlyCalanderFormat[j].length < 7) {
        monthlyCalanderFormat[j].push(null);
      }
    }
  }

  console.log(monthlyCalanderFormat);

  return (
    <div className={s.calanderContainer}>
      <div className={s.calander}>
        <div className={s.weekIndex}>
          {weekName.map((name) => (
            <div className={s.dayName}>{name}</div>
          ))}
        </div>
        <div className={s.calanderItem}>
          {monthlyCalanderFormat.map((week, wIndex) => (
            <div className={s.weekContainer}>
              {monthlyCalanderFormat[wIndex].map((date, dIndex) => (
                <div
                  className={`${s.dateContainer} ${
                    selectedDay !== null && selectedDay.date() === date?.date()
                      ? s.selected
                      : ""
                  }`}
                  onClick={() => handleSelectedDay(date)}
                >
                  <div className={s.date}>
                    {date?.date() === null ? "" : date?.date()}
                  </div>
                  <div className={s.acheivement}></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={s.divider} />
      <DailyDetails date={selectedDay} />
    </div>
  );
}
