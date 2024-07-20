import dayjs from "dayjs";
import s from "./StatisticsDetail.module.scss";
import Achievement from "./Achievement";
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
      <Achievement date={monthSelect} percent={1} />
    </div>
  ); //기간 당 성취도를 Calander에서 계산해서 넘기는걸로 하면될듯 spacer랑 achievement
}
