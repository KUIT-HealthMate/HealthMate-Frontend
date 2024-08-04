import React, { ChangeEvent } from 'react'
import s from "../ManagePage.module.scss"
import InputClearButton from './InputClearButton';

interface Props {
    handleButtonFunc: (idx: number) => void;
    handleMinuteFunc: (e: ChangeEvent<HTMLInputElement>) => void
    defaultValues: { beforeOrAfterMeal: number; minutes: number; }; //number;
}

const IntakeTimeSection:React.FC<Props> = ({handleButtonFunc, handleMinuteFunc, defaultValues}) => {
  
  return (
    <div className={s.detailDiv}>
            <span className={s.detailTitle}>섭취 시간</span>
            <div className={s.beforeOrAfterMealWrap}>
              <input
                type="radio"
                name="beforeOrAfterMeal"
                id="before"
                onChange={() => handleButtonFunc(1)}
                checked={defaultValues.beforeOrAfterMeal == 1}
              />
              <label htmlFor="before" className={s.smallButton}>
                식전
              </label>
              <input
                type="radio"
                name="beforeOrAfterMeal"
                id="after"
                onChange={() => handleButtonFunc(2)}
                checked={defaultValues.beforeOrAfterMeal == 2}
              />
              <label htmlFor="after" className={s.smallButton}>
                식후
              </label>
              <div className={s.inputWrap}>
                <input
                  className={s.minuteInput}
                  type="text"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleMinuteFunc(e);
                  }}
                  value={defaultValues.minutes}
                />
                <InputClearButton />
              </div>
              <span className={s.minuteInputText}>분 이내</span>
            </div>
        </div>
  )
}

export default IntakeTimeSection;