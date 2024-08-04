import s from "./CoinRecord.module.scss";

interface CoinRecordProps {
  date: string;
  reason: string;
  difference: number;
}

export default function CoinRecord({
  date,
  reason,
  difference,
}: CoinRecordProps) {
  return (
    <div className={s.coinRecordContainer}>
      <div className={s.date}>{date}</div>
      <div className={s.noticeContainer}>
        <div className={s.notice}>{reason}</div>
        <div className={`${difference > 0 ? s.plus : s.minus}`}>
          {difference > 0 ? `+${difference}개` : `${difference}개`}
        </div>
      </div>
    </div>
  );
}
