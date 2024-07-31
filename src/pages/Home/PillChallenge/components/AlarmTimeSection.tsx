import React from 'react'
import s from "../PillManagePage.module.scss";

import plusIconImg from "../../../../assets/plusIcon.svg";
import deleteImg from "../../../../assets/deleteIcon.svg";
import pencilImg from "../../../../assets/pencil.svg";

interface Props {
    alarmTime: {
        hour: number;
        minutes: number;
    }[];
    plusButtonOnClick: () => void;
    editButtonOnClick: (index: number) => void;
    deleteButtonOnClick: (index: number) => void;

}

const AlarmTimeSection:React.FC<Props> = ({alarmTime, plusButtonOnClick, editButtonOnClick, deleteButtonOnClick}) => {
  return (
    <div className={s.detailDiv}>
    <div className={s.messengerAlarmHeader}>
      <span className={s.detailTitle}>키키오톡 알림 시간</span>
      <button
        type="button"
        onClick={() => plusButtonOnClick()}
        className={s.plusButton}
      >
        <img src={plusIconImg} alt="" />
      </button>
    </div>
    <div className={s.messengerAlarmBody}>
      {alarmTime && alarmTime.map((value, index) => {
        return (
          <div className={s.alarmTimeWrap}>
            <span>
              {value.hour < 12 ? "오전 " : "오후 "}
              {(value.hour % 12 != 0 ? value.hour % 12 : 12).toString().padStart(2,'0')} : {(value.minutes).toString().padStart(2,'0')}
            </span>
            <div className={"editAndDeleteBtn"}>
              <button className="edit_button" onClick={() => editButtonOnClick(index)}>
                <img src={pencilImg} alt="" />
              </button>
              <button className="delete_button" onClick={() => deleteButtonOnClick(index)}>
                <img src={deleteImg} alt="" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
</div> 
  )
}

export default AlarmTimeSection