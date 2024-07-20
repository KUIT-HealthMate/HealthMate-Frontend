import dayjs from "dayjs";
import { useState, useEffect } from "react";
import s from "./WeeklyCalander.module.scss";
import DailyDetails from "../DailyDetails";

interface CalanderProps {
  monthSelect: dayjs.Dayjs;
}

export default function WeeklyCalander({ monthSelect }: CalanderProps) {
  const Monthlycalander = [[], [], [], [], [], []]; //한달에 최대 6주차까지 있을 수 있음
  const weekName: Array<string> = ["월", "화", "수", "목", "금", "토", "일"];
  const [selectedDay, setSelectedDay] = useState<null | number>(null);

  const handleSelectedDay = (day: number) => {
    setSelectedDay(day);
  };
  //monthSelect.startOf('weeks') 하면 해당 주의 첫번째 일요일 나옴
  useEffect(() => {
    const days = monthSelect.daysInMonth();
  }, [monthSelect]);

  return (
    <div className={s.calanderContainer}>
      <div className="calander">주간달력구현 {monthSelect.format("MM")}</div>
      <div className={s.divider} />
      <DailyDetails date={selectedDay} />
    </div>
  );
}
