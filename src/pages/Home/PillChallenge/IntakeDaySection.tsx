import React, { ChangeEvent } from 'react'
import s from "./PillManagePage.module.scss";

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

const IntakeDaySection:React.FC<Props> = ({handlePeriodFunc, defaultChecked}) => {
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
                defaultChecked={defaultChecked.monday}
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
                defaultChecked={defaultChecked.tuesday}
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
                defaultChecked={defaultChecked.wednesday}
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
                defaultChecked={defaultChecked.thursday}
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
                defaultChecked={defaultChecked.friday}
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
                defaultChecked={defaultChecked.saturday}
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
                defaultChecked={defaultChecked.sunday}
              />
              <label htmlFor="sun" className={s.bigButton}>
                일
              </label>
            </div>
          </div>
  )
}

export default IntakeDaySection