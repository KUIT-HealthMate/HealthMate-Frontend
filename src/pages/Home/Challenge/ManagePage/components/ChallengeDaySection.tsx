import React, { ChangeEvent } from 'react'
import s from "../ManagePage.module.scss";

interface Props {
    handlePeriodFunc: (e: ChangeEvent<HTMLInputElement>, dayInfo: string) => void
    defaultChecked: {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
    }
}

const ChallengeDaySection:React.FC<Props> = ({handlePeriodFunc, defaultChecked}) => {
  return (
    <div className={s.detailDiv}>
            <span className={s.detailTitle}>주 섭취 횟수</span>
            <div className={s.weekDayButtonWrap}>
              <input
                type="checkbox"
                id="mon"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handlePeriodFunc(e, "monday")
                }
                checked={defaultChecked.monday}
              />
              <label htmlFor="mon" className={s.bigButton}>
                월
              </label>
              <input
                type="checkbox"
                id="tue"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handlePeriodFunc(e, "tuesday")
                }
                checked={defaultChecked.tuesday}
              />
              <label htmlFor="tue" className={s.bigButton}>
                화
              </label>
              <input
                type="checkbox"
                id="wed"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handlePeriodFunc(e, "wednesday")
                }
                checked={defaultChecked.wednesday}
              />
              <label htmlFor="wed" className={s.bigButton}>
                수
              </label>
              <input
                type="checkbox"
                id="thu"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handlePeriodFunc(e, "thursday")
                }
                checked={defaultChecked.thursday}
              />
              <label htmlFor="thu" className={s.bigButton}>
                목
              </label>
              <input
                type="checkbox"
                id="fri"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handlePeriodFunc(e, "friday")
                }
                checked={defaultChecked.friday}
              />
              <label htmlFor="fri" className={s.bigButton}>
                금
              </label>
              <input
                type="checkbox"
                id="sat"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handlePeriodFunc(e, "saturday")
                }
                checked={defaultChecked.saturday}
              />
              <label htmlFor="sat" className={s.bigButton}>
                토
              </label>
              <input
                type="checkbox"
                id="sun"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handlePeriodFunc(e, "sunday")
                }
                checked={defaultChecked.sunday}
              />
              <label htmlFor="sun" className={s.bigButton}>
                일
              </label>
            </div>
          </div>
  )
}

export default ChallengeDaySection