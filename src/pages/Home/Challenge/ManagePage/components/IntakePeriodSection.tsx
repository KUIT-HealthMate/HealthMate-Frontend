import React, { ChangeEvent } from 'react';
import s from "../ManagePage.module.scss";
import pillInfo from '../../../../../store/pillInfo';
import { handleEatingTiming } from '../utils/handlePillOnlyValues';

interface Props {
  setNewChallenge: React.Dispatch<React.SetStateAction<Omit<pillInfo, "id" | "notificationTime">>>
  newChallenge: Omit<pillInfo, "id" | "notificationTime">
  defaultChecked: {
      breakfast: boolean;
      lunch: boolean;
      dinner: boolean;
  }
}

const IntakePeriodSection:React.FC<Props> = ({setNewChallenge,newChallenge,defaultChecked}) => {
  return (
    <div className={s.detailDiv}>
      <span className={s.detailTitle}>일 섭취 시기</span>
      <div className={s.eatingTimeButtonWrap}>
        <input
          type="checkbox"
          id="morning"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleEatingTiming(e, "breakfast", setNewChallenge, newChallenge)
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
            handleEatingTiming(e, "lunch", setNewChallenge, newChallenge)
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
            handleEatingTiming(e, "dinner", setNewChallenge, newChallenge)
          }
          checked={defaultChecked.dinner}
        />
        <label htmlFor="evening" className={s.smallButton}>
          저녁
        </label>
      </div>
    </div>
  );
}

export default IntakePeriodSection