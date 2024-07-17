import dayjs from "dayjs";
import "dayjs/locale/ko";
import s from "./Calander.module.scss";
dayjs.locale("ko");

export default function Calander() {
  const dates: Array<dayjs.Dayjs> = [];
  for (let i = -3; i < 4; i++) {
    const date = dayjs().add(i, "day");
    dates.push(date);
  }

  return (
    <div className={s.calanderContainer}>
      {dates.map((date, index) => (
        <div className={s.dayContainer} key={index}>
          {date.date() === dayjs().date() ? (
            <div className="dayIdentifier">
              <div className={s.selectedItem}>
                {date.format("dddd").charAt(0)}
              </div>
              <div className={s.dateItem}>{date.format("DD")}</div>
            </div>
          ) : (
            <div className="dayIdentifier">
              <div className={s.item}>{date.format("dddd").charAt(0)}</div>
              <div className={s.dateItem}>{date.format("DD")}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
