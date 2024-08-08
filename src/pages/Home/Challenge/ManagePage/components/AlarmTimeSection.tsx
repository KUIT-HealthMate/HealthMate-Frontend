import React from 'react'
import s from "../ManagePage.module.scss";

import plusIconImg from "../../../../../assets/plusIcon.svg";
import deleteImg from "../../../../../assets/deleteIcon.svg";
import pencilImg from "../../../../../assets/pencil.svg";
import { SelectedAlarmTimeFormat } from '../utils/Alarm/SelectedAlarmTimeFormat';
import editAlarmTime from '../utils/Alarm/editAlarmTime';
import deleteAlarmTime from '../utils/Alarm/deleteAlarmTime';
import { AlarmTime } from '../utils/Alarm/AlarmTime';

interface Props {
    alarmTime: AlarmTime[];
    setAlarmTime: React.Dispatch<React.SetStateAction<AlarmTime[]>>
    selectedAlarmTime: SelectedAlarmTimeFormat;
    setSelectedAlarmTime: React.Dispatch<React.SetStateAction<SelectedAlarmTimeFormat>>;
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AlarmTimeSection:React.FC<Props> = ({alarmTime, setAlarmTime, selectedAlarmTime, setSelectedAlarmTime, setModal}) => {
  return (
    <div className={s.detailDiv}>
    <div className={s.messengerAlarmHeader}>
      <span className={s.detailTitle}>키키오톡 알림 시간</span>
      <button
        type="button"
        onClick={() => setModal(true)}
        className={s.plusButton}
      >
        <img src={plusIconImg} alt="" />
      </button>
    </div>
    <div className={s.messengerAlarmBody}>
      {alarmTime && alarmTime.map((value, idx) => {
        return (
          <div className={s.alarmTimeWrap}>
            <span>
              {value.hour < 12 ? "오전 " : "오후 "}
              {(value.hour % 12 != 0 ? value.hour % 12 : 12).toString().padStart(2,'0')} : {(value.minutes).toString().padStart(2,'0')}
            </span>
            <div className={"editAndDeleteBtn"}>
              <button className="edit_button" onClick={() => editAlarmTime(idx,selectedAlarmTime, setSelectedAlarmTime, alarmTime, setModal)}>
                <img src={pencilImg} alt="" />
              </button>
              <button className="delete_button" onClick={() => deleteAlarmTime(idx,setAlarmTime, alarmTime)}>
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