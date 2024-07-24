import dayjs from "dayjs";
import { useEffect, useState } from "react";
import s from "./MonthlyCalander.module.scss";
import DailyDetails from "../DailyDetails";

interface CalanderProps {
  monthSelect: dayjs.Dayjs;
}

export default function MonthlyCalander({ monthSelect }: CalanderProps) {
  const monthlyCalanderFormat: Array<Array<number>> = [[], [], [], [], [], []]; //한달에 최대 6주차까지 있을 수 있음
  const weekName: Array<string> = ["월", "화", "수", "목", "금", "토", "일"];
  const [selectedDay, setSelectedDay] = useState<null | dayjs.Dayjs>(null);

  const handleSelectedDay = (date: number) => {
    setSelectedDay(monthSelect.set("date", date));
  };

  useEffect(() => {
    setSelectedDay(null);
  }, [monthSelect]);

  const daysinMonth = monthSelect.daysInMonth();

  switch (monthSelect.startOf("month").format("dddd")) {
    case "월요일":
      break;
    case "화요일":
      for (let i = 0; i < 1; i++) {
        monthlyCalanderFormat[0].push(0);
      }
      break;
    case "수요일":
      for (let i = 0; i < 2; i++) {
        monthlyCalanderFormat[0].push(0);
      }
      break;
    case "목요일":
      for (let i = 0; i < 3; i++) {
        monthlyCalanderFormat[0].push(0);
      }
      break;
    case "금요일":
      for (let i = 0; i < 4; i++) {
        monthlyCalanderFormat[0].push(0);
      }
      break;
    case "토요일":
      for (let i = 0; i < 5; i++) {
        monthlyCalanderFormat[0].push(0);
      }
      break;
    case "일요일":
      for (let i = 0; i < 6; i++) {
        monthlyCalanderFormat[0].push(0);
      }
      break;
  }
  let j = 0;
  for (let i = 1; i < daysinMonth + 1; i++) {
    monthlyCalanderFormat[j].push(i);
    if (monthlyCalanderFormat[j].length === 7) j++;
  }

  if (monthlyCalanderFormat[j].length !== 0) {
    while (monthlyCalanderFormat[j].length !== 7) {
      monthlyCalanderFormat[j].push(0);
    }
  }

  if (monthlyCalanderFormat[monthlyCalanderFormat.length - 1].length === 0)
    monthlyCalanderFormat.pop();
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
          ))}
        </div>
      </div>
      <div className={s.divider} />
      <DailyDetails date={selectedDay} />
    </div>
  );
}
