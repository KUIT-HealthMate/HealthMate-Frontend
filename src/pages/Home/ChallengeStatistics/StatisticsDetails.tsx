import dayjs from "dayjs";
import s from "./StatisticsDetail.module.scss";
import Achievement from "./Achievement";
import WeeklyCalander from "./Calander/WeeklyCalander";
import MonthlyCalander from "./Calander/MonthlyCalander";
// import { CalanderDataInterface } from "../../../test/mock/mockup";
import { dataForCalander } from "./dataTypes";

interface DetailProps {
  calanderSelect: boolean; //true이면 weekly, false이면 monthly
  periodSelect: dayjs.Dayjs;
  data: dataForCalander | null;
}

export default function StatisticsDetails({
  calanderSelect,
  periodSelect,
  data,
}: DetailProps) {
  //monthSelect값에 따라서

  return (
    <>
      {data === null ? (
        <div className={s.calanderContainer}>
          <div className={s.subContainer}>
            <div className={s.title}>현재 서버와의 연결이 불안정해요!</div>
            <div className={s.subtitle1}>
              통신상태를 점검 하거나, 잠시 후 다시 시도해주세요!
            </div>
          </div>
        </div>
      ) : (
        <div className={s.calanderContainer}>
          <div className={s.subContainer}>
            <div className={s.title}>챌린지 달력</div>
            <div className={s.subtitle1}>
              선택된 기간 매일의 완수도를 확인해보세요!
            </div>
            <div className={s.subtitle2}>
              50%를 넘지 못한 날은 강조돼 있어요!
            </div>
          </div>
          {calanderSelect ? (
            <WeeklyCalander
              periodSelect={periodSelect}
              data={data.challengeResponses}
            />
          ) : (
            <MonthlyCalander
              periodSelect={periodSelect}
              data={data.challengeResponses}
            />
          )}
          <div className={s.spacer} />
          <Achievement
            date={periodSelect}
            percent={data?.totalAchievementRate}
          />
        </div>
      )}
    </>
  ); //기간 당 성취도를 Calander에서 계산해서 넘기는걸로 하면될듯 spacer랑 achievement
}
