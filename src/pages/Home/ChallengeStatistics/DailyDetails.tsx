import dayjs from "dayjs";
import s from "./DailyDetails.module.scss";

interface DateProps {
  date: null | number;
}

export default function DailyDetails({ date }: DateProps) {
  return (
    <div className={s.dailyChallengeContainer}>
      {date === null ? (
        <div className="notice">
          날짜를 터치해 세부 수행여부를 확인해보세요!
        </div>
      ) : (
        <div>
          <div className="date">{date}</div>
          <div className="challenges"></div>
        </div>
      )}
    </div>
  );
}
