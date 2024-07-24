import dayjs from "dayjs";
import { useEffect, useState } from "react";
import s from "./WeeklyCalander.module.scss";
import DailyDetails from "../DailyDetails";

interface CalanderProps {
  monthSelect: dayjs.Dayjs;
}

export default function WeeklyCalander({ monthSelect }: CalanderProps) {
  const weeklyCalanderFormat = []; //한달에 최대 6주차까지 있을 수 있음
  const weekName: Array<string> = ["월", "화", "수", "목", "금", "토", "일"];
  const [selectedDay, setSelectedDay] = useState<null | dayjs.Dayjs>(null);

  const handleSelectedDay = (day: number) => {
    setSelectedDay(monthSelect.set("date", day));
  };

  useEffect(() => {
    setSelectedDay(null);
  }, [monthSelect]);

  //monthSelect.startOf('weeks') 하면 해당 주의 첫번째 일요일 나옴
  const firstdayOfWeek = monthSelect.startOf("weeks").add(1, "day");
  while (firstdayOfWeek.month() < monthSelect.month())
    firstdayOfWeek.add(1, "day");

  switch (firstdayOfWeek.format("dddd")) {
    case "월요일":
      break;
    case "화요일":
      for (let i = 0; i < 1; i++) {
        weeklyCalanderFormat.push(0);
      }
      break;
    case "수요일":
      for (let i = 0; i < 2; i++) {
        weeklyCalanderFormat.push(0);
      }
      break;
    case "목요일":
      for (let i = 0; i < 3; i++) {
        weeklyCalanderFormat.push(0);
      }
      break;
    case "금요일":
      for (let i = 0; i < 4; i++) {
        weeklyCalanderFormat.push(0);
      }
      break;
    case "토요일":
      for (let i = 0; i < 5; i++) {
        weeklyCalanderFormat.push(0);
      }
      break;
    case "일요일":
      for (let i = 0; i < 6; i++) {
        weeklyCalanderFormat.push(0);
      }
      break;
  }

  for (let i = firstdayOfWeek.date(); weeklyCalanderFormat.length < 7; i++) {
    weeklyCalanderFormat.push(i);
  }
  console.log(selectedDay);

  return (
    <div className={s.calanderContainer}>
      <div className={s.calander}>
        <div className={s.weekIndex}>
          {weekName.map((name) => (
            <div className={s.dayName}>{name}</div>
          ))}
        </div>
      </div>
      <div className={s.calanderItem}>
        <div className={s.weekContainer}>
          {weeklyCalanderFormat.map((date, dIndex) => (
            <div
              className={`${s.dateContainer} ${
                selectedDay !== null && selectedDay.date() === date
                  ? s.selected
                  : ""
              }`}
              onClick={() => handleSelectedDay(date)}
            >
              <div className={s.date}>{date === 0 ? "" : date}</div>
              <div className={s.acheivement}></div>
            </div>
          ))}
        </div>
      </div>
      <div className={s.divider} />
      <DailyDetails date={selectedDay} />
    </div>
  );
}
