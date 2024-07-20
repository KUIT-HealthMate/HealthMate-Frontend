import dayjs from "dayjs";
import s from "./Achievement.module.scss";

interface AcheivementProps {
  date: null | dayjs.Dayjs;
  percent: number;
  //period: boolean; //true는 weekly, false는 monthly
}

export default function Achievement({ date, percent }: AcheivementProps) {
  return (
    <div className={s.acheivementContainer}>
      <div className={s.title}>챌린지 성취도</div>
      <div className={s.subtitle1}>
        선택된 기간 전체의 완수도 평균을 확인해보세요!
      </div>
      <div>
        {percent} {date?.format("YYYY.MM.DD.dddd")}
      </div>
    </div>
  );
}
