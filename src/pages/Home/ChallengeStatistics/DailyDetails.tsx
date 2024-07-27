import dayjs from "dayjs";
import s from "./DailyDetails.module.scss";
import { CalanderDataInterface } from "../../../test/mock/mockup";

interface DateProps {
  date: null | dayjs.Dayjs;
  data: CalanderDataInterface;
}

export default function DailyDetails({ date, data }: DateProps) {
  //date에 맞는 정보들을 렌더링.
  const pillList = date ? data[date.date()].supplementChallenges : null;
  const habbitList = date ? data[date.date()].habitChallenges : null;

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
                        Object.values(sItem.dailyIntakePeriod).filter(
                          (v) => v === true
                        ).length < Object.values(sItem.dailyIntakePeriod).length
                          ? s.failed
                          : ""
                      }`}
                    >
                      {`영양제 챌린지 - ${sItem.pill}`}
                    </div>
                    {Object.keys(sItem.dailyIntakePeriod).length ===
                    Object.values(sItem.dailyIntakePeriod).filter(
                      (v) => v === true
                    ).length ? (
                      <div className={s.success}>
                        {`성공 (${
                          Object.keys(sItem.dailyIntakePeriod).length
                        }/${Object.keys(sItem.dailyIntakePeriod).length})`}
                      </div>
                    ) : (
                      <div className={s.fail}>
                        {`실패 (${
                          Object.values(sItem.dailyIntakePeriod).filter(
                            (v) => v === true
                          ).length
                        }/${Object.keys(sItem.dailyIntakePeriod).length})`}
                      </div>
                    )}
                  </div>
                ))}
                {habbitList?.map((hItem) => (
                  <div className={s.itemContainer}>
                    <div
                      className={`${s.challengeName} ${
                        hItem.accomplished ? "" : s.failed
                      }`}
                    >
                      {`습관 챌린지 - ${hItem.habbit}`}
                    </div>
                    {hItem.accomplished ? (
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
