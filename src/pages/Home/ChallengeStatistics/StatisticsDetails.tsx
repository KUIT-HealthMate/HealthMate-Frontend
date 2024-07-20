import dayjs from "dayjs";
import { useState } from "react";
import s from "./StatisticsDetail.module.scss";
import Achievement from "./Acheivement";
import WeeklyCalander from "./Calander/WeeklyCalander";
import MonthlyCalander from "./Calander/MonthlyCalander";

interface DetailProps {
  calanderSelect: boolean;
  monthSelect: dayjs.Dayjs;
}

export default function StatisticsDetails({
  calanderSelect,
  monthSelect,
}: DetailProps) {
  return (
    <div className={s.calanderContainer}>
      <div className={s.subContainer}>
        <div className={s.title}>챌린지 달력</div>
        <div className={s.subtitle1}>
          선택된 기간 매일의 완수도를 확인해보세요!
        </div>
        <div className={s.subtitle2}>50%를 넘지 못한 날은 강조돼 있어요!</div>
      </div>
      {calanderSelect ? (
        <WeeklyCalander monthSelect={monthSelect} />
      ) : (
        <MonthlyCalander monthSelect={monthSelect} />
      )}
      <div className={s.spacer} />
      <Achievement date={monthSelect} period={calanderSelect} />
    </div>
  );
}
