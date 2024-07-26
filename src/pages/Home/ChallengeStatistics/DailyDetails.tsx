import dayjs from "dayjs";
import s from "./DailyDetails.module.scss";
import { julyMock } from "../../../test/mock/mockup";

interface DateProps {
  date: null | dayjs.Dayjs;
}

export default function DailyDetails({ date }: DateProps) {
  //date에 맞는 정보들을 렌더링.
  const pillList = date ? julyMock[date.date()].supplementChallenges : null;
  const habbitList = date ? julyMock[date.date()].habitChallenges : null;

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
          <div className="challenges">
            {pillList ? (
              <div className="challengeItems">
                {pillList.map((sItem) => (
                  <div className="itemContainer">
                    <div className="challengeName">
                      {`영양제 챌린지 - ${sItem.pill}`}
                    </div>
                    <div className="successFail">
                      {Object.keys(sItem.dailyIntakePeriod).length ===
                      Object.values(sItem.dailyIntakePeriod).filter(
                        (v) => v === true
                      ).length ? (
                        <div className="success">
                          {`성공 ${
                            Object.keys(sItem.dailyIntakePeriod).length
                          }/${Object.keys(sItem.dailyIntakePeriod).length}`}
                        </div>
                      ) : (
                        <div className="success">
                          {`실패 ${
                            Object.values(sItem.dailyIntakePeriod).filter(
                              (v) => v === true
                            ).length
                          }/${Object.keys(sItem.dailyIntakePeriod).length}`}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div className="itemContainer"></div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
