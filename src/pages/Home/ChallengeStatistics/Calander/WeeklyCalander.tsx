import dayjs from "dayjs";
import { useEffect, useState } from "react";
import s from "./WeeklyCalander.module.scss";
import DailyDetails from "../DailyDetails";
import { CalanderDataInterface } from "../../../../test/mock/mockup";

export type CalanderDataType = dayjs.Dayjs | null;

interface CalanderProps {
  periodSelect: dayjs.Dayjs;
  data: CalanderDataInterface;
}

export default function WeeklyCalander({ periodSelect, data }: CalanderProps) {
  const weeklyCalanderFormat: Array<CalanderDataType> = []; //한달에 최대 6주차까지 있을 수 있음
  const weekName: Array<string> = ["월", "화", "수", "목", "금", "토", "일"];
  const [selectedDay, setSelectedDay] = useState<null | dayjs.Dayjs>(null);

  const handleSelectedDay = (day: null | dayjs.Dayjs) => {
    setSelectedDay(day);
  };

  useEffect(() => {
    setSelectedDay(null);
  }, [periodSelect]);

  const selectColor = (percent: number) => {
    if (percent <= 30) {
      return s.under30;
    } else if (percent <= 50) {
      return s.under50;
    } else if (percent < 100) {
      return s.over80;
    } else if (percent === 100) {
      return s.perfect;
    } else return "";
  };

  //monthSelect.startOf('weeks') 하면 해당 주의 첫번째 일요일 나옴
  const firstdayOfWeek = periodSelect.startOf("weeks").add(1, "day");

  switch (firstdayOfWeek.format("dddd")) {
    case "월요일":
      break;
    case "화요일":
      for (let i = 0; i < 1; i++) {
        weeklyCalanderFormat.push(null);
      }
      break;
    case "수요일":
      for (let i = 0; i < 2; i++) {
        weeklyCalanderFormat.push(null);
      }
      break;
    case "목요일":
      for (let i = 0; i < 3; i++) {
        weeklyCalanderFormat.push(null);
      }
      break;
    case "금요일":
      for (let i = 0; i < 4; i++) {
        weeklyCalanderFormat.push(null);
      }
      break;
    case "토요일":
      for (let i = 0; i < 5; i++) {
        weeklyCalanderFormat.push(null);
      }
      break;
    case "일요일":
      for (let i = 0; i < 6; i++) {
        weeklyCalanderFormat.push(null);
      }
      break;
  }

  for (
    let i = firstdayOfWeek;
    weeklyCalanderFormat.length < 7;
    i = i.add(1, "day")
  ) {
    weeklyCalanderFormat.push(i);
  }
  console.log(selectedDay);
  console.log(weeklyCalanderFormat);

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
                selectedDay !== null && selectedDay.date() === date?.date()
                  ? s.selected
                  : ""
              }`}
              onClick={() => handleSelectedDay(date)}
            >
              <div className={s.date}>
                {date?.date() === null ? "" : date?.date()}
              </div>
              <div
                className={`${s.acheivement} ${
                  date !== null
                    ? selectColor(data[date?.date()].dailyAccomplishment)
                    : ""
                }`}
              >
                {date !== null
                  ? `${data[date?.date()].dailyAccomplishment}%`
                  : ""}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={s.divider} />
      <DailyDetails date={selectedDay} data={data} />
    </div>
  );
}
