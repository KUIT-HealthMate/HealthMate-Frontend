import React, { ChangeEvent } from 'react';
import s from "../ManagePage.module.scss";

interface Props {
    handlePeriodFunc: (e: ChangeEvent<HTMLInputElement>,mealInfo:string) => void;
    defaultChecked: {
        breakfast: boolean;
        lunch: boolean;
        dinner: boolean;
    }

}

const IntakePeriodSection:React.FC<Props> = ({handlePeriodFunc, defaultChecked}) => {
  return (
    <div className={s.detailDiv}>
            <span className={s.detailTitle}>일 섭취 시기</span>
            <div className={s.eatingTimeButtonWrap}>
              <input
                type="checkbox"
                id="morning"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handlePeriodFunc(e, "breakfast")
                }
                checked={defaultChecked.breakfast}
              />
              <label htmlFor="morning" className={s.smallButton}>
                아침
              </label>
              <input
                type="checkbox"
                id="afternoon"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handlePeriodFunc(e, "lunch")
                }
                checked={defaultChecked.lunch}
              />
              <label htmlFor="afternoon" className={s.smallButton}>
                점심
              </label>
              <input
                type="checkbox"
                id="evening"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handlePeriodFunc(e, "dinner")
                }
                checked={defaultChecked.dinner}
              />
              <label htmlFor="evening" className={s.smallButton}>
                저녁
              </label>
            </div>
          </div>
  )
}

export default IntakePeriodSection