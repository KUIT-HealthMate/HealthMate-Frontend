import React, { ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import s from "./PillManagePage.module.scss";
import useHabitInfoStore from "../../../store/useHabitInfoStore";
import habitInfo from "../../../store/habitInfo";
import uuid from "react-uuid";
import { useState } from "react";
import { useGlobalStore } from "../../../store/store";
import { useEffect } from "react";

import leftBracket from "../../../assets/leftBraket.svg";


import InputClearButtonImg from "../../../assets/InputClearButton.svg";
import AlarmTimeInputModal from "./components/AlarmTimeInputModal";
import NameInputSection from "./components/NameInputSection";
import IntakeTimeSection from "./components/IntakeTimeSection";
import IntakePeriodSection from "./components/IntakePeriodSection";
import IntakeDaySection from "./components/IntakeDaySection";
import AlarmTimeSection from "./components/AlarmTimeSection";


const initHabit = (): Omit<Omit<habitInfo, "id">, "notificationTime"> => {
  return {
    name: "", // 알약 이름
    executionRecord: false,
    weeklyExecutionFrequency: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    }, // 주 섭취 횟수 (월 ~ 일)
    //notificationTime: [{ hour: 0, minutes: 0 }], // 팝업 알림 시간 (19:30 이면 19, 30)
  };
};

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

  let editingHabitId: string;

  //notificationTime은 화면에 계속 렌더링되어야 하므로 분리하여 state로 관리
  let newHabit: Omit<Omit<habitInfo, "id">, "notificationTime">;

  //새로 추가하는 화면인지, 편집하는 화면인지를 구분함.
  let isAddingNewHabit: boolean;

  //편집하는 화면이라면, 어떤 id의 habit을 편집하는지에 대한 정보.
  const alreadyExistingHabitId: string = useParams().id as string;

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

  let tempNotificationTime:{ hour: number; minutes: number }[];

  newHabit = initHabit();
  if (isAddingNewHabit) {
    newHabit = initHabit();
  } else {
    editingHabitId = alreadyExistingHabitId;

    // notificationTime 속성을 분리한다.
    const { notificationTime, ...rest } = getHabitCopy(editingHabitId);
    newHabit = rest;
    tempNotificationTime = notificationTime;
    // 기존 존재하는 챌린지 편집일 경우 notificationTime도 초기화
    
  }

  
  useEffect(() => {
    if(!isAddingNewHabit){
      setAlarmTime(tempNotificationTime);
    }
  }, []);
  
  console.log(newHabit);

  // 이벤트 핸들러: 알약 이름
  const handleHabitName = (inputElement: HTMLInputElement): void => {
    console.log(newHabit);
    const filteredValue = inputElement.value.replace(
      /[^a-zA-Zㄱ-ㅎ가-힣]/g,
      ""
    );

    inputElement.value = filteredValue;
    newHabit.name = filteredValue;
    console.log("handleHabitName end, " + newHabit.name);
  };
  console.log("+");

    // 이벤트 핸들러: 주 섭취 횟수
    const handleExecuteDay = (
      e: ChangeEvent<HTMLInputElement>,
      value: string
    ): void => {
      newHabit.weeklyExecutionFrequency = {
        ...newHabit.weeklyExecutionFrequency,
        [value]: !(newHabit.weeklyExecutionFrequency as any)[value],
      };
    };

  const [amOrPm, setAmOrPm] = useState(0);
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const handleAlarmTime = () => {
    console.log("handleAlarmTime start, " + newHabit.name);
    console.log("handleAlarmTime: " + amOrPm + hour + minutes);
    let hourIn24: number = amOrPm * 12 + (hour % 12);
    if(isEditMode) {
      setAlarmTime(alarmTime.map((item,index) => {
        if(index == editIndex){
          return {
            ...item,
            hour: hourIn24,
            minutes: minutes,
          };
        }
        return item;
      }))
    } else {
      setAlarmTime([...alarmTime, { hour: hourIn24, minutes: minutes }]);
      console.log("handleAlarmTime End");
      console.log(alarmTime);
    }

    setAmOrPm(0);
    setHour(0);
    setMinutes(0);
    setIsEditMode(false);
    console.log("handleAlarmTime end, " + newHabit.name);
  };

  const editAlarmTime = (index: number) => {
    alarmTime.map((item, idx) => {
      if(idx == index) {
        item.hour < 12 ? setAmOrPm(0) : setAmOrPm(1);
        setHour(item.hour % 12);
        setMinutes(item.minutes);
      }
      setEditIndex(index);
      setModal(true);
      setIsEditMode(true);
    });
  }

  const deleteAlarmTime = (index: number) => {
    setAlarmTime(prevItems => {
      // 새로운 배열을 생성하면서 해당 인덱스의 아이템을 제외
      return prevItems.filter((_, i) => i !== index);
    });
  }

  // 적용된 변화들을 habitStore에 적용시킨다.
  const handleChanges = (): void => {
    if (isAddingNewHabit) {
      setHabitInfo({ ...newHabit, id: uuid(), notificationTime: alarmTime });
    } else {
      setHabit(editingHabitId, newHabit, alarmTime);
    }
    navigate(-1);
  };

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
                  handleHabitName(e.target);
          }} defaultValue={newHabit.name} />
        
          <IntakeDaySection handlePeriodFunc={(e: ChangeEvent<HTMLInputElement>, dayInfo:string) =>
                  handleExecuteDay(e, dayInfo)} defaultChecked={newHabit.weeklyExecutionFrequency} /> 
          
          <AlarmTimeSection alarmTime={alarmTime} plusButtonOnClick={() => setModal(true)} editButtonOnClick={(index: number) => editAlarmTime(index)} deleteButtonOnClick={(index: number) => deleteAlarmTime(index)}/>
            
          <button
            type="button"
            className={s.completeButton}
            onClick={() => handleChanges()}
          >
            완료
          </button>

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
          handleAlarmTime={handleAlarmTime}
        />
      ) : null}
      
    </>
  );
};

export default HabitEditingPage;
