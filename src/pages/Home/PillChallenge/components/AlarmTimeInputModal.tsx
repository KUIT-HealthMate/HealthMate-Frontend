import React, { useRef, useState } from 'react';
import s from "./AlarmTimeInputModal.module.scss";
import blackX from "../../../../assets/blackX.svg";
import modal from "../PillManagePage";
import WheelPicker from "./WheelPicker";
import PillManagePage from "../PillManagePage";

interface Props {
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    amOrPm: number;
    setAmOrPm: React.Dispatch<React.SetStateAction<number>>;
    hour: number;
    setHour: React.Dispatch<React.SetStateAction<number>>;
    minutes: number;
    setMinutes: React.Dispatch<React.SetStateAction<number>>;
    handleAlarmTime: () => void;
}

const AlarmTimeInputModal:React.FC<Props> = ({modal, setModal, amOrPm, setAmOrPm, hour, setHour, minutes, setMinutes, handleAlarmTime}) => {
  const modalBackground = useRef();

  

  const handleTimeSet = () => {
    setModal(false);
    handleAlarmTime();
  }

  return (
    <div className={s.AlarmTimeInputWrapper} ref={modalBackground as any} onClick={e => {
        if(e.target === modalBackground.current) {
            setModal(false);
        }
    }}>
        <div className={s.AlarmTimeInputContent}>
          <div className={s.TitleBar}>
            <span className={s.AlarmTimeInputTitle}>알림 시간 설정</span>
            <button type="button" onClick={() => setModal(false)}><img className={s.modalXButton}src={blackX} alt="" /></button>
          </div>
          <div className={s.wheelPickerWrap}>
            <WheelPicker list={["오전","오후"]} pickerStyle={{borderRadius:'10px 0 0 10px'}}initialIndex={amOrPm} onSelectedChange={(selected) => { selected == "오전" ? setAmOrPm(0) : setAmOrPm(1); console.log(selected); console.log(amOrPm)}} > </ WheelPicker>
            <WheelPicker list={["12","01","02","03","04","05","06","07","08","09","10","11"]} initialIndex={hour} onSelectedChange={(selected) => { setHour(selected as unknown as number); console.log(hour)}} > </ WheelPicker>
            <WheelPicker list={[":"]} onSelectedChange={() => {}} initialIndex={0}> </ WheelPicker>
            <WheelPicker list={["00","05","10","15","20","25","30","35","40","45","50","55"]} pickerStyle={{borderRadius:'0 10px 10px 0'}} initialIndex={minutes == 0 ? minutes : minutes/5} onSelectedChange={(selected) => { setMinutes(selected as unknown as number); console.log(minutes)}} > </ WheelPicker>
          </div>
          <button type="button" className={s.AlarmTimeInputCompleteButton} onClick={() => handleTimeSet()}>완료</button>
        </div>
    </div>
  )
}

export default AlarmTimeInputModal