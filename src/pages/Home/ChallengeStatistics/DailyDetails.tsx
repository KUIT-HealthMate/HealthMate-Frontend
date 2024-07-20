import dayjs from "dayjs";
import s from "./DailyDetails.module.scss";

interface DateProps {
  date: null | dayjs.Dayjs;
}

export default function DailyDetails({ date }: DateProps) {
  return (
    <div className={s.dailyChallengeContainer}>
      {date === null ? (
        <div className={s.notice}>
          <div className={s.noticeItem}>날짜를 터치해</div>
          <div className={s.noticeItem}>세부 수행여부를 확인해보세요!</div>
        </div>
      ) : (
        <div>
          <div className="date">{date.format("YYYY.MM.DD.dddd")}</div>
          <div className="challenges"></div>
        </div>
      )}
    </div>
  );
}
