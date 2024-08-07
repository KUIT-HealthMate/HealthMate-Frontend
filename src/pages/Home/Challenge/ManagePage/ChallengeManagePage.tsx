import React, { ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import s from "./ManagePage.module.scss";
import { usePillInfoStore } from "../../../../store/usePillInfoStore";


import pillInfo from "../../../../store/pillInfo";
import uuid from "react-uuid";
import { useState } from "react";
import { useGlobalStore } from "../../../../store/store";
import { useEffect } from "react";

import leftBracket from "../../../../assets/leftBraket.svg";


import InputClearButtonImg from "../../../assets/InputClearButton.svg";
import AlarmTimeInputModal from "./components/AlarmTimeInputModal";
import NameInputSection from "./components/NameInputSection";
import IntakeTimeSection from "./components/IntakeTimeSection";
import IntakePeriodSection from "./components/IntakePeriodSection";
import ChallengeDaySection from "./components/ChallengeDaySection";
import AlarmTimeSection from "./components/AlarmTimeSection";

import handleChallengeName from "./utils/handleChallengeName";
import handleChallengeDay from "./utils/handleChallengeDay";
import { initHabit, initPill } from "./utils/initChallenge";
import CompleteChangeButton from "./components/CompleteChangeButton";
import { AlarmTime } from "./utils/Alarm/AlarmTime";
import editAlarmTime from "./utils/Alarm/editAlarmTime";
import deleteAlarmTime from "./utils/Alarm/deleteAlarmTime";
import handleAlarmTime from "./utils/Alarm/handleAlarmTime";
import { handleBeforeOrAfterMeal, handleEatingTiming, handleMealMinute } from "./utils/handlePillOnlyValues";
import { isHabitChallenge, isPillChallenge } from "./utils/determineChallenge";
import useHabitInfoStore from "../../../../store/useHabitInfoStore";
import habitInfo from "../../../../store/habitInfo";
import ChallengeManageHeader from "./components/ChallengeManageHeader";


const ChallengeManagePage = <T,>({challengeType} : {challengeType: string}) => {

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
  const { getPillCopy } = usePillInfoStore();
  const { getHabitCopy } = useHabitInfoStore();

  //notificationTime은 화면에 계속 렌더링되어야 하므로 분리하여 state로 관리
  type initChallengeInfo<T> = T extends pillInfo 
  ? Omit<pillInfo, 'id' | 'notificationTime'>
  : Omit<habitInfo, 'id' | 'notificationTime'>;


  let initChallenge;
  if(challengeType == 'pill'){
    initChallenge = initPill;
  } else {
    initChallenge = initHabit
  }
  const [newChallenge, setNewChallenge] = useState<initChallengeInfo<T>>(initChallenge as unknown as initChallengeInfo<T>);

  type pillChallengeSetter = React.Dispatch<React.SetStateAction<Omit<pillInfo, "id" | "notificationTime">>>;
  type habitChallengeSetter = React.Dispatch<React.SetStateAction<Omit<habitInfo, "id" | "notificationTime">>>;

  //새로 추가하는 화면인지, 편집하는 화면인지를 구분함.
  let isAddingNewChallenge: boolean;

  //편집하는 화면이라면, 어떤 id의 pill을 편집하는지에 대한 정보.
  const alreadyExistingChallengeId: string = useParams().id as string;
  const [editingChallengeId, setEditingChallengeId] = useState<string>(alreadyExistingChallengeId);

  // 분리된 notificationTime
  const [alarmTime, setAlarmTime] = useState<AlarmTime[]>([]);

  // 알림톡 시간을 위한 모달창. true 시 모달창이 표시됨.
  const [modal, setModal] = useState(false);

  if (alreadyExistingChallengeId == undefined) {
    isAddingNewChallenge = true;
  } else {
    isAddingNewChallenge = false;
  }


  useEffect(() => {
    if(!isAddingNewChallenge){
      // notificationTime 속성을 분리한다.
      if(isPillChallenge(challengeType)){
        let { notificationTime, ...rest } = getPillCopy(editingChallengeId);
        setNewChallenge(rest as unknown as initChallengeInfo<T>);
        setAlarmTime(notificationTime);
      }
      if(isHabitChallenge(challengeType)){
        let { notificationTime, ...rest } = getHabitCopy(editingChallengeId);
        setNewChallenge(rest as unknown as initChallengeInfo<T>);
        setAlarmTime(notificationTime);
      }
      // 기존 존재하는 챌린지 편집일 경우 notificationTime도 초기화
    }
  }, [editingChallengeId]);
  
  const [amOrPm, setAmOrPm] = useState(0);
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(0);

  return (
    <>
      <div className={s.wrap}>
        <ChallengeManageHeader challengeType={challengeType} isAddingNewChallenge={isAddingNewChallenge}/>
        
        <div className={s.contentWrap}>
          <NameInputSection
            isAddingNewChallenge={isAddingNewChallenge}
            handleChangeFunc={(e: ChangeEvent<HTMLInputElement>) => {
              handleChallengeName<initChallengeInfo<T>>(
                e.target,
                setNewChallenge,
                newChallenge
              );
            }}
            defaultValue={newChallenge.name}
            challengeType={challengeType}
          />

          {isPillChallenge(challengeType) && (
            <>
              <IntakeTimeSection
                handleButtonFunc={(idx: number) =>
                  handleBeforeOrAfterMeal<pillInfo>(
                    idx,
                    setNewChallenge as pillChallengeSetter,
                    newChallenge as pillInfo
                  )
                }
                handleMinuteFunc={(e: ChangeEvent<HTMLInputElement>) => {
                  handleMealMinute(
                    e.target,
                    setNewChallenge as pillChallengeSetter,
                    newChallenge as pillInfo
                  );
                }}
                defaultValues={(newChallenge as pillInfo).intakeTime}
              />

              <IntakePeriodSection
                handlePeriodFunc={(
                  e: ChangeEvent<HTMLInputElement>,
                  mealInfo: string
                ) =>
                  handleEatingTiming(
                    e,
                    mealInfo,
                    setNewChallenge as pillChallengeSetter,
                    newChallenge as pillInfo
                  )
                }
                defaultChecked={(newChallenge as pillInfo).dailyIntakePeriod}
              />
            </>
          )}

          <ChallengeDaySection
            handlePeriodFunc={(
              e: ChangeEvent<HTMLInputElement>,
              dayInfo: string
            ) => {
              handleChallengeDay<initChallengeInfo<T>>(
                e,
                setNewChallenge,
                newChallenge,
                dayInfo
              );
            }}
            defaultChecked={
              isPillChallenge(challengeType) ? 
              (newChallenge as pillInfo).weeklyIntakeFrequency : (newChallenge as habitInfo).weeklyExecutionFrequency
            }
          />

          <AlarmTimeSection
            alarmTime={alarmTime}
            plusButtonOnClick={() => setModal(true)}
            editButtonOnClick={(index: number) =>
              editAlarmTime(
                index,
                setHour,
                setMinutes,
                alarmTime,
                setAmOrPm,
                setEditIndex,
                setModal,
                setIsEditMode
              )
            }
            deleteButtonOnClick={(index: number) =>
              deleteAlarmTime(index, setAlarmTime, alarmTime)
            }
          />

          <CompleteChangeButton<initChallengeInfo<T>>
            isAddingNewChallenge={isAddingNewChallenge}
            newChallenge={newChallenge}
            alarmTime={alarmTime}
            editingChallengeId={editingChallengeId}
          />

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
          handleAlarmTime={() =>
            handleAlarmTime(
              amOrPm,
              hour,
              minutes,
              isEditMode,
              setAlarmTime,
              alarmTime,
              editIndex,
              setAmOrPm,
              setHour,
              setMinutes,
              setIsEditMode
            )
          }
        />
      ) : null}
    </>
  );
};

export default ChallengeManagePage;
