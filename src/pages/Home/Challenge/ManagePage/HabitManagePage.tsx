import React, { ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import s from "./ManagePage.module.scss";
import useHabitInfoStore from "../../../../store/useHabitInfoStore";
import habitInfo from "../../../../store/habitInfo";
import uuid from "react-uuid";
import { useState } from "react";
import { useGlobalStore } from "../../../../store/store";
import { useEffect } from "react";

import leftBracket from "../../../../assets/leftBraket.svg";


import InputClearButtonImg from "../../../../assets/InputClearButton.svg";
import AlarmTimeInputModal from "./components/AlarmTimeInputModal";
import NameInputSection from "./components/NameInputSection";
import IntakeTimeSection from "./components/IntakeTimeSection";
import IntakePeriodSection from "./components/IntakePeriodSection";
import ChallengeDaySection from "./components/ChallengeDaySection";
import AlarmTimeSection from "./components/AlarmTimeSection";

import handleChallengeName from "./utils/handleChallengeName";
import handleChallengeDay from "./utils/handleChallengeDay";
import { initHabit } from "./utils/initChallenge";
import CompleteChangeButton from "./components/CompleteChangeButton";
import handleAlarmTime from "./utils/Alarm/handleAlarmTime";
import editAlarmTime from "./utils/Alarm/editAlarmTime";
import deleteAlarmTime from "./utils/Alarm/deleteAlarmTime";


const HabitEditingPage = () => {

  //하단 바 안보이게
  const setShowBottomBar = useGlobalStore((state) => state.setShowBottomBar);
  useEffect(() => {
    console.log("마운트됨");
    setShowBottomBar();
    return () => {
      setShowBottomBar();
    };
  }, [setShowBottomBar]);

  const navigate = useNavigate();

  const { HabitInfo, setHabitInfo, getHabitCopy, setHabit } = useHabitInfoStore();

  //notificationTime은 화면에 계속 렌더링되어야 하므로 분리하여 state로 관리
  const [newHabit, setNewHabit] = useState<Omit<Omit<habitInfo, "id">, "notificationTime">>(initHabit);

  //새로 추가하는 화면인지, 편집하는 화면인지를 구분함.
  let isAddingNewHabit: boolean;

  //편집하는 화면이라면, 어떤 id의 habit을 편집하는지에 대한 정보.
  const alreadyExistingHabitId: string = useParams().id as string;
  const [editingHabitId, setEditingHabitId] = useState<string>(alreadyExistingHabitId);

  // 분리된 notificationTime
  const [alarmTime, setAlarmTime] = useState<
    { hour: number; minutes: number }[]
  >([]);

  // 알림톡 시간을 위한 모달창. true 시 모달창이 표시됨.
  const [modal, setModal] = useState(false);

  if (alreadyExistingHabitId == undefined) {
    isAddingNewHabit = true;
  } else {
    isAddingNewHabit = false;
  }


  useEffect(() => {
    if(!isAddingNewHabit){
      // notificationTime 속성을 분리한다.
      const { notificationTime, ...rest } = getHabitCopy(editingHabitId);
      setNewHabit(rest);
      setAlarmTime(notificationTime);
      console.log("setted");
      // 기존 존재하는 챌린지 편집일 경우 notificationTime도 초기화
    }
  }, [editingHabitId]);
  

  const [amOrPm, setAmOrPm] = useState(0);
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  

  return (
    <>
      <div className={s.wrap}>
        <div className={s.statusBar}></div>
        <div className={s.header}>
          <div className={s.titleBar}>
            <button onClick={() => navigate(-1)}>
              <img src={leftBracket} alt="" />
            </button>
            <div className={s.title}>
              {isAddingNewHabit ? "운동 챌린지 추가" : "운동 정보 편집"}
            </div>
          </div>
        </div>
        <div className={s.contentWrap}>
          <NameInputSection placeHolderMessage = {"운동 이름을 입력해주세요"} handleChangeFunc={(e: ChangeEvent<HTMLInputElement>) => {
                  handleChallengeName<habitInfo>(e.target,setNewHabit,newHabit);
          }} defaultValue={newHabit.name} challengeType={"habit"}/>
          
          <ChallengeDaySection handlePeriodFunc={(e: ChangeEvent<HTMLInputElement>, dayInfo:string) =>
                  handleChallengeDay<habitInfo>(e,setNewHabit,newHabit,dayInfo)} defaultChecked={newHabit.weeklyExecutionFrequency} /> 
          
          <AlarmTimeSection alarmTime={alarmTime} plusButtonOnClick={() => setModal(true)} editButtonOnClick={(index: number) => editAlarmTime(index, setHour, setMinutes, alarmTime, setAmOrPm, setEditIndex, setModal, setIsEditMode)} deleteButtonOnClick={(index: number) => deleteAlarmTime(index,setAlarmTime,alarmTime)}/>
            
          <CompleteChangeButton<habitInfo> isAddingNewChallenge={isAddingNewHabit} newChallenge={newHabit} alarmTime={alarmTime} editingChallengeId={editingHabitId} />

          <div className={s.bottomBarCover}></div>

          <div className={s.messengerAlarmBody}>
            <span></span>
          </div>
        </div>

        <div className={s.bottomBarCover}></div>
      </div>
      
      {modal === true ? (
        <AlarmTimeInputModal
          modal={modal}
          setModal={setModal}
          amOrPm={amOrPm}
          setAmOrPm={setAmOrPm}
          hour={hour}
          setHour={setHour}
          minutes={minutes}
          setMinutes={setMinutes}
          handleAlarmTime={() => handleAlarmTime(amOrPm,hour,minutes,isEditMode,setAlarmTime,alarmTime,editIndex,setAmOrPm,setHour,setMinutes,setIsEditMode)}
        />
      ) : null}
      
    </>
  );
};

export default HabitEditingPage;
