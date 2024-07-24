import dayjs from "dayjs";
import s from "./Achievement.module.scss";
import Cheering from "../../../components/atoms/Cheering";

interface AcheivementProps {
  date: null | dayjs.Dayjs;
  percent: number;
  //period: boolean; //true는 weekly, false는 monthly
}

export default function Achievement({ date, percent }: AcheivementProps) {
  const halfPercent = percent / 2;
  return (
    <div className={s.acheivementContainer}>
      <div className={s.title}>챌린지 성취도</div>
      <div className={s.subtitle1}>
        선택된 기간 전체의 완수도 평균을 확인해보세요!
      </div>
      <div className={s.chartContainer}>
        <div className={s.ChallengeCharWrap}>
          <div
            className={s.ChallengeChart}
            style={
              percent >= 50
                ? {
                    background: `conic-gradient(#7ADCC5 0%, #0E9494 ${halfPercent}%, #05697F ${percent}%, #D9D9D9 ${percent}% 100%)`,
                  }
                : {
                    background: `conic-gradient(#F5BE9D 0%, #F7A682 ${halfPercent}%, #F97F59 ${percent}%, #D9D9D9 ${percent}% 100%)`,
                  }
            }
          >
            <div className={s.ChartCenter}>
              <p
                className={s.PercentText}
                data-percent={percent}
                style={
                  percent >= 50
                    ? { color: "#0E9494" }
                    : { color: percent > 0 ? "#F8825C" : "#8F8F8F" }
                }
              ></p>
            </div>
          </div>
        </div>
      </div>
      <Cheering achieveRate={percent} />
    </div>
  );
}
