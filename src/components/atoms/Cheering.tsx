import s from "./Cheering.module.scss";
import goodJob from "../../assets/goodJob.png";

interface NoticeProps {
  achieveRate: number;
}

export default function Cheering({ achieveRate }: NoticeProps) {
  return (
    <>
      {achieveRate < 50 ? (
        <div className={s.rowAchievementContainer}>
          <div className={s.rowAchievement}>
            아쉽게 수행하지 못한 챌린지가 많았어요.
          </div>
        </div>
      ) : (
        <div className={s.highAchievementContainer}>
          <div className={s.highAchievement}>거의 다 수행하셨네요!</div>
          <img src={goodJob} alt="잘했오" className={s.good} />
        </div>
      )}
    </>
  );
}
