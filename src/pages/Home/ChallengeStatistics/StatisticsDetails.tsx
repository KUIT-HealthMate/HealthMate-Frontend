import dayjs from "dayjs";
import s from "./StatisticsDetail.module.scss";
import Achievement from "./Achievement";
import WeeklyCalander from "./Calander/WeeklyCalander";
import MonthlyCalander from "./Calander/MonthlyCalander";
import { CalanderDataInterface } from "../../../test/mock/mockup";

interface DetailProps {
  calanderSelect: boolean; //true이면 weekly, false이면 monthly
  periodSelect: dayjs.Dayjs;
  data: CalanderDataInterface;
}

export default function StatisticsDetails({
  calanderSelect,
  periodSelect,
  data,
}: DetailProps) {
  //monthSelect값에 따라서

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
        <WeeklyCalander periodSelect={periodSelect} data={data} />
      ) : (
        <MonthlyCalander periodSelect={periodSelect} data={data} />
      )}
      <div className={s.spacer} />
      <Achievement date={periodSelect} percent={data.periodAverage} />
    </div>
  ); //기간 당 성취도를 Calander에서 계산해서 넘기는걸로 하면될듯 spacer랑 achievement
}
