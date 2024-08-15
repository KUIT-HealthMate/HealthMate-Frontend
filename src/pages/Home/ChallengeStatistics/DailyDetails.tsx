import dayjs from "dayjs";
import s from "./DailyDetails.module.scss";
import { challanegesType, supplementType } from "./dataTypes";

interface DateProps {
  date: null | dayjs.Dayjs;
  data: challanegesType[];
}

export default function DailyDetails({ date, data }: DateProps) {
  //date에 맞는 정보들을 렌더링.
  const pillList = date
    ? data.find((item) => date.format("YYYY-MM-DD") === item.date)?.supplement
    : null;
  const habbitList = date
    ? data.find((item) => date.format("YYYY-MM-DD") === item.date)?.habit
    : null;

  function checkAchievement(supplement: supplementType): number {
    const achievementList = [
      supplement.breakfastSuccess,
      supplement.lunchSuccess,
      supplement.dinnerSuccess,
    ];
    return achievementList.filter((value) => {
      return value === true;
    }).length;
  }
  function checkRequirement(supplement: supplementType): number {
    const achievementList = [
      supplement.breakfastRequired,
      supplement.lunchRequired,
      supplement.dinnerRequired,
    ];
    return achievementList.filter((value) => {
      return value === true;
    }).length;
  }

  return (
    <div className={s.dailyChallengeContainer}>
      {date === null ? (
        <div className={s.notice}>
          <div className={s.noticeItem}>날짜를 터치해</div>
          <div className={s.noticeItem}>세부 수행여부를 확인해보세요!</div>
        </div>
      ) : (
        <div>
          <div className={s.date}>{date.format("YYYY.MM.DD")}</div>
          <div className={s.challenges}>
            {pillList ? (
              <div className={s.challengeItems}>
                {pillList.map((sItem) => (
                  <div className={s.itemContainer}>
                    <div
                      className={`${s.challengeName} ${
                        sItem.success ? "" : s.failed
                      }`}
                    >
                      {`영양제 챌린지 - ${sItem.challengeName}`}
                    </div>
                    {sItem.success ? (
                      <div className={s.success}>
                        {`성공 (${checkAchievement(sItem)}/${checkRequirement(
                          sItem
                        )})`}
                      </div>
                    ) : (
                      <div className={s.fail}>
                        {`실패 (${checkAchievement(sItem)}/${checkRequirement(
                          sItem
                        )})`}
                      </div>
                    )}
                  </div>
                ))}
                {habbitList?.map((hItem) => (
                  <div className={s.itemContainer}>
                    <div
                      className={`${s.challengeName} ${
                        hItem.achievementStatus ? "" : s.failed
                      }`}
                    >
                      {`습관 챌린지 - ${hItem.challengeName}`}
                    </div>
                    {hItem.achievementStatus ? (
                      <div className={s.success}>{`성공 (1/1)`}</div>
                    ) : (
                      <div className={s.fail}>{`실패 (0/1)`}</div>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
